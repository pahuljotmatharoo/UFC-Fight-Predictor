package services

import (
	"database/sql"
	"ufcfightpredictor/backend/database"
)

func GetAccount(db *sql.DB, userID *string, API_KEY *string) (bool, database.Login) {
	if !validateAPIKEY(API_KEY, db, userID) {
		return false, database.Login{}
	}

	var username_db string
	var password_db string
	var API_KEY_db string
	rows, errors := db.Query("SELECT username, password, API_KEY FROM login_info WHERE id = ?", *userID)
	if errors != nil {
		return false, database.Login{}
	}
	if rows.Next() {
		error := rows.Scan(&username_db, &password_db, &API_KEY_db)
		if error != nil {
			return false, database.Login{}
		}
		return true, database.Login{Username: username_db, Password: password_db, Api_key: API_KEY_db}
	}
	return false, database.Login{}
}
