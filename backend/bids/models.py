from django.db import models
from rest_framework.exceptions import ValidationError

from core.models import BaseModel


class Bid(BaseModel):
    user = models.ForeignKey(to='accounts.User', on_delete=models.CASCADE, related_name="user_bids")
    product = models.ForeignKey(
        to="products.Product",
        related_name="bids",
        on_delete=models.DO_NOTHING,

    )
    amount = models.FloatField(blank=True, null=True)
    status_choices = (
        ("rejected", "rejected"),
        ("pending", "pending"),
        ("accepted", "accepted"),
        ("winner", "winner"),

    )
    status = models.CharField(
        choices=status_choices, blank=True, null=True, max_length=10,
    )
    manual_update = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return f"{self.user.phone} - {self.product} - {self.amount}"

    @property
    def is_winner(self):
        product = self.product


        latest_bid = (
            Bid.objects.filter(product=product, status="accepted")
            .order_by("-created_at")
            .first()
        )

        if self == latest_bid:

            return True
        else:
            return False

    @property
    def is_highest(self):
        product = self.product
        latest_bid = (
            Bid.objects.filter(product=product, status="accepted")
            .order_by("-created_at")
            .first()
        )

        if self == latest_bid:
            return True
        else:
            return False

    def clean(self):
        if self.amount <= self.product.current_price:
            raise ValidationError('Bid amount must be higher than the current price')


class BidStep(BaseModel):
    step_size = models.FloatField()
    start_price = models.FloatField()
    end_price = models.FloatField()

    def __str__(self):
        return f"{self.step_size} - {self.start_price} - {self.end_price}"


class ScoreLevel(BaseModel):
    level = models.PositiveSmallIntegerField()
    score = models.PositiveIntegerField()
    max_amount_bid = models.FloatField()

    def __str__(self):
        return f"Level : {self.level} - score : {self.score}"
