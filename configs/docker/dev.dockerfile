FROM node:16-alpine as base

WORKDIR /app

COPY package.json yarn.lock ./
COPY configs ./configs

FROM base as dev

RUN yarn install

COPY . .

CMD yarn start:dev
