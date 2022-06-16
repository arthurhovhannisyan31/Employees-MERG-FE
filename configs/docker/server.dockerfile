FROM node:16-alpine as base

WORKDIR /app

COPY package.json yarn.lock ./
COPY configs ./configs

FROM base as build

# RUN yarn install --production
RUN yarn install --frozen-lockfile

COPY . .

CMD yarn start
