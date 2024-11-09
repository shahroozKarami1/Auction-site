from django.db import models
from django.utils.text import slugify

from bids.models import ScoreLevel, BidStep
from core.models import BaseModel


class ProductCategory(BaseModel):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True, null=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories')
    is_main = models.BooleanField(default=False)

    def __str__(self):
        if self.is_main:
            return f"{self.name} **main**"
        return f"{self.name}"


class Product(BaseModel):
    seller = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    country = models.CharField(max_length=250, null=True, blank=True)
    province = models.CharField(max_length=250, null=True, blank=True)
    city = models.CharField(max_length=250, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    postal_code = models.CharField(max_length=250, blank=True, null=True)

    slug = models.CharField(max_length=250, blank=True, unique=True)

    current_price = models.FloatField(blank=True, null=True)
    start_price = models.FloatField(blank=True, null=True, default=0)
    end_price = models.FloatField(blank=True, null=True)
    max_price = models.FloatField(blank=True, null=True)

    status_choices = (
        ("not_started", "not_started"),
        ("on_going", "on_going"),
        ("closed", "closed"),
    )
    status = models.CharField(
        choices=status_choices, default="not_started", max_length=50
    )

    auction_start_date = models.DateTimeField()
    auction_end_date = models.DateTimeField()

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.current_price is None:
            self.current_price = self.start_price

        if not self.slug:
            self.slug = slugify(str(self.name) + "-" + str(self.id))
        super().save(*args, **kwargs)

    def sold_out(self):
        if self.end_price:
            return self.end_price is not None and self.end_price > 0.0
        return False

    def bids_count(self):
        return self.bids.filter(status="accepted").count()

    def for_level(self):
        score_levels = ScoreLevel.objects.order_by('level')
        for level in score_levels:
            if level.max_amount_bid >= self.current_price:
                return level.score
        return None

    def current_step(self):
        return BidStep.objects.get(start_price__lte=self.current_price, end_price__gte=self.current_price).step_size


class ProductAttribute(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='attributes')
    name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}: {self.value} for {self.product.name}"


class ProductImage(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    is_main = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.product.name}"


class UserAuctionReqeust(BaseModel):
    user = models.ForeignKey(
        to='accounts.User', related_name="user_auction_request", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        to=Product,
        related_name="auction_request",
        on_delete=models.CASCADE,
    )
    status_choices = (
        ("pending", "pending"),
        ("accepted", "accepted"),
        ("rejected", "rejected"),
    )
    status = models.CharField(choices=status_choices, default="pending", max_length=10)

    def __str__(self):
        return f"{self.user.phone} - {self.auction.name}"


class WallBanners(BaseModel):
    banner = models.ImageField(upload_to='banners')
    title = models.CharField(max_length=250)
    description = models.CharField(max_length=250)
    first_url_title = models.CharField(max_length=50,blank=True, null=True)
    first_url = models.URLField(blank=True, null=True)
    second_url_title = models.CharField(max_length=50,blank=True, null=True)
    second_url = models.URLField(blank=True, null=True)
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, blank=True, null=True)
    is_main = models.BooleanField(default=False)
    background_is_light = models.BooleanField(default=True)


