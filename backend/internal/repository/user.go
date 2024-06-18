package repository

import "github.com/google/uuid"

func (repo *Repository) UserCreate(user UserDTO) error {
	query := `
    INSERT INTO users (id, name, full_name, email, avatar, language )
    VALUES ($1, $2, $3, $4, $5, $6)
    `
	_, err := repo.db.Exec(query, user.ID, user.Name, user.FullName, user.Email, user.Avatar, user.Language)
	return err
}

func (repo *Repository) UserLoadEmail(email string) (UserDTO, error) {
	var user UserDTO
	err := repo.db.Get(&user, "SELECT id, name, full_name, email, avatar, language FROM users WHERE email = $1", email)
	return user, err
}

func (repo *Repository) UserLanguageUpdate(userID uuid.UUID, language string) error {
	query := `UPDATE users SET language = $2 WHERE id = $1`
	_, err := repo.db.Exec(query, userID, language)
	return err
}

func (repo *Repository) LanguagesLoad(userID uuid.UUID) ([]LanguageDTO, error) {
	languages := make([]LanguageDTO, 0)
	err := repo.db.Select(&languages, "SELECT id, user_id, name, created_at FROM languages WHERE user_id = $1", userID)
	return languages, err
}

func (repo *Repository) LanguagesCreate(languages []LanguageDTO) error {
	query := `INSERT INTO languages (id, user_id, name, created_at)
						VALUES (:id, :user_id, :name, :created_at)`

	// Выполнение множественной вставки с помощью NamedExec
	_, err := repo.db.NamedExec(query, languages)
	return err
}
