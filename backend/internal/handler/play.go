package handler

import (
	"encoding/json"
	"net/http"
	"strconv"
	"word/internal/repository"
	"word/internal/utils"
)

type PlayResDTO struct {
	Count int                  `json:"count"`
	Words []repository.WordDTO `json:"words"`
}

func (h *Handler) PlayWordsGet(w http.ResponseWriter, r *http.Request) {
	countValue := r.FormValue("count")
	count, err := strconv.ParseInt(countValue, 10, 8)
	if err != nil || count < 10 || count > 50 {
		http.Error(w, "count must be 10-50", http.StatusBadRequest)
		return
	}
	langValue := r.FormValue("lang")
	if langValue != "english" && langValue != "german" {
		http.Error(w, "only german or english", http.StatusBadRequest)
		return
	}
	UserID, _, err := utils.CheckHttpToken(w, r)
	if err != nil {
		return
	}
	words, err := h.repo.WordLoadAll(UserID)
	if err != nil {
		http.Error(w, "went wrong", http.StatusBadRequest)
		return
	}
	var langWords []repository.WordDTO
	for _, word := range words {
		if word.ToLanguage == langValue {
			langWords = append(langWords, word)
		}
	}
	if int(count) > len(langWords) {
		res := PlayResDTO{
			Count: len(langWords),
			Words: langWords,
		}
		w.WriteHeader(http.StatusAccepted)
		json.NewEncoder(w).Encode(res)
		return
	}

	finalArray := make([]repository.WordDTO, 0, count)
	utils.GetPlayWords(langWords, &finalArray, int(count))
	res := PlayResDTO{
		Count: int(count),
		Words: finalArray,
	}
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(res)
}
