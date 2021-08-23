from django.db import models

# Create your models here.
#recipe(descirption,name,comments,needingredients,id*)
class recipe(models.Model):
    description = 