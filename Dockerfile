# Use the official Node.js image as the base image
FROM node:latest as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx as the web server
FROM nginx:latest

# Copy the built app from the previous stage to the NGINX server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
