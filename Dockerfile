FROM node:19.0-bullseye
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD [ "node", "index.js" ]