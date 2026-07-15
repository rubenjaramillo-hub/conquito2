
import { Estudiante } from './estudiante.js';}
import { promedio, aprobados, nombres, promediopGeneral } from './funciones.js';

const estudiantes = [
    new Estudiante('Juan', 'Ingenieria', 20, [7, 8, 9]),
    new Estudiante('Maria', 'Medicina', 22, [6, 7, 8]),
    new Estudiante('Pedro', 'Derecho', 21, [5, 6, 7]),
    new Estudiante('Ana', 'Arquitectura', 23, [9, 10, 8])
];
const salida = document.getElementById('salida');

const promedio = (notas) => {
    if (!notas || notas.length === 0) return 0;
    return notas.reduce((acumulador, nota) => acumulador + nota, 0) / notas.length;
};

const aprobados = (estudiantes) => {
    return estudiantes.filter(estudiante => promedio(estudiante.notas) >= 7);
};

const nombres = (estudiantes) => {
    return estudiantes.map(estudiante => estudiante.nombre);
};

const promediopGeneral = (estudiantes) => {
    return estudiantes.reduce(
        (acumulador, estudiante) => acumulador + promedio(estudiante.notas),
        0
    ) / estudiantes.length;
};

const estudiantes = [
    new Estudiante('Juan', 'Ingenieria', 20, [7, 8, 9]),
    new Estudiante('Maria', 'Medicina', 22, [6, 7, 8]),
    new Estudiante('Pedro', 'Derecho', 21, [5, 6, 7]),
    new Estudiante('Ana', 'Arquitectura', 23, [9, 10, 8])
];

const salida = document.getElementById('salida');
const btnProcesar = document.getElementById('btnProcesar');

const mostrarResultados = () => {
    const aprobadosList = aprobados(estudiantes);

    let texto = `
        <h3>Lista de estudiantes</h3>
        <ul class="student-list">
            ${estudiantes.map(estudiante => `<li>${estudiante.nombre} - ${estudiante.carrera} - ${estudiante.edad} - ${promedio(estudiante.notas).toFixed(1)}</li>`).join('')}
        </ul>
        <p><strong>Promedio General:</strong> ${promediopGeneral(estudiantes).toFixed(1)}</p>
        <p><strong>Cantidad de Aprobados:</strong> ${aprobadosList.length}</p>
        <p><strong>Nombres de Aprobados:</strong> ${nombres(aprobadosList).join(', ')}</p>
        <h3>Detalle de Aprobados</h3>
        <ul class="student-list">
            ${aprobadosList.map(estudiante => `<li>${estudiante.nombre} - ${estudiante.carrera} - ${estudiante.edad} - ${promedio(estudiante.notas).toFixed(1)}</li>`).join('')}
        </ul>
    `;

    if (salida) {
        salida.innerHTML = texto;
    }

    console.clear();
    console.table(estudiantes);
    console.log(`Promedio General: ${promediopGeneral(estudiantes).toFixed(1)}`);
    console.log(`Estudiantes Aprobados: ${aprobadosList.length}`);
};

if (btnProcesar) {
    btnProcesar.addEventListener('click', mostrarResultados);
}

mostrarResultados();