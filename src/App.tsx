import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Calculator, 
  Brain, 
  History, 
  Sparkles, 
  MapPin, 
  HelpCircle, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { soundEngine } from './services/audio';
import { detectLocationAndWeather } from './services/weather';
import { 
  GradeNumber, 
  WeatherTheme, 
  WeatherData, 
  CalculationHistoryItem, 
  UserProfile 
} from './types/math';

import { NewtonIntro } from './components/NewtonIntro';
import { Navbar } from './components/Navbar';
import { WeatherAtmosphere } from './components/WeatherAtmosphere';
import { GradeCatalog } from './components/GradeCatalog';
import { StepCalculator } from './components/StepCalculator';
import { BrainQuiz } from './components/BrainQuiz';
import { HistoryAndFavorites } from './components/HistoryAndFavorites';
import { UserProfileModal } from './components/UserProfileModal';
import { ShareModal } from './components/ShareModal';

const DEFAULT_PROFILE: UserProfile = {
  name: "Yosh Matematik",
  currentGrade: 7,
  score: 45,
  solvedCount: 12,
  streakDays: 3,
  favoriteFormulaIds: ['l7_1', 'l8_1', 'l9_1'],
  achievements: [
    {
      id: 'ach_1',
      title: 'Birinchi Qadam',
      description: 'Algebramat platformasiga xush kelibsiz',
      icon: '🌱',
      unlockedAt: Date.now()
    },
    {
      id: 'ach_2',
      title: 'Nyuton Ilhomi',
      description: 'Nyuton daraxti va harakat qonunlari bilan tanishildi',
      icon: '🍎',
      unlockedAt: Date.now()
    },
    {
      id: 'ach_3',
      title: 'Tenglamalar Qobiliyati',
      description: 'Kvadrat va chiziqli tenglamalar kalkulyatoridan foydalanildi',
      icon: '⚡',
      unlockedAt: Date.now()
    }
  ]
};

export default function App() {
  // Newton intro overlay state
  const [showNewtonIntro, setShowNewtonIntro] = useState(true);

  // Dark mode state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('algebramat_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sound mute state
  const [isMuted, setIsMuted] = useState<boolean>(() => soundEngine.getIsMuted());

  // Weather state
  const [currentTheme, setCurrentTheme] = useState<WeatherTheme>('sunny');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  // Main active tab
  const [activeTab, setActiveTab] = useState<'catalog' | 'calculator' | 'quiz' | 'history'>('catalog');

  // Grade & search state
  const [selectedGrade, setSelectedGrade] = useState<GradeNumber>(7);
  const [searchQuery, setSearchQuery] = useState('');

  // Favorites & History
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('algebramat_favorites');
      return saved ? JSON.parse(saved) : ['l7_1', 'l8_1', 'l9_1'];
    } catch {
      return ['l7_1', 'l8_1', 'l9_1'];
    }
  });

  const [history, setHistory] = useState<CalculationHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('algebramat_history');
      return saved ? JSON.parse(saved) : [
        {
          id: 'hist_init_1',
          timestamp: Date.now() - 3600000,
          calculatorType: 'Kvadrat tenglama',
          inputSummary: 'x² - 5x + 6 = 0',
          result: 'x₁ = 3,  x₂ = 2',
          steps: ['D = (-5)² - 4·1·6 = 1', 'x = (5 ± 1) / 2']
        }
      ];
    } catch {
      return [];
    }
  });

  // User Profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('algebramat_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Modals
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareText, setShareText] = useState('');

  // Apply Dark mode to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('algebramat_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('algebramat_theme', 'light');
    }
  }, [isDark]);

  // Save favorites to storage
  useEffect(() => {
    localStorage.setItem('algebramat_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save history to storage
  useEffect(() => {
    localStorage.setItem('algebramat_history', JSON.stringify(history));
  }, [history]);

  // Save profile to storage
  useEffect(() => {
    localStorage.setItem('algebramat_profile', JSON.stringify(profile));
  }, [profile]);

  // Attempt auto-detect weather on startup
  useEffect(() => {
    handleDetectLocation(true);
  }, []);

  const handleDetectLocation = async (silent = false) => {
    setIsLoadingWeather(true);
    try {
      const data = await detectLocationAndWeather();
      setWeatherData(data);
      setCurrentTheme(data.condition);
      if (!silent) {
        soundEngine.playCalculate();
      }
    } catch (err) {
      // Graceful fallback to pleasant sunny day or default
      if (!silent) {
        console.warn('Geolocation unavailable or denied:', err);
      }
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const toggleFavorite = (id: string) => {
    soundEngine.playClick();
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSaveCalculation = (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: CalculationHistoryItem = {
      ...item,
      id: `calc_${Date.now()}`,
      timestamp: Date.now()
    };
    setHistory((prev) => [newItem, ...prev.slice(0, 49)]); // Keep last 50 items
    setProfile((prev) => ({
      ...prev,
      solvedCount: prev.solvedCount + 1,
      score: prev.score + 5
    }));
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleTriggerShare = (customText?: string) => {
    setShareText(
      customText ||
      `📐 Algebramat - 1-11 Sinf Interaktiv Algebra Platformasi!\nBarcha qonunlar, formulalar, bosqichma-bosqich kalkulyator va aql charxlash testlari jamlangan ajoyib platforma.`
    );
    setIsShareOpen(true);
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Newton under apple tree intro modal */}
      {showNewtonIntro && (
        <NewtonIntro onComplete={() => setShowNewtonIntro(false)} />
      )}

      {/* Dynamic weather background */}
      <WeatherAtmosphere theme={currentTheme} isDark={isDark} />

      {/* Navigation Header */}
      <Navbar
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        isMuted={isMuted}
        onToggleSound={() => setIsMuted(soundEngine.toggleMute())}
        weatherData={weatherData}
        currentTheme={currentTheme}
        onSelectTheme={(theme) => setCurrentTheme(theme)}
        onDetectLocation={() => handleDetectLocation(false)}
        isLoadingWeather={isLoadingWeather}
        profile={profile}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenNewton={() => setShowNewtonIntro(true)}
        onShareApp={() => handleTriggerShare()}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Main Tab Navigation */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-2">
            {[
              { id: 'catalog', label: '1-11 Sinf Qonunlar & Formulalar', icon: BookOpen },
              { id: 'calculator', label: 'Qadamma-qadam Kalkulyator', icon: Calculator },
              { id: 'quiz', label: 'Aql Charxlash Testi', icon: Brain },
              { id: 'history', label: `Tarix & Saqlanganlar (${history.length + favorites.length})`, icon: History }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 scale-[1.02]'
                      : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick weather status pill */}
          {weatherData && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>{weatherData.descriptionUz} ({weatherData.temp}°C)</span>
            </div>
          )}
        </div>

        {/* Tab 1: Catalog */}
        {activeTab === 'catalog' && (
          <GradeCatalog
            selectedGrade={selectedGrade}
            onSelectGrade={(g) => setSelectedGrade(g)}
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {/* Tab 2: Step Calculator */}
        {activeTab === 'calculator' && (
          <StepCalculator onSaveHistory={handleSaveCalculation} />
        )}

        {/* Tab 3: Brain Quiz */}
        {activeTab === 'quiz' && (
          <BrainQuiz
            initialGrade={selectedGrade}
            onShareResult={(text) => handleTriggerShare(text)}
            onUpdateScore={(pts) => {
              setProfile((prev) => ({
                ...prev,
                score: prev.score + pts
              }));
            }}
          />
        )}

        {/* Tab 4: History & Favorites */}
        {activeTab === 'history' && (
          <HistoryAndFavorites
            history={history}
            onClearHistory={() => setHistory([])}
            favorites={favorites}
            onRemoveFavorite={toggleFavorite}
          />
        )}
      </main>

      {/* Modals */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onShareBadge={(text) => handleTriggerShare(text)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shareText={shareText}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/60 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>🍎 Algebramat © 2026</span>
            <span>•</span>
            <span>1-11 Sinf Matematika va Algebra Qonunlari</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => {
                soundEngine.playAppleDrop();
                setShowNewtonIntro(true);
              }}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            >
              Nyuton Tarixi
            </button>
            <span>•</span>
            <button
              onClick={() => handleTriggerShare()}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            >
              Do&apos;stlarga ulashish
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
