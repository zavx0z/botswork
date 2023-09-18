FROM node:18-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --prod

# Bundle app source
COPY ./dist/* /usr/src/app
ENV IO_CONNECT_PORT=${IO_CONNECT_PORT}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
EXPOSE ${IO_CONNECT_PORT}
CMD [ "npm", "start" ]
