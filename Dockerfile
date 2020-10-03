# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14-alpine as build-stage

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY ./ /app/

RUN yarn run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15-alpine

COPY default.conf /etc/nginx/conf.d

ARG auth

# Configures HTTP Basic Authentication, when ARG auth is not empty
RUN if [ "$auth" != "" ] ; then \
  sed -i "/^.*location \/ {.*/a \ \ \ \ \ \ \ \ auth_basic \"Administrator’s Area\"" /etc/nginx/conf.d/default.conf; \
  sed -i "/^.*location \/ {.*/a \ \ \ \ \ \ \ \ auth_basic_user_file \/etc\/apache2\/.htpasswd;" /etc/nginx/conf.d/default.conf; \
  fi

COPY --from=build-stage /app/build/ /usr/share/nginx/html/

EXPOSE 80
