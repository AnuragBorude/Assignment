from django.db import models

# Create your models here.
class ProjectModel(models.Model):
    ProjectName=models.CharField(max_length=200)
    Reason=models.CharField(max_length=200)
    Type=models.CharField(max_length=200)
    Division=models.CharField(max_length=200)
    Category=models.CharField(max_length=200)
    Priority=models.CharField(max_length=200)
    Dept=models.CharField(max_length=200)
    Location=models.CharField(max_length=200)
    Status=models.CharField(max_length=200)
    StartDate=models.DateField()
    EndDate=models.DateField()

class LoginModel(models.Model):
    Email=models.CharField(max_length=200)
    Password=models.CharField(max_length=200)