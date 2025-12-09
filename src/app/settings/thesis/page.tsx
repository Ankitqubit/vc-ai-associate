"use client";

import { useState, useEffect } from 'react';
import { ThesisBlock } from '@/components/thesis/ThesisBlock';
import { getThesis, updateThesisBlock } from '@/lib/data/mock-thesis';
import { cn } from '@/lib/utils';
import { FileText, Sparkles, ArrowLeft } from 'lucide-react';
import { AIInterface } from '@/components/layout/ai-interface';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function ThesisPage() {
  const [thesis, setThesis] = useState(getThesis());

  // Listen for thesis updates
  useEffect(() => {
    const handleThesisUpdate = () => {
      setThesis(getThesis());
    };

    window.addEventListener('thesis-updated', handleThesisUpdate);
    return () => window.removeEventListener('thesis-updated', handleThesisUpdate);
  }, []);

  const handleBlockUpdate = (blockId: string, content: string) => {
    const success = updateThesisBlock(blockId, content);
    if (success) {
      // Refresh thesis data to show updated content
      setThesis(getThesis());
    }
  };

  // Sort blocks by order
  const sortedBlocks = [...thesis.blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-8 sticky top-0 z-10 justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center text-sm font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
            <Separator orientation="vertical" className="h-6 mx-4 bg-slate-200" />
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-white rounded-md border border-slate-200 flex items-center justify-center shadow-sm">
                <FileText className="h-4 w-4 text-slate-500" />
              </div>
              <span className="text-sm font-semibold text-slate-900">Investment Thesis</span>
              <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-md">
                <span className="text-xs font-medium text-slate-600">Version {thesis.version}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-5xl mx-auto space-y-6 pb-20">
            {/* Focus Statement - Hero Block */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Investment Focus
              </h2>
              <p className="text-lg leading-relaxed opacity-95">
                {thesis.focusStatement}
              </p>
            </div>

            {/* Thesis Blocks */}
            {sortedBlocks.map((block) => (
              <ThesisBlock
                key={block.id}
                block={block}
                onUpdate={handleBlockUpdate}
              />
            ))}

            {/* Metadata Footer */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <span>Last updated by</span>
                  <span className={cn(
                    "font-medium",
                    thesis.updatedBy.isAi ? "text-indigo-600" : "text-slate-700"
                  )}>
                    {thesis.updatedBy.name}
                  </span>
                  {thesis.updatedBy.isAi && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      <Sparkles className="h-3 w-3" />
                      AI
                    </span>
                  )}
                </div>
                <span>{new Date(thesis.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* AI Interface - Always visible on the right */}
      <AIInterface
        layout="sidebar"
        className="relative h-screen border-l border-slate-200 shadow-none z-0 w-[400px] flex-shrink-0"
      />
    </div>
  );
}
