from django.db import models

# Create your models here.
#recipe(descirption,name,id*)
class Recipe(models.Model):
    name = models.CharField(max_length=30)
    descirption = models.CharField()
#recipeComments(id*,recipe,user,content,touser)
class RecipeComments(models.Model):
    recipe = models.ForeignKey(Recipe)
    user = models.ForeignKey(User)
