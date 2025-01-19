from spotify_manager import SpotifyManager
from voice_manager import VoiceManager

def main():
    spotify = SpotifyManager()
    voice = VoiceManager()

    print("\n=== Welcome to Spotify Voice Manager! ===")
    print("\nAvailable commands:")
    print("- Create a playlist: 'Create a playlist named [playlist_name]'")
    print("- Add a song: 'Add [song_name] by [artist_name] to my [playlist_name] playlist'")
    print("- Remove a song: 'Remove [song_name] from my [playlist_name] playlist'")
    print("- Delete a playlist: 'Delete my [playlist_name] playlist'")
    print("\nPress Ctrl+C to exit\n")

    while True:
        try:
            # Listen for voice command
            print("\nWaiting for your command...")
            command = voice.listen()
            if not command or command.startswith("Could not") or command.startswith("Timeout"):
                print(f"Error: {command}")
                continue

            print(f"\nRecognized command: '{command}'")

            # Parse the command
            print("Processing command...")
            command_data = voice.parse_command(command)
            
            if command_data is None:
                print(" Command not recognized. Please try again using one of the example formats.")
                continue

            print(f"Parsed command: {command_data}")

            # Execute the command
            action = command_data['action']
            playlist_name = command_data['playlist']
            track_name = command_data['track']
            artist_name = command_data['artist']

            result = None
            if action == 'create_playlist':
                playlist_id, message = spotify.create_playlist(playlist_name)
                if playlist_id:
                    result = f" Success! Playlist '{playlist_name}' created successfully! Check your Spotify account to see it."
                else:
                    result = f" Error: {message}"
                    
            elif action == 'add_track':
                result = spotify.add_track_to_playlist(playlist_name, track_name, artist_name)
                if "Error" not in result:
                    result = f" Success! Added '{track_name}' to playlist '{playlist_name}'. Check your playlist to listen to it!"
                else:
                    result = f" {result}"
                    
            elif action == 'remove_track':
                result = spotify.remove_track_from_playlist(playlist_name, track_name, artist_name)
                if "Error" not in result:
                    result = f" Success! Removed '{track_name}' from playlist '{playlist_name}'. The song has been removed from your playlist."
                else:
                    result = f" {result}"
                    
            elif action == 'delete_playlist':
                result = spotify.delete_playlist(playlist_name)
                if "Error" not in result:
                    result = f" Success! Playlist '{playlist_name}' has been deleted from your account."
                else:
                    result = f" {result}"
            else:
                result = " Unknown command. Please try again."

            print("\n" + result + "\n")
            print("-" * 50)

        except KeyboardInterrupt:
            print("\nGoodbye! Thanks for using Spotify Voice Manager!")
            break
        except Exception as e:
            print(f"\n An error occurred: {str(e)}")
            print("Please try again.")

if __name__ == "__main__":
    main()
