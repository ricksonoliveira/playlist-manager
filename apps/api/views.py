"""
API views for Spotify Voice Manager.
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from apps.core.models import UserProfile, Playlist, Song, VoiceCommand, AIConversation
from .serializers import (
    UserProfileSerializer, PlaylistSerializer, PlaylistDetailSerializer,
    SongSerializer, VoiceCommandSerializer, AIConversationSerializer
)


class UserProfileViewSet(viewsets.ModelViewSet):
    """ViewSet for user profile management."""
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user's profile."""
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)
    
    @action(detail=False, methods=['patch'])
    def update_preferences(self, request):
        """Update user preferences."""
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        if 'ai_suggestions_enabled' in request.data:
            profile.ai_suggestions_enabled = request.data['ai_suggestions_enabled']
        if 'voice_commands_enabled' in request.data:
            profile.voice_commands_enabled = request.data['voice_commands_enabled']
        
        profile.save()
        serializer = self.get_serializer(profile)
        return Response(serializer.data)


class PlaylistViewSet(viewsets.ModelViewSet):
    """ViewSet for playlist management."""
    serializer_class = PlaylistSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user).prefetch_related('songs')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['get'])
    def songs(self, request, pk=None):
        """Get all songs in a playlist."""
        playlist = self.get_object()
        songs = playlist.songs.all()
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_song(self, request, pk=None):
        """Add a song to a playlist."""
        playlist = self.get_object()
        
        spotify_track_id = request.data.get('spotify_track_id')
        name = request.data.get('name')
        artist = request.data.get('artist')
        
        if not all([spotify_track_id, name, artist]):
            return Response(
                {'error': 'Missing required fields: spotify_track_id, name, artist'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        song, created = Song.objects.get_or_create(
            playlist=playlist,
            spotify_track_id=spotify_track_id,
            defaults={
                'name': name,
                'artist': artist,
            }
        )
        
        serializer = SongSerializer(song)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def remove_song(self, request, pk=None):
        """Remove a song from a playlist."""
        playlist = self.get_object()
        spotify_track_id = request.data.get('spotify_track_id')
        
        if not spotify_track_id:
            return Response(
                {'error': 'Missing required field: spotify_track_id'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        song = get_object_or_404(Song, playlist=playlist, spotify_track_id=spotify_track_id)
        song.delete()
        
        return Response({'message': 'Song removed successfully'}, status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=False, methods=['post'])
    def sync_from_spotify(self, request):
        """Sync playlists from Spotify account."""
        # This will be implemented when we integrate with Spotify API
        return Response({'message': 'Sync functionality coming soon'})


class VoiceCommandViewSet(viewsets.ModelViewSet):
    """ViewSet for voice command logging."""
    serializer_class = VoiceCommandSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return VoiceCommand.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent voice commands."""
        commands = self.get_queryset().order_by('-created_at')[:10]
        serializer = self.get_serializer(commands, many=True)
        return Response(serializer.data)


class AIConversationViewSet(viewsets.ModelViewSet):
    """ViewSet for AI conversations."""
    serializer_class = AIConversationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return AIConversation.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

