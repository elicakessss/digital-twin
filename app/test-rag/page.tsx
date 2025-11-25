'use client';

import { useState } from 'react';
import { compareRAG } from '../actions/rag';

export default function RAGComparisonTest() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testQuestions = [
    "What are my key technical skills?",
    "Tell me about my leadership experience",
    "What's my biggest professional achievement?",
    "Why should someone hire me?",
    "Walk me through a challenging project you've worked on",
  ];

  async function handleCompare(testQuestion?: string) {
    const q = testQuestion || question;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const comparison = await compareRAG(q);
      setResult(comparison);
    } catch (error) {
      console.error('Comparison failed:', error);
      alert('Comparison failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">RAG System Comparison</h1>
          <p className="text-gray-600">
            Compare Basic RAG vs LLM-Enhanced RAG to see the improvements in response quality
          </p>
        </div>

        {/* Quick Test Buttons */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Test Questions</h2>
          <div className="flex flex-wrap gap-3">
            {testQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleCompare(q)}
                disabled={loading}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm text-gray-700 transition disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Question Input */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Custom Question</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask any question about your background..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={() => handleCompare()}
              disabled={loading || !question.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-800 transition disabled:opacity-50"
            >
              {loading ? 'Comparing...' : 'Compare'}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Timing Info */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border border-purple-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ Performance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-gray-600 mb-1">Total Time</div>
                  <div className="text-lg font-bold text-purple-600">{result.totalComparisonTime}</div>
                </div>
                {result.results.enhanced.metadata?.timing && (
                  <>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-gray-600 mb-1">Query Enhancement</div>
                      <div className="text-lg font-bold text-blue-600">
                        {result.results.enhanced.metadata.timing.queryEnhancement}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-gray-600 mb-1">Vector Search</div>
                      <div className="text-lg font-bold text-green-600">
                        {result.results.enhanced.metadata.timing.vectorSearch}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-gray-600 mb-1">Response Formatting</div>
                      <div className="text-lg font-bold text-orange-600">
                        {result.results.enhanced.metadata.timing.responseFormatting}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Query Enhancement */}
            {result.results.enhanced.metadata?.enhancedQuery && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg border border-green-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 Query Enhancement</h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Original Query:</div>
                    <div className="bg-white rounded-lg p-3 text-gray-800">
                      {result.question}
                    </div>
                  </div>
                  <div className="text-2xl text-center text-gray-400">↓</div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Enhanced Query:</div>
                    <div className="bg-white rounded-lg p-3 text-gray-800 font-medium">
                      {result.results.enhanced.metadata.enhancedQuery}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Side-by-Side Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic RAG */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">📄 Basic RAG</h2>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    No LLM Enhancement
                  </span>
                </div>
                <div className="prose prose-sm max-w-none">
                  <div className="bg-gray-50 rounded-lg p-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {result.results.basic.response}
                  </div>
                </div>
                {result.results.basic.metadata && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      Results found: {result.results.basic.metadata.resultsFound}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced RAG */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border-2 border-blue-300">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">✨ Enhanced RAG</h2>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                    LLM-Powered
                  </span>
                </div>
                <div className="prose prose-sm max-w-none">
                  <div className="bg-white rounded-lg p-4 text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {result.results.enhanced.response}
                  </div>
                </div>
                {result.results.enhanced.metadata && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="text-xs text-gray-600">
                      Results found: {result.results.enhanced.metadata.resultsFound}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 shadow-lg border border-yellow-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Key Differences</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">Specificity</div>
                  <div className="text-xs text-gray-700">
                    Enhanced RAG provides more specific examples and quantifiable achievements
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">Interview Readiness</div>
                  <div className="text-xs text-gray-700">
                    Enhanced RAG formats responses using STAR methodology and interview best practices
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">Natural Language</div>
                  <div className="text-xs text-gray-700">
                    Enhanced RAG uses confident, professional language suitable for interviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Comparing RAG approaches...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
