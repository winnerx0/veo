# Stage 1: Build Spring Boot app
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY . .
RUN chmod +x ./mvnw && \
    ./mvnw package -DskipTests

# Stage 2: Build Next.js app
FROM node:22-alpine AS nextjs-builder
WORKDIR /veo-client
COPY veo-client/package*.json ./
RUN npm ci --force
COPY veo-client/ ./
RUN npm run build

# Stage 3: Final image - combined runtime
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy Spring Boot JAR
COPY --from=build /app/target/*.jar app.jar

# Install Node.js properly
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy Next.js build
COPY --from=nextjs-builder /veo-client/ /nextjs/

# Install serve for production Next.js hosting
RUN npm install -g serve

EXPOSE 8080 3000

# Run both services with proper process management
CMD ["sh", "-c", "java -jar app.jar & cd /nextjs && serve -p 3000 -s build"]