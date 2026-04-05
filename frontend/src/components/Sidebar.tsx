import { Play, Image, Music, FileText, Home, Settings, Plus } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-background flex flex-col py-4 px-3 space-y-4 relative z-50">
      <div className="flex items-center space-x-2 px-3 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-primary-text" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 20H2L12 2Z"/></svg>
        </div>
        <h1 className="text-xl font-medium tracking-tight text-text-main">PrivaStream</h1>
      </div>

      <div className="px-3 mb-2">
        <button className="flex items-center space-x-3 bg-surface hover:bg-[#f6f9fc] text-text-main drive-shadow px-5 py-4 rounded-2xl transition-all">
          <Plus size={24} />
          <span className="font-medium text-sm">Nuevo</span>
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        <SidebarItem href="/" icon={<Home size={20} />} label="Inicio" active={location.pathname === '/'} />
        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-text-muted">
          Mi unidad
        </div>
        <SidebarItem href="/library/video" icon={<Play size={20} />} label="Videos" active={location.pathname === '/library/video'} />
        <SidebarItem href="/library/img" icon={<Image size={20} />} label="Imágenes" active={location.pathname === '/library/img'} />
        <SidebarItem href="/library/audio" icon={<Music size={20} />} label="Audio" active={location.pathname === '/library/audio'} />
        <SidebarItem href="/library/tex" icon={<FileText size={20} />} label="Documentos" active={location.pathname === '/library/tex'} />
      </nav>

      <div className="pt-4 space-y-1">
        <SidebarItem href="/settings" icon={<Settings size={20} />} label="Configuración" active={location.pathname === '/settings'} />
      </div>
    </div>
  )
}

const SidebarItem = ({ icon, label, href, active = false }: { icon: any, label: string, href: string, active?: boolean }) => (
  <Link to={href} className="block">
    <div
      className={`flex items-center space-x-3 px-4 py-2 rounded-full cursor-pointer transition-colors ${
        active ? 'bg-primary text-on-primary' : 'text-text-muted hover:bg-hover hover:text-text-main'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </div>
  </Link>
)

export default Sidebar
