"""
Serializers for API endpoints.
"""

from rest_framework import serializers
from apps.core.models import UserProfile, Playlist, Song, VoiceCommand, AIConversation
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id',)


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'spotify_user_id', 'ai_suggestions_enabled', 
                  'voice_commands_enabled', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at', 'spotify_user_id')


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ('id', 'spotify_track_id', 'name', 'artist', 'album', 'image_url',
                  'duration_ms', 'popularity', 'energy', 'danceability', 'valence',
                  'tempo', 'added_at')
        read_only_fields = ('id', 'added_at')


class PlaylistSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)
    song_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Playlist
        fields = ('id', 'spotify_playlist_id', 'name', 'description', 'image_url',
                  'is_public', 'total_tracks', 'song_count', 'songs', 'created_at',
                  'updated_at', 'synced_at')
        read_only_fields = ('id', 'spotify_playlist_id', 'created_at', 'updated_at', 'synced_at')
    
    def get_song_count(self, obj):
        return obj.songs.count()


class PlaylistDetailSerializer(serializers.ModelSerializer):
    """Detailed playlist serializer without nested songs."""
    class Meta:
        model = Playlist
        fields = ('id', 'spotify_playlist_id', 'name', 'description', 'image_url',
                  'is_public', 'total_tracks', 'created_at', 'updated_at', 'synced_at')
        read_only_fields = ('id', 'spotify_playlist_id', 'created_at', 'updated_at', 'synced_at')


class VoiceCommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceCommand
        fields = ('id', 'raw_command', 'parsed_action', 'success', 'error_message', 'created_at')
        read_only_fields = ('id', 'created_at')


class AIConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIConversation
        fields = ('id', 'user_message', 'ai_response', 'created_at')
        read_only_fields = ('id', 'created_at')

