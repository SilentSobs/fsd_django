from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser  
from rest_framework.response import Response
from .models import Product 
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        serializer = UserSerializerWithToken(user).data 
        for k, v in serializer.items(): 
            token[k] = v  

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)  
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    print(data)
    user = User.objects.create(
        first_name=data['name'],
        username= data['email'],
        email=data['email'],
        password=make_password(data['password'])
    )

    serialiser = UserSerializerWithToken(user,many=False)
    return Response(serialiser.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])  
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)  
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True) 
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)  
    return Response(serializer.data)


@api_view(['POST'])
def addProduct(request):
    if request.method == 'POST':

        print("Request Data:", request.data)


        data = request.data


        serializer = ProductSerializer(data=data)


        if serializer.is_valid():

            if not request.user.is_authenticated:

                product = serializer.save(user=None)  
            else:

                product = serializer.save(user=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)


        print("Validation Errors:", serializer.errors)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
