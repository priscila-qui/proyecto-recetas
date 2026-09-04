import { login } from '@/app/actions/auth'

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ingresar</h1>
      {searchParams.error && <p className="text-red-600 mb-4">{searchParams.error}</p>}
      <form action={login} className="flex flex-col gap-3">
        <input name="email" type="email" placeholder="Correo" required className="border p-2 rounded" />
        <input name="password" type="password" placeholder="Contraseña" required className="border p-2 rounded" />
        <button className="bg-blue-600 text-white py-2 rounded">Ingresar</button>
      </form>
      <p className="text-sm text-slate-500 mt-4">
        ¿No tienes cuenta? <a href="/register" className="text-blue-600 underline">Regístrate</a>
      </p>
    </div>
  )
}