import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  X, 
  Award, 
  Flame, 
  CheckCircle2, 
  Sparkles, 
  Edit3, 
  Save, 
  GraduationCap,
  Calculator,
  Share2
} from 'lucide-react';
import { soundEngine } from '../services/audio';
import { GradeNumber, UserProfile } from '../types/math';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onShareBadge: (badgeText: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onShareBadge
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [grade, setGrade] = useState<GradeNumber>(profile.currentGrade);

  if (!isOpen) return null;

  // Determine title / rank
  const getRank = (score: number) => {
    if (score >= 500) return { title: "Akademik - Algebra Grossmeysteri", color: "text-amber-500", border: "border-amber-500/40" };
    if (score >= 300) return { title: "Al-Xorazmiy Vorisi", color: "text-indigo-400", border: "border-indigo-500/40" };
    if (score >= 150) return { title: "Pifagor Shogirdi", color: "text-emerald-400", border: "border-emerald-500/40" };
    if (score >= 50) return { title: "Tenglamalar Ustasi", color: "text-sky-400", border: "border-sky-500/40" };
    return { title: "Yosh Matematik Havaskor", color: "text-slate-400", border: "border-slate-500/40" };
  };

  const rank = getRank(profile.score);

  const handleSave = () => {
    soundEngine.playClick();
    onUpdateProfile({
      name: name.trim() || 'O\'quvchi',
      currentGrade: grade
    });
    setIsEditing(false);
  };

  const handleShare = () => {
    soundEngine.playClick();
    const shareText = `🎓 Algebramat Shaxsiy Profilim:\n👤 Ism: ${profile.name}\n📚 Sinf: ${profile.currentGrade}-sinf\n⭐ Unvon: ${rank.title}\n🏆 To'plangan ball: ${profile.score}\n🧮 Yechilgan misollar: ${profile.solvedCount}\n\nAlgebramat - O'zbekistondagi eng kuchli interaktiv matematika platformasi!`;
    onShareBadge(shareText);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
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

          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-600/30">
              {profile.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
                    placeholder="Ismingizni kiriting"
                  />
                  <select
                    value={grade}
                    onChange={(e) => setGrade(Number(e.target.value) as GradeNumber)}
                    className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((g) => (
                      <option key={g} value={g}>{g}-sinf</option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
                      {profile.name}
                    </h3>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-slate-400 hover:text-indigo-500 cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{profile.currentGrade}-sinf o&apos;quvchisi</span>
                  </div>
                </>
              )}
            </div>

            {isEditing && (
              <button
                onClick={handleSave}
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Saqlash</span>
              </button>
            )}
          </div>

          {/* Rank Card */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
              Matematik Unvon:
            </span>
            <div className={`text-base sm:text-lg font-bold ${rank.color} flex items-center gap-2`}>
              <Award className="w-5 h-5 flex-shrink-0" />
              <span>{rank.title}</span>
            </div>
            <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (profile.score / 500) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>{profile.score} ball</span>
              <span>Keyingi daraja: 500 ball</span>
            </div>
          </div>

          {/* Stats 3 columns */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 text-center">
              <Calculator className="w-4 h-4 mx-auto text-indigo-600 dark:text-indigo-400 mb-1" />
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Yechilgan</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{profile.solvedCount}</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-center">
              <Sparkles className="w-4 h-4 mx-auto text-amber-600 dark:text-amber-400 mb-1" />
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Jami Ball</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{profile.score}</span>
            </div>
            <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/40 text-center">
              <Flame className="w-4 h-4 mx-auto text-orange-600 dark:text-orange-400 mb-1" />
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Kunlik Seriya</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{profile.streakDays} kun</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Yutuqlar va medallar ({profile.achievements.length})
            </h4>
            <div className="grid grid-cols-2 gap-2.5 max-h-40 overflow-y-auto pr-1">
              {profile.achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center gap-2.5 text-left"
                >
                  <span className="text-xl">{ach.icon}</span>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{ach.title}</h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={handleShare}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow"
            >
              <Share2 className="w-4 h-4" />
              <span>Profilni Ulashish</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Yopish
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
