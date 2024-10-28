@echo off

REM Tạo môi trường ảo
python -m venv env

REM Kích hoạt môi trường ảo
call env\Scripts\activate

REM Cài đặt các package cần thiết
pip install -r requirements.txt

echo Setup complete!