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
      <td><button data-id="${juego.id}">Borrar</button></td>
    `;
    fila.querySelector("button").addEventListener("click", () => borrarJuego(juego.id));
    tabla.appendChild(fila);
  });
}

// Quita un juego del array por su id y repinta.
function borrarJuego(id) {
  juegos = juegos.filter((juego) => juego.id !== id);
  pintarTabla(juegos);
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

// Anade un juego nuevo al array y repinta la tabla.
document.getElementById("formulario").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nuevo = {
    id: juegos.length ? Math.max(...juegos.map((j) => j.id)) + 1 : 1,
    titulo: document.getElementById("titulo-nuevo").value,
    genero: document.getElementById("genero-nuevo").value,
    anio: Number(document.getElementById("anio-nuevo").value),
    nota: Number(document.getElementById("nota-nuevo").value),
  };

  juegos.push(nuevo);
  pintarTabla(juegos);
  evento.target.reset();
});

cargarDatos();
