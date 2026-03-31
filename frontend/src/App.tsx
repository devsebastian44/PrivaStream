import { Routes, Route, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import FileManager from './components/FileManager'

//hola como estas leyendo el codigo que bien
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/library/:category" element={<DynamicLibrary />} />
      </Routes>
    </Layout>
  )
}

const DynamicLibrary = () => {
  const { category } = useParams<{ category: string }>();
  return <FileManager category={category || 'video'} />;
}

export default App
