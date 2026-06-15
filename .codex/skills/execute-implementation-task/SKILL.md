---
name: execute-implementation-task
description: Read docs/implementation-tasks.md, detect the current or next implementation task from the real repository state, analyze that task with the project documentation, execute it, verify it, and auto-commit only the task changes without changing task status. Use when the user asks Codex to continue the roadmap, implement the next documented task, work through implementation tasks, perform one task from the documented plan, or auto-commit a completed implementation task.
---

# Execute Implementation Task

## Objetivo

Ejecutar una unica tarea de `docs/implementation-tasks.md` partiendo del estado real del repositorio. Detectar que tarea corresponde, analizarla con la documentacion del proyecto, implementarla, verificarla y crear un commit con esos cambios sin modificar el estado de la tarea en el documento.

## Fuentes obligatorias

Leer antes de decidir o editar:

- `AGENTS.md`, si existe.
- `docs/implementation-tasks.md`.
- `docs/development-guidelines.md`.
- `docs/mvp-gestor-tareas-ice.md`.

Leer tambien cuando aporte contexto directo:

- `docs/task-creation-flow.mmd`.
- `docs/user-navigation-flow.mmd`.
- `docs/app-screens.svg`.

## Deteccion de la tarea

1. Extraer las tareas numeradas de `docs/implementation-tasks.md`.
2. Revisar dependencias, alcance incluido, archivos previsibles y criterios de aceptacion.
3. Inspeccionar el repositorio real para determinar que criterios ya estan satisfechos.
4. Considerar "tarea actual" la primera tarea numerada que no cumpla todos sus criterios de aceptacion y cuyas dependencias esten satisfechas o sean la misma base que falta construir.
5. Si el usuario indica un numero o nombre de tarea, analizar esa tarea concreta, pero validar antes sus dependencias.
6. Si una tarea parece parcialmente hecha, continuarla desde el punto real del codigo sin rehacer cambios validos existentes.
7. Si no se puede determinar la tarea con confianza, explicar la ambiguedad con evidencia concreta y pedir una decision breve.

No usar checkboxes como fuente unica de verdad. Las casillas pueden estar desactualizadas; la deteccion se basa en criterios de aceptacion y archivos existentes.

## Analisis previo

Antes de implementar:

- Capturar `git status --short` como referencia de cambios preexistentes.
- Leer completa la seccion de la tarea seleccionada.
- Identificar objetivo, alcance, criterios de aceptacion y dependencias.
- Revisar las carpetas y archivos existentes relacionados.
- Confirmar que la solucion respeta la arquitectura documentada.
- Preparar un plan corto con subtareas verificables cuando el cambio sea amplio.
- Si `AGENTS.md` exige aprobacion previa para cambios amplios, proponer el plan y esperar confirmacion.

## Ejecucion

- Ejecutar solo una tarea documentada por invocacion del skill.
- Mantener los cambios dentro del alcance de esa tarea.
- Crear o modificar solo los archivos necesarios para cumplir sus criterios.
- Respetar React, TypeScript, Vite y Material UI como stack del proyecto.
- Seguir la estructura de carpetas definida en `docs/development-guidelines.md`.
- Mantener estado local para tareas; no anadir persistencia ni backend.
- No anadir dependencias nuevas salvo que la tarea y la documentacion lo justifiquen claramente.
- Preservar cambios existentes del usuario.
- Evitar refactors no requeridos por la tarea.
- Aplicar clean code: componentes pequenos, nombres claros, tipos explicitos y logica derivada en utilidades o hooks cuando corresponda.

## Prohibicion de cambio de estado

No modificar el estado de ninguna tarea en `docs/implementation-tasks.md`.

Esto incluye:

- No marcar ni desmarcar checkboxes.
- No cambiar titulos de tareas.
- No reordenar tareas.
- No editar dependencias, criterios de aceptacion o alcances para reflejar progreso.
- No anadir notas de avance dentro del archivo de tareas.

Si el usuario pide actualizar el estado, explicar que este skill no lo hace y pedir una instruccion explicita fuera del flujo del skill.

## Verificacion

Al terminar la implementacion:

- Ejecutar la verificacion disponible mas cercana: tests, typecheck, lint o build.
- Si no existe comando de verificacion, inspeccionar los archivos modificados y explicar la limitacion.
- Confirmar los criterios de aceptacion de la tarea seleccionada contra el resultado.
- No marcar la tarea como completada en `docs/implementation-tasks.md`.

## Auto-commit

Despues de verificar:

- Ejecutar `git status --short` y comparar contra el estado inicial.
- Identificar solo archivos creados o modificados por la ejecucion de la tarea.
- No incluir cambios preexistentes del usuario.
- No incluir `docs/implementation-tasks.md` aunque aparezca modificado.
- No hacer commit si no hay cambios propios de la tarea.
- No hacer commit si la verificacion falla, salvo instruccion explicita del usuario.
- Revisar el diff de los archivos propios antes de commitear.
- Preparar el commit con `git add` usando rutas explicitas.
- Crear un commit automatico con mensaje `Implement task N: resumen breve`.
- Sustituir `N` por el numero real de la tarea detectada.
- Mantener el resumen breve en imperativo o sustantivo claro.
- Si `git commit` falla por configuracion local, explicar el fallo y dejar los cambios sin intentar configurar Git.

## Respuesta final

Incluir de forma breve:

- Tarea detectada y ejecutada.
- Cambios principales realizados.
- Verificacion ejecutada y resultado.
- Hash del commit creado, si se creo.
- Cualquier criterio no cubierto o bloqueo real.
- Recordatorio solo si es relevante: el estado de la tarea no fue modificado.
