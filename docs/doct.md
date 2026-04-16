# Especificaciones Técnicas - Proyecto Privastream

Este documento detalla el stack tecnológico decidido para el desarrollo del MVP (Producto Mínimo Viable) de Privastream, enfocado en privacidad, descentralización y alto rendimiento.

## 1. Núcleo de Desarrollo (Lenguaje y Entorno)
* **TypeScript**: Lenguaje principal para todo el proyecto. Aporta tipado estático para evitar errores en la gestión de flujos de datos complejos.
* **Vite**: Herramienta de construcción (Build Tool) para un arranque ultra rápido del entorno de desarrollo y empaquetado eficiente.

## 2. Frontend (Interfaz de Usuario)
* **React**: Biblioteca principal para construir la interfaz basada en componentes reutilizables.
* **React Router**: Gestión de la navegación interna de la aplicación (SPA) sin recargas de página.
* **Redux Toolkit**: Gestión del estado global (control de usuarios conectados, estado del stream, configuración).
* **Tailwind CSS**: Framework de diseño para una interfaz moderna, ligera y con soporte nativo para "Dark Mode".

## 3. Comunicación y Streaming (P2P)
* **WebRTC**: Protocolo encargado de la transmisión de video y audio directamente entre pares (Peer-to-Peer) con cifrado de extremo a extremo.
* **Socket.io**: Servidor de señalización para permitir que los nodos se encuentren e intercambien credenciales de conexión en tiempo real.

## 4. Almacenamiento y Persistencia
* **SQLite**: Base de datos relacional ligera. Se usará de forma local en cada nodo para almacenar metadatos, índices de archivos y configuración de privacidad.
* **Node.js**: Entorno de ejecución para el backend/servidor de señalización y gestión de archivos locales.

## 5. Infraestructura y Herramientas
* **Docker**: Para asegurar que todos los desarrolladores trabajen en un entorno idéntico.
* **GitHub/Git**: Control de versiones y colaboración del equipo.

---
**Nota de Arquitectura:** Se recomienda el uso de **Electron** si se desea empaquetar este stack como una aplicación de escritorio nativa que gestione directamente el archivo SQLite en el sistema de archivos del usuario.

# Visión General del Proyecto: Privastream

## 📝 ¿Qué es Privastream?
Privastream es una plataforma descentralizada de mensajería y streaming de video diseñada bajo el concepto de **Soberanía Digital**. Su objetivo principal es permitir la comunicación en tiempo real y el intercambio de contenidos sin depender de servidores centrales que almacenen o procesen los datos privados de los usuarios.

## 🎯 Objetivos Principales
* **Privacidad Absoluta:** Garantizar que el contenido (chats y video) viaje directamente entre los usuarios (Peer-to-Peer), minimizando la huella digital en la red.
* **Independencia de la Nube:** Eliminar la necesidad de infraestructuras costosas y centralizadas de terceros, devolviendo el control del procesamiento y almacenamiento al dispositivo local del usuario.
* **Eficiencia Técnica:** Utilizar protocolos modernos para lograr una transmisión de alta calidad con la menor latencia posible, incluso en conexiones domésticas.

## 🛠️ Pilares del Proyecto
1.  **Arquitectura P2P (Peer-to-Peer):** La conexión se establece directamente entre los nodos participantes. El servidor solo actúa como un facilitador para que los usuarios se "encuentren".
2.  **Procesamiento Local:** A diferencia de las plataformas tradicionales, el esfuerzo de codificación y gestión de datos recae en el hardware del usuario, asegurando que la información nunca salga de su control.
3.  **Transparencia y Seguridad:** Implementación de cifrado de extremo a extremo en todas las comunicaciones y uso de tecnologías de código abierto que permiten la auditoría y confianza en el sistema.

## 💡 Propuesta de Valor
Privastream no es solo una herramienta de comunicación; es una alternativa para comunidades, grupos de amigos o profesionales que requieren un espacio seguro para compartir ideas y contenido en vivo sin temor a la vigilancia, la censura o el uso indebido de sus datos personales.

---
**Estado del Proyecto:** Fase de definición de arquitectura y desarrollo de MVP (Producto Mínimo Viable).