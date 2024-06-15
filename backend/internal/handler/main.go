package handler

import (
	"fmt"
	"mime"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"path/filepath"
)

func (h *Handler) Proxy(w http.ResponseWriter, r *http.Request) {
	if h.config.Mode == "dev" {
		proxy := httputil.NewSingleHostReverseProxy(&url.URL{
			Scheme: "http",
			Host:   h.config.ProxyHost + h.config.ProxyPort,
		})

		// Проксируем запросы
		proxy.ServeHTTP(w, r)
	} else {
		path := r.URL.Path
		fmt.Println(path)
		// Открываем файл
		var filePath string
		if path == "/" {
			filePath = filepath.Join("statics", "index.html")
		} else {
			filePath = filepath.Join("statics", path)
		}
		fmt.Println(filePath)
		file, err := os.Open("statics/index.html")
		if err != nil {
			http.Error(w, "File not found 404", http.StatusNotFound)
			return
		}
		defer file.Close()

		// Получаем информацию о файле
		fi, err := file.Stat()
		if err != nil {
			http.Error(w, "Unable to get file info", http.StatusInternalServerError)
			return
		}

		// Проверяем, что это файл, а не директория
		if fi.IsDir() {
			http.Error(w, "File not found", http.StatusNotFound)
			return
		}

		// Устанавливаем заголовки
		ext := filepath.Ext(filePath)
		mimeType := mime.TypeByExtension(ext)
		if mimeType == "" {
			// Если MIME-тип не определен, устанавливаем его как текстовый файл по умолчанию
			mimeType = "text/plain"
		}
		fmt.Println(mimeType)
		w.Header().Set("Content-Type", mimeType)
		w.Header().Set("Content-Length", fmt.Sprintf("%v", fi.Size()))

		// Отправляем файл пользователю
		http.ServeFile(w, r, filePath)
	}

}
