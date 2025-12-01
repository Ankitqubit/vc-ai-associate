import React from "react";
import { CheckCircle2, Building2, Users } from "lucide-react";

interface CompanyUpdateCardProps {
    companyName?: string;
    teamSize?: number;
    status: "inProgress" | "complete" | "error";
    result?: string;
}

export function CompanyUpdateCard({ companyName, teamSize, status, result }: CompanyUpdateCardProps) {
    return (
        <div className={`p-4 rounded-lg border ${status === 'error' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'} shadow-sm`}>
            <div className="flex items-center gap-2 mb-2">
                {status === 'complete' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : status === 'error' ? (
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">!</div>
                ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                )}
                <span className={`font-medium ${status === 'error' ? 'text-red-700' : 'text-gray-900'}`}>
                    {status === 'inProgress' ? 'Updating Company Info...' : status === 'error' ? 'Failed to Update' : 'Company Info Updated'}
                </span>
            </div>

            <div className="space-y-2 ml-7">
                {companyName && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span>Name: <span className="font-medium text-gray-900">{companyName}</span></span>
                    </div>
                )}
                {teamSize !== undefined && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>Team Size: <span className="font-medium text-gray-900">{teamSize} employees</span></span>
                    </div>
                )}
            </div>

            {status === 'error' && (
                <div className="mt-3 ml-7 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-100">
                    {result}
                </div>
            )}
        </div>
    );
}
