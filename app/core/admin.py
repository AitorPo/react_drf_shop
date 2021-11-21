from django.contrib import admin
from . import models

class OrderAdmin(admin.ModelAdmin):
    list_display = ('_id', 'createdAt', 'isPaid', 'paidAt', 'isDelivered', 'deliveredAt')

admin.site.register(models.Order, OrderAdmin)
admin.site.register(models.OrderItem)
admin.site.register(models.Review)
admin.site.register(models.ShippingAddress)
admin.site.register(models.Product)
