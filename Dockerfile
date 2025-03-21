FROM node:22-alpine3.18

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
ENV PATH=/app/node_modules/.bin:$PATH

COPY . .
RUN chown -R node:node /app
USER node
EXPOSE 1337
CMD ["pnpm", "run", "develop"]
