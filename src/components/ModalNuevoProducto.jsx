import { useEffect, useState } from "react"

function ModalNuevoProducto({ onProductoCreado }) {
  const [form, setForm] = useState({
    nombre: "",
    marca: "",
    precio: "",
    stock: "",
    stock_minimo: "",
    categoria_id: "",
    proveedor_id: "",
    medida_id: "",
    impuesto_id: ""
  })
  const [categorias, setCategorias] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [medidas, setMedidas] = useState([])
  const [impuestos, setImpuestos] = useState([])
  const [imagen, setImagen] = useState(null)

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
    setImagen(e.target.files[0])
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
    if (imagen) formData.append('imagen', imagen)

    try {
      const res = await fetch("/api/inventario/insertar_producto.php", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        mostrarToast("success", "✅ Producto creado")
        setForm({
          nombre: "", marca: "", precio: "", stock: "", stock_minimo: "",
          categoria_id: "", proveedor_id: "", medida_id: "", impuesto_id: ""
        })
        setImagen(null)
        onProductoCreado()
        document.getElementById("modal-nuevo-producto").checked = false
      } else {
        mostrarToast("error", "❌ " + (data.error || "Error desconocido"))
      }
    } catch (err) {
      mostrarToast("error", "❌ Error de red")
    }
  }

  return (
    <>
      <input type="checkbox" id="modal-nuevo-producto" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg">Nuevo Producto</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3" encType="multipart/form-data">
            <input type="text" name="nombre" placeholder="Nombre" className="input input-bordered w-full" value={form.nombre} onChange={handleChange} required />
            <input type="text" name="marca" placeholder="Marca" className="input input-bordered w-full" value={form.marca} onChange={handleChange} required />
            <input type="number" name="precio" placeholder="Precio" className="input input-bordered w-full" value={form.precio} onChange={handleChange} required />
            <input type="number" name="stock" placeholder="Stock" className="input input-bordered w-full" value={form.stock} onChange={handleChange} required />
            <input type="number" name="stock_minimo" placeholder="Stock Mínimo" className="input input-bordered w-full" value={form.stock_minimo} onChange={handleChange} required />

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

            <input type="file" accept="image/*" onChange={handleFileChange} className="file-input file-input-bordered w-full" />

            <div className="modal-action">
              <button className="btn btn-primary" type="submit">Crear</button>
              <label htmlFor="modal-nuevo-producto" className="btn">Cancelar</label>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalNuevoProducto
