
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copia todo o código para dentro do container
COPY . .

RUN npx prisma generate
EXPOSE 3001

# Iniciar o servidor usando tsx
CMD ["npx", "tsx", "src/server.ts"]
