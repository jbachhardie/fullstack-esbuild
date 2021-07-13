FROM node:lts-alpine
COPY . /build
WORKDIR /build/
RUN ["yarn", "install"]
RUN ["yarn", "workspace", "@backend/server", "build"]

FROM node:lts-alpine
WORKDIR /root/
COPY --from=0 /build/backend/server/bundle .
ENV NODE_ENV "production"
CMD ["node", "server.js"]
