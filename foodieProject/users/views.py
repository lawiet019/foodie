

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import UserProfile,EmailVerifyRecord
from django.conf import settings
from django.contrib.auth.hashers import make_password,check_password
import jwt
from .utils import create_validate_code,code_to_lower,send_register_email
import io
import base64

@csrf_exempt
def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        # print(len(username),len(password),len(email))

        user_with_name =UserProfile.objects.filter(username = username)

        user_with_email =UserProfile.objects.filter(email = email)

        if user_with_name.exists():
            return JsonResponse({'result': 400, 'msg':'the username has been used,please choose another one'})
        elif user_with_email.exists():
            return JsonResponse({'result': 400, 'msg':'the email has been used,please choose another one'})
        else:
            password = make_password(password)
            UserProfile.objects.create(username=username, password=password,email = email)
            # send the validation email
            send_register_email(email,"register")
            return JsonResponse({'result': 200, 'msg':'you have registered successfully'})
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
                    token =jwt.encode({'username': user.username,'email':user.email},settings.SECRET_KEY,algorithm='HS256')
                    UserProfile.objects.filter(email = email).update(token = token)
                    return JsonResponse({'result': 200, 'msg':'you have logined in  successfully','token':token})
                else:
                    send_register_email(user.email,"register")
                    return JsonResponse({'result': 400, 'msg':'Your account has not been activated yet, please activate it according to the email'})
        return JsonResponse({'result': 400, 'msg':'invalid username or password'})

@csrf_exempt
def loginByEmail(request):
    if request.method == 'POST':

        email = request.POST.get('email')
        password = request.POST.get('password')
        # check the username is in database
        if UserProfile.objects.filter(email = email).exists():
            user = UserProfile.objects.get(email = email)

            # verify the password
            if check_password(password, user.password):
                # use token as validation
                if user.isActive:
                    token =jwt.encode({'username': user.username,'email':user.email},settings.SECRET_KEY,algorithm='HS256')
                    UserProfile.objects.filter(email = email).update(token = token)
                    return JsonResponse({'result': 200, 'msg':'you have logined in  successfully','token':token})
                else:
                    send_register_email(user.email,"register")
                    return JsonResponse({'result': 400, 'msg':'Your account has not been activated yet, please activate it according to the email'})
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
@csrf_exempt
def verifyCaptcha(request):
    user_code = request.POST.get("code")
    if code_to_lower(user_code) == code_to_lower(request.session['captcha']):
        return JsonResponse({'result': 200, 'msg':'your captcha is correct'})
    else:
        return JsonResponse({'result': 400, 'msg':'your captcha is wrong'})

@csrf_exempt
def active(request,slug = None):
    if slug:
        email_with_slug = EmailVerifyRecord.objects.filter(code = slug)
        if email_with_slug.exists():
            email = EmailVerifyRecord.objects.get(code = slug)
            email_address = email.email
            user_with_email = EmailVerifyRecord.objects.filter(email = email_address)
            if user_with_email.exists():
                user = UserProfile.objects.get(email = email_address)
                user.isActive = True
                user.save()
                return JsonResponse({'result': 200, 'msg':'We have already activated your account'})


    return JsonResponse({'result': 400, 'msg':'The slug is invalid'})

@csrf_exempt
def resendactive(request):
    email = request.POST.get("email")
    if send_register_email(email,"register"):
        return JsonResponse({'result': 200, 'msg':'If you  have alreay registered, We already sent you the email'})
    else:
        return JsonResponse({'result': 400, 'msg':'Sorry, there is something problem with your request '})
