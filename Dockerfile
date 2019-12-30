FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY tsconfig*.json ./

COPY . .

RUN npm install --silent

EXPOSE 3001

CMD ["npm", "start"]