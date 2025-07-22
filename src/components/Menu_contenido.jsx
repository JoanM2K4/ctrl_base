import MenuEncabezado from './Menu_encabezado'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faFileAlt, faBox, faTruck, faExclamationCircle, faClipboardList } from '@fortawesome/free-solid-svg-icons'

function Menu_Contenido({ onSeleccionarSeccion, seccionActiva }) {
  const linkClass = (nombre) =>
    `flex w-full items-center p-2 transition-colors duration-200 rounded-lg ${
      seccionActiva === nombre ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'
    }`

  return (
    <div className="contenido flex flex-col items-start pt-0 pb-4 pl-4 text-white ">
      <MenuEncabezado />  
      <ul className='w-full pr-4'>
        <li className="mb-2">
          <button onClick={() => onSeleccionarSeccion('inicio')} className={linkClass('inicio')}>
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Inicio
          </button>
        </li>
        <li className="mb-2">
          <button onClick={() => onSeleccionarSeccion('usuarios')} className={linkClass('usuarios')}>
            <FontAwesomeIcon icon={faUsers} className="mr-2" /> Usuarios
          </button>
        </li>
        <li className="mb-2">
          <button onClick={() => onSeleccionarSeccion('proveedores')} className={linkClass('proveedores')}>
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Proveedores
          </button>
        </li>
        <li className="mb-2">
          <button onClick={() => onSeleccionarSeccion('inventario')} className={linkClass('inventario')}>
            <FontAwesomeIcon icon={faBox} className="mr-2" /> Inventario
          </button>
        </li>
        <li className="mb-2">
          <button onClick={() => onSeleccionarSeccion('ordenes')} className={linkClass('ordenes')}>
            <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> Órdenes de Compra
          </button>
        </li>
        <li className="mb-2">
          <button onClick={() => onSeleccionarSeccion('en_llegar')} className={linkClass('en_llegar')}>
            <FontAwesomeIcon icon={faTruck} className="mr-2" /> En camino
          </button>
        </li>
        <li className="mb-2">
          <button onClick={() => onSeleccionarSeccion('productos_agotados')} className={linkClass('productos_agotados')}>
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" /> Productos agotados
          </button>
        </li>
      </ul>
      <div className="w-full mt-auto pr-4">
        <p className="text-sm">Pedro Lopez</p>
        <p className="text-xs">lopez.pg@gmail.com</p>
      </div>
    </div>
  )
}

export default Menu_Contenido
