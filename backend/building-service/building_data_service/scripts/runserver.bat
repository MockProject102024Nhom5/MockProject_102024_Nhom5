@echo off

REM Mở thư mục chứa project
cd ..

REM Kích hoạt môi trường ảo
call env\Scripts\activate.bat

REM Chuyển đến thư mục building_service
cd building_data

REM Chạy server
python manage.py runserver
