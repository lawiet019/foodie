

from os import access
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import UserProfile,EmailVerifyRecord
from django.conf import settings
from django.contrib.auth.hashers import make_password,check_password
import jwt
from .utils import create_validate_code,code_to_lower,send_register_email,generate_token,authentication
import io
import base64
from datetime import datetime,timedelta
from ratelimit.decorators import ratelimit


@csrf_exempt

@ratelimit(key='ip', rate='5/m',method='POST',block = True)
def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        if not username or not password or not email:
             return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})

       

        user_with_name =UserProfile.objects.filter(username = username)

        user_with_email =UserProfile.objects.filter(email = email)

        if user_with_name.exists():
            return JsonResponse({'result': 409, 'msg':'the username has been used,please choose another one'})
        elif user_with_email.exists():
            return JsonResponse({'result': 409, 'msg':'the email has been used,please choose another one'})
        else:
            password = make_password(password)
            UserProfile.objects.create(username=username, password=password,email = email)
            # send the validation email
            send_register_email(email,"register")
            return JsonResponse({'result': 200, 'msg':'you have registered successfully'})
    else:
        return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})

@ratelimit(key='ip', rate='5/s',method='GET',block = True)
@csrf_exempt
def checkEmail(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        user_with_email =UserProfile.objects.filter(email = email)
        if user_with_email.exists():
            return JsonResponse({'result': 400, 'msg':'the email has been used,please choose another one'})
        else:
            return JsonResponse({'result': 200, 'msg':'you can use the email'})

@ratelimit(key='ip', rate='5/s',method='GET',block = True)
@csrf_exempt
def checkUsername(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        user_with_name =UserProfile.objects.filter(username = username)
        if user_with_name.exists():
            return JsonResponse({'result': 400, 'msg':'the username has been used,please choose another one'})
        else:
            return JsonResponse({'result': 200, 'msg':'you can use this username'})



@ratelimit(key='ip', rate='1/m',method='POST',block = True)
@csrf_exempt
def loginByUsername(request):
    if request.method == 'POST':

        username = request.POST.get('username')
        password = request.POST.get('password')
        # check the username is in database
        if UserProfile.objects.filter(username=username).exists():
            user = UserProfile.objects.get(username=username)
            # verify the password
            if check_password(password, user.password):
                # use token as validation
                if user.isActive:
                    access_token = generate_token(user,1)
                    refresh_token = generate_token(user,2)

                    cur_repsonse = JsonResponse({'result': 200, 'msg':'you have logined in  successfully'})
                    cur_repsonse.set_cookie(key='access_token', value=access_token,expires =datetime.now() + timedelta(hours=2))
  
                    cur_repsonse.set_cookie(key='refresh_token', value=refresh_token,path=settings.REFRESH_PATH,expires=datetime.now() + timedelta(days=30))
                   
                    return cur_repsonse
                else:
                    send_register_email(user.email,"register")
                    return JsonResponse({'result': 400, 'msg':'Your account has not been activated yet, please activate it according to the email'})
        return JsonResponse({'result': 400, 'msg':'invalid username or password'})

@ratelimit(key='ip', rate='1/m',method='POST',block = True)
@csrf_exempt
def loginByEmail(request):
    if request.method == 'POST':

        email = request.POST.get('email')
        password = request.POST.get('password')
        # check the email is in database
        if UserProfile.objects.filter(email = email).exists():
            user = UserProfile.objects.get(email = email)
            username = user.username

            # verify the password
            if check_password(password, user.password):
                # use token as validation
                if user.isActive:
                    access_token = generate_token(user,1)
                    refresh_token = generate_token(user,2)
                    cur_repsonse = JsonResponse({'result': 200, 'msg':'you have logined in  successfully'})
                    cur_repsonse.set_cookie(key='access_token', value=access_token)
                    cur_repsonse.set_cookie(key='refresh_token', value=refresh_token)
                   
                    return cur_repsonse
                else:
                    send_register_email(user.email,"register")
                    return JsonResponse({'result': 403, 'msg':'Your account has not been activated yet, please activate it according to the email'})
            else:
                return JsonResponse({'result': 401, 'msg':'Invalid password or email'})
        else:
            return JsonResponse({'result': 401, 'msg':'Invalid password or email'})
    else:
        return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})






    
@ratelimit(key='ip', rate='1/s',method='POST',block = True)
@csrf_exempt
def getCaptcha(request):
    buf = io.BytesIO() #  create a space
    img, code = create_validate_code() # get the img and code
    request.session['captcha'] = code # captcha
    request.session.set_expiry(300) # set the expired time as 5 mins
    img.save(buf,'PNG')  # save the image
    # convert image to base64
    image_string = base64.b64encode(buf.getvalue()).decode("utf-8")
    return JsonResponse({'result': 200, 'captcha':image_string})

@ratelimit(key='ip', rate='5/s',method='POST',block = True)   
@csrf_exempt
def verifyCaptcha(request):
    if request.method == 'POST':
        user_code = request.POST.get("code")
        if not user_code:
            return   JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})

        if 'captcha' not in request.session:

            return JsonResponse({'result': 400, 'msg':'there is something wrong with your captcha'})

        if code_to_lower(user_code) == code_to_lower(request.session['captcha']):

            return JsonResponse({'result': 200, 'msg':'your captcha is correct'})
        else:

            return JsonResponse({'result': 400, 'msg':'your captcha is wrong'})

@ratelimit(key='ip', rate='1/s',method='GET',block = True)
@csrf_exempt
def active(request,slug = None):
    if slug:
        email_with_slug = EmailVerifyRecord.objects.filter(code = slug)
        if email_with_slug.exists():
            email = EmailVerifyRecord.objects.get(code = slug)
            email_address = email.email
            # the link is valid for 10 minutes
            if (datetime.now() - email.sendTime).seconds <=60*10 :
                user = UserProfile.objects.get(email = email_address)
                if user.isActive:
                    return JsonResponse({'result': 409, 'msg':'Your account has been activated before'})
                else:

                    user.isActive = True
                    user.save()
                    return JsonResponse({'result': 200, 'msg':'We have already activated your account'})
            else:
                return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})
        else:
            return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})

    return JsonResponse({'result': 400, 'msg':'The slug is invalid'})

@ratelimit(key='ip', rate='1/s',method='GET',block = True)
@csrf_exempt
def resendactive(request):
    if request.method == 'POST':
        email = request.POST.get("email")
        if  UserProfile.objects.filter(email = email).exists():

            if send_register_email(email,"register"):
                return JsonResponse({'result': 200, 'msg':'If you  have alreay registered, We already sent you the email'})
            else:
                return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})
        else:
            return JsonResponse({'result': 200, 'msg':'If you  have alreay registered, We already sent you the email'})
    return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})

@ratelimit(key='ip', rate='5/m',method='POST',block = True)
@csrf_exempt
def forgetpassword(request):
    if request.method == 'POST':
        email = request.POST.get("email")
        if  UserProfile.objects.filter(email = email).exists():
            if send_register_email(email,"forget"):
                return JsonResponse({'result': 200, 'msg':'If you  have alreay registered, We already sent you the email'})
            else:
                return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})

        else:
            return JsonResponse({'result': 200, 'msg':'If you  have alreay registered, We already sent you the email'})
    
    return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})


@ratelimit(key='ip', rate='5/m',method='POST',block = True)
@csrf_exempt
def resetpasswordforforget(request):
    if request.method == 'POST':
        password = request.POST.get("password")
        code = request.POST.get("code")
        if EmailVerifyRecord.objects.filter(code = code).exists():
            email_record =  EmailVerifyRecord.objects.get(code = code)
            email =email_record.email

            if UserProfile.objects.filter(email=email).exists() and (datetime.now()- email_record.sendTime).seconds <=600 :
                user_need_update = UserProfile.objects.filter(email=email)
        
                password = make_password(password)
                user_need_update.update(password=password)
                return JsonResponse({'result': 200, 'msg':'You have already changed the password successfully'})
            else:
                return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})

        
    return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})



@csrf_exempt
def testAuth(request):
    access_token = request.COOKIES.get("access_token")
    print(access_token)
    return JsonResponse({"result":200})

@ratelimit(key='ip', rate='2/m',method='GET',block = True)
@csrf_exempt
def refresh(request):
    refresh_token = request.COOKIES.get("refresh_token")
    result,user,v  = authentication(refresh_token)
    if result == 0:
        if v and v["data"]["type"] ==2:
            access_token = generate_token(user)
            cur_repsonse = JsonResponse({'result': 200, 'msg':'you have logined in  successfully'})
            cur_repsonse.set_cookie(key='access_token', value=access_token,expires =datetime.now() + timedelta(hours=2))
            return cur_repsonse
        
    return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request'})
    
@ratelimit(key='ip', rate='2/m',method='POST',block = True)
@csrf_exempt
def changePassword(request):
    access_token = request.COOKIES.get("access_token")
    result,user  = authentication(access_token)
    if result ==1:
        return JsonResponse({"result":401,"msg":"Expired token"})
    elif result >1:
        return JsonResponse({"result":401,"msg":"Invalid  token"})
    else:
        if request.method == 'POST':
            old_password = request.POST.get("oldpassword")
            new_password = request.POST.get("newpassword")
            if check_password(old_password, user.password):
                user.update(password=new_password,versionID=user.versionID+1)
                return JsonResponse({"result":200,"msg":"You have already updated the password"})
            else:
                return JsonResponse({"result":400,"msg":"Invalid password"})
        else:
            return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})

@ratelimit(key='ip', rate='2/m',method='POST',block = True)
@csrf_exempt
def changeEmail(request):
    access_token = request.COOKIES.get("access_token")
    result,user  = authentication(access_token)
    if result ==1:
        return JsonResponse({"result":401,"msg":"Expired token"})
    elif result >1:
        return JsonResponse({"result":401,"msg":"Invalid  token"})
    else:
        if request.method == 'POST':
            password = request.POST.get("password")
            new_email = request.POST.get("new_email")
            if check_password(password, user.password):
                user.update(email = new_email)
                return JsonResponse({"result":200,"msg":"You have already updated the password"})
            else:
                return JsonResponse({"result":400,"msg":"Invalid password"})
        else:
            return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})
    

# 
# def updateProfile(request):
#     if request.method == 'POST':
#         key = request.POST.get("key")
#         value = request.POST.get("value")
        
        
    











