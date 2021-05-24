1. create virtualenv
https://www.jianshu.com/p/d37662e6ef34

2. create django project
```
django-admin startproject foodieProject

```

3. create django app
```
django-admin startapp foodie_app
```
add app into settings installed_app

4. config database

recipe(descirption,name,comments,needingredients,id*)
recipeComments(id*,recipe,user,content,touser)
RecipeIngredient(recipeid, ingredientid)
ingredtent(belongstowhichmarket,price,img,comments,replacement,id*)
ingredientcomments（
market(name,ingredients they have,urltobuy,delivery or not,id*)
user (username, password, theirRecipe,location,id*)

-  choose to use postgresql
  - my postgres will background start so I just connect to it by
  ```
  psql postgres
  ```
  - some commands
  ```
  \q 退出
  \l 显示数据库
  \dg 显示当前用户
  \dp 显示当前数据库中表、视图及其权限等
  \dt 显示当前数据库中的表
  \d TABLENAME 查看表结构
  ```
  - create database
  ```sql
  create database foodie;
  ```
  - create a user named foodie and grant it
  ```
  CREATE USER foodie_m  WITH PASSWORD 'abC123456';
  CREATE USER foodie_m  WITH PASSWORD '*****';
  GRANT ALL PRIVILEGES ON DATABASE foodie TO foodie_m;

  # connect to database foodie
  \c foodie
  GRANT ALL PRIVILEGES ON all tables in schema public TO foodie_m;
  ```

  - config the postgresql in django
    - install the package
    ```
    pip install psycopg2-binary
    ```
    - config the `settings.py` in django
      ```
      DATABASES = {
          'default': {
              'default': {
               'ENGINE': 'django.db.backends.postgresql_psycopg2',
               'NAME': 'foodie',
               'USER': 'foodie_m',
               'PASSWORD': '...',
               'HOST': '127.0.0.1',
               'PORT': '5432',
                  }
          }
      }
      ```
    - test the configuration by running
    ```
    #You can open the shell mode, and then you can directly operate the table model directly
    python manage.py shell
    ```

5. build the schema of database
ckeditor
https://github.com/django-ckeditor/django-ckeditor
https://blog.csdn.net/qq_38504396/article/details/79835475

database migrate
```
python manage.py makemigrations # record our change to models.py
python manage.py migrate
```

6. add to github
- add remote repo
```
 git remote add origin git@github.com:lawiet019/foodie.git
```
- delete some files from remote repo
```
git rm -r --cached psd_database.txt
```

7. set the media foloder for image
```
MEDIA_ROOT = os.path.join(BASE_DIR,'media')
MEDIA_URL = '/media/'
```
8. the creation of user app
the main function is to create a user managment system based on email
- start a new app
```
django-admin startapp users
```

- create user table based on the AbstractUser offered by Django
 - need to done:
   make nickname unique/ add payment
- how to use models from another app
https://stackoverflow.com/questions/43847173/cannot-import-models-from-another-app-in-django
- ForeignKey
http://docs.djangoproject.com/en/3.1/ref/models/fields/

9. front end part -choice react (seperate front end and back end) + bootstrap
front-end handle verify data before submit

10. restful API

11. meet error when delete the user app and change models
 https://stackoverflow.com/questions/50324561/valueerror-the-field-admin-logentry-user-was-declared-with-a-lazy-reference

12. csrf
https://zhuanlan.zhihu.com/p/22521378
how to implement in django
csrf_exempt
https://www.cnblogs.com/zhaof/p/6281482.html

13. make sure the password is secure
- use https
- encrypted password  before put into database

14. cookie
cookie,session,token
https://zhuanlan.zhihu.com/p/63061864

15. django admin
- create a superuser
```
python manage.py createsuperuser
```
bind model to admin
```
# admin.py
from django.contrib import admin
from .models import UserProfile,EmailVerifyRecord,Recipe,RecipeImages,RecipeComments,Ingredtent

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(EmailVerifyRecord)
admin.site.register(Recipe)
admin.site.register(RecipeImages)
admin.site.register(RecipeComments)
admin.site.register(Ingredtent)
```

16. urls
- include
https://www.cnblogs.com/hanmk/p/12656391.html

17. use global variable in settings
https://www.cnblogs.com/ccorz/p/django-zhong-desetting-quan-ju-bian-liang-de-dao-r.html

18. captcha
front-end or back-end
https://blog.csdn.net/weixin_44802104/article/details/103430291#:~:text=%E5%89%8D%E7%AB%AF%E9%AA%8C%E8%AF%81%E7%A0%81%E6%98%AF%E7%94%B1,%E7%AB%AF%E7%94%9F%E6%88%90%E7%9A%84%E9%AA%8C%E8%AF%81%E7%A0%81%E3%80%82
even I sepearate front end and back end ,I can still use request session(cannot be seen by postman but can be seen by wireshark)

19. static files
- change the settings.py
```
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)
```

use in this format '/static/Fonts/Arvo-Regular.ttf'

20. third -party login
https://simpleisbetterthancomplex.com/tutorial/2016/10/24/how-to-add-social-login-to-django.html


21. meet the problem
the problem can be seen:
```
django.db.utils.OperationalError: could not connect to server: Connection refused
	Is the server running on host "127.0.0.1" and accepting
	TCP/IP connections on port 5432?
```
solution:
reinstall the postgresql
recreate the database 
use `python manage.py makemigrations` `python manage.py migrate`








DJANGO ORM
https://blog.csdn.net/kan2016/article/details/82855158
https://blog.csdn.net/kan2016/article/details/82868636?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param
