FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn*.lock ./

RUN yarn install --production

COPY . .

EXPOSE 3000

RUN yarn tsc

CMD ["node", "dist/src/server.js"]