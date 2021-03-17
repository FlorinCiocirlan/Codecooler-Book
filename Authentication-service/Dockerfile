FROM node:15.11.0-alpine3.10

WORKDIR /usr/src/app

COPY package.*json ./

RUN npm install

COPY ./ ./usr/src/app

CMD ["npm","start"]