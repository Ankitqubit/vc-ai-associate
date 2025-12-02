"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Deal } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Target, Calendar, User } from "lucide-react";

interface PipelineDealCardProps {
    deal: Deal;
    isOverlay?: boolean;
}

export function PipelineDealCard({ deal, isOverlay }: PipelineDealCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: deal.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const getFitScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-100";
        if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-100";
        return "text-rose-600 bg-rose-50 border-rose-100";
    };

    const fitScore = deal.fitScore?.score || 0;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                "group relative bg-white/70 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-white/90 cursor-grab active:cursor-grabbing",
                isDragging && "opacity-50",
                isOverlay && "opacity-100 scale-105 shadow-xl rotate-2 z-50 cursor-grabbing bg-white",
            )}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h4 className="font-semibold text-slate-900 leading-tight">{deal.company.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 truncate max-w-[180px]">
                        {deal.company.description || "No description"}
                    </p>
                </div>
                <div className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium",
                    getFitScoreColor(fitScore)
                )}>
                    <Target className="h-3 w-3" />
                    <span>{fitScore}</span>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 mb-3">
                {deal.metrics.slice(0, 2).map(metric => (
                    <div key={metric.id} className="bg-slate-50/50 rounded-lg p-1.5 border border-slate-100">
                        <p className="text-[10px] text-slate-400 uppercase font-medium">{metric.name}</p>
                        <p className="text-xs font-semibold text-slate-700">{metric.value}</p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <User className="h-3 w-3" />
                    <span>John Doe</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="h-3 w-3" />
                    <span>2d ago</span>
                </div>
            </div>

            {/* Hover Actions (Visible on hover) */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Add quick actions here later */}
            </div>
        </div>
    );
}
