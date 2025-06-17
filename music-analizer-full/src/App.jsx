import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!audioFile) return;
    setLoading(true);

    // Simulación del resultado (esto se conectará con Essentia en el backend real)
    setTimeout(() => {
      setResults({
        genre: "Hip-Hop",
        bpm: 92,
        mood: "Intenso",
        key: "D menor",
        danceability: "Alta",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">Music Analizer</h1>
      <p className="text-sm mb-6 text-gray-400">Know your sound. Own your vibe.</p>

      <Card className="bg-gray-900 w-full max-w-md p-6">
        <CardContent>
          <Input type="file" accept="audio/*" onChange={handleFileChange} />
          <Button className="mt-4 w-full" onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analizando..." : "Analizar Música"}
          </Button>

          {results && (
            <div className="mt-6 space-y-2 text-sm">
              <p><strong>Género:</strong> {results.genre}</p>
              <p><strong>BPM:</strong> {results.bpm}</p>
              <p><strong>Mood:</strong> {results.mood}</p>
              <p><strong>Tonalidad:</strong> {results.key}</p>
              <p><strong>Danceability:</strong> {results.danceability}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}