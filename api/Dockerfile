# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if any) to the working directory
# This allows caching of dependencies
COPY package*.json .

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will listen on
EXPOSE 3000

# Define the command to run the application
CMD [ "npm", "test" ]