# Generated by Django 3.1.2 on 2021-01-27 19:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_auto_20210127_1637'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emailverifyrecord',
            name='sendTime',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 27, 19, 20, 37, 789391)),
        ),
    ]
