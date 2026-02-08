package services

import (
	"database/sql"
	"fmt"
	"ufcfightpredictor/backend/database"
)

func RegisterUserService(db *sql.DB, info *database.Login) bool {
	fmt.Println(info.Username)
	fmt.Println(info.Password)
	_, err := db.Exec("INSERT INTO login_info (username, password) VALUES (?, ?)", info.Username, info.Password)
	fmt.Print(err)
	return err == nil
}
