FROM node:fermium

ENV MONGO_URI=<insert mongo uri here>

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 4000

CMD ["npm", "start"]