export default function About() {
  return (
    <section id="sobre" className="py-32 md:py-48 border-t border-white/[0.05] bg-transparent">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-20">
          <span className="section-tag">01 / Sobre Mim</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-none">
            Entre o código e o tatame.
          </h2>
          <div className="w-12 h-[2px] bg-red-500"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Biography Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-zinc-400 text-base md:text-lg font-normal leading-relaxed font-sans">
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
          </div>

          {/* Right Column: Bento Facts Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-zinc-950/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-300">
              <p className="font-mono text-[10px] text-white uppercase tracking-wider mb-2 font-bold">Formação Acadêmica</p>
              <p className="text-zinc-500 text-sm">FMU — Análise e Des. de Sistemas</p>
              <p className="text-zinc-500 text-sm mt-0.5">Zenithon — Inteligência Artificial</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-950/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-300">
              <p className="font-mono text-[10px] text-white uppercase tracking-wider mb-2 font-bold">Comunicação</p>
              <p className="text-zinc-500 text-sm">Inglês Nível B2 (Intermediário Avançado)</p>
              <p className="text-zinc-500 text-sm mt-0.5">Foco em documentação e colaboração global</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-950/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-300">
              <p className="font-mono text-[10px] text-white uppercase tracking-wider mb-2 font-bold">Atuação Profissional</p>
              <p className="text-zinc-500 text-sm">Fundador da Kodava Solutions</p>
              <p className="text-zinc-500 text-sm mt-0.5">Desenvolvedor Full-Stack na VTP</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-950/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-300">
              <p className="font-mono text-[10px] text-white uppercase tracking-wider mb-2 font-bold">Atletismo de Elite</p>
              <p className="text-zinc-500 text-sm">Atleta de Wrestling Federado / NTG</p>
              <p className="text-zinc-500 text-sm mt-0.5">Medalhista em torneios de luta olímpica</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
