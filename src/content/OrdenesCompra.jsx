import { useState, useEffect } from "react"
import CardOrdenCompra from "../components/CardOrdenCompra"
import ModalNuevoOrden from "../components/ModalNuevoOrden"
import ModalEditarOrden from "../components/ModalEditarOrden"
import ModalVerOrden from "../components/ModalVerOrden"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function OrdenesCompra() {
  const [ordenes, setOrdenes] = useState([])
  const [ordenEditar, setOrdenEditar] = useState(null)
  const [ordenVer, setOrdenVer] = useState(null)

  const cargarOrdenes = () => {
    fetch("/api/ordenes/listar_ordenes.php")
      .then(res => res.json())
      .then(data => setOrdenes(data))
  }

  const eliminarOrden = async (id) => {
    if (!confirm("¿Eliminar esta orden?")) return
    const res = await fetch("/api/ordenes/eliminar_orden.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orden_id: id })
    })
    const data = await res.json()
    if (res.ok) {
      const toast = document.getElementById("notificaciones")
      toast.innerHTML = `<div class="alert alert-success"><span>✅ Orden eliminada</span></div>`
      setTimeout(() => (toast.innerHTML = ""), 3000)
      cargarOrdenes()
    }
  }

  const cambiarEstado = async (orden_id, estado) => {
    const res = await fetch("/api/ordenes/cambiar_estado_orden.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orden_id, estado })
    })
    const data = await res.json()
    if (res.ok) {
      const toast = document.getElementById("notificaciones")
      toast.innerHTML = `<div class="alert alert-success"><span>✅ Estado actualizado</span></div>`
      setTimeout(() => (toast.innerHTML = ""), 3000)
      cargarOrdenes()
    } else {
      const toast = document.getElementById("notificaciones")
      toast.innerHTML = `<div class="alert alert-error"><span>❌ ${data.error}</span></div>`
      setTimeout(() => (toast.innerHTML = ""), 3000)
    }
  }

  useEffect(() => {
    cargarOrdenes()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Órdenes de Compra</h2>
      
      {/* Botón para abrir modal de nueva orden */}
      <div className="mb-4 flex justify-start gap-4">
        <label htmlFor="modal-nuevo-orden" className="btn btn-accent">
          <FontAwesomeIcon icon={faPlus} /> Nueva Orden
        </label>
      </div>

      {/* Modales */}
      <ModalNuevoOrden onOrdenCreada={cargarOrdenes} />
      {ordenEditar && (
        <ModalEditarOrden
          orden={ordenEditar}
          onActualizado={cargarOrdenes}
        />
      )}
      {ordenVer && (
        <ModalVerOrden
          orden={ordenVer}
          onCerrar={() => setOrdenVer(null)} // Cierra modal al salir
        />
      )}

      {/* Cards de órdenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ordenes.map(o => (
          <CardOrdenCompra
            key={o.orden_id}
            orden={o}
            onEditar={setOrdenEditar}
            onEliminar={eliminarOrden}
            onVer={setOrdenVer}
            cambiarEstado={cambiarEstado}
          />
        ))}
      </div>
    </div>
  )
}

export default OrdenesCompra
