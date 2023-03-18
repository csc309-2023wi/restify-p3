from random import randrange
from django.db.models import F, Value, Min, DateField
from django.db.models.functions import Cast
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.serializers import (
    ModelSerializer,
    PrimaryKeyRelatedField,
    IntegerField,
    CurrentUserDefault,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters, permissions

from ..models import Property


class PropertySerializer(ModelSerializer):
    host_id = PrimaryKeyRelatedField(
        source="host.id", many=False, default=CurrentUserDefault(), read_only=True
    )
    rating = IntegerField(read_only=True)

    class Meta:
        model = Property
        fields = [
            "id",
            "host_id",
            "address",
            "description",
            "guest_capacity",
            "availability",
            "amenities",
            "images",
            "rating",
        ]


class PropertyPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = "page_size"
    max_page_size = 36


class PropertyListCreateView(ListCreateAPIView):
    serializer_class = PropertySerializer
    pagination_class = PropertyPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["address", "description", "amenities"]
    ordering_fields = ["rating", "earliest_availability"]

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        queryset = Property.objects.all()

        # GET query parameters

        host_id = self.request.query_params.get("host_id")
        if host_id is not None:
            queryset = queryset.filter(host__id=host_id)

        location = self.request.query_params.get("location")
        if location is not None:
            queryset = queryset.filter(address__icontains=location)

        guests_allowed = self.request.query_params.get("guests_allowed")
        if location is not None:
            queryset = queryset.filter(guest_capacity__gte=guests_allowed)

        # annotate rating
        queryset = queryset.annotate(rating=F("id") + Value(randrange(1, 6)))

        # annotate earliest start date
        queryset = queryset.annotate(
            earliest_availability=Min(
                Cast(F("availability__0__from"), output_field=DateField())
            )
        )

        return queryset

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)


class PropertyRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    lookup_field = "id"
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
