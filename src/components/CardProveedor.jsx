import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'

function CardProveedor({ proveedor, onEditar, onEliminar, onVer }) {
  return (
    <div className="card bg-white shadow-md p-4 flex flex-col">
      <img
        src={proveedor.imagen_url || "/placeholder.png"}
        alt={proveedor.nombre}
        className="h-32 w-32 object-cover mx-auto mb-2 rounded-full border"
      />
      <h3 className="font-bold text-blue-950 text-center">{proveedor.nombre}</h3>
      <p className="text-sm text-gray-600 text-center">{proveedor.telefono}</p>
      <p className="text-sm text-gray-600 text-center">{proveedor.email}</p>
      <div className="flex justify-center gap-2 mt-4">
        <label
          htmlFor="modal-ver-productos"
          className="btn btn-sm btn-primary"
          onClick={() => onVer(proveedor)}
        >
          <FontAwesomeIcon icon={faEye} /> Ver
        </label>
        <label
          htmlFor="modal-editar-proveedor"
          className="btn btn-sm btn-primary"
          onClick={() => onEditar(proveedor)}
        >
          <FontAwesomeIcon icon={faEdit} /> Editar
        </label>
        <button
          className="btn btn-sm btn-error"
          onClick={() => onEliminar(proveedor.proveedor_id)}
        >
          <FontAwesomeIcon icon={faTrash} /> Eliminar
        </button>
      </div>
    </div>
  )
}

export default CardProveedor
