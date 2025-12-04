"use client";

import { FileText, X } from "lucide-react";

interface PendingFilePreviewProps {
  file: File;
  onRemove: () => void;
}

export function PendingFilePreview({ file, onRemove }: PendingFilePreviewProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (extension === 'pdf') {
      return (
        <div className="flex-shrink-0 w-8 h-8 bg-red-50 rounded flex items-center justify-center">
          <FileText className="w-4 h-4 text-red-600" />
        </div>
      );
    } else if (extension === 'pptx' || extension === 'ppt') {
      return (
        <div className="flex-shrink-0 w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
          <FileText className="w-4 h-4 text-orange-600" />
        </div>
      );
    }

    return (
      <div className="flex-shrink-0 w-8 h-8 bg-slate-50 rounded flex items-center justify-center">
        <FileText className="w-4 h-4 text-slate-600" />
      </div>
    );
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
      {getFileIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">
          {file.name}
        </p>
        <p className="text-xs text-slate-500">
          {formatFileSize(file.size)}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="flex-shrink-0 p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
