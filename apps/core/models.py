"""
Core models for Spotify Voice Manager SaaS.
"""

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class UserProfile(models.Model):
    """Extended user profile with Spotify integration."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    spotify_user_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    spotify_access_token = models.TextField(null=True, blank=True)
    spotify_refresh_token = models.TextField(null=True, blank=True)
    spotify_token_expires_at = models.DateTimeField(null=True, blank=True)
    
    # User preferences
    ai_suggestions_enabled = models.BooleanField(default=True)
    voice_commands_enabled = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"
    
    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"


class Playlist(models.Model):
    """User's Spotify playlist."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='playlists')
    spotify_playlist_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    
    # Metadata
    is_public = models.BooleanField(default=False)
    total_tracks = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    synced_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.name} - {self.user.username}"
    
    class Meta:
        verbose_name = "Playlist"
        verbose_name_plural = "Playlists"
        unique_together = ('user', 'spotify_playlist_id')


class Song(models.Model):
    """Song in a playlist."""
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name='songs')
    spotify_track_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    album = models.CharField(max_length=255, blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    
    # Audio features
    duration_ms = models.IntegerField(default=0)
    popularity = models.IntegerField(default=0)
    
    # Features for AI recommendations
    energy = models.FloatField(null=True, blank=True)
    danceability = models.FloatField(null=True, blank=True)
    valence = models.FloatField(null=True, blank=True)
    tempo = models.FloatField(null=True, blank=True)
    
    added_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.artist}"
    
    class Meta:
        verbose_name = "Song"
        verbose_name_plural = "Songs"
        unique_together = ('playlist', 'spotify_track_id')


class VoiceCommand(models.Model):
    """Log of voice commands for analytics and debugging."""
    ACTION_CHOICES = [
        ('create_playlist', 'Create Playlist'),
        ('add_track', 'Add Track'),
        ('remove_track', 'Remove Track'),
        ('delete_playlist', 'Delete Playlist'),
        ('get_suggestions', 'Get Suggestions'),
        ('unknown', 'Unknown'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='voice_commands')
    raw_command = models.TextField()
    parsed_action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    success = models.BooleanField(default=False)
    error_message = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.parsed_action}"
    
    class Meta:
        verbose_name = "Voice Command"
        verbose_name_plural = "Voice Commands"


class AIConversation(models.Model):
    """Store AI conversations for context and learning."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ai_conversations')
    playlist = models.ForeignKey(Playlist, on_delete=models.SET_NULL, null=True, blank=True, related_name='ai_conversations')
    
    user_message = models.TextField()
    ai_response = models.TextField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.created_at}"
    
    class Meta:
        verbose_name = "AI Conversation"
        verbose_name_plural = "AI Conversations"

