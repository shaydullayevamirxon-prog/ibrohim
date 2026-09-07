import React, { useState } from 'react';
import { motion } from 'motion/react';
import { History, Star, Trash2, Copy, Check, Calculator, Clock, BookmarkCheck } from 'lucide-react';
import { soundEngine } from '../services/audio';
import { CalculationHistoryItem, FormulaItem, LawItem } from '../types/math';
import { GRADES_DATA } from '../data/gradesData';

interface HistoryAndFavoritesProps {
  history: CalculationHistoryItem[];
  onClearHistory: () => void;
  favorites: string[];
  onRemoveFavorite: (id: string) => void;
}

export const HistoryAndFavorites: React.FC<HistoryAndFavoritesProps> = ({
  history,
  onClearHistory,
  favorites,
  onRemoveFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'favorites'>('history');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyText = (id: string, text: string) => {
    soundEngine.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Find favorite items details
  const favoriteItems = React.useMemo(() => {
    const list: (FormulaItem | LawItem)[] = [];
    Object.values(GRADES_DATA).forEach((g) => {
      g.laws.forEach((l) => {
        if (favorites.includes(l.id)) list.push(l);
      });
      g.formulas.forEach((f) => {
        if (favorites.includes(f.id)) list.push(f);
      });
    });
    return list;
  }, [favorites]);

  return (
    <div id="history-favorites-module" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('history');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                activeTab === 'history'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Hisob-kitoblar Tarixi ({history.length})</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('favorites');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                activeTab === 'favorites'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Saqlangan Formulalar ({favorites.length})</span>
            </button>
          </div>
        </div>

        {activeTab === 'history' && history.length > 0 && (
          <button
            onClick={() => {
              soundEngine.playClick();
              if (confirm("Haqiqatan ham barcha hisoblashlar tarixini tozalamoqchimisiz?")) {
                onClearHistory();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Tarixni tozalash</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'history' ? (
          history.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Calculator className="w-8 h-8 mx-auto opacity-50" />
              <p className="text-sm font-medium">Hozircha hech qanday hisob-kitob saqlanmagan</p>
              <p className="text-xs">Kalkulyatorda biror misol yechsangiz, u avtomatik tarzda shu yerga saqlanadi.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold">
                        {item.calculatorType}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3" />
                        {new Date(item.timestamp).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-sm font-semibold font-mono text-slate-800 dark:text-slate-200">
                      {item.inputSummary}
                    </div>
                    <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      Javob: {item.result}
                    </div>
                  </div>

                  <button
                    onClick={() => copyText(item.id, `${item.inputSummary} => ${item.result}`)}
                    className="self-end sm:self-center p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:text-indigo-600 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? "Nusxalandi" : "Nusxa"}</span>
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          favoriteItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Star className="w-8 h-8 mx-auto opacity-50 text-amber-400" />
              <p className="text-sm font-medium">Sevimlilar ro&apos;yxati bo&apos;sh</p>
              <p className="text-xs">Formulalar yoki qonunlar yonidagi yulduzcha tugmasini bosib shu yerga qo&apos;shishingiz mumkin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteItems.map((item) => {
                const expr = 'formula' in item ? item.formula : item.expression;
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {item.grade}-sinf
                      </span>
                      <button
                        onClick={() => onRemoveFavorite(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                        title="Sevimlilardan o'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{item.title}</h4>
                    <div className="p-2.5 rounded-xl bg-slate-900 text-amber-300 font-mono text-sm font-semibold select-all">
                      {expr}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};
