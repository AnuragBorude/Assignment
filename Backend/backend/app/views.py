from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.db import connection
import json
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect, render
from .models import LoginModel, ProjectModel
from .serializers import ProjectSerializer ,LoginSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter , SearchFilter
# from rest_framework.pagination import PageNumberPagination
from datetime import date


# Create your views here.

class ProjectLC(viewsets.ModelViewSet):
    queryset=ProjectModel.objects.all()
    serializer_class=ProjectSerializer
    filter_backends=[OrderingFilter,SearchFilter]
    # filter_backends=[SearchFilter]
    search_fields=['id','ProjectName','Reason','Type','Division','Category','Priority','Dept','Location','Status','StartDate','EndDate']

class ProjectRUD(RetrieveUpdateDestroyAPIView):
    queryset=ProjectModel.objects.all()
    serializer_class=ProjectSerializer
    filter_backends=[OrderingFilter,SearchFilter]

@api_view(['GET', 'POST','PUT','PATCH','DELETE'])
def login(req):
    # print(req.data)
    userdet=LoginModel.objects.filter(
                                        Email=req.data['Email'],
                                        Password=req.data['Password']
                                    )
    if(len(userdet)>0):
        # token = encrypt_message(str(userdet[0].id)).decode("utf-8")
        return JsonResponse({"status":"true"},safe=False)
    else:
        return JsonResponse({"status":"false"},safe=False)


def execute_Cardsql_query():
    with connection.cursor() as cursor:
        cursor.execute("SELECT Status,(SELECT COUNT(*) FROM app_projectmodel ) AS Total,COUNT(*) AS IndividualCount FROM app_projectmodel GROUP BY  Status;")
        rows = cursor.fetchall()
        return rows


def serialize_Carddata(rows):
    serialized_data = []
    for row in rows:
        serialized_data.append({
            'Status': row[0],
            'Total': row[1],
            'IndividualCount': row[2]
        })
    return serialized_data



    
def total(request):
 
    # CARD
    # Running Closed Cancelled
    rows = execute_Cardsql_query()
    serialized_Carddata = serialize_Carddata(rows)    
  
    datee=date.today() 
    closur = ProjectModel.objects.raw("SELECT * FROM app_projectmodel WHERE Status=	'Running' AND  EndDate <='"+str(datee)+"'")


    # GRAPH



    # Strategy
    strategyTotal=ProjectModel.objects.raw("SELECT * FROM app_projectmodel WHERE Dept='Strategy'"  )
    strategyClosed=ProjectModel.objects.raw("SELECT * FROM app_projectmodel WHERE Status='Closed' AND Dept='Strategy'" )
    strategyPercent=int(len(strategyClosed)/len(strategyTotal)*100)
    
    # Finance
    FinanceTotal=ProjectModel.objects.raw("SELECT * FROM app_projectmodel WHERE Dept='Finace'"  )
    FinanceClosed=ProjectModel.objects.raw("SELECT * FROM app_projectmodel WHERE Status='Closed' AND Dept='Finace'" )
    FinancePercent=int(len(FinanceClosed)/len(FinanceTotal)*100)

    # Quality
    QualityTotal=ProjectModel.objects.raw("SELECT * FROM app_projectmodel WHERE Dept='Quality'"  )
    QualityClosed=ProjectModel.objects.raw("SELECT * FROM app_projectmodel WHERE Status='Closed' AND Dept='Quality'" )
    QualityPercent=int(len(QualityClosed)/len(QualityTotal)*100)
    
    # Maintainence
    MaintainenceTotal=ProjectModel.objects.raw("SELECT * FROM app_projectmodel WHERE Dept='Maintainence'"  )
    MaintainenceClosed=ProjectModel.objects.raw("SELECT * FROM app_projectmodel WHERE Status='Closed' AND Dept='Maintainence'" )
    MaintainencePercent=int(len(MaintainenceClosed)/len(MaintainenceTotal)*100)


    
    obj = { "Closure" : str(len(closur)),
    "Card":serialized_Carddata,
    # "Total" : str(len(Total)),
    # "Running" : str(len(Run)),
    # "close" : str(len(Cls)),
    # "cancel" : str(len(Cancel)),
    # "StrTot" : str(len(strategyTotal)),
    # "StrClo" : str(len(strategyClosed)),
    # "FinTot" : str(len(FinanceTotal)),
    # "FinClo" : str(len(FinanceClosed)),
    # "QuaTot" : str(len(QualityTotal)),
    # "QuaClo" : str(len(QualityClosed)),
    # "MainTot" : str(len(MaintainenceTotal)),
    # "MainClo" : str(len(MaintainenceClosed)),
    "Strper" : strategyPercent,
    "Finper" : FinancePercent,
    "Qltper" : QualityPercent,
    "Manper" : MaintainencePercent,
      }
    # return HttpResponse(str(len(aaa.Result)))

    return JsonResponse(obj,safe=False)



    
