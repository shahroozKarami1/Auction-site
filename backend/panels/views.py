from accounts.models import User
from accounts.serializers import UserSerializer
from bids.models import Bid, BidStep, ScoreLevel
from bids.serializers import BidSerializer, BidStepSerializer, ScoreLevelSerializer
from notifications.models import Notification
from notifications.serializers import NotificationSerializer
from payments.models import Payment
from payments.serializers import PaymentSerializer
from products.models import Product
from products.serializers import ProductSerializer
from ratings.models import Report, Rating
from ratings.serializers import RatingSerializer, ReportSerializer
from tickets.models import Ticket
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from tickets.serializers import TicketSerializer


class UsersPanelAPI(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'user_type', 'gender', 'is_active', 'is_admin']
    search_fields = ['phone', 'email', 'first_name', 'last_name', 'full_name']
    ordering_fields = ['score', 'age', 'status', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        return super().get_queryset()


class ProductsPanelAPI(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['seller', 'category', 'status']
    search_fields = ['name', 'description', 'category__name']
    ordering_fields = ['current_price', 'auction_start_date', 'auction_end_date', 'name']


class BidsPanelAPI(ModelViewSet):
    serializer_class = BidSerializer
    queryset = Bid.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'product', 'user']
    search_fields = ['user__phone', 'product__name', 'amount']
    ordering_fields = ['created_at', 'amount', 'status']
    ordering = ['-created_at']


class BidStepsPanelAPI(ModelViewSet):
    serializer_class = BidStepSerializer
    queryset = BidStep.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['start_price', 'end_price']
    search_fields = ['step_size']
    ordering_fields = ['start_price', 'end_price', 'step_size']
    ordering = ['start_price']


class ScoreLevelViewSet(ModelViewSet):
    serializer_class = ScoreLevelSerializer
    queryset = ScoreLevel.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['level', 'score', 'max_amount_bid']
    search_fields = ['level', 'score']
    ordering_fields = ['level', 'score', 'max_amount_bid']
    ordering = ['level']


class NotificationsPanelAPI(ModelViewSet):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['user', 'is_read', 'created_at']
    search_fields = ['title', 'message', 'user__phone']
    ordering_fields = ['is_read', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        return super().get_queryset()


class PaymentViewSet(ModelViewSet):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['user', 'status', 'created_at']
    search_fields = ['user__phone', 'authority', 'ref_id']
    ordering_fields = ['amount', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        if self.request.user.is_admin:
            return super().get_queryset()
        return Payment.objects.filter(user=self.request.user)


class TicketsPanelAPI(ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['user', 'priority', 'status', 'department', 'created_at']
    search_fields = ['user__phone', 'subject', 'message']
    ordering_fields = ['created_at', 'priority', 'status']
    ordering = ['-created_at']


class RatingPanelAPI(ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()
    permission_classes = [IsAuthenticated,IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['user', 'product', 'rating']
    search_fields = ['user__phone', 'product__name', 'review']
    ordering_fields = ['created_at', 'rating']
    ordering = ['-created_at']


class ReportPanelAPI(ModelViewSet):
    serializer_class = ReportSerializer
    queryset = Report.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['reported_by', 'product', 'status']
    search_fields = ['reported_by__phone', 'product__name', 'reason']
    ordering_fields = ['created_at', 'status']
    ordering = ['-created_at']


