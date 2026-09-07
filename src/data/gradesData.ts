import { GradeInfo, GradeNumber } from '../types/math';

export const GRADES_DATA: Record<GradeNumber, GradeInfo> = {
  1: {
    grade: 1,
    title: "1-Sinf: Boshlang'ich arifmetika",
    subtitle: "Sonlar dunyosiga ilk qadam va mantiq",
    description: "1 dan 20 gacha bo'lgan sonlar, qo'shish va ayirishning asosiy qonunlari, taqqoslash va elementar geometrik shakllar.",
    iconName: "Binary",
    topics: [
      "1 dan 20 gacha sonlar va sanoq",
      "Qo'shish va ayirish amallari",
      "O'rin almashtirish qonuni",
      "Sonlarni taqqoslash (>, <, =)",
      "Oddiy masalalar va mantiq"
    ],
    laws: [
      {
        id: "l1_1",
        title: "Qo'shishning o'rin almashtirish qonuni",
        formula: "a + b = b + a",
        statement: "Qo'shiluvchilarning o'rni almashgani bilan yig'indi o'zgarmaydi.",
        explanation: "Masalan: 3 ta qizil olma va 2 ta yashil olma jami 5 ta olma bo'ladi. 2 + 3 ham baribir 5 ga teng.",
        realWorldApplication: "Do'konda mahsulotlarni qaysi tartibda savatga solsangiz ham, umumiy narx o'zgarmaydi.",
        grade: 1
      },
      {
        id: "l1_2",
        title: "Nolning qo'shish va ayirishdagi xossasi",
        formula: "a + 0 = a, a - 0 = a",
        statement: "Har qanday songa nolni qo'shsak yoki noldan ayirsak, sonning o'zi hosil bo'ladi.",
        explanation: "5 ta qalam bor edi, hech narsa qo'shilmadi (0). Yana 5 ta qalam qoldi.",
        realWorldApplication: "Hisobingizga pul tushmasa yoki chiqmasa, balans o'zgarishsiz qoladi.",
        grade: 1
      }
    ],
    formulas: [
      {
        id: "f1_1",
        title: "Qo'shish komponentlari",
        expression: "Qo'shiluvchi + Qo'shiluvchi = Yig'indi",
        description: "Yig'indini topish amali",
        example: "4 + 5 = 9 (4 va 5 - qo'shiluvchilar, 9 - yig'indi)",
        explanation: "Ikki yoki undan ortiq miqdorni birlashtirish.",
        grade: 1,
        category: "Arifmetika"
      },
      {
        id: "f1_2",
        title: "Ayirish komponentlari",
        expression: "Kamayuvchi - Ayriluvchi = Ayirma",
        description: "Ayirmani topish amali",
        example: "10 - 3 = 7 (10 - kamayuvchi, 3 - ayriluvchi, 7 - ayirma)",
        explanation: "Umumiy miqdordan bir qismini olib tashlash.",
        grade: 1,
        category: "Arifmetika"
      }
    ],
    examples: [
      {
        id: "e1_1",
        grade: 1,
        topic: "Taqqoslash va amallar",
        problem: "Akmalda 7 ta daftar bor, Salimda esa Akmaldan 4 ta ko'p. Salimda nechta daftar bor?",
        steps: [
          "1. Masala shartini tushunamiz: Salimda Akmaldan 4 ta ko'p.",
          "2. Amallarni bajaramiz: 7 + 4 = 11.",
          "3. Javobni tekshiramiz: 11 soni 7 dan 4 taga katta."
        ],
        answer: "Salimda 11 ta daftar bor.",
        tip: "'...ta ko'p' desa qo'shish, '...ta kam' desa ayirish amali qo'llaniladi."
      }
    ],
    quiz: [
      {
        id: "q1_1",
        grade: 1,
        topic: "Qo'shish qonuni",
        question: "Agar 6 + 8 = 14 bo'lsa, 8 + 6 nechaga teng bo'ladi?",
        options: ["12", "14", "16", "8"],
        correctIndex: 1,
        explanation: "Qo'shishning o'rin almashtirish qonuniga ko'ra (a + b = b + a) yig'indi o'zgarmaydi va 14 ga teng.",
        difficulty: "oson"
      },
      {
        id: "q1_2",
        grade: 1,
        topic: "Sonlar tarkibi",
        question: "Qaysi ifoda to'g'ri: 15 - 7 = ?",
        options: ["7", "8", "9", "6"],
        correctIndex: 1,
        explanation: "15 dan 7 ni ayirsak, 8 qoladi (chunki 8 + 7 = 15).",
        difficulty: "oson"
      }
    ]
  },

  2: {
    grade: 2,
    title: "2-Sinf: Ko'paytirish va Bo'lish",
    subtitle: "Tezkor hisoblash poydevori",
    description: "Ko'paytirish jadvali, guruhlash qonunlari, qoldiqli bo'lish tushunchasi, qavslar va amallar ketma-ketligi.",
    iconName: "X",
    topics: [
      "Ko'paytirish va bo'lish jadvali",
      "Ko'paytirishning guruhlash qonuni",
      "Qavsli amallarni bajarish tartibi",
      "Juft va toq sonlar",
      "Vaqt va o'lchov birliklari (soat, minut, metr)"
    ],
    laws: [
      {
        id: "l2_1",
        title: "Ko'paytirishning o'rin almashtirish qonuni",
        formula: "a · b = b · a",
        statement: "Ko'paytuvchilarning o'rni almashgani bilan ko'paytma o'zgarmaydi.",
        explanation: "3 qatorda 4 tadan olma = 12 ta. 4 qatorda 3 tadan olma = 12 ta.",
        realWorldApplication: "Plitkalarni gorizontal yoki vertikal sanasangiz ham umumiy soni bir xil chiqadi.",
        grade: 2
      },
      {
        id: "l2_2",
        title: "0 va 1 ga ko'paytirish qoidalari",
        formula: "a · 1 = a,  a · 0 = 0",
        statement: "Har qanday sonni 1 ga ko'paytirsa o'zi chiqadi, 0 ga ko'paytirsa natija hamisha 0 bo'ladi.",
        explanation: "1 ta qutida 7 ta qalam = 7 ta. Bo'sh qutida qalamlar = 0 ta.",
        realWorldApplication: "Bo'sh qutilar soni qancha bo'lishidan qat'iy nazar, ulardagi narsa nolga teng.",
        grade: 2
      }
    ],
    formulas: [
      {
        id: "f2_1",
        title: "Ko'paytirish komponentlari",
        expression: "Ko'paytuvchi · Ko'paytuvchi = Ko'paytma",
        description: "Bir xil qo'shiluvchilar yig'indisini tez hisoblash",
        example: "6 · 4 = 24 (6 + 6 + 6 + 6 = 24)",
        explanation: "Takroriy qo'shishni qisqartirilgan ifodalash usuli.",
        grade: 2,
        category: "Arifmetika"
      },
      {
        id: "f2_2",
        title: "Bo'lish komponentlari",
        expression: "Bo'linuvchi : Bo'luvchi = Bo'linma",
        description: "Teng qismlarga taqsimlash",
        example: "20 : 5 = 4",
        explanation: "Umumiy miqdorni berilgan guruhlarga teng taqsimlash.",
        grade: 2,
        category: "Arifmetika"
      }
    ],
    examples: [
      {
        id: "e2_1",
        grade: 2,
        topic: "Amallar tartibi",
        problem: "Ifodaning qiymatini toping: 35 - 3 · 6 + (14 : 2)",
        steps: [
          "1. Qavs ichidagi amal bajariladi: 14 : 2 = 7.",
          "2. Ko'paytirish amali bajariladi: 3 · 6 = 18.",
          "3. Ketma-ket ayirish va qo'shish: 35 - 18 = 17.",
          "4. 17 + 7 = 24."
        ],
        answer: "24",
        tip: "Amallar tartibi: 1) Qavslar, 2) Ko'paytirish va bo'lish, 3) Qo'shish va ayirish."
      }
    ],
    quiz: [
      {
        id: "q2_1",
        grade: 2,
        topic: "Amallar tartibi",
        question: "Quyidagi ifoda qiymati nechaga teng: 20 + 5 · 4 ?",
        options: ["100", "40", "29", "45"],
        correctIndex: 1,
        explanation: "Oldin ko'paytirish bajariladi: 5 · 4 = 20, so'ngra qo'shish: 20 + 20 = 40.",
        difficulty: "oson"
      }
    ]
  },

  3: {
    grade: 3,
    title: "3-Sinf: Ko'p xonali sonlar va Geometriya",
    subtitle: "Yuzalar, perimetr va qoldiqli bo'lish",
    description: "1000 gacha sonlar, to'g'ri to'rtburchak va kvadratning yuzi hamda perimetri, qoldiqli bo'lish formulasi.",
    iconName: "Shapes",
    topics: [
      "Ko'p xonali sonlar ustida to'rt amal",
      "Qoldiqli bo'lish formulasi (a = b·q + r)",
      "Perimetr va Yuza tushunchasi",
      "Noma'lum qatnashgan tenglamalar (x + a = b)",
      "O'lchov birliklari (kg, g, metr, sm, litr)"
    ],
    laws: [
      {
        id: "l3_1",
        title: "Qoldiqli bo'lish asosiy qonuni",
        formula: "a = b · q + r  (0 ≤ r < b)",
        statement: "Bo'linuvchi = Bo'luvchi · To'liqsiz bo'linma + Qoldiq. Bunda qoldiq doimo bo'luvchidan kichik bo'lishi shart!",
        explanation: "17 : 5 = 3 (qoldiq 2). Tekshirish: 5 · 3 + 2 = 17. Qoldiq (2) bo'luvchi (5) dan kichik.",
        realWorldApplication: "Do'kondagi mahsulotlarni qutilarga joylashda ortib qolgan sonini hisoblash.",
        grade: 3
      },
      {
        id: "l3_2",
        title: "Ko'paytirishning taqsimot qonuni",
        formula: "(a + b) · c = a·c + b·c",
        statement: "Yig'indini songa ko'paytirish uchun har bir qo'shiluvchini shu songa ko'paytirib, natijalar qo'shiladi.",
        explanation: "(20 + 4) · 3 = 20·3 + 4·3 = 60 + 12 = 72.",
        realWorldApplication: "Osonlik bilan xotirada katta sonlarni tez ko'paytirish.",
        grade: 3
      }
    ],
    formulas: [
      {
        id: "f3_1",
        title: "To'g'ri to'rtburchak perimetri",
        expression: "P = 2 · (a + b)",
        description: "Barcha tomonlar uzunliklari yig'indisi",
        example: "a = 6 sm, b = 4 sm => P = 2 · (6 + 4) = 20 sm",
        explanation: "Shakl atrofini to'liq aylanib chiqish uzunligi.",
        grade: 3,
        category: "Geometriya"
      },
      {
        id: "f3_2",
        title: "To'g'ri to'rtburchak yuzi",
        expression: "S = a · b",
        description: "Shakl egallagan sirt maydoni",
        example: "a = 5 m, b = 3 m => S = 5 · 3 = 15 m²",
        explanation: "Bo'yini eniga ko'paytirish orqali yuza aniqlanadi.",
        grade: 3,
        category: "Geometriya"
      }
    ],
    examples: [
      {
        id: "e3_1",
        grade: 3,
        topic: "Geometriya va tenglama",
        problem: "To'g'ri to'rtburchakning perimetri 30 sm, eni 6 sm. Uning bo'yini va yuzini toping.",
        steps: [
          "1. Perimetr formulasi: P = 2 · (a + b) = 30 sm.",
          "2. Yarim perimetr: a + b = 30 : 2 = 15 sm.",
          "3. Eni b = 6 sm bo'lsa, bo'yi a = 15 - 6 = 9 sm.",
          "4. Yuzi: S = a · b = 9 · 6 = 54 sm²."
        ],
        answer: "Bo'yi 9 sm, Yuzi 54 sm².",
        tip: "Perimetrdan tomonni topish uchun avval 2 ga bo'lib yarim perimetrni toping."
      }
    ],
    quiz: [
      {
        id: "q3_1",
        grade: 3,
        topic: "Qoldiqli bo'lish",
        question: "29 ni 4 ga bo'lganda qoldiq nechaga teng bo'ladi?",
        options: ["1", "2", "3", "4"],
        correctIndex: 0,
        explanation: "29 = 4 · 7 + 1. Shuning uchun qoldiq 1 ga teng.",
        difficulty: "oson"
      }
    ]
  },

  4: {
    grade: 4,
    title: "4-Sinf: Katta sonlar va Harakat masalalari",
    subtitle: "Tezlik, vaqt, masofa va mantiqiy algoritmlar",
    description: "Milliongacha bo'lgan sonlar, tezlik (v), vaqt (t) va masofa (S) bog'liqligi, qarama-qarshi harakat, boshlang'ich kasrlar.",
    iconName: "Gauge",
    topics: [
      "Ko'p xonali sonlar bilan ustunli amallar",
      "Tezlik, vaqt va masofa formulalari (S = v·t)",
      "Qarama-qarshi va bir yo'nalishli harakat",
      "Kasr tushunchasi (ulushlar)",
      "Murakkab matnli masalalar yechish usullari"
    ],
    laws: [
      {
        id: "l4_1",
        title: "Harakatning asosiy qonuni",
        formula: "S = v · t,  v = S / t,  t = S / v",
        statement: "Bosib o'tilgan masofa tezlik va harakat vaqti ko'paytmasiga teng.",
        explanation: "Mashina 60 km/soat tezlik bilan 3 soat yursa: S = 60 · 3 = 180 km.",
        realWorldApplication: "Safar rejalashtirishda manzilga yetib borish vaqtini oldindan bilish.",
        grade: 4
      },
      {
        id: "l4_2",
        title: "Qarama-qarshi harakatda yaqinlashish tezligi",
        formula: "v_yaqin = v₁ + v₂",
        statement: "Ikki jism bir-biriga qarab harakatlansa, ularning uchrashuv tezligi tezliklar yig'indisiga teng bo'ladi.",
        explanation: "Poyezdlar 80 va 70 km/soat bilan bir-biriga kelsa, ular soatiga 150 km tezlik bilan yaqinlashadi.",
        realWorldApplication: "Yo'l harakati xavfsizligi va logistika hisob-kitoblari.",
        grade: 4
      }
    ],
    formulas: [
      {
        id: "f4_1",
        title: "Uchrashuv vaqti formulasi",
        expression: "t_uchrashuv = S / (v₁ + v₂)",
        description: "Ikki jismning qancha vaqtda uchrashishini aniqlash",
        example: "S = 300 km, v₁ = 60, v₂ = 40 => t = 300 / 100 = 3 soat",
        explanation: "Oradagi masofa yaqinlashish tezligiga bo'linadi.",
        grade: 4,
        category: "Harakat"
      }
    ],
    examples: [
      {
        id: "e4_1",
        grade: 4,
        topic: "Harakat masalalari",
        problem: "Oralaridagi masofa 400 km bo'lgan ikki shahardan bir-biriga qarab ikki avtomobil yo'lga chiqdi. Birining tezligi 60 km/soat, ikkinchisiniki 40 km/soat. Ular necha soatdan keyin uchrashadi?",
        steps: [
          "1. Yaqinlashish tezligini topamiz: v = 60 + 40 = 100 km/soat.",
          "2. Uchrashuv vaqti: t = S / v = 400 / 100 = 4 soat.",
          "3. Har biri bosgan yo'lni tekshirish: 60·4 = 240 km, 40·4 = 160 km. Jami: 240 + 160 = 400 km."
        ],
        answer: "Ular 4 soatdan so'ng uchrashadi.",
        tip: "Bir-biriga qarab harakatda tezliklar qo'shiladi, bir yo'nalishda quvib yetishda esa ayiriladi."
      }
    ],
    quiz: [
      {
        id: "q4_1",
        grade: 4,
        topic: "Tezlik va vaqt",
        question: "Velosipedchi 15 km/soat tezlik bilan 3 soat yursa, qancha masofani bosib o'tadi?",
        options: ["30 km", "45 km", "60 km", "5 km"],
        correctIndex: 1,
        explanation: "S = v · t = 15 · 3 = 45 km.",
        difficulty: "oson"
      }
    ]
  },

  5: {
    grade: 5,
    title: "5-Sinf: Kasrlar, Foizlar, EKUB va EKUK",
    subtitle: "Ratsional sonlar olami va bo'linish alomatlari",
    description: "Oddiy va o'nli kasrlar ustida amallar, EKUB (Evklid usuli) va EKUK, bo'linish alomatlari (2, 3, 5, 9, 10), foiz hisoblash.",
    iconName: "Divide",
    topics: [
      "Natural sonlarning bo'linish alomatlari",
      "EKUB va EKUK hisoblash qoidalari",
      "Oddiy kasrlar (qo'shish, ayirish, ko'paytirish, bo'lish)",
      "O'nli kasrlar va xonadosh qo'shish",
      "Foiz tushunchasi (1% = 1/100)"
    ],
    laws: [
      {
        id: "l5_1",
        title: "EKUB va EKUK o'zaro bog'liqligi",
        formula: "EKUB(a, b) · EKUK(a, b) = a · b",
        statement: "Ixtiyoriy ikkita a va b sonlarining EKUBi bilan EKUKi ko'paytmasi shu sonlarning o'zaro ko'paytmasiga teng.",
        explanation: "Masalan, 12 va 18 uchun: EKUB(12,18)=6, EKUK(12,18)=36. 6 · 36 = 216 va 12 · 18 = 216.",
        realWorldApplication: "Raqamli kodlash va algoritmlarda sonlarni optimal bo'laklash.",
        grade: 5
      },
      {
        id: "l5_2",
        title: "Kasrning asosiy xossasi",
        formula: "a / b = (a · m) / (b · m) = (a : k) / (b : k)",
        statement: "Kasrning surat va maxrajini noldan farqli bir xil songa ko'paytirsa yoki bo'lsa, kasr qiymati o'zgarmaydi.",
        explanation: "2/3 = (2·4)/(3·4) = 8/12. Pitsaning 2/3 qismi 8/12 qismi bilan bir xil kattalikda.",
        realWorldApplication: "Kasrlarni qisqartirish va umumiy maxrajga keltirish asosi.",
        grade: 5
      }
    ],
    formulas: [
      {
        id: "f5_1",
        title: "Sonning foizini topish",
        expression: "Natija = (Son · Foiz) / 100",
        description: "Berilgan sonning p foizini hisoblash",
        example: "200 ning 15 foizi: (200 · 15) / 100 = 30",
        explanation: "Foiz - yuzdan bir ulush demakdir.",
        grade: 5,
        category: "Foizlar"
      },
      {
        id: "f5_2",
        title: "Oddiy kasrlarni bo'lish",
        expression: "(a / b) : (c / d) = (a · d) / (b · c)",
        description: "Ikkinchi kasrning o'rnini teskarisiga almashtirib ko'paytirish",
        example: "(2/3) : (5/7) = (2·7) / (3·5) = 14/15",
        explanation: "Bo'lish amali teskari kasrga ko'paytirishga teng.",
        grade: 5,
        category: "Kasrlar"
      }
    ],
    examples: [
      {
        id: "e5_1",
        grade: 5,
        topic: "EKUB va EKUK",
        problem: "24 va 36 sonlarining EKUB va EKUKini toping.",
        steps: [
          "1. Tub ko'paytuvchilarga ajratamiz: 24 = 2³ · 3¹,  36 = 2² · 3².",
          "2. EKUB uchun umumiy tub asoslarning eng kichik darajasini olamiz: 2² · 3¹ = 4 · 3 = 12.",
          "3. EKUK uchun barcha tub asoslarning eng katta darajasini olamiz: 2³ · 3² = 8 · 9 = 72.",
          "4. Tekshiramiz: 12 · 72 = 864 va 24 · 36 = 864."
        ],
        answer: "EKUB(24, 36) = 12,  EKUK(24, 36) = 72.",
        tip: "EKUB - ikkalasini ham bo'ladigan eng katta son, EKUK - ikkalasiga ham bo'linadigan eng kichik son."
      }
    ],
    quiz: [
      {
        id: "q5_1",
        grade: 5,
        topic: "Foizlar",
        question: "Mahsulot narxi 120 000 so'm edi. U 20% ga arzonlashdi. Yangi narxi qancha?",
        options: ["96 000 so'm", "100 000 so'm", "104 000 so'm", "24 000 so'm"],
        correctIndex: 0,
        explanation: "Chegirma: 120 000 · 0.20 = 24 000 so'm. Yangi narx: 120 000 - 24 000 = 96 000 so'm.",
        difficulty: "orta"
      }
    ]
  },

  6: {
    grade: 6,
    title: "6-Sinf: Manfiy sonlar, Proporsiya va Modul",
    subtitle: "Butun sonlar va Dekart koordinatalari",
    description: "Manfiy va musbat sonlar ustida amallar, sonning moduli |x|, proporsiyaning asosiy xossasi, masshtab, koordinata to'g'ri chizig'i.",
    iconName: "Compass",
    topics: [
      "Musbat va manfiy butun sonlar (Z to'plami)",
      "Ishoralar qoidalari: (-) · (-) = (+), (-) · (+) = (-)",
      "Sonning moduli (|x|) xossalari",
      "Proporsiyaning asosiy xossasi (a/b = c/d)",
      "Dekart koordinatalar tekisligi"
    ],
    laws: [
      {
        id: "l6_1",
        title: "Proporsiyaning asosiy xossasi",
        formula: "a / b = c / d  <=>  a · d = b · c",
        statement: "Proporsiyaning chetki hadlari ko'paytmasi uning o'rta hadlari ko'paytmasiga teng.",
        explanation: "3 / 5 = 6 / 10 bo'lsa: 3 · 10 = 30 va 5 · 6 = 30.",
        realWorldApplication: "Pazandalik retseptlarini ko'paytirish, valyuta ayirboshlash va xaritalar masshtabi.",
        grade: 6
      },
      {
        id: "l6_2",
        title: "Ishoralar qonuni (Ko'paytirish va bo'lish)",
        formula: "(+) · (+) = (+),  (-) · (-) = (+),  (+) · (-) = (-)",
        statement: "Bir xil ishorali sonlar ko'paytmasi musbat, har xil ishoralilar ko'paytmasi manfiy bo'ladi.",
        explanation: "(-4) · (-5) = +20, lekin (-4) · (+5) = -20.",
        realWorldApplication: "Fizikada yo'nalishli kuchlar va zaryadlar hisob-kitobi.",
        grade: 6
      }
    ],
    formulas: [
      {
        id: "f6_1",
        title: "Sonning moduli (absolyut qiymati)",
        expression: "|x| = x (agar x ≥ 0);  |x| = -x (agar x < 0)",
        description: "Koordinata boshidan berilgan nuqtagacha bo'lgan masofa",
        example: "|-7| = 7,  |+5| = 5,  |0| = 0",
        explanation: "Masofa hech qachon manfiy bo'lmagani kabi modul ham doim manfiy emas.",
        grade: 6,
        category: "Modul"
      }
    ],
    examples: [
      {
        id: "e6_1",
        grade: 6,
        topic: "Proporsiya",
        problem: "Tenglamani yeching: 12 / x = 4 / 7",
        steps: [
          "1. Proporsiyaning asosiy xossasini qo'llaymiz: 4 · x = 12 · 7.",
          "2. Ko'paytmani hisoblaymiz: 4x = 84.",
          "3. x ni topamiz: x = 84 / 4 = 21.",
          "4. Tekshiramiz: 12/21 = 4/7 (3 ga qisqartirilsa teng bo'ladi)."
        ],
        answer: "x = 21",
        tip: "Proporsiyada noma'lumni topish uchun unga qarama-qarshi bo'lmagan ikki had ko'paytirilib, noma'lum ro'parasidagiga bo'linadi."
      }
    ],
    quiz: [
      {
        id: "q6_1",
        grade: 6,
        topic: "Manfiy sonlar amallari",
        question: "Hisoblang: -15 - (-25) + (-10)",
        options: ["-50", "0", "20", "-20"],
        correctIndex: 1,
        explanation: "-15 - (-25) = -15 + 25 = 10. Keyin: 10 + (-10) = 0.",
        difficulty: "orta"
      }
    ]
  },

  7: {
    grade: 7,
    title: "7-Sinf: Qisqa ko'paytirish va Chiziqli tenglamalar",
    subtitle: "Haqiqiy algebraning boshlanishi",
    description: "Qisqa ko'paytirish formulalari ((a±b)², a²-b², a³±b³), daraja xossalari, ko'phadlar, 1 va 2 noma'lumli chiziqli tenglamalar sistemasi.",
    iconName: "Variable",
    topics: [
      "Qisqa ko'paytirish formulalari (7 ta asosiy formula)",
      "Daraja xossalari (aⁿ · aᵐ = aⁿ⁺ᵐ)",
      "Birhadlar va ko'phadlar ustida amallar",
      "Bir noma'lumli chiziqli tenglamalar (ax + b = 0)",
      "Tenglamalar sistemasi (o'rniga qo'yish va qo'shish usuli)"
    ],
    laws: [
      {
        id: "l7_1",
        title: "Kvadratlar ayirmasi qonuni",
        formula: "a² - b² = (a - b)(a + b)",
        statement: "Ikki son kvadratlarining ayirmasi ularning ayirmasi bilan yig'indisi ko'paytmasiga teng.",
        explanation: "51² - 49² = (51 - 49)(51 + 49) = 2 · 100 = 200. Hisoblash juda osonlashadi!",
        realWorldApplication: "Murakkab sonli hisob-kitoblarni qog'ozsiz va tezkor bajarish.",
        grade: 7
      },
      {
        id: "l7_2",
        title: "Daraja ko'rsatkichlarining asosiy xossalari",
        formula: "aⁿ · aᵐ = aⁿ⁺ᵐ,  (aⁿ)ᵐ = aⁿ·ᵐ,  aⁿ / aᵐ = aⁿ⁻ᵐ",
        statement: "Bir xil asosli darajalarni ko'paytirishda daraja ko'rsatkichlari qo'shiladi, darajaga ko'targanda ko'paytiriladi.",
        explanation: "2³ · 2⁴ = 2³⁺⁴ = 2⁷ = 128. (2³)² = 2⁶ = 64.",
        realWorldApplication: "Kompyuter xotirasi (kilobayt, megabayt, gigabayt) ikkining darajalari asosida ishlaydi.",
        grade: 7
      }
    ],
    formulas: [
      {
        id: "f7_1",
        title: "Yig'indining kvadrati",
        expression: "(a + b)² = a² + 2ab + b²",
        description: "Ikki son yig'indisini kvadratga ko'tarish formulasi",
        example: "(x + 3)² = x² + 6x + 9",
        explanation: "Birinchi had kvadrati + ikkilangan ko'paytma + ikkinchi had kvadrati.",
        grade: 7,
        category: "Qisqa ko'paytirish"
      },
      {
        id: "f7_2",
        title: "Ayirmaning kvadrati",
        expression: "(a - b)² = a² - 2ab + b²",
        description: "Ikki son ayirmasini kvadratga ko'tarish formulasi",
        example: "(2x - 5)² = 4x² - 20x + 25",
        explanation: "O'rtadagi ikkilangan ko'paytma oldida minus ishorasi bo'ladi.",
        grade: 7,
        category: "Qisqa ko'paytirish"
      },
      {
        id: "f7_3",
        title: "Kublar formulalari",
        expression: "a³ ± b³ = (a ± b)(a² ∓ ab + b²)",
        description: "Kublar yig'indisi va ayirmasini ko'paytuvchilarga ajratish",
        example: "x³ - 8 = (x - 2)(x² + 2x + 4)",
        explanation: "Tugallanmagan kvadrat bilan ko'paytiriladi.",
        grade: 7,
        category: "Qisqa ko'paytirish"
      }
    ],
    examples: [
      {
        id: "e7_1",
        grade: 7,
        topic: "Tenglamalar sistemasi",
        problem: "Tenglamalar sistemasini yeching:\n{ 2x + y = 13\n{ x - y = 2",
        steps: [
          "1. Qo'shish usulidan foydalanamiz: ikkala tenglamani hadma-had qo'shamiz:",
          "   (2x + y) + (x - y) = 13 + 2",
          "2. 3x = 15 => x = 5.",
          "3. x ning qiymatini ikkinchi tenglamaga qo'yamiz: 5 - y = 2 => y = 3.",
          "4. Tekshirish: 2·5 + 3 = 13 (to'g'ri), 5 - 3 = 2 (to'g'ri)."
        ],
        answer: "x = 5,  y = 3",
        tip: "Bir xil yoki qarama-qarshi ishorali bir xil noma'lumlar bo'lsa, qo'shish yoki ayirish eng tezkor usuldir."
      }
    ],
    quiz: [
      {
        id: "q7_1",
        grade: 7,
        topic: "Qisqa ko'paytirish",
        question: "(3a - 4b)² ifodani ko'phad shaklida yozing:",
        options: ["9a² - 16b²", "9a² - 24ab + 16b²", "9a² + 24ab + 16b²", "9a² - 12ab + 16b²"],
        correctIndex: 1,
        explanation: "(3a - 4b)² = (3a)² - 2·(3a)·(4b) + (4b)² = 9a² - 24ab + 16b².",
        difficulty: "orta"
      }
    ]
  },

  8: {
    grade: 8,
    title: "8-Sinf: Kvadrat tenglamalar va Ildizlar",
    subtitle: "Diskriminant, Viyet teoremasi va Kvadrat funksiya",
    description: "Arifmetik kvadrat ildiz (√x), to'liq va chala kvadrat tenglamalar, Diskriminant (D = b² - 4ac), Viyet teoremasi, oraliqlar usuli.",
    iconName: "SquareRoot",
    topics: [
      "Arifmetik kvadrat ildiz xossalari",
      "Kvadrat tenglamalar (ax² + bx + c = 0)",
      "Diskriminant tahlili (D > 0, D = 0, D < 0)",
      "Viyet teoremasi va unga teskari teorema",
      "Kvadrat tengsizliklar va oraliqlar usuli"
    ],
    laws: [
      {
        id: "l8_1",
        title: "Viyet teoremasi",
        formula: "x₁ + x₂ = -b / a,   x₁ · x₂ = c / a",
        statement: "Agar kvadrat tenglama ildizlarga ega bo'lsa, ildizlar yig'indisi -b/a ga, ko'paytmasi esa c/a ga teng.",
        explanation: "Keltirilgan tenglama (x² + px + q = 0) uchun: x₁ + x₂ = -p, x₁ · x₂ = q.",
        realWorldApplication: "Ildizlarni diskriminantsiz, xayolda tezkor topish.",
        grade: 8
      },
      {
        id: "l8_2",
        title: "Kvadrat ildizning asosiy xossasi",
        formula: "√(a · b) = √a · √b,  √(a / b) = √a / √b  (a ≥ 0, b > 0)",
        statement: "Ko'paytmaning kvadrat ildizi har bir ko'paytuvchi ildizlari ko'paytmasiga teng.",
        explanation: "√36 = √(4 · 9) = √4 · √9 = 2 · 3 = 6.",
        realWorldApplication: "Geometriyada gipotenuza va balandliklarni aniq hisoblash.",
        grade: 8
      }
    ],
    formulas: [
      {
        id: "f8_1",
        title: "Diskriminant formulasi",
        expression: "D = b² - 4ac",
        description: "Kvadrat tenglamaning ildizlari sonini va turini aniqlovchi ifoda",
        example: "2x² + 5x - 3 = 0 => D = 5² - 4·2·(-3) = 25 + 24 = 49",
        explanation: "D > 0 bo'lsa 2 ta haqiqiy ildiz, D = 0 bo'lsa 1 ta (karrali) ildiz, D < 0 bo'lsa haqiqiy ildiz yo'q.",
        grade: 8,
        category: "Kvadrat tenglama"
      },
      {
        id: "f8_2",
        title: "Kvadrat tenglama ildizlari formulasi",
        expression: "x₁,₂ = (-b ± √D) / (2a)",
        description: "Ildizlarni hisoblashning universal formulasi",
        example: "D = 49, √D = 7 => x₁ = (-5 + 7)/4 = 0.5,  x₂ = (-5 - 7)/4 = -3",
        explanation: "Barcha koeffitsiyentlar diskriminant yordamida ildizga aylanadi.",
        grade: 8,
        category: "Kvadrat tenglama"
      }
    ],
    examples: [
      {
        id: "e8_1",
        grade: 8,
        topic: "Kvadrat tenglama",
        problem: "Tenglamani yeching: x² - 7x + 10 = 0",
        steps: [
          "1. 1-usul (Viyet teoremasi): x₁ + x₂ = 7,  x₁ · x₂ = 10.",
          "   Ko'paytmasi 10, yig'indisi 7 bo'lgan sonlar: 2 va 5.",
          "2. 2-usul (Diskriminant): D = (-7)² - 4·1·10 = 49 - 40 = 9.",
          "   √D = 3.",
          "   x₁ = (7 + 3) / 2 = 5,",
          "   x₂ = (7 - 3) / 2 = 2."
        ],
        answer: "x₁ = 2,  x₂ = 5",
        tip: "Ko'paytmasi musbat bo'lsa, ikkala ildiz bir xil ishorali bo'ladi."
      }
    ],
    quiz: [
      {
        id: "q8_1",
        grade: 8,
        topic: "Diskriminant",
        question: "3x² - 6x + 3 = 0 tenglamaning nechta haqiqiy ildizi bor?",
        options: ["Ildizi yo'q", "1 ta (karrali)", "2 ta turli", "Cheksiz ko'p"],
        correctIndex: 1,
        explanation: "D = (-6)² - 4·3·3 = 36 - 36 = 0. Diskriminant 0 ga teng bo'lgani uchun 1 ta (karrali) ildiz mavjud: x = 1.",
        difficulty: "orta"
      }
    ]
  },

  9: {
    grade: 9,
    title: "9-Sinf: Progressiyalar, Trigonometriya va Ehtimollik",
    subtitle: "Ketma-ketliklar, Burchaklar va Tasodifiy hodisalar",
    description: "Arifmetik va Geometrik progressiya formulalari, sin, cos, tg, ctg asosiy ayniyatlari, ehtimollikning klassik formulasi (P = m/n).",
    iconName: "TrendingUp",
    topics: [
      "Arifmetik progressiya (n-had va dastlabki n ta had yig'indisi)",
      "Geometrik progressiya (n-had va yig'indi)",
      "Cheksiz kamayuvchi geometrik progressiya (S = b₁ / (1 - q))",
      "Asosiy trigonometrik ayniyatlar (sin²α + cos²α = 1)",
      "Ehtimollik nazariyasi asoslari (Hodisa ehtimoli)"
    ],
    laws: [
      {
        id: "l9_1",
        title: "Asosiy trigonometrik ayniyat",
        formula: "sin²α + cos²α = 1",
        statement: "Bir xil burchak sinusining kvadrati bilan kosinusining kvadrati yig'indisi doimo 1 ga teng.",
        explanation: "Pifagor teoremasining birlik aylanadagi ifodasidir (x² + y² = 1).",
        realWorldApplication: "Astronomiya, navigatsiya, kompyuter grafikasi va robototexnika.",
        grade: 9
      },
      {
        id: "l9_2",
        title: "Ehtimollikning klassik ta'rifi",
        formula: "P(A) = m / n  (0 ≤ P(A) ≤ 1)",
        statement: "Hodisa ehtimoli qulaylik tug'diruvchi hollar soni (m) ning barcha teng ehtimolli hollar soni (n) ga nisbatiga teng.",
        explanation: "O'yin suyagini tashlaganda toq son tushish ehtimoli: m = 3 {1,3,5}, n = 6 => P = 3/6 = 0.5 (50%).",
        realWorldApplication: "Sug'urta, moliya risklarini baholash va sun'iy intellekt tahlili.",
        grade: 9
      }
    ],
    formulas: [
      {
        id: "f9_1",
        title: "Arifmetik progressiya n-hadi va yig'indisi",
        expression: "aₙ = a₁ + (n - 1)d,   Sₙ = (a₁ + aₙ) · n / 2",
        description: "Har bir hadi avvalgisiga d sonini qo'shish bilan hosil bo'ladi",
        example: "a₁ = 3, d = 4 bo'lsa, a₁₀ = 3 + 9·4 = 39. S₁₀ = (3 + 39)·10/2 = 210",
        explanation: "Qadimgi Karl Gauss maktabda 1 dan 100 gacha sonlarni aynan shu formula g'oyasi bilan bir necha soniyada hisoblagan.",
        grade: 9,
        category: "Progressiyalar"
      },
      {
        id: "f9_2",
        title: "Geometrik progressiya n-hadi",
        expression: "bₙ = b₁ · qⁿ⁻¹,   Sₙ = b₁(qⁿ - 1) / (q - 1)",
        description: "Har bir hadi avvalgisini maxraj q ga ko'paytirish bilan hosil bo'ladi",
        example: "b₁ = 2, q = 3 bo'lsa, b₄ = 2 · 3³ = 54",
        explanation: "Bank foizlari (murakkab foiz) va viruslar ko'payishi geometrik progressiyaga bo'ysunadi.",
        grade: 9,
        category: "Progressiyalar"
      }
    ],
    examples: [
      {
        id: "e9_1",
        grade: 9,
        topic: "Arifmetik progressiya",
        problem: "Arifmetik progressiyada a₁ = 5 va d = 3 bo'lsa, uning dastlabki 20 ta hadi yig'indisini (S₂₀) toping.",
        steps: [
          "1. 20-hadni topamiz: a₂₀ = a₁ + (20 - 1)d = 5 + 19 · 3 = 5 + 57 = 62.",
          "2. Yig'indi formulasi: S₂₀ = (a₁ + a₂₀) · n / 2.",
          "3. Qiymatlarni qo'yamiz: S₂₀ = (5 + 62) · 20 / 2 = 67 · 10 = 670."
        ],
        answer: "S₂₀ = 670",
        tip: "Yig'indini to'g'ridan-to'g'ri Sₙ = [2a₁ + (n-1)d]·n / 2 formulasi orqali ham bitta qadamda topsa bo'ladi."
      }
    ],
    quiz: [
      {
        id: "q9_1",
        grade: 9,
        topic: "Trigonometriya",
        question: "Agar sin α = 0.6 va burchak I-chorakda bo'lsa, cos α nechaga teng?",
        options: ["0.4", "0.8", "0.64", "1"],
        correctIndex: 1,
        explanation: "cos²α = 1 - sin²α = 1 - 0.36 = 0.64. I-chorakda cos musbat, demak cos α = √0.64 = 0.8.",
        difficulty: "orta"
      }
    ]
  },

  10: {
    grade: 10,
    title: "10-Sinf: Logarifmlar va Trigonometriya Formulalari",
    subtitle: "Algebra va analiz asoslari",
    description: "Trigonometrik qo'shish formulalari, ikkilangan burchak, keltirish formulalari, ko'rsatkichli va logarifmik tenglamalar, logarifm xossalari.",
    iconName: "Calculator",
    topics: [
      "Logarifm ta'rifi va xossalari (log_a b)",
      "O'nli (lg) va natural (ln) logarifmlar",
      "Ko'rsatkichli va logarifmik tenglamalar hamda tengsizliklar",
      "Trigonometriyada qo'shish formulalari (sin(α±β), cos(α±β))",
      "Ikkilangan burchak formulalari (sin 2α, cos 2α)"
    ],
    laws: [
      {
        id: "l10_1",
        title: "Logarifmning asosiy ayniyati",
        formula: "a^(log_a b) = b  (a > 0, a ≠ 1, b > 0)",
        statement: "Asos a ning darajasiga ko'tarilgan b ning a asosli logarifmi b ga teng.",
        explanation: "Chunki log_a b - bu b sonini hosil qilish uchun a ni ko'tarish kerak bo'lgan daraja ko'rsatkichidir.",
        realWorldApplication: "Zilzila kuchi (Rixter shkalasi), tovush balandligi (detsibel) va kislotalilik (pH) logarifmik shkalada hisoblanadi.",
        grade: 10
      },
      {
        id: "l10_2",
        title: "Ikkilangan burchak sinusi va kosinusi",
        formula: "sin 2α = 2 sin α cos α,   cos 2α = cos²α - sin²α",
        statement: "Ikkilangan burchak funksiyalari oddiy burchak ko'paytmalari orqali ifodalanadi.",
        explanation: "sin(α + α) = sin α cos α + cos α sin α = 2 sin α cos α.",
        realWorldApplication: "Mexanik tebranishlar, tovush to'lqinlari va o'zgaruvchan tok fizikasi.",
        grade: 10
      }
    ],
    formulas: [
      {
        id: "f10_1",
        title: "Logarifm xossalari",
        expression: "log_a(xy) = log_a x + log_a y,   log_a(x/y) = log_a x - log_a y,   log_a(xᵏ) = k · log_a x",
        description: "Ko'paytmaning logarifmi logarifmlar yig'indisiga teng",
        example: "log₂ 8 + log₂ 4 = log₂(8 · 4) = log₂ 32 = 5",
        explanation: "Murakkab ko'paytirish va bo'lish amallarini oddiy qo'shish va ayirishga aylantiradi.",
        grade: 10,
        category: "Logarifmlar"
      },
      {
        id: "f10_2",
        title: "Asosni almashtirish formulasi",
        expression: "log_a b = (log_c b) / (log_c a)",
        description: "Ixtiyoriy yangi asosga o'tish",
        example: "log₄ 8 = (log₂ 8) / (log₂ 4) = 3 / 2 = 1.5",
        explanation: "Kalkulyatorlarda har qanday logarifmni ln yoki lg orqali hisoblash imkonini beradi.",
        grade: 10,
        category: "Logarifmlar"
      }
    ],
    examples: [
      {
        id: "e10_1",
        grade: 10,
        topic: "Logarifmik tenglama",
        problem: "Tenglamani yeching: log₃ (2x - 1) = 2",
        steps: [
          "1. Aniqlanish sohasini belgilaymiz: 2x - 1 > 0 => x > 0.5.",
          "2. Logarifm ta'rifiga ko'ra darajaga o'tamiz: 2x - 1 = 3².",
          "3. 2x - 1 = 9 => 2x = 10 => x = 5.",
          "4. Tekshiramiz: 5 > 0.5 va log₃(2·5 - 1) = log₃ 9 = 2 (to'g'ri)."
        ],
        answer: "x = 5",
        tip: "Logarifmik tenglamalarda doimo aniqlanish sohasini (ichidagi ifoda > 0) tekshirishni unutmang!"
      }
    ],
    quiz: [
      {
        id: "q10_1",
        grade: 10,
        topic: "Logarifmlar",
        question: "log₂ 64 ning qiymati nechaga teng?",
        options: ["4", "6", "8", "32"],
        correctIndex: 1,
        explanation: "2⁶ = 64 bo'lgani sababli, log₂ 64 = 6 ga teng.",
        difficulty: "oson"
      }
    ]
  },

  11: {
    grade: 11,
    title: "11-Sinf: Hosila, Integral va Kombinatorika",
    subtitle: "Oliy matematika ostonasi va Nyuton merosi",
    description: "Funksiya hosilasi, hosilaning geometrik/fizik ma'nosi, urinma tenglamasi, boshlang'ich funksiya va Nyuton-Leybnits integrali, kombinatorika.",
    iconName: "Infinity",
    topics: [
      "Hosila ta'rifi va differensiallash qoidalari",
      "Hosilaning geometrik ma'nosi (urinma og'ish burchagi tg α = f'(x₀))",
      "Funksiyaning o'sish, kamayish oraliqlari va ekstremumlari",
      "Boshlang'ich funksiya va Aniq integral",
      "Nyuton-Leybnits formulasi (Yuza hisoblash)",
      "Kombinatorika (O'rinlashtirish, O'rin almashtirish, Terma va Nyuton binomi)"
    ],
    laws: [
      {
        id: "l11_1",
        title: "Nyuton-Leybnits formulasi",
        formula: "∫ₐᵇ f(x) dx = F(b) - F(a)",
        statement: "Aniq integral boshlang'ich funksiyaning yuqori chegaradagi qiymatidan quyi chegaradagi qiymatining ayirmasiga teng.",
        explanation: "Egri chiziq ostidagi yuzani aniq, mikroskopik qismlar yig'indisi orqali hisoblaydi.",
        realWorldApplication: "Fizikada bajarilgan ish, hajm, massa markazi va iqtisodiy o'sish modellarini hisoblash.",
        grade: 11
      },
      {
        id: "l11_2",
        title: "Hosilaning fizik va geometrik ma'nosi",
        formula: "v(t) = s'(t),  a(t) = v'(t) = s''(t);   k = tg α = f'(x₀)",
        statement: "Yo'l funksiyasining hosilasi oniy tezlikni beradi; urinmaning burchak koeffitsiyenti esa funksiyaning shu nuqtadagi hosilasiga teng.",
        explanation: "Nyuton tortishish qonunlari va harakat dinamikasini aynan hosila yordamida kashf qilgan.",
        realWorldApplication: "Avtomobil spidometri, kosmik kemalar traektoriyasi va akselerometrlar.",
        grade: 11
      }
    ],
    formulas: [
      {
        id: "f11_1",
        title: "Asosiy hosilalar jadvali",
        expression: "(xⁿ)' = n · xⁿ⁻¹,   (eˣ)' = eˣ,   (ln x)' = 1/x,   (sin x)' = cos x,   (cos x)' = -sin x",
        description: "Elementar funksiyalarning differensiallash qoidalari",
        example: "(x⁴)' = 4x³,   (3x² + 5x - 7)' = 6x + 5",
        explanation: "Funksiya o'zgarishining oniy tezligini ko'rsatadi.",
        grade: 11,
        category: "Hosila"
      },
      {
        id: "f11_2",
        title: "Kombinatorika: Terma (Kombinatsiya)",
        expression: "C_n^k = n! / [ k! · (n - k)! ]",
        description: "n ta elementdan k tasini tanlash usullari soni (tartib muhim emas)",
        example: "10 ta o'quvchidan 3 tasini olimpiadaga tanlash: C₁₀³ = (10·9·8)/(3·2·1) = 120",
        explanation: "Nyuton binomi koeffitsiyentlari va ehtimollar nazariyasida asosiy formula.",
        grade: 11,
        category: "Kombinatorika"
      }
    ],
    examples: [
      {
        id: "e11_1",
        grade: 11,
        topic: "Aniq integral",
        problem: "Aniq integralni hisoblang: ∫₀² (3x² + 2x) dx",
        steps: [
          "1. Boshlang'ich funksiyani topamiz: F(x) = ∫(3x² + 2x) dx = x³ + x².",
          "2. Nyuton-Leybnits formulasini qo'llaymiz: F(2) - F(0).",
          "3. Yuqori chegara: F(2) = 2³ + 2² = 8 + 4 = 12.",
          "4. Quyi chegara: F(0) = 0³ + 0² = 0.",
          "5. Natija: 12 - 0 = 12."
        ],
        answer: "12",
        tip: "Aniq integral har doim aniq songa teng bo'ladi va egri chiziqli trapetsiya yuzini ifodalaydi."
      }
    ],
    quiz: [
      {
        id: "q11_1",
        grade: 11,
        topic: "Hosila",
        question: "f(x) = x³ - 5x² + 4 funksiyaning x = 2 nuqtadagi hosilasi f'(2) ni toping:",
        options: ["-8", "-5", "-2", "4"],
        correctIndex: 0,
        explanation: "f'(x) = 3x² - 10x.  f'(2) = 3·(2²) - 10·2 = 12 - 20 = -8.",
        difficulty: "qiyin"
      }
    ]
  }
};
