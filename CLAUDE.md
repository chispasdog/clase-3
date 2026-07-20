# clase-3 — Gestor de Videojuegos

App web sin dependencias (HTML + JS + JSON) que gestiona un catálogo de
videojuegos. Este archivo define **cómo se trabaja en este repositorio**.

---

## 1. Regla de oro

**Nunca se hace commit directamente sobre `main` ni sobre `pre`.**
Todo cambio nace en una rama y llega a `main` por fusión, nunca a mano.

---

## 2. Modelo de ramas

| Rama | Rol | Quién escribe en ella |
|---|---|---|
| `main` | Producción. Siempre desplegable. | Solo merges desde `pre` |
| `pre` | Preproducción. Validación previa. | Solo merges desde `dev` |
| `dev` | Integración del trabajo diario. | Merges desde ramas de trabajo |
| `feature/*` | Una funcionalidad concreta. | Tú, libremente |

Flujo del cambio, siempre en esta dirección:

```
feature/xxx  ->  dev  ->  pre  ->  main
```

Un cambio nunca salta pasos. Si algo falla en `pre`, se arregla en `dev` y
vuelve a subir; no se parchea `pre` a mano.

### Nombres de rama

Formato: `tipo/descripcion-en-kebab-case`

```
feature/contador-juegos      funcionalidad nueva
fix/buscador-mayusculas      corrección de un fallo
docs/readme-visual           documentación
refactor/separar-render      reorganizar código sin cambiar comportamiento
hotfix/error-critico-json    urgencia sobre main (ver sección 7)
```

Reglas: minúsculas, sin acentos, sin espacios, sin ñ. Nada de `rama1`,
`prueba`, `dev2` o `arreglos-varios`: el nombre debe decir **qué** se hace.

### Ciclo de vida

Una rama de trabajo es **desechable**: nace de `dev`, vive pocos días y se
borra tras fusionarse. Ramas vivas hay solo tres: `main`, `pre` y `dev`.

```bash
git switch dev
git pull                              # partir siempre de lo último
git switch -c feature/mi-funcion      # crear desde dev actualizado
# ... trabajo y commits ...
git switch dev
git merge feature/mi-funcion
git push
git branch -d feature/mi-funcion      # -d, nunca -D: es la red de seguridad
git push origin --delete feature/mi-funcion
```

---

## 3. Commits

### Un commit = un cambio con sentido propio

Si el mensaje necesita un "y" para describirlo, son dos commits. Un commit
debe poder revertirse solo sin romper nada.

- ❌ `cambios`, `update`, `arreglos`, `asdf`, `commit final`, `ya funciona`
- ❌ Un commit con la app entera dentro
- ✅ `feat: contador de juegos en el catálogo`

### Formato: Conventional Commits

```
<tipo>(<ámbito opcional>): <qué hace, en imperativo y minúscula>

<cuerpo opcional: por qué se hizo, no qué se hizo>

<pie opcional: Closes #12 / BREAKING CHANGE: ...>
```

| Tipo | Cuándo |
|---|---|
| `feat` | Funcionalidad nueva para el usuario |
| `fix` | Corrección de un fallo |
| `docs` | Solo documentación |
| `style` | Formato, CSS, espacios; sin cambio de lógica |
| `refactor` | Reorganizar código sin cambiar comportamiento |
| `perf` | Mejora de rendimiento |
| `test` | Añadir o corregir pruebas |
| `ci` | Cambios en la integración/despliegue continuo (workflows) |
| `chore` | Configuración, dependencias, tareas de mantenimiento |

Ejemplos reales de este repo:

```
feat: contador de juegos en el catálogo
fix: funcionar al abrir index.html con doble clic, sin servidor
docs: README visual del proyecto
chore: añadir .gitignore
```

### Antes de cada commit

1. `git status` — ¿hay algo que no debería subir?
2. `git diff` — lee tu propio cambio antes que nadie
3. `git add <archivos concretos>` — **evita `git add .` a ciegas**
4. `git commit -m "tipo: mensaje"`

El mensaje se escribe en **imperativo**: "añadir contador", no "añadido
contador" ni "añadí contador". Completa la frase: *"Este commit, al aplicarse,
va a... añadir contador"*.

---

## 4. Versionado semántico (SemVer)

Las versiones publicadas se marcan con **etiquetas anotadas** sobre `main`:

```
vMAYOR.MENOR.PARCHE      ->      v1.4.2
```

| Parte | Sube cuando | Ejemplo |
|---|---|---|
| MAYOR | Rompes compatibilidad | cambia el formato de `datos.json` |
| MENOR | Añades funcionalidad compatible | nuevo buscador |
| PARCHE | Corriges un fallo | arreglar el filtro |

Publicar una versión:

```bash
git switch main
git merge pre
git tag -a v1.1.0 -m "Contador de juegos e importación de JSON"
git push origin main --follow-tags
```

Usa siempre `-a` (etiqueta anotada, con autor y fecha), nunca una etiqueta
ligera. Cada entrada del `CHANGELOG.md` corresponde a una etiqueta.

---

## 5. Historial limpio

- **`git pull --rebase`** al actualizar tu rama: evita commits de merge basura
  del tipo "Merge branch 'dev' of github.com...".
- **Rebase solo en ramas tuyas y no publicadas.** Nunca reescribas historia ya
  compartida (`git rebase`, `git commit --amend` o `push --force` sobre `dev`,
  `pre` o `main` rompe el repo del resto del equipo).
- **`git push --force-with-lease`**, jamás `--force` a secas: aborta si alguien
  subió algo que tú no tienes.
- Los merges hacia `pre` y `main` se hacen **sin fast-forward** para que quede
  registro de cuándo se promocionó cada versión:

  ```bash
  git merge --no-ff dev -m "merge: promocionar dev a pre"
  ```

---

## 6. Qué NO entra en el repositorio

Nunca se versionan: contraseñas, tokens, claves de API, `.env`, credenciales,
archivos de configuración del editor, `node_modules/`, binarios pesados ni
archivos generados. Para eso está `.gitignore`.

> Si subes un secreto, borrarlo en un commit posterior **no lo elimina**: sigue
> en el historial. Se considera comprometido y hay que rotarlo.

---

## 7. Urgencias (hotfix)

Un fallo crítico en producción no espera al ciclo normal:

```bash
git switch main
git switch -c hotfix/descripcion
# ... arreglo mínimo y commit ...
git switch main && git merge --no-ff hotfix/descripcion && git tag -a v1.1.1 -m "..."
git switch pre  && git merge main      # devolver el arreglo hacia atrás
git switch dev  && git merge pre       # o dev quedará sin el arreglo
```

Lo importante: el hotfix **se reintegra hacia atrás** a `pre` y `dev`. Si no,
el siguiente despliegue reintroduce el fallo.

---

## 8. Checklist antes de promocionar a `main`

- [ ] La app abre con doble clic en `index.html` y no da errores en consola
- [ ] Las funcionalidades siguen funcionando: listar, añadir, borrar, buscar
- [ ] `git status` limpio, sin archivos sueltos
- [ ] Mensajes de commit con formato correcto
- [ ] `CHANGELOG.md` actualizado
- [ ] Etiqueta de versión creada

---

## 9. Instrucciones para Claude

Al trabajar en este repositorio:

1. Comprobar la rama actual antes de tocar nada; **nunca** commitear en `main`
   o `pre` directamente.
2. Un commit por funcionalidad, con formato Conventional Commits en español.
3. Hacer `git add` de archivos concretos, nunca `git add .`.
4. Verificar la sintaxis (`node --check`) antes de commitear JS.
5. No hacer `push --force`, no reescribir historia publicada, no borrar ramas
   con `-D` sin avisar.
6. Al terminar una funcionalidad, proponer la actualización del `CHANGELOG.md`.
7. Explicar los comandos usados: este repo es material de clase.

## 10. CI/CD (automatización)

Hay dos workflows en `.github/workflows/`:

| Workflow | Cuándo | Qué hace |
|---|---|---|
| `ci.yml` | Push a `dev`/`pre`/`main` y cada PR | Valida sintaxis JS y que `datos.json` sea válido |
| `deploy.yml` | Push a `main` | Valida y, si pasa, publica la web en GitHub Pages |

Idea clave: **`main` se despliega solo**. Nadie sube archivos a mano a ningún
servidor. El despliegue solo ocurre si la validación pasa primero (`needs:
validar`), por eso se puede promocionar a `main` sin miedo.

- Web publicada: https://chispasdog.github.io/clase-3/
- Estado de los despliegues: pestaña **Actions** del repo en GitHub.

## 11. La app

Doble clic en `index.html`. No necesita servidor ni instalación.

- `index.html` — interfaz
- `app.js` — lógica del gestor
- `datos.js` — catálogo inicial (variable JS: `fetch` no funciona en `file://`)
- `datos.json` — el mismo catálogo, para importar y exportar a mano
