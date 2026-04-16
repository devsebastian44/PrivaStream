import { Search, HelpCircle, Settings, User } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="h-16 flex items-center justify-between px-4 bg-background relative z-40">
      <div className="flex-1 max-w-2xl">
        <div className="relative flex items-center w-full h-12 rounded-full bg-[#e9eef6] focus-within:bg-white focus-within:drive-shadow transition-all px-2">
          <button className="p-2 text-text-muted rounded-full hover:bg-hover">
            <Search size={20} />
          </button>
          <input 
            type="text" 
            placeholder="Buscar en PrivaStream" 
            className="w-full bg-transparent border-none py-2 px-2 focus:outline-none text-text-main placeholder-text-muted"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        <button className="p-2 text-text-muted hover:bg-hover rounded-full transition-colors hidden sm:block">
          <HelpCircle size={24} />
        </button>
        <button className="p-2 text-text-muted hover:bg-hover rounded-full transition-colors hidden sm:block">
          <Settings size={24} />
        </button>
        <div className="ml-2 w-8 h-8 rounded-full bg-primary-text flex items-center justify-center cursor-pointer">
          <span className="text-white text-sm font-medium">U</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar
