import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Project } from "@/types"

export const revalidate = 60

export default async function Home() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false })

  return (
    <main className="pt-24 px-1.5 pb-16">
      {projects && projects.length > 0 ? (
        <div className="columns-2 md:columns-3 gap-1.5">
          {projects.map((project: Project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="block break-inside-avoid mb-1.5 group"
            >
              {project.thumbnail_url ? (
                <Image
                  src={project.thumbnail_url}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-auto block group-hover:opacity-75 transition-opacity duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-[#f0eeeb]" />
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="pt-48 text-center text-black/20 text-xs tracking-widest uppercase">
          No projects yet.
        </div>
      )}
    </main>
  )
}
