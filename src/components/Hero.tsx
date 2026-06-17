import DualIdentityImage from "./DualIdentityImage";

export default function Hero() {
  return (
    <section className="relative min-h-screen lg:h-screen lg:min-h-[850px] flex flex-col justify-center overflow-hidden">
      {/* Visual background grid texture */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Main Container with Vercel Scale - Full Bleed Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-24 lg:py-0">
        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 animate-fade-in">
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
            a resiliência e o foco do tatame de Luta Livre Olímpica (Wrestling) para a precisão da engenharia de software.
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

          {/* Stat Grid */}
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

        {/* Right Column: Interactive Image Component */}
        <div className="lg:col-span-5 flex items-center justify-center w-full animate-fade-in delay-200">
          <DualIdentityImage />
        </div>
      </div>
    </section>
  );
}
