# Step 1: Base Image
FROM node:18-alpine

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

COPY . .

# Step 6: Expose port (optional)
EXPOSE 5000

# Step 7: Start the application
CMD ["node", "server.js"]
