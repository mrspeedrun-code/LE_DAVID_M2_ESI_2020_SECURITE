# Create image based on the official Node 6 image from the dockerhub
FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 4242

CMD ["npm", "start"]
