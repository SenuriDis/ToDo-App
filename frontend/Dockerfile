FROM node:16

WORKDIR /app

COPY package.json ./
RUN npm install -g serve

COPY . .

EXPOSE 3000

CMD ["/usr/local/bin/serve", "-s", ".", "-l", "3000", "-n"]