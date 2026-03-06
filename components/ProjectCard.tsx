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
      className="group block bg-[#0a0a0a] overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
        {project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-[#111]" />
        )}
      </div>

      <div className="p-5 border-t border-white/5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-medium text-white group-hover:text-[#4a9eff] transition-colors duration-300 truncate">
            {project.title}
          </h3>
          <span className="text-xs text-white/30 shrink-0">{project.year}</span>
        </div>
        {project.category && (
          <p className="mt-1 text-xs text-white/30 uppercase tracking-widest">
            {project.category}
          </p>
        )}
      </div>
    </Link>
  )
}
