package repository

import "log"

func (repo *Repository) Migrate() {
	tableQuery := `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        avatar TEXT,
        target_language VARCHAR(50),
        os_language VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS words (
        id UUID PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        target_language VARCHAR(50),
        os_language VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE
    );
`
	_, err := repo.db.Exec(tableQuery)
	if err != nil {
		log.Fatalln(err)
	}
}
