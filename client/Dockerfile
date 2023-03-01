FROM node:16-alpine
WORKDIR /front
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start"]