package utils

import (
	"errors"
	"regexp"
)

type Prompt struct {
	OnThis    string
	OnAnother string
}

type Language struct {
	ToGerman  Prompt
	ToEnglish Prompt
}

type Languages struct {
	Russian Language
}

var languages Languages = Languages{
	Russian: Language{
		ToGerman: Prompt{
			OnThis: `Объясни мне что означает "[[]]" на немецком.
      Ответ нужен на русском. Сначала объясни в общем что это слово/фраза означает.
      Потом сделай 3 предложение на немецком, и перевод на русском. И объясни
      именно в контексте каждого предложение. Напиши что это означает более
      подробнее, а в примерах должен быть 3 пункта, номеруй каждый пример, но не самих предложении: предложение
      на английском, его перевод, что слово/фраза "[[]]" означает в этом контексте.
      Ответ нужен без Markdown разметки.`,
			OnAnother: `Объясни мне как будет слово/фраза "[[]]" на немецком.
      Ответ нужен на русском. Сначала дай пару вариантов, потом для каждого
      варианта сделай по пару (1-2) предложение чтобы я понял. Номеруй каждый вариант, но не самих предложении. Предложение должен
      быть на немецком, с русским переводом, и с объяснением контекста. 
      Ответ нужен без Markdown разметки.`,
		},
		ToEnglish: Prompt{
			OnThis: `Объясни мне что означает "[[]]" на английском.
      Ответ нужен на русском. Сначала объясни в общем что это слово/фраза означает.
      Потом сделай 3 предложение на английском, и перевод на русском. И объясни
      именно в контексте каждого предложение. Напиши что это означает более
      подробнее, а в примерах должен быть 3 пункта, номеруй каждый пример, но не самих предложении: предложение
      на английском, его перевод, что слово/фраза "[[]]" означает в этом контексте.
      Ответ нужен без Markdown разметки.`,
			OnAnother: `Объясни мне как будет слово/фраза "[[]]" на английском.
      Ответ нужен на русском. Дай небольшой водный часть, где покажешь всех возможных вариантов,Номеруй каждый вариант
			Потом для топ 3 варианта сделай по полноценное предложение чтобы я понял. Предложение должен
      быть на английском, с русским переводом, и с объяснением контекста объязательно. 
      Ответ нужен без Markdown разметки. ОСТАВЬ одну строку пустым когда ты начинаешь
			с нового абзаца`,
		},
	},
}

// oslangs: russian   ;
// tolangs: german, english   ;
// types: this, another
func PromptGet(osLang string, toLang string, promptType string, word string) (string, error) {
	prompt := ""
	var lang Language
	switch osLang {
	case "russian":
		lang = languages.Russian
	default:
		return "", errors.New("Basic Language not found")
	}
	var to Prompt
	switch toLang {
	case "german":
		to = lang.ToGerman
	case "english":
		to = lang.ToEnglish
	default:
		return "", errors.New("Target Language not found")
	}

	switch promptType {
	case "this":
		prompt = to.OnThis
	case "another":
		prompt = to.OnAnother
	default:
		return "", errors.New("Prompt type not found")
	}
	return PutWord(prompt, word), nil
}

func PutWord(text string, word string) string {
	regex := regexp.MustCompile(`\[\[.*?\]\]`)
	return regex.ReplaceAllString(text, word)
}
