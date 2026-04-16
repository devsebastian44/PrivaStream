# PrivaStream - Arquitectura y DevSecOps

Este documento establece los principios de diseño para desplegar PrivaStream de manera segura. Se expone un clúster local a internet minimizando la superficie de ataque, enfocado en entrega multimedia a baja latencia.

## 1. Topología Lógica

El flujo no abre ningún puerto primario en el gateway NAT/Router. Todo el servicio está enmascarado tras Cloudflare:

```text
[ Internet Usuarios ] ---> (HTTPS / TLS 1.3 Strict) ---> [ Edge / DNS: Cloudflare ]
                                                               |
    (Zero Trust Cloudflare Tunnel - TCP Keepalive)             |
                                                               v
[ Router / Firewall Nat Red Local ] ---> (Bloqueado desde afuera a adentro)
                                                               |
                                                               v
[ Servidor DevSecOps ] 
  ├─ cloudflared daemon (escucha túnel y hace re-forward al Nginx local en 127.0.0.1)
  │
  ├─ ufw (Firewall Linux activo - Todo denegado entrante excepto para la red LAN o VPN interna/SSH)
  │
  └─ [ Nginx Reverse Proxy (127.0.0.1:8080) ] ── (Limpieza Headers, Rate Limits, HLS Caching)
        │
        ├─Ruta `/`       ---> Frontend (React / Vue, puerto estático/Node)
        ├─Ruta `/api`    ---> Backend (Go / Node / Python, puertos internos de API)
        └─Ruta `/media`  ---> Video Streaming local (MP4/HLS) / Transcoder (Servidor estático + FFmpeg)
```

## 2. Decisiones de Diseño (Post-mortem de Seguridad)

1. **Exposición Indirecta (`cloudflared`)**: Evitamos usar port forwarding (puertos 80 o 443 expuestos al mundo), lo cual protege al backend / OS de Shodan/Censys scanners, ataques SSH bruteforce globales y exploits directos al Nginx.
2. **Hardening de Cabeceras HTTP**: En Nginx se remueve los `server` header de las tecnologías base. Todo CSP (Content-Security-Policy) debe bloquear ejecuciones de JS en el scope media.
3. **Manejo de Uploads Seguros**: Nginx limitará los chunks de subida mediante `client_max_body_size` adaptativo a multimedia pesada (~2GB - 5GB); pero pasará la verificación del Magic Number al backend antes de almacenar. Se prohíbe la ejecución estática en las carpetas de subida.
4. **Optimización de Streaming**: El chunking HLS se despacha con llamadas OS a nivel Kernel por Nginx (`sendfile on`, `tcp_nopush on`, `aio threads`).

## 3. Guía de Operaciones en Producción
- **Rotación:** Cloudflared se configura para rotar sus tokens automáticos.
- **Riesgos de Memoria en Transcoding**: Evitar que el backend despache peticiones síncronas de FFmpeg. Se debe usar un manejador asíncrono y Nginx sólo debe consultar si el output del buffer existe `.m3u8` en disco o proxy.
- **Auditoría**: Siempre monitorear `/var/log/nginx/access.log` para ataques automatizados, ya que el túnel preserva la IP real mediante el header `CF-Connecting-IP`.
