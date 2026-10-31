from django.contrib import admin

# Register your models here.
from map_app.models import map_object

class map_objectAdmin(admin.ModelAdmin):
    list_display=('name','rating','user_ratings_total','vicinity','place_id','geometry_lat','geometry_lng','business_status',)
    list_filter=('name','rating','user_ratings_total',)
    search_fields=('name','rating','user_ratings_total',)
    ordering=('name','rating','user_ratings_total',)

admin.site.register(map_object, map_objectAdmin)
