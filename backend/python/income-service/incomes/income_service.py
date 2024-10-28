from .models import Payment
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status

class IncomeService:
    @staticmethod
    def create_income(data):
        try:
            payment = Payment.objects.create(
                resident_id=data['residentId'],
                payment_type_id=data['paymentTypeId'],
                payment_date=data['paymentDate'],
                amount=data['amount'],
                payment_method=data.get('paymentMethod', '')
            )
            return {
                "status": "success",
                "data": {
                    "paymentId": payment.id,
                    "residentId": payment.resident_id,
                    "paymentTypeId": payment.payment_type_id,
                    "paymentDate": payment.payment_date,
                    "amount": payment.amount,
                    "paymentMethod": payment.payment_method,
                }
            }, status.HTTP_200_OK
        except KeyError:
            return {"error": "Invalid request", "message": "Missing required fields."}, status.HTTP_400_BAD_REQUEST

    @staticmethod
    def update_income(payment_id, data):
        try:
            payment = Payment.objects.get(id=payment_id)
            payment.payment_type_id = data.get('paymentTypeId', payment.payment_type_id)
            payment.payment_date = data.get('paymentDate', payment.payment_date)
            payment.amount = data.get('amount', payment.amount)
            payment.payment_method = data.get('paymentMethod', payment.payment_method)
            payment.save()

            return {
                "status": "success",
                "data": {
                    "paymentId": payment.id,
                    "paymentTypeId": payment.payment_type_id,
                    "paymentDate": payment.payment_date,
                    "amount": payment.amount,
                    "paymentMethod": payment.payment_method,
                }
            }, status.HTTP_200_OK
        except ObjectDoesNotExist:
            return {"error": "Invalid request", "message": "Invalid paymentId."}, status.HTTP_400_BAD_REQUEST

    @staticmethod
    def get_income_details(payment_id):
        try:
            payment = Payment.objects.get(id=payment_id)
            return {
                "status": "success",
                "data": {
                    "paymentId": payment.id,
                    "residentId": payment.resident_id,
                    "paymentTypeId": payment.payment_type_id,
                    "paymentDate": payment.payment_date,
                    "amount": payment.amount,
                    "paymentMethod": payment.payment_method,
                }
            }, status.HTTP_200_OK
        except ObjectDoesNotExist:
            return {"error": "Invalid request", "message": "Invalid paymentId."}, status.HTTP_400_BAD_REQUEST

    @staticmethod
    def delete_income(payment_id):
        try:
            payment = Payment.objects.get(id=payment_id)
            payment.deflag = False
            payment.save()
            return {"message": "Income record deleted successfully."}, status.HTTP_200_OK
        except ObjectDoesNotExist:
            return {"error": "Invalid request", "message": "Invalid paymentId."}, status.HTTP_400_BAD_REQUEST

    @staticmethod
    def list_all_incomes(page, limit):
        payments = Payment.objects.filter(deflag=True)
        start = (page - 1) * limit
        end = start + limit
        payments_paginated = payments[start:end]

        data = [
            {
                "paymentId": payment.id,
                "residentId": payment.resident_id,
                "paymentTypeId": payment.payment_type_id,
                "paymentDate": payment.payment_date,
                "amount": payment.amount,
                "paymentMethod": payment.payment_method,
            }
            for payment in payments_paginated
        ]

        return {
            "status": "success",
            "data": data,
            "meta": {
                "page": page,
                "total": payments.count(),
            }
        }, status.HTTP_200_OK
