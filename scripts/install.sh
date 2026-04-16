#!/usr/bin/env bash
# PrivaStream DevSecOps Installation Script
# Asegura la ejecución en modo super usuario
if [[ $EUID -ne 0 ]]; then
   echo "Este script debe ser ejecutado como root (sudo)." 
   exit 1
fi

set -e # Salir inmediatamente si un comando falla

echo "=============================================="
echo " Inicializando despliegue de PrivaStream "
echo "=============================================="

# 1. ACTUALIZAR DEPENDENCIAS DEL OS
echo "[1/6] Actualizando paqueteria y asegurando dependencias Base..."
apt-get update && apt-get upgrade -y
apt-get install -y \
    ufw \
    curl \
    fail2ban \
    ffmpeg \
    nginx \
    software-properties-common

# 2. INSTALAR CLOUDFLARED (Cloudflare Tunnel Daemon)
echo "[2/6] Verificando e Instalando Cloudflared..."
if ! command -v cloudflared &> /dev/null; then
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
    dpkg -i cloudflared.deb
    rm cloudflared.deb
    echo "Cloudflared instalado."
else
    echo "Cloudflared ya se encuentra instalado."
fi

# 3. DIRECTORIES SETUP
echo "[3/6] Creando directorios base de PrivaStream (Chown a www-data)..."
mkdir -p /var/www/privastream/frontend/dist
mkdir -p /var/www/privastream/media
chown -R www-data:www-data /var/www/privastream
chmod -R 755 /var/www/privastream

# 4. APLICANDO ARQUITECTURA NGINX
echo "[4/6] Desplegando Hardening en Nginx..."
# Solo copiar la configuracion si existiese en el repositorio hacia /etc/nginx
if [ -f "../nginx/nginx.conf" ]; then
    cp ../nginx/nginx.conf /etc/nginx/nginx.conf
fi
if [ -f "../nginx/conf.d/privastream.conf" ]; then
    cp ../nginx/conf.d/privastream.conf /etc/nginx/conf.d/privastream.conf
fi

# Elimina el servidor Nginx genérico
rm -f /etc/nginx/sites-enabled/default

# Probar configuracion Nginx y reiniciar
echo "Testeando config Nginx:"
nginx -t
systemctl restart nginx
systemctl enable nginx

# 5. CERRAR PUERTOS (FIREWALL / UFW ZERO TRUST MODE)
echo "[5/6] Asegurando capa de Red con UFW..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
# Solo permitimos SSH (Cambiar este puerto en tu config de sshd es una buena práctica y ajustarlo aquí)
ufw allow ssh  

echo "y" | ufw enable
systemctl restart ufw

# 6. RESUMEN
echo "[6/6] Finalizado Exitosamente"
echo "=============================================="
echo "Siguientes pasos recomendados:"
echo "1. Loguéate a cloudflare con: sudo cloudflared tunnel login"
echo "2. Crea un túnel: sudo cloudflared tunnel create privastream"
echo "3. Enruta tu dominio al localhost Nginx: sudo cloudflared tunnel route dns privastream midominio.com"
echo "4. Levanta el túnel contra localhost:8080 : cloudflared tunnel run --url http://127.0.0.1:8080 privastream"
echo "=============================================="
