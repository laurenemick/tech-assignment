from django.db import models

class User(models.Model):
    user_id = models.BigIntegerField(unique=True)
    company = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    industry = models.CharField(max_length=200)
    description = models.TextField()
    startdate = models.CharField(max_length=200)
    enddate = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.user_id}'

class Company(models.Model):
    company = models.CharField(max_length=200)
    month = models.CharField(max_length=200)
    headcount = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.company}'