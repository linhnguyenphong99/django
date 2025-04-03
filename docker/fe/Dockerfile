# Use Node.js for building Next.js
FROM node:18 AS builder

WORKDIR /app
COPY ./FE ./
RUN npm install --frozen-lockfile

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM node:18

EXPOSE 3000

# Install next from npm
RUN npm install next

CMD ["npm", "run", "dev"]
