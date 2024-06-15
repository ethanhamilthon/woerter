package utils

import (
	"fmt"
	"time"
	"word/config"

	"github.com/golang-jwt/jwt/v5"
)

// MyClaims defines the structure of the JWT claims
type MyClaims struct {
	UserID    string `json:"user_id"`
	UserEmail string `json:"user_email"`
	jwt.RegisteredClaims
}

// Secret key for signing the JWT
var jwtKey []byte

func init() {
	cfg := config.New()
	jwtKey = []byte(cfg.JwtKey)
}

// CreateJWT generates a new JWT token
func CreateJWT(userID string, userEmail string) (string, error) {
	// Set expiration time
	expirationTime := time.Now().Add(24 * 60 * time.Hour)

	// Create the claims
	claims := &MyClaims{
		UserID:    userID,
		UserEmail: userEmail,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	// Create the token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// VerifyJWT verifies the JWT token and returns the claims
func VerifyJWT(tokenString string) (*MyClaims, error) {
	claims := &MyClaims{}

	// Parse the token
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		return nil, err
	}

	// Check if the token is valid
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}
