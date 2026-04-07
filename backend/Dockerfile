FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .

EXPOSE 5007
CMD ["node", "src/server.js"]
