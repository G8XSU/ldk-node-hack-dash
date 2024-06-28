# Use the official Ubuntu image as a parent image
FROM ubuntu:latest

# Install curl and other necessary system packages
RUN apt-get update && apt-get install -y curl gnupg

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs protobuf-compiler

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./


# Copy the rest of your application
COPY . .
RUN rm -rf ./node_modules
# Install dependencies
RUN pnpm install

# Build the Next.js application
#RUN pnpm build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["pnpm", "run", "docker"]
