import { crearServicio } from '@/app/actions/servicios'

export default function NuevoServicioPage() {
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Nuevo servicio</h1>
      <form action={crearServicio} className="flex flex-col gap-3">
        <input name="nombre" placeholder="Nombre del servicio" required className="border p-2 rounded" />
        <textarea name="descripcion" placeholder="Descripción" required className="border p-2 rounded" />
        <input name="ciudad" placeholder="Ciudad" required className="border p-2 rounded" />
        <input
          name="duracion_min"
          type="number"
          placeholder="Duración (min)"
          defaultValue={60}
          required
          className="border p-2 rounded"
        />
        <input name="precio" type="number" step="0.01" placeholder="Precio" required className="border p-2 rounded" />
        <button className="bg-blue-600 text-white py-2 rounded">Crear servicio</button>
      </form>
    </div>
  )
}
