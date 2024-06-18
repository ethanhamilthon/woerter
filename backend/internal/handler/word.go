package handler

import (
	"encoding/json"
	"net/http"
	"time"
	"word/internal/repository"
	"word/internal/utils"

	"github.com/google/uuid"
)

type WordBodyDTO struct {
	ID           string `db:"id" json:"id"`
	Title        string `db:"title" json:"title"`
	Description  string `db:"description" json:"description"`
	FromLanguage string `db:"from_language" json:"from_language"`
	ToLanguage   string `db:"to_language" json:"to_language"`
	Type         string `db:"type" json:"type"`
}

type WordAllResDTO struct {
	Language string               `json:"language"`
	Words    []repository.WordDTO `json:"words"`
}

func (h *Handler) WordGetAll(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	claims, err := utils.VerifyJWT(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	UserID, err := uuid.Parse(claims.UserID)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	languages, err := h.repo.LanguagesLoad(UserID)
	if err != nil {
		http.Error(w, "Something went wrong", http.StatusBadRequest)
		return
	}

	words, err := h.repo.WordLoadAll(UserID)
	if err != nil {
		http.Error(w, "Something went wrong", http.StatusBadRequest)
		return
	}

	var languagedWords []WordAllResDTO
	for _, lang := range languages {
		lw := WordAllResDTO{}
		lw.Words = make([]repository.WordDTO, 0)
		lw.Language = lang.LanguageName
		for _, word := range words {
			if word.ToLanguage == lw.Language {
				lw.Words = append(lw.Words, word)
			}
		}
		languagedWords = append(languagedWords, lw)
	}
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(languagedWords)
}

func (h *Handler) WordCreate(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	claims, err := utils.VerifyJWT(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var word WordBodyDTO
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close() // Важно закрыть тело запроса после использования
	err = decoder.Decode(&word)
	if err != nil {
		http.Error(w, "Incorrect body", http.StatusBadRequest)
		return
	}

	// Установка поля UserID из claims
	UserID, err := uuid.Parse(claims.UserID)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	ID, _ := uuid.Parse(word.ID)

	// Установка времени создания и обновления
	newWord := repository.WordDTO{
		ID:           ID,
		Title:        word.Title,
		Description:  word.Description,
		FromLanguage: word.FromLanguage,
		ToLanguage:   word.ToLanguage,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
		UserID:       UserID,
		Type:         word.Type,
	}
	err = h.repo.WordCreate(newWord)
	if err != nil {
		http.Error(w, "Error on create", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newWord)
}

func (h *Handler) WordLoad(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	claims, err := utils.VerifyJWT(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	UserID, err := uuid.Parse(claims.UserID)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	ID, err := uuid.Parse(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusUnauthorized)
		return
	}

	word, err := h.repo.WordLoad(UserID, ID)
	if err != nil {
		http.Error(w, "Not found", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(word)
}

func (h *Handler) WordDelete(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	claims, err := utils.VerifyJWT(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	UserID, err := uuid.Parse(claims.UserID)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	ID, err := uuid.Parse(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusUnauthorized)
		return
	}

	err = h.repo.WordDelete(UserID, ID)
	if err != nil {
		http.Error(w, "Did not delete", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusAccepted)
}

func (h *Handler) WordUpdate(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	claims, err := utils.VerifyJWT(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var word WordBodyDTO
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close() // Важно закрыть тело запроса после использования
	err = decoder.Decode(&word)
	if err != nil {
		http.Error(w, "Incorrect body", http.StatusBadRequest)
		return
	}

	// Установка поля UserID из claims
	UserID, err := uuid.Parse(claims.UserID)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	ID, _ := uuid.Parse(word.ID)

	newWord := repository.WordDTO{
		ID:           ID,
		UserID:       UserID,
		Title:        word.Title,
		Description:  word.Description,
		FromLanguage: word.FromLanguage,
		ToLanguage:   word.ToLanguage,
		UpdatedAt:    time.Now(),
	}

	err = h.repo.WordUpdate(newWord)
	if err != nil {
		http.Error(w, "Incorrect body", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusAccepted)
}
