package repository

import (
	"time"

	"github.com/google/uuid"
)

type UserDTO struct {
	ID             uuid.UUID `db:"id" json:"id"`
	Name           string    `db:"name" json:"name"`
	Email          string    `db:"email" json:"email"`
	Avatar         string    `db:"avatar" json:"avatar"`
	TargetLanguage string    `db:"target_language" json:"target_language"`
	OSLanguage     string    `db:"os_language" json:"os_language"`
}

type WordDTO struct {
	ID             uuid.UUID `db:"id" json:"id"`
	Title          string    `db:"title" json:"title"`
	Description    string    `db:"description" json:"description"`
	TargetLanguage string    `db:"target_language" json:"target_language"`
	OSLanguage     string    `db:"os_language" json:"os_language"`
	CreatedAt      time.Time `db:"created_at" json:"created_at"`
	UpdatedAt      time.Time `db:"updated_at" json:"updated_at"`
	UserID         uuid.UUID `db:"user_id" json:"user_id"`
}
