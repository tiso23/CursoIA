# Alcance funcional MVP: Gestor de Tareas Inteligente con modelo ICE

Fecha: 9 de junio de 2026

## 1. Objetivo del MVP

Crear una aplicacion web simple en React para gestionar tareas tipo ToDo y priorizarlas mediante el modelo ICE. El usuario podra escribir una descripcion de una tarea y solicitar a una API de IA gratuita una propuesta automatica de puntuacion ICE.

El MVP esta pensado para un curso de React, por lo que debe priorizar claridad, componentes sencillos, estado local y una experiencia facil de entender antes que arquitectura avanzada.

## 2. Alcance incluido

### 2.1 Gestion basica de tareas

El usuario podra:

- Crear una tarea con titulo obligatorio.
- Anadir una descripcion opcional.
- Ver el listado de tareas creadas.
- Marcar una tarea como pendiente o completada.
- Editar titulo, descripcion y valores ICE.
- Eliminar una tarea.
- Ver el total de tareas pendientes y completadas.

### 2.2 Priorizacion con modelo ICE

Cada tarea tendra tres valores numericos:

- Impacto: valor de 1 a 10 que representa el beneficio o importancia de completar la tarea.
- Confianza: valor de 1 a 10 que representa la seguridad sobre el impacto estimado.
- Facilidad: valor de 1 a 10 que representa lo sencillo que sera completar la tarea.

La puntuacion ICE se calculara con la formula:

```text
ICE = Impacto * Confianza * Facilidad
```

El listado de tareas se mostrara ordenado por puntuacion ICE descendente, de forma que las tareas mas prioritarias aparezcan primero.

### 2.3 Calculo inteligente de ICE con IA

El usuario podra pulsar un boton para que la aplicacion sugiera los valores de Impacto, Confianza y Facilidad a partir del titulo y la descripcion de la tarea.

Para mantener el desarrollo simple, se propone usar Gemini Developer API con un modelo disponible en capa gratuita, por ejemplo `gemini-3.1-flash-lite` o el modelo gratuito vigente en el momento de implementar el curso.

La respuesta esperada de la IA debera tener un formato JSON simple:

```json
{
  "impact": 8,
  "confidence": 7,
  "ease": 6,
  "reason": "La tarea parece importante, relativamente clara y de dificultad media."
}
```

La aplicacion usara esos valores para rellenar los campos ICE de la tarea. El usuario siempre podra modificarlos manualmente.

### 2.4 Interfaz minima

La aplicacion tendra una unica pantalla principal con:

- Formulario para crear o editar tareas.
- Campo de titulo.
- Campo de descripcion.
- Controles numericos para Impacto, Confianza y Facilidad.
- Boton para calcular ICE con IA.
- Listado de tareas ordenado por ICE.
- Acciones por tarea: completar, editar y eliminar.
- Indicadores visuales simples para estado e ICE.

### 2.5 Estado local

No se requiere persistencia. Las tareas viven solo en memoria durante la sesion de uso.

Al recargar la pagina, las tareas pueden perderse. No se usara base de datos, `localStorage`, `sessionStorage` ni `IndexedDB`.

## 3. Alcance excluido

El MVP no incluye:

- Backend.
- Autenticacion.
- Persistencia real en base de datos.
- Persistencia local en navegador.
- Paginacion.
- Multiusuario.
- Tags o etiquetas.
- Roles o permisos.
- Subtareas.
- Fechas limite.
- Notificaciones.
- Adjuntos.
- Busqueda avanzada.
- Drag and drop.
- Sincronizacion entre dispositivos.
- Perfil de usuario o pantallas de cuenta.

## 4. Requisitos funcionales

### RF-01 Crear tarea

El usuario podra crear una tarea introduciendo al menos un titulo.

Criterios de aceptacion:

- Si el titulo esta vacio, se muestra una validacion.
- Al crear la tarea, se anade al listado.
- Si no se indican valores ICE, se pueden usar valores por defecto: Impacto 5, Confianza 5 y Facilidad 5.

### RF-02 Editar tarea

El usuario podra editar una tarea existente.

Criterios de aceptacion:

- Se cargan los datos actuales en el formulario.
- Al guardar, se actualiza la tarea en el listado.
- La puntuacion ICE se recalcula automaticamente.

### RF-03 Completar tarea

El usuario podra cambiar el estado de una tarea entre pendiente y completada.

Criterios de aceptacion:

- El estado se refleja visualmente en el listado.
- Una tarea completada sigue visible en el MVP.

### RF-04 Eliminar tarea

El usuario podra eliminar una tarea del listado.

Criterios de aceptacion:

- La tarea desaparece del listado.
- No se requiere confirmacion modal para mantener el MVP simple.

### RF-05 Calcular ICE manualmente

El usuario podra modificar manualmente Impacto, Confianza y Facilidad.

Criterios de aceptacion:

- Cada valor debe estar entre 1 y 10.
- La puntuacion ICE se recalcula al cambiar cualquier valor.

### RF-06 Sugerir ICE con IA

El usuario podra solicitar una sugerencia ICE usando una API de IA gratuita.

Criterios de aceptacion:

- La aplicacion envia titulo y descripcion a la API.
- Mientras se calcula, se muestra un estado de carga.
- Si la API responde correctamente, se actualizan Impacto, Confianza y Facilidad.
- Si la API falla, se muestra un mensaje de error simple y el usuario puede continuar con calculo manual.
- La explicacion de la IA puede mostrarse como texto breve dentro de la tarea o debajo del formulario.

### RF-07 Ordenar por prioridad

El listado de tareas se ordenara automaticamente por ICE descendente.

Criterios de aceptacion:

- Las tareas con mayor ICE aparecen primero.
- El orden se actualiza tras crear, editar o recalcular ICE.

## 5. Requisitos no funcionales

- No debe requerir backend propio.
- No debe requerir base de datos.
- La logica debe ser comprensible para estudiantes de React.
- La interfaz debe ser responsive de forma basica.
- Los errores de la API deben manejarse sin romper la aplicacion.

## 6. Integracion con API de IA

Como no hay backend, la llamada a la API se realizara desde el frontend. Para un curso es aceptable como demo, pero debe explicarse que no es una practica segura para produccion porque la clave de API queda expuesta en el navegador.

Restricciones recomendadas para mantenerlo simple:

- Hacer una llamada solo cuando el usuario pulse el boton.
- No calcular ICE automaticamente en cada cambio de texto.
- Pedir siempre JSON como respuesta.
- Validar que los valores recibidos esten entre 1 y 10.
- Si la IA devuelve un formato invalido, mostrar error y permitir entrada manual.

## 7. Flujo principal de usuario

1. El usuario escribe el titulo de la tarea.
2. El usuario anade una descripcion opcional.
3. El usuario puede introducir valores ICE manualmente o pulsar "Sugerir ICE".
4. Si usa IA, la aplicacion obtiene Impacto, Confianza y Facilidad.
5. El usuario anade la tarea al estado local en memoria.
6. La tarea aparece en el listado ordenada por ICE.
7. El usuario puede completar, editar o eliminar la tarea.

## 8. Pantallas del MVP

El MVP solo necesita una pantalla:

- Vista principal del gestor de tareas.

No se incluyen rutas, dashboard avanzado ni pantallas de usuario.

## 9. Riesgos y consideraciones

- Las APIs gratuitas pueden cambiar limites, modelos disponibles o condiciones de uso.
- En una app sin backend, la API key queda visible en el cliente.
- La IA puede devolver valores poco precisos, por lo que el usuario debe poder editarlos.
- Para evitar complejidad, no se debe intentar resolver persistencia, usuarios ni historiales.

## 10. Criterio de finalizacion del MVP

El MVP se considera terminado cuando:

- Se pueden crear, editar, completar y eliminar tareas.
- Cada tarea calcula correctamente su ICE.
- El listado se ordena por ICE descendente.
- Se puede solicitar una sugerencia ICE mediante IA.
- La aplicacion gestiona carga y errores de la API.
- No existe backend, autenticacion, persistencia, paginacion, multiusuario ni tags.

## 11. Referencias

- Gemini Developer API Pricing: https://ai.google.dev/gemini-api/docs/pricing
- Gemini API Rate Limits: https://ai.google.dev/gemini-api/docs/rate-limits
