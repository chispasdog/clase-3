---
description: Promociona los cambios dev -> pre -> main con checklist y etiqueta
argument-hint: [versión, p.ej. v1.2.0]
---

Promociona el estado actual de `dev` hasta `main` y publica la versión
$ARGUMENTS siguiendo `CLAUDE.md`.

Antes de empezar, repasa el checklist de la sección 8 de `CLAUDE.md` y
**pregunta al usuario** si ha probado la app. No sigas sin respuesta.

Pasos:

1. `git status` limpio y `git log --oneline --graph --all` para ver el estado.
2. `git switch pre`, `git merge --no-ff dev -m "merge: promocionar dev a pre"`,
   `git push`.
3. `git switch main`, `git merge --no-ff pre -m "merge: publicar $ARGUMENTS"`.
4. Actualiza `CHANGELOG.md` con la versión, la fecha y los cambios agrupados
   por tipo. Commitea ese cambio.
5. Etiqueta anotada: `git tag -a $ARGUMENTS -m "<resumen>"`.
6. `git push origin main --follow-tags`.
7. `git switch dev` para dejar al usuario listo para seguir trabajando.

Si el merge da conflicto, **para y explícaselo** al usuario en vez de
resolverlo por tu cuenta.
