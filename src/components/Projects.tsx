const EXPERIENCES = [
  {
    role: "Fundador & Tech Lead",
    company: "Kodava Solutions",
    period: "2024 — Presente",
    desc: "Fundação e liderança técnica no desenvolvimento de sistemas web corporativos, automação inteligente e integrações customizadas de Inteligência Artificial para otimização de operações empresariais.",
    tags: ["React", "Python", "Supabase", "n8n", "AI APIs"],
  },
  {
    role: "Desenvolvedor Full-Stack",
    company: "VTP",
    period: "2023 — Presente",
    desc: "Criação, refatoração e manutenção de plataformas web de ponta a ponta. Foco constante em arquitetura limpa, escalabilidade, segurança e refinamento de performance de carregamento (Core Web Vitals).",
    tags: ["React", "PHP", "JavaScript", "SQL", "Tailwind"],
  },
];

const PROJECTS = [
  {
    title: "Centurion Scout",
    type: "Combate & Performance",
    desc: "Sistema especializado de scouting tático e base de dados detalhada para treinadores e atletas de esportes de combate (Wrestling, MMA, Jiu-Jitsu). Permite registrar métricas de performance, padrões de luta e análise estatística de adversários.",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    featured: true,
  },
  {
    title: "Decide Aí Vida",
    type: "Utilitário Inteligente",
    desc: "Aplicativo inteligente que ajuda na tomada de decisão estruturada. Utiliza lógica avançada e processamento de IA para ponderar cenários cotidianos e reduzir a fadiga de escolha dos usuários.",
    tags: ["React Native", "Python", "AI APIs", "FastAPI"],
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="py-32 px-6 max-w-5xl mx-auto border-t border-white/[0.05]">
      <div className="flex flex-col gap-20">
        {/* Experience Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="section-tag">03 / Experiência</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white leading-none">
              Atuação no Mercado
            </h2>
            <p className="text-zinc-500 text-xs max-w-xs leading-relaxed">
              Minha trajetória como desenvolvedor construindo soluções robustas desde os primeiros passos na programação.
            </p>
          </div>

          <div className="md:col-span-8 flex flex-col gap-8">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.company}
                className="p-6 rounded-sm bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.08] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs font-mono text-red-500 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans mb-6">
                  {exp.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-12 border-t border-white/[0.03]">
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="section-tag">04 / Projetos</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white leading-none">
              Projetos Autorais
            </h2>
            <p className="text-zinc-500 text-xs max-w-xs leading-relaxed">
              Aplicações construídas para resolver problemas reais de nicho, fundindo tecnologia com paixões pessoais.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS.map((proj) => (
              <div
                key={proj.title}
                className={`p-6 rounded-sm bg-white/[0.01] border transition-all duration-300 flex flex-col justify-between ${
                  proj.featured
                    ? "border-red-500/20 hover:border-red-500/40 bg-red-950/[0.01]"
                    : "border-white/[0.03] hover:border-white/[0.08]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {proj.type}
                    </span>
                    {proj.featured && (
                      <span className="px-1.5 py-0.5 rounded-sm bg-red-500/10 border border-red-500/20 text-[9px] font-mono text-red-400 uppercase font-semibold">
                        Destaque
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-6">
                    {proj.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05] text-[9px] font-mono text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
