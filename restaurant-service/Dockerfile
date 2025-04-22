# Use official Node.js image
FROM node:20.17.0

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port your app runs on
EXPOSE 5004

# Start the service
CMD ["npm", "run", "dev"]