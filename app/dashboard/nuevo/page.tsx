'use client'

import { useState } from 'react'
import { crearReceta } from '@/app/actions/recetas'

export default function NuevaRecetaPage() {
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setCargando(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const resultado = await crearReceta(formData)

    if (resultado?.error) {
      setError(resultado.error)
      setCargando(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Publicar nueva receta
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la receta
          </label>
          <input
            type="text"
            name="nombre"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL de la imagen
          </label>
          <input
            type="url"
            name="imagenUrl"
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiempo (minutos)
          </label>
          <input
            type="number"
            name="tiempoMinutos"
            required
            min={1}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ingredientes (uno por línea)
          </label>
          <textarea
            name="ingredientes"
            rows={5}
            placeholder={'Espagueti\nHuevo\nPanceta'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50"
        >
          {cargando ? 'Publicando...' : 'Publicar receta'}
        </button>
      </form>
    </div>
  )
}