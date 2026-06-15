# AGENTS.md

## Proposito del proyecto

- Este proyecto es una aplicacion web de gestion de tareas con priorizacion ICE.
- El objetivo es un MVP didactico para un curso de React.
- Prioriza claridad, simplicidad y facilidad de aprendizaje sobre arquitectura avanzada.
- Mantén las decisiones alineadas con la documentacion de `docs/`.
- No conviertas tareas temporales de implementacion en reglas permanentes.

## Stack permitido

- Usa React para la interfaz.
- Usa TypeScript para tipar dominio, props, hooks, utilidades y servicios.
- Usa Vite como herramienta de desarrollo y build.
- Usa Material UI como sistema visual principal.
- Usa `@mui/icons-material` para iconos de acciones comunes.
- Usa `@emotion/react` y `@emotion/styled` solo como soporte de Material UI.
- Usa `zod` solo para validar respuestas externas si aporta claridad.
- Usa `uuid` solo si no se usa `crypto.randomUUID`.
- No añadas dependencias nuevas sin una razon explicitamente justificada por el proyecto.

## Alcance funcional estable

- La aplicacion tiene una unica pantalla principal del gestor de tareas.
- No introduzcas rutas, dashboards avanzados ni pantallas de usuario.
- Permite crear tareas con titulo obligatorio.
- Permite descripcion opcional.
- Permite listar tareas creadas.
- Permite editar titulo, descripcion y valores ICE.
- Permite alternar tareas entre pendiente y completada.
- Permite eliminar tareas sin requerir confirmacion modal.
- Muestra totales de tareas pendientes y completadas.
- Mantén visibles las tareas completadas.
- Muestra estados vacios sin tratarlos como error.

## Fuera de alcance

- No implementes backend propio.
- No implementes autenticacion.
- No implementes base de datos.
- No implementes persistencia local.
- No uses `localStorage`, `sessionStorage` ni `IndexedDB`.
- No implementes paginacion.
- No implementes multiusuario.
- No implementes roles ni permisos.
- No implementes tags, subtareas, adjuntos ni fechas limite.
- No implementes notificaciones.
- No implementes busqueda avanzada.
- No implementes drag and drop.
- No implementes sincronizacion entre dispositivos.
- No implementes perfil de usuario.

## Modelo de dominio

- Representa cada tarea con titulo, descripcion opcional, estado y puntuacion ICE.
- Modela el estado de tarea como pendiente o completada.
- Modela ICE con impacto, confianza, facilidad y total calculado.
- Los valores de impacto, confianza y facilidad deben estar entre 1 y 10.
- Usa valores por defecto 5, 5 y 5 cuando no haya valores ICE introducidos.
- Calcula el total ICE como `impacto * confianza * facilidad`.
- Trata el total ICE como valor derivado, no como dato editable independiente.
- Ordena el listado por ICE descendente.
- Reordena tras crear, editar o recalcular ICE.
- Permite que el usuario modifique manualmente cualquier sugerencia de IA.

## Estado

- Mantén las tareas en estado local de React.
- Mantén el formulario como estado local.
- Usa `editingTaskId` o equivalente claro para distinguir edicion de creacion.
- No uses store global para el MVP.
- Actualiza arrays y objetos de forma inmutable.
- Usa `useState` para formularios, carga y errores locales.
- Usa `useReducer` solo si las acciones de tareas crecen y mejora la claridad.
- Usa `useMemo` para ordenaciones y contadores derivados cuando evite recalculo innecesario.
- Usa `useCallback` solo para callbacks pasados a componentes o dependencias inestables.
- Usa `useEffect` solo para efectos externos.
- Mantén dependencias exhaustivas en hooks.
- Limpia timers, aborts y suscripciones cuando existan.

## Estructura de carpetas

- Coloca providers, tema y composicion raiz en `src/app`.
- Coloca el dominio completo de tareas en `src/features/tasks`.
- Coloca componentes de tareas en `src/features/tasks/components`.
- Coloca hooks de tareas en `src/features/tasks/hooks`.
- Coloca llamadas externas de tareas en `src/features/tasks/api`.
- Coloca tipos de tareas en `src/features/tasks/types`.
- Coloca componentes UI sin dominio en `src/shared/components`.
- Coloca funciones puras sin React en `src/shared/utils`.
- Coloca valores estables y opciones de UI en `src/shared/constants`.
- Coloca tema Material y ajustes globales en `src/styles`.

## Componentes esperados

- `App` compone la raiz y no contiene logica extensa de dominio.
- `MaterialThemeProvider` centraliza el tema Material.
- `TaskPage` orquesta formulario, listado y estado de la pantalla principal.
- `TaskSummary` muestra pendientes y completadas.
- `TaskList` recibe tareas ya ordenadas.
- `TaskItem` expone acciones de una tarea.
- `TaskForm` o `TaskFormDialog` gestiona alta y edicion.
- `IceScore` muestra impacto, confianza, facilidad y total.
- `AiSuggestionPanel` muestra la sugerencia IA y sus estados.
- `TaskConfirmationSummary` muestra el resumen tras confirmar una tarea.
- `ErrorMessage` muestra errores reutilizables.
- `LoadingButton` evita duplicar estados de carga.
- Componentes compartidos no deben conocer el dominio de tareas.

## Nombres y archivos

- Usa `PascalCase` para componentes y tipos.
- Usa `useCamelCase` para hooks.
- Usa `ComponentNameProps` para props declaradas cerca del componente.
- Usa `camelCaseApi` para servicios API.
- Usa `camelCase` para utilidades.
- Usa `SCREAMING_SNAKE_CASE` solo para constantes verdaderamente fijas.
- Usa `ComponentName.tsx` para archivos de componente.
- Usa `camelCase.ts` para hooks, utils, api y mappers.
- Nombra eventos como `handleAction`, indicando la intencion del usuario.
- No uses prefijo `I` en tipos TypeScript.
- Mantén un componente principal por archivo.

## API de IA

- Ubica llamadas externas en `src/features/tasks/api`.
- No hagas llamadas API desde componentes.
- Implementa la sugerencia como una funcion asincrona `suggestIceScore` o nombre equivalente documentado.
- La sugerencia recibe titulo y descripcion.
- Ejecuta la llamada solo cuando el usuario pulse la accion de sugerir ICE.
- No calcules ICE automaticamente en cada cambio de texto.
- Lee configuracion desde variables `.env` de Vite con prefijo `VITE_*`.
- Considera la clave de API como expuesta en cliente y apta solo para demo.
- Pide una respuesta JSON simple con impacto, confianza, facilidad y razon.
- Valida la forma del JSON recibido antes de usarlo.
- Normaliza o rechaza valores fuera del rango 1 a 10.
- Convierte DTOs fuera de la UI.
- Usa `AbortController` cuando una peticion pueda quedar viva tras desmontar.
- Evita cargas indefinidas con timeouts cortos.

## Errores y cargas

- Muestra indicador visible durante la sugerencia IA.
- Deshabilita solo la accion afectada por la carga IA.
- Separa la carga IA de otros estados de carga.
- Separa el error IA del resto del formulario.
- Si falla la API, muestra un mensaje simple.
- Si falla la API, conserva los datos ya introducidos.
- Si falla la API, permite continuar con calculo manual.
- Permite reintentar manualmente la sugerencia.
- Muestra validaciones inline junto al campo afectado.
- Evita mostrar detalles tecnicos al usuario final.
- Usa logs solo durante depuracion.

## Interfaz

- Usa Material UI como base visual de la aplicacion.
- Mantén una interfaz responsive basica.
- La pantalla principal debe incluir resumen, listado y accion de creacion.
- El listado debe mostrar estado, valores ICE y acciones principales.
- El formulario debe incluir titulo, descripcion, impacto, confianza y facilidad.
- La accion para crear puede representarse con un FAB.
- Las acciones por tarea deben incluir completar, editar y eliminar.
- El panel IA debe mostrar carga, error y revision de sugerencia.
- La razon de IA debe ser breve y visible cuando exista.
- Los textos visibles deben ser simples y orientados al usuario.

## Clean code

- Escribe codigo claro, pequeño y facil de seguir por estudiantes de React.
- Mantén cada funcion y componente con una responsabilidad principal.
- Evita duplicacion cuando una extraccion mejore la lectura.
- No introduzcas abstracciones si no reducen complejidad real.
- Prefiere funciones puras para calculos como ICE, ordenacion y conteos.
- Tipar datos de entrada y salida antes de conectar UI y API.
- Mantén la validacion cerca del formulario cuando sea validacion de usuario.
- Mantén la validacion de respuestas externas cerca del servicio o mapper.
- Añade comentarios solo para decisiones no evidentes.
- No mezcles refactors no pedidos con cambios funcionales.

## Trabajo con Codex

- Antes de una tarea grande, divide el trabajo en subtareas pequeñas y verificables.
- Propón el plan antes de modificar archivos cuando el alcance sea amplio.
- Espera aprobacion del usuario antes de iniciar cambios amplios.
- Mantén una sola subtarea en progreso a la vez.
- Explica decisiones importantes antes de aplicarlas si cambian el alcance.
- Al modificar codigo, respeta la estructura y nombres definidos en este documento.
- Verifica el resultado con las pruebas, build o comandos disponibles del proyecto.
- Si no existe una verificacion automatica, indica claramente la verificacion manual posible.
- No inventes arquitectura no descrita por la documentacion del proyecto.

## Observaciones arquitectonicas

- La documentacion describe una unica pantalla, pero tambien menciona una ruta `/`; no se debe inferir un sistema de rutas avanzado.
- La documentacion menciona `TaskForm` y `TaskFormDialog`; ambos apuntan al mismo flujo de alta y edicion, sin exigir dos formularios distintos.
- La documentacion propone Gemini Developer API como opcion de IA gratuita, pero advierte que modelos y limites pueden cambiar.
