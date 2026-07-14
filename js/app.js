const API_URL = "https://reqres.in/api/users";
const respuesta = await fetch(API_URL, {
    headers: {
        "x-api-key": "reqres_91d45ec232894938b6a6257ef3e60e59"
    }
});
const btnCargar = document.getElementById("btnCargar");
const listaContenedor = document.getElementById("listaTareas");
const mensaje = document.getElementById("mensaje");

async function obtenerUsuarios() {
    try {
        mensaje.textContent = "";
        listaContenedor.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <span>Cargando usuarios...</span>
            </div>
        `;

        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datosConvertidos = await respuesta.json();
        const usuarios = datosConvertidos.data || [];
        mensaje.textContent = "";

        usuarios.forEach((usuario) => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta-item";
            tarjeta.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${usuario.avatar}" alt="Avatar de ${usuario.first_name}" style="width: 50px; height: 50px; border-radius: 50%;">
                    <div>
                        <h4>${usuario.first_name} ${usuario.last_name}</h4>
                        <span>${usuario.email}</span>
                    </div>
                </div>
            `;
            listaContenedor.appendChild(tarjeta);
        });
    } catch (error) {
        mensaje.textContent = "No se pudieron cargar los usuarios.";
        console.error(error);
    }
}

if (btnCargar) {
    btnCargar.addEventListener("click", obtenerUsuarios);
}