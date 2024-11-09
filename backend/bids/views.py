from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from bids.models import Bid, BidStep, ScoreLevel
from bids.serializers import BidStepSerializer, BidSerializer
from products.models import Product
from django.utils import timezone


class BidsAPI(ModelViewSet):
    serializer_class = BidSerializer
    queryset = Bid.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    permission_classes = [IsAuthenticated]
    filterset_fields = ['status', 'user', 'product', 'manual_update']
    search_fields = ['user__phone', 'product__name', 'status']
    ordering_fields = ['created_at', 'amount', 'status']

    def get_step_size(self, current_price):
        return BidStep.objects.filter(start_price__lte=current_price, end_price__gte=current_price).first().step_size

    def accept_bid(self, instance, product, amount):
        product.current_price = amount
        product.save()
        instance.status = 'accepted'
        instance.save()
        # notification logic to wiinner and latest bidders

    def reject_bid(self, instance, message):
        instance.status = 'rejected'
        instance.delete()
        # notification logic to wiinner and latest bidders
        raise ValidationError(message)

    def validate_auction_time(self, product, current_time):
        if product.auction_start_date > current_time:
            raise ValidationError("The auction hasn't started yet.")
        if product.auction_end_date < current_time:
            raise ValidationError("The auction has ended.")

    def handle_bid_for_level1(self, user, instance, product, current_price):
        bid_history = Bid.objects.filter(user=user, status='accepted').exists()
        if not bid_history:
            self.process_bid(user, instance, product, current_price)
        else:
            self.reject_bid(instance, "شما در سطح 1 می باشید و فقط می توانید 1 پیشنهاد ثبت کنید")

    def handle_bid_for_level2(self, user, instance, product, current_price):
        pending_bids_count = Bid.objects.filter(user=user, status='accepted').count()
        if pending_bids_count < 1:
            self.process_bid(user, instance, product, current_price)
        else:
            self.reject_bid(instance, "شما در سطح 2 می باشید و فقط می توانید 1 پیشنهاد ثبت کنید")

    def handle_bid_for_level3(self, user, instance, product, current_price):
        pending_bids_count = Bid.objects.filter(user=user, status='accepted').count()
        if pending_bids_count < 2:
            self.process_bid(user, instance, product, current_price)
        else:
            self.reject_bid(instance, "شما در سطح 3 می باشید و فقط می توانید 2 پیشنهاد ثبت کنید")

    def handle_bid_for_level4(self, user, instance, product, current_price):
        pending_bids_count = Bid.objects.filter(user=user, status='accepted').count()
        if pending_bids_count < 3:
            self.process_bid(user, instance, product, current_price)
        else:
            self.reject_bid(instance, "شما در سطح 4 می باشید و فقط می توانید 3 پیشنهاد ثبت کنید")

    def handle_bid_for_level5(self, user, instance, product, current_price):
        pending_bids_count = Bid.objects.filter(user=user, status='accepted').count()
        if pending_bids_count < 4:
            self.process_bid(user, instance, product, current_price)
        else:
            self.reject_bid(instance, "شما در سطح 5 می باشید و فقط می توانید 4 پیشنهاد ثبت کنید")

    def handle_bid_for_level6(self, user, instance, product, current_price):
        pending_bids_count = Bid.objects.filter(user=user, status='accepted').count()
        if pending_bids_count < 5:
            self.process_bid(user, instance, product, current_price)
        else:
            self.reject_bid(instance, "شما در سطح 6 می باشید و فقط می توانید 5 پیشنهاد ثبت کنید")

    def handle_bid_for_level7(self, user, instance, product, current_price):
        pending_bids_count = Bid.objects.filter(user=user, status='accepted').count()
        if pending_bids_count < 6:
            self.process_bid(user, instance, product, current_price)
        else:
            self.reject_bid(instance, "شما در سطح 7 می باشید و فقط می توانید 6 پیشنهاد ثبت کنید")

    def handle_bid_for_level8(self, user, instance, product, current_price):
        pending_bids_count = Bid.objects.filter(user=user, status='accepted').count()
        if pending_bids_count < 7:
            self.process_bid(user, instance, product, current_price)
        else:
            self.reject_bid(instance, "شما در سطح 8 می باشید و فقط می توانید 7 پیشنهاد ثبت کنید")

    def handle_bid_for_level9(self, user, instance, product, current_price):
        pending_bids_count = Bid.objects.filter(user=user, status='accepted').count()
        if pending_bids_count < 8:
            self.process_bid(user, instance, product, current_price)
        else:
            self.reject_bid(instance, "You can only register 8 bids, you have already placed 8 bids.")

    def handle_bid_for_level10(self, user, instance, product, current_price):
        self.process_bid(user, instance, product, current_price)

    def process_bid(self, user, instance, product, current_price):
        if current_price == product.current_price:
            step_size = self.get_step_size(current_price)
            amount = instance.amount
            dif_amount = amount - current_price

            # Check if dif_amount is a multiple of step_size
            if dif_amount % step_size == 0:
                self.accept_bid(instance, product, amount)
            else:
                self.reject_bid(instance, "The bid amount is not a valid multiple of the step size.")
        else:
            self.reject_bid(instance, "Current price not valid, it was changed!")

    def perform_create(self, serializer):
        user = self.request.user
        instance = serializer.save(user=user, status="pending")
        product = Product.objects.get(id=instance.product.id)
        current_time = timezone.now()
        current_price = instance.product.current_price
        score_levels = ScoreLevel.objects.filter(level__in=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        level1 = score_levels.get(level=1)
        level2 = score_levels.get(level=2)
        level3 = score_levels.get(level=3)
        level4 = score_levels.get(level=4)
        level5 = score_levels.get(level=5)
        level6 = score_levels.get(level=6)
        level7 = score_levels.get(level=7)
        level8 = score_levels.get(level=8)
        level9 = score_levels.get(level=9)
        level10 = score_levels.get(level=10)

        self.validate_auction_time(product, current_time)

        if user.score <= level1.score:
            if instance.amount <= level1.max_amount_bid:
                self.handle_bid_for_level1(user, instance, product, current_price)
            else:
                self.reject_bid(
                    instance,
                    f"You in level 1 and you can not set bid higher than {level1.max_amount_bid}"
                )

        elif level1.score < user.score <= level2.score:
            if instance.amount <= level2.max_amount_bid:
                self.handle_bid_for_level2(user, instance, product, current_price)
            else:
                self.reject_bid(
                    instance,
                    f"You in level 2 and you can not set bid higher than {level2.max_amount_bid}"
                )
        elif level2.score < user.score <= level3.score:
            if instance.amount <= level3.max_amount_bid:
                self.handle_bid_for_level3(user, instance, product, current_price)
            else:
                self.reject_bid(
                    instance,
                    f"You in level 3 and you can not set bid higher than {level3.max_amount_bid}"
                )
        elif level3.score < user.score <= level4.score:
            if instance.amount <= level4.max_amount_bid:
                self.handle_bid_for_level4(user, instance, product, current_price)
            else:
                self.reject_bid(
                    instance,
                    f"You in level 4 and you can not set bid higher than {level4.max_amount_bid}"
                )
        elif level4.score < user.score <= level5.score:
            if instance.amount <= level5.max_amount_bid:
                self.handle_bid_for_level5(user, instance, product, current_price)
            else:
                self.reject_bid(
                    instance,
                    f"You in level 5 and you can not set bid higher than {level5.max_amount_bid}"
                )
        elif level5.score < user.score <= level6.score:
            if instance.amount <= level6.max_amount_bid:
                self.handle_bid_for_level6(user, instance, product, current_price)
            else:
                self.reject_bid(
                    instance,
                    f"You in level 6 and you can not set bid higher than {level6.max_amount_bid}"
                )
        elif level6.score < user.score <= level7.score:
            if instance.amount <= level7.max_amount_bid:
                self.handle_bid_for_level7(user, instance, product, current_price)
            else:
                self.reject_bid(
                    instance,
                    f"You in level 7 and you can not set bid higher than {level7.max_amount_bid}"
                )
        elif level7.score < user.score <= level8.score:
            if instance.amount <= level8.max_amount_bid:
                self.handle_bid_for_level8(user, instance, product, current_price)
            else:
                self.reject_bid(
                    instance,
                    f"You in level 8 and you can not set bid higher than {level8.max_amount_bid}"
                )
        elif level8.score < user.score <= level9.score:
            if instance.amount <= level9.max_amount_bid:
                self.handle_bid_for_level9(user, instance, product, current_price)
            else:
                self.reject_bid(
                    instance,
                    f"You in level 9 and you can not set bid higher than {level9.max_amount_bid}"
                )
        elif level9.score < user.score <= level10.score:
            self.handle_bid_for_level10(user, instance, product, current_price)

        else:
            self.reject_bid(
                instance,
                f"User score is not true"
            )

    def retrieve(self, request, *args, **kwargs):
        return Response({"detail": "Method 'GET' not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def update(self, request, *args, **kwargs):
        return Response({"detail": "Method 'PUT/PATCH' not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        return Response({"detail": "Method 'DELETE' not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class BidStepsAPI(ReadOnlyModelViewSet):
    serializer_class = BidStepSerializer
    queryset = BidStep.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['start_price', 'end_price']
    search_fields = ['start_price', 'end_price']
    ordering_fields = ['step_size', 'start_price', 'end_price']
