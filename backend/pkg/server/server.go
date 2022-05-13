package server

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/hashicorp/go-hclog"
	"time"
)

type Server struct {
	Port    int64
	Timeout time.Duration
	Router  *gin.Engine
	Logger  hclog.Logger
}

func New(port int64, timeout time.Duration, router *gin.Engine, logger hclog.Logger) *Server {
	return &Server{
		Port:    port,
		Timeout: timeout,
		Router:  router,
		Logger:  logger,
	}
}

func (s *Server) Run() {
	s.Router.Run(fmt.Sprintf(":%i", s.Port))
}
