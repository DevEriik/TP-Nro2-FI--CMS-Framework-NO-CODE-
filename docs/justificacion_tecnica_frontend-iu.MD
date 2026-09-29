# Justificación Técnica (Frontend y UI)

## 1. Fundamentación de la Elección (Frontend y UI)

Para el desarrollo del cliente web de **ExpertoYa** —plataforma orientada a la contratación y cotización de servicios y oficios profesionales con flujos transaccionales críticos— se ha diseñado un ecosistema frontend que garantiza escalabilidad, rendimiento óptimo, accesibilidad universal y control absoluto del código fuente.

### Framework Frontend: React + TypeScript
La selección de **React** como librería/framework de interfaz de usuario se fundamenta en su arquitectura basada en componentes desacoplados y reutilizables, respaldada por un motor de reconciliación eficiente (Virtual DOM). Esto permite segmentar pantallas complejas (paneles de administración, cotizadores dinámicos, mensajería y pasarelas de contratación) en unidades atómicas con estados encapsulados.
* **Tipado Estático y Robustez con TypeScript:** En una plataforma transaccional donde convergen múltiples roles (clientes, prestadores y administradores), el manejo riguroso de modelos de datos (contratos de cotización, transacciones financieras y estados de verificación) es crítico. TypeScript proporciona tipado estático en tiempo de compilación, detección temprana de regresiones y auto-documentación de interfaces que mitigan drásticamente errores en tiempo de ejecución (`runtime errors`), garantizando sincronía exacta con los contratos de API provistos por Express.js y Strapi.
* **Ecosistema y Rendimiento:** La integración sobre **Vite** garantiza tiempos de compilación instantáneos mediante Hot Module Replacement (HMR) nativo sobre ES Modules, maximizando la productividad del equipo y reduciendo los tiempos de entrega.

### Framework CSS: Tailwind CSS
Se adoptó **Tailwind CSS** como motor de estilos bajo el paradigma *utility-first*.
* **Eliminación de Código CSS Muerto (*Tree-shaking*):** A diferencia de las metodologías tradicionales donde los archivos CSS crecen indefinidamente a medida que la aplicación escala, el compilador JIT (*Just-In-Time*) de Tailwind analiza el código fuente y genera estrictamente las clases utilitarias utilizadas. Esto resulta en hojas de estilo finales minúsculas (habitualmente inferiores a 20 KB gzippeadas), optimizando métricas vitales de Core Web Vitals como First Contentful Paint (FCP) y Largest Contentful Paint (LCP).
* **Consistencia y Mantenibilidad:** La centralización del sistema de tokens (espaciados, tipografías, paletas de color y puntos de quiebre responsivos) dentro del archivo de configuración previene discrepancias visuales y colisiones en la cascada global de CSS, eliminando la sobrecarga de metodologías complejas como BEM.

### Sistema de Componentes: Shadcn/ui + Radix UI
En lugar de adoptar librerías empaquetadas monolíticas, se optó por la arquitectura desacoplada de **Shadcn/ui** construida sobre las primitivas *headless* de **Radix UI**.
* **Accesibilidad Nativa Estricta (WAI-ARIA):** Radix UI implementa el estándar WAI-ARIA en cada uno de sus elementos primitivos (modales, diálogos de confirmación, menús desplegables y acordiones). Gestiona de forma automática y transparente la navegación por teclado (`Focus Management`), trampas de foco (`Focus Trapping`) y roles semánticos para lectores de pantalla, garantizando que ExpertoYa sea una plataforma 100% inclusiva y accesible por diseño.
* **Control Absoluto del Código Fuente (*Code Ownership*):** Shadcn/ui no se distribuye como una dependencia externa de `node_modules` que actúa como caja negra; los componentes se generan directamente dentro de la base de código del proyecto (`src/components/ui`). Esto otorga soberanía total a los desarrolladores para extender la funcionalidad, refactorizar estilos con Tailwind CSS y ajustar la interacción sin recurrir a hackeos de CSS o redefiniciones forzadas.

---

## 2. Análisis de Descarte (Frontend)

Durante la etapa de definición de la arquitectura cliente, se evaluaron y desestimaron las siguientes alternativas tecnológicas:

* **Bootstrap / jQuery:**
  * **Motivo de Descarte:** Bootstrap impone una arquitectura monolítica con un volumen significativo de CSS preestablecido que incrementa innecesariamente el peso del bundle. Sus componentes presentan líneas estéticas genéricas y ampliamente identificables, cuya sobrescritura requiere selectores con alta especificidad o el uso nocivo de `!important`. Por su parte, **jQuery** promueve la manipulación imperativa directa del DOM, lo cual colisiona conceptualmente y degrada el modelo declarativo de renderizado y reconciliación de React.

* **Material UI (MUI):**
  * **Motivo de Descarte:** Si bien es un ecosistema maduro y completo, MUI se encuentra fuertemente acoplado a las directrices de diseño de Google (*Material Design*). Desvincular sus componentes de esa identidad visual para plasmar la imagen de marca propia de *ExpertoYa* requiere anular complejas capas de tematización. Adicionalmente, su motor de estilizado basado en CSS-in-JS introduce una penalización perceptible en el rendimiento del renderizado en cliente y un incremento sustancial en el tamaño final de la aplicación.

* **Templates CSS prearmados (HTML5 UP, ThemeWagon):**
  * **Motivo de Descarte:** Estas plantillas proveen código HTML/CSS estático a menudo ofuscado, no modular y fuertemente dependiente de scripts desactualizados en JavaScript vanilla o librerías heredadas. Carecen de soporte para el ciclo de vida y la gestión reactiva de estados complejos en React (como validación asíncrona de formularios, ventanas modales interactivas o flujos de cotización en tiempo real). Finalmente, no garantizan el cumplimiento estricto de los estándares de accesibilidad WAI-ARIA, lo que comprometería la calidad técnica y la mantenibilidad a largo plazo de la plataforma.
