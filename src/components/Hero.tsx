export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 max-w-5xl mx-auto overflow-hidden pt-32 pb-16">
      {/* Visual background grid texture */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-950/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute -left-20 bottom-1/4 w-80 h-80 bg-zinc-900/40 rounded-full blur-[100px] -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              Full-Stack Dev & Luta Livre Athlete
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[1.05]">
            Kayqui Rocha <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500">
              Godinho
            </span>
          </h1>

          {/* Subtitle / Intro */}
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-xl">
            Desenvolvedor Full-Stack focado em construir aplicações web modernas,
            sistemas escaláveis e automações inteligentes com IA. Trago a disciplina rigorosa,
            a resiliência e o foco do tatame de <strong>Luta Livre Olímpica (Wrestling)</strong> para a precisão da engenharia de software.
          </p>

          {/* Stat Grid - Reformulated with Clean Dividers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/[0.04] bg-white/[0.01] rounded-sm mt-4">
            <div className="p-4 border-r border-b sm:border-b-0 border-white/[0.06]">
              <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">7+ Anos</p>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Na Tecnologia</p>
            </div>
            <div className="p-4 border-b sm:border-b-0 sm:border-r border-white/[0.06]">
              <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">Full-Stack</p>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Stack Principal</p>
            </div>
            <div className="p-4 border-r border-white/[0.06]">
              <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">NTG</p>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Wrestling Elite</p>
            </div>
            <div className="p-4">
              <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">FMU / IA</p>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Acadêmico</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-fit">
            <a
              href="#projetos"
              className="inline-flex h-11 items-center justify-center rounded-sm bg-white px-6 text-xs font-mono font-bold text-black uppercase hover:bg-zinc-200 transition-colors duration-300 w-full sm:w-auto text-center"
            >
              Ver Projetos
            </a>
            <a
              href="#contato"
              className="inline-flex h-11 items-center justify-center rounded-sm border border-white/[0.08] bg-transparent px-6 text-xs font-mono text-white uppercase hover:bg-white/[0.04] transition-all duration-300 w-full sm:w-auto text-center"
            >
              Entrar em Contato
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Image Placeholder Container */}
        <div className="lg:col-span-5 flex items-center justify-center animate-fade-in delay-200">
          <div className="relative w-full aspect-[4/5] max-w-sm mx-auto border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/40 flex flex-col items-center justify-center p-6 text-center group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-950/[0.02] to-transparent pointer-events-none"></div>
            <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3 group-hover:text-red-500 group-hover:border-red-500/20 transition-all duration-500 bg-zinc-950">
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
