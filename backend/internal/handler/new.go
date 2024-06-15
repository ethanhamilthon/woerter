package handler

import (
	"word/config"
	"word/internal/repository"
)

type Handler struct {
	config *config.Config
	repo   *repository.Repository
}

func New(cfg *config.Config, repo *repository.Repository) *Handler {
	return &Handler{
		config: cfg,
		repo:   repo,
	}
}
