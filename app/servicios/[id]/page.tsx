import { createClient } from '@/lib/supabase/server'
import { reservarTurno } from '@/app/actions/turnos'
import { notFound } from 'next/navigation'

async function getClima(ciudad: string) {
  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) return null
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        ciudad
      )}&appid=${apiKey}&units=metric&lang=es`,
      { next: { revalidate: 1800 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return {
      temp: data.main?.temp,
      descripcion: data.weather?.[0]?.description,
    }
  } catch {
    return null
  }
}

export default async function ServicioDetallePage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: servicio } = await supabase.from('servicios').select('*').eq('id', params.id).single()
  if (!servicio) notFound()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const clima = await getClima(servicio.ciudad)
  const reservar = reservarTurno.bind(null, servicio.id)

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{servicio.nombre}</h1>
      <p className="text-slate-600 mt-2">{servicio.descripcion}</p>
      <p className="mt-2 text-sm text-slate-500">
        {servicio.ciudad} · {servicio.duracion_min} min · ${servicio.precio}
      </p>

      <div className="mt-4 border rounded-lg p-4 bg-slate-50">
        <h2 className="font-semibold mb-1">Clima en {servicio.ciudad}</h2>
        {clima ? (
          <p>
            {clima.temp}°C — {clima.descripcion}
          </p>
        ) : (
          <p className="text-slate-500">Clima no disponible en este momento.</p>
        )}
      </div>

      <div className="mt-6 border-t pt-6">
        <h2 className="font-semibold mb-3">Reservar turno</h2>
        {user ? (
          <form action={reservar} className="flex flex-col gap-3">
            <input name="fecha" type="date" required className="border p-2 rounded" />
            <input name="hora" type="time" required className="border p-2 rounded" />
            <input name="direccion" placeholder="Dirección de instalación" required className="border p-2 rounded" />
            <textarea name="notas" placeholder="Notas (opcional)" className="border p-2 rounded" />
            <button className="bg-blue-600 text-white py-2 rounded">Confirmar reserva</button>
          </form>
        ) : (
          <p>
            Debes{' '}
            <a href="/login" className="text-blue-600 underline">
              iniciar sesión
            </a>{' '}
            para reservar.
          </p>
        )}
      </div>
    </div>
  )
}
