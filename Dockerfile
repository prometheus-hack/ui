# Use the official Node.js image as the base
FROM node:21.7.1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies (assuming you're using Yarn)
COPY package.json ./
RUN yarn install
RUN yarn global add @nrwl/cli
RUN npm i nx -g
# Copy the entire Nx workspace into the container
COPY . .

# Build all the React apps
RUN nx build --prod

# Expose the port(s) your apps will run on (adjust as needed)
EXPOSE 4200
EXPOSE 4300

# Start the apps (you can customize this based on your app names)
CMD ["nx", "serve", "client-crud"]
