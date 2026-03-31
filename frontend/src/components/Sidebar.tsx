import { Play, Image, Music, FileText, Home, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen glass border-r flex flex-col p-4 space-y-8 relative z-50">
      <div className="flex items-center space-x-2 px-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="font-bold text-white">P</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">PrivaStream</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarItem href="/" icon={<Home size={20} />} label="Dashboard" active={location.pathname === '/'} />
        <div className="pt-4 pb-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Librería
        </div>
        <SidebarItem href="/library/video" icon={<Play size={20} />} label="Videos" active={location.pathname === '/library/video'} />
        <SidebarItem href="/library/img" icon={<Image size={20} />} label="Imágenes" active={location.pathname === '/library/img'} />
        <SidebarItem href="/library/audio" icon={<Music size={20} />} label="Audio" active={location.pathname === '/library/audio'} />
        <SidebarItem href="/library/tex" icon={<FileText size={20} />} label="Documentos" active={location.pathname === '/library/tex'} />
      </nav>

      <div className="pt-4 border-t border-gray-800 space-y-2">
        <SidebarItem href="/settings" icon={<Settings size={20} />} label="Configuración" active={location.pathname === '/settings'} />
      </div>
    </div>
  )
}

const SidebarItem = ({ icon, label, href, active = false }: { icon: any, label: string, href: string, active?: boolean }) => (
  <Link to={href}>
    <motion.div
      whileHover={{ x: 4 }}
      className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
        active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </motion.div>
  </Link>
)

export default Sidebar
