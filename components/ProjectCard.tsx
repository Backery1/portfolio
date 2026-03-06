import Link from "next/link"
import Image from "next/image"
import { Project } from "@/types"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f0eeeb]">
        {project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            className="object-cover group-hover:opacity-75 transition-opacity duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-[#f0eeeb]" />
        )}
      </div>

      <div className="pt-2 pb-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className="text-xs tracking-[0.08em] uppercase text-black/70 group-hover:text-black transition-colors duration-300 truncate"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            {project.title}
          </h3>
          <span
            className="text-xs text-black/30 shrink-0"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            {project.year}
          </span>
        </div>
        {project.category && (
          <p
            className="mt-0.5 text-xs text-black/30 uppercase tracking-widest"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            {project.category}
          </p>
        )}
      </div>
    </Link>
  )
}
