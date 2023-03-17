from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from rest_framework.serializers import (
    ModelSerializer,
    PrimaryKeyRelatedField,
    CurrentUserDefault,
)
from rest_framework import permissions
from datetime import date
from django.db.models import Q
from ..models import User, Property, Reservation, Notification


class ReservationSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = [
            "guest",
            "property",
            "status",
            "guest_count",
            "from_date",
            "to_date",
        ]
        read_only_fields = ["status", "property", "guest"]

class ReservationHostSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = [
            "guest",
            "property",
            "status",
            "guest_count",
            "from_date",
            "to_date",
        ]
        read_only_fields = ["property", "guest", "guest_count", "from_date", "to_date"]

class ReservationPagination(PageNumberPagination):
    page_size = 5

class ReservationListView(ListAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = ReservationPagination

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        queryset = Reservation.objects.all()

        user_type = self.request.query_params.get('type')
        host_id = self.request.query_params.get("host_id")
        if user_type == 'host':
            # queryset = queryset.filter(property__host=self.request.user)
            queryset = queryset.filter(property__host__id=host_id)
        elif user_type == 'guest':
            user = get_object_or_404(User, id=host_id)
            queryset = user.reservations_outgoing.all()
            # queryset = self.request.user.reservations_outgoing.all()
        # else:
            # queryset = Reservation.objects.filter(guest_count__lte=0)
            # return Response({'error': 'Invalid Query Paramater - type'}, status=status.HTTP_400_BAD_REQUEST)
        
        state = self.request.query_params.get('status')
        if state is not None:
            queryset = queryset.filter(status=state)
        # else:
        #     return Response({'error': 'Invalid Query Paramater - status'}, status=status.HTTP_400_BAD_REQUEST)
        
        return queryset

class ReservationCreateView(CreateAPIView):
    serializer_class = ReservationSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  


        start_date = serializer.validated_data['from_date']
        end_date = serializer.validated_data['to_date']
        property = get_object_or_404(Property, id=self.kwargs['pk'])
        user_id = self.request.query_params.get("user_id")
        user = get_object_or_404(User, id=user_id)

        if start_date > end_date:
            return Response({'error': 'Start date must be before end date!'}, status=status.HTTP_403_FORBIDDEN)
        
        if start_date < date.today():
            return Response({'error': 'Start date must be in the future!'}, status=status.HTTP_403_FORBIDDEN)

        conflicts = Reservation.objects.filter(
            Q(property_id = property.id),
            Q(from_date__lte=end_date, to_date__gte=start_date),
            Q(status='AP')
        )
        if conflicts:
            return Response({'error': 'This property is unavailable during the request time period!'}, status=status.HTTP_403_FORBIDDEN)

        serializer.save(status="PE", property=property, guest=user)

        notification = Notification.objects.create(
            user = property.host,
            reservation = serializer.instance,
            content=f"{user.username} has requested to reserve the property {property.address} from {start_date} to {end_date}."
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ReservationUpdateView(UpdateAPIView):
    queryset = Reservation.objects.filter(status='PE')
    serializer_class = ReservationHostSerializer

    def put(self, request, *args, **kwargs):
        reservation = get_object_or_404(Reservation, id=self.kwargs.get('pk'))
        user_id = self.request.query_params.get("user_id")
        user = get_object_or_404(User, id=user_id)

        if user != reservation.property.host or reservation.status != 'PE':
            return Response({'error': 'You are not authorized to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

        state = request.data.get('status')
        if state not in ('AP', 'DE'):
            return Response({'error': 'Invalid status. Reservation must be approved or denied.'}, status=status.HTTP_400_BAD_REQUEST)
        
        reservation.status = state
        reservation.save()
        serializer = self.serializer_class(reservation)
        if state == 'Approved':
            notification = Notification.objects.create(
                user = reservation.guest,
                reservation = reservation,
                content=f"Your reservation request for {reservation.property.address} from {reservation.from_date} to {reservation.to_date} has been approved."
            )
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ReservationCancelView(APIView):
    serializer_class = ReservationSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        reservation = get_object_or_404(Reservation, id=self.kwargs.get('pk'))
        serializer = ReservationSerializer(reservation)
        user_id = self.request.query_params.get("user_id")
        user = get_object_or_404(User, id=user_id)

        # print('A\n')
        if reservation.guest != user:
            return Response(
                {'error': 'You do not have permission to cancel this reservation.'},
                status=status.HTTP_403_FORBIDDEN
            )

        if reservation.status not in ('Pending', 'PE', 'AP', 'Approved'):
            return Response(
                {'error': 'This reservation is not in a cancellable state.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # if reservation.status == 'Cancelled':
        #     reservation.status = 'Pending'
        #     # reservation.save()
        #     # return Response(serializer.data, status=status.HTTP_200_OK)
        
        if reservation.status == 'PE':
            reservation.status = 'CA'
            reservation.save()
            dict = serializer.data
            dict['Message'] = 'Reservation has been cancelled'
            return Response(dict, status=status.HTTP_200_OK)
        else:
            notification = Notification.objects.create(
            user = reservation.property.host,
            reservation=reservation,
            is_cancel_req=True,
            content=f"{user.username} has requested to cancel their reservation of the property {reservation.property.address}"
        )
            dict = serializer.data
            dict['Message'] = 'Request for cancellation has been sent to host'
            return Response(dict, status=status.HTTP_200_OK)

class ReservationHostCancelView(UpdateAPIView):
    serializer_class = ReservationSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        reservation = get_object_or_404(Reservation, id=self.kwargs.get('pk'))
        serializer = ReservationSerializer(reservation)
        user_id = self.request.query_params.get("user_id")
        user = get_object_or_404(User, id=user_id)

        if reservation.property.host != user:
            return Response(
                {'error': 'You do not have permission to cancel this reservation.'},
                status=status.HTTP_403_FORBIDDEN
            )

        if reservation.status != 'Approved':
            return Response(
                {'error': 'This reservation is not in a cancellable state.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if  Notification.objects.filter(reservation=reservation, is_cancel_req=True).exists():
            reservation.status = 'Cancelled'
            reservation.save()
            dict = serializer.data
            dict['Message'] = 'Reservation has been cancelled'

            notification = Notification.objects.create(
            user = reservation.guest,
            reservation=reservation,
            content=f"You request to cancel the reservation of the property {reservation.property.address} has been approved.")
            return Response(dict, status=status.HTTP_200_OK)
        else:
            reservation.status = 'Terminated'
            reservation.save()
            dict = serializer.data
            dict['Message'] = 'Reservation has been Terminated'
            return Response(dict, status=status.HTTP_200_OK)


class ReservationRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = ReservationSerializer

    def get_object(self):
        return get_object_or_404(Reservation, id=self.kwargs['id'])