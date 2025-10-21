# Spotify Voice Manager - Django Setup Guide

This document explains the new Django-based architecture and how to set up the project.

## Project Structure

```
playlist-manager/
├── config/                 # Django project configuration
│   ├── settings.py        # Django settings
│   ├── urls.py            # Main URL routing
│   ├── wsgi.py            # WSGI application
│   └── asgi.py            # ASGI application
├── apps/                  # Django applications
│   ├── core/              # Core models and admin
│   │   ├── models.py      # Database models
│   │   ├── admin.py       # Django admin configuration
│   │   └── apps.py
│   ├── api/               # REST API endpoints
│   │   ├── views.py       # API views
│   │   ├── serializers.py # DRF serializers
│   │   ├── urls.py        # API URL routing
│   │   └── apps.py
│   └── auth_app/          # Authentication endpoints
│       ├── views.py       # Auth views
│       ├── urls.py        # Auth URL routing
│       └── apps.py
├── templates/             # HTML templates (for future use)
├── static/                # Static files (CSS, JS, images)
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
├── .env.example           # Environment variables template
└── README.md              # Project documentation
```

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd playlist-manager
```

### 2. Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
```bash
cp .env.example .env
# Edit .env and fill in your credentials:
# - SPOTIFY_CLIENT_ID
# - SPOTIFY_CLIENT_SECRET
# - SPOTIFY_REDIRECT_URI
# - OPENAI_API_KEY
# - SECRET_KEY (generate a new one for production)
```

### 5. Run Migrations
```bash
python manage.py migrate
```

### 6. Create Superuser (Admin)
```bash
python manage.py createsuperuser
```

### 7. Run Development Server
```bash
python manage.py runserver
```

The application will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user
- `GET /api/auth/me/` - Get current user info

### Playlists
- `GET /api/playlists/` - List user's playlists
- `POST /api/playlists/` - Create new playlist
- `GET /api/playlists/{id}/` - Get playlist details
- `GET /api/playlists/{id}/songs/` - Get songs in playlist
- `POST /api/playlists/{id}/add-song/` - Add song to playlist
- `POST /api/playlists/{id}/remove-song/` - Remove song from playlist
- `DELETE /api/playlists/{id}/` - Delete playlist

### Voice Commands
- `GET /api/voice-commands/` - List user's voice commands
- `POST /api/voice-commands/` - Log a voice command
- `GET /api/voice-commands/recent/` - Get recent commands

### AI Conversations
- `GET /api/conversations/` - List conversations
- `POST /api/conversations/` - Create new conversation

## Database Models

### UserProfile
Extended user profile with Spotify integration
- `spotify_user_id` - Spotify user ID
- `spotify_access_token` - OAuth access token
- `spotify_refresh_token` - OAuth refresh token
- `ai_suggestions_enabled` - Enable/disable AI suggestions
- `voice_commands_enabled` - Enable/disable voice commands

### Playlist
User's Spotify playlist
- `spotify_playlist_id` - Spotify playlist ID
- `name` - Playlist name
- `description` - Playlist description
- `is_public` - Public/private status
- `total_tracks` - Number of tracks

### Song
Song in a playlist
- `spotify_track_id` - Spotify track ID
- `name` - Song name
- `artist` - Artist name
- `album` - Album name
- Audio features (energy, danceability, valence, tempo)

### VoiceCommand
Log of voice commands for analytics
- `raw_command` - Original voice input
- `parsed_action` - Parsed action type
- `success` - Whether command succeeded
- `error_message` - Error details if failed

### AIConversation
Store AI conversations for context
- `user_message` - User's message
- `ai_response` - AI's response
- `playlist` - Associated playlist (optional)

## Django Admin

Access the admin panel at `http://localhost:8000/admin/`

You can manage:
- Users and profiles
- Playlists and songs
- Voice commands
- AI conversations

## Development Workflow

### Making Database Changes

1. Create/modify models in `apps/core/models.py`
2. Create migrations: `python manage.py makemigrations`
3. Apply migrations: `python manage.py migrate`

### Adding New API Endpoints

1. Create views in `apps/api/views.py`
2. Create serializers in `apps/api/serializers.py`
3. Register routes in `apps/api/urls.py`

### Running Tests

```bash
python manage.py test
```

## Next Steps

1. **Frontend Development** - Build React/Vue frontend
2. **Spotify OAuth Integration** - Implement OAuth login
3. **AI Command Parser** - Integrate OpenAI for natural language
4. **WebSocket Support** - Real-time AI suggestions
5. **PWA Setup** - Progressive Web App configuration

## Troubleshooting

### Port Already in Use
```bash
python manage.py runserver 8001
```

### Database Issues
```bash
python manage.py migrate --run-syncdb
```

### Clear Cache
```bash
python manage.py clear_cache
```

## Production Deployment

Before deploying to production:

1. Set `DEBUG=False` in `.env`
2. Generate a new `SECRET_KEY`
3. Set `ALLOWED_HOSTS` to your domain
4. Use PostgreSQL instead of SQLite
5. Configure CORS properly
6. Set up HTTPS
7. Use environment-specific settings

## Support

For issues or questions, please open an issue on GitHub.

