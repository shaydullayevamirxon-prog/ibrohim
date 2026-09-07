export type GradeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface FormulaItem {
  id: string;
  title: string;
  latex?: string;
  expression: string;
  description: string;
  lawName?: string;
  example: string;
  explanation: string;
  grade: GradeNumber;
  category: string;
}

export interface LawItem {
  id: string;
  title: string;
  formula: string;
  statement: string;
  explanation: string;
  realWorldApplication: string;
  grade: GradeNumber;
}

export interface ExampleProblem {
  id: string;
  grade: GradeNumber;
  topic: string;
  problem: string;
  steps: string[];
  answer: string;
  tip?: string;
}

export interface QuizQuestion {
  id: string;
  grade: GradeNumber;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'oson' | 'orta' | 'qiyin';
}

export interface GradeInfo {
  grade: GradeNumber;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  topics: string[];
  laws: LawItem[];
  formulas: FormulaItem[];
  examples: ExampleProblem[];
  quiz: QuizQuestion[];
}

export interface CalculationHistoryItem {
  id: string;
  timestamp: number;
  calculatorType: string;
  inputSummary: string;
  result: string;
  steps: string[];
}

export interface UserProfile {
  name: string;
  currentGrade: GradeNumber;
  score: number;
  solvedCount: number;
  streakDays: number;
  favoriteFormulaIds: string[];
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: number;
  }[];
}

export type WeatherTheme = 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'night' | 'sunset' | 'spring';

export interface WeatherData {
  temp: number;
  weatherCode: number;
  cityName: string;
  condition: WeatherTheme;
  descriptionUz: string;
  windSpeed: number;
  isAutoDetected: boolean;
}
