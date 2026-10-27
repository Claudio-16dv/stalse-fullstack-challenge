FROM node:22-bookworm-slim

WORKDIR /app

RUN mkdir -p /app/node_modules /app/.next && chown -R node:node /app

USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]
