# Guia tecnica de desarrollo


## Estructura de carpetas

- [ ] `src/app`: providers, tema y composicion raiz.

- [ ] `src/features/tasks`: dominio completo del gestor de tareas.

- [ ] `src/features/tasks/components`: componentes ligados a tareas.

- [ ] `src/features/tasks/hooks`: estado y casos de uso locales.

- [ ] `src/features/tasks/api`: llamadas a APIs externas.

- [ ] `src/features/tasks/types`: `Task`, `IceScore` y DTOs.

- [ ] `src/shared/components`: UI sin conocimiento del dominio.

- [ ] `src/shared/utils`: funciones puras sin React.

- [ ] `src/shared/constants`: valores estables y opciones de UI.

- [ ] `src/styles`: tema Material y ajustes globales.


## Convenciones de nombres

| Elemento | Convencion | Regla |
| --- | --- | --- |
| Componentes | `PascalCase` | Un componente por archivo. |
| Hooks | `useCamelCase` | Empiezan siempre por `use`. |
| Tipos | `PascalCase` | Sin prefijo `I`. |
| Props | `ComponentNameProps` | Se declaran cerca del componente. |
| Servicios API | `camelCaseApi` | Exponen funciones asincronas. |
| Utilidades | `camelCase` | Nombran una accion o calculo. |
| Constantes | `SCREAMING_SNAKE_CASE` | Solo valores verdaderamente fijos. |
| Archivos de componente | `ComponentName.tsx` | Coinciden con el componente principal. |
| Archivos no visuales | `camelCase.ts` | Hooks, utils, api y mappers. |
| Eventos | `handleAction` | Nombran la intencion del usuario. |


## Organizacion de componentes con sus responsabilidades

| Componente | Responsabilidad | Regla |
| --- | --- | --- |
| `App` | Composicion raiz | No contiene logica de dominio extensa. |
| `TaskPage` | Pantalla principal | Orquesta formulario, lista y estado. |
| `TaskForm` | Alta y edicion | Controla inputs y validacion local. |
| `TaskList` | Listado | Recibe tareas ya ordenadas. |
| `TaskItem` | Fila o tarjeta | Expone acciones de una tarea. |
| `IceScore` | Puntuacion | Muestra impacto, confianza, facilidad y total. |
| `TaskSummary` | Totales | Muestra pendientes y completadas. |
| `ErrorMessage` | Error visible | Muestra textos de error reutilizables. |
| `LoadingButton` | Accion con carga | Evita duplicar estados de carga. |
| `MaterialThemeProvider` | Tema | Centraliza Material Design. |


## Uso de hooks

- [ ] Usar `useState` para formularios, carga y errores locales.

- [ ] Usar `useReducer` si las acciones de tareas crecen.

- [ ] Usar `useMemo` para orden ICE y contadores calculados.

- [ ] Usar `useCallback` solo con callbacks pasados o dependencias inestables.

- [ ] Usar `useEffect` solo para efectos externos.

- [ ] Crear hooks propios para logica repetida o de dominio.

- [ ] Mantener dependencias exhaustivas en hooks.

- [ ] Devolver datos, acciones y estados desde hooks propios.

- [ ] Validar formularios cerca del formulario.

- [ ] Limpiar timers, aborts o suscripciones.


## Gestion del estado

- [ ] Mantener tareas en estado local de React.

- [ ] No usar store global para el MVP.

- [ ] No usar `localStorage`, `sessionStorage` ni DB.

- [ ] Mantener el formulario como estado local.

- [ ] Usar `editingTaskId` para el modo edicion.

- [ ] Calcular ICE total como valor derivado.

- [ ] Ordenar por ICE descendente como valor derivado.

- [ ] Separar carga IA de otros estados de carga.

- [ ] Separar error IA y permitir continuar manualmente.

- [ ] Actualizar arrays y objetos de forma inmutable.


## Gestion de llamadas API

| Tema | Decision | Regla |
| --- | --- | --- |
| Ubicacion | `features/tasks/api` | Ninguna llamada API dentro de componentes. |
| Funcion | `suggestIceScore` | Recibe titulo y descripcion. |
| Configuracion | `.env` de Vite | Usar variables `VITE_*`. |
| Clave API | Solo demo | No tratar el cliente como entorno seguro. |
| Peticion | Bajo demanda | Llamar solo al pulsar sugerir ICE. |
| Respuesta | DTO validado | Aceptar solo JSON esperado. |
| Rangos | 1 a 10 | Normalizar o rechazar valores invalidos. |
| Abortado | `AbortController` | Cancelar si el componente se desmonta. |
| Timeouts | Cortos | Evitar cargas indefinidas. |
| Mappers | Separados | Convertir DTOs fuera de la UI. |


## Manejo de errores y cargas

| Caso | Decision | Regla |
| --- | --- | --- |
| Carga IA | Indicador visible | Deshabilitar solo la accion afectada. |
| Error API | Mensaje simple | No bloquear el uso manual. |
| Error validacion | Inline | Mostrar junto al campo afectado. |
| Error inesperado | Generico | Evitar detalles tecnicos al usuario. |
| Reintento | Manual | Permitir volver a pulsar sugerir ICE. |
| Estado vacio | Amable | Mostrar lista vacia sin error. |
| Botones | Estados claros | Usar disabled y loading de Material. |
| Formularios | Sin perdida | No borrar datos si falla la IA. |
| Logs | Desarrollo | Usar logs solo durante depuracion. |
| Fallback | Manual | ICE siempre editable por el usuario. |


## Librerias aprobadas

| Libreria | Uso aprobado | Regla |
| --- | --- | --- |
| `react` | UI | Base de componentes y hooks. |
| `react-dom` | Render | Montaje de la aplicacion. |
| `typescript` | Tipado | Tipar dominio, props y servicios. |
| `vite` | Build | Desarrollo y variables `VITE_*`. |
| `@mui/material` | Material Design | Componentes visuales principales. |
| `@mui/icons-material` | Iconos | Acciones comunes de Material. |
| `@emotion/react` | Estilos MUI | Requerida por Material UI. |
| `@emotion/styled` | Estilos MUI | Requerida por Material UI. |
| `uuid` | IDs | Solo si no se usa `crypto.randomUUID`. |
| `zod` | Validacion externa | Solo para validar respuestas API. |
