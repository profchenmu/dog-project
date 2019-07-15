FROM node:12.4
WORKDIR /usr/src/dogsProject
COPY ./server/package*.json ./
RUN npm i
COPY ./server .
COPY ./client/public ./public
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
