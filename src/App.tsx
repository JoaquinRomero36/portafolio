import { useState, useEffect } from 'react'

type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
  github?: string
}

type Skill = {
  name: string
  level: number
}

const projects: Project[] = [
  {
    title: "Proyecto 1",
    description: "Descripción de tu proyecto más destacado. Explica qué problema resuelve y qué tecnologías usaste.",
    tags: ["React", "Node.js", "TypeScript"],
    github: "https://github.com/tuusuario/proyecto1",
  },
  {
    title: "Proyecto 2",
    description: "Otro proyecto interesante. Muestra tu versatilidad y capacidad de aprendizaje.",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    github: "https://github.com/tuusuario/proyecto2",
  },
  {
    title: "Proyecto 3",
    description: "Un proyecto más para demostrar tu experiencia en diferentes áreas del desarrollo.",
    tags: ["Next.js", "Tailwind", "MongoDB"],
    link: "https://proyecto3.com",
    github: "https://github.com/tuusuario/proyecto3",
  },
]

const skills: Skill[] = [
  { name: "TypeScript", level: 85 },
  { name: "React", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "Python", level: 70 },
  { name: "PostgreSQL", level: 65 },
  { name: "Tailwind CSS", level: 85 },
]

function HexIcon() {
  return (
    <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <HexIcon /> Portfolio
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
          Hola, soy <span className="text-amber-700">Tu Nombre</span>
        </h1>
        <p className="text-lg text-amber-900/80 mb-8 leading-relaxed">
          Desarrollador fullstack apasionado por crear aplicaciones web modernas y escalables. Especializado en React, TypeScript y Node.js.
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
            Soy un desarrollador con experiencia en la creación de aplicaciones web. Me especializo en construir productos digitales que resuelven problemas reales.
          </p>
          <p>
            Actualmente me enfoco en el ecosistema JavaScript/TypeScript, trabajando con React para el frontend y Node.js para el backend. Me apasiona el aprendizaje continuo y estar al día con las últimas tecnologías.
          </p>
          <p>
            Cuando no estoy codeando, me gusta explorar nuevas herramientas, contribuir a proyectos open source y compartir conocimiento con la comunidad.
          </p>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-honeycomb">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <HexIcon />
          <h2 className="text-3xl font-bold text-amber-950">Skills</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-amber-900 font-medium">{skill.name}</span>
                <span className="text-amber-700">{skill.level}%</span>
              </div>
              <div className="h-2.5 bg-amber-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <HexIcon />
          <h2 className="text-3xl font-bold text-amber-950">Proyectos</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="group bg-amber-50 border-2 border-amber-200 rounded-xl p-6 hover:border-amber-500 transition shadow-sm hover:shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <HexIcon />
                <h3 className="text-lg font-semibold text-amber-950">{project.title}</h3>
              </div>
              <p className="text-sm text-amber-900/70 mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-amber-200/70 text-amber-800 px-2.5 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.github && (
                  <a href={project.github} target="_blank" className="text-sm text-amber-700 hover:text-amber-600 font-medium transition">
                    GitHub →
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" className="text-sm text-amber-700 hover:text-amber-600 font-medium transition">
                    Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
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
          <a href="mailto:tu@email.com" className="bg-amber-700 hover:bg-amber-600 text-amber-50 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center shadow-sm">
            Enviar email
          </a>
          <a href="https://github.com/tuusuario" target="_blank" className="border-2 border-amber-300 hover:border-amber-500 text-amber-800 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center">
            GitHub
          </a>
          <a href="https://linkedin.com/in/tuusuario" target="_blank" className="border-2 border-amber-300 hover:border-amber-500 text-amber-800 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 px-6 border-t-2 border-amber-200 bg-amber-100">
      <div className="max-w-5xl mx-auto text-center text-sm text-amber-700">
        Hecho con 🐝 por Tu Nombre &copy; {new Date().getFullYear()}
      </div>
    </footer>
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
      <Footer />
    </div>
  )
}

export default App
