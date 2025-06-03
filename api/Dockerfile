# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only package files to leverage Docker cache
COPY package*.json ./

# Set default environment (can be overridden in docker-compose)
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Install dependencies (omit devDependencies if NODE_ENV=production)
RUN if [ "$NODE_ENV" = "production" ]; \
    then npm install --omit=dev; \
    else npm install; \
    fi

# Copy the full application
COPY . .

# Expose app port
EXPOSE 3000

# Conditional startup command
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"test\" ]; then npm test; else npm start; fi"]
