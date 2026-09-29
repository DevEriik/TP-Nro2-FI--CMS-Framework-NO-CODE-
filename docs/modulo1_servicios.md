# Reporte Técnico: Módulo 1 - Catálogo de Servicios

**Responsable:** Erick Gonzalez
**Rama:** `feature/erick`

## 1. Descripción y Funcionamiento del Módulo
El "Módulo 1" es el componente central de **ExpertoYa** encargado de gestionar el Catálogo de Servicios. Su función principal es permitir la lectura y creación de publicaciones de oficios (plomería, gasista, electricidad, etc.).

Actualmente, el módulo opera bajo una arquitectura RESTful exponiendo dos *endpoints* clave:
- **`GET /api/servicios`**: Retorna el listado completo de los servicios publicados, listos para ser renderizados por el cliente frontend (React/React Native).
- **`POST /api/servicios`**: Recibe un payload JSON con la información de un nuevo servicio (categoría, descripción, profesional y precio) y lo registra en el sistema, retornando un código de estado `201 Created`.

## 2. Herramientas y Librerías de Terceros Utilizadas

Para la construcción de este módulo utilizando el ecosistema Node.js, se instalaron las siguientes dependencias, cada una con un propósito específico en la arquitectura:

1. **`express` (v4.x)**
   - **Propósito:** Es el framework minimalista utilizado para levantar el servidor HTTP y definir el enrutamiento de la API REST de forma ágil y estructurada.

2. **`cors`**
   - **Propósito:** Middleware fundamental de seguridad. Habilita el *Cross-Origin Resource Sharing*, permitiendo que nuestra aplicación frontend (que correrá en un puerto o dominio distinto) pueda realizar peticiones a esta API sin ser bloqueada por las políticas del navegador.

3. **`dotenv`**
   - **Propósito:** Gestor de variables de entorno. Permite mantener parámetros de configuración (como el puerto de ejecución o, a futuro, credenciales de la base de datos Supabase) fuera del código fuente mediante un archivo `.env`, mejorando la seguridad del repositorio.

4. **`nodemon`** *(Dependencia de Desarrollo)*
   - **Propósito:** Herramienta que monitorea los archivos del proyecto y reinicia automáticamente el servidor Node.js al detectar cambios. Agiliza drásticamente el proceso de desarrollo local.
