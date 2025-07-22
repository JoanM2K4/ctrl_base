import { useState, useEffect } from "react"
import CardProveedor from "../components/CardProveedor"
import ModalNuevoProveedor from "../components/ModalNuevoProveedor"
import ModalEditarProveedor from "../components/ModalEditarProveedor"
import ModalVerProductos from "../components/ModalVerProductos"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faList, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'

function Proveedores() {
  const [proveedores, setProveedores] = useState([])
  const [vista, setVista] = useState('cards')
  const [busqueda, setBusqueda] = useState('')
  const [proveedorEditar, setProveedorEditar] = useState(null)
  const [proveedorVer, setProveedorVer] = useState(null)

  const cargarProveedores = () => {
    fetch("/api/proveedores/listar_proveedores.php")
      .then(res => res.json())
      .then(data => setProveedores(data))
  }

  const eliminarProveedor = async (id) => {
    if (!confirm("¿Eliminar este proveedor?")) return
    const res = await fetch("/api/proveedores/eliminar_proveedor.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proveedor_id: id })
    })
    const data = await res.json()
    if (res.ok) {
      const toast = document.getElementById("notificaciones")
      toast.innerHTML = `<div class="alert alert-success"><span>✅ Proveedor eliminado</span></div>`
      setTimeout(() => (toast.innerHTML = ""), 3000)
      cargarProveedores()
    } else {
      const toast = document.getElementById("notificaciones")
      toast.innerHTML = `<div class="alert alert-error"><span>❌ ${data.error}</span></div>`
      setTimeout(() => (toast.innerHTML = ""), 3000)
    }
  }

  useEffect(() => {
    cargarProveedores()
  }, [])

  const filtrados = proveedores.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    || (p.telefono && p.telefono.toLowerCase().includes(busqueda.toLowerCase()))
    || (p.email && p.email.toLowerCase().includes(busqueda.toLowerCase()))
  )

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Proveedores</h2>
      <div className="flex justify-between mb-4 gap-2 flex-wrap">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar proveedor..."
            className="input input-bordered w-64"
            onKeyDown={(e) => {
              if (e.key === "Enter") setBusqueda(e.target.value)
            }}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="modal-nuevo-proveedor" className="btn btn-accent">
            <FontAwesomeIcon icon={faPlus} /> Nuevo Proveedor
          </label>
          <button className={`btn ${vista === 'cards' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setVista('cards')}>
            <FontAwesomeIcon icon={faTh} /> Cards
          </button>
          <button className={`btn ${vista === 'tabla' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setVista('tabla')}>
            <FontAwesomeIcon icon={faList} /> Tabla
          </button>
        </div>
      </div>

      <ModalNuevoProveedor onProveedorCreado={cargarProveedores} />
      {proveedorEditar && (
        <ModalEditarProveedor
          proveedor={proveedorEditar}
          onActualizado={cargarProveedores}
        />
      )}
      {proveedorVer && (
        <ModalVerProductos
          proveedor={proveedorVer}
          onCerrar={() => setProveedorVer(null)}
        />
      )}

      {vista === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtrados.map(p => (
            <CardProveedor
              key={p.proveedor_id}
              proveedor={p}
              onEditar={setProveedorEditar}
              onEliminar={eliminarProveedor}
              onVer={setProveedorVer}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(p => (
                <tr key={p.proveedor_id} className="hover">
                  <td>{p.nombre}</td>
                  <td>{p.telefono}</td>
                  <td>{p.email}</td>
                  <td className="flex gap-2">
                    <label htmlFor="modal-ver-productos" className="btn btn-sm btn-secondary" onClick={() => setProveedorVer(p)}>Ver</label>
                    <label htmlFor="modal-editar-proveedor" className="btn btn-sm btn-primary" onClick={() => setProveedorEditar(p)}>Editar</label>
                    <button className="btn btn-sm btn-error" onClick={() => eliminarProveedor(p.proveedor_id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Proveedores
