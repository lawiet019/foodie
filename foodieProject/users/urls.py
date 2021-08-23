from . import views
from django.urls import path
urlpatterns = [
    path('register', views.register, name='register'),
    path('loginbyusername', views.loginByUsername, name='loginbyusername'),
    path('loginbyemail', views.loginByEmail, name='loginbyemail'),
    path('getcaptcha', views.getCaptcha, name='getcaptcha'),
    path('verifycaptcha', views.verifyCaptcha, name='verifycaptcha'),
    path('activation/<slug:slug>', views.active, name='activation'),
    path('checkemail', views.checkEmail, name='checkemail'),
    path('checkusername', views.checkUsername, name='checkusername'),
    path('resendactive',views.resendactive,name='resendactive'),
    path('forgetpassword',views.forgetpassword,name='forgetpassword'),
    path('resetpasswordforforget',views.resetpasswordforforget,name='resetpasswordforforget'),
    path('testauth',views.testAuth,name='testauth'),
    path('refresh',views.refresh,name='refresh'),
   
    

]
#getCaptcha
