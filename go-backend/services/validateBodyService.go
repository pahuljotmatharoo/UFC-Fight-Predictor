package services

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ValidateRequestBody[T any](req *T, c *gin.Context) bool {
	if err := c.ShouldBind(req); err != nil {
		c.IndentedJSON(http.StatusBadRequest, nil)
		return false
	}
	return true
}
