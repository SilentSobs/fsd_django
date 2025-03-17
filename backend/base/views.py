from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product 
from .serailizers import ProductSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
        # ...

        return token

@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serailizer = ProductSerializer(products,many=True)
    return Response(serailizer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serailizer = ProductSerializer(product,many=False)
    return Response(serailizer.data)

