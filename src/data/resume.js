export const personalInfo = {
  name: 'Guilherme Miranda',
  nameItalic: 'Miranda.',
  title: 'Orquestrador de IA',
  tagline: 'Construo a infraestrutura de IA que sua empresa ainda não tem, mas precisa.',
  bio: '28 anos, formado em Educação Física, aprendi que resultado vem de método, consistência e adaptação. Hoje aplico exatamente isso na construção de sistemas com IA. Cada projeto é um protocolo. Cada agente é um processo otimizado para performar no limite.',
  bio2: 'A obsessão é sempre a mesma: como fazer mais com menos esforço? A IA é só a ferramenta mais poderosa que encontrei para responder isso.',
  location: 'Brasília, DF',
  email: 'guibiemiranda@hotmail.com',
  phone: '(61) 99929-2339',
  whatsapp: 'https://wa.me/5561992923339',
  linkedin: 'https://www.linkedin.com/in/guibiemiranda',
  avatar: '/avatar.jpg',
  tags: ['Claude Code', 'Agentes de IA', 'Automação', 'React', 'ChatGPT', 'Gemini', 'Manychat', 'n8n', 'API', 'Lovable', 'Airtable'],
}

export const stats = [
  { value: '2+', label: 'Anos operando IA' },
  { value: '24h', label: 'Agentes trabalhando' },
  { value: 'Top 1%', label: 'Early adopters de Claude Code no Brasil' },
  { value: '∞', label: 'Possibilidades com IA' },
]

export const manifesto = [
  {
    id: '01',
    label: 'O que eu faço',
    title: 'Quem já opera com IA não fica esperando — age.',
    description: 'Existe uma diferença entre quem fala de IA e quem coloca IA pra trabalhar. Eu construo ferramentas reais que resolvem problemas reais de negócio.',
  },
  {
    id: '02',
    label: 'Minha missão',
    title: 'Transformar ideias em sistemas em dias, não em meses.',
    description: 'Com Claude Code, React e as ferramentas certas, entrego dashboards, agentes, automações e sistemas completos com velocidade que o mercado não espera.',
  },
  {
    id: '03',
    label: 'Por que eu faço',
    title: 'Seu time não precisa fazer tarefas repetitivas à mão.',
    description: 'Processos manuais custam tempo, dinheiro e energia. Eu mapeio o que pode ser automatizado e entrego a solução funcionando.',
  },
  {
    id: '04',
    label: 'O resultado',
    title: 'Suas ideias viram sistemas. Seus dados viram decisões.',
    description: 'Sites, dashboards, gestão de estoque, automação de atendimento, agentes 24h — tudo usando IA e as ferramentas certas para o seu negócio.',
  },
]

export const experience = [
  {
    id: 1,
    label: 'ATUAL',
    company: 'Grupo Shape Insano',
    role: 'Treinador & Orquestrador de Ferramentas IA',
    period: 'Abr. 2026 – Presente',
    description: 'Prescrição de protocolos de treino personalizados via anamnese completa. Desenvolvimento de ferramentas internas com Claude Code para otimizar operações da empresa.',
    tags: ['Claude Code', 'React', 'ManyChat', 'Automação', 'IA'],
  },
  {
    id: 2,
    label: '2025–2026',
    company: 'Grupo Shape Insano',
    role: 'SDR / Closer',
    period: 'Dez. 2025 – Mar. 2026',
    description: 'Qualificação de leads e gestão de pipeline no CRM Clint. Criação de scripts de abordagem e reengajamento com apoio de IA. Fechamento de vendas via call com metodologia consultiva.',
    tags: ['CRM Clint', 'ManyChat', 'Prompt Engineering', 'Vendas Consultivas'],
  },
  {
    id: 3,
    label: '2025',
    company: 'Momma Brunch',
    role: 'Atendimento ao Cliente',
    period: 'Set. 2025 – Dez. 2025',
    description: 'Atendimento presencial e experiência do cliente.',
    tags: [],
  },
  {
    id: 4,
    label: '2020–2024',
    company: 'Unique Athletic Resort',
    role: 'Consultor de Vendas',
    period: 'Nov. 2020 – Mar. 2024',
    description: 'Atendimento personalizado e prospecção ativa de clientes. Negociação e fechamento de contratos. Gerenciamento de leads e análise de dados com CRM.',
    tags: ['CRM', 'Vendas', 'Negociação', 'Customer Success'],
  },
]

export const projects = [
  {
    id: 1,
    label: '01',
    name: 'Dashboard Financeiro com IA',
    description: 'Análise de gastos com geração automática de plano financeiro via IA. Visualizações interativas por categoria, período e tendência.',
    tags: ['React + Vite', 'Tailwind CSS', 'Recharts', 'Firebase Firestore', 'Anthropic API'],
    images: [
      '/projects/dashboard-financeiro/screen-1.png',
      '/projects/dashboard-financeiro/screen-2.png',
      '/projects/dashboard-financeiro/screen-3.png',
      '/projects/dashboard-financeiro/screen-4.png',
    ],
    details: `Aplicação web full-stack desenvolvida para controle financeiro de casal, com sincronização em tempo real entre dispositivos via Firebase Firestore.

Análise inteligente de faturas — upload de PDFs de múltiplos cartões com leitura e categorização automática dos lançamentos via API da Anthropic.

Categorização por IA — cada gasto é classificado automaticamente em categorias customizáveis (Mercado, Gasolina, Cursos/Educação, Saúde, Restaurante, etc.) com gráfico de pizza e ranking por valor e percentual.

Planejamento mensal — controle de contas a pagar e receitas a receber, com status em tempo real de quanto já foi pago e quanto ainda falta, incluindo carregamento de contas recorrentes.

Resumo financeiro — visão consolidada com Total Recebido, Total Gasto, Saldo do Mês e taxa de poupança, com gráfico comparativo de receitas vs despesas.

Plano IA — geração de análise financeira personalizada com alertas de gastos excessivos, sugestões de economia e metas de reserva de emergência.

Sincronização em nuvem — dados salvos automaticamente no Firebase, acessíveis de qualquer dispositivo em tempo real.`,
  },
  {
    id: 2,
    label: '02',
    name: 'Sistema GTD com IA',
    description: 'Gestão de tarefas baseada em GTD integrada ao Airtable via MCP. O Claude interage diretamente com os dados — cria, atualiza e consulta tarefas via linguagem natural.',
    tags: ['Claude (Anthropic)', 'Airtable API', 'Google Calendar API', 'Gmail API', 'MCP'],
    images: [
      '/projects/sistema-gtd/screen-2.png',
      '/projects/sistema-gtd/screen-3.png',
      '/projects/sistema-gtd/screen-1.png',
    ],
    details: `Sistema de produtividade baseado na metodologia GTD (Getting Things Done), integrado com ferramentas via automação com IA.

O projeto consiste em um assistente de captura e organização de tarefas que opera dentro de uma conversa com Claude (Anthropic). O usuário fala ou escreve qualquer pensamento de forma livre e o sistema interpreta o conteúdo, classifica cada item e distribui automaticamente nos destinos corretos:

Airtable (base "Meu GTD") — tarefas, projetos, itens em aguardo e ideias futuras, organizados em tabelas específicas com campos como contexto, prioridade, prazo e status.

Google Calendar — eventos e compromissos com data/hora, criados com título, descrição e lembrete.

Gmail — rascunhos de e-mails que precisam ser enviados, sem envio automático.

O sistema utiliza o MCP (Model Context Protocol) para conectar Claude diretamente às APIs do Airtable, Google Calendar e Gmail em tempo real, sem interfaces intermediárias. Toda a lógica de classificação, priorização e distribuição é feita pelo modelo de linguagem com base em regras definidas no prompt de sistema.`,
  },
  {
    id: 3,
    label: '03',
    name: 'Painel de Gestão de Alunos',
    description: 'Ferramenta de acompanhamento de alunos com priorização automática por urgência e pipeline de três etapas por aluno. Substituiu controle manual por um painel visual em tempo real, hospedado via GitHub Pages.',
    tags: ['HTML', 'JavaScript', 'Claude Code', 'GitHub Pages'],
    images: [
      '/projects/painel-alunos/screen-1.png',
      '/projects/painel-alunos/screen-2.png',
    ],
    details: `Ferramenta web desenvolvida para gestão operacional de alunos de consultoria fitness, com priorização automática por tempo sem atualização de treino e acompanhamento individual de cada etapa do processo.

Priorização automática — alunos organizados por urgência (🔴 🟡 🟢) com base nos dias sem atualização de treino, permitindo identificar de forma imediata quem precisa de atenção primeiro.

Pipeline de três etapas — cada aluno possui um fluxo de acompanhamento visual: mensagem enviada → anamnese preenchida → treino montado, com cores distintas para cada estágio do processo.

Gestão completa — adição de novos alunos via formulário, exclusão com seleção múltipla e filtros por urgência e status, com busca em tempo real por nome ou observação.

Persistência de dados — todas as interações (checks, alunos adicionados, exclusões e preferência de tema) são salvas automaticamente via localStorage, sem necessidade de banco de dados ou back-end.`,
  },
  {
    id: 4,
    label: '04',
    name: 'Agente de Planejamento Diário com IA',
    description: 'Agente conversacional que transforma brain dumps em cronogramas estruturados com base em energia cognitiva, prioridades e rotina pessoal. Substitui o planejamento manual e toma decisões de organização no lugar do usuário.',
    tags: ['Prompt Engineering', 'Claude API', 'System Design', 'Anthropic'],
    images: [
      '/projects/agente-planejamento/screen-1.png',
      '/projects/agente-planejamento/screen-2.png',
    ],
    details: `Agente conversacional desenvolvido para transformar brain dumps em cronogramas diários estruturados e realistas, eliminando o esforço cognitivo do planejamento manual.

Planejamento baseado em energia cognitiva — o agente distribui as tarefas ao longo do dia respeitando os picos e vales de energia do usuário, alocando deep work nos momentos de maior foco e tarefas leves nos períodos de baixa performance.

Priorização automática — identifica as MITs (Most Important Tasks) e as posiciona primeiro no dia, garantindo que o que mais importa seja feito antes de qualquer imprevisto.

Agrupamento por contexto — agrupa tarefas similares em lote para reduzir troca de contexto e aumentar produtividade, com buffers de transição entre blocos.

Gestão de capacidade real — quando o dia está sobrecarregado, o agente não comprime o cronograma de forma irreal. Avisa o que não cabe, sugere o que adiar e explica o porquê.

Perfil e rotina integrados — as decisões de planejamento levam em conta janelas fixas do dia, compromissos familiares, treino físico e blocos protegidos, sem precisar re-explicar a rotina a cada uso.

Diferencial frente a calendários e apps de lembretes — ferramentas tradicionais organizam o que você já decidiu. Este agente toma as decisões de planejamento por você, com base em contexto, prioridade e energia — não apenas registra tarefas.`,
  },
  {
    id: 5,
    label: '05',
    name: 'Landing Pages & Sites',
    description: 'Criação de páginas web em React para negócios digitais com foco em conversão. Entrega significativamente mais rápida que o desenvolvimento tradicional.',
    tags: ['React', 'Claude Code', 'Web'],
  },
]

export const education = [
  { id: 1, institution: 'Escola de Automação — Tales Laray', degree: 'Imersão Claude Code', period: 'Abr. 2026' },
  { id: 2, institution: 'Escola de Automação — Tales Laray', degree: 'Formação em Automação', period: 'Mar. 2026' },
  { id: 3, institution: 'Formação Lendária — Alan Nicolas', degree: 'Agentes de IA', period: 'Abr. 2025' },
  { id: 4, institution: 'AutomatikLabs', degree: 'ChatGPT Masters', period: 'Dez. 2024' },
  { id: 5, institution: 'AutomatikLabs', degree: 'Integração com ManyChat e Make', period: 'Out. 2024' },
  { id: 6, institution: 'UNICEUB', degree: 'Bacharelado em Educação Física', period: '2016 – 2020' },
]
