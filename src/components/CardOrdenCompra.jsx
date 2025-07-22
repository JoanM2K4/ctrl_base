import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faEye, faCheck, faLock } from '@fortawesome/free-solid-svg-icons'

function CardOrdenCompra({ orden, onEditar, onEliminar, onVer, cambiarEstado }) {
  return (
    <div className="card bg-white shadow-md p-4">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-blue-950">Orden #{orden.orden_id}</h3>
          <p className="text-sm text-gray-700">Proveedor: {orden.proveedor}</p>
          <p className="text-sm text-gray-700">Usuario: {orden.usuario}</p>
          <p className="text-sm text-gray-700">Fecha: {orden.fecha}</p>
          <p className={`text-sm font-semibold ${orden.estado === 'Completada' ? 'text-green-600' : 'text-yellow-600'}`}>
            Estado: {orden.estado}
          </p>
          {orden.estado === 'Completada' && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FontAwesomeIcon icon={faLock} /> Bloqueada
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {/* Botón Completar */}
          {orden.estado !== "Completada" && (
            <button
              className="btn btn-sm btn-success"
              onClick={() => cambiarEstado(orden.orden_id, "Completada")}
            >
              <FontAwesomeIcon icon={faCheck} /> Completar
            </button>
          )}

          {/* Botón Ver */}
          <label
            htmlFor="modal-ver-orden"
            className="btn btn-sm btn-primary"
            onClick={() => onVer(orden)}
          >
            <FontAwesomeIcon icon={faEye} /> Ver
          </label>

          {/* Botón Editar */}
          {orden.estado !== "Completada" && (
            <label
              htmlFor="modal-editar-orden"
              className="btn btn-sm btn-primary"
              onClick={() => onEditar(orden)}
            >
              <FontAwesomeIcon icon={faEdit} /> Editar
            </label>
          )}

          {/* Botón Eliminar */}
          {orden.estado !== "Completada" && (
            <button
              className="btn btn-sm btn-error"
              onClick={() => onEliminar(orden.orden_id)}
            >
              <FontAwesomeIcon icon={faTrash} /> Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardOrdenCompra
