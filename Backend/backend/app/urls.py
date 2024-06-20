from django.urls import path,include
from rest_framework import routers

from .views import  ProjectLC, total

router=routers.DefaultRouter()

router.register(r'ProjectInfo',ProjectLC)
urlpatterns=[
    path('',include(router.urls))
]

