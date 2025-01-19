import speech_recognition as sr
from dotenv import load_dotenv
import re

load_dotenv()

class VoiceManager:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.recognizer.dynamic_energy_threshold = True
        self.recognizer.pause_threshold = 0.8

    def listen(self):
        """Listen to microphone input and convert to text."""
        try:
            with sr.Microphone() as source:
                print("\n🎤 Adjusting for ambient noise... Please wait...")
                self.recognizer.adjust_for_ambient_noise(source, duration=1)
                print("🎤 Ready! Speak your command now...")
                
                try:
                    audio = self.recognizer.listen(source, timeout=10, phrase_time_limit=8)
                    print("🎤 Processing your voice command...")
                    
                    try:
                        text = self.recognizer.recognize_google(audio)
                        return text.lower()
                    except sr.UnknownValueError:
                        return "Could not understand audio. Please speak more clearly and try again."
                    except sr.RequestError as e:
                        return f"Could not request results from Speech Recognition service; {str(e)}"
                        
                except sr.WaitTimeoutError:
                    return "Timeout: No speech detected. Please try again."
                    
        except Exception as e:
            print(f"\n⚠️ Microphone Error: {str(e)}")
            print("Make sure your microphone is properly connected and not in use by another application.")
            return "Error: Microphone configuration issue"

    def parse_command(self, text):
        """Parse voice command using simple string matching."""
        text = text.lower().strip()
        
        # Create playlist command
        create_match = re.match(r"create (?:a )?playlist (?:named |called )?(.+)", text)
        if create_match:
            return {
                "action": "create_playlist",
                "playlist": create_match.group(1).strip(),
                "track": None,
                "artist": None
            }
            
        # Add track command
        add_match = re.match(r"add (.+?) by (.+?) to (?:my )?(.+?)(?: playlist)?$", text)
        if add_match:
            return {
                "action": "add_track",
                "track": add_match.group(1).strip(),
                "artist": add_match.group(2).strip(),
                "playlist": add_match.group(3).strip()
            }
            
        # Remove track command
        remove_match = re.match(r"remove (.+?) from (?:my )?(.+?)(?: playlist)?$", text)
        if remove_match:
            return {
                "action": "remove_track",
                "track": remove_match.group(1).strip(),
                "artist": None,
                "playlist": remove_match.group(2).strip()
            }
            
        # Delete playlist command
        delete_match = re.match(r"delete (?:my )?(.+?)(?: playlist)?$", text)
        if delete_match:
            return {
                "action": "delete_playlist",
                "playlist": delete_match.group(1).strip(),
                "track": None,
                "artist": None
            }
            
        return None
