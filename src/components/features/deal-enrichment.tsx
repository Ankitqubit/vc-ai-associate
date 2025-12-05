"use client";

import { useDealState } from "@/lib/contexts/deal-state-context";
import { ExternalLink, Building2, Users2, TrendingUp, Globe, Linkedin, Twitter, Newspaper, Cpu } from "lucide-react";
import { EnrichmentData } from "@/lib/data/mock-companies";

export function DealEnrichment() {
    const { deal } = useDealState();

    // Get enrichment data from deal
    const enrichment = deal?.company?.enrichment as EnrichmentData | undefined;

    if (!enrichment) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Building2 className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-slate-900">Company Intelligence</h3>
                </div>
                <p className="text-sm text-slate-500">No enrichment data available for this company.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Links */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Building2 className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-slate-900">Company Intelligence</h3>
                    <span className="ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                        Enriched by AI
                    </span>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3">
                    {enrichment.website && (
                        <a
                            href={enrichment.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
                        >
                            <Globe className="h-4 w-4 text-slate-600 group-hover:text-indigo-600" />
                            <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700">Website</span>
                            <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-indigo-500" />
                        </a>
                    )}
                    {enrichment.linkedin && (
                        <a
                            href={enrichment.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                        >
                            <Linkedin className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
                            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">LinkedIn</span>
                            <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-blue-500" />
                        </a>
                    )}
                    {enrichment.twitter && (
                        <a
                            href={enrichment.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-all group"
                        >
                            <Twitter className="h-4 w-4 text-slate-600 group-hover:text-sky-600" />
                            <span className="text-sm font-medium text-slate-700 group-hover:text-sky-700">Twitter</span>
                            <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-sky-500" />
                        </a>
                    )}
                </div>
            </div>

            {/* Founders */}
            {enrichment.founders && enrichment.founders.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Users2 className="h-5 w-5 text-indigo-600" />
                        <h4 className="text-base font-semibold text-slate-900">Founding Team</h4>
                    </div>
                    <div className="space-y-4">
                        {enrichment.founders.map((founder, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-indigo-200 transition-all">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg font-bold text-indigo-700">
                                        {founder.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h5 className="font-semibold text-slate-900">{founder.name}</h5>
                                        {founder.linkedin && (
                                            <a
                                                href={founder.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700"
                                            >
                                                <Linkedin className="h-3.5 w-3.5" />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-sm text-indigo-600 mb-2">{founder.title}</p>
                                    <p className="text-sm text-slate-600 leading-relaxed">{founder.background}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Funding */}
            {enrichment.funding && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <h4 className="text-base font-semibold text-slate-900">Funding</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-xs text-green-700 font-medium mb-1">Total Raised</p>
                            <p className="text-2xl font-bold text-green-900">{enrichment.funding.totalRaised}</p>
                        </div>
                        <div>
                            <p className="text-xs text-green-700 font-medium mb-1">Last Round</p>
                            <p className="text-lg font-semibold text-green-900">{enrichment.funding.lastRound}</p>
                            <p className="text-xs text-green-700">{enrichment.funding.lastRoundDate}</p>
                        </div>
                    </div>
                    {enrichment.funding.investors.length > 0 && (
                        <div>
                            <p className="text-xs text-green-700 font-medium mb-2">Investors</p>
                            <div className="flex flex-wrap gap-2">
                                {enrichment.funding.investors.map((investor, index) => (
                                    <span key={index} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-green-800 border border-green-200">
                                        {investor}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Recent News */}
            {enrichment.recentNews && enrichment.recentNews.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Newspaper className="h-5 w-5 text-indigo-600" />
                        <h4 className="text-base font-semibold text-slate-900">Recent News</h4>
                    </div>
                    <div className="space-y-3">
                        {enrichment.recentNews.map((news, index) => (
                            <div key={index} className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-medium text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">
                                            {news.title}
                                        </h5>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="font-medium text-indigo-600">{news.source}</span>
                                            <span>•</span>
                                            <span>{new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                    {news.url && (
                                        <a
                                            href={news.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-shrink-0 text-slate-400 hover:text-indigo-600"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tech Stack & Competitors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tech Stack */}
                {enrichment.techStack && enrichment.techStack.length > 0 && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Cpu className="h-5 w-5 text-indigo-600" />
                            <h4 className="text-base font-semibold text-slate-900">Tech Stack</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {enrichment.techStack.map((tech, index) => (
                                <span key={index} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Competitors */}
                {enrichment.competitors && enrichment.competitors.length > 0 && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="h-5 w-5 text-indigo-600" />
                            <h4 className="text-base font-semibold text-slate-900">Competitors</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {enrichment.competitors.map((competitor, index) => (
                                <span key={index} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
                                    {competitor}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Employee Growth */}
            {enrichment.employeeGrowth && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm p-4">
                    <div className="flex items-center gap-3">
                        <Users2 className="h-5 w-5 text-blue-600" />
                        <div>
                            <p className="text-xs text-blue-700 font-medium">Employee Growth</p>
                            <p className="text-lg font-bold text-blue-900">{enrichment.employeeGrowth}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
