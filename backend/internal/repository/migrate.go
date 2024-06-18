package repository

import "log"

func (repo *Repository) Migrate() {
	tableQuery := `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(100) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        avatar TEXT,
        language VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS words (
        id UUID PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        from_language VARCHAR(50),
        to_language VARCHAR(50),
        type VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS languages (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE
    );
`
	_, err := repo.db.Exec(tableQuery)
	if err != nil {
		log.Fatalln(err)
	}
}
