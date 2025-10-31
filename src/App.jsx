import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import PaginaUno from './pages/PaginaUno.jsx'
import PaginaDos from './pages/PaginaDos.jsx'
import PaginaTres from './pages/PaginaTres.jsx'

export default function App(){
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<PaginaTres />} />
          <Route path="/pagina-1" element={<PaginaUno />} />
          <Route path="/pagina-2" element={<PaginaDos />} />
        </Routes>
      </main>
    </>
  )
}
