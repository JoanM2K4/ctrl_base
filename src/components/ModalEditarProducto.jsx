import { useEffect, useState } from "react"

function ModalEditarProducto({ producto, onActualizado }) {
  const [form, setForm] = useState({})
  const [categorias, setCategorias] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [medidas, setMedidas] = useState([])
  const [impuestos, setImpuestos] = useState([])
  const [nuevaImagen, setNuevaImagen] = useState(null)

  useEffect(() => {
    if (producto) {
      setForm(producto)
      setNuevaImagen(null) // limpia la imagen al abrir modal
    }
  }, [producto])

  useEffect(() => {
    fetch("/api/categorias/listar_categorias.php").then(res => res.json()).then(setCategorias)
    fetch("/api/proveedores/listar_proveedores.php").then(res => res.json()).then(setProveedores)
    fetch("/api/medidas/listar_medidas.php").then(res => res.json()).then(setMedidas)
    fetch("/api/impuestos/listar_impuestos.php").then(res => res.json()).then(setImpuestos)
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setNuevaImagen(e.target.files[0])
  }

  const mostrarToast = (tipo, mensaje) => {
    const toast = document.getElementById("notificaciones")
    if (toast) {
      toast.innerHTML = `<div class="alert alert-${tipo}"><span>${mensaje}</span></div>`
      setTimeout(() => (toast.innerHTML = ""), 3000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(form).forEach(key => formData.append(key, form[key]))
    if (nuevaImagen) formData.append('imagen', nuevaImagen)

    try {
      const res = await fetch("/api/inventario/editar_producto.php", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        mostrarToast("success", "✅ Producto actualizado")
        onActualizado()
        document.getElementById("modal-editar-producto").checked = false
      } else {
        mostrarToast("error", "❌ " + (data.error || "Error desconocido"))
      }
    } catch (err) {
      mostrarToast("error", "❌ Error de red")
    }
  }

  return (
    <>
      <input type="checkbox" id="modal-editar-producto" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4">Editar Producto</h3>
          <form onSubmit={handleSubmit} className="space-y-3" encType="multipart/form-data">
            {["nombre", "marca", "precio", "stock", "stock_minimo"].map((field) => (
              <input
                key={field}
                type={field.includes("precio") || field.includes("stock") ? "number" : "text"}
                name={field}
                className="input input-bordered w-full"
                value={form[field] || ""}
                onChange={handleChange}
                placeholder={field.replace("_", " ").toUpperCase()}
                required
              />
            ))}
            {/* Dropdowns */}
            <select name="categoria_id" value={form.categoria_id} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="">Selecciona categoría</option>
              {categorias.map(c => <option key={c.categoria_id} value={c.categoria_id}>{c.nombre}</option>)}
            </select>
            <select name="proveedor_id" value={form.proveedor_id} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="">Selecciona proveedor</option>
              {proveedores.map(p => <option key={p.proveedor_id} value={p.proveedor_id}>{p.nombre}</option>)}
            </select>
            <select name="medida_id" value={form.medida_id} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="">Selecciona medida</option>
              {medidas.map(m => <option key={m.medida_id} value={m.medida_id}>{m.nombre}</option>)}
            </select>
            <select name="impuesto_id" value={form.impuesto_id} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="">Selecciona impuesto</option>
              {impuestos.map(i => <option key={i.impuesto_id} value={i.impuesto_id}>{i.nombre} ({i.porcentaje}%)</option>)}
            </select>
            {/* Imagen */}
            <div className="mt-2">
              <label className="block text-sm mb-1">Imagen actual:</label>
              <img src={form.imagen_url || "/placeholder.png"} alt={form.nombre} className="h-20 object-contain mb-2 border rounded" />
              <input type="file" accept="image/*" onChange={handleFileChange} className="file-input file-input-bordered w-full" />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Guardar</button>
              <label htmlFor="modal-editar-producto" className="btn">Cancelar</label>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalEditarProducto
