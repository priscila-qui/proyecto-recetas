import BuscadorRecetas from '@/components/BuscadorRecetas'

const recetasEjemplo = [
  {
    id: '1',
    nombre: 'Espagueti a la carbonara',
    imagen:
      'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    tiempoMinutos: 30,
  },
  {
    id: '2',
    nombre: 'Tacos al pastor',
    imagen:
      'https://www.themealdb.com/images/media/meals/xqwuty1483391159.jpg',
    tiempoMinutos: 45,
  },
  {
    id: '3',
    nombre: 'Ensalada César',
    imagen: 'https://www.themealdb.com/images/media/meals/1550440197.jpg',
    tiempoMinutos: 15,
  },
]

export default function RecetasPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Todas las recetas
      </h1>
      <BuscadorRecetas recetas={recetasEjemplo} />
    </div>
  )
}