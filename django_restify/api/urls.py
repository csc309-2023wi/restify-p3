from django.urls import path
from . import views

urlpatterns = [
    path("", views.HelloView.as_view(), name="hello"),
    # path("comments/", views.__.as_view(), name="comments"),
    # path("images/", views.__.as_view(), name="images"),
    # path("notifications/", views.__.as_view(), name="notifications"),
    # path("properties/", views.__.as_view(), name="properties"),
    # path("reservations/", views.__.as_view(), name="reservations"),
    # path("users/", views.__.as_view(), name="users"),
]
