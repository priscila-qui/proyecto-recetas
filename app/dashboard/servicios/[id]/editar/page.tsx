import { createClient } from '@/lib/supabase/server'
import { actualizarServicio, eliminarServicio } from '@/app/actions/servicios'
import { notFound } from 'next/navigation'

export default async function EditarServicioPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: servicio } = await supabase.from('servicios').select('*').eq('id', params.id).single()
  if (!servicio) notFound()

  const actualizar = actualizarServicio.bind(null, servicio.id)
  const eliminar = eliminarServicio.bind(null, servicio.id)

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Editar servicio</h1>
      <form action={actualizar} className="flex flex-col gap-3">
        <input name="nombre" defaultValue={servicio.nombre} required className="border p-2 rounded" />
        <textarea name="descripcion" defaultValue={servicio.descripcion} required className="border p-2 rounded" />
        <input name="ciudad" defaultValue={servicio.ciudad} required className="border p-2 rounded" />
        <input
          name="duracion_min"
          type="number"
          defaultValue={servicio.duracion_min}
          required
          className="border p-2 rounded"
        />
        <input
          name="precio"
          type="number"
          step="0.01"
          defaultValue={servicio.precio}
          required
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white py-2 rounded">Guardar cambios</button>
      </form>
      <form action={eliminar} className="mt-3">
        <button className="text-red-600 underline text-sm">Eliminar servicio</button>
      </form>
    </div>
  )
}