package utils

import (
	"net/http"

	"github.com/google/uuid"
)

func CheckHttpToken(w http.ResponseWriter, r *http.Request) (uuid.UUID, string, error) {
	token := r.Header.Get("Authorization")
	claims, err := VerifyJWT(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return uuid.New(), "", err
	}
	UserID, err := uuid.Parse(claims.UserID)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return UserID, "", err
	}

	return UserID, claims.UserEmail, nil
}
