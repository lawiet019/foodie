1. create virtualenv
https://www.jianshu.com/p/d37662e6ef34

2. create django project
```
django-admin startproject foodie_pro

```

3. create django app
```
django-admin startapp foodie_app
```
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
https://blog.csdn.net/qq_38504396/article/details/79835475

6. add to github
 git remote add origin git@github.com:lawiet019/foodie.git

DJANGO ORM
https://blog.csdn.net/kan2016/article/details/82855158
https://blog.csdn.net/kan2016/article/details/82868636?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param
