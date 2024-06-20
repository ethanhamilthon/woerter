package handler

import (
	"word/config"
	"word/internal/repository"
	"word/internal/services"
)

type Handler struct {
	config  *config.Config
	repo    *repository.Repository
	service *services.Services
}

func New(cfg *config.Config, repo *repository.Repository, servise *services.Services) *Handler {
	return &Handler{
		config:  cfg,
		repo:    repo,
		service: servise,
	}
}
