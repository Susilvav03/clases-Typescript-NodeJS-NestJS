const button = document.getElementById("fetchBtn");
const urlInput = document.getElementById("url");
const output = document.getElementById("output");
const status = document.getElementById("status");

button.addEventListener("click", async () => {
    const url = urlInput.value;
    status.textContent = "⏳ Enviando petición...";
    status.className = "status loading";
    output.textContent = "";

    try {
    const res = await fetch(url, { method: "GET" });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    status.textContent = "✅ Respuesta recibida con éxito";
    status.className = "status ok";
    output.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
    status.textContent = "❌ Error en la petición";
    status.className = "status error";
    output.textContent = err;
    }
});