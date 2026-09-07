import { WeatherData, WeatherTheme } from '../types/math';

export const WEATHER_THEMES: Record<WeatherTheme, {
  nameUz: string;
  icon: string;
  gradientLight: string;
  gradientDark: string;
  accentColor: string;
  ambientDescription: string;
}> = {
  sunny: {
    nameUz: 'Quyoshli / Ochiq',
    icon: 'Sun',
    gradientLight: 'from-amber-50 via-sky-50 to-orange-50/40',
    gradientDark: 'from-slate-950 via-amber-950/20 to-slate-900',
    accentColor: 'text-amber-500',
    ambientDescription: 'Musaffo osmon va yorqin ilhom'
  },
  rainy: {
    nameUz: 'Yomg\'irli / Salqin',
    icon: 'CloudRain',
    gradientLight: 'from-cyan-50 via-slate-100 to-blue-50',
    gradientDark: 'from-slate-950 via-cyan-950/30 to-slate-900',
    accentColor: 'text-cyan-500',
    ambientDescription: 'Fikrlash uchun tinchlantiruvchi yomg\'ir ohangi'
  },
  cloudy: {
    nameUz: 'Bulutli',
    icon: 'Cloud',
    gradientLight: 'from-slate-100 via-indigo-50/50 to-slate-200/50',
    gradientDark: 'from-slate-950 via-indigo-950/20 to-slate-900',
    accentColor: 'text-indigo-400',
    ambientDescription: 'Chuqur hisob-kitoblar uchun sokin muhit'
  },
  snowy: {
    nameUz: 'Qorli / Qishki',
    icon: 'Snowflake',
    gradientLight: 'from-blue-50 via-sky-100/60 to-slate-100',
    gradientDark: 'from-slate-950 via-blue-950/30 to-slate-900',
    accentColor: 'text-sky-400',
    ambientDescription: 'Kristaldek tiniq mantiq va aniqlik'
  },
  night: {
    nameUz: 'Tungi yulduzli osmon',
    icon: 'Moon',
    gradientLight: 'from-slate-100 via-indigo-50 to-purple-50',
    gradientDark: 'from-slate-950 via-purple-950/25 to-slate-950',
    accentColor: 'text-purple-400',
    ambientDescription: 'Tungi xotirjamlik va koinot sirlari'
  },
  sunset: {
    nameUz: 'Shom shafag\'i',
    icon: 'Sunset',
    gradientLight: 'from-rose-50 via-orange-50 to-amber-50',
    gradientDark: 'from-slate-950 via-rose-950/20 to-slate-900',
    accentColor: 'text-rose-500',
    ambientDescription: 'Ijodiy g\'oyalar va formulalar nuri'
  },
  spring: {
    nameUz: 'Bahoriy / Yashil',
    icon: 'Sparkles',
    gradientLight: 'from-emerald-50 via-teal-50 to-cyan-50',
    gradientDark: 'from-slate-950 via-emerald-950/20 to-slate-900',
    accentColor: 'text-emerald-500',
    ambientDescription: 'Tafakkurning yangilanish fasli'
  }
};

export async function detectLocationAndWeather(): Promise<WeatherData> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation brauzerda qo\'llab-quvvatlanmaydi'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Free Open-Meteo Weather API
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          );
          
          if (!response.ok) {
            throw new Error('Ob-havo ma\'lumotini olib bo\'lmadi');
          }

          const data = await response.json();
          const current = data.current_weather;
          const code = current.weathercode;
          const isDay = current.is_day === 1;

          let condition: WeatherTheme = 'sunny';
          let descriptionUz = 'Ochiq quyoshli havo';

          if (!isDay && (code === 0 || code === 1)) {
            condition = 'night';
            descriptionUz = 'Tungi musaffo osmon';
          } else if (code === 0) {
            condition = 'sunny';
            descriptionUz = 'Quyoshli va iliq';
          } else if ([1, 2, 3].includes(code)) {
            condition = 'cloudy';
            descriptionUz = 'O\'zgaruvchan bulutli';
          } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
            condition = 'rainy';
            descriptionUz = 'Yomg\'irli havo';
          } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
            condition = 'snowy';
            descriptionUz = 'Qorli salqin havo';
          } else if ([95, 96, 99].includes(code)) {
            condition = 'rainy';
            descriptionUz = 'Momaqaldiroq va yomg\'ir';
          } else if ([45, 48].includes(code)) {
            condition = 'cloudy';
            descriptionUz = 'Tumanli havo';
          }

          resolve({
            temp: Math.round(current.temperature),
            weatherCode: code,
            cityName: 'Joylashuv bo\'yicha aniqlandi',
            condition,
            descriptionUz,
            windSpeed: current.windspeed,
            isAutoDetected: true,
          });
        } catch (err) {
          reject(err);
        }
      },
      (error) => {
        reject(error);
      },
      { timeout: 8000, maximumAge: 60000 }
    );
  });
}
