import { supabase } from "@/lib/supabase"
import { Project } from "@/types"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import ProjectGallery from "@/components/ProjectGallery"

export const revalidate = 60

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!data) notFound()
  const project = data as Project

  const pills = project.categories.map(c => (
    <span key={c} className="project-cat-pill">{c}</span>
  ))

  const scopeItems = project.scope.map(s => <li key={s}>{s}</li>)

  return (
    <div className="page-enter">
      <div className="project-detail">
        <Link href="/" className="project-back">← Back to work</Link>

        <div className="project-name">{project.name}</div>

        <div className="project-meta">
          <span className="project-year">{project.year}</span>
          <div className="project-cats">{pills}</div>
        </div>

        {/* Cover: real image or color placeholder */}
        <div
          className="project-cover"
          style={{ background: project.cover_color || "hsl(200,8%,78%)" }}
        >
          {project.thumbnail_url ? (
            <Image
              src={project.thumbnail_url}
              alt={project.name}
              fill
              sizes="(max-width: 740px) 100vw, 680px"
              className="object-cover"
              style={{ opacity: 0.9 }}
            />
          ) : (
            <span>Cover image</span>
          )}
        </div>

        {project.description && (
          <p className="project-desc">{project.description}</p>
        )}

        {project.scope.length > 0 && (
          <>
            <div className="project-scope-title">Scope of work</div>
            <ul className="project-scope-list">{scopeItems}</ul>
          </>
        )}

        {project.images && project.images.length > 0 && (
          <ProjectGallery images={project.images} name={project.name} />
        )}
      </div>
    </div>
  )
}
