package handler

import (
	// "encoding/json"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	"word/internal/repository"
	"word/internal/utils"

	"github.com/google/uuid"
)

type AskDTO struct {
	ID         string `json:"id"`
	Oslang     string `json:"oslang"`
	Tolang     string `json:"tolang"`
	PromptType string `json:"type"`
	Word       string `json:"word"`
}

func (h *Handler) AskCreate(w http.ResponseWriter, r *http.Request) {
	UserID, _, err := utils.CheckHttpToken(w, r)
	if err != nil {
		return
	}
	var askparams AskDTO
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close() // Важно закрыть тело запроса после использования
	err = decoder.Decode(&askparams)
	if err != nil {
		http.Error(w, "Incorrect body", http.StatusBadRequest)
		return
	}
	prompt, err := utils.PromptGet(askparams.Oslang, askparams.Tolang, askparams.PromptType, askparams.Word)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	WordID, err := uuid.Parse(askparams.ID)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	result := ""
	ch := make(chan string)
	go h.service.Generate(ch, prompt)

	w.Header().Set("Content-Type", "text/event-stream; charset=utf-8")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "went wrong 2", http.StatusBadRequest)
		return
	}

	for text := range ch {
		fmt.Fprintf(w, "%v", text)
		result = result + text
		flusher.Flush()
	}

	word := repository.WordDTO{
		ID:           WordID,
		Title:        askparams.Word,
		Description:  result,
		FromLanguage: askparams.Oslang,
		ToLanguage:   askparams.Tolang,
		Type:         askparams.PromptType,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
		UserID:       UserID,
	}
	err = h.repo.WordCreate(word)
	if err != nil {
		http.Error(w, "Error on creating", http.StatusBadRequest)
		return
	}
}
