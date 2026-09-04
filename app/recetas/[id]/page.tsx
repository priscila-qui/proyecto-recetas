const recetasEjemplo = [
  {
    id: '1',
    nombre: 'Espagueti a la carbonara',
    imagen:
      'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    tiempoMinutos: 30,
    ingredientes: ['Espagueti', 'Huevo', 'Panceta', 'Queso parmesano', 'Pimienta negra'],
  },
  {
    id: '2',
    nombre: 'Tacos al pastor',
    imagen:
      'https://www.themealdb.com/images/media/meals/xqwuty1483391159.jpg',
    tiempoMinutos: 45,
    ingredientes: ['Tortillas de maíz', 'Carne de cerdo', 'Piña', 'Cebolla', 'Cilantro'],
  },
  {
    id: '3',
    nombre: 'Ensalada César',
    imagen: 'https://www.themealdb.com/images/media/meals/1550440197.jpg',
    tiempoMinutos: 15,
    ingredientes: ['Lechuga romana', 'Pollo', 'Crutones', 'Queso parmesano', 'Aderezo César'],
  },
]

export default function RecetaDetallePage({
  params,
}: {
  params: { id: string }
}) {
  const receta = recetasEjemplo.find((r) => r.id === params.id)

  if (!receta) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-600">Receta no encontrada.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <img
        src={receta.imagen}
        alt={receta.nombre}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{receta.nombre}</h1>
      <p className="text-gray-500 mb-6">⏱️ {receta.tiempoMinutos} minutos</p>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Ingredientes</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {receta.ingredientes.map((ing) => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>
    </div>
  )
}