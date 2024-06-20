package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type Config struct {
	Mode         string
	Port         string
	ProxyPort    string
	ProxyHost    string
	GoogleID     string
	GoogleSecret string
	OAuthConfig  *oauth2.Config
	OAuthState   string
	PgConnStr    string
	JwtKey       string
	OpenaiToken  string
}

func New() *Config {
	Mode := os.Getenv("ACT_MODE")
	if Mode == "" {
		Mode = "dev"
	}
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	OAuthConfig := &oauth2.Config{
		ClientID:     os.Getenv("GOOGLEID"),
		ClientSecret: os.Getenv("GOOGLESECRET"),
		RedirectURL:  os.Getenv("GOOGLE_REDIRECT_URL"),
		Scopes:       []string{"profile", "email", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}

	return &Config{
		Mode:         Mode, // dev, prod
		Port:         os.Getenv("APP_PORT"),
		ProxyPort:    os.Getenv("PROXY_PORT"),
		ProxyHost:    os.Getenv("PROXY_HOST"),
		GoogleID:     os.Getenv("GOOGLEID"),
		GoogleSecret: os.Getenv("GOOGLESECRET"),
		OAuthConfig:  OAuthConfig,
		OAuthState:   os.Getenv("OAUTH_STATE"),
		PgConnStr:    os.Getenv("PG_CONN_STR"),
		JwtKey:       os.Getenv("JWT_KEY"),
		OpenaiToken:  os.Getenv("OPENAI_TOKEN"),
	}
}
