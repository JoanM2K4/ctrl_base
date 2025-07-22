import Menu from '../components/Menu.jsx'
import Contenido from '../content/container.jsx'
import Lista_de_Usuarios from '../content/Lista_de_Usuarios.jsx'
import Proveedores from '../content/Proveedores.jsx'
import Inventario from '../content/Inventario.jsx'
import OrdenesCompra from '../content/OrdenesCompra.jsx'
import EnLlegar from '../content/EnLlegar.jsx'
import ProductosAgotados from '../content/ProductosAgotados.jsx'
import Inicio from '../content/Inicio.jsx'
import { useState } from 'react'

function GerenteUsuarios() {
  const [seccion, setSeccion] = useState("inicio")

  const renderContenido = () => {
    switch (seccion) {
      case "usuarios": return <Lista_de_Usuarios />
      case "proveedores": return <Proveedores />
      case "inventario": return <Inventario />
      case "ordenes": return <OrdenesCompra />
      case "en_llegar": return <EnLlegar />
      case "productos_agotados": return <ProductosAgotados />
      case "inicio": default: return <Inicio />
    }
  }

  return (
    <div className="flex w-screen h-screen p-1 gap-1">
      <Menu onSeleccionarSeccion={setSeccion} seccionActiva={seccion} />
      <Contenido>
        {renderContenido()}
      </Contenido>
    </div>
  )
}

export default GerenteUsuarios
