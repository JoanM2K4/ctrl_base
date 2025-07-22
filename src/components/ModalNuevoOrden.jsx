import { useState, useEffect } from "react"

function ModalNuevoOrden({ onOrdenCreada }) {
  const [form, setForm] = useState({ proveedor_id: "", observaciones: "" })
  const [carrito, setCarrito] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch("/api/proveedores/listar_proveedores.php")
      .then(res => res.json())
      .then(setProveedores)
    fetch("/api/inventario/listar_inventario.php")
      .then(res => res.json())
      .then(setProductos)
  }, [])

  const handleProveedorChange = (e) => {
    const nuevoProveedor = e.target.value
    if (nuevoProveedor !== form.proveedor_id && carrito.length > 0) {
      if (confirm("⚠️ Cambiar de proveedor vaciará el carrito. ¿Deseas continuar?")) {
        setCarrito([])
      } else {
        return
      }
    }
    setForm({ ...form, proveedor_id: nuevoProveedor })
  }

  const agregarProducto = (producto) => {
    const existente = carrito.find(p => p.producto_id === producto.producto_id)
    if (existente) {
      setCarrito(carrito.map(p =>
        p.producto_id === producto.producto_id
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      ))
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1, precio_unitario: producto.precio }])
    }
  }

  const quitarProducto = (producto_id) => {
    setCarrito(carrito.filter(p => p.producto_id !== producto_id))
  }

  const actualizarCantidad = (producto_id, cantidad) => {
    setCarrito(carrito.map(p =>
      p.producto_id === producto_id ? { ...p, cantidad } : p
    ))
  }

  const calcularTotal = () => {
    return carrito.reduce((total, p) =>
      total + (p.cantidad * p.precio_unitario), 0
    ).toFixed(2)
  }

  const productosFiltrados = productos.filter(p =>
    parseInt(p.proveedor_id) === parseInt(form.proveedor_id)
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (carrito.length === 0) {
      alert("⚠️ Debes agregar al menos un producto antes de guardar.")
      return
    }
    const res = await fetch("/api/ordenes/insertar_orden.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, productos: carrito })
    })
    const data = await res.json()
    if (res.ok) {
      const toast = document.getElementById("notificaciones")
      toast.innerHTML = `<div class="alert alert-success"><span>✅ Orden creada correctamente</span></div>`
      setTimeout(() => (toast.innerHTML = ""), 3000)
      setForm({ proveedor_id: "", observaciones: "" })
      setCarrito([])
      onOrdenCreada()
      document.getElementById("modal-nuevo-orden").checked = false
    } else {
      alert(data.error || "❌ Error al crear la orden.")
    }
  }

  return (
    <>
      <input type="checkbox" id="modal-nuevo-orden" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Nueva Orden de Compra</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select name="proveedor_id" value={form.proveedor_id} onChange={handleProveedorChange} className="select select-bordered w-full" required>
              <option value="">Selecciona proveedor</option>
              {proveedores.map(p => (
                <option key={p.proveedor_id} value={p.proveedor_id}>{p.nombre}</option>
              ))}
            </select>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Observaciones"
              value={form.observaciones}
              onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
            ></textarea>

            <h4 className="font-semibold">Productos</h4>
            {form.proveedor_id ? (
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1 rounded">
                {productosFiltrados.map(p => (
                  <button type="button" key={p.producto_id} className="btn btn-outline" onClick={() => agregarProducto(p)}>
                    {p.nombre}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Selecciona un proveedor para ver sus productos.</p>
            )}

            <h4 className="font-semibold mt-4">Carrito</h4>
            <ul className="space-y-2 max-h-60 overflow-y-auto p-2 rounded">
              {carrito.map(p => (
                <li key={p.producto_id} className="flex justify-between items-center border p-2 rounded">
                  <div>
                    <p className="font-bold">{p.nombre}</p>
                    <p className="text-sm">Precio: ${p.precio_unitario}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      className="input input-bordered w-20"
                      value={p.cantidad}
                      onChange={(e) => actualizarCantidad(p.producto_id, parseInt(e.target.value))}
                    />
                    <button type="button" className="btn btn-sm btn-error" onClick={() => quitarProducto(p.producto_id)}>Quitar</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between mt-4">
              <p className="font-bold text-lg">Total: ${calcularTotal()}</p>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Guardar</button>
                <label htmlFor="modal-nuevo-orden" className="btn">Cancelar</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalNuevoOrden
