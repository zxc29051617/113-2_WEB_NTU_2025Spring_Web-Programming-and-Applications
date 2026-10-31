from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from myapp.models import map_object

from myapp.serializers import map_objectSerializer


class map_objectViewSet(viewsets.ModelViewSet):
    queryset = map_object.objects.all()
    serializer_class = map_objectSerializer
    permission_classes = [AllowAny]
