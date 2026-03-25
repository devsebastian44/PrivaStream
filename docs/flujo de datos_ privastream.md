**backend**

Como se debe comportar el backend: bueno primero creo que debemos entender como se guardan los archivos así que empecemos por ahí.

Almacenamiento: los archivos se guardan en este directorios del usuario.

1) /data/name/…  
2) /data/video/…  
3) /data/img/…  
4) /data/audio/…  
5) /data/tex/…

 **¿El usuario puede crear otras carpetas?**

Si pero con matices y reglas, primero todo lo que el usuario quiera crear guardar o hacer, tiene que si o SI, estar dentro de /data/ que se puede guardar o crear en la carpeta data, primero en la carpeta data no puede haber archivos sueltos que sean del usuario si es asi tiene que ser ignorado.

Ejemplo: Si el usuario quiere poner o guardar un archivo formato video, texto, img, audio… no se puede guardar en el directorio /data/ que si se puede guardar en data solo se puede crear subdirectorios (carpetas Ej: /data/name/… ) en los subdirectorios es donde el user si puede guardar sus archivos de la mejor forma que le parezca.

1.Ej: de archivo suelto /data/name.extension no se permite o será ignorado   
2.Ej: que si se permite data/name/name.extension o data/name/name/…

 **¿Cuántos subdirectorios se pueden crear dentro de data?**

La respuesta corta es cuántos infinitos allá.

**¿Qué tipo de procesamiento hace el backend?**

1. Uno de los procesamientos más importantes y más costosos que hará el servidor/backend es el streaming de medios.  
     
2. Indexación de Medios, que quiero decir con esto; el usuario envía “N” videos a el directorio /data/video/name.mp4 el backend en un momento dado generará un .json que contendrá una lista de los archivos que se encuentren en el directorio. ¿[Dudas](#bookmark=id.thgd30ryjful)?  
     
3. Entrega Segura de Activos (Assets). 

4. Acceso Controlado “login”.

**¿Dudas de que es y qué hacen esos .json se habló en este [punto](#bookmark=id.gggt76drhsrt)?**

Primero resolvamos una pequeña duda aún más importante.

**¿Cuál es la función de este archivo .json?**

Este archivo es una estrategia de optimización de recursos para la gestión de directorios con alto volumen de datos. En un escenario donde el usuario disponga de, por ejemplo, 1,000 videos, realizar un escaneo en tiempo real cada vez que se accede a la carpeta provocaría tiempos de carga excesivos (latencia).

Para solucionar esto, el backend realiza un preprocesamiento de metadatos, generando este `.json` como un índice caché. De esta forma, el frontend recibe la lista de archivos de manera instantánea sin necesidad de re-explorar el almacenamiento físico en cada petición.

**¿Cuándo se ejecuta la indexación?**

La indexación (preprocesado) se activa mediante un disparador bajo demanda (On-Demand). Se ejecuta en el momento en que el usuario realiza la primera petición de acceso a un directorio, optimizando así la entrega de recursos para sesiones futuras.

"Se recomienda que, mientras se genera el índice por primera vez, el Backend envíe una señal de **'Procesando'** al Frontend para mostrar un indicador de carga (Spinner)"

**¿Cómo se mantiene actualizada la indexación?**

Para optimizar el uso de CPU, la re-indexación no es constante, sino que se basa en Disparadores de Eventos (Triggers).

El Backend detecta acciones de escritura en el sistema de archivos (como la subida de un nuevo archivo en `/data/audio/`) y utiliza ese evento como señal para invalidar el índice anterior y generar uno nuevo. Esto garantiza que la lista de archivos que ve el usuario esté siempre sincronizada con el almacenamiento real.

**¿Existen diferentes tipos de índices `.json`?**

Sí. El sistema implementa una Indexación Segmentada y una Vista Global:

1. Índices Específicos: Archivos independientes para las categorías de Video, Imagen, Texto y Audio, optimizando las peticiones de contenido filtrado.  
2. Índice Maestro (Global): Un registro consolidado que unifica todos los metadatos del servidor. Este es fundamental para funciones transversales como el Buscador General o la visualización de la actividad reciente del usuario.  
   

**¿Cómo es su estructura interna?**  
'{
  "categoria": "video",
  "total_archivos": 2,
  "lista": [
    {
      "id": 1,
      "nombre": "mister increible.mp4",
      "duracion": "01:30:00",
      "tamano": "1.7GB",
      "formato": "video/mp4",
      "url_acceso": "/data/video/mister_increible.mp4",
      "fecha_indexacion": "2026-03-25T17:00:00Z"
    },
    {
      "id": 2,
      "nombre": "tutorial_debian.mkv",
      "duracion": "00:15:20",
      "tamano": "450MB",
      "formato": "video/x-matroska",
      "url_acceso": "/data/video/tutorial_debian.mkv",
      "fecha_indexacion": "2026-03-25T17:10:00Z"
    }
  ]
}'

**¿Cómo se puede usar el .json?**

cuando el usuario quiere hacer una petición por ejemplo está en la carpeta /data/video/…  
y quiere un listado global de esa carpeta (que eso ya es algo que está por defecto) lo hace de esta forma, con una url dinamica [**/@ls/data/video/…**](https://privatstream.???/home/@ls/data/video/…) y que hace exactamente eso, bueno primero dice, quiero un listado “[**/@ls/**](https://privatstream.???/home/@ls/data/video/…)” en esta ruta [**/data/video/…**](https://privatstream.???/home/@ls/data/video/…) pero en realidad no hace un listado más bien pide un .json que tiene por nombre @ls.json otros casos sería un filtro donde esta pidiendo solo archivos con formato vídeo y lo pide de esta forma [**/@vi/data/video/…**](https://privatstream.???/home/@vi/data/video/…) lo cual, es lo mismo que en caso anterior pide un .json que se encuentra en la ruta [**/data/video/**](https://privatstream.???/home/@vi/data/video/…) y se llama @vi.json

**estos son otros casos globales**

**(URL) [https://privatstream.???/home/@ls/data/video/…](https://privatstream.???/home/@ls/data/video/…)**  
**(URL) [https://privatstream.???/home/@vi/data/video/…](https://privatstream.???/home/@vi/data/video/…)**  
**(URL) [https://privatstream.???/home/@img/data/video/…](https://privatstream.???/home/@img/data/video/…)**  
**(URL) [https://privatstream.???/home/@ad/data/video/…](https://privatstream.???/home/@ad/data/video/…)**  
**(URL) [https://privatstream.???/home/@tex/data/video/…](https://privatstream.???/home/@tex/data/video/…)**

**@ad \= audio**  
**@tex \= texto**

**Protocolo de Peticiones mediante URLs Dinámicas**

El acceso a los recursos se gestiona a través de Identificadores de Acción (Selectores) integrados en la URL. Cuando el usuario navega a un directorio (ej. /data/video/), el Frontend no realiza un escaneo de archivos en tiempo real, sino que solicita un Índice Pre-procesado correspondiente al filtro deseado.

Lógica de Resolución del Backend:

* Petición: /@ls/data/video/  
* Acción: El Backend sirve el archivo físico @ls.json ubicado en ese directorio.

Diccionario de Selectores:

* @ls (List): Índice global del directorio.  
* @vi (Video): Filtrado exclusivo de formatos de video.  
* @img (Image): Filtrado de archivos de imagen.  
* @ad (Audio): Filtrado de pistas de audio.  
* @tex (Text): Filtrado de documentos de texto.

Esta estructura permite que el servidor escale sin perder velocidad, ya que la respuesta a una petición es la entrega directa de un archivo estático optimizado.

![Diagrama de flujo](/docs/flujo-de-datos-2026-03-25-1248.png)