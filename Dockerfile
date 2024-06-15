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


# 3. Run
FROM gcr.io/distroless/base-debian12

WORKDIR /app
COPY --from=builder-backend /build/word .
COPY --from=builder-frontend /frontend/dist ./statics       

# Копируем .env файл
COPY .env /app/.env
ENV ACT_MODE="prod"

# Запуск приложения
CMD ["./word"]
