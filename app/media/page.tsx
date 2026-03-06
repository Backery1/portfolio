import { supabase } from "@/lib/supabase"
import { MediaItem } from "@/types"
import MediaGrid from "@/components/MediaGrid"

export const revalidate = 60

export default async function MediaPage() {
  const { data: items } = await supabase
    .from("media")
    .select("*")
    .order("order_index", { ascending: true })

  return (
    <main className="pt-28 pb-32">
      <div className="px-6 mb-10 border-b border-white/5 pb-8">
        <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-3">
          Visual
        </p>
        <h1 className="text-4xl font-light text-white">Media</h1>
      </div>

      <MediaGrid items={(items as MediaItem[]) ?? []} />
    </main>
  )
}
