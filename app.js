// Gestor de videojuegos: carga los datos de datos.js y los muestra en una tabla.

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

// Carga los datos al arrancar. Sin fetch, asi funciona con doble clic.
function cargarDatos() {
  juegos = DATOS.juegos.map((juego) => ({ ...juego }));
  document.getElementById("titulo").textContent = DATOS.catalogo;
  pintarTabla(juegos);
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

// Filtra por titulo o genero segun lo que se escriba en el buscador.
document.getElementById("buscador").addEventListener("input", (evento) => {
  const texto = evento.target.value.toLowerCase();
  const filtrados = juegos.filter(
    (juego) =>
      juego.titulo.toLowerCase().includes(texto) ||
      juego.genero.toLowerCase().includes(texto)
  );
  pintarTabla(filtrados);
});

// Descarga el catalogo actual como un datos.json nuevo.
document.getElementById("exportar").addEventListener("click", () => {
  const contenido = JSON.stringify({ catalogo: "Videojuegos de clase", juegos }, null, 2);
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(new Blob([contenido], { type: "application/json" }));
  enlace.download = "datos.json";
  enlace.click();
  URL.revokeObjectURL(enlace.href);
});

// Carga un datos.json elegido a mano por el usuario.
document.getElementById("importar").addEventListener("change", (evento) => {
  const archivo = evento.target.files[0];
  if (!archivo) return;

  const lector = new FileReader();
  lector.onload = () => {
    try {
      const datos = JSON.parse(lector.result);
      juegos = datos.juegos;
      document.getElementById("titulo").textContent = datos.catalogo;
      pintarTabla(juegos);
    } catch (error) {
      alert("Ese archivo no es un JSON valido");
    }
  };
  lector.readAsText(archivo);
});

cargarDatos();
