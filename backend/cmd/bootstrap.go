package main

import (
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/hashicorp/go-hclog"

	"github.com/infsus-kladionica/Kladionica/backend/cmd/config"
	routes2 "github.com/infsus-kladionica/Kladionica/backend/pkg/event/routes"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/server"
	routes3 "github.com/infsus-kladionica/Kladionica/backend/pkg/ticket/routes"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/user/routes"
)

func buildRouter() (*gin.Engine, error) {
	router := gin.Default()

	corsConfig := cors.DefaultConfig()

	corsConfig.AllowOrigins = []string{"*"}
	// To be able to send tokens to the server.
	corsConfig.AllowCredentials = true

	// OPTIONS method for ReactJS
	corsConfig.AddAllowMethods("OPTIONS")

	// Register the middleware
	router.Use(cors.New(corsConfig))

	user := router.Group("/user")
	routes.UserRouter(user)

	dogadaji := router.Group("/event")
	routes2.DogadajiRouter(dogadaji)

	tickets := router.Group("/ticket")
	routes3.TicketRouter(tickets)

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
