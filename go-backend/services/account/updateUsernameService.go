package servicesAccount

import (
	"database/sql"
	"ufcfightpredictor/backend/database"
	servicesGeneral "ufcfightpredictor/backend/services/general"
)

func UpdateUsername(API_KEY *string, db *sql.DB, userID *string, req *database.UpdateUsername) bool {
	if !servicesGeneral.ValidateAPIKEY(API_KEY, db, userID) {
		return false
	}
	info := database.Login{Username: req.OldUsername, Password: req.Password, Api_key: *API_KEY}
	checkLogin, _, _ := ValidateLogin(db, &info)
	if checkLogin {
		return false
	}
	_, err := db.Exec("UPDATE login_info SET username = ? WHERE id = ?", req.NewUsername, *userID)
	return err == nil
}
