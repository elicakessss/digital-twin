// RAG Configuration for Different Interview Scenarios

export interface RAGConfig {
  queryModel: string;
  responseModel: string;
  temperature: number;
  focusAreas: string[];
  responseStyle: string;
}

export const RAG_CONFIGS: Record<string, RAGConfig> = {
  technical_interview: {
    queryModel: 'llama-3.1-8b-instant',
    responseModel: 'llama-3.1-70b-versatile',
    temperature: 0.3,
    focusAreas: [
      'technical skills',
      'problem solving',
      'architecture',
      'code quality',
      'project implementation',
      'debugging',
    ],
    responseStyle: 'detailed technical examples with metrics and specific technologies used',
  },

  behavioral_interview: {
    queryModel: 'llama-3.1-8b-instant',
    responseModel: 'llama-3.1-70b-versatile',
    temperature: 0.7,
    focusAreas: [
      'leadership',
      'teamwork',
      'communication',
      'conflict resolution',
      'adaptability',
      'initiative',
    ],
    responseStyle: 'STAR format stories with emotional intelligence and interpersonal skills',
  },

  executive_interview: {
    queryModel: 'llama-3.1-70b-versatile',
    responseModel: 'llama-3.1-70b-versatile',
    temperature: 0.5,
    focusAreas: [
      'strategic thinking',
      'business impact',
      'vision',
      'leadership at scale',
      'decision making',
      'organizational influence',
    ],
    responseStyle: 'high-level strategic responses with business metrics and leadership impact',
  },

  general: {
    queryModel: 'llama-3.1-8b-instant',
    responseModel: 'llama-3.1-70b-versatile',
    temperature: 0.5,
    focusAreas: ['professional background', 'skills', 'experience', 'achievements', 'goals'],
    responseStyle: 'balanced professional responses with concrete examples',
  },
};

export function getRAGConfig(interviewType: string): RAGConfig {
  return RAG_CONFIGS[interviewType] || RAG_CONFIGS.general;
}
