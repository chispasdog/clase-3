---
description: Crea una rama de trabajo con el nombre correcto partiendo de dev
argument-hint: [descripción de la funcionalidad]
---

Crea una rama de trabajo para: $ARGUMENTS

Pasos:

1. Verifica que el árbol está limpio con `git status`. Si hay cambios sin
   commitear, avisa antes de nada y propón `git stash`.
2. `git switch dev` y `git pull` para partir de lo último.
3. Deduce el tipo a partir de la descripción: `feature/`, `fix/`, `docs/`,
   `refactor/` o `hotfix/`.
4. Convierte la descripción a kebab-case, sin acentos ni ñ.
5. Crea la rama con `git switch -c <tipo>/<descripcion>`.
6. Di en qué rama estamos ahora y recuerda que al terminar hay que fusionar a
   `dev` y borrar la rama con `-d`.

Los `hotfix/` son la excepción: parten de `main`, no de `dev`.
