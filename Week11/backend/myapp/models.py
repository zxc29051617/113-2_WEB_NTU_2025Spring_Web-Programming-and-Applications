from django.db import models

# Create your models here.

from django.utils import timezone

class student(models.Model):
    SEX_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    cName = models.CharField('name',max_length=20, null=False)
    cSex = models.CharField('sex',max_length=1, choices=SEX_CHOICES, default='', null=True)
    cBirthday = models.DateField('birthday',null=True)
    cEmail = models.EmailField('Email',max_length=100, blank=False, default='')
    cPhone = models.CharField('phone',max_length=50, blank=True, default='')
    cAddr = models.CharField('address',max_length=255, blank=True, default='')
    last_modified = models.DateTimeField('lastmodifieddate', auto_now = True)
    created = models.DateTimeField('date',default = timezone.now)

    def __str__(self):
        return self.cName
