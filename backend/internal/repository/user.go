package repository

func (repo *Repository) UserCreate(user UserDTO) error {
	query := `
    INSERT INTO users (id, name, email, avatar, target_language, os_language)
    VALUES ($1, $2, $3, $4, $5, $6)
    `
	_, err := repo.db.Exec(query, user.ID, user.Name, user.Email, user.Avatar, user.TargetLanguage, user.OSLanguage)
	return err
}

func (repo *Repository) UserLoadEmail(email string) (UserDTO, error) {
	var user UserDTO
	err := repo.db.Get(&user, "SELECT id, name, email, avatar, target_language, os_language FROM users WHERE email = $1", email)
	return user, err
}
