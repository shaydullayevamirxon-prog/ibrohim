import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Send, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { soundEngine } from '../services/audio';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareText: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareText
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://algebramat.uz';

  const handleCopy = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(`${shareText}\n\nPlatforma: ${currentUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToTelegram = () => {
    soundEngine.playClick();
    const encoded = encodeURIComponent(`${shareText}\n\nPlatforma: ${currentUrl}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encoded}`, '_blank');
  };

  const shareToWhatsApp = () => {
    soundEngine.playClick();
    const encoded = encodeURIComponent(`${shareText}\n\nPlatforma: ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Share2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Natijani Do&apos;stlar Bilan Ulashish
              </h3>
              <p className="text-xs text-slate-500">
                Telegram, WhatsApp yoki to&apos;g&apos;ridan-to&apos;g&apos;ri havola orqali
              </p>
            </div>
          </div>

          {/* Preview box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
            {shareText}
          </div>

          {/* Share Actions */}
          <div className="mt-6 space-y-2.5">
            <button
              onClick={shareToTelegram}
              className="w-full py-3 px-4 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white text-sm font-semibold flex items-center justify-center gap-2.5 shadow-md shadow-[#2AABEE]/25 cursor-pointer transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Telegram orqali ulashish</span>
            </button>

            <button
              onClick={shareToWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold flex items-center justify-center gap-2.5 shadow-md shadow-[#25D366]/25 cursor-pointer transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp orqali ulashish</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-semibold flex items-center justify-center gap-2.5 cursor-pointer transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Nusxalandi!" : "Matndan nusxa olish"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
