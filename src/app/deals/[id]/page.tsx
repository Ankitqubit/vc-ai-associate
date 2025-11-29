import { getDealById } from "@/lib/data/mock-db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Building, MapPin, Globe, Users, FileText, Activity,
    ArrowLeft, ArrowRight, MoreHorizontal, MessageSquare, Sparkles,
    TrendingUp, Calendar
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AIInterface } from "@/components/layout/ai-interface";

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
        <div className="h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Top Navigation */}
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
                        <Button variant="outline" size="sm" className="hidden md:flex">
                            Share
                        </Button>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200">
                            Move Stage
                        </Button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <div className="max-w-5xl mx-auto space-y-8 pb-20">

                        {/* Hero Section */}
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

                        {/* Tabs & Content */}
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6 inline-flex">
                                <TabsTrigger value="overview" className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Overview</TabsTrigger>
                                <TabsTrigger value="timeline" className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Timeline</TabsTrigger>
                                <TabsTrigger value="documents" className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Documents</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                                {/* Thesis Fit Score */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Card className="md:col-span-2 border-indigo-100 shadow-sm overflow-hidden bg-white/80 backdrop-blur-sm">
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-base font-semibold text-slate-900 flex items-center">
                                                    <Sparkles className="h-4 w-4 text-indigo-500 mr-2" />
                                                    Thesis Fit Score
                                                </h3>
                                                <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 px-3 py-1 text-sm">
                                                    {deal.fitScore.score}/100
                                                </Badge>
                                            </div>
                                            <p className="text-slate-600 leading-relaxed mb-6">
                                                {deal.fitScore.rationale}
                                            </p>

                                            <div className="space-y-4">
                                                {Object.entries(deal.fitScore.breakdown).map(([key, value]) => (
                                                    <div key={key} className="group">
                                                        <div className="flex justify-between text-xs mb-1.5">
                                                            <span className="capitalize text-slate-500 font-medium group-hover:text-indigo-600 transition-colors">{key}</span>
                                                            <span className="font-semibold text-slate-900">{value}/100</span>
                                                        </div>
                                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                                                                style={{ width: `${value}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Key Metrics */}
                                    <div className="space-y-4">
                                        {deal.metrics.map((metric) => (
                                            <Card key={metric.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                <CardContent className="p-5">
                                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                                        {metric.name}
                                                    </p>
                                                    <div className="flex items-baseline justify-between">
                                                        <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
                                                        {metric.trend && (
                                                            <div className="flex items-center text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-full">
                                                                <TrendingUp className="h-3 w-3 mr-1" />
                                                                {metric.trend}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
                                                        <span className="text-slate-400">Confidence</span>
                                                        <span className={metric.confidence === 'High' ? 'text-emerald-600 font-medium' : 'text-amber-600 font-medium'}>
                                                            {metric.confidence}
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                            </TabsContent>

                            <TabsContent value="timeline">
                                <Card className="border-slate-200 shadow-sm">
                                    <CardContent className="p-6">
                                        <p className="text-slate-500 text-center py-8">Timeline view coming soon...</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                    </div>
                </main>
            </div>

            {/* AI Interface - Sidebar Mode */}
            <AIInterface layout="sidebar" />

        </div>
    );
}
