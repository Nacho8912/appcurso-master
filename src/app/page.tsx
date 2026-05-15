import Link from "next/link";
import { ArrowRight, Play, CircleDot } from "lucide-react";

const pillars = [
  {
    label: "Pilar 1 — Semanas 1-4",
    title: "Piensa como un ingeniero de IA, no como un estudiante de Python",
    copy: "Aprendes Python como herramienta para construir inteligencia artificial real.",
    items: [
      "Python desde cero con mentalidad de ingeniero",
      "Estructuras de datos y lógica computacional",
      "Scripts automatizados y gestión de archivos",
      "Pensamiento computacional aplicado a IA",
    ],
    result: "Dominas Python y sabes construir programas reales desde cero",
    modules: "Ver 4 módulos incluidos",
  },
  {
    label: "Pilar 2 — Semanas 5-7",
    title: "De código básico a arquitectura profesional",
    copy: "No escribes solo líneas, diseñas sistemas que funcionan en el mundo real.",
    items: [
      "Programación orientada a objetos completa",
      "NumPy, Pandas y análisis de datos",
      "APIs REST y conexión con servicios reales",
      "Async, excepciones y código robusto",
    ],
    result: "Construyes software profesional conectado al mundo real",
    modules: "Ver 2 módulos incluidos",
  },
  {
    label: "Pilar 3 — Semanas 8-10",
    title: "Construye tu primer agente de inteligencia artificial",
    copy: "Del código a la inteligencia con LM y arquitectura de agentes.",
    items: [
      "Fundamentos profundos de LLMs y prompting",
      "Patrón ReAct y arquitectura de agentes",
      "Herramientas, percepción y memoria",
      "Tu primer agente funcional real",
    ],
    result: "Creas agentes de IA desde cero que piensan y actúan",
    modules: "Ver 2 módulos incluidos",
  },
  {
    label: "Pilar 4 — Semanas 11-13",
    title: "Domina los frameworks que usa la industria",
    copy: "Aprendes a usar los mismos stacks que emplean los equipos reales.",
    items: [
      "OpenAI Agents SDK y Google ADK",
      "LangChain, LangGraph y grafos de agentes",
      "CrewAI y equipos de agentes",
      "Criterio para elegir el framework correcto",
    ],
    result: "Construyes agentes con cualquier framework profesional",
    modules: "Ver 2 módulos incluidos",
  },
  {
    label: "Pilar 5 — Semanas 14-16",
    title: "De agente individual a sistema de inteligencia",
    copy: "Orquestas múltiples agentes y llevas el proyecto a producción.",
    items: [
      "Sistemas multi-agente y orquestación",
      "Deploy en producción con Docker y APIs",
      "Seguridad, guardrails y observabilidad",
      "Gestión de costes y optimización",
    ],
    result: "Despliegas sistemas de IA listos para producción real",
    modules: "Ver 2 módulos incluidos",
  },
  {
    label: "Pilar 6 — Semana 17",
    title: "Construye un sistema que demuestra todo lo aprendido",
    copy: "Tu proyecto final es la carta de presentación profesional.",
    items: [
      "Proyecto completo de principio a fin",
      "Sistema autónomo real desplegado",
      "Documentación profesional incluida",
      "Tarea lista para mostrar a empresas",
    ],
    result: "Proyecto final presentable a empresas o clientes reales",
    modules: "Ver 1 módulo incluido",
  },
];

const outcomes = [
  "Diseñar arquitecturas de agentes inteligentes",
  "Crear sistemas multi-agente que cooperan",
  "Automatizar tareas complejas con IA",
  "Construir agentes autónomos con Python",
  "Desplegar agentes en producción real",
  "Dominar los frameworks que usa la industria",
];

const normalCourse = [
  "Lista de módulos sueltos",
  "Herramientas aisladas sin sistema",
  "Sin metodología pedagógica",
  "Ejemplos triviales de juguete",
  "Sin ruta clara de aprendizaje",
  "Sin proyectos reales de producción",
];

const agentesPro = [
  "+6 pilares con transformación progresiva",
  "+10 agentes reales construidos",
  "13 metodologías pedagógicas integradas",
  "+30 proyectos de producción reales",
  "Roadmap de 17 semanas paso a paso",
  "Todas las soluciones detalladas",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-slate-200 selection:text-black">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-indigo-500/10 text-indigo-300">
              A
            </div>
            <div className="leading-tight">
              <div className="text-base font-black uppercase tracking-[0.35em]">AgentesPro</div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Master en IA Agéntica</div>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {['Programa', 'Pilares', 'Proyectos', 'Precios'].map((item) => (
              <Link key={item} href="#" className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden rounded-full border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.35em] text-slate-300 hover:border-indigo-400 hover:text-white transition-all lg:inline-flex">
              Acceder al Master
            </Link>
            <Link href="/login" className="rounded-full bg-indigo-500 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-black shadow-[0_20px_60px_rgba(79,70,229,0.25)] transition hover:bg-indigo-400">
              Acceder al programa
            </Link>
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),transparent_35%),radial-gradient(circle_at_0%_100%,rgba(56,189,248,0.1),transparent_30%)]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.45em] text-indigo-400 font-black mb-6">
                Programa Formativo de Alto Nivel · 2026
              </p>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
                Construye sistemas de inteligencia artificial <span className="text-indigo-400">autónoma</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                De cero absoluto a ingeniero de agentes de IA. No aprenderás teoría suelta. Construirás sistemas reales que piensan, deciden y actúan.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/login" className="inline-flex items-center justify-center gap-3 rounded-full bg-indigo-500 px-7 py-4 text-sm font-black uppercase tracking-[0.3em] text-black shadow-[0_20px_60px_rgba(79,70,229,0.25)] transition hover:bg-indigo-400">
                  Acceder al programa
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-slate-300 hover:text-white transition">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5">
                    <Play className="w-5 h-5" />
                  </span>
                  Ver Masterclass Intro
                </Link>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { value: '17', label: 'Semanas' },
                  { value: '6', label: 'Pilares' },
                  { value: '+30', label: 'Proyectos' },
                  { value: '+10', label: 'Agentes reales' },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="text-4xl font-black text-white">{item.value}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.35em] text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[3rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.3)]">
              <div className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">Resumen del programa</div>
              <div className="space-y-6">
                {['17 semanas', '6 pilares', '+30 proyectos', '+10 agentes reales'].map((item) => (
                  <div key={item} className="rounded-3xl bg-slate-950/70 p-5 border border-white/5">
                    <div className="font-black text-white">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-24 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Cada pilar es un paso diseñado para convertirte en un ingeniero de agentes.
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {pillars.map((pillar) => (
              <article key={pillar.label} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.3)]">
                <span className="text-xs uppercase tracking-[0.35em] text-indigo-300 font-black mb-4 block">{pillar.label}</span>
                <h3 className="text-2xl font-black text-white mb-4 leading-snug">{pillar.title}</h3>
                <p className="text-slate-400 mb-6">{pillar.copy}</p>
                <ul className="space-y-3 mb-8">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex gap-3 text-slate-300">
                      <CircleDot className="mt-1 w-3 h-3 text-indigo-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-3xl border border-indigo-500/15 bg-indigo-500/5 p-6">
                  <strong className="block text-sm uppercase tracking-[0.35em] text-indigo-300 mb-3">Resultado:</strong>
                  <p className="text-slate-100 font-semibold">{pillar.result}</p>
                </div>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.35em] text-indigo-300">
                  <span>{pillar.modules}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Al terminar este programa podrás</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((outcome) => (
              <div key={outcome} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <strong className="text-slate-100 font-black block mb-3">{outcome}</strong>
                <p className="text-slate-400 leading-relaxed">Lo aplicarás en proyectos reales, no en ejercicios aislados.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10">
              <h3 className="text-2xl font-black mb-6">Cursos de IA normales</h3>
              {normalCourse.map((item) => (
                <div key={item} className="mb-4 flex gap-4 text-slate-300">
                  <span className="mt-1 text-red-400">✕</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10">
              <h3 className="text-2xl font-black mb-6">Programa AgentesPro</h3>
              {agentesPro.map((item) => (
                <div key={item} className="mb-4 flex gap-4 text-slate-300">
                  <span className="mt-1 text-emerald-400">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-950 to-[#050505]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mx-auto rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_40px_120px_rgba(15,23,42,0.4)]">
            <span className="text-sm uppercase tracking-[0.35em] text-indigo-400 font-black">Accede al programa</span>
            <h2 className="mt-6 text-4xl md:text-5xl font-black tracking-tight leading-tight">Invierte en tu futuro profesional</h2>
            <p className="mt-6 text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Un programa completo de IA agéntica con proyecto final, mentoría y acceso a las herramientas que usan los equipos de ingeniería más avanzados.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-900 p-6 border border-white/10">
                <div className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-3">Valor total</div>
                <div className="text-4xl font-black">997 €</div>
              </div>
              <div className="rounded-3xl bg-slate-900 p-6 border border-white/10">
                <div className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-3">Precio de lanzamiento</div>
                <div className="text-4xl font-black">447 €</div>
              </div>
              <div className="rounded-3xl bg-emerald-500/10 p-6 border border-emerald-500/20">
                <div className="text-sm uppercase tracking-[0.35em] text-emerald-200 mb-3">Primeros 100 alumnos</div>
                <div className="text-4xl font-black text-emerald-100">197 €</div>
              </div>
            </div>

            <Link href="/login" className="mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-indigo-500 px-10 py-5 text-base font-black uppercase tracking-[0.2em] text-white transition hover:bg-indigo-400 shadow-2xl shadow-indigo-500/30">
              Reservar mi plaza ahora
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
