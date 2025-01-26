FROM openjdk:21-jdk AS build

WORKDIR /app

COPY . .

RUN chmod +x ./mvnw

RUN ./mvnw package -DskipTests

FROM openjdk:21-jdk

ARG JAR_FILE=target/*.jar

ENV SPRING_FORWARD_HEADERS_STRATEGY=framework

COPY --from=build /app/${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]