# Estágio 1: Build da aplicação React + Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copia manifestos de dependências
COPY package*.json ./

# Instala todas as dependências necessárias para o build
RUN npm install

# Copia todo o código fonte
COPY . .

# Compila para produção gerando a pasta /dist
RUN npm run build

# Estágio 2: Nginx Alpine de alta performance
FROM nginx:alpine

# Remove configurações padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copia nossa configuração ajustada para SPA e proxy Kubernetes
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados do build anterior
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
