FROM node:fermium AS build

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

# 
FROM nginx:stable

EXPOSE 80

COPY --from=build /app/build /usr/share/nginx/html