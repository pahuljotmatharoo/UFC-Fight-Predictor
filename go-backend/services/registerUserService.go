package services

import (
	"database/sql"
	"ufcfightpredictor/backend/database"
)

func RegisterUser(db *sql.DB, info *database.Login) bool {
	api_key := generateAPIKEY(9)
	_, err := db.Exec("INSERT INTO login_info (username, password, API_KEY) VALUES (?, ?, ?)", info.Username, info.Password, api_key)
	return err == nil
}
