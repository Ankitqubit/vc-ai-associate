"use client";

import { useDealState } from "@/lib/contexts/deal-state-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Globe, Users, MapPin, Calendar } from "lucide-react";

export function DealHero() {
    const { deal } = useDealState();

    return (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">{deal.company.name}</h1>
                        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">{deal.company.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm p-1 rounded-lg border border-slate-100">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                            <Globe className="h-4 w-4" />
                        </Button>
                        <Separator orientation="vertical" className="h-4" />
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                            <Users className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-slate-400" /> {deal.company.location}
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-slate-400" /> Founded {deal.company.foundingDate}
                    </div>
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-slate-400" /> {deal.company.teamSize} Employees
                    </div>
                </div>
            </div>
        </div>
    );
}
