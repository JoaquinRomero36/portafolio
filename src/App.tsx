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

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/90 backdrop-blur border-b border-gray-800" : "bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-white">Portfolio</a>
        <div className="hidden sm:flex gap-6 text-sm text-gray-400">
          <a href="#about" className="hover:text-purple-400 transition">Sobre mí</a>
          <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
          <a href="#projects" className="hover:text-purple-400 transition">Proyectos</a>
          <a href="#contact" className="hover:text-purple-400 transition">Contacto</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-8">
          Disponible para trabajar
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
          Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Tu Nombre</span>
        </h1>
        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
          Desarrollador fullstack apasionado por crear aplicaciones web modernas y escalables. Especializado en React, TypeScript y Node.js.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="#projects" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-medium transition">
            Ver proyectos
          </a>
          <a href="#contact" className="border border-gray-700 hover:border-purple-500 text-gray-300 px-6 py-3 rounded-lg font-medium transition">
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
        <h2 className="text-3xl font-bold text-white mb-8">Sobre mí</h2>
        <div className="space-y-4 text-gray-400 leading-relaxed">
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
    <section id="skills" className="py-24 px-6 bg-gray-900/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">Skills</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">{skill.name}</span>
                <span className="text-gray-500">{skill.level}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
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
        <h2 className="text-3xl font-bold text-white mb-12">Proyectos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-purple-500/10 text-purple-300 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.github && (
                  <a href={project.github} target="_blank" className="text-sm text-gray-400 hover:text-purple-400 transition">
                    GitHub →
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" className="text-sm text-gray-400 hover:text-purple-400 transition">
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
    <section id="contact" className="py-24 px-6 bg-gray-900/50">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Contacto</h2>
        <p className="text-gray-400 mb-8">
          ¿Tenés un proyecto en mente o querés colaborar? No dudes en escribirme.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:tu@email.com" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center">
            Enviar email
          </a>
          <a href="https://github.com/tuusuario" target="_blank" className="border border-gray-700 hover:border-purple-500 text-gray-300 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center">
            GitHub
          </a>
          <a href="https://linkedin.com/in/tuusuario" target="_blank" className="border border-gray-700 hover:border-purple-500 text-gray-300 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-800">
      <div className="max-w-5xl mx-auto text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Tu Nombre. Todos los derechos reservados.
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
