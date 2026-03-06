import { supabase } from "@/lib/supabase"
import { MediaItem } from "@/types"
import VisualsGrid from "@/components/VisualsGrid"

export const revalidate = 60

export default async function VisualsPage() {
  const { data } = await supabase
    .from("media")
    .select("*")
    .order("sort_order", { ascending: true })

  const items: MediaItem[] = data ?? []

  return (
    <div className="page-enter">
      <VisualsGrid items={items} />
    </div>
  )
}
