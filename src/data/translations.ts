// ─────────────────────────────────────────────────────────────
// Zero Lines Academy — UI Text Translations (EN / ES)
// Complete coverage of all UI strings across the entire app
// ─────────────────────────────────────────────────────────────

export type Language = 'en' | 'es';

export const translations = {
  en: {
    // ── Navigation ──
    navHome: 'Home',
    navTraining: 'Training',
    navExercises: 'Exercises',
    navQuizzes: 'Quizzes',
    navProfile: 'Profile',

    // ── Onboarding ──
    onboardingOverline1: 'THE ACADEMY',
    onboardingTitle1: 'Master the Art of Zero Lines Selling',
    onboardingDesc1: 'Learn the exact techniques, pitches, and closes used by top earners across Gibraltar and Andorra.',
    onboardingOverline2: 'INSTANT RESULTS',
    onboardingTitle2: 'See It. Believe It. Sell It.',
    onboardingDesc2: 'Every product has a visible demo. When customers see wrinkles disappear in 60 seconds, selling becomes easy.',
    onboardingOverline3: 'EARN MORE',
    onboardingTitle3: 'From \u20AC1,500 to \u20AC8,000/Month',
    onboardingDesc3: 'Base salary is just the start. Top performers earn 5x their base through commission. Your skills directly determine your paycheck.',
    getStarted: 'Get Started',
    skipForNow: 'Skip for now',

    // ── Home Dashboard ──
    homeWelcomeBack: 'Welcome back',
    homeMotivationalSubtitle: 'Every master was once a beginner. Keep pushing forward.',
    homeCategories: 'Categories',
    homeContinueLearning: 'Continue Learning',
    homeDailyChallenge: 'Daily Challenge',
    homeMarkDone: 'Mark Done',
    homeCompleted: 'Completed',
    homeLessonsDone: 'Lessons Done',
    homeTotalXP: 'Total XP',
    homeDayStreak: 'Day Streak',
    homeDone: 'Done',
    homeGoodMorning: 'Good morning',
    homeGoodAfternoon: 'Good afternoon',
    homeGoodEvening: 'Good evening',
    homeLessonsLabel: 'Lessons',
    homeStreakLabel: 'Streak',
    homeQuickAccess: 'Quick Access',
    homeQuickAccessCheatSheets: 'Cheat Sheets',
    homeQuickAccessExercises: 'Exercises',
    homeQuickAccessQuizzes: 'Quizzes',

    // ── Training Hub ──
    trainingTitle: 'Training',
    trainingSubtitle: 'Choose your learning path',
    trainingSalesPsychology: 'Sales Psychology',
    trainingSalesPsychologyDesc: 'Master your mindset and energy',
    trainingReadingConnecting: 'Reading & Connecting',
    trainingReadingConnectingDesc: 'Read customers like a book',
    trainingArtOfStopping: 'The Art of Stopping',
    trainingArtOfStoppingDesc: 'Turn strangers into demos',
    trainingProductMastery: 'Product Mastery',
    trainingProductMasteryDesc: 'Know your products inside out',
    trainingLessons: 'lessons',

    // ── Category Hub ──
    categoryBack: 'Back',
    categoryProgress: 'Category Progress',
    categoryLessonsCompleted: 'lessons completed',
    categoryNoLessons: 'No lessons available yet.',

    // ── Lesson View ──
    lessonBack: 'Back',
    lessonBackToCategory: 'Back to Category',
    lessonScriptLabel: 'Script:',
    lessonCopy: 'Copy',
    lessonCopied: 'Copied',
    lessonProTip: 'Pro Tip',
    lessonMarkComplete: 'Mark Lesson Complete',
    lessonCompleted: 'Completed',
    lessonTakeQuiz: 'Take Quiz',
    lessonNextLesson: 'Next Lesson',

    // ── Quiz ──
    quizBackToLesson: 'Back to Lesson',
    quizQuestion: 'Question',
    quizOf: 'of',
    quizCorrect: 'Correct!',
    quizWrongPrefix: 'Correct answer was:',
    quizNextQuestion: 'Next Question',
    quizSeeResults: 'See Results',
    quizComplete: 'Quiz Complete!',
    quizYouScored: 'You scored',
    quizOutOf: 'out of',
    quizBackToLessonBtn: 'Back to Lesson',
    quizBackToCategory: 'Back to Category',

    // ── Profile ──
    profileSalesTrainee: 'Sales Trainee',
    profileLevel: 'Level',
    profileXP: 'XP',
    profileXPTO: 'XP to Level',
    profileMaxLevel: 'Max Level',
    profileTotalXP: 'Total XP',
    profileLessons: 'Lessons',
    profileQuizzesPassed: 'Quizzes Passed',
    profileStreak: 'Streak',
    profileBestStreak: 'Best Streak',
    profileAccuracy: 'Accuracy',
    profileCategoryProgress: 'Category Progress',
    profileAchievements: 'Achievements',
    profileRecentActivity: 'Recent Activity',
    profileNoActivity: 'No activity yet',
    profileNoActivitySub: 'Complete lessons to see your progress',
    profileSettings: 'Settings',
    profileDailyReminder: 'Daily Reminder',
    profileRemindMe: 'Remind me to practice',
    profileResetProgress: 'Reset Progress',
    profileResetDesc: 'Clear all data permanently',
    profileResetTitle: 'Reset All Progress?',
    profileResetWarning: 'This will permanently delete all your lessons, quiz scores, XP, streaks, and achievements. This action cannot be undone.',
    profileCancel: 'Cancel',
    profileResetEverything: 'Reset Everything',
    profileYourName: 'Your name',

    // ── Achievement Names ──
    achFirstSteps: 'First Steps',
    achFirstStepsDesc: 'Complete 1 lesson',
    achGettingWarm: 'Getting Warm',
    achGettingWarmDesc: 'Complete 5 lessons',
    achOnFire: 'On Fire',
    achOnFireDesc: 'Complete 10 lessons',
    achSyringePro: 'Syringe Pro',
    achSyringeProDesc: 'Complete all Syringe-related lessons',
    achQuizWhiz: 'Quiz Whiz',
    achQuizWhizDesc: 'Score 100% on any quiz',
    achStreakKeeper: 'Streak Keeper',
    achStreakKeeperDesc: 'Maintain a 3-day streak',
    achStreakMaster: 'Streak Master',
    achStreakMasterDesc: 'Maintain a 7-day streak',
    achCloser: 'Closer',
    achCloserDesc: 'Complete all closing technique lessons',
    achPeopleReader: 'People Reader',
    achPeopleReaderDesc: 'Complete all connecting lessons',
    achMasterSeller: 'Master Seller',
    achMasterSellerDesc: 'Complete ALL lessons',

    // ── Cheat Sheets ──
    cheatSheetsTitle: 'Cheat Sheets',
    cheatSheetsSubtitle: 'Quick reference for prices, scripts, combos & psychology',
    cheatSheetsSearch: 'Search scripts, prices, phrases...',
    cheatSheetsAll: 'All',
    cheatSheetsPrices: 'Prices',
    cheatSheetsScripts: 'Scripts',
    cheatSheetsCombos: 'Combos',
    cheatSheetsPsychology: 'Psychology',
    cheatSheetsPriceLadder: 'Price Ladder',
    cheatSheetsMinPrice: 'Minimum price:',
    cheatSheetsComboReference: 'Combo Reference',
    cheatSheetsSave: 'Save',
    cheatSheetsCialdini: "Cialdini's 6 Principles",
    cheatSheetsKeyPhrases: 'Key Phrases',
    cheatSheetsSayThis: 'SAY THIS',
    cheatSheetsAvoidThis: 'AVOID THIS',
    cheatSheetsBodyLanguage: 'Body Language Tips',
    cheatSheetsBuyingSignals: 'Buying Signals',
    cheatSheetsOpening: 'Opening',
    cheatSheetsClosing: 'Closing',
    cheatSheetsObjections: 'Objections',
    cheatSheetsPartner: 'Partner',
    cheatSheetsNoScripts: 'No scripts match your search',
    cheatSheetsNoCombos: 'No combos match your search',
    cheatSheetsNoPhrases: 'No phrases match your search',

    // ── Exercises ──
    exercisesTitle: 'Exercises',
    exercisesSubtitle: 'Practice exercises coming soon...',
    exercisesStart: 'Start Exercise',
    exercisesRolePlay: 'Role Play',
    exercisesPriceDrill: 'Price Drill',
    exercisesPitchBuilder: 'Pitch Builder',
    exercisesMatching: 'Matching',
    exercisesOrdering: 'Ordering',
    exercisesScenario: 'Scenario',
    exercisesDuration: 'Duration',
    exercisesXPReward: 'XP Reward',

    // ── Quizzes ──
    quizzesTitle: 'Quizzes',
    quizzesSubtitle: 'Knowledge quizzes coming soon...',
    quizzesGeneral: 'General Quizzes',
    quizzesLesson: 'Lesson Quizzes',

    // ── Daily Challenge Card ──
    dailyChallengeReward: 'Reward:',
    dailyChallengeMarkComplete: 'Mark Complete',
    dailyChallengeResetsTomorrow: 'Resets tomorrow',
    dailyChallengeDone: 'Done',

    // ── General / Shared ──
    loading: 'Loading...',
    error: 'Something went wrong',
    save: 'Save',
    cancel: 'Cancel',
    continue: 'Continue',
    back: 'Back',
    done: 'Done',
    skip: 'Skip',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    retry: 'Retry',
    search: 'Search',
    noResults: 'No results found',
    comingSoon: 'Coming soon',

    // ── Status / Feedback ──
    statusLocked: 'Locked',
    statusComplete: 'Complete',
    statusInProgress: 'In Progress',
    statusNotStarted: 'Not Started',

    // ── Time ──
    timeMin: 'min',
    timeHour: 'hr',
    timeDay: 'day',
    timeDays: 'days',
    timeToday: 'Today',
    timeTomorrow: 'Tomorrow',
    timeYesterday: 'Yesterday',

    // ── Auth (future) ──
    authGetStarted: 'Get Started',
    authNamePlaceholder: 'Your name',
    authSelectLocation: 'Select Location',
    authAndorra: 'Andorra',
    authGibraltar: 'Gibraltar',
    authLanguage: 'Language',
    authEnglish: 'English',
    authSpanish: 'Espa\u00f1ol',
    authContinue: 'Continue',

    // ── Misc labels ──
    lessons: 'Lessons',
    quiz: 'Quiz',
    exercise: 'Exercise',
    start: 'Start',
    complete: 'Complete',
    completed: 'Completed',
    locked: 'Locked',
    unlocked: 'Unlocked',
    reward: 'Reward',
    points: 'points',
    minutes: 'minutes',
  },

  es: {
    // ── Navigation ──
    navHome: 'Inicio',
    navTraining: 'Formaci\u00f3n',
    navExercises: 'Ejercicios',
    navQuizzes: 'Cuestionarios',
    navProfile: 'Perfil',

    // ── Onboarding ──
    onboardingOverline1: 'LA ACADEMIA',
    onboardingTitle1: 'Domina el Arte de Vender Zero Lines',
    onboardingDesc1: 'Aprende las t\u00e9cnicas, argumentos y cierres exactos que usan los mejores vendedores de Gibraltar y Andorra.',
    onboardingOverline2: 'RESULTADOS INSTANT\u00c1NEOS',
    onboardingTitle2: 'Ve. Cree. Vende.',
    onboardingDesc2: 'Cada producto tiene una demostraci\u00f3n visible. Cuando los clientes ven las arrugas desaparecer en 60 segundos, vender se vuelve f\u00e1cil.',
    onboardingOverline3: 'GANA M\u00c1S',
    onboardingTitle3: 'De \u20AC1.500 a \u20AC8.000/Mes',
    onboardingDesc3: 'El salario base es solo el principio. Los mejores ganan 5 veces su base por comisiones. Tus habilidades determinan directamente tu n\u00f3mina.',
    getStarted: 'Empezar',
    skipForNow: 'Saltar por ahora',

    // ── Home Dashboard ──
    homeWelcomeBack: 'Bienvenido de nuevo',
    homeMotivationalSubtitle: 'Todo maestro fue alguna vez un principiante. Sigue adelante.',
    homeCategories: 'Categor\u00edas',
    homeContinueLearning: 'Continuar Aprendiendo',
    homeDailyChallenge: 'Reto Diario',
    homeMarkDone: 'Marcar Hecho',
    homeCompleted: 'Completado',
    homeLessonsDone: 'Lecciones Hechas',
    homeTotalXP: 'XP Total',
    homeDayStreak: 'Racha de D\u00edas',
    homeDone: 'Hecho',
    homeGoodMorning: 'Buenos d\u00edas',
    homeGoodAfternoon: 'Buenas tardes',
    homeGoodEvening: 'Buenas noches',
    homeLessonsLabel: 'Lecciones',
    homeStreakLabel: 'Racha',
    homeQuickAccess: 'Acceso R\u00e1pido',
    homeQuickAccessCheatSheets: 'Hojas de Trucos',
    homeQuickAccessExercises: 'Ejercicios',
    homeQuickAccessQuizzes: 'Cuestionarios',

    // ── Training Hub ──
    trainingTitle: 'Formaci\u00f3n',
    trainingSubtitle: 'Elige tu camino de aprendizaje',
    trainingSalesPsychology: 'Psicolog\u00eda de Ventas',
    trainingSalesPsychologyDesc: 'Domina tu mentalidad y energ\u00eda',
    trainingReadingConnecting: 'Lectura y Conexi\u00f3n',
    trainingReadingConnectingDesc: 'Lee a los clientes como un libro',
    trainingArtOfStopping: 'El Arte de Parar',
    trainingArtOfStoppingDesc: 'Convierte desconocidos en demos',
    trainingProductMastery: 'Dominio del Producto',
    trainingProductMasteryDesc: 'Conoce tus productos a fondo',
    trainingLessons: 'lecciones',

    // ── Category Hub ──
    categoryBack: 'Volver',
    categoryProgress: 'Progreso de Categor\u00eda',
    categoryLessonsCompleted: 'lecciones completadas',
    categoryNoLessons: 'A\u00fan no hay lecciones disponibles.',

    // ── Lesson View ──
    lessonBack: 'Volver',
    lessonBackToCategory: 'Volver a Categor\u00eda',
    lessonScriptLabel: 'Gui\u00f3n:',
    lessonCopy: 'Copiar',
    lessonCopied: 'Copiado',
    lessonProTip: 'Consejo Pro',
    lessonMarkComplete: 'Marcar Lecci\u00f3n Completada',
    lessonCompleted: 'Completada',
    lessonTakeQuiz: 'Hacer Cuestionario',
    lessonNextLesson: 'Siguiente Lecci\u00f3n',

    // ── Quiz ──
    quizBackToLesson: 'Volver a Lecci\u00f3n',
    quizQuestion: 'Pregunta',
    quizOf: 'de',
    quizCorrect: '\u00a1Correcto!',
    quizWrongPrefix: 'La respuesta correcta era:',
    quizNextQuestion: 'Siguiente Pregunta',
    quizSeeResults: 'Ver Resultados',
    quizComplete: '\u00a1Cuestionario Completado!',
    quizYouScored: 'Has sacado',
    quizOutOf: 'de',
    quizBackToLessonBtn: 'Volver a Lecci\u00f3n',
    quizBackToCategory: 'Volver a Categor\u00eda',

    // ── Profile ──
    profileSalesTrainee: 'Aprendiz de Ventas',
    profileLevel: 'Nivel',
    profileXP: 'XP',
    profileXPTO: 'XP para Nivel',
    profileMaxLevel: 'Nivel M\u00e1x',
    profileTotalXP: 'XP Total',
    profileLessons: 'Lecciones',
    profileQuizzesPassed: 'Cuestionarios Aprobados',
    profileStreak: 'Racha',
    profileBestStreak: 'Mejor Racha',
    profileAccuracy: 'Precisi\u00f3n',
    profileCategoryProgress: 'Progreso por Categor\u00eda',
    profileAchievements: 'Logros',
    profileRecentActivity: 'Actividad Reciente',
    profileNoActivity: 'A\u00fan no hay actividad',
    profileNoActivitySub: 'Completa lecciones para ver tu progreso',
    profileSettings: 'Ajustes',
    profileDailyReminder: 'Recordatorio Diario',
    profileRemindMe: 'Recordarme practicar',
    profileResetProgress: 'Reiniciar Progreso',
    profileResetDesc: 'Borrar todos los datos permanentemente',
    profileResetTitle: '\u00bfReiniciar Todo el Progreso?',
    profileResetWarning: 'Esto eliminar\u00e1 permanentemente todas tus lecciones, puntuaciones, XP, rachas y logros. Esta acci\u00f3n no se puede deshacer.',
    profileCancel: 'Cancelar',
    profileResetEverything: 'Reiniciar Todo',
    profileYourName: 'Tu nombre',

    // ── Achievement Names ──
    achFirstSteps: 'Primeros Pasos',
    achFirstStepsDesc: 'Completa 1 lecci\u00f3n',
    achGettingWarm: 'Calentando Motores',
    achGettingWarmDesc: 'Completa 5 lecciones',
    achOnFire: 'Ardiendo',
    achOnFireDesc: 'Completa 10 lecciones',
    achSyringePro: 'Pro de la Jeringuilla',
    achSyringeProDesc: 'Completa todas las lecciones de Jeringuilla',
    achQuizWhiz: 'Genio de los Tests',
    achQuizWhizDesc: 'Saca un 100% en cualquier cuestionario',
    achStreakKeeper: 'Guardi\u00e1n de Rachas',
    achStreakKeeperDesc: 'Mant\u00e9n una racha de 3 d\u00edas',
    achStreakMaster: 'Maestro de Rachas',
    achStreakMasterDesc: 'Mant\u00e9n una racha de 7 d\u00edas',
    achCloser: 'El Cerrador',
    achCloserDesc: 'Completa todas las lecciones de t\u00e9cnicas de cierre',
    achPeopleReader: 'Lector de Gente',
    achPeopleReaderDesc: 'Completa todas las lecciones de conexi\u00f3n',
    achMasterSeller: 'Vendedor Maestro',
    achMasterSellerDesc: 'Completa TODAS las lecciones',

    // ── Cheat Sheets ──
    cheatSheetsTitle: 'Hojas de Referencia',
    cheatSheetsSubtitle: 'Referencia r\u00e1pida de precios, guiones, combos y psicolog\u00eda',
    cheatSheetsSearch: 'Buscar guiones, precios, frases...',
    cheatSheetsAll: 'Todo',
    cheatSheetsPrices: 'Precios',
    cheatSheetsScripts: 'Guiones',
    cheatSheetsCombos: 'Combos',
    cheatSheetsPsychology: 'Psicolog\u00eda',
    cheatSheetsPriceLadder: 'Escala de Precios',
    cheatSheetsMinPrice: 'Precio m\u00ednimo:',
    cheatSheetsComboReference: 'Referencia de Combos',
    cheatSheetsSave: 'Ahorra',
    cheatSheetsCialdini: 'Los 6 Principios de Cialdini',
    cheatSheetsKeyPhrases: 'Frases Clave',
    cheatSheetsSayThis: 'DI ESTO',
    cheatSheetsAvoidThis: 'EVITA ESTO',
    cheatSheetsBodyLanguage: 'Consejos de Lenguaje Corporal',
    cheatSheetsBuyingSignals: 'Se\u00f1ales de Compra',
    cheatSheetsOpening: 'Apertura',
    cheatSheetsClosing: 'Cierre',
    cheatSheetsObjections: 'Objeciones',
    cheatSheetsPartner: 'Pareja',
    cheatSheetsNoScripts: 'Ning\u00fan gui\u00f3n coincide con tu b\u00fasqueda',
    cheatSheetsNoCombos: 'Ning\u00fan combo coincide con tu b\u00fasqueda',
    cheatSheetsNoPhrases: 'Ninguna frase coincide con tu b\u00fasqueda',

    // ── Exercises ──
    exercisesTitle: 'Ejercicios',
    exercisesSubtitle: 'Ejercicios de pr\u00e1ctica muy pronto...',
    exercisesStart: 'Empezar Ejercicio',
    exercisesRolePlay: 'Juego de Rol',
    exercisesPriceDrill: 'Pr\u00e1ctica de Precios',
    exercisesPitchBuilder: 'Constructor de Pitch',
    exercisesMatching: 'Emparejamiento',
    exercisesOrdering: 'Ordenar',
    exercisesScenario: 'Escenario',
    exercisesDuration: 'Duraci\u00f3n',
    exercisesXPReward: 'Recompensa XP',

    // ── Quizzes ──
    quizzesTitle: 'Cuestionarios',
    quizzesSubtitle: 'Cuestionarios de conocimiento muy pronto...',
    quizzesGeneral: 'Cuestionarios Generales',
    quizzesLesson: 'Cuestionarios de Lecci\u00f3n',

    // ── Daily Challenge Card ──
    dailyChallengeReward: 'Recompensa:',
    dailyChallengeMarkComplete: 'Marcar Completado',
    dailyChallengeResetsTomorrow: 'Se reinicia ma\u00f1ana',
    dailyChallengeDone: 'Hecho',

    // ── General / Shared ──
    loading: 'Cargando...',
    error: 'Algo sali\u00f3 mal',
    save: 'Guardar',
    cancel: 'Cancelar',
    continue: 'Continuar',
    back: 'Volver',
    done: 'Hecho',
    skip: 'Saltar',
    next: 'Siguiente',
    previous: 'Anterior',
    close: 'Cerrar',
    retry: 'Reintentar',
    search: 'Buscar',
    noResults: 'No se encontraron resultados',
    comingSoon: 'Pr\u00f3ximamente',

    // ── Status / Feedback ──
    statusLocked: 'Bloqueado',
    statusComplete: 'Completo',
    statusInProgress: 'En Progreso',
    statusNotStarted: 'No Iniciado',

    // ── Time ──
    timeMin: 'min',
    timeHour: 'h',
    timeDay: 'd\u00eda',
    timeDays: 'd\u00edas',
    timeToday: 'Hoy',
    timeTomorrow: 'Ma\u00f1ana',
    timeYesterday: 'Ayer',

    // ── Auth (future) ──
    authGetStarted: 'Empezar',
    authNamePlaceholder: 'Tu nombre',
    authSelectLocation: 'Seleccionar Ubicaci\u00f3n',
    authAndorra: 'Andorra',
    authGibraltar: 'Gibraltar',
    authLanguage: 'Idioma',
    authEnglish: 'English',
    authSpanish: 'Espa\u00f1ol',
    authContinue: 'Continuar',

    // ── Misc labels ──
    lessons: 'Lecciones',
    quiz: 'Cuestionario',
    exercise: 'Ejercicio',
    start: 'Empezar',
    complete: 'Completar',
    completed: 'Completado',
    locked: 'Bloqueado',
    unlocked: 'Desbloqueado',
    reward: 'Recompensa',
    points: 'puntos',
    minutes: 'minutos',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

/**
 * Get a translated string by key.
 * Falls back to English if the key is missing in the target language.
 */
export function t(key: TranslationKey, lang: Language): string {
  return translations[lang][key] ?? translations.en[key] ?? key;
}

/**
 * Get a string with a simple placeholder replacement.
 * Usage: tReplace('quizQuestion', 'es', { 0: '1', 1: '5' })
 */
export function tReplace(
  key: TranslationKey,
  lang: Language,
  replacements: Record<string, string>
): string {
  let str = t(key, lang);
  Object.entries(replacements).forEach(([placeholder, value]) => {
    str = str.replace(`{${placeholder}}`, value);
  });
  return str;
}
