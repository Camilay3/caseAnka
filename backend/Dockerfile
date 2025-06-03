FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN apk add --no-cache mysql-client
EXPOSE 3001

CMD ["npm", "run", "db:deploy"]
