import DualIdentityImage from "./DualIdentityImage";

export default function About() {
  return (
    <section id="sobre" className="py-32 px-6 max-w-5xl mx-auto border-t border-white/[0.05]">
      {/* Section Header */}
      <div className="flex flex-col gap-4 mb-16">
        <span className="section-tag">01 / Sobre Mim</span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-white leading-none">
          A união entre o código e o tatame.
        </h2>
        <div className="w-12 h-[2px] bg-red-500"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Biography narrative & Quick Facts */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-400 text-sm leading-relaxed font-sans">
          <p>
            Iniciei minha jornada no mundo do desenvolvimento aos **11 anos**. O que começou como curiosidade
            rapidamente se tornou uma vocação profissional e um compromisso com a excelência técnica. Essa imersão 
            precoce me permitiu desenvolver maturidade profissional e capacidade técnica sólida bem antes da maioria,
            sempre focando em resolver problemas reais por meio de linhas de código precisas.
          </p>
          <p>
            Atualmente, curso **Análise e Desenvolvimento de Sistemas na FMU** e sou formado em **Inteligência Artificial**
            pela **Zenithon Academy**. Minha rotina é guiada pelo alto desempenho. Entre o desenvolvimento de aplicações full-stack,
            integração de IA e automatização de fluxos, eu mantenho um compromisso sério com a minha preparação como
            **atleta competitivo de Luta Livre (Wrestling)** afiliado ao **NTG (National Training Group)**.
          </p>
          <p>
            Acredito que o desenvolvimento de software e a luta de alta performance compartilham a mesma essência: 
            a consistência silenciosa dos treinos diários, o estudo tático dos problemas e a persistência obstinada 
            em buscar a vitória, seja refatorando um código complexo ou disputando um lugar no topo do pódio.
          </p>

          {/* Quick Facts Grid (Bento Style matching Vercel aesthetic) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-300">
              <p className="font-mono text-[10px] text-white uppercase tracking-wider mb-1">Formação Acadêmica</p>
              <p className="text-zinc-500 text-xs">FMU — Análise e Des. de Sistemas</p>
              <p className="text-zinc-500 text-xs mt-0.5">Zenithon — Inteligência Artificial</p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-300">
              <p className="font-mono text-[10px] text-white uppercase tracking-wider mb-1">Comunicação</p>
              <p className="text-zinc-500 text-xs">Inglês Nível B2 (Intermediário Avançado)</p>
              <p className="text-zinc-500 text-xs mt-0.5">Foco em documentação e colaboração global</p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-300">
              <p className="font-mono text-[10px] text-white uppercase tracking-wider mb-1">Atuação Profissional</p>
              <p className="text-zinc-500 text-xs">Fundador da Kodava Solutions</p>
              <p className="text-zinc-500 text-xs mt-0.5">Desenvolvedor Full-Stack na VTP</p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-300">
              <p className="font-mono text-[10px] text-white uppercase tracking-wider mb-1">Atletismo de Elite</p>
              <p className="text-zinc-500 text-xs">Atleta de Wrestling Federado / NTG</p>
              <p className="text-zinc-500 text-xs mt-0.5">Medalhista em torneios de luta olímpica</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Image Component */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <DualIdentityImage />
        </div>
      </div>
    </section>
  );
}
