# using node alpine as base image
FROM node:18-alpine

# working dir ./app
WORKDIR /app


# Copy the package.json
COPY ./package.json .

# Install the dependencies
RUN npm install --legacy-peer-deps

COPY ./ ./

# set the default command
CMD ["npm","run", "dev"]
