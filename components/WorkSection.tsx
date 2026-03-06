"use client"
import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Project } from "@/types"

const ALL_CATS = [
  "All",
  "Branding & Identity",
  "Concept",
  "Web",
  "Graphic Design",
  "Digital Design",
  "Print",
  "Social Media",
  "Music & Sound",
  "Video & Motion",
  "Object & Hardware",
]

type View = "list" | "thumb"
type Sort = "featured" | "alpha" | "date"

// Slider maps 1–5 → min column width in px (left = many small, right = few large)
const SLIDER_TO_PX = [90, 130, 180, 240, 320]

export default function WorkSection({ projects }: { projects: Project[] }) {
  const [view,      setView]      = useState<View>("list")
  const [sort,      setSort]      = useState<Sort>("featured")
  const [filter,    setFilter]    = useState("all")
  const [thumbSize, setThumbSize] = useState(2) // 1=big … 5=small

  const filtered = useMemo(() => {
    let list = filter === "all"
      ? [...projects]
      : projects.filter(p => p.categories.includes(filter))

    if (sort === "alpha") list.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === "date")  list.sort((a, b) => b.year - a.year)
    // "featured" = sort_order from DB (already ordered in query)
    return list
  }, [projects, filter, sort])

  return (
    <div style={{ padding: "48px 32px 0" }}>
      {/* Controls row */}
      <div className="work-header">
        <div className="work-title">Work</div>
        <div className="work-controls">
          <div className="ctrl-group">
            <button className={`ctrl-btn${view === "list"  ? " active" : ""}`} onClick={() => setView("list")}>List</button>
            <button className={`ctrl-btn${view === "thumb" ? " active" : ""}`} onClick={() => setView("thumb")}>Thumb</button>
          </div>
          <div className="ctrl-group">
            <button className={`ctrl-btn${sort === "featured" ? " active" : ""}`} onClick={() => setSort("featured")}>Featured</button>
            <button className={`ctrl-btn${sort === "alpha"    ? " active" : ""}`} onClick={() => setSort("alpha")}>Alphabetical</button>
            <button className={`ctrl-btn${sort === "date"     ? " active" : ""}`} onClick={() => setSort("date")}>Date</button>
          </div>
        </div>
      </div>

      {/* Category filter tags */}
      <div className="filter-row">
        {ALL_CATS.map(cat => {
          const val = cat === "All" ? "all" : cat
          return (
            <span
              key={val}
              className={`filter-tag${filter === val ? " active" : ""}`}
              onClick={() => setFilter(val)}
            >
              {cat}
            </span>
          )
        })}
      </div>

      {/* List view */}
      {view === "list" && (
        <div className="work-list">
          {filtered.length === 0 && (
            <p style={{ padding: "24px 0", fontSize: "11px", color: "var(--mid)", fontStyle: "italic" }}>
              No projects in this category yet.
            </p>
          )}
          {filtered.map(p => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="work-list-item">
              <span className="list-name">{p.name}</span>
              <span className="list-tags">
                {p.categories.map(c => (
                  <span key={c} className="list-tag-pill">{c}</span>
                ))}
              </span>
              <span className="list-year">{p.year}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Thumb / grid view */}
      {view === "thumb" && (
        <div
          className="work-grid"
          style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${SLIDER_TO_PX[thumbSize - 1]}px, 1fr))` }}
        >
          {filtered.map(p => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className="work-item-thumb"
              style={{ background: p.cover_color || "hsl(200,8%,78%)" }}
            >
              {p.thumbnail_url && (
                <Image
                  src={p.thumbnail_url}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                  style={{ opacity: 0.85 }}
                />
              )}
              <span className="item-label">{p.name}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Footer row: grid size slider (thumb only) */}
      {view === "thumb" && (
        <div style={{ marginTop: "18px", paddingBottom: "36px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.04em", color: "var(--mid)" }}>Size</span>
            <input
              type="range"
              min={1}
              max={5}
              value={thumbSize}
              onChange={e => setThumbSize(Number(e.target.value))}
              style={{
                appearance: "none",
                width: "72px",
                height: "1px",
                background: "rgba(0,0,0,0.18)",
                outline: "none",
                cursor: "pointer",
                accentColor: "var(--fg)",
              }}
            />
          </label>
        </div>
      )}

      {view === "list" && (
        <div style={{ paddingBottom: "36px" }} />
      )}
    </div>
  )
}
