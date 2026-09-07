import React from 'react';
import { WeatherTheme } from '../types/math';
import { WEATHER_THEMES } from '../services/weather';

interface WeatherAtmosphereProps {
  theme: WeatherTheme;
  isDark: boolean;
}

export const WeatherAtmosphere: React.FC<WeatherAtmosphereProps> = ({ theme, isDark }) => {
  const currentTheme = WEATHER_THEMES[theme] || WEATHER_THEMES.sunny;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-colors duration-1000">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          isDark ? currentTheme.gradientDark : currentTheme.gradientLight
        } transition-all duration-1000`}
      />

      {/* Atmospheric specific visual particles */}
      {theme === 'rainy' && (
        <div className="absolute inset-0 opacity-25">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 bg-cyan-400 rounded-full animate-pulse"
              style={{
                height: `${20 + (i % 5) * 10}px`,
                top: `${(i * 17) % 100}%`,
                left: `${(i * 23) % 100}%`,
                animationDuration: `${1.2 + (i % 4) * 0.4}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      )}

      {theme === 'snowy' && (
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-sky-200 dark:bg-white animate-bounce"
              style={{
                width: `${4 + (i % 3) * 2}px`,
                height: `${4 + (i % 3) * 2}px`,
                top: `${(i * 13) % 100}%`,
                left: `${(i * 29) % 100}%`,
                animationDuration: `${2.5 + (i % 3) * 0.8}s`,
              }}
            />
          ))}
        </div>
      )}

      {theme === 'night' && (
        <div className="absolute inset-0 opacity-40">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white animate-ping"
              style={{
                top: `${(i * 23) % 95}%`,
                left: `${(i * 37) % 98}%`,
                animationDuration: `${3 + (i % 5)}s`,
                animationDelay: `${(i * 0.3) % 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {theme === 'sunny' && (
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-300/10 dark:bg-amber-500/5 rounded-full blur-3xl" />
      )}
    </div>
  );
};
