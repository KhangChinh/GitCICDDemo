# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install --production

# ---- Production Stage ----
FROM node:20-alpine

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy app source
COPY package.json server.js ./
COPY public ./public

# Expose port
EXPOSE 3000

# Run as non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "server.js"]
