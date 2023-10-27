FROM node:20-slim as builder
WORKDIR /app
COPY package.* .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist/smartfit /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
