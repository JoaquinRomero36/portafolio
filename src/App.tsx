import { useState, useEffect } from 'react'

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

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-amber-100/90 backdrop-blur border-b border-amber-300" : "bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-xl font-bold text-amber-900">
          <HexIcon /> Joaquín Romero
        </a>
        <div className="hidden sm:flex gap-6 text-sm text-amber-800">
          <a href="#about" className="hover:text-amber-600 transition">Sobre mí</a>
          <a href="#skills" className="hover:text-amber-600 transition">Skills</a>
          <a href="#projects" className="hover:text-amber-600 transition">Proyectos</a>
          <a href="#contact" className="hover:text-amber-600 transition">Contacto</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-honeycomb-hero">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-amber-950/10 border border-amber-950/20 rounded-full px-4 py-1.5 text-sm text-amber-900 mb-8">
          <HexIcon />
          Disponible para trabajar
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-amber-950 mb-6 leading-tight">
          Hola, soy <span className="text-amber-700">Joaquín Romero</span>
        </h1>
        <p className="text-lg text-amber-900/80 mb-8 leading-relaxed">
          Desarrollador Full Stack · Técnico en Programación egresado de UTN. Especializado en Angular, TypeScript y .NET.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="#projects" className="bg-amber-700 hover:bg-amber-600 text-amber-50 px-6 py-3 rounded-lg font-medium transition shadow-sm">
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

function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <HexIcon />
          <h2 className="text-3xl font-bold text-amber-950">Sobre mí</h2>
        </div>
        <div className="space-y-4 text-amber-900/70 leading-relaxed">
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
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-honeycomb">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <HexIcon />
          <h2 className="text-3xl font-bold text-amber-950">Skills</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-amber-800 mb-4">Técnicas</h3>
            <div className="flex flex-wrap gap-2">
              {techSkills.map((skill) => (
                <span key={skill} className="bg-amber-200/70 text-amber-900 px-3 py-1.5 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-800 mb-4">Blandas</h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span key={skill} className="bg-amber-200/70 text-amber-900 px-3 py-1.5 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectHexagon({ project, index, onSelect }: { project: Project; index: number; onSelect: (p: Project) => void }) {
  const isOffset = index >= 3

  return (
    <button
      onClick={() => onSelect(project)}
      className="relative group cursor-pointer outline-none border-none transition-transform duration-300 hover:scale-105"
      style={{
        width: 260,
        height: 220,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        marginRight: -20,
        marginLeft: isOffset ? 130 : 0,
        marginTop: isOffset ? -50 : 0,
        backgroundColor: '#FEF3C7',
        border: '2px solid #F59E0B'
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-amber-950 font-bold text-lg leading-tight mb-1">{project.title}</h3>
        <p className="text-amber-700 text-xs font-medium">{project.subtitle}</p>
        <p className="text-amber-900/70 text-xs mt-2 line-clamp-2 px-2">{project.description}</p>
      </div>
    </button>
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-amber-50 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <HexIcon className="w-6 h-6" />
              <div>
                <h3 className="text-xl font-bold text-amber-950">{project.title}</h3>
                <p className="text-sm text-amber-700">{project.subtitle}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-amber-600 hover:text-amber-800 text-2xl leading-none">&times;</button>
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
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <HexIcon />
          <h2 className="text-3xl font-bold text-amber-950">Proyectos</h2>
        </div>

        <div className="flex flex-col items-center overflow-hidden pb-8">
          {/* Row 1: 3 hexagons */}
          <div className="flex justify-center">
            {projects.slice(0, 3).map((project, i) => (
              <ProjectHexagon key={project.id} project={project} index={i} onSelect={setSelected} />
            ))}
          </div>
          {/* Row 2: 2 hexagons (offset) */}
          <div className="flex justify-center">
            {projects.slice(3).map((project, i) => (
              <ProjectHexagon key={project.id} project={project} index={i + 3} onSelect={setSelected} />
            ))}
          </div>
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-honeycomb">
      <div className="max-w-xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <HexIcon />
          <h2 className="text-3xl font-bold text-amber-950">Contacto</h2>
        </div>
        <p className="text-amber-900/70 mb-8">
          ¿Tenés un proyecto en mente o querés colaborar? No dudes en escribirme.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:joaquinromerobeskow@gmail.com" className="bg-amber-700 hover:bg-amber-600 text-amber-50 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center shadow-sm">
            Enviar email
          </a>
          <a href="https://github.com/JoaquinRomero36" target="_blank" className="border-2 border-amber-300 hover:border-amber-500 text-amber-800 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/joaquinromero36" target="_blank" className="border-2 border-amber-300 hover:border-amber-500 text-amber-800 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
