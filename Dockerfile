# Stage 1: Build the application
# Use a Node.js base image to install dependencies and build the application
FROM node:18-alpine as builder

# Install build tools, Python and Yarn
RUN apk add --no-cache python3 make g++ yarn

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to work directory
COPY package.json yarn.lock ./

# Install dependencies in the container using yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the code to the Docker image
COPY . .

# Copy and run your custom script to modify web3
COPY modify-web3-script.sh .
RUN chmod +x modify-web3-script.sh && ./modify-web3-script.sh

# Build the application using yarn
RUN yarn build

# Stage 2: Set up the production environment
# Use a clean Node.js base image to set up the production environment
FROM node:18-alpine

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy the build artifacts from the builder stage
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/next.config.js ./next.config.js

# Your app binds to port 3000 by default, expose this port
EXPOSE 3000

# Start the Next.js application using yarn
CMD ["yarn", "start"]
