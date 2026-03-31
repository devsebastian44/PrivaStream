import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { File, Video, Image as ImageIcon, Music, MoreVertical, X } from 'lucide-react'
import VideoPlayer from './VideoPlayer'

interface MediaFile {
  id: number
  nombre: string
  tamano: string
  formato: string
  url_acceso: string
}
//bueno este es el ultimo comentario jeje
const FileManager = ({ category }: { category: string }) => {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true)
      setSelectedFile(null)
      try {
        const response = await fetch(`http://localhost:5000/api/v1/list/${category}`)
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        setFiles(data.lista)
      } catch (error) {
        console.error("Error cargando archivos reales:", error)
        setFiles([])
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [category])

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center px-2">
              <h4 className="text-xl font-bold text-white truncate max-w-md">{selectedFile.nombre}</h4>
              <button 
                onClick={() => setSelectedFile(null)}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            {category === 'video' ? (
              <VideoPlayer src={`http://localhost:5000${selectedFile.url_acceso}`} title={selectedFile.nombre} />
            ) : category === 'img' ? (
              <div className="glass rounded-3xl overflow-hidden p-2">
                <img src={`http://localhost:5000${selectedFile.url_acceso}`} className="w-full h-auto rounded-2xl" alt={selectedFile.nombre} />
              </div>
            ) : (
              <div className="glass p-12 rounded-3xl text-center text-gray-500">
                Vista previa no compatible para este formato todavía.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white capitalize">{category === 'tex' ? 'Documentos' : category === 'img' ? 'Imágenes' : category}</h3>
        <span className="text-sm text-gray-500">{files.length} elementos encontrados</span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <AnimatePresence mode="popLayout">
          {loading ? (
             <div className="flex justify-center p-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
             </div>
          ) : files.length === 0 ? (
            <div className="text-center p-20 text-gray-500 glass rounded-3xl">
               No hay archivos reales en esta categoría aún.
            </div>
          ) : (
            files.map((file, i) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedFile(file)}
                className={`glass hover:bg-white/10 p-4 rounded-xl flex items-center justify-between group transition-all cursor-pointer ${selectedFile?.id === file.id ? 'ring-2 ring-primary bg-white/5' : ''}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {category === 'video' && <Video size={24} />}
                    {category === 'img' && <ImageIcon size={24} />}
                    {category === 'audio' && <Music size={24} />}
                    {category !== 'video' && category !== 'img' && category !== 'audio' && <File size={24} />}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{file.nombre}</h4>
                    <p className="text-xs text-gray-500 uppercase font-mono">{file.formato} • {file.tamano}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors">
                  <MoreVertical size={20} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FileManager
