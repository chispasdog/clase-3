// Gestor de videojuegos: carga datos.json y lo muestra en una tabla.

let juegos = [];

// Pinta el array de juegos dentro de la tabla.
function pintarTabla(lista) {
  const tabla = document.getElementById("tabla");
  tabla.innerHTML = "";

  lista.forEach((juego) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${juego.titulo}</td>
      <td>${juego.genero}</td>
      <td>${juego.anio}</td>
      <td>${juego.nota}</td>
    `;
    tabla.appendChild(fila);
  });
}

// Lee datos.json al arrancar la pagina.
async function cargarDatos() {
  try {
    const res = await fetch("datos.json");
    const datos = await res.json();
    juegos = datos.juegos;
    document.getElementById("titulo").textContent = datos.catalogo;
    pintarTabla(juegos);
  } catch (error) {
    document.getElementById("titulo").textContent =
      "Error al cargar datos.json (abre la pagina con python -m http.server)";
  }
}

cargarDatos();
