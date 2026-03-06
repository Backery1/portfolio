"use client"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error,    setError]    = useState("")
  const [loading,  setLoading]  = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push("/")
      router.refresh()
    } else {
      setError("Incorrect password")
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "280px", padding: "0 24px" }}>
        <div style={{
          fontFamily: "var(--sans)",
          fontSize: "15px",
          color: "var(--blue)",
          marginBottom: "32px",
          letterSpacing: "0.01em",
        }}>
          Backery
        </div>

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          required
          style={{
            width: "100%",
            background: "none",
            border: "none",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
            padding: "6px 0",
            fontSize: "13px",
            fontFamily: "var(--sans)",
            color: "var(--fg)",
            outline: "none",
            marginBottom: "20px",
          }}
        />

        {error && (
          <div style={{
            fontSize: "11px",
            color: "var(--mid)",
            marginBottom: "16px",
            letterSpacing: "0.04em",
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            fontSize: "11.5px",
            fontFamily: "var(--sans)",
            color: "var(--blue)",
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.5 : 1,
            letterSpacing: "0.04em",
          }}
        >
          {loading ? "..." : "Enter →"}
        </button>
      </form>
    </div>
  )
}
