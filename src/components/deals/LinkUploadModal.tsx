"use client";

import { useState } from "react";
import { X, Link2, ExternalLink, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface LinkUploadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
}

const SUPPORTED_SERVICES = [
  { name: "DocSend", domain: "docsend.com", icon: "📄" },
  { name: "Google Drive", domain: "drive.google.com", icon: "📁" },
  { name: "Dropbox", domain: "dropbox.com", icon: "📦" },
  { name: "OneDrive", domain: "onedrive.live.com", icon: "☁️" }
];

export function LinkUploadModal({ open, onClose, onSubmit }: LinkUploadModalProps) {
  const [url, setUrl] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [detectedService, setDetectedService] = useState<string | null>(null);

  const validateUrl = (value: string) => {
    if (!value) {
      setIsValid(null);
      setDetectedService(null);
      return;
    }

    setIsValidating(true);

    // Simulate validation delay
    setTimeout(() => {
      try {
        const urlObj = new URL(value);
        const service = SUPPORTED_SERVICES.find(s => urlObj.hostname.includes(s.domain));

        if (service) {
          setIsValid(true);
          setDetectedService(service.name);
        } else {
          setIsValid(false);
          setDetectedService(null);
        }
      } catch {
        setIsValid(false);
        setDetectedService(null);
      }

      setIsValidating(false);
    }, 500);
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    validateUrl(value);
  };

  const handleSubmit = () => {
    if (isValid && url) {
      onSubmit(url);
      setUrl("");
      setIsValid(null);
      setDetectedService(null);
      onClose();
    }
  };

  const handleClose = () => {
    setUrl("");
    setIsValid(null);
    setDetectedService(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">Import from Link</DialogTitle>
              <p className="text-sm text-slate-500 mt-1">
                Paste a link to your pitch deck
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Deck URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://docsend.com/view/..."
                className={cn(
                  "w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 transition-all",
                  isValid === null && "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500",
                  isValid === true && "border-green-300 bg-green-50/50 focus:ring-green-500/20 focus:border-green-500",
                  isValid === false && "border-red-300 bg-red-50/50 focus:ring-red-500/20 focus:border-red-500"
                )}
                autoFocus
              />

              {/* Validation Indicator */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValidating && (
                  <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                )}
                {!isValidating && isValid === true && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 animate-in zoom-in duration-200" />
                )}
                {!isValidating && isValid === false && (
                  <X className="w-5 h-5 text-red-600 animate-in zoom-in duration-200" />
                )}
              </div>
            </div>

            {/* Service Detection */}
            {detectedService && (
              <div className="flex items-center gap-2 text-sm text-green-700 animate-in fade-in slide-in-from-top-1 duration-300">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium">{detectedService} link detected</span>
              </div>
            )}

            {/* Error Message */}
            {isValid === false && url && !isValidating && (
              <div className="flex items-center gap-2 text-sm text-red-700 animate-in fade-in slide-in-from-top-1 duration-300">
                <X className="w-4 h-4" />
                <span>Please enter a valid link from supported services</span>
              </div>
            )}
          </div>

          {/* Supported Services */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Supported Services
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SUPPORTED_SERVICES.map((service) => (
                <div
                  key={service.domain}
                  className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-indigo-200 transition-colors"
                >
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{service.name}</p>
                    <p className="text-xs text-slate-500">{service.domain}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex gap-3">
              <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">How it works</p>
                <p className="text-blue-700">
                  We'll securely fetch your deck from the link and analyze it just like an uploaded file.
                  Make sure the link is publicly accessible or you have permission to share it.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid || isValidating}
              className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4 mr-2" />
                  Import from Link
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
