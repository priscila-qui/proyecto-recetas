import Link from 'next/link'
import { obtenerRecetasPopulares } from '@/lib/mealdb'

export default async function Home() {
  const recetasPopulares = await obtenerRecetasPopulares()

  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Descubre y comparte recetas
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Explora recetas publicadas por otros cocineros, guarda tus favoritas
          y comparte las tuyas.
        </p>
        <Link
          href="/recetas"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-700"
        >
          Ver recetas
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Inspiración del día (TheMealDB)
        </h2>

        {recetasPopulares.length === 0 ? (
          <p className="text-gray-500">
            No se pudieron cargar recetas externas en este momento. Intenta
            recargar la página.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recetasPopulares.map((receta) => (
              <div
                key={receta.idMeal}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  src={receta.strMealThumb}
                  alt={receta.strMeal}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-gray-900">
                    {receta.strMeal}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}