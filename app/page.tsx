import { supabase } from "@/lib/supabase"
import { Project } from "@/types"
import WorkSection from "@/components/WorkSection"

export const revalidate = 60

export default async function Home() {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })

  const projects: Project[] = data ?? []

  return (
    <div className="page-enter">
      <WorkSection projects={projects} />
    </div>
  )
}
