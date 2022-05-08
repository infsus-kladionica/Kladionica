package config

import (
	"os"
	"strconv"
	"time"
)

type serverConfig struct {
	Port    int64
	Timeout time.Duration
}

// ServerConf configuration
var ServerConf *serverConfig

func init() {
	port, err := strconv.ParseInt(os.Getenv("SERVER_PORT"), 10, 64)
	if err != nil {
		port = 8080
	}

	timeoutSeconds, err := strconv.ParseInt(os.Getenv("SERVER_TIMEOUT_SECONDS"), 10, 64)
	if err != nil {
		timeoutSeconds = 100
	}
	timeout := time.Duration(timeoutSeconds) * time.Second

	ServerConf = &serverConfig{
		Port:    port,
		Timeout: timeout,
	}
}
