---
description: Revisa los cambios y crea uno o varios commits bien formados
---

Crea los commits de los cambios actuales siguiendo los estándares de `CLAUDE.md`.

Pasos:

1. Ejecuta `git status` y `git diff` para ver qué ha cambiado realmente.
2. Comprueba la rama actual. Si es `main` o `pre`, **detente y avisa**: hay que
   crear una rama de trabajo primero.
3. Agrupa los cambios por funcionalidad. Si hay dos cosas distintas mezcladas,
   haz **dos commits separados** con `git add` de archivos concretos.
4. Escribe cada mensaje en formato Conventional Commits, en español e
   imperativo: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`.
5. Si hay `.js` modificado, valida antes con `node --check`.
6. Muestra al final el resultado de `git log --oneline -5` y explica qué has
   hecho y por qué has separado así los commits.

Nunca uses `git add .` ni `git add -A`.
