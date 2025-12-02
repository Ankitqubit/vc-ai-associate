"use client";

import { useDealState } from "@/lib/contexts/deal-state-context";
import { useMemo } from "@/lib/contexts/memo-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Building, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export function DealHeader() {
    const { deal } = useDealState();
    const { memo, openCanvas } = useMemo();

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-8 sticky top-0 z-10 justify-between">
            <div className="flex items-center">
                <Link href="/dashboard" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center text-sm font-medium">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Link>
                <Separator orientation="vertical" className="h-6 mx-4 bg-slate-200" />
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-white rounded-md border border-slate-200 flex items-center justify-center shadow-sm">
                        <Building className="h-4 w-4 text-slate-500" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{deal.company.name}</span>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200 font-normal">
                        {deal.stage}
                    </Badge>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                    <Avatar className="h-8 w-8 border-2 border-white ring-1 ring-slate-100">
                        <AvatarImage src={deal.owner.avatarUrl} />
                        <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="hidden md:flex"
                    onClick={openCanvas}
                >
                    <FileText className="h-4 w-4 mr-2" />
                    {memo ? 'View Memo' : 'IC Memo'}
                </Button>
                <Button variant="outline" size="sm" className="hidden md:flex">
                    Share
                </Button>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200">
                    Move Stage
                </Button>
            </div>
        </header>
    );
}
