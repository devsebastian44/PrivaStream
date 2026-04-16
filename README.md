# PrivaStream
Desarrollo de un Servidor de Entretenimiento Local: Un Proyecto de Software Libre y Austero.

---

## 🚀 Guía Rápida: Cómo Ejecutar y Usar PrivaStream

Este proyecto está construido bajo una arquitectura Zero-Trust y está pensado para desplegarse fácilmente sobre un entorno Linux (ej. Ubuntu/Debian) usando nuestros scripts DevSecOps.

### 1. Inicializar la Infraestructura del Servidor
Toda la configuración pesada de Nginx, seguridad, Firewall y creación de túneles ha sido automatizada. Para ejecutarla:

1. Ingresa a tu servidor Linux (o entorno WSL/VM local si estás desarrollando).
2. Ve al directorio del script y dales permisos de ejecución:
   ```bash
   cd scripts/
   chmod +x install.sh
   ```
3. Ejecuta el script como administrador (root):
   ```bash
   sudo ./install.sh
   ```
   > **Nota:** Este script instalará automáticamente las dependencias, configurará e iniciará Nginx, y activará el Firewall (UFW) cerrando todo menos lo esencial.

### 2. Conectar al Mundo Exterior (Cloudflare Tunnel)
Para que puedas acceder desde cualquier parte de internet sin abrir los puertos de tu router:

1. Autentica el daemon de Cloudflare (instalado en el paso anterior) con tu cuenta:
   ```bash
   sudo cloudflared tunnel login
   ```
2. Crea el túnel dedicado para el streaming:
   ```bash
   sudo cloudflared tunnel create privastream
   ```
3. Rutéalo a tu dominio:
   ```bash
   sudo cloudflared tunnel route dns privastream midominio.com
   ```
4. Pon a correr el túnel apuntando a Nginx (Localhost puerto 8080):
   ```bash
   cloudflared tunnel run --url http://127.0.0.1:8080 privastream
   ```
*(Opcional: Si deseas que el túnel inicie automáticamente al encender el servidor, puedes instalarlo como servicio con `sudo cloudflared service install`)*

### 3. Levantar tus Servicios (Backend / Frontend)
Todo el tráfico que entra a tu servidor de forma segura ahora es manejado por **Nginx**.

- Nginx espera que tu **Backend/API** esté corriendo en el puerto **3000** interno (`http://127.0.0.1:3000`). Todas las peticiones a `midominio.com/api` irán directo a tu código.
- Nginx servirá los archivos estáticos subidos a `/media` desde la carpeta `/var/www/privastream/media/`.

Cuando comiences a desarrollar el código de Node, Python o React, colócalos dentro de los directorios `./backend` y `./frontend` e inícialos para probar. Todo es invisible al exterior, salvo a través del dominio protegido que configuraste.
