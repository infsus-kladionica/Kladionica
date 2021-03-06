package main

import (
	"fmt"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/database"
)

func main() {
	err := database.Pokreni()
	if err != nil {
		panic(err)
	}
	defer database.DB.Close()

	logger, err := buildLogger()
	if err != nil {
		fmt.Println(err.Error())
		panic(err)
	}
	router, err := buildRouter()
	if err != nil {
		logger.Error("Unable to build router", err)
		panic(err)
	}
	server := buildServer(router, logger)
	server.Run()
}
