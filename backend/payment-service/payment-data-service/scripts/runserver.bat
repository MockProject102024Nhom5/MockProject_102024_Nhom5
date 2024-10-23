@echo off

REM Mở thư mục chứa project
cd ..

REM Kích hoạt môi trường ảo
call env\Scripts\activate.bat

REM Chuyển đến thư mục payment_service
cd MockProject_102024_Nhom5

REM Chạy server
python manage.py runserver
