import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  if (profile?.role === 'chef') {
    const { data: misRecetas } = await supabase
      .from('recetas')
      .select('*')
      .eq('chef_id', user!.id)

    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mis recetas</h1>
          <Link
            href="/dashboard/nuevo"
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            + Nueva receta
          </Link>
        </div>

        {!misRecetas || misRecetas.length === 0 ? (
          <p className="text-gray-500">
            Aún no has publicado ninguna receta.
          </p>
        ) : (
          <div className="space-y-3">
            {misRecetas.map((receta) => (
              <div
                key={receta.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-semibold text-gray-900">
                  {receta.nombre}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Rol lector
  const { data: favoritos } = await supabase
    .from('favoritos')
    .select('*, recetas(*)')
    .eq('usuario_id', user!.id)

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mis favoritos</h1>

      {!favoritos || favoritos.length === 0 ? (
        <p className="text-gray-500">
          Aún no has guardado ninguna receta como favorita.{' '}
          <Link href="/recetas" className="text-orange-600 hover:underline">
            Explora recetas
          </Link>
        </p>
      ) : (
        <div className="space-y-3">
          {favoritos.map((fav: any) => (
            <div
              key={fav.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <h3 className="font-semibold text-gray-900">
                {fav.recetas?.nombre}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}