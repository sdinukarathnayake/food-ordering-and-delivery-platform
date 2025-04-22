FROM node:20.19.0

WORKDIR /app

# Copy package.json and lock file first (if available)
COPY package*.json ./

# Install deps
RUN npm install

# Copy everything else (code, .env, etc.)
COPY . .

# Expose port
EXPOSE 7000

# Start server
CMD ["npm", "start"]
