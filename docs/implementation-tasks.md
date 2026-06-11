# Tareas de implementacion

## 1. Preparar base del proyecto

**Objetivo:** Crear la base React + TypeScript + Material UI necesaria para desarrollar el MVP.

**Alcance incluido:**

- Inicializar proyecto con Vite, React y TypeScript.
- Instalar dependencias aprobadas de Material UI.
- Crear estructura base de carpetas.
- Configurar tema Material y composicion raiz.
- Crear pantalla inicial `TaskPage` vacia.

**Archivos o carpetas previsibles a modificar:**

- `package.json`
- `index.html`
- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/MaterialThemeProvider.tsx`
- `src/features/tasks/TaskPage.tsx`
- `src/styles`

**Criterios de aceptacion:**

- La app arranca en local sin errores.
- La ruta principal muestra una pantalla base del gestor.
- Material UI esta disponible y aplicado mediante tema.
- La estructura de carpetas sigue `development-guidelines.md`.

**Dependencias:** Ninguna.

## 2. Definir dominio y estado local de tareas

**Objetivo:** Implementar el modelo de datos y la logica local para gestionar tareas en memoria.

**Alcance incluido:**

- Definir tipos `Task`, `TaskStatus` e `IceScore`.
- Crear utilidades para calcular ICE.
- Crear hook de estado local de tareas.
- Soportar crear, editar, completar y eliminar tareas.
- Derivar totales de pendientes y completadas.

**Archivos o carpetas previsibles a modificar:**

- `src/features/tasks/types`
- `src/features/tasks/hooks/useTasks.ts`
- `src/shared/utils`
- `src/features/tasks/TaskPage.tsx`

**Criterios de aceptacion:**

- Una tarea puede existir en memoria con titulo, descripcion, ICE, estado y razon IA opcional.
- El total ICE se calcula como impacto por confianza por facilidad.
- Las tareas se ordenan por ICE descendente.
- No se usa persistencia local ni backend.

**Dependencias:** Tarea 1.

## 3. Construir layout principal y listado

**Objetivo:** Crear la experiencia visual principal con Material UI para consultar tareas y sus estados.

**Alcance incluido:**

- Implementar `AppShell` o layout principal.
- Implementar `TaskSummary`.
- Implementar `TaskList`.
- Implementar `TaskItem`.
- Implementar estado vacio.
- Anadir acciones visibles para completar, editar y eliminar.

**Archivos o carpetas previsibles a modificar:**

- `src/features/tasks/TaskPage.tsx`
- `src/features/tasks/components/TaskSummary.tsx`
- `src/features/tasks/components/TaskList.tsx`
- `src/features/tasks/components/TaskItem.tsx`
- `src/features/tasks/components/IceScore.tsx`
- `src/shared/components`

**Criterios de aceptacion:**

- La pantalla muestra resumen de pendientes y completadas.
- El listado muestra tareas ordenadas por ICE.
- Cada tarea muestra estado, valores ICE y acciones principales.
- El estado vacio se ve correctamente cuando no hay tareas.

**Dependencias:** Tareas 1 y 2.

## 4. Implementar formulario de creacion y edicion manual

**Objetivo:** Permitir crear y editar tareas con valores ICE introducidos por el usuario.

**Alcance incluido:**

- Implementar `TaskFormDialog`.
- Anadir campos de titulo, descripcion, impacto, confianza y facilidad.
- Validar titulo obligatorio.
- Validar valores ICE entre 1 y 10.
- Usar valores por defecto 5, 5 y 5.
- Conectar crear y editar con el estado local.

**Archivos o carpetas previsibles a modificar:**

- `src/features/tasks/components/TaskFormDialog.tsx`
- `src/features/tasks/components/TaskForm.tsx`
- `src/features/tasks/hooks/useTaskForm.ts`
- `src/features/tasks/TaskPage.tsx`
- `src/features/tasks/types`

**Criterios de aceptacion:**

- El usuario puede abrir el formulario desde el FAB de crear tarea.
- No se puede guardar una tarea sin titulo.
- El usuario puede guardar una tarea con ICE manual.
- El usuario puede editar titulo, descripcion y valores ICE.
- El listado se actualiza y reordena tras guardar.

**Dependencias:** Tareas 2 y 3.

## 5. Completar flujo de sugerencia ICE con IA

**Objetivo:** Integrar la sugerencia ICE por IA y dejar completo el flujo principal de creacion.

**Alcance incluido:**

- Crear servicio `suggestIceScore`.
- Leer configuracion desde variable `VITE_*`.
- Implementar `AiSuggestionPanel`.
- Mostrar carga al solicitar sugerencia.
- Validar respuesta JSON y rangos 1 a 10.
- Mostrar razon breve de la IA.
- Permitir aceptar sugerencia o editar manualmente.
- Mostrar resumen de tarea confirmada.

**Archivos o carpetas previsibles a modificar:**

- `src/features/tasks/api/suggestIceScore.ts`
- `src/features/tasks/components/AiSuggestionPanel.tsx`
- `src/features/tasks/components/TaskConfirmationSummary.tsx`
- `src/features/tasks/components/TaskFormDialog.tsx`
- `src/features/tasks/hooks/useTaskForm.ts`
- `src/features/tasks/types`

**Criterios de aceptacion:**

- El usuario crea una tarea desde la entrada a la app hasta la confirmacion.
- La accion "Sugerir ICE" llama a la API solo bajo demanda.
- Durante la llamada se muestra estado de carga.
- Si la respuesta es valida, se rellenan impacto, confianza, facilidad y razon.
- Si la API falla, se muestra error simple y el usuario puede continuar manualmente.
- La tarea confirmada aparece en el listado ordenado por ICE.

**Dependencias:** Tareas 1, 2, 3 y 4.
