package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	"word/internal/repository"
	"word/internal/utils"

	"log"

	"github.com/google/uuid"
	"golang.org/x/oauth2"
)

func (h *Handler) GoogleLogin(w http.ResponseWriter, r *http.Request) {
	url := h.config.OAuthConfig.AuthCodeURL(h.config.OAuthState)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func SetCookies(w http.ResponseWriter, exp time.Time, key string, value string) {
	cookie := http.Cookie{
		Name:     key,
		Value:    value,
		Expires:  exp,
		HttpOnly: false,
		Path:     "/",
	}
	http.SetCookie(w, &cookie)
}

func (h *Handler) GoogleCallback(w http.ResponseWriter, r *http.Request) {
	state := r.FormValue("state")
	if state != h.config.OAuthState {
		log.Println("Invalid oauth state")
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	code := r.FormValue("code")
	token, err := h.config.OAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("oauthConfig.Exchange() failed with '%s'\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	// Использование токена доступа для получения информации о пользователе
	userInfo, err := h.getUserInfo(token)
	if err != nil {
		log.Printf("getUserInfo() failed with '%s'\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	userEmail := userInfo["email"].(string)
	userName := userInfo["name"].(string)
	userAvatar := userInfo["picture"].(string)

	user := repository.UserDTO{
		ID:             uuid.New(),
		Name:           userName,
		Email:          userEmail,
		Avatar:         userAvatar,
		OSLanguage:     "",
		TargetLanguage: "",
	}
	err = h.repo.UserCreate(user)
	if err == nil {
		id, _ := user.ID.MarshalText()
		jwt, _ := utils.CreateJWT(string(id), userEmail)
		SetCookies(w, time.Now().Add(24*time.Hour), "Authorization", jwt)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	user, err = h.repo.UserLoadEmail(userEmail)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	id, _ := user.ID.MarshalText()
	jwt, _ := utils.CreateJWT(string(id), userEmail)
	SetCookies(w, time.Now().Add(24*time.Hour), "Authorization", jwt)
	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
}

func (h *Handler) getUserInfo(token *oauth2.Token) (map[string]interface{}, error) {
	client := h.config.OAuthConfig.Client(context.Background(), token)

	resp, err := client.Get("https://www.googleapis.com/oauth2/v3/userinfo")
	if err != nil {
		return nil, fmt.Errorf("failed to get userinfo: %s", err)
	}
	defer resp.Body.Close()

	var userInfo map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&userInfo)
	if err != nil {
		return nil, fmt.Errorf("failed to parse userinfo response: %s", err)
	}

	return userInfo, nil
}

func (h *Handler) MeGet(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	claims, err := utils.VerifyJWT(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	user, err := h.repo.UserLoadEmail(claims.UserEmail)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}
