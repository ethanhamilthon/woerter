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
	ID             string `db:"id" json:"id"`
	Title          string `db:"title" json:"title"`
	Description    string `db:"description" json:"description"`
	TargetLanguage string `db:"target_language" json:"target_language"`
	OSLanguage     string `db:"os_language" json:"os_language"`
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

	words, err := h.repo.WordLoadAll(UserID)
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(words)
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
		ID:             ID,
		Title:          word.Title,
		Description:    word.Description,
		TargetLanguage: word.TargetLanguage,
		OSLanguage:     word.OSLanguage,
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
		UserID:         UserID,
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
		ID:             ID,
		UserID:         UserID,
		Title:          word.Title,
		Description:    word.Description,
		TargetLanguage: word.TargetLanguage,
		OSLanguage:     word.OSLanguage,
		UpdatedAt:      time.Now(),
	}

	err = h.repo.WordUpdate(newWord)
	if err != nil {
		http.Error(w, "Incorrect body", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusAccepted)
}
