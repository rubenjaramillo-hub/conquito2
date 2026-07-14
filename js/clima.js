const URL_CLIMA = "https://api.open-meteo.com/v1/forecast?latitude=-0.2298&longitude=-78.5258&current_weather=true&timezone=America/Guayaquil";
const btnClima = document.getElementById("btnClima");
const contenedorClima = document.getElementById("listaTareas");
const mensajeClima = document.getElementById("mensaje");

async function obtenerClimaQuito() {
    try {
        mensajeClima.textContent = "Conectando con satélites meteorológicos...";
        contenedorClima.innerHTML = "";

        const respuesta = await fetch(URL_CLIMA);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datosConvertidos = await respuesta.json();
        const climaActual = datosConvertidos.current_weather;

        if (!climaActual) {
            throw new Error("La API no devolvió datos actuales de clima.");
        }

        mensajeClima.textContent = "";
        const tarjetaClima = document.createElement("div");
        tarjetaClima.classList.add("tarjeta-item");

        let estadoCielo = "Despejado o nubosidad variable";
        if (climaActual.weathercode >= 61 && climaActual.weathercode <= 65) {
            estadoCielo = "Lluvia ligera a moderada";
        }
        if (climaActual.weathercode >= 66 && climaActual.weathercode <= 67) {
            estadoCielo = "Lluvia helada";
        }
        if (climaActual.weathercode >= 71 && climaActual.weathercode <= 77) {
            estadoCielo = "Nieve ligera a moderada";
        }

        tarjetaClima.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div>
                    <h4>Clima actual en Quito</h4>
                    <span>Temperatura: ${climaActual.temperature}°C</span><br>
                    <span>Velocidad del viento: ${climaActual.windspeed} km/h</span><br>
                    <span>Estado del cielo: ${estadoCielo}</span>
                </div>
            </div>
        `;

        contenedorClima.appendChild(tarjetaClima);
    } catch (error) {
        console.error("Error al obtener los datos del clima:", error);
        mensajeClima.textContent = "No se pudo obtener el clima actual.";
    }
}

if (btnClima) {
    btnClima.addEventListener("click", obtenerClimaQuito);
}