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

Necesita un servidor porque `fetch` no funciona abriendo el HTML con doble clic
(el navegador bloquea `file://`):

```bash
python -m http.server 8000
```

Y abrir http://localhost:8000

## Estructura

- `index.html` — interfaz
- `app.js` — logica del gestor
- `datos.json` — catalogo inicial de juegos
