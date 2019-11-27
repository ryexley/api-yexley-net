FROM node:10.13.0-alpine
RUN apk add curl
RUN npm uninstall yarn -g
RUN npm install yarn@1.19.2 -g

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install

COPY *.js /app/
COPY src /app/src
COPY . /app/

RUN yarn build

EXPOSE 7100
EXPOSE 80
