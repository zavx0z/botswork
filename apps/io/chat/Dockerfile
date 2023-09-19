FROM docker.io/node:lts-alpine

ENV SOCKET_PORT=${SOCKET_PORT}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
EXPOSE ${SOCKET_PORT}
WORKDIR /app
RUN addgroup --system io-chat && adduser --system -G io-chat io-chat
COPY dist io-chat
RUN chown -R io-chat:io-chat .
RUN npm --prefix io-chat --omit=dev -f install
CMD [ "node", "io-chat" ]
