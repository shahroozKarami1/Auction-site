from django.contrib import admin
from .models import Bid, BidStep, ScoreLevel


@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'amount', 'status', 'manual_update', 'created_at', 'is_winner', 'is_highest')
    list_filter = ('status', 'manual_update', 'created_at')
    search_fields = ('user__phone', 'product__name', 'amount')
    readonly_fields = ('is_winner', 'is_highest')
    list_editable = ('status', 'manual_update')
    ordering = ('-created_at',)
    fieldsets = (
        (None, {
            'fields': ('user', 'product', 'amount', 'status', 'manual_update')
        }),
        ('Bid Status', {
            'fields': ('is_winner', 'is_highest')
        }),
    )

    def is_winner(self, obj):
        return obj.is_winner

    def is_highest(self, obj):
        return obj.is_highest

    is_winner.boolean = True
    is_highest.boolean = True


@admin.register(BidStep)
class BidStepAdmin(admin.ModelAdmin):
    list_display = ('step_size', 'start_price', 'end_price', 'created_at')
    list_filter = ('start_price', 'end_price', 'created_at')
    search_fields = ('step_size',)
    ordering = ('start_price',)


@admin.register(ScoreLevel)
class ScoreLevelAdmin(admin.ModelAdmin):
    list_display = ('level', 'score', 'max_amount_bid')
    list_filter = ('level',)
    search_fields = ('level', 'score')
    ordering = ('level',)
