"use client";

import { cn } from '@/lib/utils';
import { FileText, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FilePreviewCardProps {
    file: File;
    uploadProgress?: number; // 0-100
    status: 'uploading' | 'parsing' | 'success' | 'error';
    onRemove: () => void;
    errorMessage?: string;
}

export function FilePreviewCard({
    file,
    uploadProgress = 0,
    status,
    onRemove,
    errorMessage
}: FilePreviewCardProps) {
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'uploading':
                return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
            case 'parsing':
                return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
            case 'success':
                return <CheckCircle2 className="w-4 h-4 text-green-600" />;
            case 'error':
                return <AlertCircle className="w-4 h-4 text-red-600" />;
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'uploading':
                return 'Uploading...';
            case 'parsing':
                return 'Analyzing deck...';
            case 'success':
                return 'Ready';
            case 'error':
                return errorMessage || 'Upload failed';
        }
    };

    const getFileIcon = () => {
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (extension === 'pdf') {
            return (
                <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-600" />
                </div>
            );
        } else if (extension === 'pptx' || extension === 'ppt') {
            return (
                <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-600" />
                </div>
            );
        }

        return (
            <div className="flex-shrink-0 w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-slate-600" />
            </div>
        );
    };

    return (
        <div className={cn(
            "relative flex items-start gap-3 p-3 rounded-lg border",
            "transition-all duration-200",
            status === 'error'
                ? "bg-red-50 border-red-200"
                : status === 'success'
                    ? "bg-green-50 border-green-200"
                    : "bg-blue-50 border-blue-200"
        )}>
            {/* File Icon */}
            {getFileIcon()}

            {/* File Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <p className={cn(
                            "text-sm font-medium truncate",
                            status === 'error' ? "text-red-900" : "text-slate-900"
                        )}>
                            {file.name}
                        </p>
                        <p className={cn(
                            "text-xs mt-0.5",
                            status === 'error' ? "text-red-600" : "text-slate-500"
                        )}>
                            {formatFileSize(file.size)}
                        </p>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onRemove();
                        }}
                        className={cn(
                            "flex-shrink-0 p-1 rounded hover:bg-white/50 transition-colors",
                            status === 'error' ? "text-red-600" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Status and Progress */}
                <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon()}
                        <span className={cn(
                            "text-xs font-medium",
                            status === 'error' ? "text-red-700" :
                            status === 'success' ? "text-green-700" : "text-blue-700"
                        )}>
                            {getStatusText()}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    {(status === 'uploading' || status === 'parsing') && (
                        <div className="w-full bg-white/50 rounded-full h-1.5 overflow-hidden">
                            <div
                                className={cn(
                                    "h-full transition-all duration-300 ease-out rounded-full",
                                    status === 'parsing'
                                        ? "bg-blue-600 animate-pulse"
                                        : "bg-blue-600"
                                )}
                                style={{
                                    width: status === 'parsing' ? '100%' : `${uploadProgress}%`,
                                }}
                            />
                        </div>
                    )}

                    {/* Progress Percentage (only for uploading) */}
                    {status === 'uploading' && (
                        <p className="text-xs text-blue-600 mt-1">
                            {Math.round(uploadProgress)}%
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
