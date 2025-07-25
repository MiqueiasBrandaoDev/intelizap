export interface Usuario {
  id: number;
  nome: string | null;
  instancia: string;
  email: string | null;
  plano_ativo: boolean;
  max_grupos: number;
  tokens_mes: number;
  'dia-renovacao-tokens': number;
  horaResumo: string | null;
  resumoDiaAnterior: boolean;
  transcricao_ativa: boolean;
  'transcricao-pvd': boolean;
  criado_em: Date;
  transcreverEu: boolean;
  ambiente: 'prod' | 'dev';
  'key-openai': string;
  ludico: boolean;
  senha: string;
  agendamento: boolean;
}

export interface Grupo {
  id: number;
  nome_grupo: string | null;
  grupo_id_externo: string | null;
  usuario_id: number | null;
  ativo: boolean;
  criado_em: Date;
}

export interface GrupoEvento {
  id: number;
  nome: string;
  'id-externo': string;
  'id-usuario': number;
}

export interface Mensagem {
  id: number;
  grupo_id: number | null;
  usuario_id: number | null;
  mensagem: string | null;
  data_mensagem: Date | null;
  'nome-autor': string;
  'numero-autor': string;
}

export interface CreateUsuarioData {
  nome: string;
  instancia: string;
  email: string;
  senha: string;
  plano_ativo?: boolean;
  horaResumo?: string;
  resumoDiaAnterior?: boolean;
  transcricao_ativa?: boolean;
  'transcricao-pvd'?: boolean;
  transcreverEu?: boolean;
  ambiente?: 'prod' | 'dev';
  'key-openai'?: string;
  ludico?: boolean;
  agendamento?: boolean;
}

export interface CreateGrupoData {
  nome_grupo: string;
  grupo_id_externo?: string;
  usuario_id: number;
  ativo?: boolean;
}

export interface CreateMensagemData {
  grupo_id: number;
  usuario_id: number;
  mensagem: string;
  data_mensagem: Date;
  'nome-autor': string;
  'numero-autor': string;
}

export interface UpdateUsuarioData {
  nome?: string;
  email?: string;
  plano_ativo?: boolean;
  horaResumo?: string;
  resumoDiaAnterior?: boolean;
  transcricao_ativa?: boolean;
  'transcricao-pvd'?: boolean;
  transcreverEu?: boolean;
  ambiente?: 'prod' | 'dev';
  'key-openai'?: string;
  ludico?: boolean;
  agendamento?: boolean;
}

export interface GrupoWithMensagens extends Grupo {
  mensagens: Mensagem[];
}

export interface UsuarioWithGrupos extends Usuario {
  grupos: Grupo[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface Resumo {
  id: number;
  grupo_id: number;
  usuario_id: number;
  conteudo: string;
  total_mensagens: number;
  status: 'enviado' | 'erro' | 'pendente';
  data_criacao: Date;
  data_envio: Date | null;
  erro_msg: string | null;
}

export interface ResumoWithGrupo extends Resumo {
  grupo_nome: string;
  grupo_id_externo: string | null;
}

export interface CreateResumoData {
  grupo_id: number;
  usuario_id: number;
  conteudo: string;
  total_mensagens: number;
  status?: 'enviado' | 'erro' | 'pendente';
}

export interface DashboardStats {
  totalGroups: number;
  activeGroups: number;
  totalResumes: number;
  messagesProcessed: number;
  resumosHoje: number;
  mensagensHoje: number;
}

export interface RecentActivity {
  id: number;
  grupo_nome: string;
  data_envio: Date;
  status: 'enviado' | 'erro' | 'pendente';
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}