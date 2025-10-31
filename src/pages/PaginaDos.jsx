import React from 'react'
import image from '../assets/imagen.svg'
import '../styles/pagina-dos.css'

export default function PaginaDos(){
  return (
    <div className="grid" style={{gap:'1.5rem'}}>
      <section className="hero card shadow">
        <div>
          <h2>Venta de Productos Médicos</h2>
          <p className="intro">Bienvenido a la tienda. Seleccione un producto para ver detalles.</p>
          <div className="product">Producto ejemplo<div className="effect-note"></div></div>
        </div>
        <div className="card shadow">
          <div className="images">
            <img src={image} alt="Producto 1" />
            <img src={image} alt="Producto 2" />
            <img src={image} alt="Producto 3" />
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Listas de productos</h2>
        <div className="grid cols-2">
          <div>
            <h3>Lista ordenada de Ventas</h3>
            <ol className="list">
              <li>
                Termómetro Digital
                <img src={image} alt="Termómetro Digital" style={{width: '100px', marginTop: '10px'}} />
              </li>
              <li>
                Oxímetro de pulso
                <img src={image} alt="Oxímetro de pulso" style={{width: '100px', marginTop: '10px'}} />
              </li>
              <li>
                Tensiómetro
                <img src={image} alt="Tensiómetro" style={{width: '100px', marginTop: '10px'}} />
              </li>
              <li>
                Estetoscopio
                <img src={image} alt="Estetoscopio" style={{width: '100px', marginTop: '10px'}} />
              </li>
              <li>
                Botiquín básico
                <img src={image} alt="Botiquín básico" style={{width: '100px', marginTop: '10px'}} />
              </li>
            </ol>
          </div>
          <div>
            <h3>Lista desordenada de Categorías</h3>
            <ul className="list">
              <li>
                Diagnóstico
                <img src={image} alt="Diagnóstico" style={{width: '100px', marginTop: '10px'}} className="wiggle" />
                <span className="effect-note">Animacion AQUI!!!</span>
              </li>
              <li>
                Monitoreo
                <img src={image} alt="Monitoreo" style={{width: '100px', marginTop: '10px'}} />
              </li>
              <li>
                Protección personal
                <img src={image} alt="Protección personal" style={{width: '100px', marginTop: '10px'}} />
              </li>
              <li>
                Movilidad
                <img src={image} alt="Movilidad" style={{width: '100px', marginTop: '10px'}} />
              </li>
              <li>
                Farmacia
                <img src={image} alt="Farmacia" style={{width: '100px', marginTop: '10px'}} />
              </li>
            </ul>
          </div>
        </div>
      </section>

      <button disabled>Ejemplo!</button>
      <a href="https://www.youtube.com/">https://www.youtube.com/</a>
    </div>
  )
}
