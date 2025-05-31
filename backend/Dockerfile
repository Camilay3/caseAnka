
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copia todo o código para dentro do container
COPY . .

RUN npx prisma generate
RUN apt-get update && apt-get install -y default-mysql-client
EXPOSE 3001

CMD ["npm", "run", "dev"]
