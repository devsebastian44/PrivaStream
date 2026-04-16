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

    window.addEventListener('refresh-library', fetchFiles)
    return () => window.removeEventListener('refresh-library', fetchFiles)
  }, [category])


  return (
    <div className="space-y-4 max-w-[1600px] mx-auto">
      <AnimatePresence>
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-background rounded-xl p-4 border border-border"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-text-main truncate max-w-md">{selectedFile.nombre}</h4>
              <button 
                onClick={() => setSelectedFile(null)}
                className="p-2 hover:bg-hover rounded-full text-text-muted transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            {category === 'video' ? (
              <div className="max-w-3xl mx-auto">
                <VideoPlayer src={`http://localhost:5000${selectedFile.url_acceso}`} title={selectedFile.nombre} />
              </div>
            ) : category === 'img' ? (
              <div className="flex justify-center max-h-[400px] overflow-hidden bg-[#e9eef6] rounded-xl p-2">
                <img src={`http://localhost:5000${selectedFile.url_acceso}`} className="object-contain h-full w-auto rounded-lg" alt={selectedFile.nombre} />
              </div>
            ) : (
              <div className="bg-[#e9eef6] p-12 rounded-xl text-center text-text-muted">
                Vista previa no compatible para este formato todavía.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between pb-2 border-b border-border">
        <h3 className="text-xl font-medium text-text-main capitalize">{category === 'tex' ? 'Documentos' : category === 'img' ? 'Imágenes' : category}</h3>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-8 h-8 border-4 border-primary-text border-t-transparent rounded-full animate-spin" />
        </div>
      ) : files.length === 0 ? (
        <div className="text-center p-20 text-text-muted">
           No hay archivos reales en esta categoría aún.
        </div>
      ) : (
        <div className="w-full">
          {/* List Header */}
          <div className="flex items-center px-4 py-2 text-xs font-semibold text-text-muted border-b border-border">
            <div className="flex-[2] min-w-0">Nombre</div>
            <div className="flex-1 min-w-0 hidden md:block">Propietario</div>
            <div className="flex-1 min-w-0 hidden lg:block">Formato</div>
            <div className="flex-1 min-w-0 hidden sm:block">Tamaño del archivo</div>
            <div className="w-10"></div>
          </div>
          
          {/* List Items */}
          <div className="flex flex-col">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className={`flex items-center px-4 py-3 border-b border-border hover:bg-[#f5f5f5] cursor-pointer text-sm transition-colors ${selectedFile?.id === file.id ? 'bg-[#e8f0fe] hover:bg-[#e8f0fe]' : ''}`}
              >
                <div className="flex-[2] min-w-0 flex items-center space-x-3 pr-4">
                  <div className="text-text-muted flex-shrink-0">
                    {category === 'video' && <Video size={20} fill="currentColor" className="text-red-500" />}
                    {category === 'img' && <ImageIcon size={20} fill="currentColor" className="text-red-400" />}
                    {category === 'audio' && <Music size={20} fill="currentColor" className="text-red-500" />}
                    {category !== 'video' && category !== 'img' && category !== 'audio' && <File size={20} fill="currentColor" className="text-blue-500" />}
                  </div>
                  <span className="font-medium text-text-main truncate">{file.nombre}</span>
                </div>
                <div className="flex-1 min-w-0 text-text-muted hidden md:block truncate">
                  Yo
                </div>
                <div className="flex-1 min-w-0 text-text-muted hidden lg:block uppercase truncate">
                  {file.formato.split('/')[1] || file.formato}
                </div>
                <div className="flex-1 min-w-0 text-text-muted hidden sm:block truncate">
                  {file.tamano}
                </div>
                <div className="w-10 flex justify-end flex-shrink-0">
                  <button className="p-1 rounded-full text-text-muted hover:bg-hover hover:text-text-main transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileManager
