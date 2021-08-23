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

post -> nosql

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


22. deal the the expired data
https://blog.csdn.net/zhwwashere/article/details/20401153



23. create a new app named  recipes

```
django-admin startapp recipes
```

24. where to store blog with image
- what tool front end will use and what data it will send to
https://jpuri.github.io/react-draft-wysiwyg/#/docs
https://www.sanity.io/guides/top-5-rich-text-react-components
can have html/markdown 
- where to store images
store them in file system
- which image file host to use 
free image siteing fire storage
https://firebase.google.com/docs/storage/web/start
- design the recipe schema
()

25. api document
use postman to publish document
26. token
user is nearly complete
I use token to remember the login status. And everytime log in, it will return to client. And client will keep it and expired time in the localStorage.
27. other things connected to token
- remember me 
- token automatic renewal 

to realize the function, we use two tokens:
access token and refresh token
  - why we need to two tokens
  https://www.zhihu.com/question/316165120?sort=created
  because the access token used a lot in the  tranmission process. so it will be vulnerable




- security concern 
  - httponly 
  By putting the token in the cookie and setting that cookie HttpOnly, you can prevent access to the cookie by malicious client side script (ie, XSS)
  in that case, we should store the token in the cookie not the body
  here is how to implement in django 
  https://stackoverflow.com/questions/64389973/set-cookies-for-ajax-request-when-jsonresponse-is-returned 

- I don't want to store session in the server
JWT 
https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html
  - will jwt be the same 
  in my example, if the exp is same, it will be same. but every time it will change.



28. In the client part, should we store the data in cookie or localStorage
cookie is safer
but I need to figure out how to combine it with two tokens:

- expire time?
we could set the automatic expired time
- could we choose what cookie to send
You can store both tokens, access and refresh, as cookie. But refresh token must have special path (e.g. /refresh). So refresh token will be sent only for request to /refresh url, not for every request like access token.The path parameter can be used in the set_ccokie
for the path in cookie, we cannot use the postfix path 
https://stackoverflow.com/questions/8014024/set-cookie-wildcard-path
so we store the path in setting








DJANGO ORM
https://blog.csdn.net/kan2016/article/details/82855158
https://blog.csdn.net/kan2016/article/details/82868636?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param


future function:
1. 如果邮箱已经激活，不能再发激活邮件 done
2.  自动清理无用数据，比如没有激活的用户
3. logout - 直接在前端删除token
4. httponly (之前没用是为了debug)
5.   下面这些功能不能允许通过 cookie 登录的用户使用：
  * 修改密码
  * 修改用户邮箱（特别是如果系统的密码找回机制是基于邮箱的）
  * 任何用户的敏感信息
  * 任何需要支付的功能
 





