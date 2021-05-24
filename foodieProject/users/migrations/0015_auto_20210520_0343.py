# Generated by Django 3.1.2 on 2021-05-20 03:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_auto_20210127_2300'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='updateDate',
        ),
        migrations.AddField(
            model_name='emailverifyrecord',
            name='createTime',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='emailverifyrecord',
            name='updateTime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='updateTime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='createTime',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
