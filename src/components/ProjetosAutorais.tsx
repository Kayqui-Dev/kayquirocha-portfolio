"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectModal from "./ProjectModal";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Centurion Scout",
    type: "Combate & Performance",
    year: "2025",
    desc: "Sistema especializado de scouting tático e base de dados preditiva para treinadores e atletas de esportes de combate (Wrestling, MMA). Avaliação estatística usando IA.",
    longDesc: "O Centurion Scout é uma plataforma inovadora criada na intersecção entre tecnologia de ponta e esportes de combate. Ele resolve o gargalo de análise tática subjetiva em artes marciais, trazendo dados objetivos e mapas visuais detalhados para treinadores, atletas olímpicos e lutadores profissionais estruturarem seus planos de luta.",
    architecture: [
      "Next.js (App Router) + TypeScript no frontend.",
      "Banco de dados relacional PostgreSQL.",
      "Backend-as-a-service moderno via Supabase.",
      "Row Level Security (RLS) para proteção de dados sensíveis dos lutadores."
    ],
    features: [
      "Gravação de mapas de calor (heatmaps) de quedas e pontuações no tatame.",
      "Dashboard dinâmico com métricas táticas de oponentes.",
      "Histórico de lesões e acompanhamento de corte de peso.",
      "Exportação de relatórios táticos completos em PDF."
    ],
    dbFlow: "Supabase PostgreSQL -> Tabelas relacionais vinculando 'Atletas', 'Lutas' e 'Ações'. Cada pontuação no tatame dispara uma inserção em tempo real que atualiza os heatmaps instantaneamente via real-time triggers, estruturada sob políticas rígidas de segurança por perfil.",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    image: "/centurion_scout.png",
  },
  {
    title: "Decide Aí Vida",
    type: "Decisão Autônoma",
    year: "2024",
    desc: "Rede de decisão autônoma alimentada por LLMs locais seguros. Avalia logs operacionais e ajuda na tomada de decisão estruturada para reduzir a fadiga de escolha.",
    longDesc: "O Decide Aí Vida é uma ferramenta de produtividade e análise cognitiva desenvolvida para combater a fadiga de escolha cotidiana. A aplicação utiliza modelos avançados de Inteligência Artificial para analisar cenários ponderando os prós, contras, riscos e potenciais recompensas das decisões tomadas pelos usuários.",
    architecture: [
      "Frontend multiplataforma em React Native.",
      "API de processamento rápido utilizando Python (FastAPI).",
      "Modelos de IA da OpenAI e Gemini para geração cognitiva.",
      "Caching inteligente de sessões para performance."
    ],
    features: [
      "Análise assistida por IA para decisões complexas e rápidas.",
      "Ponderação automática de cenários com árvore de probabilidade.",
      "Histórico criptografado de decisões tomadas.",
      "Design minimalista focado em reduzir estresse cognitivo."
    ],
    dbFlow: "React Native -> API Gateway (Python FastAPI) -> OpenAI/Gemini API para avaliação estruturada. Os dados da decisão do usuário são processados e armazenados localmente de forma segura, com registros agregados anonimizados para estatísticas de comportamento.",
    tags: ["React Native", "Python", "AI APIs", "FastAPI"],
    image: "/decide_ai_vida.png",
  },
  {
    title: "Centurion Fight Shop",
    type: "E-commerce & Analytics",
    year: "2025",
    desc: "E-commerce completo e sistema interno para cadastro, indexação de lutas e gestão financeira de atletas associados.",
    longDesc: "O Centurion Fight Shop é um ecossistema digital que combina uma experiência de venda de alta performance para produtos de luta com um painel administrativo integrado. Ele conecta a receita da loja ao suporte de atletas patrocinados, controlando comissões, vendas e dados de filiação de forma unificada.",
    architecture: [
      "Next.js no frontend para carregamento ultra-rápido e SEO.",
      "Integração via Shopify Admin API e Storefront API.",
      "Painel de controle administrativo customizado.",
      "Webhooks do Shopify para sincronização em tempo real."
    ],
    features: [
      "Carregamento instantâneo de produtos via Server-Side Rendering (SSR).",
      "Checkout seguro integrado diretamente ao gateway de pagamentos.",
      "Controle de repasse financeiro e comissões para atletas.",
      "Gestão de estoque automatizada vinculada a múltiplos centros de distribuição."
    ],
    dbFlow: "Next.js Frontend -> Shopify Storefront API (Catálogo) & Node.js Backend (Comissões de Atletas) -> PostgreSQL. Os webhooks de venda concluída do Shopify batem na nossa API, que atualiza a carteira digital do atleta associado automaticamente.",
    tags: ["Next.js", "Shopify API", "TypeScript", "Node.js", "Tailwind CSS"],
    image: "/centurion_fight_shop.png",
  },
  {
    title: "VTPDirect Dashboard",
    type: "Painel Operacional & Logística",
    year: "2024",
    desc: "Painel administrativo criptografado para indexação de dados e análise operacional de frotas industriais.",
    longDesc: "O VTPDirect Dashboard é um sistema de nível empresarial projetado para consolidar logs de operação, consumo e manutenção de frotas de transporte de larga escala. Ele traduz grandes volumes de dados de sensores industriais e GPS em insights gerenciais claros e tomadas de decisão rápidas.",
    architecture: [
      "Frontend administrativo otimizado.",
      "API robusta em Express/Node.js.",
      "Banco de dados relacional MySQL otimizado para leitura intensiva.",
      "Criptografia de dados ponta a ponta (AES-256) para logs operacionais privados."
    ],
    features: [
      "Rastreamento e status operacional de frotas em tempo real.",
      "Geração automatizada de ordens de serviço e manutenção preditiva.",
      "Gráficos interativos de performance de combustível e emissões.",
      "Controle de acesso granular baseado em papéis (RBAC)."
    ],
    dbFlow: "Painel Administrativo -> Express.js API -> MySQL Database. Logs industriais e dados telemétricos são inseridos em lotes estruturados, indexados por data e ID de veículo, permitindo consultas analíticas rápidas de relatórios de consumo em menos de 100ms.",
    tags: ["MySQL", "Node.js", "Express", "React", "Admin Panel"],
    image: "/vtpdirect_dashboard.png",
  }
];

export default function ProjetosAutorais() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const [scene, setScene] = useState("01 / 04");
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!container || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Create pinned ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3000", // Length of pinning scroll
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Determine active scene based on scroll progress
            if (progress < 0.25) {
              setScene("01 / 04");
            } else if (progress < 0.5) {
              setScene("02 / 04");
            } else if (progress < 0.75) {
              setScene("03 / 04");
            } else {
              setScene("04 / 04");
            }
          }
        },
      });

      // Set initial states for subsequent stacked cards
      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], { yPercent: 100, opacity: 0 });
      }

      // Transition step 1: card 0 out, card 1 in
      tl.to(cards[0], {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
      })
      .to(cards[1], {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut"
      }, "<")

      // Transition step 2: card 1 out, card 2 in
      .to(cards[1], {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
      })
      .to(cards[2], {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut"
      }, "<")

      // Transition step 3: card 2 out, card 3 in
      .to(cards[2], {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
      })
      .to(cards[3], {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut"
      }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="projetos"
        ref={containerRef}
        className="w-full h-screen overflow-hidden bg-[radial-gradient(circle_at_center,rgba(0,18,36,0.15)_0%,rgba(0,0,0,1)_85%)] relative flex items-center justify-center"
      >
        {/* Editorial Left Sidebar */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 select-none pointer-events-none z-20 flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse"></div>
          <span
            className="font-mono text-[9px] sm:text-xs tracking-widest text-[#00A3FF] uppercase font-bold"
            style={{ writingMode: "vertical-rl" }}
          >
            ENGENHARIA DE SOLUÇÕES
          </span>
        </div>

        {/* Dynamic Scene Counter (Bottom Right) */}
        <div className="absolute bottom-12 right-12 z-20 font-mono text-sm tracking-widest text-[#00A3FF] font-bold select-none">
          {scene}
        </div>

        {/* Stack Container */}
        <div className="relative w-[85vw] h-[75vh] max-w-6xl max-h-[700px] flex items-center justify-center z-10">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.title}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              style={{ zIndex: (idx + 1) * 10 }}
              onClick={() => setSelectedProject(proj)}
              className="absolute inset-0 w-full h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col md:flex-row justify-between p-8 sm:p-12 md:p-16 gap-8 shadow-2xl transition-all duration-300 hover:border-[#00A3FF]/20 cursor-pointer select-none group"
            >
              {/* Left Column: Title & Metadata */}
              <div className="flex-1 flex flex-col justify-between h-full relative z-10">
                <div className="flex flex-col gap-2">
                  {/* Category Tag */}
                  <span className="font-mono text-[9px] sm:text-xs text-[#00A3FF] tracking-widest uppercase font-bold">
                    0{idx + 1} / {proj.type}
                  </span>
                  
                  {/* Title (Giant Serif Font) */}
                  <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight uppercase leading-none group-hover:text-[#00A3FF] transition-colors duration-300">
                    {proj.title}
                  </h3>

                  {/* Tech Stack List */}
                  <div className="font-mono text-[8px] sm:text-[10px] text-zinc-500 tracking-wider uppercase font-medium mt-2">
                    {proj.tags.join(" • ")}
                  </div>
                </div>

                {/* Description and CTA button */}
                <div className="flex flex-col gap-6 mt-4 md:mt-0">
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md">
                    {proj.desc}
                  </p>

                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse"></span>
                    <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest border border-white/10 group-hover:border-[#00A3FF]/30 px-3 py-1.5 rounded-md transition-all">
                      Ver Arquitetura & Fluxo
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Device / Graphic Interface */}
              <div className="w-full md:w-[45%] h-[200px] md:h-full relative rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 flex-shrink-0">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover filter brightness-[0.75] contrast-[1.05] group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                {/* Subtle gradient overlay to tie visual into the card */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/10 to-transparent"></div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
