FROM node:16-alpine3.14

WORKDIR /app
COPY src /app/src
COPY package.json /app
COPY tsconfig.json /app
COPY yarn.lock /app

RUN yarn install
RUN yarn build
CMD ["yarn", "start"]