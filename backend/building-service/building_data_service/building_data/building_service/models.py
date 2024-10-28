# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Admins(models.Model):
    adminid = models.OneToOneField('Users', models.DO_NOTHING, db_column='adminId', primary_key=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'admins'


class Amenities(models.Model):
    amenityid = models.AutoField(db_column='amenityId', primary_key=True)  # Field name made lowercase.
    amenityname = models.CharField(db_column='amenityName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'amenities'


class Apartmentrentals(models.Model):
    rentalid = models.AutoField(db_column='rentalId', primary_key=True)  # Field name made lowercase.
    residentid = models.ForeignKey('Residents', models.DO_NOTHING, db_column='residentId', blank=True, null=True)  # Field name made lowercase.
    apartmentnumber = models.CharField(db_column='apartmentNumber', max_length=15, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    buildingid = models.ForeignKey('Buildings', models.DO_NOTHING, db_column='buildingId', blank=True, null=True)  # Field name made lowercase.
    rentalstartdate = models.DateField(db_column='rentalStartDate', blank=True, null=True)  # Field name made lowercase.
    rentalenddate = models.DateField(db_column='rentalEndDate', blank=True, null=True)  # Field name made lowercase.
    rentalfee = models.DecimalField(db_column='rentalFee', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'apartmentRentals'


class Assetinspections(models.Model):
    inspectionid = models.AutoField(db_column='inspectionId', primary_key=True)  # Field name made lowercase.
    assetid = models.ForeignKey('Assets', models.DO_NOTHING, db_column='assetId', blank=True, null=True)  # Field name made lowercase.
    employeeid = models.ForeignKey('Employees', models.DO_NOTHING, db_column='employeeId', blank=True, null=True)  # Field name made lowercase.
    inspectiondate = models.DateField(db_column='inspectionDate', blank=True, null=True)  # Field name made lowercase.
    statusdescription = models.CharField(db_column='statusDescription', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'assetInspections'


class Assets(models.Model):
    assetid = models.AutoField(db_column='assetId', primary_key=True)  # Field name made lowercase.
    buildingid = models.ForeignKey('Buildings', models.DO_NOTHING, db_column='buildingId', blank=True, null=True)  # Field name made lowercase.
    assetname = models.CharField(db_column='assetName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    assettype = models.CharField(db_column='assetType', max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    cost = models.FloatField(blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'assets'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150, db_collation='Latin1_General_CI_AS')

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS')
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100, db_collation='Latin1_General_CI_AS')

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128, db_collation='Latin1_General_CI_AS')
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150, db_collation='Latin1_General_CI_AS')
    first_name = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS')
    last_name = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS')
    email = models.CharField(max_length=254, db_collation='Latin1_General_CI_AS')
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Buildingdocuments(models.Model):
    documentid = models.AutoField(db_column='documentId', primary_key=True)  # Field name made lowercase.
    buildingid = models.ForeignKey('Buildings', models.DO_NOTHING, db_column='buildingId', blank=True, null=True)  # Field name made lowercase.
    documenttypeid = models.ForeignKey('Documenttypes', models.DO_NOTHING, db_column='documentTypeId', blank=True, null=True)  # Field name made lowercase.
    documentpath = models.CharField(db_column='documentPath', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'buildingDocuments'


class BuildingAmenities(models.Model):
    buildingid = models.OneToOneField('Buildings', models.DO_NOTHING, db_column='buildingId', primary_key=True)  # Field name made lowercase. The composite primary key (buildingId, amenityId) found, that is not supported. The first column is selected.
    amenityid = models.ForeignKey(Amenities, models.DO_NOTHING, db_column='amenityId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'building_amenities'
        unique_together = (('buildingid', 'amenityid'),)


class Buildings(models.Model):
    buildingid = models.AutoField(db_column='buildingId', primary_key=True)  # Field name made lowercase.
    constructionyear = models.IntegerField(db_column='constructionYear', blank=True, null=True)  # Field name made lowercase.
    numberoffloors = models.IntegerField(db_column='numberOfFloors', blank=True, null=True)  # Field name made lowercase.
    numberofapartments = models.IntegerField(db_column='numberOfApartments', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'buildings'


class Candidates(models.Model):
    candidateid = models.AutoField(db_column='candidateId', primary_key=True)  # Field name made lowercase.
    fullname = models.CharField(db_column='fullName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    phonenumber = models.CharField(db_column='phoneNumber', max_length=15, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    positionid = models.ForeignKey('Positions', models.DO_NOTHING, db_column='positionId', blank=True, null=True)  # Field name made lowercase.
    applicationdate = models.DateField(db_column='applicationDate', blank=True, null=True)  # Field name made lowercase.
    resumeattachment = models.CharField(db_column='resumeAttachment', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    employeeid = models.ForeignKey('Employees', models.DO_NOTHING, db_column='employeeId', blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    notes = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'candidates'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(db_collation='Latin1_General_CI_AS', blank=True, null=True)
    object_repr = models.CharField(max_length=200, db_collation='Latin1_General_CI_AS')
    action_flag = models.SmallIntegerField()
    change_message = models.TextField(db_collation='Latin1_General_CI_AS')
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100, db_collation='Latin1_General_CI_AS')
    model = models.CharField(max_length=100, db_collation='Latin1_General_CI_AS')

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS')
    name = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS')
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40, db_collation='Latin1_General_CI_AS')
    session_data = models.TextField(db_collation='Latin1_General_CI_AS')
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Documenttypes(models.Model):
    documenttypeid = models.AutoField(db_column='documentTypeId', primary_key=True)  # Field name made lowercase.
    documenttypename = models.CharField(db_column='documentTypeName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'documentTypes'


class Employeecontracts(models.Model):
    contractid = models.AutoField(db_column='contractId', primary_key=True)  # Field name made lowercase.
    employeeid = models.ForeignKey('Employees', models.DO_NOTHING, db_column='employeeId', blank=True, null=True)  # Field name made lowercase.
    contractnumber = models.CharField(db_column='contractNumber', max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    startdate = models.DateField(db_column='startDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateField(db_column='endDate', blank=True, null=True)  # Field name made lowercase.
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    benefits = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    terminationclauses = models.CharField(db_column='terminationClauses', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    attachments = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'employeeContracts'


class Employeedetails(models.Model):
    employeeid = models.ForeignKey('Employees', models.DO_NOTHING, db_column='employeeId', blank=True, null=True)  # Field name made lowercase.
    dateofbirth = models.DateField(db_column='dateOfBirth', blank=True, null=True)  # Field name made lowercase.
    address = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    socialsecuritynumber = models.CharField(db_column='socialSecurityNumber', max_length=20, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'employeeDetails'


class Employeeleave(models.Model):
    leaveid = models.AutoField(db_column='leaveId', primary_key=True)  # Field name made lowercase.
    employeeid = models.ForeignKey('Employees', models.DO_NOTHING, db_column='employeeId', blank=True, null=True)  # Field name made lowercase.
    leavestartdate = models.DateField(db_column='leaveStartDate', blank=True, null=True)  # Field name made lowercase.
    leaveenddate = models.DateTimeField(db_column='leaveEndDate', blank=True, null=True)  # Field name made lowercase.
    leavetype = models.CharField(db_column='leaveType', max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    holidayid = models.ForeignKey('Holidays', models.DO_NOTHING, db_column='holidayId', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'employeeLeave'


class Employeeperformance(models.Model):
    reviewid = models.AutoField(db_column='reviewId', primary_key=True)  # Field name made lowercase.
    employeeid = models.ForeignKey('Employees', models.DO_NOTHING, db_column='employeeId', blank=True, null=True)  # Field name made lowercase.
    performancereview = models.CharField(db_column='performanceReview', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    discipline = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    rewards = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'employeePerformance'


class Employeetraining(models.Model):
    trainingid = models.OneToOneField('Trainingschedules', models.DO_NOTHING, db_column='trainingId', primary_key=True)  # Field name made lowercase. The composite primary key (trainingId, employeeId) found, that is not supported. The first column is selected.
    employeeid = models.ForeignKey('Employees', models.DO_NOTHING, db_column='employeeId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'employeeTraining'
        unique_together = (('trainingid', 'employeeid'),)


class Employees(models.Model):
    employeeid = models.OneToOneField('Users', models.DO_NOTHING, db_column='employeeId', primary_key=True)  # Field name made lowercase.
    positionid = models.ForeignKey('Positions', models.DO_NOTHING, db_column='positionId', blank=True, null=True)  # Field name made lowercase.
    startdate = models.DateField(db_column='startDate', blank=True, null=True)  # Field name made lowercase.
    salary = models.DecimalField(max_digits=18, decimal_places=0, blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'employees'


class Expensetypes(models.Model):
    expensetypeid = models.AutoField(db_column='expenseTypeId', primary_key=True)  # Field name made lowercase.
    expensetypename = models.CharField(db_column='expenseTypeName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'expenseTypes'


class Expenses(models.Model):
    expenseid = models.AutoField(db_column='expenseId', primary_key=True)  # Field name made lowercase.
    expensetypeid = models.ForeignKey(Expensetypes, models.DO_NOTHING, db_column='expenseTypeId', blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    expensedate = models.DateField(db_column='expenseDate', blank=True, null=True)  # Field name made lowercase.
    relatedentityid = models.IntegerField(db_column='relatedEntityId', blank=True, null=True)  # Field name made lowercase.
    relatedentitytype = models.CharField(db_column='relatedEntityType', max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'expenses'


class Fines(models.Model):
    fineid = models.AutoField(db_column='fineId', primary_key=True)  # Field name made lowercase.
    residentid = models.ForeignKey('Residents', models.DO_NOTHING, db_column='residentId', blank=True, null=True)  # Field name made lowercase.
    reason = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    finedate = models.DateField(db_column='fineDate', blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fines'


class Holidays(models.Model):
    holidayid = models.AutoField(db_column='holidayId', primary_key=True)  # Field name made lowercase.
    holidayname = models.CharField(db_column='holidayName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    holidaydate = models.DateField(db_column='holidayDate', blank=True, null=True)  # Field name made lowercase.
    holidaytype = models.CharField(db_column='holidayType', max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    state = models.CharField(max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'holidays'


class I9Forms(models.Model):
    formid = models.AutoField(db_column='formId', primary_key=True)  # Field name made lowercase.
    employeeid = models.ForeignKey(Employees, models.DO_NOTHING, db_column='employeeId', blank=True, null=True)  # Field name made lowercase.
    verifiername = models.CharField(db_column='verifierName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    submissiondate = models.DateField(db_column='submissionDate', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'i9Forms'


class Maintenance(models.Model):
    maintenanceid = models.AutoField(db_column='maintenanceId', primary_key=True)  # Field name made lowercase.
    buildingid = models.ForeignKey(Buildings, models.DO_NOTHING, db_column='buildingId', blank=True, null=True)  # Field name made lowercase.
    maintenancedate = models.DateField(db_column='maintenanceDate', blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)
    notes = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'maintenance'


class Maintenancedetail(models.Model):
    maintenanceid = models.OneToOneField(Maintenance, models.DO_NOTHING, db_column='maintenanceId', primary_key=True)  # Field name made lowercase. The composite primary key (maintenanceId, employeeId) found, that is not supported. The first column is selected.
    employeeid = models.ForeignKey(Employees, models.DO_NOTHING, db_column='employeeId')  # Field name made lowercase.
    employeerole = models.CharField(db_column='employeeRole', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    workdone = models.CharField(db_column='workDone', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'maintenanceDetail'
        unique_together = (('maintenanceid', 'employeeid'),)


class Paymenttypes(models.Model):
    paymenttypeid = models.AutoField(db_column='paymentTypeId', primary_key=True)  # Field name made lowercase.
    paymentname = models.CharField(db_column='paymentName', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'paymentTypes'


class Payments(models.Model):
    paymentid = models.AutoField(db_column='paymentId', primary_key=True)  # Field name made lowercase.
    residentid = models.ForeignKey('Residents', models.DO_NOTHING, db_column='residentId', blank=True, null=True)  # Field name made lowercase.
    paymentdate = models.DateField(db_column='paymentDate', blank=True, null=True)  # Field name made lowercase.
    paymentduedate = models.DateField(db_column='paymentDueDate', blank=True, null=True)  # Field name made lowercase.
    paymenttypeid = models.ForeignKey(Paymenttypes, models.DO_NOTHING, db_column='paymentTypeId', blank=True, null=True)  # Field name made lowercase.
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    paymentmethod = models.CharField(db_column='paymentMethod', max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    invoices = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    additionalfees = models.DecimalField(db_column='additionalFees', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'payments'


class Positions(models.Model):
    positionid = models.AutoField(db_column='positionId', primary_key=True)  # Field name made lowercase.
    positionname = models.CharField(db_column='positionName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    department = models.CharField(max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'positions'


class Providers(models.Model):
    providerid = models.AutoField(db_column='providerId', primary_key=True)  # Field name made lowercase.
    providername = models.CharField(db_column='providerName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    contactperson = models.CharField(db_column='contactPerson', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    contactemail = models.CharField(db_column='contactEmail', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    contactphone = models.CharField(db_column='contactPhone', max_length=15, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'providers'


class Requesttypes(models.Model):
    requesttypeid = models.AutoField(db_column='requestTypeId', primary_key=True)  # Field name made lowercase.
    requestname = models.CharField(db_column='requestName', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'requestTypes'


class Residentrequests(models.Model):
    requestid = models.AutoField(db_column='requestId', primary_key=True)  # Field name made lowercase.
    residentid = models.ForeignKey('Residents', models.DO_NOTHING, db_column='residentId', blank=True, null=True)  # Field name made lowercase.
    requesttypeid = models.ForeignKey(Requesttypes, models.DO_NOTHING, db_column='requestTypeId', blank=True, null=True)  # Field name made lowercase.
    complaintdescription = models.CharField(db_column='complaintDescription', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    submissiondate = models.DateField(db_column='submissionDate', blank=True, null=True)  # Field name made lowercase.
    employeeid = models.ForeignKey(Employees, models.DO_NOTHING, db_column='employeeId', blank=True, null=True)  # Field name made lowercase.
    receiveddate = models.DateField(db_column='receivedDate', blank=True, null=True)  # Field name made lowercase.
    processingresult = models.CharField(db_column='processingResult', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'residentRequests'


class ResidentAmenities(models.Model):
    residentamenityid = models.AutoField(db_column='residentAmenityId', primary_key=True)  # Field name made lowercase.
    residentid = models.ForeignKey('Residents', models.DO_NOTHING, db_column='residentId', blank=True, null=True)  # Field name made lowercase.
    amenityid = models.ForeignKey(Amenities, models.DO_NOTHING, db_column='amenityId', blank=True, null=True)  # Field name made lowercase.
    usagedate = models.DateField(db_column='usageDate', blank=True, null=True)  # Field name made lowercase.
    notes = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'resident_amenities'


class ResidentUtilities(models.Model):
    residentutilityid = models.AutoField(db_column='residentUtilityId', primary_key=True)  # Field name made lowercase.
    residentid = models.ForeignKey('Residents', models.DO_NOTHING, db_column='residentId', blank=True, null=True)  # Field name made lowercase.
    utilityid = models.ForeignKey('Utilities', models.DO_NOTHING, db_column='utilityId', blank=True, null=True)  # Field name made lowercase.
    startdate = models.DateField(db_column='startDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateField(db_column='endDate', blank=True, null=True)  # Field name made lowercase.
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'resident_utilities'


class Residents(models.Model):
    residentid = models.OneToOneField('Users', models.DO_NOTHING, db_column='residentId', primary_key=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'residents'


class Roles(models.Model):
    roleid = models.AutoField(db_column='roleId', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=20, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'roles'


class Servicecontracts(models.Model):
    contractid = models.AutoField(db_column='contractId', primary_key=True)  # Field name made lowercase.
    serviceid = models.ForeignKey('Services', models.DO_NOTHING, db_column='serviceId', blank=True, null=True)  # Field name made lowercase.
    buildingid = models.ForeignKey(Buildings, models.DO_NOTHING, db_column='buildingId', blank=True, null=True)  # Field name made lowercase.
    contractnumber = models.CharField(db_column='contractNumber', max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    startdate = models.DateField(db_column='startDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateField(db_column='endDate', blank=True, null=True)  # Field name made lowercase.
    specialterms = models.CharField(db_column='specialTerms', max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    attachments = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'serviceContracts'


class Services(models.Model):
    serviceid = models.AutoField(db_column='serviceId', primary_key=True)  # Field name made lowercase.
    providerid = models.ForeignKey(Providers, models.DO_NOTHING, db_column='providerId', blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'services'


class Timekeeping(models.Model):
    recordid = models.AutoField(db_column='recordId', primary_key=True)  # Field name made lowercase.
    employeeid = models.ForeignKey(Employees, models.DO_NOTHING, db_column='employeeId', blank=True, null=True)  # Field name made lowercase.
    checkin = models.DateTimeField(db_column='checkIn', blank=True, null=True)  # Field name made lowercase.
    checkout = models.DateTimeField(db_column='checkOut', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'timekeeping'


class Trainingschedules(models.Model):
    trainingid = models.AutoField(db_column='trainingId', primary_key=True)  # Field name made lowercase.
    trainingname = models.CharField(db_column='trainingName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    trainingdate = models.DateField(db_column='trainingDate', blank=True, null=True)  # Field name made lowercase.
    trainingduration = models.IntegerField(db_column='trainingDuration', blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    employeeid = models.ForeignKey(Employees, models.DO_NOTHING, db_column='employeeId', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'trainingSchedules'


class Users(models.Model):
    userid = models.AutoField(db_column='userId', primary_key=True)  # Field name made lowercase.
    fullname = models.CharField(db_column='fullName', max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    phonenumber = models.CharField(db_column='phoneNumber', max_length=15, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    password = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    address = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    roleid = models.ForeignKey(Roles, models.DO_NOTHING, db_column='roleId', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'


class Utilities(models.Model):
    utilityid = models.AutoField(db_column='utilityId', primary_key=True)  # Field name made lowercase.
    utilityname = models.CharField(db_column='utilityName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    contractid = models.ForeignKey('Utilitycontracts', models.DO_NOTHING, db_column='contractId', blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'utilities'


class Utilitycontracts(models.Model):
    contractid = models.AutoField(db_column='contractId', primary_key=True)  # Field name made lowercase.
    utilitytype = models.CharField(db_column='utilityType', max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    startdate = models.DateField(db_column='startDate', blank=True, null=True)  # Field name made lowercase.
    fee = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'utilityContracts'


class W4Forms(models.Model):
    formid = models.AutoField(db_column='formId', primary_key=True)  # Field name made lowercase.
    employeeid = models.ForeignKey(Employees, models.DO_NOTHING, db_column='employeeId', blank=True, null=True)  # Field name made lowercase.
    numberofdependents = models.IntegerField(db_column='numberOfDependents', blank=True, null=True)  # Field name made lowercase.
    submissiondate = models.DateField(db_column='submissionDate', blank=True, null=True)  # Field name made lowercase.
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'w4Forms'
