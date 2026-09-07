import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Star, 
  Copy, 
  Check, 
  Lightbulb, 
  Compass, 
  Sparkles,
  BookmarkCheck,
  ChevronRight
} from 'lucide-react';
import { soundEngine } from '../services/audio';
import { GRADES_DATA } from '../data/gradesData';
import { GradeNumber, FormulaItem, LawItem, ExampleProblem } from '../types/math';

interface GradeCatalogProps {
  selectedGrade: GradeNumber;
  onSelectGrade: (grade: GradeNumber) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const GradeCatalog: React.FC<GradeCatalogProps> = ({
  selectedGrade,
  onSelectGrade,
  searchQuery,
  onSearchChange,
  favorites,
  onToggleFavorite
}) => {
  const [activeTab, setActiveTab] = useState<'laws' | 'formulas' | 'examples'>('laws');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentGradeInfo = GRADES_DATA[selectedGrade];

  // Search filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();

    const matchedLaws: { law: LawItem; grade: GradeNumber }[] = [];
    const matchedFormulas: { formula: FormulaItem; grade: GradeNumber }[] = [];
    const matchedExamples: { example: ExampleProblem; grade: GradeNumber }[] = [];

    (Object.keys(GRADES_DATA) as unknown as GradeNumber[]).forEach((g) => {
      const info = GRADES_DATA[g];
      info.laws.forEach((law) => {
        if (
          law.title.toLowerCase().includes(q) ||
          law.formula.toLowerCase().includes(q) ||
          law.statement.toLowerCase().includes(q) ||
          law.explanation.toLowerCase().includes(q)
        ) {
          matchedLaws.push({ law, grade: g });
        }
      });

      info.formulas.forEach((formula) => {
        if (
          formula.title.toLowerCase().includes(q) ||
          formula.expression.toLowerCase().includes(q) ||
          formula.description.toLowerCase().includes(q) ||
          formula.category.toLowerCase().includes(q)
        ) {
          matchedFormulas.push({ formula, grade: g });
        }
      });

      info.examples.forEach((example) => {
        if (
          example.topic.toLowerCase().includes(q) ||
          example.problem.toLowerCase().includes(q) ||
          example.answer.toLowerCase().includes(q)
        ) {
          matchedExamples.push({ example, grade: g });
        }
      });
    });

    return { matchedLaws, matchedFormulas, matchedExamples };
  }, [searchQuery]);

  const copyText = (id: string, text: string) => {
    soundEngine.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="grade-catalog-module" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
      {/* Search and Grade Navigation Header */}
      <div className="space-y-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              1-11 Sinf To&apos;liq Standart Dastur
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Qonunlar, Formulalar va Misollar Ensiklopediyasi
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Qonun yoki formulani qidiring (masalan: diskriminant, Viyet, integral)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm placeholder:text-slate-400 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Tozalash
              </button>
            )}
          </div>
        </div>

        {/* Grade Buttons 1-11 */}
        {!searchResults && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as GradeNumber[]).map((g) => {
              const isSelected = selectedGrade === g;
              return (
                <button
                  key={g}
                  onClick={() => {
                    soundEngine.playClick();
                    onSelectGrade(g);
                  }}
                  className={`flex flex-col items-center justify-center min-w-[76px] py-2.5 px-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-indigo-600 to-indigo-700 text-white border-indigo-600 shadow-lg shadow-indigo-600/25 scale-105'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="text-base font-bold font-mono">{g}</span>
                  <span className="text-[10px] tracking-wider uppercase opacity-85">Sinf</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* SEARCH MODE DISPLAY */}
      {searchResults ? (
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>
              &quot;<b className="text-indigo-600 dark:text-indigo-400">{searchQuery}</b>&quot; bo&apos;yicha topilgan natijalar:
            </span>
            <button
              onClick={() => onSearchChange('')}
              className="text-xs text-indigo-500 underline cursor-pointer"
            >
              Barcha sinflarga qaytish
            </button>
          </div>

          {/* Matched Laws */}
          {searchResults.matchedLaws.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Topilgan Qonunlar ({searchResults.matchedLaws.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.matchedLaws.map(({ law, grade }) => (
                  <div
                    key={law.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-semibold">
                        {grade}-sinf
                      </span>
                      <button
                        onClick={() => copyText(law.id, law.formula)}
                        className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === law.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === law.id ? 'Nusxalandi' : 'Nusxa'}</span>
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{law.title}</h4>
                    <div className="p-2.5 rounded-xl bg-slate-900 text-indigo-300 font-mono text-sm">
                      {law.formula}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{law.statement}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Formulas */}
          {searchResults.matchedFormulas.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-indigo-500" />
                Topilgan Formulalar ({searchResults.matchedFormulas.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.matchedFormulas.map(({ formula, grade }) => (
                  <div
                    key={formula.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 font-semibold">
                        {grade}-sinf • {formula.category}
                      </span>
                      <button
                        onClick={() => copyText(formula.id, formula.expression)}
                        className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === formula.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === formula.id ? 'Nusxalandi' : 'Nusxa'}</span>
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{formula.title}</h4>
                    <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-sm">
                      {formula.expression}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{formula.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.matchedLaws.length === 0 && searchResults.matchedFormulas.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              Hech qanday formula yoki qonun topilmadi. So&apos;zni tekshirib qayta urinib ko&apos;ring.
            </div>
          )}
        </div>
      ) : (
        /* NORMAL GRADE VIEW */
        <div className="mt-6 space-y-6">
          {/* Current Grade Card Overview */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                  Davlat ta&apos;lim standarti
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mt-0.5 text-white">
                  {currentGradeInfo.title}
                </h3>
                <p className="text-sm text-indigo-200/80 mt-1 max-w-xl">
                  {currentGradeInfo.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 max-w-xs">
                {currentGradeInfo.topics.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-700/50 text-[11px] text-indigo-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Subtabs: Qonunlar, Formulalar, Namunaviy misollar */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('laws');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'laws'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Matematik Qonunlar ({currentGradeInfo.laws.length})
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('formulas');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'formulas'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Formulalar ({currentGradeInfo.formulas.length})
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('examples');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'examples'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Namunaviy Misollar ({currentGradeInfo.examples.length})
            </button>
          </div>

          {/* Tab 1: LAWS */}
          {activeTab === 'laws' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentGradeInfo.laws.map((law) => {
                const isFav = favorites.includes(law.id);
                return (
                  <motion.div
                    key={law.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400/50 transition-all shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {law.title}
                      </h4>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onToggleFavorite(law.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isFav ? 'text-amber-500' : 'text-slate-400 hover:text-amber-400'
                          }`}
                          title="Sevimlilarga saqlash"
                        >
                          <Star className={`w-4 h-4 ${isFav ? 'fill-amber-500' : ''}`} />
                        </button>
                        <button
                          onClick={() => copyText(law.id, law.formula)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                          title="Formuladan nusxa olish"
                        >
                          {copiedId === law.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-sm sm:text-base font-semibold text-center select-all">
                      {law.formula}
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <p><b className="text-indigo-600 dark:text-indigo-400">Ta&apos;rif:</b> {law.statement}</p>
                      <p><b className="text-slate-700 dark:text-slate-200">Tushuntirish:</b> {law.explanation}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Compass className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{law.realWorldApplication}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Tab 2: FORMULAS */}
          {activeTab === 'formulas' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentGradeInfo.formulas.map((form) => {
                const isFav = favorites.includes(form.id);
                return (
                  <motion.div
                    key={form.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400/50 transition-all shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          {form.category}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
                          {form.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onToggleFavorite(form.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isFav ? 'text-amber-500' : 'text-slate-400 hover:text-amber-400'
                          }`}
                          title="Sevimlilarga qo'shish"
                        >
                          <Star className={`w-4 h-4 ${isFav ? 'fill-amber-500' : ''}`} />
                        </button>
                        <button
                          onClick={() => copyText(form.id, form.expression)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                          title="Formuladan nusxa olish"
                        >
                          {copiedId === form.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base font-semibold text-center select-all">
                      {form.expression}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {form.description}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      <b className="text-indigo-600 dark:text-indigo-400">Namunaviy qo&apos;llanish: </b>
                      {form.example}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Tab 3: EXAMPLES */}
          {activeTab === 'examples' && (
            <div className="space-y-4">
              {currentGradeInfo.examples.map((ex) => (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-semibold">
                      {ex.topic}
                    </span>
                    <span className="text-xs text-slate-400">To&apos;liq yechimi bilan</span>
                  </div>

                  <div className="text-base font-semibold text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                    {ex.problem}
                  </div>

                  {/* Step by step */}
                  <div className="space-y-2 pl-3 border-l-2 border-indigo-500/40">
                    {ex.steps.map((step, sIdx) => (
                      <div key={sIdx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-mono">
                        {step}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-semibold">
                    Javob: {ex.answer}
                  </div>

                  {ex.tip && (
                    <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400">
                      <Lightbulb className="w-4 h-4 flex-shrink-0" />
                      <span>{ex.tip}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
