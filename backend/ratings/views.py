from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsOwnerOrAdminOrReadOnly
from .models import Rating, Report
from .serializers import RatingSerializer, ReportSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(reported_by=self.request.user)

    def get_queryset(self):
        return super().get_queryset().filter(reported_by=self.request.user)
