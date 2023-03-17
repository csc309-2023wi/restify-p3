from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType
from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractUser):
    email = models.EmailField(null=False)
    first_name = models.CharField(max_length=150, null=False)
    last_name = models.CharField(max_length=150, null=False)
    phone_number = models.IntegerField(null=True)
    avatar = models.TextField(null=True)


class Property(models.Model):
    host = models.ForeignKey(
        User, related_name="properties", null=False, on_delete=models.CASCADE
    )
    address = models.CharField(max_length=255, null=False)
    description = models.TextField(null=True)
    guest_capacity = models.PositiveIntegerField(null=False, default=0)
    availability = models.JSONField(null=False, default=list)  # list of objects
    amenities = models.JSONField(null=False, default=list)  # list of strings
    images = models.JSONField(null=False, default=list)  # list of strings (image hashes)


class Reservation(models.Model):
    guest = models.ForeignKey(
        User, related_name="reservations_outgoing", null=True, on_delete=models.SET_NULL
    )
    host = models.ForeignKey(
        User, related_name="reservations_incoming", null=True, on_delete=models.SET_NULL
    )
    property = models.ForeignKey(
        Property, related_name="reservations", null=True, on_delete=models.SET_NULL
    )
    status = models.CharField(max_length=10, null=False, default="reservation_pending")
    guest_count = models.PositiveIntegerField(null=False, default=1)
    duration = models.JSONField(null=False, default=dict)  # duration/availability object
