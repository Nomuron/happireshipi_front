FROM node:19.0-bullseye
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 1234
CMD [ "npm", "run", "build" ]
CMD [ "npm", "start" ]