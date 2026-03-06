import { supabase } from "@/lib/supabase"
import { MediaItem } from "@/types"
import VisualsGrid from "@/components/VisualsGrid"

export const revalidate = 60

export default async function VisualsPage() {
  const { data: items } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <main className="pt-24">
      <VisualsGrid items={(items as MediaItem[]) ?? []} />
    </main>
  )
}
