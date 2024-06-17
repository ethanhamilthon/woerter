package api

import (
	"log"
	"net/http"
	"word/config"
	"word/internal/handler"
	"word/internal/middleware"
	"word/internal/repository"
)

func Start() {
	//Инициализируем конфиг
	cfg := config.New()
	log.Printf("Mode: %s", cfg.Mode)

	//Инициализируем репозиторий
	repo := repository.New(cfg)
	repo.Migrate()
	defer repo.CloseConnection()

	//Инициализируем хендлеры
	handler := handler.New(cfg, repo)

	//Инициализация миддлвейров
	m := middleware.New()

	//Создаем сервер
	server := http.NewServeMux()

	//Создаем пулл запросов
	api := http.NewServeMux()
	api.HandleFunc("POST /word", m.With(handler.WordCreate, m.Info))
	api.HandleFunc("PATCH /word", m.With(handler.WordUpdate, m.Info))
	api.HandleFunc("DELETE /word/{id}", m.With(handler.WordDelete, m.Info))
	api.HandleFunc("/word/{id}", m.With(handler.WordLoad, m.Info))
	api.HandleFunc("/word", m.With(handler.WordGetAll, m.Info))
	server.Handle("/api/v1/", http.StripPrefix("/api/v1", api))

	//Создаем пулл google oauth
	gouth := http.NewServeMux()
	gouth.HandleFunc("/login", m.With(handler.GoogleLogin, m.Info))
	gouth.HandleFunc("/callback", m.With(handler.GoogleCallback, m.Info))
	gouth.HandleFunc("/me", m.With(handler.MeGet, m.Info))
	server.Handle("/oauth/google/", http.StripPrefix("/oauth/google", gouth))

	//Слушаем порт
	log.Printf("Starting server on port %s", cfg.Port)
	http.ListenAndServe(cfg.Port, server)
}
