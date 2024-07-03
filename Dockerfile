# 1. Base Image with pnpm
FROM node:20 as base
WORKDIR /base

RUN npm install -g pnpm

# 2. Build App
FROM base as builder-app
WORKDIR /app

COPY app/pnpm-lock.yaml app/package.json ./
RUN pnpm install

COPY app/ ./
RUN pnpm run build

# 3. Build Landing
FROM base as builder-landing
WORKDIR /landing

COPY landing/pnpm-lock.yaml landing/package.json ./
RUN pnpm install

COPY landing/ ./
RUN pnpm run build

# 4. Nginx
FROM nginx:alpine AS nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder-app /app/dist /usr/share/nginx/html/app
COPY --from=builder-landing /landing/dist /usr/share/nginx/html/landing

# 5. Certbot (Let's Encrypt)
FROM certbot/certbot AS certbot

# Создаем необходимые директории для SSL сертификатов
RUN mkdir -p /etc/letsencrypt
