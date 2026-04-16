# 🌌 PrivaStream

Desarrollo de un Servidor de Entretenimiento Local: Un Proyecto de Software Libre y Austero enfocado en la privacidad y la soberanía digital.

---

## 🚀 Cómo Ejecutar el Proyecto para Pruebas

Sigue estos pasos para poner en marcha el prototipo tanto en el backend como en el frontend.

### 1. Requisitos Previos
- Tener instalado **Node.js** (v20 o superior recomendado).
- Un gestor de paquetes como **npm** (incluido con Node.js).

### 2. Configuración e Inicio del Backend
El backend se encarga de la indexación de archivos y la API de recursos.

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias (solo la primera vez)
npm install

# Iniciar el servidor en modo desarrollo
npm run dev
```
*El servidor correrá por defecto en `http://localhost:5000`.*

### 3. Configuración e Inicio del Frontend
El frontend es la interfaz de usuario moderna para navegar e interactuar con tus medios.

```bash
# Navegar a la carpeta frontend
cd frontend

# Instalar dependencias (solo la primera vez)
npm install

# Iniciar la aplicación en modo desarrollo
npm run dev
```
*La aplicación se abrirá usualmente en `http://localhost:3000`.*

---

## 📂 Agregando Medios para Pruebas

Para ver el sistema en acción con tus propios archivos, colócalos en las siguientes carpetas dentro de `backend/storage/data/`:

- **Videos**: `backend/storage/data/video/`
- **Imágenes**: `backend/storage/data/img/`
- **Audio**: `backend/storage/data/audio/`
- **Documentos**: `backend/storage/data/tex/`

Al reiniciar el backend o navegar en el frontend, el sistema detectará automáticamente los nuevos archivos.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Express, Socket.io, SQLite.

---
**Proyecto coordinado por NextStep Devs - 2026**
