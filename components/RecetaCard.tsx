interface RecetaCardProps {
  id: string
  nombre: string
  imagen: string
  tiempoMinutos: number
}

export default function RecetaCard({
  
  nombre,
  imagen,
  tiempoMinutos,
}: RecetaCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <img src={imagen} alt={nombre} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900">{nombre}</h3>
        <p className="text-sm text-gray-500 mt-1">
          ⏱️ {tiempoMinutos} minutos
        </p>
      </div>
    </div>
  )
}