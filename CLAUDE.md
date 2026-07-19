# clase-3 — Gestor de videojuegos (JSON + JS + HTML)

Proyecto de clase para practicar Git. La app es un gestor de un catalogo de
videojuegos guardado en `datos.json`.

## Flujo de ramas

- `main` — version estable. No se trabaja aqui directamente.
- `pre` — pruebas antes de pasar a `main`.
- `dev` — rama de trabajo. **Todo el desarrollo empieza aqui.**

Camino de un cambio: `dev` -> `pre` -> `main`.

## Regla de commits

**Un commit por funcionalidad, siempre en `dev`.** Nada de commits gigantes con
varias cosas mezcladas: si la app hace listar, anadir y borrar, son tres commits.

Formato del mensaje:

```
feat: anadir juego al catalogo
fix: el buscador ignoraba mayusculas
docs: actualizar README
```

Prefijos usados: `feat` (funcionalidad nueva), `fix` (arreglo),
`docs` (documentacion), `style` (formato/CSS), `refactor` (reorganizar codigo).

## Como probar la app

Doble clic en `index.html`. Ya esta, no hace falta servidor ni instalar nada.

Los datos iniciales viven en `datos.js` (como variable JS) en vez de cargarse
con `fetch` desde el JSON, porque el navegador bloquea `fetch` sobre `file://`.

## Estructura

- `index.html` — interfaz
- `app.js` — logica del gestor
- `datos.js` — catalogo inicial que carga la pagina al abrirse
- `datos.json` — el mismo catalogo en JSON, para importar/exportar a mano
