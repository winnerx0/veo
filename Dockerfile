# Stage 1: Build Spring Boot app
FROM openjdk:21-jdk AS build
WORKDIR /app
COPY . .
RUN chmod +x ./mvnw
RUN ./mvnw package -DskipTests

# Stage 2: Build Next.js app
FROM node:22-alpine AS nextjs-builder
WORKDIR /veo-client
COPY veo-client/ ./
RUN npm install --force
RUN npm run build

FROM eclipse-temurin:21-jdk AS final

WORKDIR /app

# Copy Spring Boot JAR from build stage
ARG JAR_FILE=target/*.jar
COPY --from=build /app/${JAR_FILE} app.jar

# Copy Next.js build output
COPY --from=nextjs-builder /veo-client/ /nextjs/

# Install Node.js
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Expose ports for Spring Boot and Next.js
EXPOSE 8080 3000

# Start both Spring Boot and Next.js apps
CMD ["sh", "-c", "java -jar app.jar & cd /nextjs && npm run start"]
