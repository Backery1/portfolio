import { supabase } from "@/lib/supabase"
import { Project } from "@/types"
import ProjectCard from "@/components/ProjectCard"

export const revalidate = 60

export default async function ProjectsPage() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false })

  return (
    <main className="pt-28 pb-32">
      <div className="px-6 mb-12 border-b border-white/5 pb-8">
        <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-3">
          Work
        </p>
        <h1 className="text-4xl font-light text-white">Projects</h1>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center text-white/15 text-sm">
          No projects yet.
        </div>
      )}
    </main>
  )
}
