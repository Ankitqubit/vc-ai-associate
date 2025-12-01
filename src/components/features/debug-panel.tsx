"use client";

import { useDealState } from "@/lib/contexts/deal-state-context";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DebugPanel() {
    const { logs, addLog, deal } = useDealState();

    // Always show the panel for debugging purposes
    // if (logs.length === 0) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 w-96 bg-black/90 text-green-400 p-4 rounded-lg shadow-2xl border border-green-900 font-mono text-xs">
            <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-1">
                <h3 className="font-bold text-white">🛠️ System Logs</h3>
                <div className="flex space-x-2">
                    <button onClick={() => addLog("Test Log")} className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600">Test</button>
                    <button onClick={() => console.log(deal)} className="bg-blue-900 px-2 py-1 rounded hover:bg-blue-800">Log State</button>
                </div>
            </div>
            <ScrollArea className="h-48">
                {logs.map((log, i) => (
                    <div key={i} className="mb-1 border-b border-gray-800 pb-1 last:border-0">
                        {log}
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}
