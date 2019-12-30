FROM node:10-alpine

WORKDIR /usr/app

COPY package.json /usr/app
COPY src /usr/app/src
COPY tsconfig.json /usr/app

RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]