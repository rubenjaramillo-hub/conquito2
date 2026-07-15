const URL_CLIMA = "https://api.open-meteo.com/v1/forecast?latitude=-0.2298&longitude=-78.5258&current_weather=true&timezone=America/Guayaquil&precipitation_probability=1&temperature_unit=celsius&windspeed_unit=kmh&hourly=temperature_2m,precipitation_probability,rain";
const URL_DIVISA = "https://api.freecurrencyapi.com/v1/latest?base_currency=USD&currencies=USD,EUR,GBP";
const btnClima = document.getElementById("btnClima");
const widgetClima = document.getElementById("climaWidget");
const widgetDivisa = document.getElementById("divisaWidget");
const contenedorClima = document.getElementById("climaContenido");
const contenedorDivisa = document.getElementById("divisaContenido");
const mensajeClima = document.getElementById("mensajeClima");
const mensajeDivisa = document.getElementById("mensajeDivisa");
const headerPrincipal = document.querySelector(".header-principal");

let arrastrando = false;
let offsetX = 0;
let offsetY = 0;
let widgetActivo = null;

const ajustarDentroDelContenedor = (widget) => {
    if (!widget || !headerPrincipal) return;

    const headerRect = headerPrincipal.getBoundingClientRect();
    const maxLeft = Math.max(0, headerRect.width - widget.offsetWidth);
    const maxTop = Math.max(0, headerRect.height - widget.offsetHeight);
    const leftActual = parseFloat(widget.style.left || "0");
    const topActual = parseFloat(widget.style.top || "0");

    widget.style.left = `${Math.min(Math.max(leftActual, 0), maxLeft)}px`;
    widget.style.top = `${Math.min(Math.max(topActual, 0), maxTop)}px`;
};

const iniciarArrastre = (evento, widget) => {
    if (!widget || !headerPrincipal) return;

    arrastrando = true;
    widgetActivo = widget;

    const rect = widget.getBoundingClientRect();
    offsetX = evento.clientX - rect.left;
    offsetY = evento.clientY - rect.top;

    widget.style.cursor = "grabbing";
    widget.style.zIndex = "20";
};

const moverWidget = (evento) => {
    if (!arrastrando || !widgetActivo || !headerPrincipal) return;

    const headerRect = headerPrincipal.getBoundingClientRect();
    const x = evento.clientX - offsetX - headerRect.left;
    const y = evento.clientY - offsetY - headerRect.top;
    const maxLeft = Math.max(0, headerRect.width - widgetActivo.offsetWidth);
    const maxTop = Math.max(0, headerRect.height - widgetActivo.offsetHeight);

    widgetActivo.style.left = `${Math.min(Math.max(x, 0), maxLeft)}px`;
    widgetActivo.style.top = `${Math.min(Math.max(y, 0), maxTop)}px`;
};

const detenerArrastre = () => {
    arrastrando = false;

    if (widgetActivo) {
        widgetActivo.style.cursor = "move";
        widgetActivo.style.zIndex = "2";
        ajustarDentroDelContenedor(widgetActivo);
    }

    widgetActivo = null;
};

const obtenerClimaQuito = async () => {
    if (!contenedorClima || !mensajeClima) return;

    try {
        mensajeClima.textContent = "";
        contenedorClima.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <span>Consultando clima...</span>
            </div>
        `;

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
        tarjetaClima.classList.add("tarjeta-clima");

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
            <h4>Quito</h4>
            <p><strong>${climaActual.temperature}°C</strong></p>
            <span>${estadoCielo}</span>
            <small>Viento: ${climaActual.windspeed} km/h</small>
        `;

        contenedorClima.appendChild(tarjetaClima);
    } catch (error) {
        console.error("Error al obtener los datos del clima:", error);
        mensajeClima.textContent = "No se pudo obtener el clima actual.";
    }
};

const obtenerDivisas = async () => {
    if (!contenedorDivisa || !mensajeDivisa) return;

    try {
        mensajeDivisa.textContent = "";
        contenedorDivisa.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <span>Actualizando divisas...</span>
            </div>
        `;

        const respuesta = await fetch(URL_DIVISA, {
            headers: {
                apikey: "fca_live_UdxQe2Vv4efvyI59vQhr6JYq8sWqjZCEp0Ya7OO7"
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        const tasas = datos.data || {};

        mensajeDivisa.textContent = "";
        const tarjetaDivisa = document.createElement("div");
        tarjetaDivisa.classList.add("tarjeta-divisa");

        tarjetaDivisa.innerHTML = `
            <h4>USD</h4>
            <p><strong>${(tasas.USD || 1).toFixed(2)}</strong></p>
            <span>EUR: ${(tasas.EUR || 0).toFixed(2)}</span>
            <small>GBP: ${(tasas.GBP || 0).toFixed(2)}</small>
        `;

        contenedorDivisa.appendChild(tarjetaDivisa);
    } catch (error) {
        console.error("Error al obtener las divisas:", error);
        mensajeDivisa.textContent = "No se pudieron cargar las divisas.";
    }
};

if (btnClima) {
    btnClima.addEventListener("click", obtenerClimaQuito);
}

if (widgetClima) {
    widgetClima.addEventListener("mousedown", (evento) => iniciarArrastre(evento, widgetClima));
}

if (widgetDivisa) {
    widgetDivisa.addEventListener("mousedown", (evento) => iniciarArrastre(evento, widgetDivisa));
}

document.addEventListener("mousemove", moverWidget);
document.addEventListener("mouseup", detenerArrastre);
window.addEventListener("resize", () => {
    [widgetClima, widgetDivisa].filter(Boolean).forEach(ajustarDentroDelContenedor);
});

if (typeof window !== "undefined") {
    window.obtenerClimaQuito = obtenerClimaQuito;
    window.obtenerDivisas = obtenerDivisas;
}

if (contenedorClima && mensajeClima) {
    obtenerClimaQuito();
}

if (contenedorDivisa && mensajeDivisa) {
    obtenerDivisas();
    setInterval(obtenerDivisas, 60000);
}