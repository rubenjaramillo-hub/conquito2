// Obtener los elementos del HTML con los que vamos a trabajar
const formulario = document.getElementById("formTarea");
const lista = document.getElementById("listaTareas");
const mensaje = document.getElementById("mensaje");
const total = document.getElementById("total");
const pendientes = document.getElementById("pendientes");
const completados = document.getElementById("completados");

// Arreglo donde se guardan las tareas agregadas
let tareas = [];

// Escuchar el envío del formulario para agregar una nueva tarea
if (formulario) {
    formulario.addEventListener("submit", agregarTarea);
}

// Crear una tarea nueva a partir de los datos del formulario
function agregarTarea(e) {
    e.preventDefault();

    // Leer los valores ingresados en los campos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const prioridad = document.getElementById("prioridad").value;
    const fecha = document.getElementById("fecha").value;

    // Validar que el nombre y la fecha no estén vacíos
    if (nombre === "" || fecha === "") {
        mensaje.textContent = "Complete los campos";
        return;
    }

    // Limpiar el mensaje de error y guardar la tarea
    mensaje.textContent = "";
    tareas.push({
        nombre,
        prioridad,
        fecha,
        estado: false
    });

    // Reiniciar el formulario y volver a mostrar la lista
    formulario.reset();
    mostrarTareas();
}

// Mostrar todas las tareas en la lista de la página
function mostrarTareas() {
    if (!lista) return;

    // Limpiar la lista antes de volver a dibujar las tareas
    lista.innerHTML = "";

    // Actualizar los contadores de tareas
    if (total) total.textContent = tareas.length;
    if (pendientes) pendientes.textContent = tareas.filter((tarea) => !tarea.estado).length;
    if (completados) completados.textContent = tareas.filter((tarea) => tarea.estado).length;

    // Mostrar un mensaje si no hay tareas
    if (tareas.length === 0) {
        lista.innerHTML = '<p class="mensaje-vacio">No hay tareas agregadas todavía.</p>';
        return;
    }

    // Crear un elemento visual para cada tarea
    tareas.forEach((tarea, index) => {
        const item = document.createElement("article");
        item.className = "tarea-item";

        // Eliminar la tarea al hacer doble clic sobre su contenedor
        item.addEventListener("dblclick", () => {
            tareas.splice(index, 1);
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

        // Agregar los elementos de información a la tarjeta de la tarea
        info.appendChild(titulo);
        info.appendChild(meta);
        info.appendChild(estadoTexto);

        const acciones = document.createElement("div");
        acciones.className = "tarea-acciones";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.estado;

        // Cambiar el estado de la tarea al marcar o desmarcar el checkbox
        checkbox.addEventListener("change", () => {
            tareas[index].estado = checkbox.checked;
            mostrarTareas();
        });

        const texto = document.createElement("span");
        texto.textContent = tarea.estado ? "Hecha" : "Por hacer";

        // Agregar los controles de acción a la tarea
        acciones.appendChild(checkbox);
        acciones.appendChild(texto);

        // Insertar la información y las acciones dentro del artículo de la tarea
        item.appendChild(info);
        item.appendChild(acciones);
        lista.appendChild(item);
    });
}

// Mostrar la lista al cargar la página
mostrarTareas();

if (typeof window.obtenerClimaQuito === "function") {
    window.obtenerClimaQuito();
}
