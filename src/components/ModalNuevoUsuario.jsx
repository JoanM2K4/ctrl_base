import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function ModalNuevoUsuario({ onUsuarioCreado }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol_id: 1
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const mostrarToast = (tipo, mensaje) => {
    const toast = document.getElementById("notificaciones")
    if (toast) {
      toast.innerHTML = `
        <div class="alert alert-${tipo}">
          <span>${mensaje}</span>
        </div>`
      setTimeout(() => (toast.innerHTML = ""), 3000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/insertar_usuario.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        mostrarToast("success", "✅ Usuario creado")
        setForm({ nombre: "", email: "", password: "", rol_id: 1 })
        onUsuarioCreado()
        document.getElementById("modal-usuario").checked = false
      } else {
        mostrarToast("error", "❌ " + (data.error || "Error desconocido"))
      }
    } catch (err) {
      mostrarToast("error", "❌ Error de red")
    }
  }

  return (
    <>
      {/* Botón para abrir modal */}
      <label htmlFor="modal-usuario" className="btn btn-accent mb-4">
        <FontAwesomeIcon icon={faPlus} /> Nuevo Usuario
      </label>

      {/* Modal */}
      <input type="checkbox" id="modal-usuario" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Nuevo Usuario</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="input input-bordered w-full"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="input input-bordered w-full"
              value={form.password}
              onChange={handleChange}
              required
            />
            <select
              name="rol_id"
              className="select select-bordered w-full"
              value={form.rol_id}
              onChange={handleChange}
              required
            >
              <option value="1">Administrador</option>
              <option value="2">Contable</option>
              <option value="3">Empleado</option>
            </select>
            <div className="modal-action">
              <button className="btn btn-primary" type="submit">Crear</button>
              <label htmlFor="modal-usuario" className="btn">Cancelar</label>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalNuevoUsuario
