FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy all source files
COPY backend ./backend
COPY frontend ./frontend

# Build frontend
RUN cd frontend && npm run build

# Move build to backend public folder
RUN mkdir -p backend/public && cp -r frontend/build/* backend/public/

WORKDIR /app/backend

# Expose port 7860 (Hugging Face default)
EXPOSE 7860

ENV PORT=7860
ENV NODE_ENV=production

CMD ["node", "server.js"]

