# Changelog

Todos los cambios notables de este proyecto se documentan aquí.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y versionado según [SemVer](https://semver.org/lang/es/).

## [Sin publicar]

### ejemplo
### Añadido
- Estándares de trabajo con Git en `CLAUDE.md`.
- Comandos `/commit`, `/rama` y `/publicar` en `.claude/commands/`.
- `.gitignore` y este `CHANGELOG.md`.

## [1.1.0] - 2026-07-19

### Añadido
- Contador de juegos del catálogo.
- Importación de un `datos.json` desde el disco.
- README visual con badges y tabla de funcionalidades.

### Corregido
- La app ya funciona abriendo `index.html` con doble clic, sin servidor:
  los datos iniciales pasan de `fetch` a la variable `DATOS` en `datos.js`.

## [1.0.0] - 2026-07-19

### Añadido
- Catálogo inicial de videojuegos en `datos.json`.
- Listado de juegos en una tabla.
- Alta de juegos mediante formulario.
- Borrado de juegos del listado.
- Buscador por título y género.
- Exportación del catálogo a un `datos.json` descargable.
