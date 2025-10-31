import React, { useState } from 'react'
import '../styles/pagina-uno.css'

export default function PaginaUno(){
  const [form, setForm] = useState({
    codigo: '',
    fecha: '',
    nombre: '',
    monto: '',
    cantidadCombo: '',
    sucursal: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Formulario enviado!')
  }

  const handleCancel = () => {
    setForm({ codigo:'', fecha:'', nombre:'', monto:'', cantidadCombo:'', sucursal:'' })
    alert('Formulario reseteado')
  }

  return (
    <div className="grid" style={{gap:'1.5rem'}}>
      <section className="card">
        <div className="grid cols-2">
          <div className="card">
            <h3>Tabla Productos</h3>
            <div className="card custom">
              <p className="intro">Este párrafo demuestra un ejemplo en acción.</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Sucursal</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1001</td><td>Termómetro Digital</td><td>San José Centro</td><td>25</td></tr>
                <tr><td>1002</td><td>Estetoscopio</td><td>Escazú</td><td>10</td></tr>
                <tr><td>1003</td><td>Oxímetro</td><td>Desamparados</td><td>15</td></tr>
              </tbody>
            </table>
          </div>
          <div className="card">
            <h3>Tabla Precios</h3>
            <div className="effects-uno">
              <button className="demo-btn">Hover / Active ejemplo</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Moneda</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1001</td><td>Termómetro Digital</td><td>₡8,500</td><td>CRC</td></tr>
                <tr><td>1002</td><td>Estetoscopio</td><td>₡35,000</td><td>CRC</td></tr>
                <tr><td>1003</td><td>Oxímetro</td><td>₡19,900</td><td>CRC</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Registrar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div>
              <label htmlFor="codigo">Codigo de producto</label>
              <input type="number" id="codigo" name="codigo" required value={form.codigo} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="fecha">Fecha de producto</label>
              <input type="date" id="fecha" name="fecha" required value={form.fecha} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="nombre">Nombre del producto</label>
              <input type="text" placeholder='prueba' id="nombre" name="nombre" required value={form.nombre} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="monto">Monto del producto</label>
              <input type="number" step="0.01" id="monto" name="monto" required value={form.monto} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="cantidadCombo">Cantidad en combo</label>
              <input type="number" id="cantidadCombo" name="cantidadCombo" required value={form.cantidadCombo} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="sucursal">Sucursal</label>
              <select id="sucursal" name="sucursal" required value={form.sucursal} onChange={handleChange}>
                <option value="">Seleccione…</option>
                <option>San José Centro</option>
                <option>Escazú</option>
                <option>Desamparados</option>
                <option>Guadalupe</option>
                <option>Pavas</option>
              </select>
            </div>
          </div>
          <div className="btns" style={{marginTop: '1rem'}}>
            <button type="submit">Aceptar</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
          </div>
          <div style={{marginTop:'.6rem'}}>
            <h3 className="h3-title">Lista de prueba</h3>
            <ol className="demo-list">
              <li>Elemento uno</li>
              <li>Elemento dos</li>
              <li>Elemento tres</li>
            </ol>
          </div>
        </form>
      </section>
    </div>
  )
}
