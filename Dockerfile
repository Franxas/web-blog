# Stage 1: Build the Application
# We use node:20 as the base for building and installing dependencies.
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching.
# If these files don't change, subsequent builds can skip 'npm install'.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Stage 2: Create the Final Production Image
# We use node:20 as the runtime image with all the necessary tools.
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the node_modules and built application files from the 'build' stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app .

# Expose the port your app runs on
EXPOSE 3000

# Run the application using the non-root user (recommended for security)
USER node

# Define the command to start your application
CMD [ "node", "private/server.js" ]
