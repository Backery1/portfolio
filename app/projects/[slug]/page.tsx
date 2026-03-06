import { supabase } from "@/lib/supabase"
import { Project } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !data) {
    notFound()
  }

  const project = data as Project

  return (
    <main className="pt-28 pb-32">
      {/* Back */}
      <div className="px-6 mb-10">
        <Link
          href="/projects"
          className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors duration-300"
        >
          ← Projects
        </Link>
      </div>

      {/* Title block */}
      <div className="px-6 mb-12">
        <div className="flex flex-wrap items-baseline gap-5">
          <h1 className="text-5xl font-light text-white">{project.title}</h1>
          <span className="text-sm text-white/25">{project.year}</span>
        </div>
        {project.category && (
          <p className="mt-3 text-xs tracking-[0.25em] uppercase text-[#4a9eff]">
            {project.category}
          </p>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs border border-white/10 text-white/40 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hero image */}
      {project.thumbnail_url && (
        <div className="relative w-full aspect-video mb-14 overflow-hidden bg-[#111]">
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Body */}
      <div className="px-6 max-w-2xl">
        <p className="text-white/60 text-lg leading-relaxed font-[family-name:var(--font-dorian)]">
          {project.description}
        </p>

        {project.content && (
          <div className="mt-6 text-white/40 text-base leading-relaxed whitespace-pre-line font-[family-name:var(--font-dorian)]">
            {project.content}
          </div>
        )}

        {project.external_url && (
          <a
            href={project.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 text-xs tracking-[0.15em] uppercase border border-white/20 px-5 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            View Project →
          </a>
        )}
      </div>

      {/* Additional images */}
      {project.images && project.images.length > 0 && (
        <div className="mt-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-1">
          {project.images.map((img: string, i: number) => (
            <div
              key={i}
              className="relative aspect-video overflow-hidden bg-[#111]"
            >
              <Image
                src={img}
                alt={`${project.title} ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
