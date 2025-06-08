FROM openjdk:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x ./mvnw

RUN ./mvnw package -DskipTests

RUN cp target/*.jar app.jar

CMD ["java","-jar","/app.jar"]