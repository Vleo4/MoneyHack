from django.contrib import admin

from .models import *

# Register your models here.

admin.site.register(FinanceUser)
admin.site.register(Credit)
admin.site.register(Loss)
admin.site.register(Profit)
admin.site.register(Deposit)
