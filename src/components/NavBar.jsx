import { NavLink } from 'react-router-dom'

export default function NavBar(){
  return (
    <header className="shadow-sm bg-white">
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container">
          <span className="navbar-brand fw-semibold text-primary">Tienda Médica</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Alternar navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <div className="navbar-nav ms-auto gap-2">
              <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active fw-semibold text-primary' : ''}`}>
                Página 3 - Mapa
              </NavLink>
              <NavLink to="/pagina-1" className={({ isActive }) => `nav-link${isActive ? ' active fw-semibold text-primary' : ''}`}>
                Página 1 - Formulario
              </NavLink>
              <NavLink to="/pagina-2" className={({ isActive }) => `nav-link${isActive ? ' active fw-semibold text-primary' : ''}`}>
                Página 2 - Catálogo
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
