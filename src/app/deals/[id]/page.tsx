import { getDealById } from "@/lib/data/mock-db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Building, MapPin, Globe, Users,
    ArrowLeft, Sparkles,
    TrendingUp, Calendar
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AIInterface } from "@/components/layout/ai-interface";
import { DealContext } from "@/components/features/deal-context";
import { DealStateProvider } from "@/lib/contexts/deal-state-context";
import { MemoProvider } from "@/lib/contexts/memo-context";
import { MemoActions } from "@/components/features/memo-actions";
import { CommentActions } from "@/components/features/comment-actions";
import { DealHeader } from "@/components/features/deal-header";
import { DealHero } from "@/components/features/deal-hero";
import { DealMetrics } from "@/components/features/deal-metrics";
import { DealFitScore } from "@/components/features/deal-fit-score";
import { DealTimeline } from "@/components/features/deal-timeline";
import { DealPageContent } from "./page-content";


interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function DealPage({ params }: PageProps) {
    const resolvedParams = await params;
    const deal = getDealById(resolvedParams.id);

    if (!deal) {
        return notFound();
    }

    return (
        <DealStateProvider initialDeal={deal}>
            <MemoProvider>
                <DealPageContent deal={deal}>
                    <DealContext />
                    <MemoActions />
                    <CommentActions />
                </DealPageContent>
            </MemoProvider>
        </DealStateProvider>
    );
}
