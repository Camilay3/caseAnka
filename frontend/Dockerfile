FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copia todo o código para dentro do container
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]