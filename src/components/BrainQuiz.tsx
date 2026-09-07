import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Brain, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Share2, 
  Flame, 
  Clock, 
  Award,
  ChevronRight
} from 'lucide-react';
import { soundEngine } from '../services/audio';
import { GRADES_DATA } from '../data/gradesData';
import { GradeNumber, QuizQuestion } from '../types/math';

interface BrainQuizProps {
  initialGrade?: GradeNumber;
  onShareResult: (scoreText: string) => void;
  onUpdateScore: (points: number) => void;
}

export const BrainQuiz: React.FC<BrainQuizProps> = ({
  initialGrade = 7,
  onShareResult,
  onUpdateScore
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeNumber | 'all'>(initialGrade);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timer, setTimer] = useState(30);

  // Load questions based on grade
  const loadQuestions = () => {
    let pool: QuizQuestion[] = [];
    if (selectedGrade === 'all') {
      (Object.keys(GRADES_DATA) as unknown as GradeNumber[]).forEach((g) => {
        pool.push(...GRADES_DATA[g].quiz);
      });
    } else {
      pool = [...GRADES_DATA[selectedGrade].quiz];
    }

    // Add supplementary dynamic math brain teasers if pool is small
    if (pool.length < 5) {
      pool.push({
        id: 'dyn_1',
        grade: selectedGrade === 'all' ? 7 : selectedGrade,
        topic: 'Mantiqiy charxlash',
        question: 'Qaysi sonning kvadrati uning ikkilanganidan 8 ga ortiq? (x² = 2x + 8)',
        options: ['2 yoki -4', '4 yoki -2', '3 yoki -3', '5'],
        correctIndex: 1,
        explanation: 'x² - 2x - 8 = 0 => (x - 4)(x + 2) = 0 => x = 4 yoki x = -2.',
        difficulty: 'orta'
      });
      pool.push({
        id: 'dyn_2',
        grade: selectedGrade === 'all' ? 8 : selectedGrade,
        topic: 'Tezkor hisob',
        question: '99² ning qiymatini qisqa ko\'paytirish bilan tez hisoblang: (100 - 1)²',
        options: ['9801', '9811', '9901', '9701'],
        correctIndex: 0,
        explanation: '(100 - 1)² = 10000 - 200 + 1 = 9801.',
        difficulty: 'orta'
      });
      pool.push({
        id: 'dyn_3',
        grade: selectedGrade === 'all' ? 5 : selectedGrade,
        topic: 'Kasrlar va foiz',
        question: 'Sonning 25% i 15 ga teng bo\'lsa, uning 50% i nechaga teng?',
        options: ['30', '45', '60', '75'],
        correctIndex: 0,
        explanation: '50% - bu 25% dan 2 barobar ko\'p: 15 · 2 = 30.',
        difficulty: 'oson'
      });
    }

    // Shuffle questions
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setIsFinished(false);
    setTimer(30);
  };

  useEffect(() => {
    loadQuestions();
  }, [selectedGrade]);

  // Timer effect
  useEffect(() => {
    if (isFinished || isAnswered || questions.length === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnswered, isFinished, questions.length]);

  const handleTimeOut = () => {
    soundEngine.playWrong();
    setIsAnswered(true);
    setStreak(0);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered || isFinished) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      soundEngine.playCorrect();
      const points = 10 + streak * 2;
      setScore((prev) => prev + points);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
      onUpdateScore(points);

      // Streak celebration
      if (nextStreak >= 3) {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.8 }
        });
      }
    } else {
      soundEngine.playWrong();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    soundEngine.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimer(30);
    } else {
      // Finished quiz!
      setIsFinished(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleShare = () => {
    soundEngine.playClick();
    const gradeLabel = selectedGrade === 'all' ? "Barcha sinflar (1-11)" : `${selectedGrade}-sinf`;
    const shareText = `🧠 Algebramat aql charxlash testida natijam:\n📚 Yo'nalish: ${gradeLabel}\n🏆 To'plangan ball: ${score}\n🔥 Maksimal ketma-ketlik (streak): ${maxStreak}\n\nO'z kuchingizni Algebramat platformasida sinab ko'ring!`;
    onShareResult(shareText);
  };

  const currentQ = questions[currentIndex];

  return (
    <div id="brain-quiz-section" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
      {/* Header & Grade Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Brain className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Aql Charxlash: Savol-Javob va Testlar
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Matematik mantiq, qonunlar va tezkor hisoblash bo&apos;yicha interaktiv test
          </p>
        </div>

        {/* Grade Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => {
              soundEngine.playClick();
              setSelectedGrade('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              selectedGrade === 'all'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Barchasi (1-11)
          </button>
          {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as GradeNumber[]).map((g) => (
            <button
              key={g}
              onClick={() => {
                soundEngine.playClick();
                setSelectedGrade(g);
              }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                selectedGrade === g
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {g}-sinf
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Body */}
      {!isFinished && currentQ ? (
        <div className="mt-6 space-y-6">
          {/* Status bar */}
          <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">
                Savol: <b className="text-slate-900 dark:text-slate-100">{currentIndex + 1} / {questions.length}</b>
              </span>
              <span className="flex items-center gap-1 text-amber-500">
                <Award className="w-4 h-4" />
                <span>{score} ball</span>
              </span>
              {streak > 1 && (
                <span className="flex items-center gap-1 text-orange-500 font-bold animate-pulse">
                  <Flame className="w-4 h-4" />
                  <span>{streak}x seriya!</span>
                </span>
              )}
            </div>

            {/* Timer countdown */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span className={timer <= 5 ? "text-rose-500 animate-ping" : "text-slate-700 dark:text-slate-200"}>
                {timer}s
              </span>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs text-indigo-300 font-medium mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30">
                {currentQ.topic} ({currentQ.grade}-sinf)
              </span>
              <span className="uppercase tracking-wider opacity-75">{currentQ.difficulty} daraja</span>
            </div>

            <h3 className="text-lg sm:text-2xl font-bold font-serif leading-relaxed text-slate-100">
              {currentQ.question}
            </h3>

            {/* Options grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = "bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200";

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = "bg-emerald-600 border-emerald-400 text-white font-bold shadow-lg shadow-emerald-600/30";
                  } else if (idx === selectedOption) {
                    btnStyle = "bg-rose-600 border-rose-400 text-white";
                  } else {
                    btnStyle = "bg-slate-800/40 border-slate-800 text-slate-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                      <XCircle className="w-5 h-5 text-white flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Next Button */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 pt-5 border-t border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="text-xs text-slate-300">
                    <b className="text-amber-400 block mb-1">Mantiqiy yechim:</b>
                    {currentQ.explanation}
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer whitespace-nowrap"
                  >
                    <span>Keyingi savol</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      ) : isFinished ? (
        /* Finished Results Screen */
        <div className="mt-6 text-center p-8 rounded-3xl bg-gradient-to-br from-indigo-50 dark:from-slate-800 via-white dark:via-slate-900 to-amber-50 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mb-4">
            <Award className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Ajoyib Natija! Test Yakunlandi
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Matematik tafakkuringiz yana bir pog&apos;ona yuqoriladi!
          </p>

          <div className="mt-6 inline-flex items-center gap-6 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md">
            <div>
              <span className="text-xs text-slate-400 block">Jami Ball</span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{score}</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
            <div>
              <span className="text-xs text-slate-400 block">Eng uzun seriya</span>
              <span className="text-2xl font-bold text-orange-500">{maxStreak}x</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
            <div>
              <span className="text-xs text-slate-400 block">Savollar soni</span>
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">{questions.length}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={loadQuestions}
              className="px-6 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qaytadan boshlash</span>
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Natijani ulashish</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400">
          Savollar yuklanmoqda...
        </div>
      )}
    </div>
  );
};
