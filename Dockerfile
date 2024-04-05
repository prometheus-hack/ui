# Use an official Node.js image as the base
FROM node:21.7.1

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Run the Nx command to serve your app
CMD ["npx", "nx", "run-many", "--parallel", "--target=serve", "--projects=client-crud"]
