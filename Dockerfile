# Use the official Node.js image as a base
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev", "--host"]

