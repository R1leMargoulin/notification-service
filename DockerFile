FROM node:14
ENV NODE_ENV=dev

WORKDIR /notifs

COPY ["package.json", "package-lock.json", "./"]

COPY .env ./

RUN npm install

COPY . .

CMD npm run start