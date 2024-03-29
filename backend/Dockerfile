# Define the base stage
FROM node:21-bullseye as base

# Set the NODE_ENV environment variable with a build argument
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package*.json ./

# Update npm to the latest version
RUN npm install -g npm@latest

# Install production dependencies only
RUN if [ "$NODE_ENV" = "production" ]; \
    then npm install --only=production && npm cache clean --force; \
    fi

# Copy the rest of the application code
COPY . .

# Development stage
FROM base as development
# Set the NODE_ENV environment variable to 'development'
ENV NODE_ENV=development
# Install all dependencies, including devDependencies
RUN npm install && npm cache clean --force
# Command to run the development server
CMD ["npm", "run", "dev"]

# Production stage
FROM base as production
# Command to run the application
CMD ["node", "server.js"]
