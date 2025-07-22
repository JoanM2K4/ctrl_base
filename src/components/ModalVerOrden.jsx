import { useEffect, useState } from "react"

function ModalVerOrden({ orden, onCerrar }) {
  const [detalles, setDetalles] = useState([])

  useEffect(() => {
    if (orden) {
      fetch(`/api/ordenes/ver_orden.php?orden_id=${orden.orden_id}`)
        .then(res => res.json())
        .then(data => setDetalles(data.productos))
    }
  }, [orden])

  const calcularTotal = () => {
    return detalles.reduce((total, p) =>
      total + (p.cantidad * p.precio_unitario), 0
    ).toFixed(2)
  }

  const handleClose = () => {
    document.getElementById("modal-ver-orden").checked = false
    setDetalles([]) // Limpia detalles al cerrar
    onCerrar()
  }

  return (
    <>
      <input type="checkbox" id="modal-ver-orden" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Detalle de Orden #{orden.orden_id}</h3>
          <p><b>Proveedor:</b> {orden.proveedor}</p>
          <p><b>Usuario:</b> {orden.usuario}</p>
          <p><b>Fecha:</b> {orden.fecha}</p>
          <p><b>Estado:</b> {orden.estado}</p>
          <p><b>Observaciones:</b> {orden.observaciones || "Sin observaciones"}</p>

          <h4 className="font-semibold mt-4">Productos</h4>
          <ul className="space-y-2 max-h-60 overflow-y-auto p-2 rounded">
            {detalles.map(p => (
              <li key={p.producto_id} className="flex justify-between border p-2 rounded">
                <div>
                  <p className="font-bold">{p.nombre}</p>
                  <p className="text-sm">Cantidad: {p.cantidad}</p>
                  <p className="text-sm">Precio unitario: ${p.precio_unitario}</p>
                </div>
                <p className="font-semibold">Subtotal: ${(p.cantidad * p.precio_unitario).toFixed(2)}</p>
              </li>
            ))}
          </ul>

          <p className="font-bold text-lg mt-4">Total: ${calcularTotal()}</p>
          <div className="modal-action">
            <label htmlFor="modal-ver-orden" className="btn" onClick={handleClose}>Cerrar</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalVerOrden
