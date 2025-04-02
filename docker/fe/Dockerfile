# Use Node.js for building Next.js
FROM node:18 AS builder

WORKDIR /app
COPY ../FE ./
RUN npm install --frozen-lockfile

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM node:18

EXPOSE 3000

CMD ["npm", "run", "dev"]
