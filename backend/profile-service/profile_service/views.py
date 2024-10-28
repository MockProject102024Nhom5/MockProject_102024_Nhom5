from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import User, Employee, EmployeeContract, TimeKeeping, TrainingSchedule
from .serializers import UserSerializer, EmployeeSerializer, TrainingScheduleSerializer, TimeKeepingSerializer, EmployeeContractSerializer

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

import io
import json

# Create your views here.
    
# GET_USER_PROFILE API
@csrf_exempt
def user_detail_api(request):
    if request.method == 'GET':
        json_data = request.body
        
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        
        # Truy xuất employeeId từ payload
        user_id = python_data.get('userId')  # Dùng userId vì Employee dùng OneToOne với User
        
        # Kiểm tra nếu employeeId tồn tại trong payload
        if user_id is not None:
            try:
                # Lấy thông tin User trước
                user = User.objects.get(userId=user_id)
                role = user.role
                
                # Kiểm tra role có phải 'employee'
                if role == 'employee':
                    try:
                        # Truy xuất Employee bằng OneToOneField thông qua user
                        employee = Employee.objects.get(employeeId=user)
                        
                        # Lấy thông tin employee, kèm theo thông tin user và position
                        employee_serializer = EmployeeSerializer(employee)
                        
                        json_data = JSONRenderer().render(employee_serializer.data)
                        
                        return HttpResponse(json_data, content_type='application/json')
                    except Employee.DoesNotExist:
                        res = {'msg': 'Employee not found'}
                        json_data = JSONRenderer().render(res)
                        return HttpResponse(json_data, content_type='application/json', status=404)
                elif role != 'employee':
                    us_serializer = UserSerializer(user)
                    json_data = JSONRenderer().render(us_serializer.data)
                    return HttpResponse(json_data, content_type='application/json')
                else:
                    res = {'msg': 'Invalid role for the user'}
                    json_data = JSONRenderer().render(res)
                    return HttpResponse(json_data, content_type='application/json', status=400)
            
            except User.DoesNotExist:
                res = {'msg': 'User not found'}
                json_data = JSONRenderer().render(res)
                return HttpResponse(json_data, content_type='application/json', status=404)
        else:
            res = {'msg': 'userId missing in request'}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data, content_type='application/json', status=400)

# UPDATE_USER_PROFILE
@csrf_exempt
def user_update_api(request):
    if request.method == 'PUT':
        json_data = request.body
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)

        user_id = python_data.get('userId', None)
        new_password = python_data.get('password', None)  # Lấy mật khẩu mới từ dữ liệu
        old_password = python_data.get('oldPassword', None)  # Mật khẩu cũ cần để xác thực
        email = python_data.get('email', None)
        phone_number = python_data.get('phoneNumber', None)

        # Kiểm tra nếu không có userId trong payload
        if not user_id:
            return HttpResponse(json.dumps({'error': 'userId is required'}), content_type='application/json', status=400)

        try:
            user = User.objects.get(userId=user_id)
            role = user.role

            # Kiểm tra nếu người dùng muốn cập nhật mật khẩu
            if new_password:
                # Xác thực các thông tin trước khi thay đổi mật khẩu
                if not old_password or not email or not phone_number:
                    return HttpResponse(json.dumps({'error': 'You must provide oldPassword, email, and phoneNumber to update the password.'}), content_type='application/json', status=400)

                # Kiểm tra tính hợp lệ của mật khẩu cũ, email và số điện thoại
                if (user.password != old_password) and (user.email != email) and (user.phoneNumber != phone_number):
                    return HttpResponse(json.dumps({'error': 'Old password, Email and Phone number is incorrect.'}), content_type='application/json', status=400)
                if (user.password != old_password) and (user.email != email):
                    return HttpResponse(json.dumps({'error': 'Old password and Email is incorrect.'}), content_type='application/json', status=400)
                if (user.password != old_password) and (user.phoneNumber != phone_number):
                    return HttpResponse(json.dumps({'error': 'Old password and Phone number is incorrect.'}), content_type='application/json', status=400)
                if (user.email != email) and (user.phoneNumber != phone_number):
                    return HttpResponse(json.dumps({'error': 'Email and Phone number is incorrect.'}), content_type='application/json', status=400)
                if user.password != old_password:
                    return HttpResponse(json.dumps({'error': 'Old password is incorrect.'}), content_type='application/json', status=400)
                if user.email != email:
                    return HttpResponse(json.dumps({'error': 'Email is incorrect.'}), content_type='application/json', status=400)
                if user.phoneNumber != phone_number:
                    return HttpResponse(json.dumps({'error': 'Phone number is incorrect.'}), content_type='application/json', status=400)               

                # Nếu xác thực thành công, cập nhật mật khẩu mới
                user.password = new_password
                user.save()
                return HttpResponse(json.dumps({'msg': 'Password updated successfully'}), content_type='application/json', status=200)

            # Nếu không phải thay đổi mật khẩu, cập nhật thông tin khác
            if role == 'employee':
                try:
                    # Lấy thông tin employee từ user
                    employee = Employee.objects.get(employeeId=user)
                    
                    # Cập nhật thông tin employee
                    employee_serializer = EmployeeSerializer(employee, data=python_data, partial=True)
                    if employee_serializer.is_valid():
                        employee_serializer.save()

                        # Cập nhật thông tin user
                        user_serializer = UserSerializer(user, data=python_data, partial=True)
                        if user_serializer.is_valid():
                            user_serializer.save()
                            return HttpResponse(json.dumps({'msg': 'Employee data updated successfully'}), content_type='application/json', status=200)
                        return HttpResponse(json.dumps(user_serializer.errors), content_type='application/json', status=400)
                    return HttpResponse(json.dumps(employee_serializer.errors), content_type='application/json', status=400) 
                except Employee.DoesNotExist:
                    return HttpResponse(json.dumps({'error': 'Employee not found'}), content_type='application/json', status=404)

            # Nếu role không phải là 'employee', cập nhật thông tin User
            else:
                us_serializer = UserSerializer(user, data=python_data, partial=True)  # partial=True cho phép cập nhật từng phần
                if us_serializer.is_valid():
                    us_serializer.save()
                    return HttpResponse(json.dumps({'msg': 'User data updated successfully'}), content_type='application/json', status=200)
                return HttpResponse(json.dumps(us_serializer.errors), content_type='application/json', status=400)

        except User.DoesNotExist:
            return HttpResponse(json.dumps({'error': 'User not found'}), content_type='application/json', status=404)      

@csrf_exempt
def user_delete_api(request):
    if request.method == 'DELETE':
        json_data = request.body
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        id = python_data.get('userId', None)

        if id is not None:
            try:
                us = User.objects.get(userId=id)
            except User.DoesNotExist:
                res = {'msg': 'User not exits'}
                json_data = JSONRenderer().render(res)
                return HttpResponse(json_data, content_type='application/json', status=404)
            us.delete()
            res = {'msg': 'User deleted successfully'}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data, content_type='application/json')
        else:
            res = {'msg': 'id is not in the data'}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data, content_type='application/json', status=400)    

@csrf_exempt
def employee_contract_api(request):
    if request.method == 'GET':     
        json_data = request.body
        
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        
        employee_id = python_data.get('userId')
        
        if employee_id is not None:
            try:
                employee_contract = EmployeeContract.objects.get(employeeId=employee_id)
                employee_contract_serializer = EmployeeContractSerializer(employee_contract)
                json_data = JSONRenderer().render(employee_contract_serializer.data)
                        
                return HttpResponse(json_data, content_type='application/json', status=200)
            except EmployeeContract.DoesNotExist:
                res = {'msg': 'Employee not found'}
                json_data = JSONRenderer().render(res)
                return HttpResponse(json_data, content_type='application/json', status=404)

@csrf_exempt
def employee_timekeeping_api(request):
    if request.method == 'GET':     
        json_data = request.body
        
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        
        employee_id = python_data.get('userId')
        
        if employee_id is not None:
            try:
                employee_timekeeping = TimeKeeping.objects.get(employeeId=employee_id)
                employee_timekeeping_serializer = TimeKeepingSerializer(employee_timekeeping)
                json_data = JSONRenderer().render(employee_timekeeping_serializer.data)
                        
                return HttpResponse(json_data, content_type='application/json', status=200)
            except EmployeeContract.DoesNotExist:
                res = {'msg': 'Employee not found'}
                json_data = JSONRenderer().render(res)
                return HttpResponse(json_data, content_type='application/json', status=404)

@csrf_exempt
def employee_trainingschedule_api(request):
    if request.method == 'GET':     
        json_data = request.body
        
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        
        employee_id = python_data.get('userId')
        
        if employee_id is not None:
            try:
                employee_trainingschedule = TrainingSchedule.objects.get(employeeId=employee_id)
                employee_trainingschedule_serializer = TrainingScheduleSerializer(employee_trainingschedule)
                json_data = JSONRenderer().render(employee_trainingschedule_serializer.data)
                        
                return HttpResponse(json_data, content_type='application/json', status=200)
            except EmployeeContract.DoesNotExist:
                res = {'msg': 'Employee not found'}
                json_data = JSONRenderer().render(res)
                return HttpResponse(json_data, content_type='application/json', status=404)

