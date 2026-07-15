export const promedio = (notas) =>{
    if(!notas || notas.length === 0) return 0;
    return notas.reduce((acumulador, nota)=> acumulador + nota, 0)/notas.length;
};
    

export const aprobados = (estudiantes) =>{
    return estudiantes.filter(
        estudiante => promedio(estudiante.notas) >= 7);
};
export const nombres = (estudiantes) =>{
    return estudiantes.map(
        estudiante => estudiante.nombre);
};
    estudiantes.map(estudiante => estudiante.nombre);

export const promediopGeneral = (estudiantes) =>{
    return estudiantes.reduce(
        (acumulador, estudiante) => acumulador+promedio(estudiante.notas), 
        0
    )/estudiantes.length;
};