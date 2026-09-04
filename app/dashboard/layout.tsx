import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cerrarSesion } from '@/app/actions/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div>
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Sesión activa: <strong>{profile?.full_name || user.email}</strong>{' '}
          ({profile?.role})
        </p>
        <form action={cerrarSesion}>
          <button
            type="submit"
            className="text-sm text-red-600 hover:underline"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
      {children}
    </div>
  )
}