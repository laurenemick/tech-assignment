# Generated by Django 4.0 on 2021-03-17 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('headcount', '0004_alter_company_headcount_alter_user_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.BigIntegerField(unique=True),
        ),
    ]
