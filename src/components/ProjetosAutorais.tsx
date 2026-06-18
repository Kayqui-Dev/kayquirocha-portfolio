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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Calculate scroll width dynamically
      const scrollWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      const totalScroll = scrollWidth - windowWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="projetos"
        ref={containerRef}
        className="w-full h-screen overflow-hidden bg-black relative flex items-center"
      >
        {/* Fixed Title Header */}
        <div className="absolute top-12 left-6 sm:left-12 md:left-24 z-20 flex flex-col gap-2 select-none pointer-events-none">
          <span className="section-tag text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
            04 / Projetos Autorais
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white uppercase font-sans">
            PROJETOS AUTORAIS
          </h2>
          <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
          <p className="text-zinc-500 text-[10px] tracking-wider uppercase font-mono max-w-md mt-2 leading-relaxed hidden sm:block">
            Mova o scroll para navegar horizontalmente. Clique no card para ver a arquitetura técnica detalhada e o fluxo de dados.
          </p>
        </div>

        {/* Pinned Horizontal Track */}
        <div
          ref={trackRef}
          className="flex flex-nowrap h-full items-center pt-[20vh] pb-[5vh] px-[10vw] gap-[6vw]"
          style={{ width: "max-content" }}
        >
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.title}
              onClick={() => setSelectedProject(proj)}
              className="relative w-[80vw] md:w-[75vw] xl:w-[70vw] h-[65vh] flex-shrink-0 rounded-2xl overflow-hidden bg-[rgba(10,12,16,0.35)] border border-white/5 hover:border-[#00A3FF]/20 hover:shadow-[0_20px_50px_rgba(0,163,255,0.12)] transition-all duration-500 cursor-pointer select-none group flex flex-col justify-end p-6 sm:p-12 md:p-16"
            >
              {/* Background Image of the project */}
              <div className="absolute inset-0 w-full h-full -z-10 bg-zinc-950">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 1024px) 80vw, 70vw"
                  className="object-cover filter brightness-[0.7] contrast-[1.05] group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              </div>

              {/* Floating Glassmorphic Panel */}
              <div className="relative max-w-lg p-6 sm:p-8 rounded-xl bg-black/45 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-4 z-10 transition-all duration-300 group-hover:border-[#00A3FF]/30">
                {/* Tech Stack (Monospace small font with spacing) */}
                <span className="font-mono text-[9px] sm:text-xs text-[#00A3FF] tracking-widest uppercase font-bold">
                  {proj.tags.join(" • ")}
                </span>

                {/* Title (Giant Serif font) */}
                <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase leading-none group-hover:text-[#00A3FF] transition-colors duration-300">
                  {proj.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-[11px] sm:text-xs text-zinc-300 leading-relaxed">
                  {proj.desc}
                </p>

                {/* Action Detail Row */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/10 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse"></span>
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
                    Ver Especificação Técnica & Fluxo de Dados
                  </span>
                </div>
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
