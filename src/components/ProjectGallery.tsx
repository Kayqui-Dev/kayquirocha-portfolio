"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowUpRight, 
  Database, 
  Terminal, 
  Sparkles, 
  Code, 
  Cpu, 
  ShoppingBag, 
  Layers
} from "lucide-react";
import BackgroundContours from "./BackgroundContours";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetails {
  title: string;
  type: string;
  year: string;
  status: string;
  desc: string;
  longDesc: string;
  architecture: string[];
  dbFlow: string;
  features: string[];
  tags: string[];
  image: string;
  link: string;
  offsetClass: string;
}

const GALLERY_PROJECTS: ProjectDetails[] = [
  {
    title: "Centurion Scout",
    type: "Combate & Performance",
    year: "2025",
    status: "SISTEMA PROPRIETÁRIO",
    desc: "Plataforma avançada de scouting e análise de dados para atletas de esportes de combate, integrando base de dados tática e inteligência competitiva.",
    longDesc: "O Centurion Scout é uma plataforma inovadora criada na intersecção entre tecnologia de ponta e esportes de combate. Ele resolve o gargalo de análise tática subjetiva em artes marciais, trazendo dados objetivos e mapas visuais detalhados para treinadores, atletas olímpicos e lutadores profissionais estruturarem seus planos de luta.",
    architecture: [
      "Next.js (App Router) + TypeScript no frontend.",
      "Banco de dados relacional PostgreSQL.",
      "Backend-as-a-service moderno via Supabase.",
      "Row Level Security (RLS) para proteção de dados sensíveis."
    ],
    features: [
      "Gravação de mapas de calor (heatmaps) de quedas e pontuações no tatame.",
      "Dashboard dinâmico com métricas táticas de oponentes.",
      "Histórico de lesões e acompanhamento de corte de peso."
    ],
    dbFlow: "Supabase PostgreSQL -> Tabelas relacionais vinculando atletas, lutas e ações. Cada pontuação dispara uma inserção em tempo real que atualiza os heatmaps.",
    tags: ["nextjs", "supabase", "python", "tailwind"],
    image: "/centurion_scout.png",
    link: "https://www.centurionfight.shop/",
    offsetClass: "-translate-y-12"
  },
  {
    title: "Kodava Barber SaaS",
    type: "Production SaaS",
    year: "2024",
    status: "PRODUCTION SaaS",
    desc: "Sistema completo de agendamento, gestão financeira e retenção de clientes para barbearias modernas operando em modelo recorrente.",
    longDesc: "O Kodava Barber é uma plataforma SaaS multitenant projetada para modernizar a operação de barbearias e salões de beleza de alto padrão. Oferece gestão de assinaturas recorrentes, comissionamento automático de profissionais e inteligência de engajamento pós-venda.",
    architecture: [
      "Frontend em React / TypeScript.",
      "Backend construído com Node.js e Express.",
      "Integração de pagamentos recorrentes via Stripe API."
    ],
    features: [
      "Agendamento inteligente em tempo real.",
      "Módulo de gestão financeira com splits de pagamento.",
      "Notificações automáticas via WhatsApp de lembrete de horário."
    ],
    dbFlow: "React Frontend -> Node.js Backend API -> PostgreSQL Database. As transações recorrentes na Stripe disparam webhooks que atualizam o status das assinaturas de forma síncrona.",
    tags: ["typescript", "react", "nodejs"],
    image: "/store_acai.png",
    link: "https://v0-kodava-crm.vercel.app/",
    offsetClass: "translate-y-12"
  },
  {
    title: "Decide Aí Vida",
    type: "Decisão Autônoma",
    year: "2024",
    status: "AI CORE APPLICATION",
    desc: "Aplicativo inteligente de tomada de decisão que utiliza engenharia de prompt avançada para resolver dilemas complexos em tempo real.",
    longDesc: "O Decide Aí Vida é uma ferramenta de produtividade e análise cognitiva desenvolvida para combater a fadiga de escolha cotidiana. A aplicação utiliza modelos avançados de Inteligência Artificial para analisar cenários ponderando os prós, contras, riscos e potenciais recompensas das decisões.",
    architecture: [
      "Next.js no frontend.",
      "Modelos de IA da OpenAI e Gemini para geração cognitiva.",
      "Caching inteligente de sessões para performance."
    ],
    features: [
      "Análise assistida por IA para decisões complexas e rápidas.",
      "Ponderação automática de cenários com árvore de probabilidade.",
      "Interface minimalista e focada em redução de estresse cognitivo."
    ],
    dbFlow: "Next.js -> OpenAI API para avaliação estruturada. Os dados da decisão do usuário são processados e armazenados localmente.",
    tags: ["nextjs", "openai", "tailwind"],
    image: "/decide_ai_vida.png",
    link: "https://v0-kodava-crm.vercel.app/",
    offsetClass: "-translate-y-8"
  },
  {
    title: "VTP Systems",
    type: "Enterprise Work",
    year: "2024",
    status: "ENTERPRISE WORK",
    desc: "Desenvolvimento de aplicações web full-stack focadas na otimização de processos administrativos e performance de frotas industriais.",
    longDesc: "O VTP Systems consolida logs de operação, consumo e manutenção de frotas de transporte de larga escala. Ele traduz grandes volumes de dados de sensores industriais e GPS em insights gerenciais claros e tomadas de decisão rápidas.",
    architecture: [
      "Frontend administrativo otimizado.",
      "Backend robusto utilizando PHP corporativo.",
      "Banco de dados relacional MySQL otimizado para leitura intensiva."
    ],
    features: [
      "Rastreamento e status operacional de frotas industriais em tempo real.",
      "Geração automatizada de ordens de serviço e manutenção preditiva.",
      "Controle de acesso granular baseado em papéis (RBAC)."
    ],
    dbFlow: "Frontend Admin -> PHP API -> MySQL. Logs industriais e dados telemétricos são inseridos em lotes estruturados, indexados por data e ID de veículo.",
    tags: ["javascript", "php", "mysql"],
    image: "/vtpsystem_scraped.png",
    link: "https://vtpsystem.com.br/login.php",
    offsetClass: "translate-y-8"
  },
  {
    title: "Emporio Glass",
    type: "Arquitetura & E-commerce",
    year: "2025",
    status: "PRODUÇÃO",
    desc: "Vitrine digital e e-commerce premium com cálculo dinâmico de metros quadrados para vidraçarias e estúdios de arquitetura.",
    longDesc: "O Emporio Glass é uma vitrine e e-commerce avançado para vidraçarias e estúdios de arquitetura. O sistema calcula preços dinâmicos com base em dimensões fornecidas pelo usuário em tempo real.",
    architecture: [
      "Next.js (App Router) + TypeScript.",
      "Node.js com Express.",
      "MySQL para controle de precificação."
    ],
    features: [
      "Calculadora dinâmica de metros quadrados e lapidação.",
      "Galeria interativa de projetos executados.",
      "Sistema de orçamentos instantâneo."
    ],
    dbFlow: "Next.js -> Express API -> MySQL. A calculadora lê as tabelas de insumos e taxas do banco para calcular o preço final com precisão.",
    tags: ["nextjs", "typescript", "nodejs", "mysql"],
    image: "/emporioglass_scraped.png",
    link: "https://emporioglass.com/",
    offsetClass: "-translate-y-12"
  },
  {
    title: "Love Kodava Shop",
    type: "Production SaaS",
    year: "2024",
    status: "PRODUCTION SaaS",
    desc: "Plataforma de presentes digitais interativos para casais com retrospectivas animadas, linhas do tempo e cartões personalizados.",
    longDesc: "Love Kodava Shop é um aplicativo de relacionamento privado desenhado para casais. Foca no compartilhamento de metas, linha do tempo de momentos especiais e envio de mimos digitais.",
    architecture: [
      "Next.js e Framer Motion para animações no frontend.",
      "Supabase Backend.",
      "Push Notifications via OneSignal."
    ],
    features: [
      "Mural compartilhado criptografado.",
      "Notificações diárias de memórias.",
      "Co-planejamento de viagens e metas."
    ],
    dbFlow: "Next.js -> Supabase Postgres. Toda mensagem e foto inserida é sincronizada com criptografia em trânsito e ponta a ponta.",
    tags: ["nextjs", "supabase", "tailwind"],
    image: "/lovekodavashop_scraped.png",
    link: "https://www.love-kodava.shop/",
    offsetClass: "translate-y-12"
  },
  {
    title: "Centurion Fight Shop",
    type: "E-commerce & Analytics",
    year: "2025",
    status: "E-COMMERCE & ANALYTICS",
    desc: "E-commerce de alta performance integrado ao Shopify para produtos de luta e repasse financeiro de atletas.",
    longDesc: "O Centurion Fight Shop é um ecossistema digital que combina uma experiência de venda de alta performance para produtos de luta com um painel administrativo integrado. Ele conecta a receita da loja ao suporte de atletas patrocinados, controlando comissões, vendas e dados de filiação de forma unificada.",
    architecture: [
      "Next.js no frontend para carregamento ultra-rápido.",
      "Integração via Shopify Admin API e Storefront API.",
      "Painel de controle administrativo customizado."
    ],
    features: [
      "Carregamento instantâneo de produtos via Server-Side Rendering (SSR).",
      "Checkout seguro integrado diretamente ao gateway de pagamentos.",
      "Controle de repasse financeiro e comissões para atletas."
    ],
    dbFlow: "Next.js Frontend -> Shopify Storefront API & Node.js Backend -> PostgreSQL. Os webhooks de venda do Shopify batem na nossa API, que atualiza a carteira digital do atleta associado.",
    tags: ["nextjs", "nodejs", "shopify"],
    image: "/centurionfight_scraped.png",
    link: "https://www.centurionfight.shop/",
    offsetClass: "-translate-y-8"
  },
  {
    title: "Kodava CRM",
    type: "SaaS Platform",
    year: "2024",
    status: "SaaS PLATFORM",
    desc: "CRM inteligente de gestão de leads e projetos com assistente de qualificação autônomo baseado em IA.",
    longDesc: "O Kodava CRM é o hub administrativo interno da Kodava Solutions. Centraliza a prospecção de clientes, controle de contratos e projetos ativos, com IA integrada para responder dúvidas básicas de leads.",
    architecture: [
      "Next.js no frontend.",
      "Supabase no banco de dados e autenticação.",
      "Modelos de IA da OpenAI para triagem autônoma de mensagens."
    ],
    features: [
      "Pipeline de vendas estilo Kanban integrado.",
      "Qualificação automática de leads via chatbot WhatsApp.",
      "Painel financeiro de faturamento e custos de nuvem."
    ],
    dbFlow: "Next.js -> Supabase Realtime Database. As interações do chatbot inserem novos leads na fila de atendimento e notificam os gerentes em tempo real.",
    tags: ["nextjs", "supabase", "openai"],
    image: "/kodavacrm_scraped.png",
    link: "https://v0-kodava-crm.vercel.app/",
    offsetClass: "translate-y-8"
  },
  {
    title: "Esporte NTG",
    type: "Portal de Performance",
    year: "2025",
    status: "PRODUCTION PORTAL",
    desc: "Portal oficial do National Training Group para gerenciamento físico, acompanhamento nutricional e ranking de Wrestling.",
    longDesc: "O Esporte NTG é o portal oficial dos atletas e comissão técnica do National Training Group. Centraliza estatísticas, treinos, planejamento nutricional e posições de ranking de atletas federados de Wrestling.",
    architecture: [
      "Next.js no frontend.",
      "Tailwind CSS para styling responsivo.",
      "Node.js no backend com banco relacional PostgreSQL."
    ],
    features: [
      "Visualização do ranking geral de atletas do NTG.",
      "Diário de treinos e controle de lesões.",
      "Gráficos de evolução física individuais."
    ],
    dbFlow: "Next.js -> Node.js REST API -> PostgreSQL. As informações de campeonatos e pesagem são inseridas pela comissão técnica e geram o ranking dinâmico em tempo real.",
    tags: ["nextjs", "tailwind", "postgresql"],
    image: "/esportentg.png",
    link: "https://esportentg.com.br/",
    offsetClass: "-translate-y-12"
  }
];

function TechIcon({ name }: { name: string }) {
  const iconClass = "w-4 h-4 text-zinc-500 group-hover/card:text-[#00A3FF] transition-colors duration-300";
  switch (name.toLowerCase()) {
    case "nextjs":
    case "react":
      return (
        <span title="Next.js / React">
          <Code className={iconClass} />
        </span>
      );
    case "supabase":
    case "postgresql":
    case "mysql":
      return (
        <span title="Database (SQL / Supabase)">
          <Database className={iconClass} />
        </span>
      );
    case "python":
      return (
        <span title="Python">
          <Terminal className={iconClass} />
        </span>
      );
    case "tailwind":
      return (
        <span title="Tailwind CSS">
          <Layers className={iconClass} />
        </span>
      );
    case "openai":
    case "ai":
      return (
        <span title="AI Models (OpenAI / Gemini)">
          <Sparkles className={iconClass} />
        </span>
      );
    case "typescript":
    case "javascript":
    case "nodejs":
      return (
        <span title="TypeScript / Node.js">
          <Cpu className={iconClass} />
        </span>
      );
    case "shopify":
      return (
        <span title="Shopify Storefront API">
          <ShoppingBag className={iconClass} />
        </span>
      );
    default:
      return (
        <span title={name}>
          <Cpu className={iconClass} />
        </span>
      );
  }
}

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const tray = trayRef.current;
    const container = containerRef.current;
    if (!container || !tray || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${tray.scrollWidth - window.innerWidth}`,
          scrub: 1, // Synced with Lenis
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Horizontal translation of the tray
      tl.to(tray, {
        x: () => -(tray.scrollWidth - window.innerWidth),
        ease: "none",
      });

      // Staggered fade and pop-up animation for cards
      tl.fromTo(
        cards,
        {
          scale: 0.85,
          opacity: 0,
          y: 45,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: "power2.out" as const,
        },
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="project-gallery"
        ref={containerRef}
        className="relative w-full h-screen bg-[#E3E2DC] flex flex-col justify-between py-16 overflow-hidden select-none border-t border-black/5"
      >
        {/* Premium Topographic Contour Lines Background */}
        <BackgroundContours light={true} />

        {/* Top Section Tag */}
        <div className="w-full px-6 sm:px-12 md:px-24 flex justify-between items-start z-30 pointer-events-none">
          <div className="flex flex-col gap-2">
            <span className="section-tag text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
              01 / Galeria de Projetos
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-[#1C1C1C] uppercase font-sans">
              GALERIA DE PROJETOS
            </h2>
            <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
          </div>
        </div>

        {/* Center Section: Staggered Collage Tray */}
        <div className="relative flex-1 w-full h-[70vh] flex items-center overflow-visible">
          <div
            ref={trayRef}
            className="flex flex-nowrap h-full items-center pl-[10vw] pr-[20vw] gap-[8vw]"
            style={{ width: "max-content" }}
          >
            {GALLERY_PROJECTS.map((proj, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className={`w-[260px] md:w-[320px] flex-shrink-0 flex flex-col gap-3 group select-none ${proj.offsetClass}`}
              >
                {/* Metadata ABOVE the card */}
                <div className="flex justify-between items-center w-full text-[10px] font-mono text-zinc-600 font-bold uppercase tracking-wider px-1">
                  <span className="text-[#00A3FF]">{proj.status}</span>
                  <span className="px-1.5 py-0.5 rounded-sm bg-black/5 border border-black/5 text-[9px] text-zinc-500">
                    {proj.year}
                  </span>
                </div>

                {/* Card Image */}
                <div
                  onClick={() => setSelectedProject(proj)}
                  className="w-full h-[320px] md:h-[400px] relative rounded-2xl overflow-hidden border border-black/8 bg-[#CFCFCA] shadow-[0_15px_35px_rgba(0,0,0,0.06)] cursor-pointer group-hover:border-[#00A3FF]/40 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,163,255,0.08)]"
                >
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 260px, 320px"
                    className="object-cover filter brightness-[0.9] contrast-[1.02] group-hover:scale-102 transition-all duration-700 ease-out"
                  />
                </div>

                {/* Title and Footer BELOW the card */}
                <div className="flex flex-col gap-2 px-1">
                  <h4 className="text-xl md:text-2xl font-serif text-[#1C1C1C] uppercase font-bold leading-tight group-hover:text-[#00A3FF] transition-colors duration-300">
                    {proj.title}
                  </h4>
                  
                  {/* Hover Icons & Links */}
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex gap-2">
                      {proj.tags.map((tag) => (
                        <TechIcon key={tag} name={tag} />
                      ))}
                    </div>
                    
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-6 h-6 rounded-full border border-zinc-300 hover:border-[#00A3FF] hover:bg-[#00A3FF]/5 flex items-center justify-center text-zinc-400 hover:text-[#00A3FF] transition-all duration-300"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Staggered Quote & Signature at the end (Lando Norris style) */}
            <div className="w-[320px] sm:w-[420px] flex-shrink-0 flex flex-col gap-6 p-6 sm:p-8 translate-y-4">
              <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#1C1C1C] leading-relaxed uppercase">
                "Desde a primeira linha de código, dedico cada segundo a projetar arquiteturas implacáveis que redefinem o jogo."
              </p>
              {/* Signature SVG (Dark Ink) */}
              <div className="text-[#1C1C1C] select-none">
                <svg
                  viewBox="0 0 200 80"
                  className="w-40 h-16 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
                  stroke="#1C1C1C"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 50 Q45 25 70 30 T120 40 T150 20 T180 50" />
                  <path d="M50 20 C60 10, 80 15, 75 45 C70 65, 45 60, 65 30 C85 0, 115 10, 105 40 T145 60" />
                  <path d="M125 45 L155 45" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Footer line details (Light Theme) */}
        <div className="w-full px-6 sm:px-12 md:px-24 flex justify-between items-end select-none text-[8px] font-mono text-zinc-500 uppercase tracking-widest z-30">
          {/* Lando Norris style bottom-left checkered flag badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/5 bg-black/[0.02] shadow-[0_2px_5px_rgba(0,0,0,0.02)]">
            <span className="font-sans font-black text-[#1C1C1C] text-[10px]">1</span>
            <svg
              className="w-3 h-3 text-[#1C1C1C]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 22h2v-6H2v6zm4-12h2v6H6v-6zm4-4h2v10h-2V6zm4 6h2v4h-2v-4zm4-8h2v12h-2V4zm-16 6h2v2H2v-2zm12-4h2v2h-2V6zm-8 6h2v2H6v-2zm4-6h2v2h-2V6zm8 6h2v2h-2v-2zm-12 2h2v2H8v-2zm8-6h2v2h-2V8zm-4 6h2v2h-2v-2z" />
            </svg>
          </div>
          <span>© 2026</span>
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
