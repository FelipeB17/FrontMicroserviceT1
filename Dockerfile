# Etapa 1: construir la app
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar el resto del código y compilar
COPY . .
RUN npm run build

# Etapa 2: servir con Next.js en producción
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
