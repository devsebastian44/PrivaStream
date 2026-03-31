import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API de Recursos Reales
app.get('/api/v1/list/:category', (req, res) => {
  const { category } = req.params;
  const storagePath = path.join(__dirname, '../storage/data', category);
  
  if (!fs.existsSync(storagePath)) {
    return res.status(404).json({ error: 'Categoría no encontrada en el disco' });
  }

  try {
    const files = fs.readdirSync(storagePath);
    const index = {
      categoria: category,
      total_archivos: files.length,
      lista: files.map((file, index) => {
        const stats = fs.statSync(path.join(storagePath, file));
        return {
          id: index + 1,
          nombre: file,
          tamano: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
          formato: path.extname(file).slice(1),
          url_acceso: `/api/v1/data/${category}/${file}`,
          fecha_indexacion: stats.mtime.toISOString()
        };
      })
    };
    res.json(index);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer el disco' });
  }
});

// Endpoint para streaming real
app.get('/api/v1/data/:category/:file', (req, res) => {
  const { category, file } = req.params;
  const filePath = path.join(__dirname, '../storage/data', category, file);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Archivo físico no encontrado');
  }
});

httpServer.listen(PORT, () => {
  console.log(`[REAL] PrivaStream Backend en http://localhost:${PORT}`);
});
