package repository

import (
	"database/sql"

	"github.com/google/uuid"
)

func (repo *Repository) WordCreate(word WordDTO) error {
	query := `
    INSERT INTO words (id, title, description, from_language, to_language, type, created_at, updated_at, user_id)
    VALUES (:id, :title, :description, :from_language, :to_language, :type, :created_at, :updated_at, :user_id)
    `

	_, err := repo.db.NamedExec(query, word)
	if err != nil {
		return err
	}

	return nil
}

func (repo *Repository) WordLoadAll(userID uuid.UUID) ([]WordDTO, error) {
	query := `
		SELECT id, title, description, from_language, to_language, created_at, updated_at, user_id
		FROM words
		WHERE user_id = $1
    ORDER BY created_at DESC
	`

	var words []WordDTO
	err := repo.db.Select(&words, query, userID)
	if err != nil {
		return nil, err
	}

	return words, nil
}

func (repo *Repository) WordLoad(userID uuid.UUID, ID uuid.UUID) (WordDTO, error) {
	query := `
  SELECT id, title, description, from_language, to_language, created_at, updated_at, user_id
  FROM words
  WHERE id = $1 AND user_id = $2
  `
	var word WordDTO
	err := repo.db.Get(&word, query, ID, userID)
	if err != nil {
		return word, err
	}

	return word, nil
}

func (repo *Repository) WordDelete(userID uuid.UUID, ID uuid.UUID) error {
	query := `
        DELETE FROM words
        WHERE id = $1 AND user_id = $2
    `

	result, err := repo.db.Exec(query, ID, userID)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (repo *Repository) WordUpdate(word WordDTO) error {
	query := `
    UPDATE words
    SET title = :title,
        description = :description,
        from_language = :from_language,
        to_language = :to_language,
        updated_at = :updated_at
    WHERE id = :id AND user_id = :user_id
    `

	_, err := repo.db.NamedExec(query, word)
	if err != nil {
		return err
	}

	return nil
}
