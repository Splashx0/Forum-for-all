FROM node:16-alpine
WORKDIR /back
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 8000
CMD ["node","server.js"]