import Menu_fondo from '../components/Menu_fondo.jsx'
import Menu_contenido from '../components/Menu_contenido.jsx'

function Menu({ onSeleccionarSeccion, seccionActiva }) {
  return (
    <div className="w-64 h-full flex-shrink-0 flex-grow-0 bg-menu-color rounded-lg shadow-2xl min-w-32">
      <Menu_fondo>
        <Menu_contenido 
          onSeleccionarSeccion={onSeleccionarSeccion}
          seccionActiva={seccionActiva}
        />
      </Menu_fondo>
    </div>
  )
}

export default Menu
