package handler

import "net/http"

func (h *Handler) HelloWorld(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement the ServeHTTP method.
	w.Write([]byte("Hello, World from Main!"))
}

func (h *Handler) Index(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement the ServeHTTP method.
	w.Write([]byte("Hello, World from Main!"))
}
