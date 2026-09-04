'use client'

import { useState } from 'react'
import Link from 'next/link'
import RecetaCard from './RecetaCard'

interface Receta {
  id: string
  nombre: string
  imagen: string
  tiempoMinutos: number
}

interface BuscadorRecetasProps {
  recetas: Receta[]
}

export default function BuscadorRecetas({ recetas }: BuscadorRecetasProps) {
  const [busqueda, setBusqueda] = useState('')

  const recetasFiltradas = recetas.filter((receta) =>
    receta.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar receta por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {recetasFiltradas.length === 0 ? (
        <p className="text-gray-500">No se encontraron recetas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recetasFiltradas.map((receta) => (
            <Link key={receta.id} href={`/recetas/${receta.id}`}>
              <RecetaCard
                id={receta.id}
                nombre={receta.nombre}
                imagen={receta.imagen}
                tiempoMinutos={receta.tiempoMinutos}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}