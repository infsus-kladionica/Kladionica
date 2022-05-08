package database

import (
	"database/sql"
	"errors"
	"fmt"

	_ "github.com/lib/pq"
)

const (
	host     = "137.184.189.30"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "kladionica"
)

var DB *sql.DB

func Pokreni() (*sql.DB, error){
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return nil, errors.New("neuspješan open baze podataka")
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		return nil, errors.New("neuspješan ping baze podataka")
	}

	DB = db

	return db, nil
}