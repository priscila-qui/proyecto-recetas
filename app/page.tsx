import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Descubre y comparte recetas
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Explora recetas publicadas por otros cocineros, guarda tus favoritas y
        comparte las tuyas.
      </p>
      <Link
        href="/recetas"
        className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-700"
      >
        Ver recetas
      </Link>
    </div>
  )
}