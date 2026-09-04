export interface Receta {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

export async function obtenerRecetasPopulares(): Promise<Receta[]> {
  try {
    const res = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) {
      throw new Error('La API de TheMealDB no respondió correctamente')
    }

    const data = await res.json()
    return (data.meals || []).slice(0, 6)
  } catch (error) {
    console.error('Error al obtener recetas de TheMealDB:', error)
    return []
  }
}