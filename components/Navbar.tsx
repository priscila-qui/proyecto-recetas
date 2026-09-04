import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-orange-600">
        🍳 Recetario
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/recetas" className="text-gray-700 hover:text-orange-600">
          Recetas
        </Link>
        <Link href="/login" className="text-gray-700 hover:text-orange-600">
          Iniciar sesión
        </Link>
        <Link
          href="/register"
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          Registrarse
        </Link>
      </div>
    </nav>
  )
}