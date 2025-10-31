import { NavLink } from 'react-router-dom'

export default function NavBar(){
  return (
    <header>
      <nav className="container">
        <span className="brand">Tienda Medica</span>
        <NavLink to="/" end className={({isActive}) => `navlink ${isActive?'active':''}`}>Pagina 3 - Mapa</NavLink>
        <NavLink to="/pagina-1" className={({isActive}) => `navlink ${isActive?'active':''}`}>Pagina 1 - Tablas y Form</NavLink>
        <NavLink to="/pagina-2" className={({isActive}) => `navlink ${isActive?'active':''}`}>Pagina 2 - Listas e Imagenes</NavLink>
      </nav>
    </header>
  )
}
