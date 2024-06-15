package repository

import "github.com/google/uuid"

func (repo *Repository) WordCreate(word WordDTO) error {
	query := `
    INSERT INTO words (id, title, description, target_language, os_language, created_at, updated_at, user_id)
    VALUES (:id, :title, :description, :target_language, :os_language, :created_at, :updated_at, :user_id)
    `

	_, err := repo.db.NamedExec(query, word)
	if err != nil {
		return err
	}

	return nil
}

func (repo *Repository) WordLoadAll(userID uuid.UUID) ([]WordDTO, error) {
	query := `
		SELECT id, title, description, target_language, os_language, created_at, updated_at, user_id
		FROM words
		WHERE user_id = $1
	`

	var words []WordDTO
	err := repo.db.Select(&words, query, userID)
	if err != nil {
		return nil, err
	}

	return words, nil
}
