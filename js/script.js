const formulario = document.getElementById("formTarea");
const lista = document.getElementById("listaTareas");
const mensaje = document.getElementById("mensaje");
const total = document.getElementById("total");
const pendientes = document.getElementById("pendientes");
const completados = document.getElementById("completados");
const STORAGE_KEY = "tareasConQuito";

let tareas = [];

const guardarTareas = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
};

const cargarTareas = () => {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    if (!datosGuardados) return;

    try {
        const tareasGuardadas = JSON.parse(datosGuardados);
        if (Array.isArray(tareasGuardadas)) {
            tareas = tareasGuardadas;
        }
    } catch (error) {
        console.error("No se pudieron cargar las tareas guardadas:", error);
    }
};

const agregarTarea = (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const prioridad = document.getElementById("prioridad").value;
    const fecha = document.getElementById("fecha").value;

    if (!nombre || !fecha) {
        mensaje.textContent = "Complete los campos";
        return;
    }

    mensaje.textContent = "";
    tareas = [...tareas, { nombre, prioridad, fecha, estado: false }];
    guardarTareas();

    formulario.reset();
    mostrarTareas();
};

const actualizarResumen = () => {
    if (total) total.textContent = tareas.length;
    if (pendientes) pendientes.textContent = tareas.filter((tarea) => !tarea.estado).length;
    if (completados) completados.textContent = tareas.filter((tarea) => tarea.estado).length;
};

const crearElementoTarea = (tarea, index) => {
    const item = document.createElement("article");
    item.className = "tarea-item";

    item.addEventListener("dblclick", () => {
        tareas = tareas.filter((_, tareaIndex) => tareaIndex !== index);
        guardarTareas();
        mostrarTareas();
    });

    const info = document.createElement("div");
    info.className = "tarea-info";

    const titulo = document.createElement("h4");
    titulo.textContent = tarea.nombre;

    const meta = document.createElement("p");
    meta.innerHTML = `<strong>Prioridad:</strong> ${tarea.prioridad} · <strong>Fecha:</strong> ${tarea.fecha}`;

    const estadoTexto = document.createElement("small");
    estadoTexto.textContent = tarea.estado ? "Completada" : "Pendiente";
    estadoTexto.style.color = tarea.estado ? "#16a34a" : "#92400e";

    info.append(titulo, meta, estadoTexto);

    const acciones = document.createElement("div");
    acciones.className = "tarea-acciones";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.estado;

    checkbox.addEventListener("change", () => {
        tareas = tareas.map((itemTarea, tareaIndex) =>
            tareaIndex === index ? { ...itemTarea, estado: checkbox.checked } : itemTarea
        );
        guardarTareas();
        mostrarTareas();
    });

    const texto = document.createElement("span");
    texto.textContent = tarea.estado ? "Hecha" : "Por hacer";

    acciones.append(checkbox, texto);
    item.append(info, acciones);
    return item;
};

const mostrarTareas = () => {
    if (!lista) return;

    lista.innerHTML = "";
    actualizarResumen();

    if (tareas.length === 0) {
        lista.innerHTML = '<p class="mensaje-vacio">No hay tareas agregadas todavía.</p>';
        return;
    }

    tareas.forEach((tarea, index) => {
        lista.appendChild(crearElementoTarea(tarea, index));
    });
};

if (formulario) {
    formulario.addEventListener("submit", agregarTarea);
}

cargarTareas();
mostrarTareas();

if (typeof window.obtenerClimaQuito === "function") {
    window.obtenerClimaQuito();
}
