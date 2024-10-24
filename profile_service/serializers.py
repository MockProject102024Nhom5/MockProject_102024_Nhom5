from django.contrib.auth.hashers import check_password
from rest_framework import serializers
from .models import User, Employee, Position, Resident, Admin, Candidate, TrainingSchedule, TimeKeeping, EmployeeContract, EmployeePerformance, EmployeeLeave

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userId', 'fullName', 'phoneNumber', 'email', 'password', 'role']

class ResidentSerializer(serializers.ModelSerializer):
    residentId = UserSerializer(read_only=True)  # One-to-one field với User
    class Meta:
        model = Resident
        fields = ['residentId']     

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ['positionId', 'positionName', 'department', 'description']

class EmployeeSerializer(serializers.ModelSerializer):
    # Lồng UserSerializer và PositionSerializer vào EmployeeSerializer
    employeeId = UserSerializer(read_only=True)  # One-to-one field với User
    positionId = PositionSerializer(read_only=True)  # ForeignKey field với Position

    class Meta:
        model = Employee
        fields = ['employeeId', 'positionId', 'startDate', 'salary', 'dateOfBirth', 'address', 'socialSecurityNumber']
     
    def update(self, instance, validated_data):
        # Lấy dữ liệu của User từ payload
        user_data = validated_data.pop('employeeId', None)
        # Nếu có dữ liệu của User, thực hiện cập nhật User
        if user_data:
            user_serializer = UserSerializer(instance.employeeId, data=user_data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()

        # Cập nhật các trường của Employee
        instance.startDate = validated_data.get('startDate', instance.startDate)
        instance.salary = validated_data.get('salary', instance.salary)
        instance.dateOfBirth = validated_data.get('dateOfBirth', instance.dateOfBirth)
        instance.address = validated_data.get('address', instance.address)
        instance.socialSecurityNumber = validated_data.get('socialSecurityNumber', instance.socialSecurityNumber)

        instance.save()
        return instance
    
class CandidateSerializer(serializers.ModelSerializer):
    positionId = PositionSerializer(read_only=True)
    class Meta:
        model = Candidate
        fields = ['candidateId', 'fullName', 'phoneNumber', 'email', 'positionId', 'applicationDate', 'resumeAttachment', 'status', 'notes']
        
class AdminSerializer(serializers.ModelSerializer):
    adminId = UserSerializer(read_only=True)  # One-to-one field với User
    class Meta:
        model = Admin
        fields = ['adminId']
        
class TrainingScheduleSerializer(serializers.ModelSerializer):
    employeeId = EmployeeSerializer(read_only=True)  # ForeignKey field với Employee
    class Meta:
        model = TrainingSchedule
        fields = ['scheduleId', 'employeeId', 'trainingName', 'trainingDate', 'deflag']
        
class TimeKeepingSerializer(serializers.ModelSerializer):
    employeeId = EmployeeSerializer(read_only=True)  # ForeignKey field với Employee
    class Meta:
        model = TimeKeeping
        fields = ['recordId', 'employeeId', 'checkIn', 'checkOut', 'deflag']
           
class EmployeeContractSerializer(serializers.ModelSerializer):
    employeeId = EmployeeSerializer(read_only=True)  # ForeignKey field với Employee
    class Meta:
        model = EmployeeContract
        fields = ['contractId', 'employeeId', 'contractNumber', 'status', 'startDate', 'endDate', 'salary', 'benefits', 'terminationClauses', 'attachments', 'deflag']
        
class EmployeePerformanceSerializer(serializers.ModelSerializer):
    employeeId = EmployeeSerializer(read_only=True)  # ForeignKey field với Employee
    class Meta:
        model = EmployeePerformance
        fields = ['reviewId', 'employeeId', 'performanceReview', 'discipline', 'rewards', 'deflag']
        
class EmployeeLeaveSerializer(serializers.ModelSerializer):
    employeeId = EmployeeSerializer(read_only=True)  # ForeignKey field với Employee
    class Meta: 
        model = EmployeeLeave
        fields = ['leaveId', 'employeeId', 'leaveStartDate', 'leaveEndDate', 'leaveType', 'deflag']
    