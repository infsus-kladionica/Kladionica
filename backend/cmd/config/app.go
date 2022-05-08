package config

import (
	"os"
	"strconv"
)

type appConfig struct {
	Name string
	Port int64
}

// App configuration
var App *appConfig

func init() {
	port, err := strconv.ParseInt(os.Getenv("SERVER_PORT"), 10, 64)
	if err != nil {
		port = 8000
	}

	App = &appConfig{
		Name: os.Getenv("APP_NAME"),
		Port: port,
	}
}
