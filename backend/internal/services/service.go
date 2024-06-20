package services

import (
	"word/internal/services/llm"
)

type Services struct {
	*llm.Llm
}

func New() *Services {
	openai := llm.New()
	return &Services{
		Llm: openai,
	}
}
