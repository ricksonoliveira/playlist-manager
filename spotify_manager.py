import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
from dotenv import load_dotenv

load_dotenv()

class SpotifyManager:
    def __init__(self):
        self.sp = spotipy.Spotify(
            auth_manager=SpotifyOAuth(
                client_id=os.getenv('SPOTIFY_CLIENT_ID'),
                client_secret=os.getenv('SPOTIFY_CLIENT_SECRET'),
                redirect_uri=os.getenv('SPOTIFY_REDIRECT_URI'),
                scope="playlist-modify-public playlist-modify-private playlist-read-private"
            )
        )
        self.user_id = self.sp.current_user()['id']

    def create_playlist(self, name):
        """Create a new playlist."""
        try:
            playlist = self.sp.user_playlist_create(self.user_id, name)
            return playlist['id'], f"Created playlist: {name}"
        except Exception as e:
            return None, f"Error creating playlist: {str(e)}"

    def find_playlist(self, name):
        """Find a playlist by name."""
        playlists = self.sp.current_user_playlists()
        for playlist in playlists['items']:
            if playlist['name'].lower() == name.lower():
                return playlist['id']
        return None

    def search_track(self, track_name, artist_name=None):
        """Search for a track."""
        query = track_name
        if artist_name:
            query += f" artist:{artist_name}"
        
        results = self.sp.search(q=query, type='track', limit=1)
        if results['tracks']['items']:
            return results['tracks']['items'][0]['id']
        return None

    def add_track_to_playlist(self, playlist_name, track_name, artist_name=None):
        """Add a track to a playlist."""
        playlist_id = self.find_playlist(playlist_name)
        if not playlist_id:
            return f"Playlist '{playlist_name}' not found"

        track_id = self.search_track(track_name, artist_name)
        if not track_id:
            return f"Track '{track_name}' not found"

        try:
            self.sp.playlist_add_items(playlist_id, [track_id])
            return f"Added '{track_name}' to playlist '{playlist_name}'"
        except Exception as e:
            return f"Error adding track: {str(e)}"

    def remove_track_from_playlist(self, playlist_name, track_name, artist_name=None):
        """Remove a track from a playlist."""
        playlist_id = self.find_playlist(playlist_name)
        if not playlist_id:
            return f"Playlist '{playlist_name}' not found"

        track_id = self.search_track(track_name, artist_name)
        if not track_id:
            return f"Track '{track_name}' not found"

        try:
            self.sp.playlist_remove_all_occurrences_of_items(playlist_id, [track_id])
            return f"Removed '{track_name}' from playlist '{playlist_name}'"
        except Exception as e:
            return f"Error removing track: {str(e)}"

    def delete_playlist(self, playlist_name):
        """Delete a playlist."""
        playlist_id = self.find_playlist(playlist_name)
        if not playlist_id:
            return f"Playlist '{playlist_name}' not found"

        try:
            self.sp.current_user_unfollow_playlist(playlist_id)
            return f"Deleted playlist '{playlist_name}'"
        except Exception as e:
            return f"Error deleting playlist: {str(e)}"
