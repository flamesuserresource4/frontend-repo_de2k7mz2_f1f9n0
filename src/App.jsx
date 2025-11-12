import React, { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'

// Simple Error Boundary to prevent Spline runtime errors from crashing the page
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [webgl, setWebgl] = useState(true)

  // Detect WebGL availability to decide whether to render Spline
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setWebgl(!!gl)
    } catch (e) {
      setWebgl(false)
    }
  }, [])

  const Nav = () => (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(16,24,40,0.15)]" role="navigation" aria-label="Primary">
          <div className="flex items-center justify-between px-4 py-3">
            <a href="#" className="flex items-center gap-2" aria-label="AtheronLabs home">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-red-500" />
              <span className="text-xl font-semibold tracking-tight text-slate-900">atheron<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500">labs</span></span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">About</a>
              <a href="#services" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Services</a>
              <a href="#work" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Work</a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-red-500 text-white px-4 py-2 text-sm font-semibold shadow-lg shadow-blue-600/20 hover:opacity-95 transition">Let’s talk</a>
            </nav>

            <button aria-label="Toggle Menu" aria-expanded={mobileOpen} className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white/60 backdrop-blur" onClick={() => setMobileOpen(!mobileOpen)}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
          {mobileOpen && (
            <div className="md:hidden border-t border-white/50">
              <div className="px-4 py-3 space-y-2">
                <a href="#about" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-white/70">About</a>
                <a href="#services" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-white/70">Services</a>
                <a href="#work" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-white/70">Work</a>
                <a href="#contact" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 bg-gradient-to-r from-blue-600 to-red-500 text-white text-center font-semibold">Let’s talk</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )

  const SectionTitle = ({ eyebrow, title, desc }) => (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold tracking-wide text-blue-600">{eyebrow}</p>
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">{title}</h2>
      {desc && <p className="mt-3 text-slate-600">{desc}</p>}
    </div>
  )

  const splineFallback = (
    <div className="flex h-full w-full items-center justify-center bg-white/50">
      <div className="text-center p-6">
        <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-red-500 opacity-70" />
        <p className="mt-4 text-sm text-slate-600">Your browser or environment doesn’t support WebGL. Showing a static preview.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_500px_at_50%_-100px,rgba(59,130,246,0.20),transparent),radial-gradient(1200px_500px_at_80%_-120px,rgba(239,68,68,0.15),transparent)] bg-white text-slate-900">
      <Nav />

      {/* Hero */}
      <section className="relative pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/60 backdrop-blur px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
                Fintech • 3D • Modern • Glassmorphic
              </div>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Building crisp fintech experiences for ambitious brands
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                AtheronLabs is a product studio crafting elegant, performant web apps with a clean white base and bold blue/red accents.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-red-500 text-white px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-600/25 hover:opacity-95 transition">
                  Start a project
                </a>
                <a href="#work" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/70 backdrop-blur px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-white">See our work</a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-600">
                <div className="flex -space-x-3">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-red-400" />
                  ))}
                </div>
                <span>Trusted by startups and enterprises</span>
              </div>
            </div>
            <div className="h-[420px] sm:h-[520px] lg:h-[560px] rounded-3xl overflow-hidden border border-white/40 bg-white/30 backdrop-blur-xl shadow-[0_20px_80px_-20px_rgba(59,130,246,0.35)]">
              {webgl ? (
                <ErrorBoundary fallback={splineFallback}>
                  <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
                </ErrorBoundary>
              ) : (
                splineFallback
              )}
            </div>
          </div>
        </div>

        {/* Gradient accents */}
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(64rem_64rem_at_center,white,transparent)]">
          <div className="absolute -top-24 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-1/3 right-10 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Who we are" title="A studio focused on clarity and impact" desc="We blend strategy, design, and engineering to ship products that feel light, fast, and delightful." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {title:'Strategy',text:'Discovery, positioning, and product roadmapping to align teams and accelerate delivery.'},
              {title:'Design',text:'Modern, minimalist interfaces with glassmorphic touches that elevate your brand.'},
              {title:'Engineering',text:'Robust React frontends and Python backends designed for performance and scale.'},
            ].map((c)=> (
              <div key={c.title} className="rounded-2xl border border-white/50 bg-white/60 backdrop-blur-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-red-500" />
                <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="What we do" title="Services built for momentum" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {title:'Brand + Web', points:['Visual identity','Marketing site','Design system']},
              {title:'Product UX', points:['User research','Wireframes to hi‑fi','Prototyping']},
              {title:'Full‑stack', points:['React + Vite','FastAPI','Cloud & DevOps']},
            ].map(card => (
              <div key={card.title} className="rounded-2xl border border-white/50 bg-white/60 backdrop-blur-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {card.points.map(p => (<li key={p} className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-600 to-red-500" /> {p}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Selected work" title="Recent projects" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[1,2,3,4].map((i) => (
              <div key={i} className="group overflow-hidden rounded-2xl border border-white/50 bg-white/60 backdrop-blur-xl shadow-md">
                <div className="aspect-[16/10] bg-gradient-to-br from-blue-50 to-red-50" />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Fintech UI Concept #{i}</h3>
                    <span className="text-xs rounded-full border border-blue-200 bg-blue-50 text-blue-700 px-2 py-0.5">Case study</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">A clean financial dashboard with glassy cards and smooth interactions.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Let’s build" title="Tell us about your project" />
          <form className="mt-10 rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl p-6 shadow-md grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jane Doe" aria-label="Name" />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="jane@company.com" aria-label="Email" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Project details</label>
              <textarea rows="4" className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Timeline, scope, budget..." aria-label="Project details" />
            </div>
            <div className="sm:col-span-2 flex items-center justify-between">
              <p className="text-sm text-slate-500">We’ll get back within 1–2 business days.</p>
              <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-red-500 text-white px-5 py-2.5 text-sm font-semibold shadow-lg shadow-blue-600/25 hover:opacity-95 transition">Send message</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} AtheronLabs. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm">
              <a href="#about" className="text-slate-600 hover:text-slate-800">About</a>
              <span className="text-slate-300">•</span>
              <a href="#services" className="text-slate-600 hover:text-slate-800">Services</a>
              <span className="text-slate-300">•</span>
              <a href="#work" className="text-slate-600 hover:text-slate-800">Work</a>
              <span className="text-slate-300">•</span>
              <a href="#contact" className="text-slate-600 hover:text-slate-800">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
