import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

function CardProducto({ producto, onEditar, onEliminar }) {
  return (
    <div className="card bg-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-blue-950">{producto.nombre}</h3>
          <p className="text-sm text-blue-900">Marca: {producto.marca}</p>
          <p className="text-sm">Stock: {producto.stock}</p>
          <p className="text-sm">Precio: ${producto.precio}</p>
        </div>
        <div className="flex gap-2">
          <label
            htmlFor="modal-editar-producto"
            className="btn btn-sm btn-primary"
            onClick={() => onEditar(producto)}
          >
            <FontAwesomeIcon icon={faEdit} className="mr-1" /> Editar
          </label>
          <button
            className="btn btn-sm btn-error"
            onClick={() => onEliminar(producto.producto_id)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-1" /> Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardProducto
