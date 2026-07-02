import { useState, useEffect, useRef } from 'react'

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  tags: string[]
  images: string[]
  github?: string
  link?: string
}

const projects: Project[] = [
  {
    id: 'turnero',
    title: 'Sistema de Turnos',
    subtitle: 'Centro de Salud · UNC',
    description: 'App interna para gestión de turnos médicos con roles, calendario y estadísticas.',
    longDescription: 'App interna para gestión de turnos médicos con roles diferenciados (secretario, operadora, profesional), calendario interactivo, estadísticas con gráficos SVG y reglas de negocio complejas. Desarrollado para la Universidad Nacional de Córdoba.',
    tags: ['.NET 9', 'Angular 18', 'PostgreSQL', 'JWT', 'Docker'],
    images: ['turnero_1.png', 'turnero_2.png', 'turnero_3.png', 'turnero_4.png'],
    github: 'https://github.com/JoaquinRomero36',
  },
  {
    id: 'tiendaRopa',
    title: 'Seven Outfit',
    subtitle: 'E-commerce · Iglesia Adventista',
    description: 'Tienda online con catálogo, filtros, compra por WhatsApp y panel admin.',
    longDescription: 'Tienda online con catálogo de ropa, filtros por categoría y talle, integración de compra por WhatsApp y panel de administración con CRUD completo y autenticación JWT.',
    tags: ['.NET 10', 'Angular 19', 'PostgreSQL', 'JWT', 'AutoMapper'],
    images: ['tienda_1.png', 'tienda_2.png', 'tienda_3.png', 'tienda_4.png'],
    github: 'https://github.com/JoaquinRomero36',
  },
  {
    id: 'chubut',
    title: 'Chubut',
    subtitle: 'Minijuegos para Marketing',
    description: 'Tres minijuegos interactivos (ruleta, trivia, memotest) para eventos reales.',
    longDescription: 'Desarrollo de tres minijuegos interactivos (ruleta, trivia y memotest) ejecutables offline, diseñados para uso real en eventos de la Lotería del Chubut. Implementación completa del frontend con lógica en TypeScript, manejo de estados y experiencia de usuario optimizada.',
    tags: ['Angular', 'TypeScript', 'HTML', 'CSS'],
    images: ['chubut_1.png', 'chubut_2.png', 'chubut_3.png', 'chubut_4.png', 'chubut_5.png', 'chubut_6.png'],
    github: 'https://github.com/JoaquinRomero36',
  },
  {
    id: 'pathfinder',
    title: 'myPathfinders',
    subtitle: 'Tesis de Grado',
    description: 'App para gestión integral de clubes de Conquistadores.',
    longDescription: 'Aplicación web para gestión integral de clubes de Conquistadores. Desarrollada de manera independiente como tesis de grado, aplicando arquitectura full stack de punta a punta con Spring Boot y Angular.',
    tags: ['Spring Boot', 'Angular', 'Java', 'REST API'],
    images: ['pathfinder_1.png', 'pathfinder_2.png', 'pathfinder_3.png', 'pathfinder_4.png', 'pathfinder_5.png', 'pathfinder_6.png', 'pathfinder_7.png'],
    github: 'https://github.com/JoaquinRomero36',
  },
  {
    id: 'gym',
    title: 'Gym',
    subtitle: 'Por definir',
    description: 'Proyecto en desarrollo.',
    longDescription: '',
    tags: [],
    images: ['gym_1.png', 'gym_2.png'],
    github: 'https://github.com/JoaquinRomero36',
  },
]

const techSkills = [
  "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3 / SCSS", "RxJS",
  "Java", "Spring Boot", "C# .NET", "REST APIs", "Entity Framework",
  "PostgreSQL", "Git", "GitHub", "Docker", "Postman"
]

const softSkills = [
  "Comunicación efectiva",
  "Colaboración en equipo",
  "Aprendizaje continuo",
  "Adaptabilidad",
  "Autonomía y proactividad",
  "Metodologías ágiles (Scrum)"
]

function HexIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={`${className} text-amber-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L20 7V17L12 22L4 17V7Z" />
    </svg>
  )
}

const sections = ['hero', 'about', 'skills', 'projects', 'contact']
const sectionLabels: Record<string, string> = {
  hero: 'Inicio', about: 'Sobre mí', skills: 'Skills', projects: 'Proyectos', contact: 'Contacto'
}

function Sidebar() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length > 0) setActive(visible[0].target.id)
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' })
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const activeIndex = sections.indexOf(active)
  const dropTop = activeIndex >= 0 ? activeIndex * 88 + 20 : 20

  return (
    <nav className="fixed left-0 top-0 h-full z-50 w-24 bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 border-r border-amber-700/30 flex flex-col items-center py-8 gap-0 shadow-2xl shadow-amber-950/50">
      <div className="relative flex flex-col items-center gap-0">
        <div
          className="absolute w-4 h-4 rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center"
          style={{
            top: dropTop,
            left: '50%',
            marginLeft: -8,
            background: 'radial-gradient(circle at 35% 30%, #fbbf24, #d97706)',
            boxShadow: '0 0 12px rgba(217,119,6,0.6), inset 0 1px 2px rgba(255,255,255,0.3)',
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </div>
        <div className="absolute w-[2px] rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            top: dropTop + 18,
            height: 4,
            left: '50%',
            marginLeft: -1,
            background: 'linear-gradient(to bottom, #d97706, transparent)',
            opacity: 0.6,
          }}
        />
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`relative z-10 w-full h-[88px] flex flex-col items-center justify-center gap-1 text-xs font-medium tracking-widest uppercase transition-all duration-500 ${active === id ? 'text-amber-300' : 'text-amber-600/50 hover:text-amber-400/80'}`}
          >
            <span className={`transition-all duration-500 ${active === id ? 'scale-110 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]' : ''}`}>
              {sectionLabels[id]}
            </span>
            <div className={`w-1 h-1 rounded-full transition-all duration-500 ${active === id ? 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]' : 'bg-transparent'}`} />
          </a>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6" style={{ scrollSnapAlign: 'start' }}>
      <div className="animate-fade-up text-center max-w-3xl">

        <h1 className="text-5xl sm:text-6xl font-bold text-amber-950 mb-6 leading-tight">
          Hola, soy <span className="text-amber-700">Joaquín Romero</span>
        </h1>
        <p className="text-lg sm:text-xl text-amber-900/70 mb-10 leading-relaxed max-w-2xl mx-auto">
          Desarrollador Full Stack · Técnico en Programación egresado de UTN. Especializado en Angular, TypeScript y .NET.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="#projects" className="bg-amber-700 hover:bg-amber-600 text-amber-50 px-6 py-3 rounded-lg font-medium transition shadow-lg shadow-amber-700/30">
            Ver proyectos
          </a>
          <a href="#contact" className="border-2 border-amber-700 hover:bg-amber-700 hover:text-amber-50 text-amber-800 px-6 py-3 rounded-lg font-medium transition">
            Contactar
          </a>
        </div>
      </div>
    </section>
  )
}

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView(0.4)
  return (
    <section ref={ref} id={id} className={`min-h-screen flex items-center justify-center px-6 py-12 ${className}`} style={{ scrollSnapAlign: 'start' }}>
      <div className={`w-full transition-all duration-700 ${inView ? 'animate-fade-up' : 'section-hidden'}`}>
        {children}
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-amber-800/10 border border-amber-700/20">
            <HexIcon className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-amber-950">Sobre mí</h2>
            <div className="w-10 h-1 bg-amber-500/60 rounded-full mt-1.5" />
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm border border-amber-200/40 rounded-2xl p-8 space-y-5 text-lg text-amber-900/80 leading-relaxed shadow-sm">
          <p>
            Técnico en Programación egresado de la UTN, con formación en desarrollo web full stack y experiencia práctica en proyectos reales para clientes. He desarrollado aplicaciones completas listas para producción.
          </p>
          <p>
            Trabajo con Angular y TypeScript en el frontend, y con Java Spring Boot y C# .NET en el backend. Aplico arquitecturas limpias, metodologías ágiles y me mantengo en constante aprendizaje.
          </p>
          <p>
            Me apasiona construir software que resuelva problemas reales. Busco sumarme a un equipo donde pueda aportar y seguir creciendo con cada desafío.
          </p>
        </div>
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 rounded-lg bg-amber-800/10 border border-amber-700/20">
            <HexIcon className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-amber-950">Skills</h2>
            <div className="w-10 h-1 bg-amber-500/60 rounded-full mt-1.5" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/20 backdrop-blur-sm border border-amber-200/40 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-amber-800 mb-5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shadow-[0_0_4px_rgba(217,119,6,0.4)]" />
              Técnicas
            </h3>
            <div className="flex flex-wrap gap-2">
              {techSkills.map((skill) => (
                <span key={skill} className="bg-amber-100/80 text-amber-900 px-3 py-1.5 rounded-lg text-sm font-medium border border-amber-200/50">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-amber-200/40 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-amber-800 mb-5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shadow-[0_0_4px_rgba(217,119,6,0.4)]" />
              Blandas
            </h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span key={skill} className="bg-amber-100/80 text-amber-900 px-3 py-1.5 rounded-lg text-sm font-medium border border-amber-200/50">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function HexProject({ project, onSelect, x, y }: { project: Project; onSelect: (p: Project) => void; x: number; y: number }) {
  return (
    <button onClick={() => onSelect(project)}
      className="absolute group cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 hover:drop-shadow-xl outline-none"
      style={{ width: 160, height: 184, left: x, top: y, clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', backgroundColor: '#d97706' }}>
      <div className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] flex items-center justify-center p-3 text-center"
        style={{ backgroundColor: '#fef3c7', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
        <div>
          <h3 className="text-amber-950 font-bold text-sm leading-tight mb-0.5">{project.title}</h3>
          <p className="text-amber-700 text-[10px] font-medium">{project.subtitle}</p>
        </div>
      </div>
    </button>
  )
}

function HexEmpty({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute" style={{ width: 160, height: 184, left: x, top: y, clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', backgroundColor: '#f59e0b' }}>
      <div className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px]"
        style={{ backgroundColor: '#fef3c7', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setImageIndex(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setImageIndex(i => Math.min(project.images.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, project.images.length])

  const currentImage = project.images.length > 0
    ? `/images/${project.id}/${project.images[imageIndex]}`
    : null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative bg-amber-50 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-amber-200 hover:bg-amber-300 text-amber-800 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold leading-none shadow-sm transition">
          ×
        </button>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <HexIcon className="w-6 h-6" />
            <div>
              <h3 className="text-xl font-bold text-amber-950">{project.title}</h3>
              <p className="text-sm text-amber-700">{project.subtitle}</p>
            </div>
          </div>

          {currentImage && (
            <div className="relative bg-amber-100 rounded-xl overflow-hidden mb-4">
              <img
                src={currentImage}
                alt={`${project.title} screenshot ${imageIndex + 1}`}
                className="w-full h-auto max-h-[50vh] object-contain"
              />
              {project.images.length > 1 && (
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 bg-gradient-to-t from-black/50 to-transparent">
                  <button
                    onClick={() => setImageIndex(i => Math.max(0, i - 1))}
                    disabled={imageIndex === 0}
                    className="text-white bg-black/30 hover:bg-black/50 rounded-lg px-3 py-1 text-sm disabled:opacity-30"
                  >
                    ← Anterior
                  </button>
                  <span className="text-white text-sm">{imageIndex + 1} / {project.images.length}</span>
                  <button
                    onClick={() => setImageIndex(i => Math.min(project.images.length - 1, i + 1))}
                    disabled={imageIndex === project.images.length - 1}
                    className="text-white bg-black/30 hover:bg-black/50 rounded-lg px-3 py-1 text-sm disabled:opacity-30"
                  >
                    Siguiente →
                  </button>
                </div>
              )}
            </div>
          )}

          <p className="text-amber-900/80 leading-relaxed mb-4">{project.longDescription || project.description}</p>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="bg-amber-200/70 text-amber-800 px-3 py-1 rounded-lg text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            {project.github && (
              <a href={project.github} target="_blank" className="bg-amber-700 hover:bg-amber-600 text-amber-50 px-4 py-2 rounded-lg text-sm font-medium transition">
                Ver en GitHub →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Section id="projects">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-16">
          <div className="p-2 rounded-lg bg-amber-800/10 border border-amber-700/20">
            <HexIcon className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-amber-950">Proyectos</h2>
            <div className="w-10 h-1 bg-amber-500/60 rounded-full mt-1.5" />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative" style={{ width: 760, height: 480 }}>
            <HexProject project={projects[0]} onSelect={setSelected} x={85} y={0} />
            <HexProject project={projects[1]} onSelect={setSelected} x={255} y={0} />
            <HexEmpty x={595} y={0} />
            <HexEmpty x={0} y={148} />
            <HexProject project={projects[2]} onSelect={setSelected} x={170} y={148} />
            <HexEmpty x={340} y={148} />
            <HexProject project={projects[3]} onSelect={setSelected} x={510} y={148} />
            <HexProject project={projects[4]} onSelect={setSelected} x={425} y={296} />
          </div>
        </div>
      </div>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact">
      <div className="max-w-xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-800/10 border border-amber-700/20">
            <HexIcon className="w-5 h-5 text-amber-700" />
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-bold text-amber-950">Contacto</h2>
            <div className="w-10 h-1 bg-amber-500/60 rounded-full mt-1.5" />
          </div>
        </div>
        <p className="text-amber-900/70 mb-10 text-lg">
          ¿Tenés un proyecto en mente o querés colaborar? No dudes en escribirme.
        </p>
        <div className="bg-white/20 backdrop-blur-sm border border-amber-200/40 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:joaquinromerobeskow@gmail.com" className="bg-amber-700 hover:bg-amber-600 text-amber-50 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center shadow-lg shadow-amber-700/30">
            Enviar email
          </a>
          <a href="https://github.com/JoaquinRomero36" target="_blank" className="border border-amber-300 hover:border-amber-500 bg-white/30 hover:bg-white/50 text-amber-800 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/joaquinromero36" target="_blank" className="border border-amber-300 hover:border-amber-500 bg-white/30 hover:bg-white/50 text-amber-800 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center">
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  )
}

function App() {
  return (
    <div className="min-h-screen pl-24">
      <Sidebar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
