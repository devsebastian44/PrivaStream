import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, CheckCircle2, AlertCircle } from 'lucide-react'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
  progress: number
  status: 'idle' | 'uploading' | 'success' | 'error'
}

const UploadModal = ({ isOpen, onClose, onUpload, progress, status }: UploadModalProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
    }
  }

  const triggerFileInput = () => {
    document.getElementById('file-upload-input')?.click()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-surface w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-text-main">Nuevo Recurso</h3>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-hover rounded-full text-text-muted transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 py-4">
                {status === 'idle' && (
                  <>
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Upload size={40} />
                    </div>
                    <div>
                      <p className="text-text-main font-medium">¿Quieres subir un archivo?</p>
                      <p className="text-text-muted text-sm mt-1">El sistema lo categorizará automáticamente por ti.</p>
                    </div>
                  </>
                )}

                {status === 'uploading' && (
                  <>
                    <div className="w-full space-y-4">
                      <p className="text-text-main font-medium">Subiendo archivo...</p>
                      <div className="w-full h-3 bg-hover rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                        />
                      </div>
                      <p className="text-primary font-bold">{progress}%</p>
                    </div>
                  </>
                )}

                {status === 'success' && (
                  <>
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                      <CheckCircle2 size={40} />
                    </div>
                    <div>
                      <p className="text-text-main font-medium">¡Subida completada!</p>
                      <p className="text-text-muted text-sm mt-1">El archivo ya está disponible en tu unidad.</p>
                    </div>
                  </>
                )}

                {status === 'error' && (
                  <>
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                      <AlertCircle size={40} />
                    </div>
                    <div>
                      <p className="text-text-main font-medium">Error en la subida</p>
                      <p className="text-text-muted text-sm mt-1">Hubo un problema al procesar el archivo.</p>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8 flex space-x-3">
                {status === 'idle' ? (
                  <>
                    <button 
                      onClick={onClose}
                      className="flex-1 px-4 py-3 rounded-xl border border-border text-text-main hover:bg-hover transition-colors font-medium"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={triggerFileInput}
                      className="flex-1 px-4 py-3 rounded-xl bg-primary text-on-primary hover:bg-primary/90 transition-colors font-medium"
                    >
                      Subir
                    </button>
                    <input 
                      id="file-upload-input"
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </>
                ) : (
                  <button 
                    onClick={status === 'uploading' ? undefined : onClose}
                    disabled={status === 'uploading'}
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-colors ${
                      status === 'uploading' 
                        ? 'bg-hover text-text-muted cursor-not-allowed' 
                        : 'bg-primary text-on-primary hover:bg-primary/90'
                    }`}
                  >
                    {status === 'uploading' ? 'Procesando...' : 'Cerrar'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default UploadModal
