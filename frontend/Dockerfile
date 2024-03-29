# Define the base stage
FROM node:20-alpine as base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Update npm to the latest version
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Development stage
FROM base as development
# The default command to run for development
CMD ["npm", "start"]

# Build stage for creating production build of the React app
FROM base as build
# Build the React application
RUN npm run build

# New stage for serving the app via Nginx
FROM nginx:alpine as production
# Copy built static files from the build stage to Nginx serve directory
COPY --from=build /app/build /usr/share/nginx/html
# Remove the default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# Copy a new configuration file
COPY nginx.conf /etc/nginx/conf.d

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
