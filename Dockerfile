# for Cloud Run
FROM node:18-slim AS builder
RUN apt-get update && \
  apt-get install -y --no-install-recommends libsqlite3-dev && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*
ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.8-linux-amd64-static.tar.gz /tmp/litestream.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/litestream.tar.gz

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:18-slim
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN apt-get update && \
  apt-get install -y --no-install-recommends libsqlite3-dev ca-certificates && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

COPY --from=builder node_modules/.prisma/client/libquery_engine-* node_modules/.prisma/client/
COPY --from=builder node_modules/.prisma/client/schema.prisma node_modules/.prisma/client/schema.prisma
COPY --from=builder /usr/local/bin/litestream /usr/local/bin/litestream
COPY etc/litestream.yml etc/litestream.yml
COPY --from=builder package.json yarn.lock ./
COPY --from=builder prisma ./

RUN yarn install
RUN npx prisma generate
COPY run.sh /run.sh
COPY --from=builder dist ./dist

CMD ["/bin/bash", "run.sh"]
