import { NextRequest, NextResponse } from 'next/server';
import { askProfessionalBackground } from '../../actions/rag';

// Enhanced RAG handler with LLM preprocessing and postprocessing
export async function POST(req: NextRequest) {
  const { question } = await req.json();
  
  if (!question || typeof question !== 'string') {
    return NextResponse.json(
      { error: 'Invalid question parameter' },
      { status: 400 }
    );
  }

  try {
    // Use the enhanced RAG query which includes:
    // 1. Query preprocessing with LLM
    // 2. Vector search with enhanced query
    // 3. Response postprocessing with LLM for interview-ready answers
    const result = await askProfessionalBackground(question);

    if (!result.success) {
      throw new Error('RAG query failed');
    }

    return NextResponse.json({
      answer: result.response,
      metadata: result.metadata, // Include timing and query info for debugging
    });
  } catch (err: any) {
    console.error('RAG API Error:', err);
    return NextResponse.json(
      { 
        error: err?.message || 'Error processing request.',
        answer: 'I apologize, but I encountered an error processing your question. Please try again.'
      },
      { status: 500 }
    );
  }
}
