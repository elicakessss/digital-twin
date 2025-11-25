// MCP RAG Server Action
'use server';

import {
  enhancedRAGQuery,
  basicRAGQuery,
  compareRAGApproaches,
  contextAwareRAG,
  type InterviewContext,
} from '@/lib/llm-enhanced-rag';

/**
 * Enhanced RAG query with LLM preprocessing and postprocessing
 */
export async function askProfessionalBackground(question: string) {
  try {
    return await enhancedRAGQuery(question);
  } catch (error) {
    console.error('Enhanced RAG failed, falling back to basic RAG:', error);
    return await basicRAGQuery(question);
  }
}

/**
 * Basic RAG query without LLM enhancement (fallback)
 */
export async function askProfessionalBackgroundBasic(question: string) {
  return await basicRAGQuery(question);
}

/**
 * Compare basic vs enhanced RAG approaches
 */
export async function compareRAG(question: string) {
  return await compareRAGApproaches(question);
}

/**
 * Context-aware RAG for specific interview types
 */
export async function askWithContext(question: string, context: InterviewContext) {
  return await contextAwareRAG(question, context);
}

