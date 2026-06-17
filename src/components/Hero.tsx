export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-[#000000] overflow-hidden py-32 md:py-48">
      {/* Visual background grid texture */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-950/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute -left-20 bottom-1/4 w-80 h-80 bg-zinc-900/40 rounded-full blur-[100px] -z-10"></div>

      {/* Main Container with Vercel Scale */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col gap-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
              Full-Stack Dev & Luta Livre Athlete
            </span>
          </div>

          {/* Majestic Hero Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            Kayqui Rocha <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600">
              Godinho
            </span>
          </h1>

          {/* Subtitle / Copy */}
          <p className="text-zinc-400 text-lg md:text-xl font-normal max-w-2xl leading-relaxed font-sans">
            Desenvolvedor Full-Stack focado em construir aplicações web modernas,
            sistemas escaláveis e automações inteligentes com IA. Trago a disciplina rigorosa,
            a resiliência e o foco do tatame de <strong>Luta Livre Olímpica (Wrestling)</strong> para a precisão da engenharia de software.
          </p>

          {/* Action Buttons (Aligned) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-fit mt-2">
            <a
              href="#projetos"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-white px-8 text-xs font-mono font-bold text-black uppercase hover:opacity-90 transition-opacity duration-300 w-full sm:w-auto text-center"
            >
              Ver Projetos
            </a>
            <a
              href="#contato"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-zinc-800 bg-transparent px-8 text-xs font-mono text-zinc-400 uppercase hover:bg-white/[0.02] hover:border-zinc-700 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Entrar em Contato
            </a>
          </div>

          {/* Stat Grid - Reformulated under text and CTAs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-white/5 mt-4">
            <div>
              <p className="text-4xl md:text-5xl font-mono tracking-tight text-white font-bold">7+ Anos</p>
              <p className="text-xs text-zinc-500 tracking-widest uppercase mt-2 font-mono">Na Tecnologia</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-mono tracking-tight text-white font-bold">Full</p>
              <p className="text-xs text-zinc-500 tracking-widest uppercase mt-2 font-mono">Stack Dev</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-mono tracking-tight text-white font-bold">NTG</p>
              <p className="text-xs text-zinc-500 tracking-widest uppercase mt-2 font-mono">Wrestling Elite</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-mono tracking-tight text-white font-bold">FMU/IA</p>
              <p className="text-xs text-zinc-500 tracking-widest uppercase mt-2 font-mono">Formação</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Placeholder Area */}
        <div className="lg:col-span-5 flex items-center justify-center animate-fade-in delay-200">
          <div className="relative w-full aspect-[3/4] max-w-sm mx-auto border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/30 flex flex-col items-center justify-center p-8 text-center group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-950/[0.02] to-transparent pointer-events-none"></div>
            <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4 group-hover:text-red-500 group-hover:border-red-500/20 transition-all duration-500 bg-zinc-950">
              <span className="text-sm font-mono">⚡</span>
            </div>
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Interactive Asset Area</p>
            <p className="text-[9px] text-zinc-500 max-w-[220px] leading-relaxed">
              Área reservada para o componente interativo de imagem com efeito de máscara dinâmica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
