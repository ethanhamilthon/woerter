# 1. Build Backend
FROM golang:1.22-alpine AS builder-backend

WORKDIR /build
COPY backend/go.mod backend/go.sum ./  
RUN go mod download                    

COPY backend/ ./                   
RUN go build -o /build/word cmd/main.go

# 2. Build Frontend
FROM node:20 as builder-frontend
WORKDIR /frontend

RUN npm install -g pnpm
COPY frontend/pnpm-lock.yaml frontend/package.json ./
RUN pnpm install

COPY frontend/ .
RUN pnpm run build

# 3. Run Backend
FROM gcr.io/distroless/base-debian12 AS backend

WORKDIR /app
COPY --from=builder-backend /build/word .
COPY .env /app/.env
ENV ACT_MODE="prod"

CMD ["./word"]

# 4. Nginx
FROM nginx:alpine AS nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder-frontend /frontend/dist /usr/share/nginx/html
COPY --from=builder-frontend /frontend/dist /usr/share/nginx/html/word

# 5. Certbot (Let's Encrypt)
FROM certbot/certbot AS certbot

# Создаем необходимые директории для SSL сертификатов
RUN mkdir -p /etc/letsencrypt
