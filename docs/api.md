# Especificación de la API - PrivaStream v1.0

La API de PrivaStream está diseñada bajo principios REST y expuesta a través de un proxy Nginx. Toda petición debe ser dirigida al dominio configurado bajo la ruta base `/api/v1/`.

## 1. Listado de Recursos
Obtiene un índice de archivos físicos disponibles en una categoría específica.

*   **URL:** `/api/v1/list/:category`
*   **Método:** `GET`
*   **Parámetros de ruta:**
    *   `category`: Una de `video`, `img`, `audio`, `tex`.
*   **Respuesta Exitosa (200 OK):**
    ```json
    {
      "categoria": "video",
      "total_archivos": 2,
      "lista": [
        {
          "id": 1,
          "nombre": "1713284000-clip.mp4",
          "tamano": "15.50 MB",
          "formato": "mp4",
          "url_acceso": "/media/video/1713284000-clip.mp4",
          "fecha_indexacion": "2026-04-16T12:00:00.000Z"
        }
      ]
    }
    ```

## 2. Subida de Archivos
Permite cargar un archivo multimedia al servidor. El sistema lo categoriza automáticamente según su tipo MIME.

*   **URL:** `/api/v1/upload`
*   **Método:** `POST`
*   **Cuerpo (FormData):**
    *   `file`: El archivo binario a subir.
*   **Límites:** 
    *   Tamaño máximo: 5GB (Configurado en Nginx).
*   **Respuesta Exitosa (200 OK):**
    ```json
    {
      "message": "Archivo subido con éxito",
      "file": "1713284000-archivo_saneado.mp4",
      "path": "/var/www/privastream/media/video/1713284000-archivo_saneado.mp4"
    }
    ```

## 3. Acceso a Multimedia (Static Delivery)
Para maximizar el rendimiento, Nginx sirve los archivos directamente desde el disco sin pasar por el proceso de Node.js.

*   **URL:** `/media/:category/:filename`
*   **Método:** `GET`
*   **Streaming:** Soporta cabeceras de rango (`Range: bytes=...`) para permitir el *seeking* (adelantar/atrasar) en los reproductores de video.

## 4. Códigos de Error Comunes
| Código | Descripción |
| :--- | :--- |
| **403** | Denegado por políticas de Nginx o Firewall. |
| **404** | Categoría o archivo no encontrado en el almacenamiento físico. |
| **413** | Payload demasiado grande (Excede el límite de Nginx). |
| **502** | Gateway Error (El backend de Node.js está apagado o en el puerto incorrecto). |
