import React, { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../styles/pagina-tres.css'

export default function PaginaTres(){
  const center = useMemo(() => [9.9281, -84.0907], [])
  const sucursales = [
    { name: 'San José Centro', pos: [9.933, -84.083], info: 'Sucursal principal, horario 8:00–18:00' },
    { name: 'Escazú', pos: [9.918, -84.140], info: 'Parqueo amplio, horario 9:00–19:00' },
    { name: 'Desamparados', pos: [9.901, -84.062], info: 'Atención prioritaria adultos mayores, horario 24/7' },
    { name: 'Guadalupe', pos: [9.946, -84.052], info: 'Servicio a domicilio disponible, horario 24/7' },
    { name: 'Pavas', pos: [9.942, -84.140], info: 'Punto de retiro rápido, horario 24/7' }
  ]

  return (
    <div className="row g-4">
      <section className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h2 className="card-title h4 map-heading">Mapa Provincia de San José</h2>
            <p className="text-muted">Ubica rápidamente cada sucursal de la cadena y consulta información adicional en el mapa interactivo.</p>
            <div className="map-wrapper">
              <MapContainer center={center} zoom={12} className="map-container">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {sucursales.map((sucursal) => (
                  <Marker position={sucursal.pos} key={sucursal.name}>
                    <Popup>
                      <strong>{sucursal.name}</strong>
                      <br />
                      {sucursal.info}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            <div className="list-group mt-4">
              {sucursales.map((sucursal, index) => (
                <div
                  key={sucursal.name}
                  className={`list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2${index === 2 ? ' featured' : ''}`}
                  aria-disabled={index === 4 ? 'true' : 'false'}
                >
                  <div>
                    <h3 className="h6 mb-1">{sucursal.name}</h3>
                    <p className="text-muted mb-0">{sucursal.info}</p>
                  </div>
                  <span className="badge text-bg-light">Lat: {sucursal.pos[0].toFixed(3)} | Lng: {sucursal.pos[1].toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
