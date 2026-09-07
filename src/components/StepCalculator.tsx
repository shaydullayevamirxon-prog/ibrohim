import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Check, 
  Copy, 
  Sparkles, 
  Divide, 
  TrendingUp, 
  FunctionSquare, 
  Percent, 
  Save, 
  RefreshCw 
} from 'lucide-react';
import { soundEngine } from '../services/audio';
import { CalculationHistoryItem } from '../types/math';

interface StepCalculatorProps {
  onSaveHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
}

type CalcMode = 
  | 'quadratic' 
  | 'linear_system' 
  | 'gcd_lcm' 
  | 'fractions' 
  | 'progression' 
  | 'logarithm' 
  | 'trigonometry' 
  | 'derivative' 
  | 'percentage';

export const StepCalculator: React.FC<StepCalculatorProps> = ({ onSaveHistory }) => {
  const [mode, setMode] = useState<CalcMode>('quadratic');
  const [copied, setCopied] = useState(false);

  // Quadratic equation state
  const [quadA, setQuadA] = useState('1');
  const [quadB, setQuadB] = useState('-5');
  const [quadC, setQuadC] = useState('6');

  // Linear system state: a1*x + b1*y = c1; a2*x + b2*y = c2
  const [sysA1, setSysA1] = useState('2');
  const [sysB1, setSysB1] = useState('1');
  const [sysC1, setSysC1] = useState('7');
  const [sysA2, setSysA2] = useState('1');
  const [sysB2, setSysB2] = useState('-1');
  const [sysC2, setSysC2] = useState('2');

  // GCD / LCM
  const [numA, setNumA] = useState('24');
  const [numB, setNumB] = useState('36');

  // Fractions
  const [f1Num, setF1Num] = useState('3');
  const [f1Den, setF1Den] = useState('4');
  const [fracOp, setFracOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [f2Num, setF2Num] = useState('2');
  const [f2Den, setF2Den] = useState('5');

  // Progressions
  const [progType, setProgType] = useState<'arithmetic' | 'geometric'>('arithmetic');
  const [progFirst, setProgFirst] = useState('3');
  const [progDiff, setProgDiff] = useState('4');
  const [progN, setProgN] = useState('10');

  // Logarithm
  const [logBase, setLogBase] = useState('2');
  const [logVal, setLogVal] = useState('32');

  // Trigonometry
  const [trigAngle, setTrigAngle] = useState('30');
  const [trigUnit, setTrigUnit] = useState<'deg' | 'rad'>('deg');
  const [trigFunc, setTrigFunc] = useState<'sin' | 'cos' | 'tg' | 'ctg'>('sin');

  // Derivative: f(x) = a*x^3 + b*x^2 + c*x + d
  const [polyA, setPolyA] = useState('2');
  const [polyB, setPolyB] = useState('-3');
  const [polyC, setPolyC] = useState('4');
  const [polyD, setPolyD] = useState('1');
  const [polyX0, setPolyX0] = useState('2');

  // Percentage
  const [percNum, setPercNum] = useState('150000');
  const [percRate, setPercRate] = useState('15');

  // Active calculation output
  const [calcResult, setCalcResult] = useState<{
    summary: string;
    finalAnswer: string;
    steps: string[];
  } | null>(null);

  // Switch mode helper
  const handleModeChange = (newMode: CalcMode) => {
    soundEngine.playClick();
    setMode(newMode);
    setCalcResult(null);
  };

  // Helper GCD
  const gcd = (x: number, y: number): number => {
    let a = Math.abs(x);
    let b = Math.abs(y);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  // 1. Solve Quadratic Equation
  const solveQuadratic = () => {
    const a = parseFloat(quadA);
    const b = parseFloat(quadB);
    const c = parseFloat(quadC);

    if (isNaN(a) || isNaN(b) || isNaN(c)) return;
    if (a === 0) {
      // Linear
      const root = -c / b;
      const steps = [
        `a = 0 bo'lgani uchun tenglama chiziqli: ${b}x + (${c}) = 0`,
        `${b}x = ${-c}`,
        `x = ${-c} / ${b} = ${root}`
      ];
      setCalcResult({
        summary: `${b}x + ${c} = 0`,
        finalAnswer: `x = ${root.toFixed(3)}`,
        steps
      });
      return;
    }

    const D = b * b - 4 * a * c;
    const steps: string[] = [
      `Kvadrat tenglama koeffitsiyentlari: a = ${a}, b = ${b}, c = ${c}`,
      `Diskriminant formulasi: D = b² - 4ac`,
      `D = (${b})² - 4 · (${a}) · (${c}) = ${b * b} - (${4 * a * c}) = ${D}`
    ];

    let finalAnswer = '';
    if (D > 0) {
      const sqrtD = Math.sqrt(D);
      const x1 = (-b + sqrtD) / (2 * a);
      const x2 = (-b - sqrtD) / (2 * a);
      steps.push(`D > 0 bo'lgani sababli 2 ta turli haqiqiy ildiz mavjud:`);
      steps.push(`√D = √${D} ≈ ${sqrtD.toFixed(4)}`);
      steps.push(`x₁ = (-b + √D) / (2a) = (${-b} + ${sqrtD.toFixed(3)}) / (2 · ${a}) = ${x1.toFixed(4)}`);
      steps.push(`x₂ = (-b - √D) / (2a) = (${-b} - ${sqrtD.toFixed(3)}) / (2 · ${a}) = ${x2.toFixed(4)}`);
      steps.push(`Viyet tekshiruvi: x₁ + x₂ = ${(x1 + x2).toFixed(3)} (-b/a = ${(-b / a).toFixed(3)}), x₁ · x₂ = ${(x1 * x2).toFixed(3)} (c/a = ${(c / a).toFixed(3)})`);
      finalAnswer = `x₁ = ${x1.toFixed(3)},  x₂ = ${x2.toFixed(3)}`;
    } else if (D === 0) {
      const x = -b / (2 * a);
      steps.push(`D = 0 bo'lgani sababli 1 ta (karrali) haqiqiy ildiz mavjud:`);
      steps.push(`x = -b / (2a) = ${-b} / (2 · ${a}) = ${x.toFixed(4)}`);
      finalAnswer = `x = ${x.toFixed(3)} (karrali)`;
    } else {
      const realPart = (-b / (2 * a)).toFixed(3);
      const imagPart = (Math.sqrt(Math.abs(D)) / (2 * a)).toFixed(3);
      steps.push(`D < 0 bo'lgani sababli haqiqiy sonlar to'plamida ildiz yo'q (D < 0).`);
      steps.push(`Kompleks sonlar sohasidagi ildizlar: x₁,₂ = ${realPart} ± ${imagPart}i`);
      finalAnswer = `Haqiqiy ildiz yo'q (Kompleks: ${realPart} ± ${imagPart}i)`;
    }

    soundEngine.playCalculate();
    const resultObj = {
      summary: `${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0`,
      finalAnswer,
      steps
    };
    setCalcResult(resultObj);
    onSaveHistory({
      calculatorType: "Kvadrat tenglama",
      inputSummary: resultObj.summary,
      result: finalAnswer,
      steps
    });
  };

  // 2. Solve Linear System
  const solveLinearSystem = () => {
    const a1 = parseFloat(sysA1);
    const b1 = parseFloat(sysB1);
    const c1 = parseFloat(sysC1);
    const a2 = parseFloat(sysA2);
    const b2 = parseFloat(sysB2);
    const c2 = parseFloat(sysC2);

    const delta = a1 * b2 - a2 * b1;
    const deltaX = c1 * b2 - c2 * b1;
    const deltaY = a1 * c2 - a2 * c1;

    const steps: string[] = [
      `Tenglamalar sistemasi:\n  1) ${a1}x + ${b1}y = ${c1}\n  2) ${a2}x + ${b2}y = ${c2}`,
      `Kramer qoidasi bo'yicha asosiy determinant:\n  Δ = (${a1})·(${b2}) - (${a2})·(${b1}) = ${delta}`
    ];

    let finalAnswer = '';
    if (delta !== 0) {
      const x = deltaX / delta;
      const y = deltaY / delta;
      steps.push(`Δx determinant:\n  Δx = (${c1})·(${b2}) - (${c2})·(${b1}) = ${deltaX}`);
      steps.push(`Δy determinant:\n  Δy = (${a1})·(${c2}) - (${a2})·(${c1}) = ${deltaY}`);
      steps.push(`Ildizlar hisobi:\n  x = Δx / Δ = ${deltaX} / ${delta} = ${x.toFixed(4)}\n  y = Δy / Δ = ${deltaY} / ${delta} = ${y.toFixed(4)}`);
      finalAnswer = `x = ${x.toFixed(3)},  y = ${y.toFixed(3)}`;
    } else {
      if (deltaX === 0 && deltaY === 0) {
        steps.push(`Δ = 0 va Δx = 0, Δy = 0 bo'lgani sababli sistema cheksiz ko'p yechimga ega.`);
        finalAnswer = `Cheksiz ko'p yechim mavjud`;
      } else {
        steps.push(`Δ = 0, lekin Δx ≠ 0 yoki Δy ≠ 0 bo'lgani uchun sistema yechimga ega emas (to'g'ri chiziqlar parallel).`);
        finalAnswer = `Yechimga ega emas`;
      }
    }

    soundEngine.playCalculate();
    const resultObj = {
      summary: `{ ${a1}x+${b1}y=${c1}; ${a2}x+${b2}y=${c2} }`,
      finalAnswer,
      steps
    };
    setCalcResult(resultObj);
    onSaveHistory({
      calculatorType: "Tenglamalar sistemasi",
      inputSummary: resultObj.summary,
      result: finalAnswer,
      steps
    });
  };

  // 3. Solve GCD and LCM
  const solveGcdLcm = () => {
    const a = parseInt(numA, 10);
    const b = parseInt(numB, 10);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return;

    const g = gcd(a, b);
    const l = (a * b) / g;

    const steps = [
      `Berilgan sonlar: a = ${a}, b = ${b}`,
      `Evklid algoritmi bo'yicha ketma-ket qoldiqli bo'lish:`,
      `EKUB(${a}, ${b}) = ${g}`,
      `EKUK formulasi: EKUK(a, b) = (a · b) / EKUB(a, b)`,
      `EKUK(${a}, ${b}) = (${a} · ${b}) / ${g} = ${a * b} / ${g} = ${l}`,
      `Tekshirish: EKUB · EKUK = ${g} · ${l} = ${g * l} (a · b = ${a * b})`
    ];

    const finalAnswer = `EKUB = ${g},  EKUK = ${l}`;
    soundEngine.playCalculate();
    const resultObj = {
      summary: `EKUB & EKUK (${a}, ${b})`,
      finalAnswer,
      steps
    };
    setCalcResult(resultObj);
    onSaveHistory({
      calculatorType: "EKUB & EKUK",
      inputSummary: resultObj.summary,
      result: finalAnswer,
      steps
    });
  };

  // 4. Fractions calculation
  const solveFractions = () => {
    const n1 = parseInt(f1Num, 10);
    const d1 = parseInt(f1Den, 10);
    const n2 = parseInt(f2Num, 10);
    const d2 = parseInt(f2Den, 10);

    if (d1 === 0 || d2 === 0) return;

    let resNum = 0;
    let resDen = 1;
    const steps: string[] = [
      `1-kasr: ${n1}/${d1}, 2-kasr: ${n2}/${d2}`
    ];

    if (fracOp === '+' || fracOp === '-') {
      const commonDen = (d1 * d2) / gcd(d1, d2);
      const factor1 = commonDen / d1;
      const factor2 = commonDen / d2;
      steps.push(`Umumiy maxraj (EKUK): ${commonDen}`);
      steps.push(`1-kasr surati: ${n1} · ${factor1} = ${n1 * factor1}`);
      steps.push(`2-kasr surati: ${n2} · ${factor2} = ${n2 * factor2}`);
      
      if (fracOp === '+') {
        resNum = n1 * factor1 + n2 * factor2;
        steps.push(`Yig'indi surati: ${n1 * factor1} + ${n2 * factor2} = ${resNum}`);
      } else {
        resNum = n1 * factor1 - n2 * factor2;
        steps.push(`Ayirma surati: ${n1 * factor1} - ${n2 * factor2} = ${resNum}`);
      }
      resDen = commonDen;
    } else if (fracOp === '*') {
      resNum = n1 * n2;
      resDen = d1 * d2;
      steps.push(`Ko'paytirish qoidasi: (a/b) · (c/d) = (a·c) / (b·d)`);
      steps.push(`Surat: ${n1} · ${n2} = ${resNum}`);
      steps.push(`Maxraj: ${d1} · ${d2} = ${resDen}`);
    } else {
      if (n2 === 0) {
        alert("Nolga bo'lish mumkin emas!");
        return;
      }
      resNum = n1 * d2;
      resDen = d1 * n2;
      steps.push(`Bo'lish qoidasi: teskarisiga ko'paytiriladi -> (${n1}/${d1}) · (${d2}/${n2})`);
      steps.push(`Surat: ${n1} · ${d2} = ${resNum}`);
      steps.push(`Maxraj: ${d1} · ${n2} = ${resDen}`);
    }

    // Simplify fraction
    const g = gcd(resNum, resDen);
    const simpNum = resNum / g;
    const simpDen = resDen / g;

    if (g > 1) {
      steps.push(`Kasr ${g} ga qisqartirildi: ${simpNum} / ${simpDen}`);
    }
    const decimalVal = simpNum / simpDen;
    steps.push(`O'nli kasr ko'rinishida: ≈ ${decimalVal.toFixed(4)}`);

    const finalAnswer = `${simpNum}/${simpDen} (${decimalVal.toFixed(3)})`;
    soundEngine.playCalculate();
    const resultObj = {
      summary: `${n1}/${d1} ${fracOp} ${n2}/${d2}`,
      finalAnswer,
      steps
    };
    setCalcResult(resultObj);
    onSaveHistory({
      calculatorType: "Kasrlar",
      inputSummary: resultObj.summary,
      result: finalAnswer,
      steps
    });
  };

  // 5. Progression
  const solveProgression = () => {
    const first = parseFloat(progFirst);
    const diff = parseFloat(progDiff);
    const n = parseInt(progN, 10);
    if (isNaN(first) || isNaN(diff) || isNaN(n) || n < 1) return;

    const steps: string[] = [];
    let finalAnswer = '';

    if (progType === 'arithmetic') {
      const an = first + (n - 1) * diff;
      const sn = ((first + an) * n) / 2;
      steps.push(`Arifmetik progressiya parametrlari: a₁ = ${first}, d = ${diff}, n = ${n}`);
      steps.push(`n-had formulasi: aₙ = a₁ + (n - 1)d`);
      steps.push(`a_${n} = ${first} + (${n} - 1) · ${diff} = ${first} + ${((n - 1) * diff).toFixed(2)} = ${an.toFixed(2)}`);
      steps.push(`Yig'indi formulasi: Sₙ = (a₁ + aₙ) · n / 2`);
      steps.push(`S_${n} = (${first} + ${an.toFixed(2)}) · ${n} / 2 = ${sn.toFixed(2)}`);
      finalAnswer = `a_${n} = ${an.toFixed(2)},  S_${n} = ${sn.toFixed(2)}`;
    } else {
      const bn = first * Math.pow(diff, n - 1);
      let sn = 0;
      if (diff === 1) {
        sn = first * n;
      } else {
        sn = (first * (Math.pow(diff, n) - 1)) / (diff - 1);
      }
      steps.push(`Geometrik progressiya parametrlari: b₁ = ${first}, q = ${diff}, n = ${n}`);
      steps.push(`n-had formulasi: bₙ = b₁ · qⁿ⁻¹`);
      steps.push(`b_${n} = ${first} · (${diff})^${n - 1} = ${bn.toFixed(4)}`);
      steps.push(`Yig'indi formulasi: Sₙ = b₁(qⁿ - 1) / (q - 1)`);
      steps.push(`S_${n} = ${sn.toFixed(4)}`);
      finalAnswer = `b_${n} = ${bn.toFixed(3)},  S_${n} = ${sn.toFixed(3)}`;
    }

    soundEngine.playCalculate();
    const resultObj = {
      summary: `${progType === 'arithmetic' ? 'Arifmetik' : 'Geometrik'} (n=${n})`,
      finalAnswer,
      steps
    };
    setCalcResult(resultObj);
    onSaveHistory({
      calculatorType: "Progressiya",
      inputSummary: resultObj.summary,
      result: finalAnswer,
      steps
    });
  };

  // 6. Logarithm
  const solveLogarithm = () => {
    const base = parseFloat(logBase);
    const val = parseFloat(logVal);
    if (isNaN(base) || isNaN(val) || base <= 0 || base === 1 || val <= 0) {
      alert("Asos a > 0, a ≠ 1 va son b > 0 bo'lishi shart!");
      return;
    }

    const res = Math.log(val) / Math.log(base);
    const steps = [
      `Hisoblanayotgan ifoda: log_${base} (${val})`,
      `Logarifm ta'rifi: ${base}^x = ${val}`,
      `Asosni almashtirish formulasi (natural logarifm orqali):`,
      `log_${base}(${val}) = ln(${val}) / ln(${base})`,
      `ln(${val}) ≈ ${Math.log(val).toFixed(5)},  ln(${base}) ≈ ${Math.log(base).toFixed(5)}`,
      `Natija: ${Math.log(val).toFixed(5)} / ${Math.log(base).toFixed(5)} = ${res.toFixed(5)}`
    ];

    const finalAnswer = `log_${base}(${val}) = ${res.toFixed(4)}`;
    soundEngine.playCalculate();
    const resultObj = {
      summary: `log_${base}(${val})`,
      finalAnswer,
      steps
    };
    setCalcResult(resultObj);
    onSaveHistory({
      calculatorType: "Logarifm",
      inputSummary: resultObj.summary,
      result: finalAnswer,
      steps
    });
  };

  // 7. Trigonometry
  const solveTrigonometry = () => {
    const angleInput = parseFloat(trigAngle);
    if (isNaN(angleInput)) return;

    let rad = angleInput;
    if (trigUnit === 'deg') {
      rad = (angleInput * Math.PI) / 180;
    }

    let val = 0;
    let funcName = '';
    const steps = [
      `Burchak: ${angleInput}${trigUnit === 'deg' ? '°' : ' rad'}`,
      `Radiandagi qiymati: ${rad.toFixed(4)} rad`
    ];

    if (trigFunc === 'sin') {
      val = Math.sin(rad);
      funcName = `sin(${angleInput}°)`;
      steps.push(`sin(α) formulasi: birlik aylanadagi y-ordinata.`);
    } else if (trigFunc === 'cos') {
      val = Math.cos(rad);
      funcName = `cos(${angleInput}°)`;
      steps.push(`cos(α) formulasi: birlik aylanadagi x-abssissa.`);
    } else if (trigFunc === 'tg') {
      val = Math.tan(rad);
      funcName = `tg(${angleInput}°)`;
      steps.push(`tg(α) = sin(α) / cos(α)`);
    } else {
      const tanVal = Math.tan(rad);
      if (Math.abs(tanVal) < 1e-9) {
        alert("ctg bu burchakda mavjud emas!");
        return;
      }
      val = 1 / tanVal;
      funcName = `ctg(${angleInput}°)`;
      steps.push(`ctg(α) = cos(α) / sin(α) = 1 / tg(α)`);
    }

    steps.push(`Aniq hisoblangan qiymat: ${val.toFixed(5)}`);
    const finalAnswer = `${funcName} = ${val.toFixed(4)}`;
    soundEngine.playCalculate();
    const resultObj = {
      summary: funcName,
      finalAnswer,
      steps
    };
    setCalcResult(resultObj);
    onSaveHistory({
      calculatorType: "Trigonometriya",
      inputSummary: resultObj.summary,
      result: finalAnswer,
      steps
    });
  };

  // 8. Derivative calculation: f(x) = ax³ + bx² + cx + d
  const solveDerivative = () => {
    const a = parseFloat(polyA);
    const b = parseFloat(polyB);
    const c = parseFloat(polyC);
    const d = parseFloat(polyD);
    const x0 = parseFloat(polyX0);

    const da = 3 * a;
    const db = 2 * b;
    const dc = c;

    const slope = da * x0 * x0 + db * x0 + dc;
    const fX0 = a * Math.pow(x0, 3) + b * Math.pow(x0, 2) + c * x0 + d;
    // Tangent line: y - y0 = k(x - x0) => y = k*x + (y0 - k*x0)
    const tangentConst = fX0 - slope * x0;

    const steps = [
      `Funksiya: f(x) = ${a}x³ ${b >= 0 ? '+' : ''}${b}x² ${c >= 0 ? '+' : ''}${c}x ${d >= 0 ? '+' : ''}${d}`,
      `Differensiallash qoidalari: (xⁿ)' = n·xⁿ⁻¹, (c)' = 0`,
      `Hosila funksiyasi: f'(x) = 3·(${a})x² + 2·(${b})x + (${c}) = ${da}x² ${db >= 0 ? '+' : ''}${db}x ${dc >= 0 ? '+' : ''}${dc}`,
      `Nuqtadagi qiymat f'(${x0}):\n  f'(${x0}) = ${da}·(${x0})² + ${db}·(${x0}) + ${dc} = ${slope.toFixed(3)}`,
      `Funksiyaning shu nuqtadagi qiymati: f(${x0}) = ${fX0.toFixed(3)}`,
      `Urinma tenglamasi: y = ${slope.toFixed(2)}x ${tangentConst >= 0 ? '+' : ''}${tangentConst.toFixed(2)}`
    ];

    const finalAnswer = `f'(${x0}) = ${slope.toFixed(3)}`;
    soundEngine.playCalculate();
    const resultObj = {
      summary: `f'(x) at x=${x0}`,
      finalAnswer,
      steps
    };
    setCalcResult(resultObj);
    onSaveHistory({
      calculatorType: "Hosila",
      inputSummary: resultObj.summary,
      result: finalAnswer,
      steps
    });
  };

  // 9. Percentage calculation
  const solvePercentage = () => {
    const num = parseFloat(percNum);
    const rate = parseFloat(percRate);
    if (isNaN(num) || isNaN(rate)) return;

    const part = (num * rate) / 100;
    const increased = num + part;
    const decreased = num - part;

    const steps = [
      `Asosiy son: ${num}, Foiz: ${rate}%`,
      `Ulush: (${num} · ${rate}) / 100 = ${part.toLocaleString('uz-UZ')}`,
      `${rate}% ga oshganda: ${num} + ${part} = ${increased.toLocaleString('uz-UZ')}`,
      `${rate}% ga kamayganda: ${num} - ${part} = ${decreased.toLocaleString('uz-UZ')}`
    ];

    const finalAnswer = `${rate}% = ${part.toLocaleString('uz-UZ')}`;
    soundEngine.playCalculate();
    const resultObj = {
      summary: `${num} ning ${rate}%`,
      finalAnswer,
      steps
    };
    setCalcResult(resultObj);
    onSaveHistory({
      calculatorType: "Foizlar",
      inputSummary: resultObj.summary,
      result: finalAnswer,
      steps
    });
  };

  const copyToClipboard = () => {
    if (!calcResult) return;
    soundEngine.playClick();
    const text = `${calcResult.summary}\nJavob: ${calcResult.finalAnswer}\nQadamlar:\n${calcResult.steps.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="step-calculator-module" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Calculator className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Bosqichma-bosqich Kuchli Kalkulyator
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Har bir formulani qadamma-qadam yechish va diskriminant, Viyet, integral, hosila tahlili
          </p>
        </div>

        {/* Quick solver switch modes */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
          {[
            { id: 'quadratic', label: 'Kvadrat tenglama' },
            { id: 'linear_system', label: 'Sistema' },
            { id: 'gcd_lcm', label: 'EKUB / EKUK' },
            { id: 'fractions', label: 'Kasrlar' },
            { id: 'progression', label: 'Progressiya' },
            { id: 'logarithm', label: 'Logarifm' },
            { id: 'trigonometry', label: 'Trigonometriya' },
            { id: 'derivative', label: 'Hosila' },
            { id: 'percentage', label: 'Foiz' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleModeChange(item.id as CalcMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                mode === item.id
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input panels by Mode */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-4">
            {/* Quadratic */}
            {mode === 'quadratic' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Kvadrat tenglama: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">ax² + bx + c = 0</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 font-medium">a (x² oldida)</label>
                    <input
                      type="number"
                      value={quadA}
                      onChange={(e) => setQuadA(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-medium">b (x oldida)</label>
                    <input
                      type="number"
                      value={quadB}
                      onChange={(e) => setQuadB(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-medium">c (ozod had)</label>
                    <input
                      type="number"
                      value={quadC}
                      onChange={(e) => setQuadC(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={solveQuadratic}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Yechish va Tahlil Qilish</span>
                </button>
              </div>
            )}

            {/* Linear System */}
            {mode === 'linear_system' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Chiziqli tenglamalar sistemasi (2 noma&apos;lumli)
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={sysA1}
                      onChange={(e) => setSysA1(e.target.value)}
                      className="w-16 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                    <span className="text-xs font-mono">x +</span>
                    <input
                      type="number"
                      value={sysB1}
                      onChange={(e) => setSysB1(e.target.value)}
                      className="w-16 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                    <span className="text-xs font-mono">y =</span>
                    <input
                      type="number"
                      value={sysC1}
                      onChange={(e) => setSysC1(e.target.value)}
                      className="w-20 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={sysA2}
                      onChange={(e) => setSysA2(e.target.value)}
                      className="w-16 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                    <span className="text-xs font-mono">x +</span>
                    <input
                      type="number"
                      value={sysB2}
                      onChange={(e) => setSysB2(e.target.value)}
                      className="w-16 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                    <span className="text-xs font-mono">y =</span>
                    <input
                      type="number"
                      value={sysC2}
                      onChange={(e) => setSysC2(e.target.value)}
                      className="w-20 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                </div>
                <button
                  onClick={solveLinearSystem}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Kramer Usulida Yechish</span>
                </button>
              </div>
            )}

            {/* GCD / LCM */}
            {mode === 'gcd_lcm' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Ikkita sonning EKUB va EKUKini topish
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 font-medium">1-son (a)</label>
                    <input
                      type="number"
                      value={numA}
                      onChange={(e) => setNumA(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-medium">2-son (b)</label>
                    <input
                      type="number"
                      value={numB}
                      onChange={(e) => setNumB(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                </div>
                <button
                  onClick={solveGcdLcm}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Evklid Algoritmi Bilan Yechish</span>
                </button>
              </div>
            )}

            {/* Fractions */}
            {mode === 'fractions' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Oddiy kasrlar ustida to&apos;rt amal
                </div>
                <div className="flex items-center justify-center gap-3">
                  {/* Fraction 1 */}
                  <div className="flex flex-col items-center gap-1 w-16">
                    <input
                      type="number"
                      value={f1Num}
                      onChange={(e) => setF1Num(e.target.value)}
                      className="w-full text-center px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                    <div className="w-full h-0.5 bg-slate-400 dark:bg-slate-600" />
                    <input
                      type="number"
                      value={f1Den}
                      onChange={(e) => setF1Den(e.target.value)}
                      className="w-full text-center px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>

                  {/* Operator */}
                  <select
                    value={fracOp}
                    onChange={(e) => setFracOp(e.target.value as '+' | '-' | '*' | '/')}
                    className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-sm font-bold font-mono"
                  >
                    <option value="+">+</option>
                    <option value="-">−</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                  </select>

                  {/* Fraction 2 */}
                  <div className="flex flex-col items-center gap-1 w-16">
                    <input
                      type="number"
                      value={f2Num}
                      onChange={(e) => setF2Num(e.target.value)}
                      className="w-full text-center px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                    <div className="w-full h-0.5 bg-slate-400 dark:bg-slate-600" />
                    <input
                      type="number"
                      value={f2Den}
                      onChange={(e) => setF2Den(e.target.value)}
                      className="w-full text-center px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                </div>
                <button
                  onClick={solveFractions}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Kasrlarni Hisoblash</span>
                </button>
              </div>
            )}

            {/* Progression */}
            {mode === 'progression' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setProgType('arithmetic')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      progType === 'arithmetic' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    Arifmetik
                  </button>
                  <button
                    onClick={() => setProgType('geometric')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      progType === 'geometric' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    Geometrik
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-slate-500">1-had ({progType === 'arithmetic' ? 'a₁' : 'b₁'})</label>
                    <input
                      type="number"
                      value={progFirst}
                      onChange={(e) => setProgFirst(e.target.value)}
                      className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">{progType === 'arithmetic' ? 'Ayirma (d)' : 'Maxraj (q)'}</label>
                    <input
                      type="number"
                      value={progDiff}
                      onChange={(e) => setProgDiff(e.target.value)}
                      className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Hadlar soni (n)</label>
                    <input
                      type="number"
                      value={progN}
                      onChange={(e) => setProgN(e.target.value)}
                      className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                </div>
                <button
                  onClick={solveProgression}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>n-had va Yig&apos;indini Hisoblash</span>
                </button>
              </div>
            )}

            {/* Logarithm */}
            {mode === 'logarithm' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Logarifm: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">log_a (b)</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 font-medium">Asos (a &gt; 0, a ≠ 1)</label>
                    <input
                      type="number"
                      value={logBase}
                      onChange={(e) => setLogBase(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-medium">Qiymat (b &gt; 0)</label>
                    <input
                      type="number"
                      value={logVal}
                      onChange={(e) => setLogVal(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                </div>
                <button
                  onClick={solveLogarithm}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Logarifmni Hisoblash</span>
                </button>
              </div>
            )}

            {/* Trigonometry */}
            {mode === 'trigonometry' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Trigonometrik funksiyalar qiymati
                </div>
                <div className="flex gap-2">
                  {(['sin', 'cos', 'tg', 'ctg'] as const).map((fn) => (
                    <button
                      key={fn}
                      onClick={() => setTrigFunc(fn)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold font-mono cursor-pointer ${
                        trigFunc === fn ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    >
                      {fn}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500">Burchak</label>
                    <input
                      type="number"
                      value={trigAngle}
                      onChange={(e) => setTrigAngle(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">O&apos;lchov birligi</label>
                    <select
                      value={trigUnit}
                      onChange={(e) => setTrigUnit(e.target.value as 'deg' | 'rad')}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    >
                      <option value="deg">Gradus (°)</option>
                      <option value="rad">Radian (rad)</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={solveTrigonometry}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Trigonometriyani Hisoblash</span>
                </button>
              </div>
            )}

            {/* Derivative */}
            {mode === 'derivative' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Ko&apos;phad hosilasi: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">ax³ + bx² + cx + d</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="text-xs text-slate-500">a (x³)</label>
                    <input
                      type="number"
                      value={polyA}
                      onChange={(e) => setPolyA(e.target.value)}
                      className="w-full mt-1 px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">b (x²)</label>
                    <input
                      type="number"
                      value={polyB}
                      onChange={(e) => setPolyB(e.target.value)}
                      className="w-full mt-1 px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">c (x)</label>
                    <input
                      type="number"
                      value={polyC}
                      onChange={(e) => setPolyC(e.target.value)}
                      className="w-full mt-1 px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">d (ozod)</label>
                    <input
                      type="number"
                      value={polyD}
                      onChange={(e) => setPolyD(e.target.value)}
                      className="w-full mt-1 px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500">Nuqta x₀ (hosila qiymatini hisoblash uchun)</label>
                  <input
                    type="number"
                    value={polyX0}
                    onChange={(e) => setPolyX0(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                  />
                </div>
                <button
                  onClick={solveDerivative}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Hosila va Urinmani Topish</span>
                </button>
              </div>
            )}

            {/* Percentage */}
            {mode === 'percentage' && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Foiz hisoblash va chegirma tahlili
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 font-medium">Asosiy son (so&apos;m, dona)</label>
                    <input
                      type="number"
                      value={percNum}
                      onChange={(e) => setPercNum(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-medium">Foiz stavkasi (%)</label>
                    <input
                      type="number"
                      value={percRate}
                      onChange={(e) => setPercRate(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono"
                    />
                  </div>
                </div>
                <button
                  onClick={solvePercentage}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Foizni Hisoblash</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Output & Step-by-step display */}
        <div className="lg:col-span-7">
          <div className="h-full min-h-[300px] flex flex-col justify-between p-6 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-inner">
            {calcResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-indigo-400 font-mono tracking-wider uppercase">Misol:</span>
                    <div className="text-base font-semibold font-mono text-white">{calcResult.summary}</div>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
                    title="Nusxalash"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Nusxalandi!" : "Nusxalash"}</span>
                  </button>
                </div>

                {/* Main final highlight */}
                <div className="p-4 rounded-xl bg-indigo-950/50 border border-indigo-500/30">
                  <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider block mb-1">
                    Yakuniy Javob:
                  </span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                    {calcResult.finalAnswer}
                  </div>
                </div>

                {/* Steps container */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
                    Qadamma-qadam tushuntirish:
                  </span>
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                    {calcResult.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs sm:text-sm font-mono text-slate-300 leading-relaxed"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <div className="p-3 rounded-2xl bg-slate-800/80 mb-3 text-indigo-400">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-200">Hisoblash kutilyapti</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">
                  Chap tarafdagi parametrlarni kiriting va &quot;Yechish&quot; tugmasini bosing. Natija har bir qadami va isboti bilan shu yerda paydo bo&apos;ladi.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
