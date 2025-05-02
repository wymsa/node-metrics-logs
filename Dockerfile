# BUILD

FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

RUN npm run build

# RUN

FROM node:22-alpine as runner

WORKDIR /app

COPY package*.json .
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

CMD [ "npm", "run", "start:prod" ]


