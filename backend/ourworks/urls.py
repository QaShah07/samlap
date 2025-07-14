# backend/ourworks/urls.py
from rest_framework.routers import DefaultRouter
from django.urls import include, path
from .views import OurWorkViewSet

router = DefaultRouter()
router.register(r'', OurWorkViewSet)  # /api/ourworks/

urlpatterns = [
    path('', include(router.urls)),
]
