// ─────────────────────────────────────────────────────────────────────────────
// FirstDayTrack.tsx — the six-screen briefing a brand new hire reads on shift one.
//
// Screen two is the one that was missing. It told a new seller to smile and go
// out, and never mentioned that most of the people they step in front of will
// walk straight past. Somebody who has not been warned takes thirty walk-pasts
// personally before lunch and has no energy left by the afternoon — which is
// exactly the seller the owner does not want to lose in week one. It is said
// before they go out because on day one that is calibration, not an excuse;
// the "you are off the hook" version is conditional and lives in `close-fault`,
// where it belongs, after the demo rather than before it.
//
// Rebuilt on the Counter Light design system (it was hardcoded to the old dark
// palette, so on a light-mode phone it was a black rectangle in a white app).
// The Spanish was also half Latin-American and, in one line, half English
// ("postura confiende te hace approachable"); it is European Spanish, informal
// "tú", throughout now.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Heart,
  Shield,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ConfettiCelebration from '../components/ConfettiCelebration';

/* One per step. `Shield` belongs to the rejection step: it is armour, not a
   warning sign — the point of that step is that being walked past cannot hurt
   you if you were expecting it. */
const ICONS: LucideIcon[] = [Sparkles, Shield, Zap, Heart, Eye, Users];

interface StepData {
  title: string;
  body: string;
  cta: string;
  tips: string[];
}

const STEPS_EN: StepData[] = [
  {
    title: 'Welcome to Zero Lines',
    body: "Your first day is NOT about selling. Repeat: you are NOT selling today. Your only job is to stop people on the street and bring them into the shop. That's it. One step at a time. The skincare specialists handle the rest. Your energy is your superpower — and it is enough for today.",
    cta: "Got it — what's my job?",
    tips: [
      "Today you bring people in. You are not a seller yet.",
      'Your only metric: how many people you get through the door.',
      'Smile like you mean it — energy is contagious.',
      'Nobody expects you to sell on day one. Relax.',
    ],
  },
  {
    title: 'Most of them will walk past',
    body: "Nobody tells you this on day one, so here it is before you go out. Most of the people you step in front of will not stop. Not because you did it wrong — because that is the job, and it is the same for everyone out there, including the best one in the centre. If you are not ready for it, you will take thirty walk-pasts personally by lunchtime and your energy will be gone. So expect it, count it, and keep going. The one who does stop is worth all of them.",
    cta: 'Alright — how do I stop them?',
    tips: [
      'Being ignored is not rejection. They never even heard you.',
      'Say it to yourself now: most will walk past, and that is normal.',
      'The tenth no does not mean anything about the eleventh person.',
      'The only thing that would be your fault is going quiet and stopping nobody.',
      'One person inside is worth thirty who walked past. Go and get them.',
    ],
  },
  {
    title: 'Energy is everything',
    body: 'People feel your energy before they hear your words. Slumped shoulders? They walk past. Monotone voice? They keep walking. A big smile, open posture and an enthusiastic tone stops people. You are transferring energy to them. Make them feel good in two seconds. That is the whole job right now.',
    cta: 'Show me how to stop people',
    tips: [
      'Stand tall — a confident posture makes you approachable.',
      'Smile BEFORE you speak — let them see it coming.',
      'Use your hands — animated people look alive and interesting.',
      "Speak with enthusiasm — even a simple 'Hey!' with energy works.",
    ],
  },
  {
    title: 'The compliment stop',
    body: "The easiest way to stop someone is a genuine compliment. Not 'nice shoes' — that is lazy. Try: 'That colour is STUNNING on you!' or 'I love your energy!' It has to be specific and genuine. People smell fake from a mile away. Pick ONE compliment opener and practise it twenty times today.",
    cta: 'How do I connect after the stop?',
    tips: [
      "'Excuse me! That scarf is gorgeous — the colour is perfect on you!'",
      "'I love your vibe — you look like someone who takes care of their skin!'",
      "'Those nails are beautiful! Speaking of beauty… have you heard of us?'",
      'Always follow the compliment with a reason to come inside.',
    ],
  },
  {
    title: 'Build a connection in five seconds',
    body: "You stopped them — great. Now you have five seconds before they walk away. Do not pitch products. Do not mention prices. Just connect. Use humour: 'I promise I am not selling anything… okay, maybe a little!' Or curiosity: 'Can I show you something? Ten seconds, that is all I need.' Read the reaction — if they smile, keep going. If they tense up, give them space.",
    cta: 'How do I hand them over?',
    tips: [
      "Humour breaks the ice: 'I'm new — my job is just to make friends!'",
      "Curiosity hook: 'We have something amazing inside — two minutes?'",
      'Read the body language — crossed arms mean back off a little.',
      "If they say 'I'm in a hurry' → 'I get it — this takes sixty seconds!'",
      'Your goal: get them inside. The specialist does the rest.',
    ],
  },
  {
    title: 'Hand over like a pro',
    body: "You brought them to the door — now seal the handover. Walk them in confidently and introduce them to the nearest specialist: 'This is [name], they will take great care of you.' Then stay nearby and listen. Watch how the specialist talks. That is your next lesson. For now, celebrate every person you got inside. That is a win. Repeat fifty times and you will be unstoppable.",
    cta: 'I am ready — take me to training',
    tips: [
      'Walk them in — do not just point at the door.',
      'Introduce them to a specialist by name.',
      'Stay and observe — you learn by watching.',
      'Every person inside is a win. Count your wins.',
      'Energy → Stop → Connect → Bring inside → Hand over',
    ],
  },
];

const STEPS_ES: StepData[] = [
  {
    title: 'Bienvenido a Zero Lines',
    body: 'Tu primer día NO va de vender. Repite: hoy NO vendes. Tu único trabajo es parar a gente en la calle y traerla dentro de la tienda. Ya está. Paso a paso. Las especialistas se encargan del resto. Tu energía es tu superpoder — y hoy es más que suficiente.',
    cta: 'Entendido — ¿cuál es mi trabajo?',
    tips: [
      'Hoy traes gente dentro. Todavía no eres vendedor.',
      'Tu única métrica: cuánta gente metes por la puerta.',
      'Sonríe de verdad — la energía se contagia.',
      'Nadie espera que vendas el primer día. Relájate.',
    ],
  },
  {
    title: 'La mayoría va a pasar de largo',
    body: 'Nadie te lo cuenta el primer día, así que te lo cuento antes de salir. La mayoría de la gente a la que te pongas delante no va a parar. No porque lo hagas mal — porque el trabajo es así, y es igual para todos los que están ahí fuera, incluido el mejor del centro. Si no vas preparado, a mediodía te habrás tomado treinta desprecios como algo personal y te habrás quedado sin energía. Así que cuéntalo con ello, llévalo en la cuenta y sigue. El que sí para vale por todos los demás.',
    cta: 'Vale — ¿cómo los paro?',
    tips: [
      'Que te ignoren no es un rechazo. Ni siquiera te han oído.',
      'Dítelo ahora: la mayoría va a pasar de largo, y es lo normal.',
      'El décimo no no dice nada de la persona número once.',
      'Lo único que sí sería culpa tuya es apagarte y no parar a nadie.',
      'Una persona dentro vale por treinta que pasaron. Ve a por ella.',
    ],
  },
  {
    title: 'La energía lo es todo',
    body: 'La gente siente tu energía antes de oír tus palabras. ¿Hombros caídos? Pasan de largo. ¿Voz monótona? Siguen andando. Una sonrisa grande, postura abierta y tono entusiasta sí paran a la gente. Les estás transmitiendo energía. Haz que se sientan bien en dos segundos. Ahora mismo, ese es todo tu trabajo.',
    cta: 'Enséñame a parar a la gente',
    tips: [
      'Ponte recto — una postura segura te hace más accesible.',
      'Sonríe ANTES de hablar — que lo vean venir.',
      'Usa las manos — quien gesticula parece vivo e interesante.',
      "Habla con entusiasmo — hasta un '¡Hola!' con energía funciona.",
    ],
  },
  {
    title: 'La parada del cumplido',
    body: "La forma más fácil de parar a alguien es un cumplido sincero. No 'bonitos zapatos' — eso es de vagos. Prueba: '¡Ese color te queda INCREÍBLE!' o '¡Me encanta tu energía!'. Tiene que ser concreto y sincero. La gente detecta lo falso a kilómetros. Elige UN cumplido y practícalo veinte veces hoy.",
    cta: '¿Cómo conecto después de pararlos?',
    tips: [
      "'¡Perdona! Ese pañuelo es precioso — ¡el color te queda perfecto!'",
      "'Me encanta tu rollo — se nota que te cuidas la piel.'",
      "'¡Qué uñas más bonitas! Hablando de belleza… ¿nos conoces?'",
      'Después del cumplido, dales siempre un motivo para entrar.',
    ],
  },
  {
    title: 'Conecta en cinco segundos',
    body: "Los has parado — genial. Ahora tienes cinco segundos antes de que se vayan. No hables de productos. No menciones precios. Solo conecta. Usa el humor: 'Te prometo que no vendo nada… bueno, un poquito.' O la curiosidad: '¿Te enseño una cosa? Diez segundos, nada más.' Lee su reacción — si sonríen, sigue. Si se tensan, dales aire.",
    cta: '¿Cómo se los paso a la especialista?',
    tips: [
      "El humor rompe el hielo: 'Soy nuevo — mi trabajo es hacer amigos.'",
      "Gancho de curiosidad: 'Tenemos algo increíble dentro — ¿dos minutos?'",
      'Lee el lenguaje corporal — brazos cruzados significa aflojar.',
      "Si dicen 'voy con prisa' → '¡Te entiendo — son sesenta segundos!'",
      'Tu meta: que entren. La especialista hace el resto.',
    ],
  },
  {
    title: 'Pásalos como un profesional',
    body: "Los has traído hasta la puerta — ahora cierra el traspaso. Entra con ellos con confianza y preséntalos a la especialista más cercana: 'Esta es [nombre], te va a cuidar de maravilla.' Luego quédate cerca y escucha. Fíjate en cómo habla. Esa es tu siguiente lección. Por ahora, celebra a cada persona que has metido dentro. Eso es una victoria. Repítelo cincuenta veces y serás imparable.",
    cta: '¡Estoy listo! Llévame a la formación',
    tips: [
      'Entra con ellos — no señales la puerta y ya.',
      'Preséntalos a una especialista por su nombre.',
      'Quédate y observa — se aprende mirando.',
      'Cada persona dentro es una victoria. Cuenta tus victorias.',
      'Energía → Para → Conecta → Mete dentro → Pasa el relevo',
    ],
  },
];

const COPY = {
  overline: { en: 'First Day Track', es: 'Ruta del Primer Día' },
  title: { en: 'Survive your first day', es: 'Sobrevive a tu primer día' },
  subtitle: { en: 'Weeks 1-2: stopping only. No selling.', es: 'Semanas 1-2: solo parar. Nada de vender.' },
  step: { en: 'Step', es: 'Paso' },
  of: { en: 'of', es: 'de' },
  doneTitle: { en: 'You did it', es: 'Lo has conseguido' },
  doneBody: {
    en: 'That is the whole first-day track. Remember: your job is to bring people inside. Nothing else, for now.',
    es: 'Esa es toda la ruta del primer día. Recuerda: tu trabajo es meter gente dentro. Nada más, por ahora.',
  },
  doneMantra: {
    en: 'Energy → Stop → Connect → Bring inside → Hand over',
    es: 'Energía → Para → Conecta → Mete dentro → Pasa el relevo',
  },
  goTraining: { en: 'Go to training', es: 'Ir a la formación' },
  goHome: { en: 'Back to home', es: 'Volver al inicio' },
} as const;

export default function FirstDayTrack() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isEs = language === 'es';
  const c = (key: keyof typeof COPY) => (isEs ? COPY[key].es : COPY[key].en);

  const steps = isEs ? STEPS_ES : STEPS_EN;
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [confettiDone, setConfettiDone] = useState(false);

  const current = steps[step];
  const StepIcon = ICONS[step] ?? Sparkles;
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    setCompleted((prev) => (prev.includes(step) ? prev : [...prev, step]));
    if (isLast) setDone(true);
    else setStep((s) => s + 1);
  };

  if (done) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center bg-background px-6 pb-24 pt-10 text-center">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-tint"
        >
          <CheckCircle2 size={40} className="text-teal-strong" aria-hidden />
        </motion.div>

        <h1 className="mt-5 text-h1 text-ink">{c('doneTitle')}</h1>
        <p className="mt-3 max-w-[34ch] text-body-small text-ink-2">{c('doneBody')}</p>
        <p className="mt-4 rounded-chip bg-surface-sunken px-4 py-2 text-caption font-semibold text-teal-strong">
          {c('doneMantra')}
        </p>

        <div className="mt-8 w-full max-w-xs space-y-3">
          <button type="button" onClick={() => navigate('/training')} className="btn-primary w-full">
            {c('goTraining')}
          </button>
          <button type="button" onClick={() => navigate('/home')} className="btn-quiet w-full">
            {c('goHome')}
          </button>
        </div>

        <ConfettiCelebration trigger={!confettiDone} onComplete={() => setConfettiDone(true)} />
        <div className="pb-safe" />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background px-5 pb-10 pt-6">
      <header className="mb-5">
        <p className="text-overline text-teal-strong">{c('overline')}</p>
        <h1 className="text-h2 text-ink">{c('title')}</h1>
        <p className="mt-1 text-caption text-ink-3">{c('subtitle')}</p>
      </header>

      {/* Progress */}
      <div className="mb-4 flex gap-1.5" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={steps.length}>
        {steps.map((_, i) => (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-sunken">
            <motion.div
              className="h-full rounded-full bg-teal"
              initial={{ width: 0 }}
              animate={{ width: completed.includes(i) ? '100%' : i === step ? '55%' : '0%' }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-chip bg-teal-tint">
          <StepIcon size={18} className="text-teal-strong" aria-hidden />
        </div>
        <span className="text-caption text-ink-3">
          {c('step')} {step + 1} {c('of')} {steps.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-h1 text-ink">{current.title}</h2>
          <p className="mt-3 text-body text-ink-2">{current.body}</p>

          <ul className="mt-5 space-y-2">
            {current.tips.map((tip, i) => (
              <motion.li
                key={tip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="surface-flat flex items-start gap-3 p-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-tint text-caption font-bold text-teal-strong">
                  {i + 1}
                </span>
                <span className="text-body-small text-ink-2">{tip}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      <button type="button" onClick={handleNext} className="btn-primary mt-6 w-full">
        {isLast && completed.includes(step) ? (
          <>
            <CheckCircle2 size={18} aria-hidden />
            {current.cta}
          </>
        ) : (
          <>
            {current.cta}
            <ArrowRight size={18} aria-hidden />
          </>
        )}
      </button>

      <div className="pb-safe" />
    </div>
  );
}
