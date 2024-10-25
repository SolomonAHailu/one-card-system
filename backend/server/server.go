package server

import (
	"github.com/SolomonAHailu/one-card-system/middlewares"
	"github.com/SolomonAHailu/one-card-system/routes"
	"github.com/gin-gonic/gin"
)

type Server struct {
	Router *gin.Engine
}

func NewServer() *Server {
	return &Server{
		Router: gin.Default(),
	}
}

func (s *Server) Initialize() {
	s.Router.Use(middlewares.CORSMiddleware())
	routes.RegisterRoutes(s.Router)
}

func (s *Server) Run(addr string) {
	s.Router.Run(addr)
}
