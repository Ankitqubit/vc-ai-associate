"use client";

import { FileText } from "lucide-react";

interface ChatFileAttachmentProps {
  fileName: string;
  fileSize: number;
  fileType?: string;
}

export function ChatFileAttachment({ fileName, fileSize, fileType }: ChatFileAttachmentProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    if (extension === 'pdf') {
      return (
        <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded flex items-center justify-center">
          <FileText className="w-4 h-4 text-red-600" />
        </div>
      );
    } else if (extension === 'pptx' || extension === 'ppt') {
      return (
        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
          <FileText className="w-4 h-4 text-orange-600" />
        </div>
      );
    }

    return (
      <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded flex items-center justify-center">
        <FileText className="w-4 h-4 text-white" />
      </div>
    );
  };

  return (
    <div className="inline-flex items-center gap-3 px-3 py-2 bg-white/10 border border-white/20 rounded-lg">
      {getFileIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {fileName}
        </p>
        <p className="text-xs text-white/70">
          {formatFileSize(fileSize)}
        </p>
      </div>
    </div>
  );
}
