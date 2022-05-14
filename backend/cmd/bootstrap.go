package main

import (
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/hashicorp/go-hclog"

	"github.com/infsus-kladionica/Kladionica/backend/cmd/config"
	routes2 "github.com/infsus-kladionica/Kladionica/backend/pkg/event/routes"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/server"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/user/routes"
)

func buildRouter() (*gin.Engine, error) {
	router := gin.Default()

	user := router.Group("/korisnik")
	routes.UserRouter(user)

	dogadaji := router.Group("/dogadaji")
	routes2.DogadajiRouter(dogadaji)

	err := router.Run(":8080")

	return router, err
}

func buildLogger() (hclog.Logger, error) {
	_ = os.Mkdir("log", 0777)

	logFileName := "log/logger_" + time.Now().Format("2006-01-02") + ".log"
	logFile, err := os.OpenFile(logFileName, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0777)
	if err != nil {
		panic(err)
		return nil, err
	}
	defer func() {
		if err := logFile.Close(); err != nil {
			panic(err)
		}
	}()

	logger := hclog.New(&hclog.LoggerOptions{
		Name:   "Logger",
		Level:  hclog.LevelFromString("DEBUG"),
		Output: logFile,
	})

	return logger, nil
}

func buildServer(router *gin.Engine, log hclog.Logger) *server.Server {
	return server.New(config.ServerConf.Port, config.ServerConf.Timeout, router, log)
}
