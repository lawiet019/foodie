from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.
#recipe(descirption,name,id*)

class Recipe(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    descirption = RichTextField()
    user = models.ForeignKey('users.UserProfile',on_delete=models.CASCADE)
    likes = models.IntegerField()

# recipeImages
class RecipeImages(models.Model):
    image = models.ImageField()
    recipeid = models.ForeignKey(Recipe,on_delete=models.CASCADE)
#recipeComments(id*,recipe,user,content,touser)
class RecipeComments(models.Model):
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE)
    user = models.ForeignKey('users.UserProfile',on_delete=models.CASCADE)
#ingredtent(where can buy,price,img,comments,replacement,id*)
class Ingredtent(models.Model):
    id = models.AutoField(primary_key=True)
    price = models.FloatField()
    img = models.ImageField()







#RecipeIngredient(recipeid, ingredientid)
# class RecipeIngredient(models.Model):
#     recipe =
