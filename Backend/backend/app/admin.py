from django.contrib import admin

from .models import LoginModel, ProjectModel

# Register your models here.
class Projectadmin(admin.ModelAdmin):
    list_display=['ProjectName','Status']

class Loginadmin(admin.ModelAdmin):
    list_display=['Email','Password']

admin.site.register(LoginModel,Loginadmin)
admin.site.register(ProjectModel,Projectadmin)