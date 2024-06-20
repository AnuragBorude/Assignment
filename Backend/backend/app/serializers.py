from rest_framework import  serializers


from .models import LoginModel, ProjectModel



class ProjectSerializer(serializers.ModelSerializer):
     class Meta:
        model=ProjectModel
        fields=('id','ProjectName','Reason','Type','Division','Category','Priority','Dept','Location','Status','StartDate','EndDate')
    
class LoginSerializer(serializers.ModelSerializer):
     class Meta:
        model=LoginModel
        fields=('id','Email','Password')