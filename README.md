# PrivaStream
Desarrollo de un Servidor de Entretenimiento Local: Un Proyecto de Software Libre y Austero


`===========================================================`  
`ESTRUCTURA DE DIRECTORIOS ESTÁNDAR - MEDIA SERVER PROJECT`  
`===========================================================`

`media-server/`  
`├── backend/                        # Lógica del Servidor y API (Node.js/Python/PHP)`  
`│   ├── src/                        # Código fuente del servidor`  
`│   │   ├── controllers/            # Funciones que procesan las peticiones (Lógica)`  
`│   │   ├── routes/                 # Definición de rutas (/api/media, /api/upload)`  
`│   │   ├── services/               # Lógica de streaming y procesamiento de archivos`  
`│   │   ├── models/                 # Estructura de los datos (Base de datos o JSON)`  
`│   │   └── utils/                  # Funciones de ayuda (Validadores, conversores)`  
`│   ├── config/                     # Configuración de red, puertos y variables de entorno`  
`│   ├── storage/                    # ALMACENAMIENTO FÍSICO (Persistencia en Debian)`  
`│   │   ├── videos/                 # Repositorio de películas y clips`  
`│   │   ├── photos/                 # Repositorio de imágenes`  
`│   │   ├── audio/                  # Repositorio de música y podcasts`  
`│   │   └── thumbnails/             # Vistas previas generadas automáticamente`  
`│   ├── tests/                      # Pruebas unitarias de la API`  
`│   └── package.json                # Dependencias del servidor`  
`│`  
`├── frontend/                       # Interfaz de Usuario (App/Web estilo Netflix)`  
`│   ├── src/                        # Código fuente del Cliente`  
`│   │   ├── components/             # Piezas reutilizables (Player, Navbar, Cards)`  
`│   │   ├── pages/                  # Vistas principales (Home, Library, Upload)`  
`│   │   ├── services/               # Conexión con la API del Backend (Axios/Fetch)`  
`│   │   ├── hooks/                  # Lógica de estado y efectos`  
`│   │   └── assets/                 # Recursos estáticos (Logos, CSS global, Fuentes)`  
`│   ├── public/                     # Archivos públicos accesibles por el navegador`  
`│   └── index.html                  # Punto de entrada de la aplicación`  
`│`  
`├── scripts/                        # Automatización y Despliegue en Linux`  
`│   ├── install.sh                  # Script Bash de instalación automática en Debian`  
`│   ├── update.sh                   # Script para actualizar el sistema sin borrar datos`  
`│   └── setup-db.sh                 # Configuración inicial de la base de datos`  
`│`  
`├── docs/                           # Documentación Técnica del Equipo`  
`│   ├── api-spec.pdf                # Guía de Endpoints, Nombres y Status Codes`  
`│   ├── architecture.png            # Diagrama de cómo se conectan las piezas`  
`│   └── changelog.md                # Registro de cambios y versiones del grupo`  
`│`  
`└── README.md                       # Manual de inicio rápido y reglas del proyecto`  
`===========================================================`