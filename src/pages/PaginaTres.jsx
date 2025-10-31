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
    <div className="grid" style={{gap:'1.5rem'}}>
      <section className="card mapCard map-shadow">
        <h2>Mapa Provincia de San José</h2>
        <div style={{height:'420px', marginTop:'.5rem', borderRadius: '12px', overflow: 'hidden'}}>
          <MapContainer center={center} zoom={12} style={{height:'100%', width:'100%'}}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {sucursales.map((s, idx) => (
              <Marker position={s.pos} key={idx}>
                <Popup>
                  <strong>{s.name}</strong><br/>
                  {s.info}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div style={{marginTop:'.75rem'}}>
          <h3 className="h3-title">Sucursales</h3>
          <ul className="sucursales">
            {sucursales.map((s, idx) => (
              <li key={idx} className="sucursal" aria-disabled={idx===4? 'true' : 'false'}>
                <div className="sucursal-info"><strong>{s.name}</strong> — {s.info}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
