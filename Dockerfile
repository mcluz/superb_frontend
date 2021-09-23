FROM node:16 as builder 
WORKDIR /var/www
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.21.3-alpine
COPY --from=builder /var/www/build /var/www
COPY ./nginx/10-nginx-default.config.template /etc/nginx/conf.d/default.conf