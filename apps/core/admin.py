"""
Django admin configuration for core app.
"""

from django.contrib import admin
from .models import UserProfile, Playlist, Song, VoiceCommand, AIConversation


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'spotify_user_id', 'ai_suggestions_enabled', 'created_at')
    list_filter = ('ai_suggestions_enabled', 'voice_commands_enabled', 'created_at')
    search_fields = ('user__username', 'spotify_user_id')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'total_tracks', 'is_public', 'created_at')
    list_filter = ('is_public', 'created_at', 'user')
    search_fields = ('name', 'user__username')
    readonly_fields = ('created_at', 'updated_at', 'synced_at')


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ('name', 'artist', 'playlist', 'popularity', 'added_at')
    list_filter = ('playlist', 'added_at', 'popularity')
    search_fields = ('name', 'artist', 'album')
    readonly_fields = ('added_at',)


@admin.register(VoiceCommand)
class VoiceCommandAdmin(admin.ModelAdmin):
    list_display = ('user', 'parsed_action', 'success', 'created_at')
    list_filter = ('parsed_action', 'success', 'created_at')
    search_fields = ('user__username', 'raw_command')
    readonly_fields = ('created_at',)


@admin.register(AIConversation)
class AIConversationAdmin(admin.ModelAdmin):
    list_display = ('user', 'playlist', 'created_at')
    list_filter = ('created_at', 'user')
    search_fields = ('user__username', 'user_message')
    readonly_fields = ('created_at',)

