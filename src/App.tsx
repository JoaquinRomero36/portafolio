import { useState, useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedTabBar from './components/ui/animated-tab-bar'

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
    images: ['turnero_1.webp', 'turnero_2.webp', 'turnero_3.webp', 'turnero_4.webp'],
    github: 'https://github.com/JoaquinRomero36/turnos-dotnet',
  },
  {
    id: 'tiendaRopa',
    title: 'Seven Outfit',
    subtitle: 'E-commerce · Iglesia Adventista',
    description: 'Tienda online con catálogo, filtros, compra por WhatsApp y panel admin.',
    longDescription: 'Tienda online con catálogo de ropa, filtros por categoría y talle, integración de compra por WhatsApp y panel de administración con CRUD completo y autenticación JWT.',
    tags: ['.NET 10', 'Angular 19', 'PostgreSQL', 'JWT', 'AutoMapper'],
    images: ['tienda_1.webp', 'tienda_2.webp', 'tienda_3.webp', 'tienda_4.webp'],
    github: 'https://github.com/JoaquinRomero36/seven-outfit',
  },
  {
    id: 'chubut',
    title: 'Chubut',
    subtitle: 'Minijuegos para Marketing',
    description: 'Tres minijuegos interactivos (ruleta, trivia, memotest) para eventos reales.',
    longDescription: 'Desarrollo de tres minijuegos interactivos (ruleta, trivia y memotest) ejecutables offline, diseñados para uso real en eventos de la Lotería del Chubut. Implementación completa del frontend con lógica en TypeScript, manejo de estados y experiencia de usuario optimizada.',
    tags: ['Angular', 'TypeScript', 'HTML', 'CSS'],
    images: ['chubut_1.webp', 'chubut_2.webp', 'chubut_3.webp', 'chubut_4.webp', 'chubut_5.webp', 'chubut_6.webp'],
    github: 'https://github.com/JoaquinRomero36/Minijuegos',
  },
  {
    id: 'pathfinder',
    title: 'myPathfinders',
    subtitle: 'Tesis de Grado',
    description: 'App para gestión integral de clubes de Conquistadores.',
    longDescription: 'Aplicación web para gestión integral de clubes de Conquistadores. Desarrollada de manera independiente como tesis de grado, aplicando arquitectura full stack de punta a punta con Spring Boot y Angular.',
    tags: ['Spring Boot', 'Angular', 'Java', 'REST API'],
    images: ['pathfinder_1.webp', 'pathfinder_2.webp', 'pathfinder_3.webp', 'pathfinder_4.webp', 'pathfinder_5.webp', 'pathfinder_6.webp', 'pathfinder_7.webp'],
    github: 'https://github.com/JoaquinRomero36/MyPAthfinders',
  },
  {
    id: 'gym',
    title: 'Gym',
    subtitle: 'Sistema de Gestión',
    description: 'Sistema de gestión de gimnasios con control de miembros, planes, pagos y rutinas.',
    longDescription: 'Sistema de gestión integral para gimnasios con control de miembros, planes de membresía, seguimiento de pagos, asignación de rutinas personalizadas y panel administrativo.',
    tags: ['.NET', 'Angular', 'PostgreSQL'],
    images: ['gym_1.webp', 'gym_2.webp'],
    github: 'https://github.com/JoaquinRomero36/Gym-SaaS',
  },
  {
    id: 'yeschef',
    title: 'YesChef',
    subtitle: 'Gestión de Restaurantes',
    description: 'Sistema para agilizar ventas, reservas y servicio de comida de un restaurante.',
    longDescription: 'Sistema de gestión integral para restaurantes que agiliza el proceso de ventas, reservas y servicios de comida. Aplicación full stack con Angular 18 standalone y PWA en el frontend, y ASP.NET Core 10 sobre PostgreSQL con tiempo real en SignalR.',
    tags: ['Angular 18', 'ASP.NET Core 10', 'PostgreSQL', 'SignalR', 'JWT', 'Docker'],
    images: [],
    github: 'https://github.com/JoaquinRomero36/yes-chef',
  },
  {
    id: 'salesPlatform',
    title: 'Sales Platform',
    subtitle: 'Tótems de Venta · Mercado Argentino',
    description: 'Plataforma de ventas con tótems/kioscos touch para el mercado argentino.',
    longDescription: 'Plataforma de ventas self-service con tótems/interfaces touch. Frontend React 18 + Vite con Zustand y Socket.io, y backend Express con Drizzle ORM, pagos con Mercado Pago y autenticación JWT.',
    tags: ['React', 'Express', 'Drizzle ORM', 'PostgreSQL', 'Mercado Pago', 'Socket.io'],
    images: [],
    github: 'https://github.com/JoaquinRomero36',
  },
  {
    id: 'totems',
    title: 'Juegos Totems',
    subtitle: 'Juegos Suramericanos · Santa Fe 2026',
    description: 'Minijuegos interactivos en tótems para los XIII Juegos Suramericanos.',
    longDescription: 'Experiencias de juego (ruleta, trivia, memotest, reacción y embajador) desplegadas en tótems para los XIII Juegos Suramericanos Santa Fe 2026. Apps Angular 18 empaquetadas con Electron para ejecución offline, con descarga de credenciales por QR.',
    tags: ['Angular 18', 'Electron', 'TypeScript', 'QR', 'Sweetalert2'],
    images: [],
    github: 'https://github.com/JoaquinRomero36',
  },
  {
    id: 'juventud',
    title: 'Juventud Landing',
    subtitle: 'Landing con Backend · Córdoba',
    description: 'Landing page con backend propio para registro y gestión de contenido.',
    longDescription: 'Landing page para un movimiento juvenil con backend real: registro y login con JWT + bcrypt, carga de fotos con Multer y base de datos PostgreSQL vía Prisma. Empaquetada con Docker para despliegue.',
    tags: ['Express', 'Prisma', 'PostgreSQL', 'JWT', 'Docker'],
    images: [],
    github: 'https://github.com/JoaquinRomero36/JuventudLanding',
  },
  {
    id: 'wallpaper',
    title: 'Wall-Paper Engenier',
    subtitle: 'Motor de Wallpapers · Windows',
    description: 'Motor de fondos de pantalla interactivos para Windows, clon casero de Wallpaper Engine.',
    longDescription: 'Aplicación de escritorio que ejecuta wallpapers interactivos para Windows. Desarrollada con Electron y TypeScript, usando FFI (koffi) para integrarse con APIs nativas del sistema.',
    tags: ['Electron', 'TypeScript', 'FFI (koffi)'],
    images: [],
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

function Navbar() {
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

  const items = sections.map(id => ({ label: sectionLabels[id] }))

  const handleTabChange = (index: number) => {
    const id = sections[index]
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed left-12 top-1/2 -translate-y-1/2 z-50">
      <AnimatedTabBar items={items} activeIndex={sections.indexOf(active)} onTabChange={handleTabChange} />
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
                loading="lazy"
                decoding="async"
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
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 rounded-lg bg-amber-800/10 border border-amber-700/20">
            <HexIcon className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-amber-950">Proyectos</h2>
            <div className="w-10 h-1 bg-amber-500/60 rounded-full mt-1.5" />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative" style={{ width: 670, height: 480 }}>
            <HexProject project={projects[0]} onSelect={setSelected} x={85} y={0} />
            <HexProject project={projects[1]} onSelect={setSelected} x={255} y={0} />
            <HexProject project={projects[2]} onSelect={setSelected} x={425} y={0} />
            <HexProject project={projects[3]} onSelect={setSelected} x={0} y={148} />
            <HexProject project={projects[4]} onSelect={setSelected} x={170} y={148} />
            <HexProject project={projects[5]} onSelect={setSelected} x={340} y={148} />
            <HexProject project={projects[6]} onSelect={setSelected} x={510} y={148} />
            <HexProject project={projects[7]} onSelect={setSelected} x={85} y={296} />
            <HexProject project={projects[8]} onSelect={setSelected} x={255} y={296} />
            <HexProject project={projects[9]} onSelect={setSelected} x={425} y={296} />
          </div>
        </div>
      </div>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </Section>
  )
}

function ContactForm() {
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name: company, message },
        { publicKey: PUBLIC_KEY },
      )
      setCompany('')
      setMessage('')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-white/30 border border-amber-300/40 placeholder:text-amber-900/40 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white/40 transition'

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Tu nombre / empresa"
        className={inputClass}
        required
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Detalles del trabajo..."
        rows={5}
        className={`${inputClass} resize-none`}
        required
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-amber-700 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-amber-50 px-6 py-3 rounded-lg font-medium transition shadow-lg shadow-amber-700/30"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
      </button>
      {status === 'sent' && (
        <p className="text-amber-800 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3 text-sm">
          ¡Mensaje enviado! Te respondo a la brevedad.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-700 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm">
          No se pudo enviar el mensaje. Intentalo de nuevo.
        </p>
      )}
    </form>
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
        <div className="bg-white/20 backdrop-blur-sm border border-amber-200/40 rounded-2xl p-6 shadow-sm mt-10">
          <ContactForm />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 pt-6 border-t border-amber-200/40">
            <a href="https://github.com/JoaquinRomero36" target="_blank" className="border border-amber-300 hover:border-amber-500 bg-white/30 hover:bg-white/50 text-amber-800 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/joaquinromero36" target="_blank" className="border border-amber-300 hover:border-amber-500 bg-white/30 hover:bg-white/50 text-amber-800 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </Section>
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
