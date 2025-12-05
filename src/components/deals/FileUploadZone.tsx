"use client";

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Upload, FileText } from 'lucide-react';

interface FileUploadZoneProps {
    isActive: boolean;
    onDrop: (files: File[]) => void;
    acceptedTypes?: string[];
    maxSize?: number; // in MB
}

export function FileUploadZone({
    isActive,
    onDrop,
    acceptedTypes = ['.pdf', '.pptx', '.ppt'],
    maxSize = 50
}: FileUploadZoneProps) {
    const onDropAccepted = useCallback((acceptedFiles: File[]) => {
        onDrop(acceptedFiles);
    }, [onDrop]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
    } = useDropzone({
        onDropAccepted,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
            'application/vnd.ms-powerpoint': ['.ppt'],
        },
        maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
        multiple: true,
        noClick: true, // Prevent click to open file picker (we handle this via paperclip)
    });

    if (!isActive && !isDragActive) {
        return null;
    }

    return (
        <div
            {...getRootProps()}
            className={cn(
                "absolute inset-0 z-50 flex items-center justify-center",
                "bg-gradient-to-br from-indigo-50/98 via-blue-50/98 to-purple-50/98 backdrop-blur-md",
                "border-4 border-dashed rounded-2xl",
                "transition-all duration-300 ease-in-out",
                "shadow-2xl",
                isDragActive && "border-indigo-500 bg-indigo-50/99 scale-[1.02]",
                isDragReject && "border-red-500 bg-red-50/98"
            )}
        >
            <input {...getInputProps()} />

            <div className="text-center px-8 py-16 relative">
                {/* Animated background circles */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className={cn(
                        "absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500 rounded-full blur-3xl",
                        isDragActive && "animate-pulse"
                    )} />
                    <div className={cn(
                        "absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500 rounded-full blur-3xl",
                        isDragActive && "animate-pulse"
                    )} style={{ animationDelay: "0.3s" }} />
                </div>

                <div className={cn(
                    "relative mx-auto w-24 h-24 mb-6 rounded-2xl flex items-center justify-center",
                    "transition-all duration-300 shadow-lg",
                    isDragReject
                        ? "bg-red-100 shadow-red-200"
                        : "bg-gradient-to-br from-indigo-100 to-blue-100 shadow-indigo-200",
                    isDragActive && "scale-110 rotate-3"
                )}>
                    {isDragReject ? (
                        <FileText className="w-12 h-12 text-red-600" />
                    ) : (
                        <Upload className={cn(
                            "w-12 h-12 text-indigo-600",
                            isDragActive && "animate-bounce"
                        )} />
                    )}
                </div>

                <div className="relative space-y-3">
                    <p className={cn(
                        "text-3xl font-bold tracking-tight",
                        isDragReject ? "text-red-700" : "text-indigo-700"
                    )}>
                        {isDragReject
                            ? "Invalid file type"
                            : "Drop your pitch deck here"
                        }
                    </p>

                    <p className={cn(
                        "text-base font-medium",
                        isDragReject ? "text-red-600" : "text-indigo-600/80"
                    )}>
                        {isDragReject
                            ? "Only PDF and PPTX files are supported"
                            : `Supports PDF & PPTX up to ${maxSize}MB`
                        }
                    </p>
                </div>

                {!isDragReject && (
                    <div className="relative mt-10 space-y-4">
                        <div className="flex items-center justify-center gap-2 text-sm text-indigo-600 font-medium">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                            <span>AI-powered analysis will start automatically</span>
                        </div>

                        <div className="flex items-center justify-center gap-6 text-xs text-indigo-500/70">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                <span>Extract key metrics</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                <span>Generate fit score</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                <span>Create deal profile</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
