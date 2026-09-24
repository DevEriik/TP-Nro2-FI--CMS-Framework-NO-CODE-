# Justificación Técnica: Selección de Framework y CMS

## 1. Fundamentación de la Elección

Para el desarrollo de la plataforma transaccional e informacional "ExpertoYa", se ha determinado que las tecnologías más adecuadas para satisfacer los requisitos del dominio son **Express.js** (Framework Backend) y **Strapi** (Headless CMS).

### Framework Backend: Express.js
**Express.js** fue seleccionado como el framework principal debido a su arquitectura minimalista y su extrema flexibilidad. Al tratarse de un proyecto desarrollado enteramente en el ecosistema JavaScript/TypeScript, Express permite al equipo construir una API robusta y a medida sin la sobrecarga inicial de frameworks fuertemente opinionados. 
*   **Ventajas técnicas:** Integración nativa con Node.js, excelente rendimiento en operaciones asíncronas I/O (vital para las conexiones en tiempo real del módulo de chat mediante WebSockets) y facilidad extrema para conectar servicios de terceros, como el SDK de Mercado Pago.
*   **Facilidad de implementación:** Su curva de aprendizaje casi nula permite al equipo avanzar rápidamente en la construcción de los *endpoints*, optimizando los tiempos de desarrollo requeridos para el Trabajo Práctico.

### Sistema de Gestión de Contenidos: Strapi
Dado que *ExpertoYa* requiere distribuir datos tanto a una interfaz Web (React) como a una Aplicación Móvil (React Native), la arquitectura exige un enfoque desacoplado (*Headless*). **Strapi** fue seleccionado como el CMS definitivo.
*   **Ventajas técnicas y arquitectura:** Strapi está construido 100% sobre Node.js, lo que mantiene la homogeneidad del *stack* del equipo. Permite definir la estructura de la base de datos relacional desde un panel de control intuitivo y expone automáticamente una API REST (y GraphQL) lista para ser consumida por los clientes frontend. Esto agiliza enormemente la gestión de contenido estático y la moderación de oficios.

---

## 2. Análisis de Descarte

Durante el proceso de evaluación tecnológica, se analizaron y descartaron diversas alternativas del mercado debido a que no se alineaban óptimamente con los requisitos del dominio o el *stack* tecnológico del equipo:

*   **NestJS (Framework Backend):** A pesar de ser una herramienta empresarial con excelente escalabilidad y soporte nativo estricto para TypeScript, fue descartada por su elevada curva de aprendizaje. NestJS impone una arquitectura compleja basada en Inyección de Dependencias, lo que habría introducido un retraso significativo en la fase de codificación del Trabajo Práctico.
*   **Django (Framework Backend):** Se descartó debido a que su núcleo está escrito en Python. Adoptar Django habría obligado al equipo a fragmentar el ecosistema, perdiendo los beneficios de la eficiencia de desarrollar tanto el cliente como el servidor bajo el entorno JavaScript/TypeScript.
*   **WordPress (CMS):** Se desestimó porque su núcleo monolítico está desarrollado en PHP. Si bien es posible configurarlo como *Headless* a través de su API REST, utilizar WordPress para un sistema puramente transaccional (como *ExpertoYa*) añade peso, complejidad y carga innecesaria, alejándose de la arquitectura moderna requerida.
*   **Contentful (CMS):** Fue descartado por tratarse de un servicio en la nube cerrado (SaaS). Esta limitación impide al equipo tener control absoluto sobre la infraestructura local y la base de datos (PostgreSQL/Supabase) requerida para la lógica de la plataforma, además de presentar restricciones operativas en su capa gratuita (*free tier*).
