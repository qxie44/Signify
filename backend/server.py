from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from moviepy.editor import VideoFileClip
from pydub import AudioSegment

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the uploads folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

from pydub import AudioSegment
import speech_recognition as sr

def audio_to_text(mp3_filepath):
    # Convert MP3 to WAV
    sound = AudioSegment.from_mp3(mp3_filepath)
    wav_filepath = mp3_filepath.replace(".mp3", ".wav")
    sound.export(wav_filepath, format="wav")

    # Initialize the recognizer
    recognizer = sr.Recognizer()
    
    # Load the audio file
    with sr.AudioFile(wav_filepath) as source:
        audio_data = recognizer.record(source)

        try:
            # Recognize the speech using Google Web Speech API
            text = recognizer.recognize_google(audio_data)
            return text
        except sr.UnknownValueError:
            return "Unable to recognize speech"
        except sr.RequestError as e:
            return f"Could not request results from the speech recognition service; {e}"



def convert_mp4_to_mp3(mp4_filepath, mp3_filepath):
    video_clip = VideoFileClip(mp4_filepath)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(mp3_filepath, codec='mp3')
    audio_clip.close()
    video_clip.close()

@app.route('/upload-video', methods=['POST'])
def upload_video():
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
    
    # Convert MP4 to MP3
    convert_mp4_to_mp3(filepath, mp3_filepath)

    text = audio_to_text(mp3_filepath)

    print(text)
    return jsonify({
        'message': 'Video uploaded and converted to MP3',
        'text': text
    })

if __name__ == '__main__':
    app.run(debug=True)
