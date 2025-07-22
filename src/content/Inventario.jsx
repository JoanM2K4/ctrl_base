import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faList, faSearch, faFilter, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import ModalEditarProducto from "../components/ModalEditarProducto.jsx"
import ModalNuevoProducto from "../components/ModalNuevoProducto.jsx"

function Inventario() {
  const [productos, setProductos] = useState([])
  const [vista, setVista] = useState('grid') // grid o list
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('todos')
  const [productoEditar, setProductoEditar] = useState(null)

  const cargarProductos = () => {
    fetch("/api/inventario/listar_inventario.php")
      .then(res => res.json())
      .then(data => setProductos(data))
  }

  const eliminarProducto = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return
    const res = await fetch("/api/inventario/eliminar_producto.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ producto_id: id })
    })
    const data = await res.json()
    if (res.ok) {
      const toast = document.getElementById("notificaciones")
      toast.innerHTML = `<div class="alert alert-success"><span>✅ Producto eliminado</span></div>`
      setTimeout(() => (toast.innerHTML = ""), 3000)
      cargarProductos()
    } else {
      alert(data.error || "Error al eliminar producto")
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  const filtrados = productos.filter(p => {
    const nombreMatch = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const filtroMatch =
      filtro === 'todos' ||
      (filtro === 'agotado' && p.stock === 0) ||
      (filtro === 'poco' && p.stock <= p.stock_minimo && p.stock > 0)
    return nombreMatch && filtroMatch
  })

  const getEtiqueta = (stock, minimo) => {
    if (stock === 0) return { texto: 'Agotado', color: 'bg-red-600' }
    if (stock <= minimo) return { texto: 'Poco Stock', color: 'bg-yellow-500' }
    return null // ❌ Quita la etiqueta “En Camino”
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Inventario</h2>
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar..."
            className="input input-bordered w-60"
            onKeyDown={(e) => {
              if (e.key === "Enter") setBusqueda(e.target.value)
            }}
          />
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="btn btn-outline">
              <FontAwesomeIcon icon={faFilter} /> Filtros
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><button onClick={() => setFiltro('todos')}>Todos</button></li>
              <li><button onClick={() => setFiltro('agotado')}>Agotados</button></li>
              <li><button onClick={() => setFiltro('poco')}>Poco Stock</button></li>
            </ul>
          </div>
        </div>

        <div className="flex gap-2">
          <label htmlFor="modal-nuevo-producto" className="btn btn-accent">
            <FontAwesomeIcon icon={faPlus} /> Nuevo Producto
          </label>
          <button className={`btn ${vista === 'grid' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setVista('grid')}>
            <FontAwesomeIcon icon={faTh} /> Cards
          </button>
          <button className={`btn ${vista === 'list' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setVista('list')}>
            <FontAwesomeIcon icon={faList} /> Tabla
          </button>
        </div>
      </div>

      {vista === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtrados.map(p => {
            const etiqueta = getEtiqueta(p.stock, p.stock_minimo)
            return (
              <div key={p.producto_id} className="card bg-white shadow-md p-4 relative">
                {etiqueta && (
                  <span className={`absolute top-2 right-2 text-xs text-white px-2 py-1 rounded ${etiqueta.color}`}>
                    {etiqueta.texto}
                  </span>
                )}
                <img src={p.imagen_url || "/placeholder.png"} alt={p.nombre} className="h-32 object-contain mx-auto mb-2" />
                <h3 className="text-interface-color font-bold text-center">{p.nombre}</h3>
                <p className="text-interface-color text-sm text-center">Stock: {p.stock}</p>
                <div className="flex justify-center gap-2 mt-2">
                  <label
                    htmlFor="modal-editar-producto"
                    className="btn btn-sm btn-primary"
                    onClick={() => setProductoEditar(p)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Editar
                  </label>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => eliminarProducto(p.producto_id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(p => (
                <tr key={p.producto_id} className="hover">
                  <td className="flex items-center gap-2">
                    <img src={p.imagen_url || "/placeholder.png"} alt={p.nombre} className="h-10 w-10 object-contain" />
                    <span>{p.nombre}</span>
                  </td>
                  <td>
                    {p.stock}
                    {p.stock === 0 && <span className="ml-2 text-xs text-red-600">Agotado</span>}
                    {p.stock > 0 && p.stock <= p.stock_minimo && <span className="ml-2 text-xs text-yellow-600">Poco Stock</span>}
                  </td>
                  <td>${p.precio}</td>
                  <td className="flex gap-2">
                    <label
                      htmlFor="modal-editar-producto"
                      className="btn btn-sm btn-primary"
                      onClick={() => setProductoEditar(p)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </label>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => eliminarProducto(p.producto_id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {productoEditar && (
        <ModalEditarProducto
          producto={productoEditar}
          onActualizado={cargarProductos}
        />
      )}
      <ModalNuevoProducto onProductoCreado={cargarProductos} />
    </div>
  )
}

export default Inventario
