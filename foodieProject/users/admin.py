from django.contrib import admin
from .models import UserProfile,EmailVerifyRecord
# Register your models here.
admin.site.register(UserProfile)
admin.site.register(EmailVerifyRecord)
