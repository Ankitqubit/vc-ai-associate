"use client";

import { FileText, X, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

interface PendingFilePreviewProps {
  file: File;
  onRemove: () => void;
  uploading?: boolean;
}

export function PendingFilePreview({ file, onRemove, uploading = false }: PendingFilePreviewProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (uploading && uploadProgress < 100) {
      // Simulate smooth upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const next = prev + Math.random() * 15;
          if (next >= 100) {
            setIsComplete(true);
            clearInterval(interval);
            return 100;
          }
          return next;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [uploading, uploadProgress]);

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
        <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center transition-all">
          <FileText className="w-5 h-5 text-red-600" />
        </div>
      );
    } else if (extension === 'pptx' || extension === 'ppt') {
      return (
        <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center transition-all">
          <FileText className="w-5 h-5 text-orange-600" />
        </div>
      );
    }

    return (
      <div className="flex-shrink-0 w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center transition-all">
        <FileText className="w-5 h-5 text-slate-600" />
      </div>
    );
  };

  return (
    <div className="group relative flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all">
      {getFileIcon()}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-slate-900 truncate">
            {file.name}
          </p>
          {isComplete && (
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 animate-in fade-in zoom-in duration-300" />
          )}
        </div>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-slate-500">
            {formatFileSize(file.size)}
          </p>

          {uploading && !isComplete && (
            <>
              <span className="text-xs text-slate-300">•</span>
              <p className="text-xs text-indigo-600 font-medium">
                {Math.round(uploadProgress)}% uploaded
              </p>
            </>
          )}

          {isComplete && (
            <>
              <span className="text-xs text-slate-300">•</span>
              <p className="text-xs text-green-600 font-medium">
                Ready to analyze
              </p>
            </>
          )}
        </div>

        {/* Progress bar */}
        {uploading && (
          <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      <button
        onClick={onRemove}
        disabled={uploading && !isComplete}
        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
