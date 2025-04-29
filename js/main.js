// FUNCION PARA GUARDAR LA RECETA
function guardarReceta() {
    const nombre = document.getElementById("nombreReceta").value.trim();
    const ingrediente = document.getElementById("ingrediente").value.trim();
    const porciones = document.getElementById("numporciones").value.trim();
    const instrucciones = document.getElementById("instrucciones").value.trim();
    const tiempo = document.getElementById("tiempo").value.trim();
    const categoria = document.getElementById("categoria").value;
    const dificultad = document.getElementById("dificultad").value;

    // Validaciones
    if (!nombre) {
        alert("El nombre de la receta es obligatorio");
        return;
    }
    if (!ingrediente) {
        alert("Los ingredientes son obligatorios");
        return;
    }
    if (!porciones) {
        alert("El número de porciones es obligatorio");
        return;
    }
    if (!instrucciones) {
        alert("Las instrucciones son obligatorias");
        return;
    }
    if (!tiempo) {
        alert("El tiempo de preparación es obligatorio");
        return;
    }
    if (!categoria) {
        alert("Debe seleccionar una categoría");
        return;
    }
    if (!dificultad) {
        alert("Debe seleccionar un nivel de dificultad");
        return;
    }

    const receta = {
        id: Date.now(),
        nombre: nombre,
        ingrediente: ingrediente,
        porciones: porciones,
        instrucciones: instrucciones,
        tiempo: tiempo,
        categoria: categoria,
        dificultad: dificultad
    };

    // Obtener recetas existentes o inicializar un array vacío
    let recetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];

    // Agregar la nueva receta
    recetasGuardadas.push(receta);

    // Guardar en localStorage
    localStorage.setItem("recetas", JSON.stringify(recetasGuardadas));

    alert("Receta guardada exitosamente!");

    // Limpiar formulario
    document.getElementById("nombreReceta").value = "";
    document.getElementById("ingrediente").value = "";
    document.getElementById("numporciones").value = "";
    document.getElementById("instrucciones").value = "";
    document.getElementById("tiempo").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("dificultad").value = "";

    // Actualizar lista de recetas
    cargarRecetasGuardadas();
}

// FUNCION PARA ELIMINAR RECETA
function eliminarReceta(id) {
    let recetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];
    
    // Filtrar para quitar la receta con el ID especificado
    recetasGuardadas = recetasGuardadas.filter(receta => receta.id !== id);
    
    // Guardar el array actualizado
    localStorage.setItem("recetas", JSON.stringify(recetasGuardadas));
    
    // Actualizar la vista
    cargarRecetasGuardadas();
}

// FUNCION PARA MOSTRAR LAS RECETAS GUARDADAS
function cargarRecetasGuardadas() {
    const listaRecetas = document.getElementById("listaRecetas");
    listaRecetas.innerHTML = "";

    // Obtener recetas del localStorage
    const recetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];

    if (recetasGuardadas.length === 0) {
        listaRecetas.innerHTML = "<p>No hay recetas guardadas.</p>";
        return;
    }

    // Crear tarjeta para cada receta
    recetasGuardadas.forEach(receta => {
        const card = document.createElement("div");
        card.className = "receta-card";
        card.innerHTML = `
            <div class="receta-header">
                <h3>${receta.nombre}</h3>
                <span class="receta-categoria"><strong>Categoria:</strong><br>${receta.categoria}</span>
                <span class="receta-dificultad"><strong>Dificultad:<br></strong>${receta.dificultad}</span>
            </div>
            <div class="receta-body">
                <p><strong>Ingredientes:</strong> ${receta.ingrediente}</p>
                <p><strong>Porciones:</strong> ${receta.porciones}</p>
                <p><strong>Tiempo de preparación:</strong> ${receta.tiempo} minutos</p>
                <p><strong>Instrucciones:</strong></p>
                <div class="receta-instrucciones">${receta.instrucciones}</div>
            </div>
            <button class="btn btn-eliminar" onclick="eliminarReceta(${receta.id})">Eliminar Receta</button>
        `;

        listaRecetas.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Botón para guardar receta
    const btnGuardarReceta = document.getElementById("btnGuardarReceta");
    btnGuardarReceta.addEventListener("click", guardarReceta);
    
    // Definir la función eliminarReceta en el ámbito global
    window.eliminarReceta = eliminarReceta;
    
    // Cargar recetas guardadas al inicio
    cargarRecetasGuardadas();
});