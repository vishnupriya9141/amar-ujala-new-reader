# Multi-stage build for full-stack application

# Stage 1: Build the frontend
FROM node:18-alpine AS frontend-builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Stage 2: Setup the backend
FROM node:18-alpine AS backend

# Set working directory
WORKDIR /app

# Copy server package files
COPY server/package*.json ./server/

# Install server dependencies
RUN cd server && npm ci --only=production

# Copy server source
COPY server/ ./server/

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/dist ./dist

# Copy server .env (if exists)
COPY server/.env ./server/.env

# Set working directory to server
WORKDIR /app/server

# Expose port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]