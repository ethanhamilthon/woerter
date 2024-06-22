package utils

import (
	"math/rand"
	"word/internal/repository"
)

func GetPlayWords(from []repository.WordDTO, to *[]repository.WordDTO, count int) {
	newWords, mediumWords, oldWords := splitSlice(from)

	ratio1, ratio2, ratio3 := 7, 5, 2
	totalRatio := ratio1 + ratio2 + ratio3
	countPart1 := count * ratio1 / totalRatio
	countPart2 := count * ratio2 / totalRatio
	countPart3 := count - countPart1 - countPart2
	selectRandomElements(newWords, to, countPart1)
	selectRandomElements(mediumWords, to, countPart2)
	selectRandomElements(oldWords, to, countPart3)
}

func selectRandomElements(from []repository.WordDTO, to *[]repository.WordDTO, count int) {
	if count > len(from) {
		count = len(from) // Если num больше длины src, выбираем все элементы
	}

	indices := rand.Perm(len(from))[:count] // Получаем num случайных индексов

	for _, i := range indices {
		*to = append(*to, from[i])
	}

}

func splitSlice[T any](original []T) ([]T, []T, []T) {
	// Определяем общую длину исходного слайса
	totalLength := len(original)

	// Определяем пропорции
	ratio1, ratio2, ratio3 := 7, 5, 2
	totalRatio := ratio1 + ratio2 + ratio3

	// Вычисляем размер каждого нового слайса
	size1 := totalLength * ratio1 / totalRatio
	size2 := totalLength * ratio2 / totalRatio

	// Создаем три новых слайса на основе вычисленных размеров
	slice1 := original[:size1]
	slice2 := original[size1 : size1+size2]
	slice3 := original[size1+size2:]

	return slice1, slice2, slice3
}
