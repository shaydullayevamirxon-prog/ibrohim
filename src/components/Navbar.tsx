import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  User, 
  MapPin, 
  CloudRain, 
  Cloud, 
  Snowflake, 
  Sunset, 
  RotateCcw,
  Share2,
  ChevronDown
} from 'lucide-react';
import { soundEngine } from '../services/audio';
import { WeatherData, WeatherTheme, UserProfile } from '../types/math';
import { WEATHER_THEMES } from '../services/weather';

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  weatherData: WeatherData | null;
  currentTheme: WeatherTheme;
  onSelectTheme: (theme: WeatherTheme) => void;
  onDetectLocation: () => void;
  isLoadingWeather: boolean;
  profile: UserProfile;
  onOpenProfile: () => void;
  onOpenNewton: () => void;
  onShareApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleDark,
  isMuted,
  onToggleSound,
  weatherData,
  currentTheme,
  onSelectTheme,
  onDetectLocation,
  isLoadingWeather,
  profile,
  onOpenProfile,
  onOpenNewton,
  onShareApp
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const getWeatherIcon = (theme: WeatherTheme) => {
    switch (theme) {
      case 'sunny': return <Sun className="w-3.5 h-3.5 text-amber-500" />;
      case 'rainy': return <CloudRain className="w-3.5 h-3.5 text-cyan-500" />;
      case 'cloudy': return <Cloud className="w-3.5 h-3.5 text-slate-400" />;
      case 'snowy': return <Snowflake className="w-3.5 h-3.5 text-sky-400" />;
      case 'night': return <Moon className="w-3.5 h-3.5 text-purple-400" />;
      case 'sunset': return <Sunset className="w-3.5 h-3.5 text-rose-500" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEngine.playAppleDrop();
              onOpenNewton();
            }}
            className="flex items-center gap-2 group cursor-pointer text-left"
            title="Nyuton kirish lavhasini ko'rish"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <span className="text-xl select-none">🍎</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Algebramat
                </span>
                <span className="px-1.5 py-0.2 text-[10px] font-bold uppercase rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  1-11 Sinf
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block -mt-0.5">
                Interaktiv Algebra &amp; Mantiq
              </span>
            </div>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Weather & Location Indicator */}
          <div className="relative">
            <button
              onClick={() => {
                soundEngine.playClick();
                setShowThemeMenu(!showThemeMenu);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-850 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              title="Ob-havo orqa fonini boshqarish"
            >
              {getWeatherIcon(currentTheme)}
              <span className="hidden md:inline">
                {weatherData ? `${weatherData.temp}°C • ${WEATHER_THEMES[currentTheme].nameUz}` : WEATHER_THEMES[currentTheme].nameUz}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Weather dropdown menu */}
            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-64 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Ob-havo foni
                  </span>
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onDetectLocation();
                    }}
                    disabled={isLoadingWeather}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{isLoadingWeather ? "Aniqlanmoqda..." : "GPS yangilash"}</span>
                  </button>
                </div>

                <div className="space-y-1">
                  {(Object.keys(WEATHER_THEMES) as WeatherTheme[]).map((thm) => (
                    <button
                      key={thm}
                      onClick={() => {
                        soundEngine.playClick();
                        onSelectTheme(thm);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                        currentTheme === thm
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {getWeatherIcon(thm)}
                        <span>{WEATHER_THEMES[thm].nameUz}</span>
                      </div>
                      {currentTheme === thm && <span className="text-indigo-500 font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors cursor-pointer"
            title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleDark();
            }}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors cursor-pointer"
            title="Yorug' / Qorong'u rejim"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Share button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onShareApp();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-indigo-600 text-xs font-semibold cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Ulashish</span>
          </button>

          {/* Profile Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:inline">{profile.name}</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-200/60 dark:bg-indigo-900 text-[10px]">
              {profile.score}p
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
