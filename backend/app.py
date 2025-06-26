from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import essentia
from essentia.standard import MonoLoader, TensorflowPredictEffnetDiscogs
import numpy as np

app = FastAPI()

# Cargar el modelo preentrenado (reemplazar con la ruta correcta)
GENRE_MODEL_PATH = 'path/to/genre/model.pb'  # Actualiza esta ruta con el modelo adecuado
GENRE_MODEL = TensorflowPredictEffnetDiscogs(GENRE_MODEL_PATH)

class AudioAnalysisResponse(BaseModel):
    genre: str
    bpm: float
    key: str

@app.post("/analyze/")
async def analyze_audio(file: UploadFile = File(...)) -> AudioAnalysisResponse:
    audio_data = await file.read()
    with open('temp_audio.wav', 'wb') as f:
        f.write(audio_data)

    loader = MonoLoader(filename='temp_audio.wav')
    audio = loader()

    genre_prediction = GENRE_MODEL(audio)
    genre = genre_prediction.argmax(axis=1)[0]  # Obtenemos el género predecido

    bpm_detector = essentia.standard.BpmDetector()
    bpm = bpm_detector(audio)

    tonal_analysis = essentia.standard.Key()
    key = tonal_analysis(audio)

    return AudioAnalysisResponse(genre=genre, bpm=bpm, key=key)
