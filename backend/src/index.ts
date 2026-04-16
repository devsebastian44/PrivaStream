import express, { Request } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const PORT = process.env.SERVER_PORT || process.env.PORT || 3000;

// Definir ruta de almacenamiento raíz desde ENV o fallback local
const BASE_STORAGE_PATH = process.env.MEDIA_UPLOAD_PATH || path.join(__dirname, '../storage/data');

app.use(cors());
app.use(express.json());

// Configuración de Multer para almacenamiento dinámico
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    let category = 'tex';
    if (file.mimetype.startsWith('video/')) category = 'video';
    else if (file.mimetype.startsWith('image/')) category = 'img';
    else if (file.mimetype.startsWith('audio/')) category = 'audio';
    
    const uploadPath = path.join(BASE_STORAGE_PATH, category);
    
    // Asegurar que la categoría existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Sanitizar el nombre del archivo para evitar inyecciones de ruta
    const sanitizedName = file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    cb(null, `${Date.now()}-${sanitizedName}`);
  }
});


const upload = multer({ storage });


// API de Recursos Reales
app.get('/api/v1/list/:category', (req, res) => {
  const { category } = req.params;
  const storagePath = path.join(BASE_STORAGE_PATH, category);
  
  if (!fs.existsSync(storagePath)) {
    return res.status(404).json({ error: 'Categoría no encontrada en el disco' });
  }

  try {
    const files = fs.readdirSync(storagePath);
    const index = {
      categoria: category,
      total_archivos: files.length,
      lista: files.map((file, idx) => {
        const stats = fs.statSync(path.join(storagePath, file));
        return {
          id: idx + 1,
          nombre: file,
          tamano: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
          formato: path.extname(file).slice(1),
          // Cambiamos url_acceso para que Nginx lo sirva directamente por /media/
          url_acceso: `/media/${category}/${file}`,
          fecha_indexacion: stats.mtime.toISOString()
        };
      })
    };
    res.json(index);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer el disco' });
  }
});

// Endpoint para streaming real (Mantenido como fallback, pero Nginx debería interceptar /media/)
app.get('/api/v1/data/:category/:file', (req, res) => {
  const { category, file } = req.params;
  const filePath = path.join(BASE_STORAGE_PATH, category, file);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Archivo físico no encontrado');
  }
});

// Ruta de subida
app.post('/api/v1/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se envió ningún archivo' });
  }
  
  res.json({ 
    message: 'Archivo subido con éxito', 
    file: req.file.filename,
    path: req.file.path
  });
});


httpServer.listen(PORT, () => {
  console.log(`[CORE] PrivaStream Backend listo en puerto ${PORT}`);
  console.log(`[STORAGE] Usando ruta: ${BASE_STORAGE_PATH}`);
});
