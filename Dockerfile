FROM node:alpine

WORKDIR /usr/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

COPY . .

RUN npm install --silent

EXPOSE 3001

CMD [ "npm", "dev" ]