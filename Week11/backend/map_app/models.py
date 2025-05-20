from django.db import models

# Create your models here.
from django.utils import timezone

# Create your models here.
class map_object(models.Model):
    MAX_LENGTH=255
    
    business_status = models.CharField('business_status',max_length=MAX_LENGTH, null=True)
    geometry_lat = models.CharField('geometry_lat',max_length=MAX_LENGTH, null=True)
    geometry_lng = models.CharField('geometry_lng',max_length=MAX_LENGTH, null=True)
    name = models.CharField('name',max_length=MAX_LENGTH, null=True)
    place_id = models.CharField('place_id',max_length=MAX_LENGTH, null=True)
    rating = models.CharField('rating',max_length=MAX_LENGTH, null=True)
    user_ratings_total = models.CharField('user_ratings_total',max_length=MAX_LENGTH, null=True)
    vicinity = models.CharField('vicinity',max_length=MAX_LENGTH, null=True)
    
    
    def __str__(self):
        return self.name
