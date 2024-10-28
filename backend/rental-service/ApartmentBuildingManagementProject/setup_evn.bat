@echo off
:: Đặt tên cho biến môi trường và phiên bản ứng dụng
set "JAVA_VERSION=17"
set "APP_JAR=ApartmentBuildingManagementProject-0.0.1-SNAPSHOT.jar"

:: Thiết lập đường dẫn Java trong PATH
set PATH=%JAVA_HOME%\bin;%PATH%

:: Build dự án bằng Maven, bỏ qua các bài test
mvn clean install -DskipTests

:: Khởi động ứng dụng Spring Boot
java -jar target\%APP_JAR%

pause