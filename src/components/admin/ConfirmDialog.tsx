"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, HelpCircle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] bg-[#0a0a0a] border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
        <DialogHeader className="space-y-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
            variant === "destructive" ? "bg-red-500/10 text-red-500" : "bg-[#be1e2e]/10 text-[#be1e2e]"
          }`}>
            {variant === "destructive" ? (
              <AlertCircle className="w-7 h-7" />
            ) : (
              <HelpCircle className="w-7 h-7" />
            )}
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-white">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm font-bold text-white/40 leading-relaxed">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-8 flex gap-3 sm:justify-start">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs text-white/40 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${
              variant === "destructive" 
                ? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20" 
                : "bg-[#be1e2e] hover:bg-[#a01824] text-white shadow-[#be1e2e]/20"
            }`}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
