from rest_framework import serializers

from myapp.models import map_object


class map_objectSerializer(serializers.ModelSerializer):

    class Meta:
        model = map_object
        fields = ['name','rating','user_ratings_total','vicinity','place_id','geometry_lat','geometry_lng','business_status']
        read_only_fields = ['name','rating','user_ratings_total','vicinity','place_id','geometry_lat','geometry_lng','business_status']
