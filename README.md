# Spotify Voice Manager

A voice-controlled Spotify playlist manager that allows you to create and manage your playlists using simple voice commands. Speak naturally to your computer to create playlists, add songs, and more!

## Features

- 🎤 Voice command recognition using Google Speech Recognition
- 🎵 Create new playlists
- ➕ Add songs to existing playlists
- ➖ Remove songs from playlists
- 🗑️ Delete playlists
- 🎯 Simple and precise command patterns

## Command Examples

- Create a playlist: `"Create a playlist named road trip"`
- Add a song: `"Add back in black by ac dc to my road trip playlist"`
- Remove a song: `"Remove back in black from my road trip playlist"`
- Delete a playlist: `"Delete my road trip playlist"`

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and fill in your Spotify credentials:
   ```
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_REDIRECT_URI=your_redirect_uri
   ```

## Usage

1. Make sure your microphone is connected and working
2. Run the application:
   ```bash
   python main.py
   ```
3. Wait for the "Ready! Speak your command now..." prompt
4. Speak your command clearly into the microphone
5. Follow the on-screen feedback

## Requirements

- Python 3.8+
- Working microphone
- Spotify account with API access
- Internet connection

## Future Enhancements

- 🤖 Integration with OpenAI for more natural and diverse voice commands
- 📊 Playlist statistics and recommendations
- 🎨 GUI interface
- 🔍 Advanced song search capabilities
- 📱 Mobile app support

## Contributing

Feel free to open issues or submit pull requests with improvements!

## License

MIT License - feel free to use this project however you'd like!
