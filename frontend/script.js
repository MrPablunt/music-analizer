async function uploadFile() {
    const fileInput = document.getElementById("audioFile");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    // Crear un FormData para enviar el archivo al backend
    const formData = new FormData();
    formData.append("file", file);

    // Realizar la solicitud al backend
    const response = await fetch("http://127.0.0.1:8000/analyze/", {
        method: "POST",
        body: formData,
    });

    // Obtener los resultados del análisis
    const result = await response.json();

    // Mostrar los resultados en la interfaz
    displayResults(result);
}

function displayResults(result) {
    document.getElementById("genre").innerText = result.genre;
    document.getElementById("bpm").innerText = result.bpm;
    document.getElementById("key").innerText = result.key;

    // Mostrar la sección de resultados
    document.getElementById("results").style.display = "block";
}
