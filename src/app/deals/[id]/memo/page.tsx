"use client";

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MemoProvider, useMemo } from '@/lib/contexts/memo-context';
import { MemoActions } from '@/components/features/memo-actions';
import { MemoEditor } from '@/components/memo/MemoEditor';
import { getMemoByDealId } from '@/lib/data/mock-db';
import { ArrowLeft, FileText } from 'lucide-react';
import { AIInterface } from '@/components/layout/ai-interface';
import Link from 'next/link';

export default function MemoCanvasPage() {
    const params = useParams();
    const dealId = params.id as string;

    return (
        <MemoProvider initialMemo={null}>
            <MemoActions />
            <MemoCanvasContent dealId={dealId} />
        </MemoProvider>
    );
}

function MemoCanvasContent({ dealId }: { dealId: string }) {
    const { memo, setMemo, isGenerating } = useMemo();

    // Load existing memo on mount and poll for updates
    useEffect(() => {
        const checkForMemo = () => {
            const existingMemo = getMemoByDealId(dealId);
            if (existingMemo && (!memo || memo.id !== existingMemo.id)) {
                console.log('Found memo in database, loading:', existingMemo.id);
                setMemo(existingMemo);
            }
        };

        // Check immediately
        checkForMemo();

        // Poll every 500ms for new memo (in case it's being generated)
        const interval = setInterval(checkForMemo, 500);

        return () => clearInterval(interval);
    }, [dealId, memo, setMemo]);

    return (
            <div className="h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">

                {/* Main Content Area - Memo Editor Canvas */}
                <div className="flex-1 flex flex-col min-w-0">

                    {/* Top Navigation */}
                    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-8 sticky top-0 z-10 justify-between">
                        <div className="flex items-center">
                            <Link href={`/deals/${dealId}`} className="text-slate-400 hover:text-slate-900 transition-colors flex items-center text-sm font-medium">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Deal
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-sm font-semibold text-slate-900">
                                        {memo?.title || 'Investment Memo'}
                                    </h1>
                                </div>
                            </div>

                            {memo && (
                                <div className="flex items-center gap-2">
                                    <div className="text-xs text-slate-600">
                                        {Math.round(memo.metadata.completeness)}% complete
                                    </div>
                                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                                            style={{ width: `${memo.metadata.completeness}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Scrollable Memo Content */}
                    <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                        {memo ? (
                            <MemoEditor />
                        ) : isGenerating ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center max-w-md">
                                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full animate-pulse flex items-center justify-center mx-auto mb-6">
                                        <FileText className="h-10 w-10 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-semibold mb-3 text-slate-900">Generating Memo...</h2>
                                    <p className="text-slate-600 mb-6">
                                        Creating your investment memo. This will take just a moment.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-indigo-600">
                                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center max-w-md">
                                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FileText className="h-10 w-10 text-indigo-500" />
                                    </div>
                                    <h2 className="text-2xl font-semibold mb-3 text-slate-900">No Memo Yet</h2>
                                    <p className="text-slate-600 mb-6">
                                        Generate an investment memo using the AI assistant to get started.
                                    </p>
                                    <div className="text-sm text-slate-600 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                        <p className="font-medium mb-2">💡 Try asking the AI:</p>
                                        <p className="text-indigo-600">"Generate an IC memo for this deal"</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>

                {/* AI Interface - Sidebar Mode (same as deal page) */}
                <AIInterface
                    layout="sidebar"
                    className="relative h-screen border-l border-slate-200 shadow-none z-0 w-[400px] flex-shrink-0"
                />

            </div>
    );
}
