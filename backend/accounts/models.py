import random
import string

from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from accounts.managers import CustomUserManager
from core.models import BaseModel


def generate_unique_id():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=10))


class User(AbstractBaseUser, BaseModel):
    id = models.CharField(primary_key=True, max_length=10, default=generate_unique_id, editable=False, unique=True)
    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    first_name = models.CharField(max_length=250, blank=True, null=True)
    last_name = models.CharField(max_length=250, blank=True, null=True)
    user_type_choices = (("real", "real"), ("legal", "legal"))
    user_type = models.CharField(
        choices=user_type_choices, default="real", max_length=250
    )

    avatar = models.ImageField(upload_to='users/avatar/', blank=True, null=True)
    national_id_image = models.ImageField(
        upload_to="users/national_id/",
        blank=True,
        null=True,
    )

    country = models.CharField(max_length=250, null=True, blank=True)
    province = models.CharField(max_length=250, null=True, blank=True)
    city = models.CharField(max_length=250, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    postal_code = models.CharField(max_length=250, blank=True, null=True)

    age = models.PositiveSmallIntegerField(blank=True, null=True)
    gender_choices = (
        ('male', 'male'),
        ('female', 'female'),
        ('non_binary', 'non_binary'),
    )
    gender = models.CharField(choices=gender_choices, max_length=15, blank=True, null=True)

    status_choices = (
        ('not_verified', 'not_verified'),
        ('verified', 'verified'),
        ('banned', 'banned'),
    )
    status = models.CharField(choices=status_choices, max_length=15, default='not_verified')
    score = models.PositiveIntegerField(default=0)

    is_admin = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "phone"
    REQUIRED_FIELDS = []

    def __str__(self):
        if self.first_name:
            f_name = self.first_name
        else:
            f_name = "بدون نام"

        if self.first_name:
            l_name = self.last_name
        else:
            l_name = ""

        return f"{self.phone} - {f_name} {l_name}"

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

    def full_name(self):
        return f"{self.first_name} {self.last_name}"
