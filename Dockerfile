FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY dist/ ./dist/

ENV MCP_TRANSPORT=http
ENV MCP_PORT=8080

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO/dev/null http://localhost:8080/health || exit 1

CMD ["node", "dist/index.js"]
