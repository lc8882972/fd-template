FROM maven:3.6.1-jdk-8-alpine
WORKDIR /usr/src/app
RUN echo "Asia/shanghai" > /etc/timezone
COPY pom.xml ./
RUN mvn validate
COPY . .
RUN mvn package spring-boot:repackage
RUN ls
RUN cp ./target/*.jar ./app.jar
VOLUME /tmp
EXPOSE 9000
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","-Duser.timezone=Asia/Shanghai","./app.jar"]
