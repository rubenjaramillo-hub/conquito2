const formulario = document.getElementById("formTarea");
const lista = document.getElementById("listaTareas");
const mensaje = document.getElementById("mensaje");
const total = document.getElementById("total");
const pendientes = document.getElementById("pendientes");
const completados = document.getElementById("completados");
let tareas = [];

if (formulario) {
    formulario.addEventListener("submit", agregarTarea);
}

function agregarTarea(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const prioridad = document.getElementById("prioridad").value;
    const fecha = document.getElementById("fecha").value;

    if (nombre === "" || fecha === "") {
        mensaje.textContent = "Complete los campos";
        return;
    }

    mensaje.textContent = "";
    tareas.push({
        nombre,
        prioridad,
        fecha,
        estado: false
    });

    formulario.reset();
    mostrarTareas();
}

function mostrarTareas() {
    if (!lista) return;

    lista.innerHTML = "";

    if (total) total.textContent = tareas.length;
    if (pendientes) pendientes.textContent = tareas.filter((tarea) => !tarea.estado).length;
    if (completados) completados.textContent = tareas.filter((tarea) => tarea.estado).length;

    if (tareas.length === 0) {
        lista.innerHTML = '<p class="mensaje-vacio">No hay tareas agregadas todavía.</p>';
        return;
    }

    tareas.forEach((tarea, index) => {
        const item = document.createElement("article");
        item.className = "tarea-item";

        const info = document.createElement("div");
        info.className = "tarea-info";

        const titulo = document.createElement("h4");
        titulo.textContent = tarea.nombre;

        const meta = document.createElement("p");
        meta.innerHTML = `<strong>Prioridad:</strong> ${tarea.prioridad} · <strong>Fecha:</strong> ${tarea.fecha}`;

        const estadoTexto = document.createElement("small");
        estadoTexto.textContent = tarea.estado ? "Completada" : "Pendiente";
        estadoTexto.style.color = tarea.estado ? "#16a34a" : "#92400e";

        info.appendChild(titulo);
        info.appendChild(meta);
        info.appendChild(estadoTexto);

        const acciones = document.createElement("div");
        acciones.className = "tarea-acciones";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.estado;
        checkbox.addEventListener("change", () => {
            tareas[index].estado = checkbox.checked;
            mostrarTareas();
        });

        const texto = document.createElement("span");
        texto.textContent = tarea.estado ? "Hecha" : "Por hacer";

        acciones.appendChild(checkbox);
        acciones.appendChild(texto);

        item.appendChild(info);
        item.appendChild(acciones);
        lista.appendChild(item);
    });
}

mostrarTareas();
