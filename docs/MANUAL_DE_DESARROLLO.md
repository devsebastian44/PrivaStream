# 🌌 Manual de Desarrollo - Proyecto PrivaStream

Bienvenido a la guía oficial de **PrivaStream**, una plataforma descentralizada diseñada bajo el concepto de **Soberanía Digital**. Este documento consolida toda la información técnica y operativa necesaria para desarrollar y colaborar en este ecosistema.

---

## 1. 🎯 Visión y Objetivos Principales

PrivaStream es una alternativa para comunidades y profesionales que requieren un espacio seguro para compartir contenido en vivo y mensajería sin vigilancia ni censura.

-   **Privacidad Absoluta**: Transmisiones y chats Peer-to-Peer (P2P) con cifrado de extremo a extremo.
-   **Independencia de la Nube**: El procesamiento y almacenamiento recae en el hardware del usuario (Raspberry Pi, Laptops, etc.), no en servidores centrales.
-   **Eficiencia Técnica**: Uso de protocolos modernos para baja latencia en conexiones domésticas.
-   **Estado Actual**: Fase de definición de arquitectura y desarrollo de MVP.

---

## 2. 📂 Estructura del Proyecto

Para mantener la coherencia y facilitar el despliegue en sistemas Debian/Linux, seguimos esta estructura de directorios:

```text
PrivaStream/
├── backend/                # Lógica del Servidor (Node.js)
│   ├── src/                # Código fuente (controllers, routes, services)
│   ├── config/             # Configuración de red y variables
│   └── storage/            # ALMACENAMIENTO FÍSICO (/data/, videos, audio, etc.)
├── frontend/               # Interfaz de Usuario (React + Vite)
│   ├── src/                # Components, pages, hooks, assets
│   └── public/             # Archivos públicos de la SPA
├── scripts/                # Automatización (install.sh, setup-db.sh)
├── docs/                   # Documentación técnica (Manuales, API, Flujos)
└── README.md               # Puerta de entrada al proyecto
```

---

## 3. 🛠️ Stack Tecnológico (MVP)

Nuestro ecosistema utiliza tecnologías modernas enfocadas en el rendimiento:

-   **Lenguaje**: TypeScript (Tipado estático para flujos de datos complejos).
-   **Frontend**: React, Vite, React Router, Redux Toolkit, Tailwind CSS.
-   **Streaming (P2P)**: WebRTC (Transmisión directa), Socket.io (Señalización).
-   **Persistencia**: SQLite (Base de datos local ligera), Node.js (Runtime).
-   **Infraestructura**: Docker (Entornos idénticos), Electron (Opcional para Desktop).

---

## 4. 🌿 Estándares de Programación y Git

Para garantizar la calidad y el orden, todos los colaboradores deben seguir estas reglas de **NextStep Devs**:

### Flujo de Trabajo (Git)
1.  **NO trabajar en `main`**: Usa ramas para cada tarea.
2.  **Ramas**: Crea desde `previous_version` con `git checkout -b nombre-tarea`.
3.  **Merge**: Solicita revisión hacia `previous_version` mediante un Pull Request.

### Convenciones de Nomenclatura
-   **Variables y Funciones**: `camelCase` (ej: `iniciarStreaming`).
-   **Archivos y Carpetas**: `kebab-case` (ej: `file-manager-component.tsx`).
-   **Comentarios**: Explicaciones breves para lógica compleja.

---

## 5. ⚙️ Arquitectura Backend y Flujo de Datos

El backend de PrivaStream tiene una lógica de almacenamiento y entrega de recursos única para optimizar el hardware del usuario.

### Almacenamiento Dinámico
Todos los archivos del usuario residen en el directorio `/data/`.
-   No se permiten archivos sueltos en la raíz de `/data/` (serán ignorados).
-   Los archivos deben estar en subdirectorios temáticos (ej: `/data/video/`, `/data/audio/`).

### Sistema de Indexación (Optimización)
Para evitar la latencia al escanear miles de archivos, el backend genera índices `.json` que actúan como caché:
1.  **Disparador**: Se ejecuta en la primera petición de acceso o al detectar cambios en el sistema de archivos.
2.  **Tipos de Índices**:
    -   `@ls.json`: Índice global del directorio.
    -   `@vi.json`, `@img.json`, `@ad.json`, `@tex.json`: Índices filtrados por tipo.

### Resource-Based API (Selectores)
El frontend interactúa con el backend mediante URLs dinámicas que incluyen selectores:
-   `/@ls/data/video/` -> Pide el listado global.
-   `/@vi/data/video/` -> Pide solo los videos.

---

## 6. 🎨 Arquitectura del Frontend

Diseñado como una **Single Page Application (SPA)** de alto rendimiento.

### Responsabilidades
1.  **File Manager**: Visualización jerárquica, CRUD de carpetas, carga/descarga.
2.  **Navegación**: Búsqueda global mediante el índice maestro y filtros instantáneos.
3.  **Streaming**: El reproductor integrado recibe flujo de datos directo del backend sin necesidad de descarga previa.

### Distribución
El Frontend se aloja dentro del Backend (**Self-Hosting**). Esto elimina problemas de CORS y asegura que el usuario siempre use la interfaz compatible con su versión del servidor.

---

## 🚀 Guía Rápida para Colaboradores

1.  **Clona el repositorio**: `git clone [url-repo]`.
2.  **Instala dependencias**: `npm install` en carpetas `frontend` y `backend`.
3.  **Inicia el entorno de desarrollo**: `npm run dev`.
4.  **Consulta este manual** antes de proponer cambios arquitecturales.

---
**Proyecto coordinado por NextStep Devs - 2026**
