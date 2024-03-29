# Define the base stage
FROM node:20-bullseye as base

# Set the NODE_ENV variable
ARG NODE_ENV
# Set the NODE_ENV environment variable to the value of the NODE_ENV build argument
ENV NODE_ENV=${NODE_ENV}

# Create the /app directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm ci;

# Copy the rest of the application code
COPY . .

# Development stage
FROM base as development
# Set the NODE_ENV environment variable to 'development'
ENV NODE_ENV=development
# Command to run the development server
CMD ["npm", "run", "dev"]

# Production stage
FROM base as production
ENV NODE_ENV=production
# Command to run the application
CMD ["node", "server.js"]
