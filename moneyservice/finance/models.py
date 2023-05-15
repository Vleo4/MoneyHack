from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .custom_user_manager import *
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


class FinanceUser(AbstractBaseUser, PermissionsMixin):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    email = models.EmailField(_("email address"), unique=True, max_length=150)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    objects = ServiceUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        app_label = 'finance'
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def __str__(self):
        return self.username

class Credit(models.Model):
    note = models.CharField(max_length=250, blank=True, null=True)
    TYPE_CHOICES = (
        ('M', 'Monthly Payments'),
        ('A', 'Annual Payments'),
    )

    percentage = models.DecimalField(
        max_digits=5,
        decimal_places=3,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    value = models.DecimalField(max_digits=20, decimal_places=2)
    type_of_credit = models.CharField(max_length=1, choices=TYPE_CHOICES)
    from_where = models.CharField(max_length=255)
    user = models.ForeignKey(FinanceUser, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.percentage}% credit from {self.from_where}'

    def max_value(self):
        period = (self.end_time.year - self.start_time.year)
        return self.value * (1 + self.percentage * period)