# Use the official Node.js 20 image as a base
FROM node:20.11-alpine

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the desired port
EXPOSE 3000

# Command to run the frontend server
CMD ["npm", "start"]
