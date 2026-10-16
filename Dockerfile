# Stage 1: Build the Application
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Install frontend dependencies and build the Vite application
RUN npm install --prefix client
RUN npm run build --prefix client

# Stage 2: Create the Final Production Image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the node_modules and built application files from the 'build' stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app .

# Expose the port your app runs on
EXPOSE 3000

# Run the application using the non-root user
USER node

# Define the command to start the application
CMD ["node", "private/server.js"]
