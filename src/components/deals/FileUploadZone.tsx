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
                "bg-gradient-to-br from-blue-50/95 to-indigo-50/95 backdrop-blur-sm",
                "border-4 border-dashed rounded-lg",
                "transition-all duration-200 ease-in-out",
                isDragActive && "border-blue-500 bg-blue-50/98",
                isDragReject && "border-red-500 bg-red-50/98"
            )}
        >
            <input {...getInputProps()} />

            <div className="text-center px-8 py-12">
                <div className={cn(
                    "mx-auto w-20 h-20 mb-4 rounded-full flex items-center justify-center",
                    "transition-all duration-200",
                    isDragReject
                        ? "bg-red-100"
                        : "bg-blue-100"
                )}>
                    {isDragReject ? (
                        <FileText className="w-10 h-10 text-red-600" />
                    ) : (
                        <Upload className={cn(
                            "w-10 h-10 text-blue-600",
                            isDragActive && "animate-bounce"
                        )} />
                    )}
                </div>

                <div className="space-y-2">
                    <p className={cn(
                        "text-2xl font-semibold",
                        isDragReject ? "text-red-700" : "text-blue-700"
                    )}>
                        {isDragReject
                            ? "Invalid file type"
                            : "Drop deck here to analyze"
                        }
                    </p>

                    <p className={cn(
                        "text-sm",
                        isDragReject ? "text-red-600" : "text-blue-600"
                    )}>
                        {isDragReject
                            ? "Only PDF and PPTX files are supported"
                            : `Supports: PDF, PPTX (Max ${maxSize}MB)`
                        }
                    </p>
                </div>

                {!isDragReject && (
                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-blue-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span>AI will automatically analyze your deck</span>
                    </div>
                )}
            </div>
        </div>
    );
}
