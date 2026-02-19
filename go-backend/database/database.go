package database

import (
	"database/sql"
	"encoding/csv"
	"fmt"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
)

type Login struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Api_key  string `json:"API_KEY"`
}

type UpdatePassword struct {
	Username    string `json:"username"`
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}

type UpdateUsername struct {
	OldUsername string `json:"old_username"`
	NewUsername string `json:"new_username"`
	Password    string `json:"password"`
}

type UFC_HISTORY struct {
	ID          int     `json:"ID"`
	AccountID   int     `json:"AccountID"`
	Fighter1    string  `json:"Fighter1"`
	Fighter2    string  `json:"Fighter2"`
	Percentage1 float32 `json:"Percentage1"`
	Percentage2 float32 `json:"Percentage2"`
	Winnter     string  `json:"Winner"`
}

func InitFightersList() (*csv.Reader, error) {
	file, err := os.Open("ufc_master_data.csv")
	if err != nil {
		return nil, err
	}

	reader := csv.NewReader(file)
	return reader, nil
}

func InitDataBase() *sql.DB {
	var db *sql.DB
	cfg := mysql.NewConfig()
	cfg.User = os.Getenv("DBUSER")
	cfg.Passwd = os.Getenv("DBPASS")
	cfg.Net = "tcp"
	cfg.Addr = "127.0.0.1:3306"
	cfg.DBName = "ufc_fight_predictor"

	// Get a database handle.
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")
	return db
}
