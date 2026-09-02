FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=development
ENV PORT=3001
ENV RENMESHI_STORE_PATH=data/recipes.json
ENV RENMESHI_UPLOAD_DIR=data/uploads/recipes

EXPOSE 3001

CMD ["node", "--import=tsx", "server/index.ts"]
