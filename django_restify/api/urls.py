from django.urls import path
from . import views

urlpatterns = [
    path("", views.HelloView.as_view(), name="hello"),
    # path("comment/", views.__.as_view(), name="comment"),
    # path("image/", views.__.as_view(), name="image"),
    # path("notification/", views.__.as_view(), name="notification"),
    # path("property/", views.__.as_view(), name="property"),
    # path("reservation/", views.__.as_view(), name="reservation"),
    # path("user/", views.__.as_view(), name="user"),
]
