FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY tsconfig*.json ./

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]