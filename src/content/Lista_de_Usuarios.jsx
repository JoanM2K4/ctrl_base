import { useState, useEffect } from "react"
import CardUsuario from "../components/CardUsuario"
import ModalNuevoUsuario from "../components/ModalNuevoUsuario"
import ModalEditarUsuario from "../components/ModalEditarUsuario"

function Lista_de_Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [usuarioEditar, setUsuarioEditar] = useState(null)

  const cargarUsuarios = () => {
    fetch("/api/usuarios.php")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Usuarios</h2>

      <div className="mb-4 flex justify-between gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Buscar"
          className="input input-bordered mb-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") setBusqueda(e.target.value)
          }}
        />
        <ModalNuevoUsuario onUsuarioCreado={cargarUsuarios} />
        {usuarioEditar && (
          <ModalEditarUsuario
            usuario={usuarioEditar}
            onActualizado={cargarUsuarios}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuariosFiltrados.map((u) => (
          <CardUsuario key={u.usuario_id} usuario={u} onEditar={setUsuarioEditar} />
        ))}
      </div>
    </div>
  )
}

export default Lista_de_Usuarios
