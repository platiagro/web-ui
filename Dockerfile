FROM nginx:1.15-alpine

COPY default.conf /etc/nginx/conf.d

COPY build /usr/share/nginx/html/

EXPOSE 80