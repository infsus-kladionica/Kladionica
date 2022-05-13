package main

import (
	"github.com/gin-gonic/gin"
	"github.com/hashicorp/go-hclog"
	"github.com/kladionica/backend/cmd/config"
	"github.com/kladionica/backend/pkg/server"
	"github.com/kladionica/backend/pkg/user/routes"
	"os"
	"time"
)

func buildRouter() (*gin.Engine, error) {
	router := gin.Default()

	user := router.Group("/user")
	routes.UserRouter(user)

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
