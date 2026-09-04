'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function crearServicio(formData: FormData) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const nombre = formData.get('nombre') as string
  const descripcion = formData.get('descripcion') as string
  const duracion_min = Number(formData.get('duracion_min'))
  const precio = Number(formData.get('precio'))
  const ciudad = formData.get('ciudad') as string

  await supabase.from('servicios').insert({
    tecnico_id: user!.id,
    nombre,
    descripcion,
    duracion_min,
    precio,
    ciudad,
  })

  revalidatePath('/servicios')
  redirect('/dashboard')
}

export async function actualizarServicio(id: string, formData: FormData) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const nombre = formData.get('nombre') as string
  const descripcion = formData.get('descripcion') as string
  const duracion_min = Number(formData.get('duracion_min'))
  const precio = Number(formData.get('precio'))
  const ciudad = formData.get('ciudad') as string

  await supabase
    .from('servicios')
    .update({ nombre, descripcion, duracion_min, precio, ciudad })
    .eq('id', id)
    .eq('tecnico_id', user!.id)

  revalidatePath('/servicios')
  revalidatePath(`/servicios/${id}`)
  redirect('/dashboard')
}

export async function eliminarServicio(id: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await supabase.from('servicios').delete().eq('id', id).eq('tecnico_id', user!.id)

  revalidatePath('/servicios')
  redirect('/dashboard')
}