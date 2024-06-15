package middleware

import (
	"log"
	"net/http"
	"time"
)

type Middleware struct {
}

func New() *Middleware {
	return &Middleware{}
}

type statusWriter struct {
	http.ResponseWriter
	status int
}

func (sw *statusWriter) WriteHeader(code int) {
	sw.status = code
	sw.ResponseWriter.WriteHeader(code)
}

func (m *Middleware) Info(next http.HandlerFunc) http.HandlerFunc {
	hf := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		sw := statusWriter{ResponseWriter: w}
		start := time.Now()

		next.ServeHTTP(&sw, r)

		if sw.status == 0 {
			sw.status = 200
		}
		log.Printf("Status: %d for %s %s, in %v", sw.status, r.Method, r.URL.Path, time.Since(start))
	})
	return hf
}

func (m *Middleware) With(handler func(http.ResponseWriter, *http.Request), middlewares ...func(http.HandlerFunc) http.HandlerFunc) http.HandlerFunc {
	finalHandler := http.HandlerFunc(handler)
	for _, middleware := range middlewares {
		finalHandler = middleware(finalHandler)
	}
	return finalHandler
}
