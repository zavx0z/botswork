FROM docker.io/node:lts-alpine

ENV SOCKET_PORT=${SOCKET_PORT}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
EXPOSE ${SOCKET_PORT}
WORKDIR /app
RUN addgroup --system io-message && adduser --system -G io-message io-message
COPY dist io-message
RUN chown -R io-message:io-message .
RUN npm --prefix io-message --omit=dev -f install
CMD [ "node", "io-message" ]
