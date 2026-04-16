import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in relative z-10">
      <section>
        <div className="h-64 rounded-3xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-primary/10 transition-colors" />
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 z-20 space-y-4">
            <h2 className="text-4xl font-bold text-white">Bienvenido a PrivaStream</h2>
            <p className="text-gray-300 max-w-lg">
              Tu centro de medios descentralizado. Privacidad absoluta y control total de tus datos desde tu propio servidor.
            </p>
            <button className="bg-white text-black px-6 py-2.5 rounded-full font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-colors">
              <Play size={18} fill="black" />
              <span>Explorar Ahora</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
//claro era asi
export default Dashboard
