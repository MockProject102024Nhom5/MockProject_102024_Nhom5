from django.db import models

# Create your models here.

class User(models.Model):
    userId = models.AutoField(primary_key=True, auto_created=True)
    fullName = models.CharField(max_length=50)
    phoneNumber = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=20)
    deflag = models.IntegerField(default=1)
    
class Resident(models.Model):
    residentId = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    
class Position(models.Model):
    positionId = models.AutoField(primary_key=True, auto_created=True)
    positionName = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    description = models.TextField()
    deflag = models.IntegerField(default=1)
    
class Employee(models.Model):
    employeeId = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    positionId = models.ForeignKey(Position, on_delete=models.CASCADE)
    startDate = models.DateField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    dateOfBirth = models.DateField(null=True)
    address = models.CharField(max_length=255, null=True)
    socialSecurityNumber = models.CharField(max_length=20, null=True)

class Candidate(models.Model):
    candidateId = models.AutoField(primary_key=True, auto_created=True) 
    fullName = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)
    positionId = models.OneToOneField(Position, on_delete=models.CASCADE)
    applicationDate = models.DateField()
    resumeAttachment = models.CharField(max_length=255)
    status = models.CharField(max_length=50)
    notes = models.TextField()
    
class Admin(models.Model):
    adminId = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    
class TrainingSchedule(models.Model):
    scheduleId = models.AutoField(primary_key=True, auto_created=True)
    trainingName = models.CharField(max_length=100)
    trainingDate = models.DateField()
    employeeId = models.ForeignKey(Employee, on_delete=models.CASCADE)
    deflag = models.IntegerField(default=1)
    
class TimeKeeping(models.Model):
    recordId = models.AutoField(primary_key=True, auto_created=True)
    employeeId = models.ForeignKey(Employee, on_delete=models.CASCADE)
    checkIn = models.DateTimeField()
    checkOut = models.DateTimeField()
    deflag = models.IntegerField(default=1)
    
class EmployeeContract(models.Model):
    contractId = models.AutoField(primary_key=True, auto_created=True)
    employeeId = models.ForeignKey(Employee, on_delete=models.CASCADE)
    contractNumber = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    startDate = models.DateField()
    endDate = models.DateField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    benefits = models.TextField()
    terminationClauses = models.TextField()
    attachments = models.CharField(max_length=255)
    deflag = models.IntegerField(default=1)
    
class EmployeePerformance(models.Model):
    reviewId = models.AutoField(primary_key=True, auto_created=True)
    employeeId = models.ForeignKey(Employee, on_delete=models.CASCADE)
    performanceReview = models.TextField()
    discipline = models.TextField()
    rewards = models.TextField()
    deflag = models.IntegerField(default=1)
    
class EmployeeLeave(models.Model):
    leaveId = models.AutoField(primary_key=True, auto_created=True)
    employeeId = models.ForeignKey(Employee, on_delete=models.CASCADE)
    leaveStartDate = models.DateField()
    leaveEndDate = models.DateField()
    leaveType = models.CharField(max_length=50)
    deflag = models.IntegerField(default=1)