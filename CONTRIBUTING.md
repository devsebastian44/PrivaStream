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


`PrivaStream/`  
`├── backend/                        # Lógica del Servidor (Node.js/TypeScript)`  
`│   ├── src/                        # Código fuente (.ts)`  
`│   ├── storage/                    # Fallback de almacenamiento local`  
`│   └── package.json                # Dependencias`  
`│`  
`├── frontend/                       # Interfaz de Usuario (Vite + React)`  
`│   ├── src/                        # Componentes y Páginas`  
`│   └── vite.config.ts              # Configuración con Proxy habilitado`  
`│`  
`├── nginx/                          # Infraestructura como Código (IaC)`  
`│   ├── nginx.conf                  # Configuración maestra`  
`│   └── conf.d/privastream.conf     # VirtualHost y reglas de seguridad`  
`│`  
`├── scripts/                        # Automatización y DevSecOps`  
`│   ├── install.sh                  # Instalación en Debian/Ubuntu`  
`│   └── publish_public.ps1          # Sincronización GitLab <-> GitHub`  
`│`  
`├── tests/                          # Pruebas Unitarias`  
`│   ├── backend_test.py             # Pruebas de API`  
`│   └── frontend_test.js            # Pruebas de UI`  
`│`  
`└── docs/                           # Documentación`  
`    ├── architecture.md             # Diseño de Red Zero-Trust`  
`    └── api.md                      # Referencia de Endpoints`  
`===========================================================`

## 🧪 Pruebas Unitarias
Para asegurar la calidad del código antes de enviar un Merge Request:
1. **Backend:** Ejecuta `python -m unittest discover -s tests -p "backend_test.py"`.
2. **Frontend:** Ejecuta `npm test` (o sigue la guía interna en `frontend/`).