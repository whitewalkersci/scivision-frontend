# Stage 1: Build the React + Vite app
FROM node:20-alpine as builder

WORKDIR /app

# Install dependencies and Vite globally
COPY package*.json ./
RUN npm install && npm install -g vite

# Copy all source
COPY . .

# Build using global vite (avoids local .bin issues)
RUN vite build

# Stage 2: Nginx for production server
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
