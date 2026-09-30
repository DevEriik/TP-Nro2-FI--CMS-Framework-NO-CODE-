# Reporte Técnico: Módulo de Sistema de Reseñas / Calificaciones (Closed-Loop)

## 1. Descripción y Características del Módulo

El módulo de Reseñas (Closed-Loop) tiene como propósito fundamental gestionar la reputación de los profesionales dentro de la plataforma **ExpertoYa** mediante un entorno controlado. Su característica de "lazo cerrado" implica que únicamente los clientes que han contratado y finalizado un servicio de manera exitosa a través de la plataforma poseen la autorización para emitir una calificación y comentario. Esto evita reseñas falsas, spam y garantiza un sistema de confianza y transparencia absoluta para todos los usuarios.

A nivel técnico, la lógica de negocio se expone mediante los siguientes endpoints RESTful:

*   **`POST /api/resenas`**: Encargado de registrar una nueva calificación. Antes de persistir en la base de datos, aplica una capa de validación estricta de esquemas. Se encarga de comprobar la legitimidad de los datos de entrada (puntuación del 1 al 5, longitud del comentario) y realiza la vinculación relacional con la solicitud de trabajo (`solicitud_id`), verificando la correspondencia entre el autor (`cliente_id`) y el receptor (`profesional_id`). Tras el registro exitoso, el sistema gatilla el recálculo del promedio de calificación del profesional.
*   **`GET /api/resenas/profesional/:id`**: Responsable de retornar el historial de reseñas recibidas por un profesional determinado. La lógica interna de este endpoint realiza agregaciones (aggregation queries) a nivel de base de datos para entregar de manera óptima tanto el listado paginado de comentarios como el cómputo final actualizado de su promedio histórico (`calificacion_promedio`), preparado para su renderización inmediata en el frontend.

## 2. Plugins, Librerías y Herramientas de Terceros Utilizadas

Para garantizar un desarrollo ágil y mantener un alto estándar de calidad, se integraron diversas herramientas especializadas en ambos extremos de la arquitectura:

**En el Backend (Node.js / Express):**
*   **`express`**: Framework principal que provee la infraestructura de enrutamiento HTTP y gestión de middlewares.
*   **`pg` (node-postgres)**: Cliente nativo de PostgreSQL utilizado para establecer la conexión a la base de datos (Supabase) y ejecutar las consultas SQL de inserción y lectura de reseñas.
*   **`zod`**: Herramienta de validación de esquemas *TypeScript-first*. Se eligió para garantizar que los *payloads* (JSON) recibidos en el endpoint `POST` cumplan estrictamente con las reglas de negocio y los tipos de datos antes de interactuar con la base de datos, previniendo inyecciones o datos corruptos.
*   **`cors`**: Middleware necesario para habilitar políticas de intercambio de recursos de origen cruzado, permitiendo que el frontend (ejecutándose en un puerto distinto durante desarrollo, e.g., Vite en `:5173`) consuma la API sin bloqueos de seguridad del navegador.
*   **`dotenv`**: Empleado para la gestión segura de variables de entorno (cadenas de conexión, puertos), aislando datos sensibles del código fuente.

**En el Frontend (React / Vite):**
*   **`react` / `react-dom`**: Librerías núcleo para la construcción de interfaces de usuario interactivas basadas en componentes funcionales y *hooks* de estado (`useState`, `useEffect`).
*   **`tailwindcss`**: Framework CSS *utility-first* seleccionado para estructurar el diseño responsive y estilar la aplicación sin requerir hojas de estilo externas, acelerando el maquetado.
*   **`lucide-react`**: Colección de íconos vectoriales SVG. Se utiliza para nutrir visualmente la interfaz (las estrellas de calificación interactiva, los íconos de la barra de navegación inferior y los indicadores de éxito/error).
*   **Ecosistema de Componentes UI (Shadcn-like)**: Se integraron micro-librerías como `clsx`, `tailwind-merge` y `class-variance-authority` (`cva`) para la construcción de componentes modulares y reutilizables (Alertas, Botones, Tarjetas), permitiendo manejar de forma declarativa las múltiples variantes de estado, colores y responsividad.

## 3. Decisiones de Implementación y Arquitectura

**Aislamiento y No Interoperabilidad:**
Respetando estrictamente las pautas académicas del Trabajo Práctico N°2, el módulo fue diseñado para ser **100% autónomo y propietario**, evitando deliberadamente cualquier tipo de interoperabilidad con sistemas de terceros (por ejemplo, omitiendo integraciones con APIs externas de reputación tipo Trustpilot o sistemas de autenticación delegada). Todo el ciclo de vida del dato —desde que se emite la calificación en el cliente React, se transfiere vía API REST local y se persiste en la base relacional del proyecto— ocurre dentro de la infraestructura aislada de **ExpertoYa**.

**Persistencia y Lógica de Negocio:**
La arquitectura del backend implementa un patrón MVC modificado (Controladores, Modelos y Rutas separados).
*   **Modelado Relacional**: La persistencia se basa en una tabla principal `RESENIA` que actúa como entidad dependiente. Contiene claves foráneas (`FOREIGN KEY`) hacia `SOLICITUD_TRABAJO` (asegurando el flujo Closed-Loop, ya que no puede existir una reseña sin su solicitud base), así como también claves hacia `CLIENTE` y `PROFESIONAL`.
*   **Flujo del Controlador**: El archivo `resenia.controller.js` orquesta la transacción: primero intercepta la petición, delega la validación de forma a `resenia.schema.js` (Zod), y luego invoca las funciones de acceso a datos (`resenia.model.js`) que insertan el registro vía consultas preparadas para evitar *SQL Injection*, asegurando finalmente la consistencia de la base de datos relacional.

## 4. Integración Visual (UI/UX) y Accesibilidad

Las interfaces `ResenaForm.tsx` y `ResenasList.tsx` fueron diseñadas adoptando de manera íntegra el **Manual de Identidad Visual** de ExpertoYa, garantizando una experiencia cohesiva:
*   **Tipografía**: Se implementó de manera estandarizada la fuente corporativa *Plus Jakarta Sans*, respetando los pesos visuales (bold para nombres de profesionales y títulos de tarjetas, y pesos ligeros para descripciones y comentarios).
*   **Paleta de Colores Corporativa**: Se ha hecho uso estratégico del **Naranja (#FF8C00)** como color primario para los llamados a la acción principales (botón de "Publicar Calificación") y el pintado interactivo de las estrellas (`fill-primary`); el **Teal (#00BFA5)** y el **Índigo (#283593)** para acentuar elementos de la interfaz, junto a fondos claros **Crema (#FDFCF4)** y soporte pleno para **Modo Oscuro** (fondos `#121826` con textos contrastantes).
*   **Mobile-First y Diseño Responsive**: Se integró una barra de navegación inferior (`bottom-navigation`) con diseño anclado y funcionalidad de *Scroll Spy*, reemplazando los menús clásicos y optimizando drásticamente la usabilidad en pantallas móviles. Las tarjetas de reseñas utilizan esquemas `flex-wrap` y `grid` adaptativos para prevenir desbordamientos.
*   **Accesibilidad y Usabilidad**: Para cumplir con el estándar **WCAG AA (contraste > 4.5:1)**, se utilizaron colores semánticos de estado legibles (Verde `#10B981` para éxito, Rojo `#EF4444` para errores). Adicionalmente, se aplicó la técnica de **doble codificación visual**: el sistema nunca comunica información exclusivamente mediante el color; los mensajes de error/éxito y las valoraciones siempre están acompañados de íconos representativos (estrellas, alertas) e indicadores en formato texto (ej. "4 de 5 estrellas"), junto con atributos ARIA para lectores de pantalla.

## 5. Conclusiones del Desarrollo del Módulo

El desarrollo del módulo de reseñas bajo una arquitectura desacoplada (API Express + Cliente React) ha demostrado ser una solución robusta y escalable. La clara separación de responsabilidades permitió focalizar esfuerzos: el frontend pudo iterar rápidamente sobre la experiencia de usuario interactiva y responsiva, mientras que el backend aseguró la integridad referencial y las estrictas validaciones de seguridad con Zod.

Desde una perspectiva de valor de producto, implementar este flujo bajo la metodología *Closed-Loop* representa un pilar fundamental para **ExpertoYa**. Soluciona el problema de la asimetría de información en la contratación de oficios, generando un ecosistema de total transparencia y confianza, donde la reputación de cada profesional se construye exclusivamente sobre la base de trabajos reales y verificables, consolidando así el crecimiento orgánico y seguro de la plataforma.
