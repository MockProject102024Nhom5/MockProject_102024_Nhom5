@echo off

REM Mở thư mục chứa project
cd ..

REM Tạo môi trường ảo
python -m venv env

REM Kích hoạt môi trường ảo
call env\Scripts\activate.bat

REM Cài đặt các gói từ requirements.txt
pip install -r requirements.txt

REM Chuyển đến thư mục payment_service
cd MockProject_102024_Nhom5

REM Chạy server
python manage.py runserver
