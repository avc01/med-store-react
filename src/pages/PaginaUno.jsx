import React, { useEffect, useMemo, useState } from 'react'
import '../styles/pagina-uno.css'

const INITIAL_FORM = {
  codigo: '',
  fecha: '',
  nombre: '',
  monto: '',
  cantidadCombo: '',
  sucursal: ''
}

const STORAGE_KEY = 'med-store-productos'

const sucursalesDisponibles = [
  'San José Centro',
  'Escazú',
  'Desamparados',
  'Guadalupe',
  'Pavas'
]

export default function PaginaUno() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [externalForm, setExternalForm] = useState(undefined)
  const [products, setProducts] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('No se pudo leer del almacenamiento local', error)
      return []
    }
  })
  const [jsonFileSnapshot, setJsonFileSnapshot] = useState('[]')
  const [medics, setMedics] = useState([])
  const [draggedItem, setDraggedItem] = useState(null)
  const [droppedItems, setDroppedItems] = useState([])

  const demoItems = [
    { id: 1, name: 'Producto 1', type: 'product' },
    { id: 2, name: 'Producto 2', type: 'product' },
    { id: 3, name: 'Servicio 1', type: 'service' },
    { id: 4, name: 'Servicio 2', type: 'service' }
  ]

  useEffect(() => {
    fetch('/productos.json')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setJsonFileSnapshot(JSON.stringify(data, null, 2))
          setProducts(prev => {
            if (prev.length > 0) return prev
            return data.map(item => ({
              ...item,
              monto: Number(item.monto),
              cantidadCombo: Number(item.cantidadCombo),
              registradoEn: item.registradoEn ?? new Date().toISOString()
            }))
          })
        } else {
          setJsonFileSnapshot('[]')
        }
      })
      .catch(() => {
        setJsonFileSnapshot('[]')
      })
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    }
  }, [products])

  useEffect(() => {
    fetch('http://localhost:3001/list-medics')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMedics(data)
        }
      })
      .catch(error => {
        console.error('Error fetching medics:', error)
      })
  }, [])

  const resumen = useMemo(() => {
    const total = products.reduce((acc, item) => acc + (Number(item.monto) || 0), 0)
    const combos = products.reduce((acc, item) => acc + (Number(item.cantidadCombo) || 0), 0)
    return {
      cantidad: products.length,
      totalMonto: total,
      totalCombos: combos
    }
  }, [products])

  const jsonPreview = useMemo(() => JSON.stringify(products, null, 2), [products])
  const medicsJsonPreview = useMemo(() => JSON.stringify(medics, null, 2), [medics])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!String(form.codigo).trim()) newErrors.codigo = 'Ingrese un código de producto.'
    if (!String(form.fecha).trim()) newErrors.fecha = 'Seleccione la fecha.'
    if (!String(form.nombre).trim()) newErrors.nombre = 'Ingrese el nombre del producto.'
    if (!String(form.monto).trim()) {
      newErrors.monto = 'Indique el monto del producto.'
    } else if (Number(form.monto) <= 0) {
      newErrors.monto = 'El monto debe ser mayor a cero.'
    }
    if (!String(form.cantidadCombo).trim()) {
      newErrors.cantidadCombo = 'Ingrese la cantidad en combo.'
    } else if (Number(form.cantidadCombo) <= 0) {
      newErrors.cantidadCombo = 'La cantidad debe ser positiva.'
    }
    if (!String(form.sucursal).trim()) newErrors.sucursal = 'Seleccione una sucursal.'
    return newErrors
  }

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setErrors({})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setStatus({ type: 'danger', message: 'Revisa los campos resaltados antes de continuar.' })
      return
    }

    const nuevoProducto = {
      codigo: form.codigo.trim(),
      fecha: form.fecha,
      nombre: form.nombre.trim(),
      monto: Number(form.monto),
      cantidadCombo: Number(form.cantidadCombo),
      sucursal: form.sucursal,
      registradoEn: new Date().toISOString()
    }

    setProducts(prev => [...prev, nuevoProducto])
    setStatus({ type: 'success', message: 'Producto registrado correctamente.' })
    resetForm()
  }

  const handleCancel = () => {
    resetForm()
    setStatus({ type: 'secondary', message: 'El formulario fue limpiado.' })
  }

  const fetchForm = () => {

    fetch("http://localhost:3001/form")
      .then((res) => res.text())
      .then((html) => setExternalForm(html))
      .catch((err) => {
        debugger;
        console.error("Error fetching form:", err);
      });

    // setExternalForm("Formulario cargado desde API (simulado)")
  }

  const removeForm = () => {
    // todo: implementar carga de formulario desde API
    setExternalForm(undefined)
  }

  const handleDownload = () => {
    const blob = new Blob([jsonPreview], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'productos.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDragStart = (event, item) => {
    setDraggedItem(item)
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (event) => {
    event.preventDefault()
    if (draggedItem) {
      setDroppedItems(prev => [...prev, draggedItem])
      setDraggedItem(null)
    }
  }

  const clearDroppedItems = () => {
    setDroppedItems([])
  }

  return (
    <div className="row g-4">
      <section className="col-12 col-xl-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <h2 className="card-title h4">Registrar producto</h2>
            <p className="text-muted">Todos los campos son obligatorios.</p>

            {status && (
              <div className={`alert alert-${status.type} d-flex align-items-center gap-2`} role="alert">
                <span>{status.message}</span>
              </div>
            )}

            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="codigo" className="form-label">Código de producto</label>
                  <input
                    type="number"
                    className={`form-control${errors.codigo ? ' is-invalid' : ''}`}
                    id="codigo"
                    name="codigo"
                    value={form.codigo}
                    onChange={handleChange}
                  />
                  {errors.codigo && <div className="invalid-feedback">{errors.codigo}</div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="fecha" className="form-label">Fecha de ingreso</label>
                  <input
                    type="date"
                    className={`form-control${errors.fecha ? ' is-invalid' : ''}`}
                    id="fecha"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                  />
                  {errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>}
                </div>
                <div className="col-12">
                  <label htmlFor="nombre" className="form-label">Nombre del producto</label>
                  <input
                    type="text"
                    className={`form-control${errors.nombre ? ' is-invalid' : ''}`}
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Termómetro digital"
                  />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="monto" className="form-label">Monto del producto (₡)</label>
                  <input
                    type="number"
                    step="0.01"
                    className={`form-control${errors.monto ? ' is-invalid' : ''}`}
                    id="monto"
                    name="monto"
                    value={form.monto}
                    onChange={handleChange}
                  />
                  {errors.monto && <div className="invalid-feedback">{errors.monto}</div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="cantidadCombo" className="form-label">Cantidad en combo</label>
                  <input
                    type="number"
                    className={`form-control${errors.cantidadCombo ? ' is-invalid' : ''}`}
                    id="cantidadCombo"
                    name="cantidadCombo"
                    value={form.cantidadCombo}
                    onChange={handleChange}
                  />
                  {errors.cantidadCombo && <div className="invalid-feedback">{errors.cantidadCombo}</div>}
                </div>
                <div className="col-12">
                  <label htmlFor="sucursal" className="form-label">Sucursal</label>
                  <select
                    id="sucursal"
                    name="sucursal"
                    className={`form-select${errors.sucursal ? ' is-invalid' : ''}`}
                    value={form.sucursal}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione una sucursal…</option>
                    {sucursalesDisponibles.map((sucursal) => (
                      <option key={sucursal} value={sucursal}>{sucursal}</option>
                    ))}
                  </select>
                  {errors.sucursal && <div className="invalid-feedback">{errors.sucursal}</div>}
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 mt-4">
                <button type="submit" className="btn btn-primary">Guardar producto</button>
                <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Limpiar formulario</button>
                <button type="button" className="btn btn-outline-success ms-auto" onClick={handleDownload} disabled={products.length === 0}>
                  Descargar JSON
                </button>
              </div>
            </form>
          </div>
          <div className="card-body"><h2 className="card-title h4">Crear Medico</h2>
            <p className="text-muted">Todos los campos son obligatorios.</p>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <button type="button" className="btn btn-outline-secondary" onClick={fetchForm}>Cargar Formulario</button>
              <button type="button" className="btn btn-dangerous" onClick={removeForm}>Eliminar Formulario</button>
            </div>

            {
              externalForm && <div dangerouslySetInnerHTML={{ __html: externalForm }} />
            }

          </div>
        </div>
      </section>

      <section className="col-12 col-xl-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <h2 className="card-title h4">Productos registrados</h2>

            {products.length === 0 ? (
              <div className="alert alert-info" role="alert">
                Aún no se han agregado productos. Completa el formulario para comenzar.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Sucursal</th>
                      <th scope="col" className="text-end">Monto (₡)</th>
                      <th scope="col" className="text-center">Combo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((producto, index) => (
                      <tr key={`${producto.codigo}-${index}`}>
                        <td>{producto.codigo}</td>
                        <td>
                          <span className="fw-semibold d-block">{producto.nombre}</span>
                          <small className="text-muted">Registrado el {new Date(producto.fecha).toLocaleDateString('es-CR')}</small>
                        </td>
                        <td>{producto.sucursal}</td>
                        <td className="text-end">{Number(producto.monto).toLocaleString('es-CR')}</td>
                        <td className="text-center">{producto.cantidadCombo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4">
              <h3 className="h6 text-uppercase text-muted">Vista previa del JSON generado</h3>
              <pre className="json-preview" aria-label="Arreglo de productos">{jsonPreview}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="col-12 mt-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h2 className="card-title h4">Lista de Médicos</h2>

            {medics.length === 0 ? (
              <div className="alert alert-info" role="alert">
                Cargando médicos...
              </div>
            ) : (
              <div>
                <h3 className="h6 text-uppercase text-muted mb-3">Vista previa del JSON de médicos</h3>
                <pre className="json-preview" aria-label="Arreglo de médicos">{medicsJsonPreview}</pre>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="col-12 mt-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h2 className="card-title h4">Demo de Drag & Drop</h2>
            <p className="text-muted">Arrastra los elementos de la izquierda a la zona de destino.</p>

            <div className="row">
              <div className="col-md-6">
                <h3 className="h6 text-uppercase text-muted mb-3">Elementos arrastrables</h3>
                <div className="d-flex flex-column gap-2">
                  {demoItems.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className="p-3 border rounded bg-light cursor-move"
                      style={{ cursor: 'move' }}
                    >
                      <span className="fw-semibold">{item.name}</span>
                      <small className="text-muted ms-2">({item.type})</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-6">
                <h3 className="h6 text-uppercase text-muted mb-3">Zona de destino</h3>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="p-4 border-2 border-dashed border-primary rounded bg-light min-vh-25 d-flex flex-column"
                  style={{ minHeight: '200px' }}
                >
                  {droppedItems.length === 0 ? (
                    <div className="text-muted text-center my-auto">
                      Suelta los elementos aquí
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-2">
                      {droppedItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="p-2 bg-white border rounded">
                          <span className="fw-semibold">{item.name}</span>
                          <small className="text-muted ms-2">({item.type})</small>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {droppedItems.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm mt-3"
                    onClick={clearDroppedItems}
                  >
                    Limpiar zona
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
