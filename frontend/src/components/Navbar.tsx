import { Search, Bell, User } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="h-20 glass border-b flex items-center justify-between px-8 relative z-40">
      <div className="w-1/3 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={18} />
        </span>
        <input 
          type="text" 
          placeholder="Buscar medios..." 
          className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-primary/50 text-sm transition-all text-white placeholder-gray-500"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-gray-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] cursor-pointer">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            <User size={20} className="text-primary" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
