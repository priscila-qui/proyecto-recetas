'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function crearReceta(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Debes iniciar sesión para publicar una receta' }
  }

  const nombre = formData.get('nombre') as string
  const descripcion = formData.get('descripcion') as string
  const imagenUrl = formData.get('imagenUrl') as string
  const tiempoMinutos = Number(formData.get('tiempoMinutos'))
  const ingredientesTexto = formData.get('ingredientes') as string
  const ingredientes = ingredientesTexto
    .split('\n')
    .map((i) => i.trim())
    .filter((i) => i.length > 0)

  const { error } = await supabase.from('recetas').insert({
    chef_id: user.id,
    nombre,
    descripcion,
    imagen_url: imagenUrl,
    tiempo_minutos: tiempoMinutos,
    ingredientes,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function eliminarReceta(recetaId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autorizado' }
  }

  const { error } = await supabase
    .from('recetas')
    .delete()
    .eq('id', recetaId)
    .eq('chef_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
}