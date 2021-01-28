from django.contrib import admin
from .models import Recipe,RecipeImages,RecipeComments,Ingredtent

# Register your models here.
admin.site.register(Recipe)
admin.site.register(RecipeImages)
admin.site.register(RecipeComments)
admin.site.register(Ingredtent)
