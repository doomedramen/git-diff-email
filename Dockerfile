# Use the official Node.js image.
FROM node:18

# Create and set the working directory.
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files.
COPY package*.json ./

# Install dependencies.
RUN yarn install

# Copy the rest of the application code.
COPY . .

# Build the TypeScript code.
RUN yarn build

# Set the command to run the application.
CMD ["node", "dist/index.js"]
