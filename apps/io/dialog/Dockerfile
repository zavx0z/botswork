FROM docker.io/node:lts-alpine

ENV SOCKET_PORT=${SOCKET_PORT}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
EXPOSE ${SOCKET_PORT}
WORKDIR /app
RUN addgroup --system io-dialog && adduser --system -G io-dialog io-dialog
COPY dist io-dialog
RUN chown -R io-dialog:io-dialog .
RUN npm --prefix io-dialog --omit=dev -f install
CMD [ "node", "io-dialog" ]
