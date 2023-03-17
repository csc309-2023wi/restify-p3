from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("", views.HelloView.as_view(), name="hello"),
    # path("comment/", views.__.as_view(), name="comment"),
    # path("image/", views.__.as_view(), name="image"),
    # path("notification/", views.__.as_view(), name="notification"),
    # path("property/", views.__.as_view(), name="property"),
    # path("reservation/", views.__.as_view(), name="reservation"),
    path("/signup/", views.SignUpView.as_view(), name="signup"),
    path("/login/", TokenObtainPairView.as_view(), name="login"),
    path("/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/profile/", views.ProfileView.as_view(), name="profile")
]
