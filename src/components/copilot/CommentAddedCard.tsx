import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, CheckCircle2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommentAddedCardProps {
    sectionTitle?: string;
    sectionType?: string;
    comment?: string;
    mentionedUsers?: string[];
    status: "inProgress" | "complete" | "error";
    result?: any;
}

export function CommentAddedCard({
    sectionTitle,
    sectionType,
    comment,
    mentionedUsers = [],
    status,
    result
}: CommentAddedCardProps) {
    const isError = status === "error" || (status === "complete" && !result?.success);
    const isSuccess = status === "complete" && result?.success;

    return (
        <div className={cn(
            "w-full max-w-md transition-all duration-300",
            "rounded-lg border",
            "p-4",
            isError && "border-red-200/50 bg-red-50/50",
            isSuccess && "border-blue-200/50 bg-blue-50/50",
            status === "inProgress" && "border-border/50 bg-muted/30"
        )}>
            {/* Header */}
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                    isError && "bg-red-500",
                    isSuccess && "bg-blue-500",
                    status === "inProgress" && "bg-indigo-500"
                )}>
                    {status === "inProgress" && (
                        <Loader2 className="h-5 w-5 text-white animate-spin" />
                    )}
                    {isSuccess && (
                        <CheckCircle2 className="h-5 w-5 text-white" />
                    )}
                    {isError && (
                        <MessageSquare className="h-5 w-5 text-white" />
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Status */}
                    <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                            "text-sm font-semibold",
                            isError && "text-red-700",
                            isSuccess && "text-blue-700",
                            status === "inProgress" && "text-indigo-700"
                        )}>
                            {status === "inProgress" && "Adding Comment..."}
                            {isSuccess && "Comment Added"}
                            {isError && "Failed to Add Comment"}
                        </span>
                    </div>

                    {/* Section Info */}
                    {(sectionTitle || result?.sectionTitle) && (
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                                {result?.sectionTitle || sectionTitle}
                            </Badge>
                        </div>
                    )}

                    {/* Comment Preview (for in-progress) */}
                    {status === "inProgress" && comment && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {comment}
                        </p>
                    )}

                    {/* Mentioned Users */}
                    {(mentionedUsers.length > 0 || result?.mentionedUsers?.length > 0) && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-600">
                            <Users className="h-3 w-3" />
                            <span>
                                Mentioned: {(result?.mentionedUsers || mentionedUsers).join(', ')}
                            </span>
                        </div>
                    )}

                    {/* Result Message */}
                    {isSuccess && result?.message && (
                        <p className="text-xs text-muted-foreground mt-2">
                            {result.message}
                        </p>
                    )}

                    {/* Error Message */}
                    {isError && result && (
                        <p className="text-xs text-red-600 mt-2">
                            {typeof result === 'string' ? result : 'Failed to add comment'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
