FROM node:10-alpine

WORKDIR /usr/app

COPY package.json /usr/app
COPY src /usr/app/src
COPY tsconfig.json /usr/app

RUN npm install --silent

EXPOSE 3001

CMD [ "npm", "dev" ]