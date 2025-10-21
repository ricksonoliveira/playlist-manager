"""
URL configuration for API endpoints.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserProfileViewSet, PlaylistViewSet, VoiceCommandViewSet,
    AIConversationViewSet
)

router = DefaultRouter()
router.register(r'profile', UserProfileViewSet, basename='profile')
router.register(r'playlists', PlaylistViewSet, basename='playlist')
router.register(r'voice-commands', VoiceCommandViewSet, basename='voice-command')
router.register(r'conversations', AIConversationViewSet, basename='conversation')

urlpatterns = [
    path('', include(router.urls)),
]

