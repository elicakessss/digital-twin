// Advanced LLM-Enhanced RAG Implementation
import Groq from 'groq-sdk';
import { Index } from '@upstash/vector';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

/**
 * Query Preprocessing: Enhance user queries for better vector search
 */
export async function enhanceQuery(originalQuery: string): Promise<string> {
  const enhancementPrompt = `
You are an interview preparation assistant that improves search queries.

Original question: "${originalQuery}"

Enhance this query to better search professional profile data by:
- Adding relevant synonyms and related terms
- Expanding context for interview scenarios
- Including technical and soft skill variations
- Focusing on achievements and quantifiable results

Return only the enhanced search query (no explanation):
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: enhancementPrompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.3, // Lower temperature for consistent query enhancement
      max_tokens: 150,
    });

    const enhanced = completion.choices[0]?.message?.content?.trim() || originalQuery;
    console.log(`Query Enhancement: "${originalQuery}" → "${enhanced}"`);
    return enhanced;
  } catch (error) {
    console.error('Query enhancement failed:', error);
    return originalQuery; // Fallback to original query
  }
}

/**
 * Response Post-Processing: Format RAG results for interview-ready answers
 */
export async function formatForInterview(
  ragResults: any[],
  originalQuestion: string
): Promise<string> {
  const context = ragResults
    .map((result: any) => {
      if (result.metadata) {
        return `${result.metadata.title || 'Context'}: ${result.metadata.content || ''}`;
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');

  const formattingPrompt = `
You are an expert interview coach representing Elijah Alonzo. Create a compelling interview response using this professional data.

Question: "${originalQuestion}"

Professional Background Data:
${context}

Create a response that:
- Directly addresses the interview question in first person (as Elijah)
- Uses specific examples and quantifiable achievements when available
- Applies STAR format (Situation-Task-Action-Result) when telling stories
- Sounds confident and natural for an interview setting
- Highlights unique value and differentiators
- Includes relevant technical details without being overwhelming
- Keeps the response concise but impactful (2-3 paragraphs max)

Interview Response:
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: formattingPrompt }],
      model: 'llama-3.1-70b-versatile', // More powerful model for response crafting
      temperature: 0.7, // Higher creativity for natural responses
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content?.trim() || 'Unable to generate response';
  } catch (error) {
    console.error('Response formatting failed:', error);
    return context; // Fallback to raw RAG results
  }
}

/**
 * Main Enhanced RAG Query Function
 */
export async function enhancedRAGQuery(question: string) {
  const startTime = Date.now();
  
  try {
    // Step 1: Enhance the query for better vector search
    const enhanceStart = Date.now();
    const enhancedQuery = await enhanceQuery(question);
    const enhanceTime = Date.now() - enhanceStart;

    // Step 2: Perform vector search with enhanced query
    const searchStart = Date.now();
    const vectorResults = await index.query({
      data: enhancedQuery,
      topK: 5,
      includeMetadata: true,
    });
    const searchTime = Date.now() - searchStart;

    // Step 3: Format results for interview context
    const formatStart = Date.now();
    const interviewResponse = await formatForInterview(vectorResults, question);
    const formatTime = Date.now() - formatStart;

    const totalTime = Date.now() - startTime;

    return {
      success: true,
      response: interviewResponse,
      metadata: {
        originalQuery: question,
        enhancedQuery: enhancedQuery,
        resultsFound: vectorResults.length,
        timing: {
          queryEnhancement: `${enhanceTime}ms`,
          vectorSearch: `${searchTime}ms`,
          responseFormatting: `${formatTime}ms`,
          total: `${totalTime}ms`,
        },
      },
    };
  } catch (error) {
    console.error('Enhanced RAG query failed:', error);
    throw error;
  }
}

/**
 * Basic RAG Query (fallback without LLM enhancement)
 */
export async function basicRAGQuery(question: string) {
  try {
    const vectorResults = await index.query({
      data: question,
      topK: 3,
      includeMetadata: true,
    });

    const context = vectorResults
      .map((result: any) => {
        if (result.metadata) {
          return `${result.metadata.title || 'Context'}: ${result.metadata.content || ''}`;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n\n');

    return {
      success: true,
      response: context,
      metadata: {
        originalQuery: question,
        resultsFound: vectorResults.length,
      },
    };
  } catch (error) {
    console.error('Basic RAG query failed:', error);
    throw error;
  }
}

/**
 * A/B Testing: Compare basic vs enhanced RAG
 */
export async function compareRAGApproaches(question: string) {
  const startTime = Date.now();

  try {
    const [basicResult, enhancedResult] = await Promise.all([
      basicRAGQuery(question),
      enhancedRAGQuery(question),
    ]);

    const totalTime = Date.now() - startTime;

    return {
      question,
      results: {
        basic: {
          response: basicResult.response,
          metadata: basicResult.metadata,
        },
        enhanced: {
          response: enhancedResult.response,
          metadata: enhancedResult.metadata,
        },
      },
      totalComparisonTime: `${totalTime}ms`,
    };
  } catch (error) {
    console.error('Comparison failed:', error);
    throw error;
  }
}

/**
 * Context-Aware RAG for different interview types
 */
export interface InterviewContext {
  type: 'technical' | 'behavioral' | 'executive' | 'general';
  companyInfo?: string;
  jobRequirements?: string[];
}

export async function contextAwareRAG(question: string, context: InterviewContext) {
  const contextualPrompt = `
Context: This is a ${context.type} interview question.
${context.companyInfo ? `Company: ${context.companyInfo}` : ''}
${context.jobRequirements ? `Key Requirements: ${context.jobRequirements.join(', ')}` : ''}

Question: ${question}
  `;

  return await enhancedRAGQuery(contextualPrompt);
}
