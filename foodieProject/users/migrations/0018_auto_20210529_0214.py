# Generated by Django 3.1.2 on 2021-05-29 02:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_auto_20210528_0303'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='emailverifyrecord',
            name='updateTime',
        ),
        migrations.AlterField(
            model_name='emailverifyrecord',
            name='code',
            field=models.CharField(max_length=20, primary_key=True, serialize=False, unique=True, verbose_name='code'),
        ),
        migrations.AlterField(
            model_name='emailverifyrecord',
            name='sendTime',
            field=models.DateTimeField(auto_now=True),
        ),
    ]