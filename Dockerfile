FROM node:20-alpine3.16

RUN npm install -g npm@latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]