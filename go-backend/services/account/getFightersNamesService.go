package servicesAccount

import (
	"database/sql"
	"encoding/csv"
	"io"
	"log"
	servicesGeneral "ufcfightpredictor/backend/services/general"
)

func GetFightersName(db *sql.DB, reader *csv.Reader, weight_class *string, userID *string, API_KEY *string) (bool, []string) {
	var arr []string
	if !servicesGeneral.ValidateAPIKEY(API_KEY, db, userID) {
		return false, []string{"0"}
	}
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		if record[1] == *weight_class {
			arr = append(arr, record[0])
		}
	}
	return true, arr
}
