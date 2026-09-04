import BuscadorRecetas from '@/components/BuscadorRecetas'
import { createClient } from '@/lib/supabase/server'

export default async function RecetasPage() {
  const supabase = await createClient()

  const { data: recetas } = await supabase
    .from('recetas')
    .select('id, nombre, imagen_url, tiempo_minutos')
    .order('created_at', { ascending: false })

  const recetasFormateadas = (recetas || []).map((r) => ({
    id: r.id,
    nombre: r.nombre,
    imagen: r.imagen_url || 'https://via.placeholder.com/400x300?text=Sin+imagen',
    tiempoMinutos: r.tiempo_minutos || 0,
  }))

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Todas las recetas
      </h1>
      <BuscadorRecetas recetas={recetasFormateadas} />
    </div>
  )
}