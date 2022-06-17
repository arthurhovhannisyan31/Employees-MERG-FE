FROM node:16-alpine as base

WORKDIR /app

COPY package.json yarn.lock ./
COPY configs ./configs

FROM base as build

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM build as serve

COPY /dist /dist

CMD yarn start
