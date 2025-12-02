import { PipelineBoard } from "@/components/features/pipeline/pipeline-board";
import { AIInterface } from "@/components/layout/ai-interface";

export default function PipelinePage() {
    return (
        <div className="h-screen flex bg-slate-50/50 font-sans">
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <PipelineBoard />
            </div>

            {/* AI Sidebar */}
            <AIInterface
                layout="sidebar"
                className="w-[400px] border-l border-slate-200 bg-white/80 backdrop-blur-xl"
            />
        </div>
    );
}
