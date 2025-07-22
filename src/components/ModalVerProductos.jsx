import { useEffect, useState } from "react"

function ModalVerProductos({ proveedor, onCerrar }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/proveedores/listar_productos.php?proveedor_id=${proveedor.proveedor_id}`)
      .then(res => res.json())
      .then(data => {
        setProductos(data)
        setLoading(false)
      })
      .catch(() => {
        setProductos([])
        setLoading(false)
      })
  }, [proveedor])

  const handleClose = () => {
    setProductos([]) // Limpia productos al cerrar
    onCerrar()
  }

  return (
    <>
      <input type="checkbox" id="modal-ver-productos" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Productos de {proveedor.nombre}</h3>

          {loading ? (
            <p className="text-center text-gray-500">Cargando productos...</p>
          ) : productos.length === 0 ? (
            <p className="text-center text-gray-500">Este proveedor no suministra productos.</p>
          ) : (
            <ul className="space-y-2 max-h-60 overflow-y-auto p-2 rounded">
              {productos.map(p => (
                <li key={p.producto_id} className="border p-2 rounded">
                  <p className="font-bold">{p.nombre}</p>
                  <p className="text-sm">Precio: ${p.precio}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="modal-action">
            <label htmlFor="modal-ver-productos" className="btn" onClick={handleClose}>
              Cerrar
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalVerProductos
