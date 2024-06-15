#!/bin/bash

# Обработчик сигнала для завершения всех процессов
trap 'kill $(jobs -p)' SIGINT

# Сборка бэкенда
cd backend
go build -o ../build/word cmd/main.go
cd ..

# Запуск фронтенда
cd frontend
pnpm run dev &

# Запуск бэкенда
cd ..
./build/word &

# Ожидание завершения всех процессов
wait
