@echo off
REM Set environment variables for SQL Server connection
set SPRING_DATASOURCE_URL=jdbc:sqlserver://localhost:1433;databaseName=MockProject_102024_Nhom5;encrypt=false;trustServerCertificate=true
set SPRING_DATASOURCE_USERNAME=sa
set SPRING_DATASOURCE_PASSWORD=123

REM Optional: Set Java Home if needed
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

REM Run Maven commands
mvn clean package

REM Run the Spring Boot application
java -jar target\amenity-project-0.0.1-SNAPSHOT.jar

pause
