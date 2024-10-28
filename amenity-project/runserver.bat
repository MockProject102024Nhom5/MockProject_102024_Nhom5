@echo off
REM Run Spring Boot application using the generated JAR file

REM Optional: Set Java Home if needed
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

REM Check if the JAR file exists
if not exist target\amenity-project-0.0.1-SNAPSHOT.jar (
    echo JAR file not found. Please build the project using 'mvn clean package'.
    pause
    exit /b
)

REM Run the Spring Boot application
echo Starting the Spring Boot application...
java -jar target\amenity-project-0.0.1-SNAPSHOT.jar

REM Pause to keep the console open after the application stops
pause
