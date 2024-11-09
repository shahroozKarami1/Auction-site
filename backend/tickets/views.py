from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from core.permissions import IsOwnerOrAdminOrReadOnly, IsOwner
from .models import Ticket, TicketAttachment, TicketLog
from .serializers import TicketSerializer, TicketDetailSerializer, TicketAttachmentSerializer, TicketLogSerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_serializer_class(self):
        if self.action in ['retrieve', 'update']:
            return TicketDetailSerializer
        return TicketSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TicketAttachmentViewSet(viewsets.ModelViewSet):
    queryset = TicketAttachment.objects.all()
    serializer_class = TicketAttachmentSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        serializer.save()


class TicketLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TicketLog.objects.all()
    serializer_class = TicketLogSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdminOrReadOnly]
