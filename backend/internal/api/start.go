package api

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
	"word/config"
	"word/internal/handler"
	"word/internal/middleware"
	"word/internal/repository"
	"word/internal/services"
)

func Start() {
	//Канал для отключение программы
	osSignal := make(chan os.Signal, 1)
	signal.Notify(osSignal, os.Interrupt, syscall.SIGTERM)

	//Контекст для сервера
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	//Инициализируем конфиг
	cfg := config.New()
	log.Printf("Mode: %s", cfg.Mode)

	//Инициализируем репозиторий
	repo := repository.New(cfg)
	repo.Migrate()
	defer repo.CloseConnection()

	//Инициализация сервисов
	service := services.New()

	//Инициализируем хендлеры
	handler := handler.New(cfg, repo, service)

	//Инициализация миддлвейров
	m := middleware.New()

	//Создаем сервер
	handlers := http.NewServeMux()

	//Создаем пулл запросов
	api := http.NewServeMux()
	api.HandleFunc("POST /word", m.With(handler.WordCreate, m.Info))
	api.HandleFunc("PATCH /word", m.With(handler.WordUpdate, m.Info))
	api.HandleFunc("DELETE /word/{id}", m.With(handler.WordDelete, m.Info))
	api.HandleFunc("/word/{id}", m.With(handler.WordLoad, m.Info))
	api.HandleFunc("/word", m.With(handler.WordGetAll, m.Info))
	api.HandleFunc("PATCH /onboard", m.With(handler.OnboardPatch, m.Info))
	api.HandleFunc("/ask", handler.AskCreate)
	api.HandleFunc("/play", m.With(handler.PlayWordsGet, m.Info))
	handlers.Handle("/api/v1/", http.StripPrefix("/api/v1", api))

	//Создаем пулл google oauth
	gouth := http.NewServeMux()
	gouth.HandleFunc("/login", m.With(handler.GoogleLogin, m.Info))
	gouth.HandleFunc("/callback", m.With(handler.GoogleCallback, m.Info))
	gouth.HandleFunc("/me", m.With(handler.MeGet, m.Info))
	handlers.Handle("/oauth/google/", http.StripPrefix("/oauth/google", gouth))

	//Слушаем порт
	server := &http.Server{
		Addr:    cfg.Port, // порт сервера
		Handler: handlers,
	}
	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("ListenAndServe(): %v", err)
		}
		log.Printf("Starting server on port %s", cfg.Port)
	}()

	select {
	case <-osSignal:
		log.Println("Shutdown signal received. Shutting down...")

		// Устанавливаем таймаут для завершения текущих запросов
		ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
		defer cancel()

		// Останавливаем сервер с заданным контекстом
		if err := server.Shutdown(ctx); err != nil {
			log.Fatalf("Server shutdown failed: %v", err)
		}
	}
	log.Println("Server gracefully stopped")
}
