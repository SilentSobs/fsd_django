from django.urls import path    
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/',views.registerUser,name="register"),
    path('', views.getRoutes, name="routes"),
    path('users/profile/', views.getUserProfile, name="user-profile"),
    path('users/', views.getUsers, name="users"),
    path('products', views.getProducts, name="products"),
    path('product/<str:pk>/', views.getProduct, name="product"),
    path('products/add/', views.addProduct, name="add-product"),  

]
