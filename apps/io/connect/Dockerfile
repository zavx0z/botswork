FROM docker.io/node:lts-alpine

ENV IO_CONNECT_PORT=${IO_CONNECT_PORT}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
EXPOSE ${IO_CONNECT_PORT}

WORKDIR /app

RUN addgroup --system io-connection && adduser --system -G io-connection io-connection

COPY dist io-connection
RUN chown -R io-connection:io-connection .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix io-connection --omit=dev -f install

CMD [ "node", "io-connection" ]
