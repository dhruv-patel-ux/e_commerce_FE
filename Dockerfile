FROM node:20

RUN npm install -g http-server

RUN npm install -g @angular/cli

WORKDIR /user/web/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4200:4200

CMD [ "http-server",'/dist' ]
