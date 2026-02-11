package servicesAccount

import (
	"database/sql"
	"ufcfightpredictor/backend/database"
	servicesGeneral "ufcfightpredictor/backend/services/general"
)

func Results(db *sql.DB, userID *string, API_KEY *string) (bool, []database.UFC_HISTORY) {
	if !servicesGeneral.ValidateAPIKEY(API_KEY, db, userID) {
		return false, []database.UFC_HISTORY{}
	}
	var count int
	rows, errors := db.Query("SELECT * FROM UFC_HISTORY WHERE AccountID = ?", *userID).Scan(&count)
	var result []database.UFC_HISTORY = make(database.UFC_HISTORY, count) // make
	if errors != nil {
		return false, []database.UFC_HISTORY{}
	}
	if rows.Next() {
		error := rows.Scan(&result.ID, &result.AccountID, &result.Fighter1, &result.Fighter2)
		if error != nil {
			return false, []database.UFC_HISTORY{}
		}
		return true, result
	}
}
