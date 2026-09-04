import { createClient } from '@/lib/supabase/server'

export default async function RecetaDetallePage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: receta } = await supabase
    .from('recetas')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!receta) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-600">Receta no encontrada.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {receta.imagen_url && (
        <img
          src={receta.imagen_url}
          alt={receta.nombre}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {receta.nombre}
      </h1>
      <p className="text-gray-500 mb-4">⏱️ {receta.tiempo_minutos} minutos</p>
      {receta.descripcion && (
        <p className="text-gray-700 mb-6">{receta.descripcion}</p>
      )}
      {receta.ingredientes && receta.ingredientes.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Ingredientes
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {receta.ingredientes.map((ing: string) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}