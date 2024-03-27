# Build an intermediate image using node:14-alpine
FROM node:20-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Update npm to the latest version
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY /src ./src
COPY app.js .
COPY server.js .

# Build the final image
FROM node:14-alpine

WORKDIR /app

# Copy from the intermediate image
COPY --from=builder /app .

# Set the default command to run the application
CMD ["node", "server.js"]
