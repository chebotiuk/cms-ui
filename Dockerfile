# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# react builder state
FROM node:15-alpine as builder

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build

# nginx state for serving content
FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /usr/src/app/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
