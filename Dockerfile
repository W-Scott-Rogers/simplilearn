FROM node:12.2.0 as node

WORKDIR /user/src/app

COPY ./ht-eval/ .

RUN npm config set strict-ssl false \
    && npm install \
    && npm run ghp

FROM nginx:1.13.12-alpine

COPY --from=node /user/src/app/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
