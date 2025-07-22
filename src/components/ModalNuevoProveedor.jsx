import { useState } from "react"

function ModalNuevoProveedor({ onProveedorCreado }) {
  const [form, setForm] = useState({
    nombre: "",
    contacto: "",
    telefono: "",
    email: "",
    direccion: "",
    imagen_url: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/proveedores/insertar_proveedor.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (res.ok) {
      const toast = document.getElementById("notificaciones")
      toast.innerHTML = `<div class="alert alert-success"><span>✅ Proveedor creado</span></div>`
      setTimeout(() => (toast.innerHTML = ""), 3000)
      setForm({ nombre: "", contacto: "", telefono: "", email: "", direccion: "", imagen_url: "" })
      onProveedorCreado()
      document.getElementById("modal-nuevo-proveedor").checked = false
    } else {
      alert(data.error || "❌ Error al crear proveedor.")
    }
  }

  return (
    <>
      <input type="checkbox" id="modal-nuevo-proveedor" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4">Nuevo Proveedor</h3>
          <form onSubmit={handleSubmit} className="space-y-3 max-h-96 overflow-y-auto p-1">
            <input type="text" name="nombre" placeholder="Nombre" className="input input-bordered w-full" value={form.nombre} onChange={handleChange} required />
            <input type="text" name="contacto" placeholder="Contacto" className="input input-bordered w-full" value={form.contacto} onChange={handleChange} />
            <input type="text" name="telefono" placeholder="Teléfono" className="input input-bordered w-full" value={form.telefono} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo electrónico" className="input input-bordered w-full" value={form.email} onChange={handleChange} required />
            <textarea name="direccion" placeholder="Dirección" className="textarea textarea-bordered w-full" value={form.direccion} onChange={handleChange}></textarea>
            <input type="text" name="imagen_url" placeholder="URL de la imagen (opcional)" className="input input-bordered w-full" value={form.imagen_url} onChange={handleChange} />
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Guardar</button>
              <label htmlFor="modal-nuevo-proveedor" className="btn">Cancelar</label>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalNuevoProveedor
