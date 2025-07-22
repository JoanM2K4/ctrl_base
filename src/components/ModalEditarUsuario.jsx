import { useEffect, useState } from "react"

function ModalEditarUsuario({ usuario, onActualizado }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    activo: 1,
    rol_id: 1,
    usuario_id: null,
  })

  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre || "",
        email: usuario.email || "",
        activo: usuario.activo ? 1 : 0,
        rol_id: usuario.rol_id ? Number(usuario.rol_id) : 1,
        usuario_id: usuario.usuario_id || null,
      })
    }
  }, [usuario])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === "activo" || name === "rol_id" ? Number(value) : value,
    }))
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
    const res = await fetch("/api/editar_usuario.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (res.ok) {
      mostrarToast("success", "✅ Usuario actualizado")
      setTimeout(() => {
        const modalCheckbox = document.getElementById("modal-editar")
        if (modalCheckbox) modalCheckbox.checked = false
        onActualizado()
      }, 1500)
    } else {
      mostrarToast("error", "❌ " + (data.error || "Error desconocido"))
    }
  } catch (err) {
    mostrarToast("error", "❌ Error de red")
  }
}


  return (
    <>
      <input type="checkbox" id="modal-editar" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4">Editar Usuario</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="nombre"
              className="input input-bordered w-full"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <select
              name="activo"
              className="select select-bordered w-full"
              value={form.activo}
              onChange={handleChange}
              required
            >
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
            <select
              name="rol_id"
              className="select select-bordered w-full"
              value={form.rol_id}
              onChange={handleChange}
              required
            >
              <option value={1}>Administrador</option>
              <option value={2}>Contable</option>
              <option value={3}>Empleado</option>
            </select>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <label htmlFor="modal-editar" className="btn cursor-pointer">
                Cancelar
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalEditarUsuario
