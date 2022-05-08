package main

import "fmt"

func main() {
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
