package repository

import (
	"log"
	"word/config"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Repository struct {
	db  *sqlx.DB
	cfg *config.Config
}

func New(cfg *config.Config) *Repository {
	db, err := sqlx.Open("postgres", cfg.PgConnStr)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	return &Repository{
		db:  db,
		cfg: cfg,
	}
}

func (repo *Repository) CloseConnection() {
	repo.db.Close()
}
