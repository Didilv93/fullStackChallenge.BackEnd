FROM node:10-alpine

WORKDIR /usr/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /usr/app
COPY src /usr/app/src
COPY tsconfig.json /usr/app

RUN npm install --silent

EXPOSE 3001

CMD [ "npm", "dev" ]