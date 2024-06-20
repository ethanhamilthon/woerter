package llm

import (
	"context"
	"errors"
	"io"
	"strings"
	"time"
	"word/config"

	openai "github.com/sashabaranov/go-openai"
)

type Llm struct {
	client *openai.Client
}

func New() *Llm {
	cfg := config.New()
	token := cfg.OpenaiToken
	c := openai.NewClient(token)
	return &Llm{
		client: c,
	}
}

func (l *Llm) GenerateMock(ch chan<- string, prompt string) {
	defer close(ch)
	words := strings.Fields(`"Quite" в английском языке означает "довольно", "вполне" или "совсем".
	Это слово используется для усиления прилагательных и наречий, указывая на степень чего-либо.

	1. She is quite talented.
	Она довольно талантлива.
	Здесь "quite" подчеркивает высокий уровень таланта.
	
	2. The movie was quite interesting.
	Фильм был вполне интересным.
	В данном случае "quite" указывает на то, что фильм был действительно интересным, но не чрезмерно.
	
	3. It's quite cold outside.
	На улице довольно холодно.
	Здесь "quite" подчеркивает, что температура заметно низкая.`)
	for _, word := range words {
		ch <- word + " "
		time.Sleep(50 * time.Millisecond)
	}
}

func (l *Llm) Generate(ch chan<- string, prompt string) {
	defer close(ch)
	ctx := context.Background()
	req := openai.ChatCompletionRequest{
		Model: openai.GPT3Dot5Turbo,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleUser,
				Content: prompt,
			},
		},
		Stream:      true,
		Temperature: 1,
		TopP:        1,
	}
	stream, err := l.client.CreateChatCompletionStream(ctx, req)
	if err != nil {
		return
	}
	defer stream.Close()

	for {
		response, err := stream.Recv()
		if errors.Is(err, io.EOF) {
			break
		}

		if err != nil {
			return
		}
		ch <- response.Choices[0].Delta.Content
	}

}
