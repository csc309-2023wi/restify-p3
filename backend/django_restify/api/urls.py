from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("", views.HelloView.as_view(), name="hello"),
    path(
        "comment/property/<int:pk>/",
        views.PropertyCommentListView.as_view(),
        name="comment_property",
    ),
    path("comment/property/<int:pk>/check/", views.CommentCheck.as_view(), name="comment_check"),
    path(
        "comment/user/<int:pk>/",
        views.UserCommentListView.as_view(),
        name="comment_user",
    ),
    path("comment/user/<int:pk>/check/", views.UserCommentCheck.as_view(), name="user_check"),
    path(
        "comment/property/reply/<int:pk>/", views.ReplyListView.as_view(), name="reply"
    ),
    path("comment/property/reply/<int:pk>/check/", views.ReplyCheck.as_view(), name="reply_check"),
    # path("image/", views.__.as_view(), name="image"),
    path("image/<str:image_hash>", views.image_view, name="image_fetch"),
    path("signup/", views.SignUpView.as_view(), name="signup"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/profile/", views.ProfileView.as_view(), name="profile"),
    path("user/<int:pk>/", views.UserView.as_view(), name="user"),
    path("reservation/", views.ReservationListView.as_view(), name="reservation"),
    path(
        "reservation/create/",
        views.ReservationCreateView.as_view(),
        name="create_reservation",
    ),
    path(
        "reservation/cancel/<int:pk>/",
        views.ReservationCancelView.as_view(),
        name="cancel_reservation",
    ),
    path(
        "reservation/update/<int:pk>/",
        views.ReservationUpdateView.as_view(),
        name="pending_request",
    ),
    path(
        "reservation/cancel/request/<int:pk>/",
        views.ReservationHostCancelView.as_view(),
        name="cancel_request",
    ),
    path("notifications/", views.NotificationsView.as_view(), name="notifications"),
    path(
        "notifications/read/<int:id>/",
        views.NotificationReadView.as_view(),
        name="read_notification",
    ),
    path("property/", views.PropertyListCreateView.as_view(), name="property"),
    path(
        "property/<int:id>",
        views.PropertyRetrieveUpdateDestroyView.as_view(),
        name="property_one",
    ),
    path("signup/", views.SignUpView.as_view(), name="signup"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/profile/", views.ProfileView.as_view(), name="profile"),
]
