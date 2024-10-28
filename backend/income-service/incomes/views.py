from rest_framework.decorators import api_view
from rest_framework.response import Response
from .income_service import IncomeService

@api_view(['POST'])
def create_income(request):
    response, status_code = IncomeService.create_income(request.data)
    return Response(response, status=status_code)

@api_view(['PUT'])
def update_income(request, payment_id):
    response, status_code = IncomeService.update_income(payment_id, request.data)
    return Response(response, status=status_code)

@api_view(['GET'])
def get_income_details(request, payment_id):
    response, status_code = IncomeService.get_income_details(payment_id)
    return Response(response, status=status_code)

@api_view(['PATCH'])
def delete_income(request, payment_id):
    response, status_code = IncomeService.delete_income(payment_id)
    return Response(response, status=status_code)

@api_view(['GET'])
def list_all_incomes(request):
    page = int(request.GET.get('page', 1))
    limit = int(request.GET.get('limit', 10))
    response, status_code = IncomeService.list_all_incomes(page, limit)
    return Response(response, status=status_code)
