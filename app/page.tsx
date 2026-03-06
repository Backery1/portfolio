import { supabase } from "../lib/supabase"

export default async function Home() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")

  return (
    <main style={{
      padding: "60px",
      background: "black",
      minHeight: "100vh",
      color: "white",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "32px", marginBottom: "40px" }}>
        My Portfolio
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "30px"
      }}>
        {projects?.map((project) => (
          <div
            key={project.id}
            style={{
              border: "1px solid #333",
              padding: "20px",
              borderRadius: "8px"
            }}
          >
            <h2 style={{ fontSize: "20px" }}>
              {project.title}
            </h2>

            <p style={{ opacity: 0.7 }}>
              {project.description}
            </p>
          </div>
        ))}
      </div>

    </main>
  )
}