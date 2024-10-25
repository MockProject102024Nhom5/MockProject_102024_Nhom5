from django.db import models
from django.contrib.auth.models import User

class Roles(models.Model):
    """Model to define user roles in the system."""
    roleid = models.AutoField(db_column='roleId', primary_key=True)
    name = models.CharField(max_length=20, unique=True, db_collation='Latin1_General_CI_AS')
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'roles'

    def __str__(self):
        return self.name

class Amenities(models.Model):
    amenityid = models.AutoField(db_column='amenityId', primary_key=True)  # Field name made lowercase.
    amenityname = models.CharField(db_column='amenityName', max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'amenities'

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


class MaintenanceTasks(models.Model):
    """Model to assign maintenance tasks to specific buildings."""
    taskid = models.AutoField(db_column='taskId', primary_key=True)
    building = models.ForeignKey(Buildings, models.DO_NOTHING, db_column='buildingId', blank=True, null=True)
    technician = models.ForeignKey(User, models.DO_NOTHING, db_column='technicianId', blank=True, null=True)
    task_description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    status = models.CharField(max_length=50, db_collation='Latin1_General_CI_AS', default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deflag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'maintenance_tasks'

    def __str__(self):
        return f"Task for {self.building} by {self.technician}"


class Notifications(models.Model):
    """Model to handle notifications for building updates."""
    notificationid = models.AutoField(db_column='notificationId', primary_key=True)
    building = models.ForeignKey(Buildings, models.DO_NOTHING, db_column='buildingId', blank=True, null=True)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'notifications'

    def __str__(self):
        return f"Notification for {self.building} at {self.timestamp}"


# Assuming Roles are created in the database already
def create_roles():
    admin_role = Roles(name='Admin', description='Administrator with full access')
    customer_role = Roles(name='Customer', description='Regular customer access')
    technician_role = Roles(name='Technician', description='Technician for maintenance tasks')

    admin_role.save()
    customer_role.save()
    technician_role.save()