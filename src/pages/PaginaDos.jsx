import React, { useMemo, useState } from 'react'
import image from '../assets/imagen.svg'
import '../styles/pagina-dos.css'

const productosOrdenados = [
  { id: 'termometro', nombre: 'Termómetro Digital', descripcion: 'Ideal para control diario de temperatura.' },
  { id: 'oximetro', nombre: 'Oxímetro de pulso', descripcion: 'Monitorea saturación de oxígeno en segundos.' },
  { id: 'tensiometro', nombre: 'Tensiómetro automático', descripcion: 'Incluye brazalete ergonómico para adultos.' },
  { id: 'estetoscopio', nombre: 'Estetoscopio profesional', descripcion: 'Diseño liviano y gran fidelidad acústica.' },
  { id: 'botiquin', nombre: 'Botiquín básico', descripcion: 'Contiene los insumos esenciales para emergencias.' }
]

const categorias = [
  { id: 'diagnostico', nombre: 'Diagnóstico', descripcion: 'Termómetros, estetoscopios y más.' },
  { id: 'monitoreo', nombre: 'Monitoreo', descripcion: 'Oxímetros y tensiómetros conectados.' },
  { id: 'proteccion', nombre: 'Protección personal', descripcion: 'Mascarillas, guantes y batas.' },
  { id: 'movilidad', nombre: 'Movilidad', descripcion: 'Sillas de ruedas y andaderas.' },
  { id: 'farmacia', nombre: 'Farmacia', descripcion: 'Medicamentos OTC y suplementos.' }
]

export default function PaginaDos(){
  const [imagenesOcultas, setImagenesOcultas] = useState([])

  const toggleImagen = (id) => {
    setImagenesOcultas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const restaurarVisibilidad = () => {
    setImagenesOcultas([])
  }

  const imagenesHero = useMemo(() => productosOrdenados.slice(0, 3), [])

  return (
    <div className="row g-4">
      <section className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <h2 className="card-title h4">Venta de productos médicos</h2>

                <div className="visibility-panel">
                  <h3 className="h6 text-uppercase text-muted">Control de visibilidad</h3>
                  <p className="small text-muted mb-2">Marca las casillas para ocultar imágenes específicas.</p>
                  <div className="list-group">
                    {productosOrdenados.map((producto) => {
                      const ocultar = imagenesOcultas.includes(producto.id)
                      return (
                        <label key={producto.id} className="list-group-item d-flex align-items-center gap-2">
                          <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={ocultar}
                            onChange={() => toggleImagen(producto.id)}
                          />
                          <span className="flex-grow-1">
                            {producto.nombre}
                            {ocultar && <span className="badge bg-warning-subtle text-warning-emphasis ms-2">Oculta</span>}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                  <button type="button" className="btn btn-outline-primary mt-3" onClick={restaurarVisibilidad} disabled={imagenesOcultas.length === 0}>
                    Mostrar todas las imágenes
                  </button>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row g-3 gallery-grid">
                  {imagenesHero.map((producto) => {
                    const ocultar = imagenesOcultas.includes(producto.id)
                    return (
                      <div key={producto.id} className="col-4">
                        <div className={`gallery-tile ${ocultar ? 'is-hidden' : ''}`}>
                          {ocultar ? (
                            <span className="text-muted small">Imagen oculta</span>
                          ) : (
                            <img src={image} alt={producto.nombre} />
                          )}
                          <span className="gallery-label">{producto.nombre}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="col-12 col-lg-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <h3 className="h5 mb-3">Lista ordenada de ventas</h3>
            <ol className="list-group list-group-numbered">
              {productosOrdenados.map((producto) => {
                const ocultar = imagenesOcultas.includes(producto.id)
                return (
                  <li key={producto.id} className="list-group-item">
                    <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
                      <div className="image-wrapper">
                        {ocultar ? (
                          <span className="placeholder rounded">Imagen oculta</span>
                        ) : (
                          <img src={image} alt={producto.nombre} />
                        )}
                      </div>
                      <div>
                        <h4 className="h6 mb-1">{producto.nombre}</h4>
                        <p className="text-muted mb-0">{producto.descripcion}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="col-12 col-lg-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <h3 className="h5 mb-3">Lista de categorías</h3>
            <ul className="list-group">
              {categorias.map((categoria, index) => {
                const imagenId = productosOrdenados[index]?.id ?? categoria.id
                const ocultar = imagenesOcultas.includes(imagenId)
                return (
                  <li key={categoria.id} className="list-group-item">
                    <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
                      <div className="image-wrapper">
                        {ocultar ? (
                          <span className="placeholder rounded">Imagen oculta</span>
                        ) : (
                          <img src={image} alt={categoria.nombre} className={index === 0 ? 'wiggle' : ''} />
                        )}
                      </div>
                      <div>
                        <h4 className="h6 mb-1">{categoria.nombre}</h4>
                        <p className="text-muted mb-0">{categoria.descripcion}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="col-12">
        <a href="https://www.youtube.com/" className="btn btn-link p-0">Visitar canal de YouTube</a>
      </section>
    </div>
  )
}
