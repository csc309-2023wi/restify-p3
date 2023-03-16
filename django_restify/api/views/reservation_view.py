from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.serializers import (
    ModelSerializer,
    PrimaryKeyRelatedField,
    CurrentUserDefault,
)
from rest_framework import permissions

from ..models import User, Property, Reservation


class ReservationSerializer(ModelSerializer):
    guest_id = PrimaryKeyRelatedField(
        source="guest.id", many=False, default=CurrentUserDefault(), read_only=True
    )
    property_id = PrimaryKeyRelatedField(
        source="property.id", many=False, read_only=True
    )

    class Meta:
        model = Reservation
        fields = [
            "guest_id",
            "property_id",
            "status",
            "guest_count",
            "duration",
        ]


class ReservationListView(ListAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        # queryset = Reservation.objects.filter(guest=self.request.user.id)
        queryset = self.request.user.reservations_outgoing.all()
        return queryset

class ReservationCreateView(CreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(status="Pending",
                        guest=self.request.user, 
                        property=get_object_or_404(Property, id=self.kwargs['pk'])) 

class ReservationRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = ReservationSerializer

    def get_object(self):
        return get_object_or_404(Reservation, id=self.kwargs['id'])