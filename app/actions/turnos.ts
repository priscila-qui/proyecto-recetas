'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function reservarTurno(servicioId: string, formData: FormData) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const fecha = formData.get('fecha') as string
  const hora = formData.get('hora') as string
  const direccion = formData.get('direccion') as string
  const notas = formData.get('notas') as string

  await supabase.from('turnos').insert({
    servicio_id: servicioId,
    cliente_id: user!.id,
    fecha,
    hora,
    direccion,
    notas,
  })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function actualizarEstadoTurno(id: string, estado: string) {
  'use server'
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await supabase.from('turnos').update({ estado }).eq('id', id)
  revalidatePath('/dashboard')
}
