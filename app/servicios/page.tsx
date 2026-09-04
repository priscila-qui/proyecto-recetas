import { createClient } from '@/lib/supabase/server'
import ServiciosExplorer from '@/components/ServiciosExplorer'

export default async function ServiciosPage() {
  const supabase = createClient()
  const { data: servicios } = await supabase
    .from('servicios')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Servicios disponibles</h1>
      <ServiciosExplorer servicios={servicios ?? []} />
    </div>
  )
}