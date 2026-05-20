// ─────────────────────────────────────────────────────────────
// Translation data — managed by another agent
// This is a stub with basic keys to get the app running.
// Will be expanded with full translations.
// ─────────────────────────────────────────────────────────────

export type TranslationKey =
  | 'welcome'
  | 'welcome_back'
  | 'subtitle'
  | 'get_started'
  | 'categories'
  | 'continue_learning'
  | 'daily_challenge'
  | 'mark_done'
  | 'completed'
  | 'home'
  | 'profile'
  | 'settings'
  | 'reset_progress'
  | 'name'
  | 'location'
  | 'role'
  | 'language'
  | 'salesperson'
  | 'manager'
  | 'english'
  | 'spanish'
  | 'andorra'
  | 'gibraltar'
  | 'enter_name'
  | 'whats_your_name';

export type Language = 'en' | 'es';

export const translations: Record<Language, Partial<Record<TranslationKey, string>>> = {
  en: {
    welcome: 'Welcome to Zero Lines Academy',
    welcome_back: 'Welcome back',
    subtitle: 'Your journey to becoming a master seller starts here',
    get_started: 'Get Started',
    categories: 'Categories',
    continue_learning: 'Continue Learning',
    daily_challenge: 'Daily Challenge',
    mark_done: 'Mark Done',
    completed: 'Completed',
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings',
    reset_progress: 'Reset Progress',
    name: 'Name',
    location: 'Location',
    role: 'Role',
    language: 'Language',
    salesperson: 'Salesperson',
    manager: 'Manager',
    english: 'English',
    spanish: 'Español',
    andorra: 'Andorra',
    gibraltar: 'Gibraltar',
    enter_name: 'Enter your name',
    whats_your_name: "What's your name?",
  },
  es: {
    welcome: 'Bienvenido a Zero Lines Academy',
    welcome_back: 'Bienvenido de nuevo',
    subtitle: 'Tu viaje para convertirte en un vendedor experto comienza aquí',
    get_started: 'Comenzar',
    categories: 'Categorías',
    continue_learning: 'Continuar Aprendiendo',
    daily_challenge: 'Desafío Diario',
    mark_done: 'Marcar Hecho',
    completed: 'Completado',
    home: 'Inicio',
    profile: 'Perfil',
    settings: 'Ajustes',
    reset_progress: 'Reiniciar Progreso',
    name: 'Nombre',
    location: 'Ubicación',
    role: 'Rol',
    language: 'Idioma',
    salesperson: 'Vendedor',
    manager: 'Gerente',
    english: 'English',
    spanish: 'Español',
    andorra: 'Andorra',
    gibraltar: 'Gibraltar',
    enter_name: 'Ingresa tu nombre',
    whats_your_name: '¿Cómo te llamas?',
  },
};
