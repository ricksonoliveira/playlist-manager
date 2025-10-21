"""
URL configuration for authentication endpoints.
"""

from django.urls import path
from .views import (
    register, login_view, logout_view, current_user, spotify_callback
)

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('me/', current_user, name='current_user'),
    path('spotify/callback/', spotify_callback, name='spotify_callback'),
]

