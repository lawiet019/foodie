# Generated by Django 3.1.2 on 2021-08-22 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0019_remove_userprofile_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='versionID',
            field=models.CharField(default=0, max_length=50, verbose_name='email'),
        ),
    ]
