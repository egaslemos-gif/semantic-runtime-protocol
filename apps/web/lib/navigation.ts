/** Central navigation configuration — 5 sections only */

export interface NavPage {
  slug: string;
  title: string;
  description?: string;
}

export interface NavSection {
  key: string;
  title: string;
  href: string;
  pages: NavPage[];
}

export const SECTIONS: NavSection[] = [
  {
    key: 'docs',
    title: 'Docs',
    href: '/docs',
    pages: [
      { slug: 'runtime-boundaries', title: 'Runtime Boundaries', description: 'Como SRP define e aplica limites arquiteturais em tempo de execução.' },
      { slug: 'traversal-engine', title: 'Traversal Engine', description: 'O motor de traversal determinístico que governa a navegação do agente.' },
      { slug: 'context-firewall', title: 'Context Firewall', description: 'Filtragem determinística de contexto antes que o agente receba informação.' },
      { slug: 'constraints', title: 'Constraints', description: 'Definição e aplicação de restrições de runtime.' },
      { slug: 'runtime-safety', title: 'Runtime Safety', description: 'Garantias de segurança arquitetural em tempo de execução.' },
      { slug: 'cli-usage', title: 'CLI Usage', description: 'Utilização do SRP via linha de comando.' },
      { slug: 'manifests', title: 'Manifests', description: 'Declaração de limites e permissões via manifests SRP.' },
      { slug: 'srql', title: 'SRQL', description: 'Semantic Runtime Query Language — linguagem de consulta do runtime.' },
      { slug: 'case-study-university', title: 'Case Study: University Scheduling', description: 'Sistema de agendamento universitário protegido por SRP.' },
    ],
  },
  {
    key: 'failure-modes',
    title: 'Failure Modes',
    href: '/failure-modes',
    pages: [
      { slug: 'prompt-drift', title: 'Prompt Drift', description: 'Quando o comportamento do agente diverge silenciosamente da intenção original.' },
      { slug: 'scope-leakage', title: 'Scope Leakage', description: 'Quando o agente acessa contexto fora do seu scope autorizado.' },
      { slug: 'context-explosion', title: 'Context Explosion', description: 'Quando o volume de contexto excede a capacidade de processamento do agente.' },
      { slug: 'architectural-drift', title: 'Architectural Drift', description: 'Quando o agente corrompe a arquitetura ao longo de múltiplas iterações.' },
    ],
  },
  {
    key: 'comparisons',
    title: 'Comparisons',
    href: '/comparisons',
    pages: [
      { slug: 'rag-vs-srp', title: 'RAG vs SRP', description: 'Retrieval-Augmented Generation resolve recuperação. SRP resolve governança.' },
      { slug: 'guardrails-vs-srp', title: 'Guardrails vs SRP', description: 'Guardrails filtram output. SRP filtra traversal.' },
      { slug: 'mcp-vs-srp', title: 'MCP vs SRP', description: 'Model Context Protocol conecta ferramentas. SRP governa o que o agente pode alcançar.' },
      { slug: 'harnesses-vs-srp', title: 'Harnesses vs SRP', description: 'Harnesses controlam execução. SRP controla scope arquitetural.' },
    ],
  },
  {
    key: 'foundations',
    title: 'Foundations',
    href: '/foundations',
    pages: [
      { slug: 'context', title: 'Context', description: 'A primitiva mais crítica em sistemas de IA — e por que precisa de governança.' },
      { slug: 'agents', title: 'AI Agents', description: 'Como agentes operam, onde falham, e por que precisam de runtime boundaries.' },
      { slug: 'retrieval', title: 'Retrieval', description: 'Como sistemas de recuperação funcionam e onde param de ser suficientes.' },
      { slug: 'runtime-boundaries', title: 'Runtime Boundaries', description: 'O conceito fundamental que conecta o ecossistema ao SRP.' },
    ],
  },
];

export function getSectionByKey(key: string): NavSection | undefined {
  return SECTIONS.find(s => s.key === key);
}

export function getPageInSection(sectionKey: string, slug: string): NavPage | undefined {
  const section = getSectionByKey(sectionKey);
  return section?.pages.find(p => p.slug === slug);
}
