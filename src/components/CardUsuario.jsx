import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

function CardUsuario({ usuario, onEditar }) {
  const estaActivo = usuario.activo === 1 || usuario.activo === true || usuario.activo === "1";

  return (
    <div className="card bg-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full mr-4 bg-gray-500 flex items-center justify-center text-white font-bold">
            {usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h3 className="font-bold text-blue-950">{usuario.nombre}</h3>
            <p className="font-bold text-blue-900">{usuario.rol}</p>
            <span className={estaActivo ? "text-green-500" : "text-red-500"}>
              {estaActivo ? "Conectado" : "Inactivo"}
            </span>
          </div>
        </div>
        <label
          htmlFor="modal-editar"
          className="btn btn-sm btn-primary"
          onClick={() => onEditar(usuario)}
          aria-label={`Editar usuario ${usuario.nombre}`}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Editar
        </label>
      </div>
    </div>
  )
}

export default CardUsuario
