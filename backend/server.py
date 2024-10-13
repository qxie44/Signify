from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from moviepy.editor import VideoFileClip
from pydub import AudioSegment
import speech_recognition as sr
import os




app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the uploads folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def audio_to_text(mp3_filepath):
    """Convert audio from MP3 to text using Google Web Speech API."""
    sound = AudioSegment.from_mp3(mp3_filepath)
    wav_filepath = mp3_filepath.replace(".mp3", ".wav")
    sound.export(wav_filepath, format="wav")

    recognizer = sr.Recognizer()
    with sr.AudioFile(wav_filepath) as source:
        audio_data = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio_data)
        return text
    except sr.UnknownValueError:
        return "Unable to recognize speech"
    except sr.RequestError as e:
        return f"API request error: {e}"

def convert_mp4_to_mp3(mp4_filepath, mp3_filepath):
    """Extract audio from an MP4 video and convert it to MP3."""
    video_clip = VideoFileClip(mp4_filepath)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(mp3_filepath, codec='mp3')
    audio_clip.close()
    video_clip.close()

# def translate_to_sign_language(text):
#     """Use SLT's rule-based concatenation model to map text to sign language."""
#     # Load the sign language model
#     model = slt.models.ConcatenativeSynthesis()

#     # Process the input text and translate to sign tokens
#     text_lang = slt.languages.TextLanguage()
#     tokens = text_lang.tokenize(text)

#     # Map the tokens to sign language and return the translation
#     sign_lang = slt.languages.SignLanguage()
#     sign_translation = sign_lang.translate(tokens)
    
#     return sign_translation

@app.route('/upload-video', methods=['POST'])
def upload_video():
    """Handle video uploads, extract audio, convert to text, and translate to sign language."""
    if 'video' not in request.files:
        return jsonify({'error': 'No video file uploaded'}), 400

    video = request.files['video']
    filename = secure_filename(video.filename)

    if not filename.lower().endswith('.mp4'):
        return jsonify({'error': 'Invalid file type. Please upload an MP4 file.'}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    video.save(filepath)

    # Create MP3 filename
    mp3_filename = filename.rsplit('.', 1)[0] + '.mp3'
    mp3_filepath = os.path.join(app.config['UPLOAD_FOLDER'], mp3_filename)

    # Convert MP4 to MP3 and extract text
    convert_mp4_to_mp3(filepath, mp3_filepath)
    text = audio_to_text(mp3_filepath)

    # Translate text to sign language
    # sign_translation = translate_to_sign_language(text)

    return jsonify({
        'message': 'Video processed successfully',
        'text': text,
        # 'sign_translation': sign_translation
    })

if __name__ == '__main__':
    app.run(debug=True)
