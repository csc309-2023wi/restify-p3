from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Property(models.Model):
    host = models.ForeignKey(
        User, related_name="properties", null=False, on_delete=models.CASCADE
    )
    address = models.CharField(max_length=255, null=False)
    description = models.TextField(null=True)
    guest_capacity = models.PositiveIntegerField(null=False, default=0)
    availability = models.JSONField(null=False, default=[])  # list of objects
    amenities = models.JSONField(null=False, default=[])  # list of strings
    images = models.JSONField(null=False, default=[])  # list of strings (image hashes)


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
    duration = models.JSONField(null=False, default={})  # duration/availability object
