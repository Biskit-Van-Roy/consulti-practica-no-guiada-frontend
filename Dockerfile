FROM node:16.13.0-alpine as builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build --prod

FROM nginx:1.17.10-alpine
COPY --from=builder /app/dist/angular-proyecto-fase-2 /usr/share/nginx/html
