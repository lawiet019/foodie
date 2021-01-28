# Generated by Django 3.1.2 on 2021-01-27 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20210125_0316'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='createDate',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='isActive',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='updateDate',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]