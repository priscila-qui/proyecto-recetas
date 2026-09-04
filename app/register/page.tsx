import { register } from '@/app/actions/auth'

export default function RegisterPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>
      {searchParams.error && <p className="text-red-600 mb-4">{searchParams.error}</p>}
      <form action={register} className="flex flex-col gap-3">
        <input name="full_name" placeholder="Nombre completo" required className="border p-2 rounded" />
        <input name="email" type="email" placeholder="Correo" required className="border p-2 rounded" />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          minLength={6}
          className="border p-2 rounded"
        />
        <select name="role" required className="border p-2 rounded">
           <option value="lector">Lector (guardo favoritos, comento)</option>
            <option value="chef">Chef (publico recetas)</option>
        </select>
        <button className="bg-blue-600 text-white py-2 rounded">Registrarme</button>
      </form>
    </div>
  )
}