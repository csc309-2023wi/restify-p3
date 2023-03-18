from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("", views.HelloView.as_view(), name="hello"),
    # path("comment/", views.__.as_view(), name="comment"),
    # path("image/", views.__.as_view(), name="image"),
    # path("notification/", views.__.as_view(), name="notification"),
    # path("property/", views.PropertyListCreateView.as_view(), name="property"),
    # path(
    #     "property/<int:id>",
    #     views.PropertyRetrieveUpdateDestroyView.as_view(),
    #     name="property_one",
    # ),
    path("reservation/", views.ReservationListView.as_view(), name="reservation"),
    path("reservation/create/<int:pk>/", views.ReservationCreateView.as_view(), name="create_reservation"),
    path("reservation/cancel/<int:pk>/", views.ReservationCancelView.as_view(), name="cancel_reservation"),
    path("reservation/update/<int:pk>/", views.ReservationUpdateView.as_view(), name="pending_request"),
    path("reservation/cancel/request/<int:pk>/", views.ReservationHostCancelView.as_view(), name="cancel_request"),

    # path("reservation/<int:id>/", views.ReservationRetrieveUpdateDestroyView.as_view(), name="reservation_two"),

    path('notifications/', views.NotificationsView.as_view(), name='notifications'),
    path('notifications/read/<int:id>/', views.NotificationReadView.as_view(), name='read_notification'),
    
    path("signup/", views.SignUpView.as_view(), name="signup"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/profile/", views.ProfileView.as_view(), name="profile")
]
