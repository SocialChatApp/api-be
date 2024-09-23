# Development Stage
FROM node:18-alpine AS development

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json first to utilize Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Create the logs directory and set permissions
RUN mkdir -p /app/logs
RUN chmod -R 777 /app/logs

# Change ownership of /app to the node user
RUN chown -R node:node /app

# Copy the rest of the application source
COPY . .

# Use the node user from the image (instead of the root user)
USER node

# Command to run your app in development mode
CMD ["npm", "run", "start:dev"]
