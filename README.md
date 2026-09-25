# 📚 Trabajo Práctico N°2: CMS y Frameworks Web

Repositorio oficial correspondiente al desarrollo, documentación y código del **Trabajo Práctico N°2** de la asignatura **Framework e Interoperabilidad** — Tecnicatura Universitaria en Desarrollo Web (Universidad Nacional del Comahue).

---

## 👥 Equipo: Grupo 1 - NoCode

| Integrante | Legajo | Rol / Rama |
| :--- | :--- | :--- |
| **Abril Gavilan** | FAI-5163 | `feature/abril` |
| **Daniela Oñatibia** | FAI-4775 | `feature/dani` |
| **Erick Gonzalez** | FAI-3433 | `feature/erick` |

---

## 🎯 Objetivos del Trabajo Práctico

1. **Investigación y Selección Tecnológica:** Analizar y fundamentar la elección de un Framework Backend, un Headless CMS y un ecosistema Frontend/UI acorde al proyecto final (**"ExpertoYa"**).
2. **Implementación de Template Base:** Configurar y desplegar un template base inicial (responsivo, accesible y sin alteraciones visuales) para documentar el estado "antes" previo a la personalización de identidad corporativa.
3. **Gestión Ágil y Repositorio:** Coordinar el flujo de trabajo mediante un tablero Kanban y buenas prácticas colaborativas en Git (ramas por funcionalidad y revisiones de código).

---

## 🛠️ Stack Tecnológico Seleccionado

| Capa / Módulo | Tecnología Elegida | Justificación Técnica |
| :--- | :--- | :--- |
| **Framework Backend** | **Express.js** | Arquitectura minimalista, integración nativa con Node.js y óptimo manejo asíncrono para WebSockets y APIs. |
| **Headless CMS** | **Strapi** | Homogeneidad en JavaScript/TypeScript, panel intuitivo y exposición de API REST/GraphQL desacoplada. |
| **Framework Frontend** | **React + TypeScript (Vite)** | Renderizado reactivo basado en componentes, tipado estático para flujos transaccionales y HMR ultrarrápido. |
| **Framework CSS** | **Tailwind CSS** | Paradigma *utility-first*, compilador JIT que elimina CSS muerto y control granular del diseño. |
| **Sistema de UI** | **Shadcn/ui + Radix UI** | Primitivas *headless* con accesibilidad total (WAI-ARIA) y soberanía absoluta del código fuente. |

> 📄 **Documentación técnica formal disponible en `/docs`:**
> - [Justificación Backend & CMS (Express.js / Strapi)](./docs/justificacion_tecnica.md)
> - [Justificación Frontend & UI (React / Tailwind / Shadcn)](./docs/justificacion_tecnica_frontend-iu.MD)

---

## 📂 Estructura del Proyecto

```text
├── docs/
│   ├── capturas_base/                        # Evidencia gráfica del entorno y template original
│   │   ├── framework_react_vacio.jpeg
│   │   ├── template_base_shadcn_001.jpeg
│   │   └── template_base_shadcn_002.jpeg
│   ├── justificacion_tecnica.md              # Informe técnico Backend & CMS
│   └── justificacion_tecnica_frontend-iu.MD  # Informe técnico Frontend & UI
├── src/
│   ├── components/
│   │   └── ui/                               # Componentes atómicos desacoplados de Shadcn
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── label.tsx
│   ├── lib/
│   │   └── utils.ts                          # Utilidad cn() (clsx + tailwind-merge)
│   ├── App.tsx                               # Layout del wireframe base (Navbar, Cards, Form)
│   ├── index.css                             # Directivas Tailwind y tokens del sistema de diseño
│   └── main.tsx                              # Punto de entrada de la aplicación React
├── components.json                           # Configuración del CLI de Shadcn/ui
├── tailwind.config.js                        # Tokens de colores, bordes y temas de Tailwind
├── tsconfig.json                             # Configuración y path aliases (@/*) de TypeScript
└── vite.config.ts                            # Configuración de compilación y bundling de Vite
```

---

## 🚀 Guía de Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina:

### 1. Requisitos Previos
* **Node.js** (v18.0.0 o superior recomendada)
* **npm** (incluido con Node.js) o gestor de paquetes compatible

### 2. Clonar el Repositorio
```bash
git clone https://github.com/DevEriik/TP-Nro2-FI--CMS-Framework-NO-CODE-.git
cd TP-Nro2-FI--CMS-Framework-NO-CODE-
```

### 3. Instalar Dependencias
Instala los paquetes del proyecto:
```bash
npm install
```

### 4. Iniciar el Servidor de Desarrollo
Ejecuta el entorno local con Vite:
```bash
npm run dev
```

Una vez iniciado, abre tu navegador en:
👉 **`http://localhost:5173/`**

### 5. Compilación para Producción (Build)
Para verificar tipos y compilar el bundle final:
```bash
npm run build
```

---

## 🎨 Actividad 2: Implementación de Template CSS

* **Template base seleccionado:** Shadcn/ui (Preset Neutro / Radix UI) sobre Tailwind CSS.
* **Dominio asociado:** "ExpertoYa" (Plataforma transaccional para contratación de oficios y servicios profesionales).
* **Estado actual:** Wireframe / Template base limpio implementado en `App.tsx` con componentes nativos de la paleta neutra (grises/zinc), preservado sin modificaciones estilísticas para la comparativa formal.

> 📸 **Evidencias gráficas:** Las capturas del estado "puro" antes de aplicar la identidad gráfica se encuentran en la carpeta [`/docs/capturas_base`](./docs/capturas_base).

---

## 📊 Tablero de Trabajo (Kanban)

El progreso, la asignación de tareas por integrante y el seguimiento de *user stories* se gestionan en tiempo real en nuestro tablero colaborativo:
🔗 **[GitHub Projects - Tablero Grupo 1 NoCode](https://github.com/users/DevEriik/projects/4/views/1)**
