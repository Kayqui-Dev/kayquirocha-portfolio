"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundContours from "./BackgroundContours";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetails {
  title: string;
  type: string;
  year: string;
  desc: string;
  longDesc: string;
  architecture: string[];
  dbFlow: string;
  features: string[];
  tags: string[];
  image: string;
  offsetClass: string;
}

const GALLERY_PROJECTS: ProjectDetails[] = [
  {
    title: "Centurion Scout",
    type: "Combate & Performance",
    year: "2025",
    desc: "Sistema especializado de scouting tático e base de dados preditiva para treinadores e atletas de Wrestling/MMA.",
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
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    image: "/centurion_scout.png",
    offsetClass: "-translate-y-12"
  },
  {
    title: "Decide Aí Vida",
    type: "Decisão Autônoma",
    year: "2024",
    desc: "Rede de decisão autônoma alimentada por LLMs locais seguros para reduzir a fadiga de escolha.",
    longDesc: "O Decide Aí Vida é uma ferramenta de produtividade e análise cognitiva desenvolvida para combater a fadiga de escolha cotidiana. A aplicação utiliza modelos avançados de Inteligência Artificial para analisar cenários ponderando os prós, contras, riscos e potenciais recompensas das decisões.",
    architecture: [
      "Frontend multiplataforma em React Native.",
      "API de processamento rápido utilizando Python (FastAPI).",
      "Modelos de IA da OpenAI e Gemini para geração cognitiva."
    ],
    features: [
      "Análise assistida por IA para decisões complexas e rápidas.",
      "Ponderação automática de cenários com árvore de probabilidade.",
      "Histórico criptografado de decisões."
    ],
    dbFlow: "React Native -> API Gateway (FastAPI) -> OpenAI/Gemini API para avaliação estruturada. Os dados da decisão do usuário são processados e armazenados localmente.",
    tags: ["React Native", "Python", "AI APIs", "FastAPI"],
    image: "/decide_ai_vida.png",
    offsetClass: "translate-y-12"
  },
  {
    title: "Centurion Fight Shop",
    type: "E-commerce & Analytics",
    year: "2025",
    desc: "E-commerce completo e sistema interno para cadastro, indexação de lutas e gestão financeira de atletas.",
    longDesc: "O Centurion Fight Shop é um ecossistema digital que combina uma experiência de venda de alta performance para produtos de luta com um painel administrativo integrado. Ele conecta a receita da loja ao suporte de atletas patrocinados, controlando comissões, vendas e dados de filiação de forma unificada.",
    architecture: [
      "Next.js no frontend para carregamento ultra-rápido e SEO.",
      "Integração via Shopify Admin API e Storefront API.",
      "Painel de controle administrativo customizado."
    ],
    features: [
      "Carregamento instantâneo de produtos via Server-Side Rendering (SSR).",
      "Checkout seguro integrado diretamente ao gateway de pagamentos.",
      "Controle de repasse financeiro e comissões para atletas."
    ],
    dbFlow: "Next.js Frontend -> Shopify Storefront API & Node.js Backend -> PostgreSQL. Os webhooks de venda do Shopify batem na nossa API, que atualiza a carteira digital do atleta associado.",
    tags: ["Next.js", "Shopify API", "TypeScript", "Node.js", "Tailwind CSS"],
    image: "/centurion_fight_shop.png",
    offsetClass: "-translate-y-8"
  },
  {
    title: "VTPDirect Dashboard",
    type: "Painel Operacional",
    year: "2024",
    desc: "Painel administrativo criptografado para indexação de dados e análise operacional de frotas industriais.",
    longDesc: "O VTPDirect Dashboard é um sistema de nível empresarial projetado para consolidar logs de operação, consumo e manutenção de frotas de transporte de larga escala. Ele traduz grandes volumes de dados de sensores industriais e GPS em insights gerenciais claros.",
    architecture: [
      "Frontend administrativo otimizado.",
      "API robusta em Express/Node.js.",
      "Banco de dados relacional MySQL otimizado para leitura intensiva.",
      "Criptografia de dados ponta a ponta (AES-256)."
    ],
    features: [
      "Rastreamento e status operacional de frotas em tempo real.",
      "Geração automatizada de ordens de serviço e manutenção preditiva.",
      "Gráficos interativos de performance de combustível e emissões."
    ],
    dbFlow: "Painel Administrativo -> Express.js API -> MySQL Database. Logs industriais e dados telemétricos são inseridos em lotes estruturados, indexados por data e ID de veículo.",
    tags: ["MySQL", "Node.js", "Express", "React", "Admin Panel"],
    image: "/vtpdirect_dashboard.png",
    offsetClass: "translate-y-8"
  },
  {
    title: "Esporte NTG",
    type: "Portal de Performance",
    year: "2025",
    desc: "Portal oficial de acompanhamento físico e ranking dos atletas do National Training Group.",
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
    tags: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "/esportentg.png",
    offsetClass: "-translate-y-12"
  },
  {
    title: "Capril Sparta",
    type: "Agronegócio & Design",
    year: "2024",
    desc: "Site institucional e catálogo premium de produtos agropecuários gourmet.",
    longDesc: "O Capril Sparta é uma plataforma institucional que apresenta o catálogo gourmet e a história do capril premium Sparta. Unindo estética premium minimalista com a venda direta de produtos exclusivos.",
    architecture: [
      "React + Next.js.",
      "CSS Modules para layout editorial.",
      "Supabase para contatos e leads."
    ],
    features: [
      "Catálogo digital de queijos e derivados finos.",
      "Área de agendamento de visitas guiadas.",
      "Formulário de pedidos integrado com WhatsApp."
    ],
    dbFlow: "React Component -> Supabase Client -> WhatsApp API. O fluxo armazena o lead e a intenção de compra no banco de dados e abre uma conexão direta com o comercial.",
    tags: ["Next.js", "Supabase", "React", "Tailwind CSS"],
    image: "/caprilsparta.png",
    offsetClass: "translate-y-12"
  },
  {
    title: "Emporio Glass",
    type: "Arquitetura & E-commerce",
    year: "2025",
    desc: "E-commerce de espelhos e vidros sob medida de alto padrão.",
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
    tags: ["Next.js", "Node.js", "MySQL", "TypeScript"],
    image: "/emporioglass.png",
    offsetClass: "-translate-y-8"
  },
  {
    title: "Açai Puro Landing",
    type: "Alimentação & Marketing",
    year: "2024",
    desc: "Landing page institucional de conversão rápida e posicionamento de marca.",
    longDesc: "Açai Puro Landing é uma landing page de alta conversão projetada para franquias de açaí orgânico. Desenvolvida focando em Web Vitals excelentes para tráfego pago.",
    architecture: [
      "React Frontend.",
      "Tailwind CSS.",
      "Framer Motion para transições fluidas."
    ],
    features: [
      "Apresentação visual interativa dos produtos.",
      "Localizador de lojas por geolocalização.",
      "Integração direta com hub de franquias."
    ],
    dbFlow: "Landing Page -> Google Analytics / Webhooks de Lead. Cada clique de captação de lead envia os dados diretamente ao comercial.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    image: "/hero_acai.png",
    offsetClass: "translate-y-8"
  },
  {
    title: "Açai Puro Store",
    type: "Alimentação & E-commerce",
    year: "2024",
    desc: "E-commerce completo e otimizado para pedidos online de açaí e adicionais.",
    longDesc: "O Açai Puro Store é a plataforma de delivery própria da marca. Permite a customização total do copo de açaí, controlando opcionais, tamanhos e limites dinâmicos por pedido.",
    architecture: [
      "Next.js.",
      "Supabase (Database & Auth).",
      "Integração com gateway de pagamento Pagar.me."
    ],
    features: [
      "Montador interativo de copo 2D.",
      "Gestão de cupons de desconto por horários.",
      "Acompanhamento do status do pedido em tempo real."
    ],
    dbFlow: "Next.js -> Supabase Realtime Database. Quando o pedido entra, a cozinha recebe um alerta em tempo real e muda o status que é lido instantaneamente pelo cliente.",
    tags: ["Next.js", "Supabase", "Pagar.me API", "Tailwind CSS"],
    image: "/store_acai.png",
    offsetClass: "-translate-y-12"
  },
  {
    title: "Açai Puro Self-Service",
    type: "Sistemas & Automação",
    year: "2024",
    desc: "Totem de autoatendimento para lojas físicas integrada à cozinha.",
    longDesc: "O Açai Puro Self-Service é uma aplicação para totens de autoatendimento físicos. Simplifica a montagem do pedido na loja física, otimizando o fluxo de caixa e reduzindo filas.",
    architecture: [
      "React rodando em Electron (Totem).",
      "Local Storage cache.",
      "Websockets para comunicação interna."
    ],
    features: [
      "Interface touch-friendly otimizada.",
      "Impressão térmica automática de fichas.",
      "Chamada de senhas por monitor de cozinha."
    ],
    dbFlow: "Electron App -> Websocket Server -> Monitor da Cozinha. O pedido é enviado diretamente à impressora térmica local e ao display da linha de montagem física.",
    tags: ["React", "Electron", "Websockets", "Node.js"],
    image: "/selfservice_acai.png",
    offsetClass: "translate-y-12"
  },
  {
    title: "Love Kodava App",
    type: "Rede Social & Conexões",
    year: "2024",
    desc: "Aplicativo social privado para conexões afetivas e compartilhamento de memórias.",
    longDesc: "Love Kodava App é um aplicativo de relacionamento privado desenhado para casais. Foca no compartilhamento de metas, linha do tempo de momentos especiais e envio de mimos digitais.",
    architecture: [
      "React Native para iOS e Android.",
      "Supabase Backend.",
      "Push Notifications via OneSignal."
    ],
    features: [
      "Mural compartilhado criptografado.",
      "Notificações diárias de memórias.",
      "Co-planejamento de viagens e metas."
    ],
    dbFlow: "React Native -> Supabase Postgres (RLS habilitada por casal). Toda mensagem e foto inserida é sincronizada com criptografia em trânsito e ponta a ponta.",
    tags: ["React Native", "Supabase", "OneSignal", "PostgreSQL"],
    image: "/love_kodava_home.png",
    offsetClass: "-translate-y-8"
  },
  {
    title: "Love Kodava Proposal",
    type: "Customização & Interface",
    year: "2024",
    desc: "Mini-aplicação interativa e animada para pedidos e momentos especiais.",
    longDesc: "Love Kodava Proposal é uma experiência web interativa criada para momentos de grande impacto emocional. Utiliza animações cinemáticas e questionários gamificados personalizados.",
    architecture: [
      "React (Single Page Application).",
      "Framer Motion para micro-animações.",
      "Confetti Canvas Effects."
    ],
    features: [
      "Árvore de escolhas animada.",
      "Geração de cartão de recordação digital.",
      "Trilha sonora sincronizada via Web Audio API."
    ],
    dbFlow: "React Client -> Firebase Realtime DB. A resposta final do pedido do usuário é salva instantaneamente e gera uma notificação via webhook Telegram/Discord.",
    tags: ["React", "Framer Motion", "Web Audio API", "Tailwind CSS"],
    image: "/love_kodava_proposal.png",
    offsetClass: "translate-y-8"
  },
  {
    title: "Love Kodava Customize",
    type: "Interações de Usuário",
    year: "2024",
    desc: "Editor visual customizável para cartões digitais e recordações de casais.",
    longDesc: "Love Kodava Customize é o módulo de personalização do app. Ele permite criar cartões, layouts de fotos e paletas de cores customizadas usando ferramentas de canvas interativo.",
    architecture: [
      "HTML5 Canvas API.",
      "React.",
      "Supabase Storage para upload de assets."
    ],
    features: [
      "Editor drag-and-drop de elementos gráficos.",
      "Aplicação de filtros de foto estilo vintage.",
      "Exportação para PNG de alta definição."
    ],
    dbFlow: "React Canvas -> Upload Supabase Storage -> Link salvo no PostgreSQL. As coordenadas dos elementos gráficos criados são salvas em formato JSON no banco.",
    tags: ["React", "HTML5 Canvas", "Supabase Storage", "TypeScript"],
    image: "/love_kodava_customize.png",
    offsetClass: "-translate-y-12"
  },
  {
    title: "Love Kodava Gift",
    type: "Social & Entregas",
    year: "2024",
    desc: "Agendamento e envio de presentes surpresa integrados ao aplicativo.",
    longDesc: "Love Kodava Gift é o módulo de mimos físicos do ecossistema. Permite agendar a entrega física de presentes e flores, rastreando a entrega no mapa em tempo real.",
    architecture: [
      "React Native.",
      "API de Geolocalização da Google Maps.",
      "n8n para webhook de logística."
    ],
    features: [
      "Agendamento de presentes físicos.",
      "Rastreio em tempo real do entregador.",
      "Integração direta com floriculturas parceiras."
    ],
    dbFlow: "App -> Supabase DB -> Disparo de Webhook para n8n -> Integração com API Lalamove. A logística envia atualizações de geolocalização ao Supabase, retransmitidas via Websocket ao usuário.",
    tags: ["React Native", "n8n", "Google Maps API", "Logística"],
    image: "/love_kodava_gift.png",
    offsetClass: "translate-y-12"
  }
];

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
          ease: "power2.out",
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
        {/* Premium Topographic Contour Lines Background (Light Theme) */}
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
                className={`w-[260px] md:w-[320px] flex-shrink-0 flex flex-col gap-3 group select-none opacity-0 ${proj.offsetClass}`}
              >
                {/* Metadata ABOVE the card */}
                <div className="flex justify-between items-center w-full text-[10px] font-mono text-zinc-600 font-bold uppercase tracking-wider px-1">
                  <span>{proj.type}</span>
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

                {/* Title BELOW the card */}
                <h4 className="text-xl md:text-2xl font-serif text-[#1C1C1C] uppercase font-bold leading-tight px-1 group-hover:text-[#00A3FF] transition-colors duration-300">
                  {proj.title}
                </h4>
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
