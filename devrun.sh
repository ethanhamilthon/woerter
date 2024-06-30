#!/bin/bash

# Функция для завершения запущенных процессов
cleanup() {
  echo "Завершаем процессы..."
  kill $VITE_PID $ASTRO_PID 2>/dev/null
  exit 0
}

# Устанавливаем обработчик для сигнала SIGINT (Ctrl+C)
trap cleanup SIGINT

# Перейти в папку app и запустить Vite React проект в режиме разработки
cd app || { echo "Не удалось перейти в папку app"; exit 1; }
echo "Запуск Vite React проекта в папке app..."
pnpm run dev &

# Сохранить PID Vite процесса, чтобы в случае необходимости можно было его остановить
VITE_PID=$!

# Проверить успешный запуск Vite
if [ $? -ne 0 ]; then
  echo "Ошибка запуска Vite React проекта в папке app"
  exit 1
fi

# Вернуться в корневую директорию
cd ..

# Перейти в папку landing и запустить Astro проект в режиме разработки
cd landing || { echo "Не удалось перейти в папку landing"; exit 1; }
echo "Запуск Astro проекта в папке landing..."
pnpm run dev &

# Сохранить PID Astro процесса, чтобы в случае необходимости можно было его остановить
ASTRO_PID=$!

# Проверить успешный запуск Astro
if [ $? -ne 0 ]; then
  echo "Ошибка запуска Astro проекта в папке landing"
  exit 1
fi

echo "Оба проекта запущены успешно!"
echo "Vite PID: $VITE_PID, Astro PID: $ASTRO_PID"

# Ожидание завершения обоих процессов
wait $VITE_PID $ASTRO_PID
