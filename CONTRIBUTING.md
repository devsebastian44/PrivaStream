# 🛠️ Guía de Contribución - PrivaStream

¡Bienvenido al equipo de **NextStep Devs**! Para mantener el orden y la calidad del código, seguimos estas reglas:

## 🌿 Flujo de Trabajo en Git
1. **NUNCA** trabajes directamente en `main` o `stable_version`.
2. Crea una rama nueva desde `previous_version` para tu tarea: `git checkout -b nombre-de-tu-tarea`.
3. Una vez termines, solicita un **Merge** hacia `previous_version` para revisión.

## 📝 Estándares de Código
* **Variables y Funciones:** Usar `camelCase` (ej: `obtenerVideo`, `usuarioActivo`).
* **Archivos y Carpetas:** Usar `kebab-case` (ej: `reproductor-principal.js`).
* **Comentarios:** Todo código complejo debe estar brevemente explicado.

## 📁 Estructura del Proyecto
Respeta la estructura creada por el script de arquitectura. No crees carpetas en la raíz sin consultar.