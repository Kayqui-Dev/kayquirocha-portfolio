"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
  colSpan: string;
}

const BENTO_PROJECTS: ProjectDetails[] = [
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
    colSpan: "lg:col-span-2"
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
    colSpan: "lg:col-span-1"
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
    colSpan: "lg:col-span-1"
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
    colSpan: "lg:col-span-1"
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
    colSpan: "lg:col-span-2"
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
    colSpan: "lg:col-span-1"
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
    colSpan: "lg:col-span-1"
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
    colSpan: "lg:col-span-1"
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
    colSpan: "lg:col-span-2"
  }
];

function TechIcon({ name }: { name: string }) {
  const iconClass = "w-4 h-4 text-zinc-400 group-hover/card:text-[#00A3FF] transition-colors duration-300";
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

function TiltCard({ 
  project, 
  onClick,
  colSpan 
}: { 
  project: ProjectDetails; 
  onClick: () => void;
  colSpan: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-200, 200], [8, -8]);
  const rotateY = useTransform(x, [-200, 200], [-8, 8]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.015,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`group/card relative bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#00A3FF]/40 transition-all duration-500 cursor-pointer ${colSpan}`}
    >
      {/* 3D Floating elements */}
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col gap-4 h-full">
        {/* Top bar: Badge & Metadata */}
        <div className="flex justify-between items-center select-none">
          <span className="text-[9px] font-mono tracking-widest text-[#00A3FF] uppercase font-black bg-[#00A3FF]/5 border border-[#00A3FF]/15 px-2.5 py-1 rounded-md">
            {project.status}
          </span>
          <span className="text-[10px] font-mono text-zinc-400 font-bold">
            {project.year}
          </span>
        </div>

        {/* Project Image screenshot */}
        <div className="w-full aspect-[16/9] relative rounded-xl overflow-hidden border border-zinc-100 bg-zinc-50 shadow-inner">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-cover filter brightness-[0.96] contrast-[1.01] group-hover/card:scale-103 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Text information */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 group-hover/card:text-[#00A3FF] transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-zinc-500 text-xs md:text-sm mt-2 leading-relaxed font-sans">
              {project.desc}
            </p>
          </div>

          {/* Technology divider and icons row */}
          <div>
            <div className="w-full h-[1px] bg-zinc-100 my-4"></div>
            <div className="flex justify-between items-center">
              {/* Tech Stack List */}
              <div className="flex gap-2">
                {project.tags.map((tag) => (
                  <TechIcon key={tag} name={tag} />
                ))}
              </div>

              {/* Redirect link button */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation(); // Avoid opening the modal when clicking the link
                }}
                className="w-8 h-8 rounded-full border border-zinc-200 hover:border-[#00A3FF] hover:bg-[#00A3FF]/5 flex items-center justify-center text-zinc-400 hover:text-[#00A3FF] transition-all duration-300"
              >
                <ArrowUpRight className="w-4 h-4 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <>
      <section
        id="project-gallery"
        className="relative w-full bg-[#E3E2DC] py-24 sm:py-32 select-none border-t border-black/5"
      >
        {/* Premium Topographic Contour Lines Background */}
        <BackgroundContours light={true} />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col gap-12 relative z-10">
          {/* Top Section Tag */}
          <div className="flex flex-col gap-2">
            <span className="section-tag text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
              01 / Galeria de Projetos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-[#1C1C1C] uppercase font-sans">
              GALERIA DE PROJETOS
            </h2>
            <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
          </div>

          {/* Asymmetric Bento Grid using Framer Motion */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8"
          >
            {BENTO_PROJECTS.map((proj, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={proj.colSpan}
              >
                <TiltCard
                  project={proj}
                  onClick={() => setSelectedProject(proj)}
                  colSpan={proj.colSpan}
                />
              </motion.div>
            ))}
          </motion.div>
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
