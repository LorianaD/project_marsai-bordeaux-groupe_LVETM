FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json vite.config.js index.html ./
COPY src ./src
COPY public ./public

ARG VITE_API_URL
ARG VITE_S3_PUBLIC_BASE
ARG VITE_RECAPTCHA_SITE_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_S3_PUBLIC_BASE=$VITE_S3_PUBLIC_BASE
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY

RUN npm install && npm run build

FROM nginx:alpine AS runtime

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/dist ./

EXPOSE 80
