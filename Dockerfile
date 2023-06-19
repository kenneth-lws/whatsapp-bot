FROM node:18-alpine

WORKDIR /app
COPY . /app

RUN npm ci --omit=dev

CMD [ "node", "dist/src/index.js" ]
