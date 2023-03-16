from django.urls import path
from . import views

urlpatterns = [
    path("", views.HelloView.as_view(), name="hello"),
    # path("comment/", views.__.as_view(), name="comment"),
    # path("image/", views.__.as_view(), name="image"),
    # path("notification/", views.__.as_view(), name="notification"),
    path("reservation/", views.ReservationListView.as_view(), name="reservation"),
    path("reservation/prop/<int:pk>/", views.ReservationCreateView.as_view(), name="reservation_one"),
    path("reservation/<int:id>/", views.ReservationRetrieveUpdateDestroyView.as_view(), name="reservation_two"),
    # path("user/", views.__.as_view(), name="user"),
]
