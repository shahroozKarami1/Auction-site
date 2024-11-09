from django.contrib import admin
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from accounts.models import User
from django.contrib.auth.models import Group


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(label="Password confirmation", widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ["phone", "first_name", "last_name", "age", "gender", "status"]

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ["phone", "first_name", "last_name", "age", "gender", "status", "password", "is_active", "is_admin"]


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ["id", "phone", "email", "first_name", "last_name", "age", "gender", "status", "is_admin", "is_active"]
    list_filter = ["is_admin", "gender", "status"]
    fieldsets = [
        (None, {"fields": ["phone", "password"]}),
        (
            "Personal info",
            {"fields": ["first_name", "last_name", "email", "age","score", "gender", "status"]},
        ),
        ("Permissions", {"fields": ["is_admin", "is_active", 'is_manager']}),
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["phone", "first_name", "last_name", "age", "gender", "status", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["phone", "email"]
    ordering = ["-created_at"]
    filter_horizontal = []
    list_per_page = 20


admin.site.register(User, UserAdmin)
# admin.site.unregister(Group)
