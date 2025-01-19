# Spotify Voice Command Playlist Manager

A Python application that allows you to manage your Spotify playlists using voice commands. Create playlists, add/remove songs, and delete playlists - all with your voice!

## Prerequisites

- Python 3.8+
- Spotify Developer Account
- OpenAI API Key
- Microphone

## Setup Instructions

1. Clone this repository
```bash
git clone <your-repo-url>
cd spotify-voice-manager
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Set up Spotify Developer Account:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Get your Client ID and Client Secret
   - Add `http://localhost:8888/callback` to your Redirect URIs in the app settings

4. Set up OpenAI API:
   - Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
   - Create a new API key

5. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your credentials:
     - SPOTIFY_CLIENT_ID
     - SPOTIFY_CLIENT_SECRET
     - OPENAI_API_KEY

6. Run the application
```bash
python main.py
```

## Voice Commands

- Create a playlist: "Create a playlist named [playlist_name]"
- Add a song: "Add [song_name] by [artist_name] to my [playlist_name] playlist"
- Remove a song: "Remove [song_name] from my [playlist_name] playlist"
- Delete a playlist: "Delete my [playlist_name] playlist"

## Note
Make sure your microphone is properly configured and working before running the application.
