import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const VideoPlayer = ({ src, title }: { src: string, title: string }) => {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setPlaying(!playing)
    }
  }

  useEffect(() => {
    setPlaying(false)
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [src])

  return (
    <div className="w-full aspect-video glass rounded-3xl overflow-hidden relative group border border-white/5 bg-black">
      <video 
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {!playing && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
          onClick={togglePlay}
        >
          <Play size={64} className="text-white/50" />
        </div>
      )}

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-full h-1 bg-white/20 rounded-full mb-4 relative cursor-pointer group/progress">
          <div className="absolute left-0 top-0 h-full w-0 bg-primary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button onClick={togglePlay} className="text-white hover:text-primary transition-colors transform active:scale-95">
              {playing ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <div className="flex items-center space-x-4">
               <SkipBack size={20} className="text-white/80 hover:text-white cursor-pointer" />
               <SkipForward size={20} className="text-white/80 hover:text-white cursor-pointer" />
            </div>
            <div className="flex items-center space-x-2 text-white/80 group/volume">
              <Volume2 size={20} />
              <div className="w-0 group-hover/volume:w-16 h-1 bg-white/20 rounded-full overflow-hidden transition-all">
                <div className="w-2/3 h-full bg-white" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
             <span className="text-xs font-bold text-primary border border-primary/30 uppercase bg-primary/10 px-2 py-0.5 rounded tracking-widest">REAL-STREAM</span>
             <Maximize size={20} className="text-white/80 hover:text-white cursor-pointer transition-transform hover:scale-110" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
