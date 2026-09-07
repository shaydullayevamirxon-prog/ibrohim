import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../services/audio';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import newtonImg from '../assets/images/newton_apple_tree_1788780513756.jpg';

interface NewtonIntroProps {
  onComplete: () => void;
  autoDismissTime?: number;
}

export const NewtonIntro: React.FC<NewtonIntroProps> = ({
  onComplete,
  autoDismissTime = 4200
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [appleDropped, setAppleDropped] = useState(false);

  useEffect(() => {
    // Play apple drop sound slightly after appear
    const soundTimer = setTimeout(() => {
      setAppleDropped(true);
      soundEngine.playAppleDrop();
    }, 700);

    // Auto fade out
    const dismissTimer = setTimeout(() => {
      handleClose();
    }, autoDismissTime);

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(dismissTimer);
    };
  }, [autoDismissTime]);

  const handleClose = () => {
    soundEngine.playClick();
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="newton-intro-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md"
        >
          {/* Card containing Newton under the tree - not full screen, elegant focused card */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white/95 dark:bg-slate-900/95 border border-amber-200/50 dark:border-amber-500/20 rounded-3xl shadow-2xl overflow-hidden text-center p-6 sm:p-8"
          >
            {/* Ambient decorative glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Illustration container */}
            <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-inner border border-amber-300/40 dark:border-amber-500/30 group">
              <img
                src={newtonImg}
                alt="Sir Isaac Newton olma daraxti ostida"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform scale-105 transition-transform duration-1000 ease-out"
              />
              
              {/* Falling Golden Apple animation */}
              <AnimatePresence>
                {appleDropped && (
                  <motion.div
                    initial={{ y: -60, opacity: 0, rotate: 0 }}
                    animate={{ 
                      y: [ -50, 90, 80, 95 ],
                      opacity: 1,
                      rotate: [ 0, 15, -10, 5 ]
                    }}
                    transition={{
                      duration: 0.85,
                      times: [0, 0.6, 0.8, 1],
                      ease: "easeOut"
                    }}
                    className="absolute top-6 left-1/2 -translate-x-1/2 z-10 filter drop-shadow-md text-2xl select-none pointer-events-none"
                  >
                    🍎
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-medium border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Kashfiyot lahzasi
                </span>
              </div>
            </div>

            {/* Title & Quote */}
            <div className="mt-5 space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-800 dark:text-slate-100">
                Nyutonning Olma Daraxti
              </h2>
              <p className="text-sm italic text-slate-600 dark:text-slate-300 font-serif leading-relaxed px-2">
                &ldquo;Agar men boshqalardan uzoqroqni ko&apos;rgan bo&apos;lsam, bu gigantlar yelkasida turganim tufaylidir.&rdquo;
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold tracking-wide">
                — Sir Isaak Nyuton (1643–1727)
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>1-sinfdan 11-sinfgacha barcha algebra qonunlari</span>
            </div>

            {/* Action button to enter immediately */}
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                id="enter-platform-btn"
                onClick={handleClose}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:scale-[0.98] text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <span>Platformaga Kirish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
