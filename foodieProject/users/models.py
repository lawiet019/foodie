from django.db import models
from datetime import datetime

# Create your models here.
class UserProfile(models.Model):
    """
    inhereit AbstractUser
    """
    gender_choices = (
        ('M', 'male'),
        ('F', 'female'),
        ('O', 'others'),
        ('P', 'prefer not to say'),
    )
    username = models.CharField('username',unique= True,max_length = 50,default ='')
    password = models.CharField('password',max_length = 150)
    email = models.CharField('email',unique= True,max_length = 50,default='')
    birthday = models.DateField('birthday',null=True,blank=True)
    gender = models.CharField('gender',max_length=10,choices=gender_choices,null=True,blank=True)
    mobile = models.CharField('mobile',max_length=11,null=True,blank=True)
    token = models.CharField('token',max_length = 200,null=True,blank=True)
    isActive = models.BooleanField(default = False)
    createTime = models.DateTimeField(null=True,blank=True)
    updateDate = models.DateTimeField(null=True,blank=True)

class EmailVerifyRecord(models.Model):
    """
    CAPTCHA
    """
    send_choices = (
        ('R','register'),
        ('F','forget password')
    )

    code = models.CharField('code',max_length=20)
    email = models.EmailField('email',max_length=50)
    sendType = models.CharField(choices=send_choices,max_length=10)
    sendTime = models.DateTimeField()
