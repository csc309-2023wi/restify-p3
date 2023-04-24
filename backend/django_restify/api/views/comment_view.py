from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveUpdateAPIView,
    ListCreateAPIView,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.serializers import (
    ModelSerializer,
    PrimaryKeyRelatedField,
    Serializer,
    CharField,
)
from django.shortcuts import get_object_or_404
from django.db.models import Q

from ..models import User, PropertyComment, UserComment, Reply, Property, Reservation, Notification


class CommentSerializer(Serializer):
    commenter = PrimaryKeyRelatedField(many=False, read_only=True)
    content = CharField(required=False)

    class Meta:
        fields = [
            "id",
            "commenter",
            "content",
        ]


class PropertyCommentSerializer(CommentSerializer, ModelSerializer):
    comment_for = PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = PropertyComment
        fields = CommentSerializer.Meta.fields + ["comment_for", "rating", "posted_at"]


class UserCommentSerializer(CommentSerializer, ModelSerializer):
    comment_for = PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = UserComment
        fields = CommentSerializer.Meta.fields + ["comment_for", "rating", "posted_at"]


class ReplySerializer(CommentSerializer, ModelSerializer):
    comment_for = PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Reply
        fields = CommentSerializer.Meta.fields + ["comment_for", "posted_at"]


class CommentPagination(PageNumberPagination):
    page_size = 1


class PropertyCommentListView(ListCreateAPIView):
    serializer_class = PropertyCommentSerializer
    permission_classes = (AllowAny, IsAuthenticated)
    pagination_class = CommentPagination

    def get_queryset(self):
        property = get_object_or_404(Property, pk=self.kwargs["pk"])
        queryset = PropertyComment.objects.filter(comment_for=property)
        return queryset

    def create(self, request, *args, **kwargs):
        property_commented = get_object_or_404(Property, pk=self.kwargs["pk"])

        already_commented = PropertyComment.objects.filter(
            comment_for=property_commented, commenter=request.user
        )
        if already_commented:
            return Response(
                {"error": "You have already left a comment/rating for this property."},
                status=status.HTTP_403_FORBIDDEN,
            )

        reservation = Reservation.objects.filter(
            property_id=property_commented, guest_id=request.user
        ).filter(Q(status="CO") | Q(status="TE"))
        if not reservation:
            return Response(
                {"error": "You do not have permission to comment on this property."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        Notification.objects.create(
            user_id = request.user,
            property_id = property_commented,
            content=f"{request.user.username} has commented on the property at {property_commented.address}.")
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        property = get_object_or_404(Property, pk=self.kwargs["pk"])
        serializer.save(commenter=self.request.user, comment_for=property)


class UserCommentListView(ListCreateAPIView):
    serializer_class = UserCommentSerializer
    permission_classes = (AllowAny, IsAuthenticated)
    pagination_class = CommentPagination

    def get(self, request, *args, **kwargs):
        user = get_object_or_404(User, pk=self.kwargs["pk"])
        reservations = Reservation.objects.filter(
            Q(status="PE") | Q(status="AP") | Q(status="TE") | Q(status="CO"),
            guest_id=user,
        )
        if not reservations:
            return Response(
                {"error": "You do not have permission to view comments about this user"},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        user = get_object_or_404(User, pk=self.kwargs["pk"])
        queryset = UserComment.objects.filter(comment_for=user)
        return queryset

    def create(self, request, *args, **kwargs):
        user = get_object_or_404(User, pk=self.kwargs["pk"])

        already_commented = UserComment.objects.filter(
            comment_for=user, commenter=request.user
        )
        if already_commented:
            return Response(
                {"error": "You have already rated this user"},
                status=status.HTTP_403_FORBIDDEN,
            )

        reservation = Reservation.objects.filter(
            property_id__host=request.user, guest_id=user, status="CO"
        )
        if not reservation:
            return Response(
                {"error": "You do not have permission to rate this user."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        user = get_object_or_404(User, pk=self.kwargs["pk"])

        serializer.save(commenter=self.request.user, comment_for=user)


class ReplyListView(ListCreateAPIView):
    serializer_class = ReplySerializer
    permission_classes = (AllowAny, IsAuthenticated)
    pagination_class = CommentPagination

    def get_queryset(self):
        comment = get_object_or_404(PropertyComment, pk=self.kwargs["pk"])
        queryset = Reply.objects.filter(comment_for=comment)
        return queryset

    def create(self, request, *args, **kwargs):
        comment = get_object_or_404(PropertyComment, pk=self.kwargs["pk"])
        replies = Reply.objects.filter(comment_for=comment)

        if comment.comment_for.host == request.user:
            if replies.count() % 2 != 0:
                return Response(
                    {"error": "You can't reply to your own reply."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif comment.commenter == request.user:
            if replies.count() % 2 == 0:
                return Response(
                    {"error": "You can't reply to your own comment/reply."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {"error": "You are not allowed to reply to this comment."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        comment = get_object_or_404(PropertyComment, pk=self.kwargs["pk"])
        serializer.save(commenter=self.request.user, comment_for=comment)

class ReplyCheck(APIView):
    def get(self, request, pk):
        comment = get_object_or_404(PropertyComment, pk=pk)
        replies = Reply.objects.filter(comment_for=comment)

        if comment.comment_for.host == request.user:
            if replies.count() % 2 != 0:
                return Response(
                    {"error": "You can't reply to your own reply."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif comment.commenter == request.user:
            if replies.count() % 2 == 0:
                return Response(
                    {"error": "You can't reply to your own comment/reply."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {"error": "You are not allowed to reply to this comment."},
                status=status.HTTP_403_FORBIDDEN,
            ) 
        
        return Response({"reply_to": replies.count()}, status=status.HTTP_200_OK)

class CommentCheck(APIView):
    def get(self, request, pk):
        property_commented = get_object_or_404(Property, pk=pk)

        already_commented = PropertyComment.objects.filter(
            comment_for=property_commented, commenter=request.user
        )
        if already_commented:
            return Response(
                {"error": "You have already left a comment/rating for this property."},
                status=status.HTTP_403_FORBIDDEN,
            )

        reservation = Reservation.objects.filter(
            property_id=property_commented, guest_id=request.user
        ).filter(Q(status="CO") | Q(status="TE"))
        if not reservation:
            return Response(
                {"error": "You do not have permission to comment on this property."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        
        return Response({"message": "You can comment on this property."}, status=status.HTTP_200_OK)
    
class UserCommentCheck(APIView):
    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        reservations = Reservation.objects.filter(
            Q(status="PE") | Q(status="AP") | Q(status="TE") | Q(status="CO"),
            guest_id=user,
        )
        if not reservations:
            return Response(
                {"error": "You do not have permission to view comments about this user"},
                status=status.HTTP_403_FORBIDDEN,
            )

        return Response({"message": "You can comment on this user."}, status=status.HTTP_200_OK)
