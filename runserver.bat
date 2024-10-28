@echo off

REM Kích hoạt môi trường ảo
call env\Scripts\activate.bat

REM Chạy server
python manage.py runserver