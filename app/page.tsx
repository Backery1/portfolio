import { supabase } from "@/lib/supabase"
import { Project } from "@/types"
import ProjectCard from "@/components/ProjectCard"

export const revalidate = 60

export default async function Home() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false })

  return (
    <main
      style={{
        maxWidth: "780px",
        margin: "0 auto",
        padding: "88px 24px 80px",
      }}
    >
      {projects && projects.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
          }}
        >
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div
          style={{
            paddingTop: "120px",
            textAlign: "center",
            color: "rgba(0,0,0,0.2)",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          No projects yet.
        </div>
      )}
    </main>
  )
}
