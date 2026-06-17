export default function WrestlingMindset() {
  const COMPARISONS = [
    {
      title: "Consistência Diária",
      combat: "Treinos diários no NTG refinando cada queda, posição de controle e explosão física até a exaustão.",
      code: "Escrever código limpo, refatorar pontos críticos de performance e automatizar processos repetitivos de forma obstinada.",
    },
    {
      title: "Resiliência Sob Pressão",
      combat: "Manter a calma no tapete quando o oponente está em vantagem e usar técnica para reverter a luta.",
      code: "Depurar erros complexos em produção ou lidar com picos de tráfego estruturando soluções friamente.",
    },
    {
      title: "Estratégia & Adaptação",
      combat: "Análise tática (scouting) do oponente para desenhar a estratégia perfeita de ataque e defesa.",
      code: "Escolher a arquitetura ideal (Supabase, microsserviços, IA) para solucionar os gargalos de negócio com o menor custo.",
    },
  ];

  return (
    <section id="mindset" className="py-32 px-6 max-w-5xl mx-auto border-t border-white/[0.05]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text narrative and NTG badge */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="section-tag">05 / Mindset de Atleta</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-white leading-none">
              A Disciplina do Tatame <br />
              <span className="text-red-500">na Engenharia.</span>
            </h2>
            <div className="w-12 h-[2px] bg-red-500 mt-2"></div>
          </div>
          
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            A Luta Livre Olímpica (Wrestling) não é apenas um esporte de força; é um xadrez humano de alavanca, 
            estratégia e pura resiliência mental. Como atleta federado e membro ativo do 
            <strong> NTG (National Training Group)</strong>, trago a disciplina inabalável dos treinos 
            de alta performance para o desenvolvimento de software.
          </p>

          <blockquote className="border-l border-red-500 pl-4 py-1 my-2">
            <p className="text-xs font-mono text-zinc-300 italic">
              &ldquo;No wrestling, não há atalhos. Você ganha na preparação silenciosa antes de pisar no tapete. No código, o princípio é o mesmo: a qualidade do software é reflexo da disciplina na sua arquitetura.&rdquo;
            </p>
          </blockquote>

          {/* NTG / Medals Stats Badge */}
          <div className="flex items-center gap-4 p-4 rounded-sm bg-red-950/[0.03] border border-red-500/10 w-fit">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-sm font-bold font-mono">
              ★
            </div>
            <div>
              <p className="text-xs font-mono text-white font-bold uppercase tracking-wider">NTG Affiliate</p>
              <p className="text-[10px] text-zinc-500">Atleta de Luta Livre / Medalhista de Torneios</p>
            </div>
          </div>
        </div>

        {/* Right column: Comparison grid */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {COMPARISONS.map((item, index) => (
            <div
              key={item.title}
              className="p-6 rounded-sm bg-white/[0.01] border border-white/[0.03] hover:border-red-500/10 hover:bg-red-950/[0.01] transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-red-500 font-bold">
                  0{index + 1}
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {item.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans leading-relaxed">
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    No Tatame (Wrestling)
                  </p>
                  <p className="text-zinc-400">{item.combat}</p>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-white/[0.05] pt-3 sm:pt-0 sm:pl-4">
                  <p className="text-[10px] font-mono text-red-500/70 uppercase tracking-widest mb-1">
                    No Teclado (Código)
                  </p>
                  <p className="text-zinc-300">{item.code}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
