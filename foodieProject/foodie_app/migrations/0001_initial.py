# Generated by Django 3.1.2 on 2021-01-24 20:54

import ckeditor.fields
import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EmailVerifyRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=20, verbose_name='CAPTCHA')),
                ('email', models.EmailField(max_length=50, verbose_name='email')),
                ('send_type', models.CharField(choices=[('R', 'register'), ('F', 'forget password')], max_length=10)),
                ('send_time', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
        migrations.CreateModel(
            name='Ingredtent',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('price', models.FloatField()),
                ('img', models.ImageField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('descirption', ckeditor.fields.RichTextField()),
                ('likes', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.DateField(unique=True, verbose_name='CharField')),
                ('password', models.DateField(unique=True, verbose_name='CharField')),
                ('birthday', models.DateField(blank=True, null=True, verbose_name='birthday')),
                ('gender', models.CharField(choices=[('M', 'male'), ('F', 'female'), ('O', 'others'), ('P', 'prefer not to say')], default='female', max_length=10, verbose_name='gender')),
                ('mobile', models.CharField(blank=True, max_length=11, null=True, verbose_name='mobile')),
            ],
        ),
        migrations.CreateModel(
            name='RecipeImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='')),
                ('recipeid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='foodie_app.recipe')),
            ],
        ),
        migrations.CreateModel(
            name='RecipeComments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='foodie_app.recipe')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='foodie_app.userprofile')),
            ],
        ),
        migrations.AddField(
            model_name='recipe',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='foodie_app.userprofile'),
        ),
    ]
