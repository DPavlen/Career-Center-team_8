# build env
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN NODE_ENV=development npm i
RUN npm run build

# Эта команда запустит встроенный сервер на Node.js, который будет раздавать
# содержимое директории /app/build на порте 8000
CMD ["npx", "-y", "http-server", "-p", "8000", "/app/dist"] 