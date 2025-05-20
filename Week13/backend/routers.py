from rest_framework import routers

from myapp.viewsets import map_objectViewSet

router = routers.SimpleRouter()

router.register(r'myapp', map_objectViewSet, basename="myapp")

urlpatterns = router.urls
