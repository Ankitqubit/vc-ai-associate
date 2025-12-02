"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { PipelineDealCard } from "./pipeline-deal-card";
import { Deal } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PipelineColumnProps {
    id: string;
    title: string;
    deals: Deal[];
}

export function PipelineColumn({ id, title, deals }: PipelineColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "flex flex-col w-80 h-full rounded-2xl transition-colors duration-200",
                "bg-slate-100/40 backdrop-blur-sm border border-white/20",
                isOver && "bg-indigo-50/40 border-indigo-200/50"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-700">{title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-white/50 text-xs font-medium text-slate-500">
                        {deals.length}
                    </span>
                </div>
            </div>

            {/* Cards Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <SortableContext items={deals.map(d => d.id)} strategy={verticalListSortingStrategy}>
                    {deals.map((deal) => (
                        <PipelineDealCard key={deal.id} deal={deal} />
                    ))}
                </SortableContext>

                {deals.length === 0 && (
                    <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200/50 rounded-xl">
                        <span className="text-sm text-slate-400">No deals</span>
                    </div>
                )}
            </div>
        </div>
    );
}
