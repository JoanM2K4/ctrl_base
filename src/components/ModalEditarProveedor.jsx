import { useState, useEffect } from "react"

function ModalEditarProveedor({ proveedor, onActualizado }) {
  const [form, setForm] = useState({
    nombre: "",
    contacto: "",
    telefono: "",
    email: "",
    direccion: "",
    imagen_url: ""
  })

  useEffect(() => {
    if (proveedor) {
      setForm(proveedor)
    }
  }, [proveedor])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/proveedores/editar_proveedor.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proveedor_id: proveedor.proveedor_id, ...form })
    })
    const data = await res.json()
    if (res.ok) {
      const toast = document.getElementById("notificaciones")
      toast.innerHTML = `<div class="alert alert-success"><span>✅ Proveedor actualizado</span></div>`
      setTimeout(() => (toast.innerHTML = ""), 3000)
      onActualizado()
      document.getElementById("modal-editar-proveedor").checked = false
    } else {
      alert(data.error || "❌ Error al actualizar proveedor.")
    }
  }

  return (
    <>
      <input type="checkbox" id="modal-editar-proveedor" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4">Editar Proveedor</h3>
          <form onSubmit={handleSubmit} className="space-y-3 max-h-96 overflow-y-auto p-1">
            <input type="text" name="nombre" placeholder="Nombre" className="input input-bordered w-full" value={form.nombre} onChange={handleChange} required />
            <input type="text" name="contacto" placeholder="Contacto" className="input input-bordered w-full" value={form.contacto} onChange={handleChange} />
            <input type="text" name="telefono" placeholder="Teléfono" className="input input-bordered w-full" value={form.telefono} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo electrónico" className="input input-bordered w-full" value={form.email} onChange={handleChange} required />
            <textarea name="direccion" placeholder="Dirección" className="textarea textarea-bordered w-full" value={form.direccion} onChange={handleChange}></textarea>
            <input type="text" name="imagen_url" placeholder="URL de la imagen (opcional)" className="input input-bordered w-full" value={form.imagen_url} onChange={handleChange} />
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Guardar</button>
              <label htmlFor="modal-editar-proveedor" className="btn">Cancelar</label>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalEditarProveedor
