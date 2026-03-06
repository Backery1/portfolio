import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Project } from "@/types"
import ProjectCard from "@/components/ProjectCard"

export const revalidate = 60

export default async function Home() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("year", { ascending: false })

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 pb-16">
        <div>
          <h1 className="text-[clamp(3.5rem,13vw,14rem)] font-bold leading-[0.9] tracking-tight uppercase text-white">
            BACKERY
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-5 text-white/40 text-sm tracking-wide font-[family-name:var(--font-dorian)] italic">
            <span>Creative Technologist</span>
            <span>·</span>
            <span>DJ</span>
            <span>·</span>
            <span>Product Builder</span>
            <span>·</span>
            <span>Visual Creator</span>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 text-white/20 text-xs tracking-[0.25em] uppercase">
          Scroll ↓
        </div>
      </section>

      {/* Selected Work */}
      <section className="px-6 pb-32">
        <div className="flex items-baseline justify-between mb-8 border-t border-white/5 pt-8">
          <h2 className="text-xs tracking-[0.25em] uppercase text-white/30">
            Selected Work
          </h2>
          <Link
            href="/projects"
            className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors duration-300"
          >
            All Projects →
          </Link>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {projects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center text-white/15 text-sm">
            No featured projects yet.
          </div>
        )}
      </section>
    </main>
  )
}
