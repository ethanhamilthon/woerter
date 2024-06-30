# 1. Build App
FROM node:20 as builder-app
WORKDIR /app

RUN npm install -g pnpm
COPY app/pnpm-lock.yaml app/package.json ./
RUN pnpm install

COPY app/ .
RUN pnpm run build

# 1. Build Landing
FROM node:20 as builder-landing
WORKDIR /landing

RUN npm install -g pnpm
COPY landing/pnpm-lock.yaml landing/package.json ./
RUN pnpm install

COPY landing/ .
RUN pnpm run build

# 2. Nginx
FROM nginx:alpine AS nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder-app /app/dist /usr/share/nginx/html/app
COPY --from=builder-landing /landing/dist /usr/share/nginx/html/landing

# 5. Certbot (Let's Encrypt)
FROM certbot/certbot AS certbot

# Создаем необходимые директории для SSL сертификатов
RUN mkdir -p /etc/letsencrypt
