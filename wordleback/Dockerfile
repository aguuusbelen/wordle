FROM openjdk:8
COPY target/classes/wordle/demo /tmp
WORKDIR /tmp
CMD java WordleOnlineApplication.class
ENTRYPOINT ["java","-jar","/app.jar"]
