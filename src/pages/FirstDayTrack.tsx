// ─────────────────────────────────────────────────────────────────────────────
// FirstDayTrack.tsx — the six-screen briefing a brand new hire reads on shift one.
//
// ── WHAT THIS TRACK IS ──────────────────────────────────────────────────────
// The owner on new starters: "People that are new in the job, all they do for
// the first two weeks is the syringe. They don't do nothing else. They
// literally stop people and pass them to other colleagues. They don't even do
// the demonstrations themselves. They literally just stop."
//
// This screen used to agree with that in its header — "Weeks 1-2: stopping
// only" — and disagree with it in every paragraph underneath: "your first day
// is NOT about selling", "nobody expects you to sell on day one", "today you
// bring people in". Scoped to today, the rule expires tomorrow, and a reader
// finished the track believing Tuesday was their first demo. The horizon is a
// fortnight and it is now said that way on every screen.
//
// So the six steps ARE the stopping sequence, in the order `stop-1` teaches
// it: stood ready, the look from four or five metres, the sample, the rush
// line, the gift, walk in first, hand over. `stop-1` is the owner's own
// sequence — when it moves, this moves, and this never contradicts it. The
// demo, the two yeses and the ladder appear only as things that exist and are
// somebody else's job for two weeks.
//
// ── AND NOBODY GETS FILTERED ────────────────────────────────────────────────
// "As a newbie, just try to stop everybody, just for the sake of practising.
// With time you start to understand who to stop and who not to. But it's not
// something I want to write directly."
//
// The old screens taught a brand-new seller to read the reaction, watch for
// crossed arms and back off — a who-to-skip list in everything but name,
// handed to the one person the owner says should be skipping nobody. Step 2
// now says everybody, and says why no list exists.
//
// Screen two also carries the walk-past warning. Somebody who has not been
// warned takes it personally before lunch and has no energy left by the
// afternoon — exactly the seller the owner does not want to lose in week one.
// It is said before they go out because on day one that is calibration, not an
// excuse; the "you are off the hook" version is conditional and lives in
// `close-fault`, after the demo rather than before it. It keeps its condition
// here too: going quiet and stopping nobody is the one thing that IS on you.
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

/* One per step, in the order the steps run. `Shield` belongs to step 2: it is
   armour, not a warning sign — the point of that step is that being walked past
   cannot hurt you if you were expecting it. `Eye` sits on the step about
   getting the look, and `Users` on the handover to a colleague. */
const ICONS: LucideIcon[] = [Sparkles, Shield, Zap, Eye, Heart, Users];

interface StepData {
  title: string;
  body: string;
  cta: string;
  tips: string[];
}

const STEPS_EN: StepData[] = [
  {
    title: 'Two weeks. You only stop.',
    body: "Straight up: for your first two weeks you are not selling anything. No demo, no prices, no closing. You stand outside, you stop strangers, you walk them in, and you hand them to a colleague who takes it from there. That is not the easy bit they give the new ones — nothing in this shop happens until somebody gets stopped, and the person who stops them is you. Two weeks of that and nothing else. Then you start learning the rest.",
    cta: 'So who do I stop?',
    tips: [
      'Two weeks, not two days. Nobody is putting you in front of a price.',
      'Your only score: how many people you get through the door.',
      'The demo, the two yeses, the ladder — they all exist, and none of them is yours yet.',
      'Stopping is not the easy job. It is the one every other job here waits on.',
    ],
  },
  {
    title: 'You stop everybody',
    body: "Do not stand there picking. Not the ones who look like they have money, not the ones who look friendly, not the ones who look like they are not in a hurry — everybody. You are not choosing customers yet, you are getting your reps in, and a beginner who only goes for the ones that look easy spends most of the shift standing still. Knowing who to stop comes later, and it comes from months on the floor, not from a list anybody can hand you. And expect most of them to keep walking. That is the job, it is the same for the best seller in this centre, and it says nothing about you — right up until you go quiet and stop nobody, and then it does.",
    cta: 'Fine — where do I stand?',
    tips: [
      'Everybody. No filtering, no reading them from a distance, no skipping the awkward-looking ones.',
      'Being walked past is not rejection. They never even heard you.',
      'The tenth no does not mean anything about the eleventh person.',
      'The one thing that IS your fault: going quiet and stopping nobody.',
      'You learn who to stop by stopping everybody first. No shortcut, no list.',
    ],
  },
  {
    title: 'Stood ready before anybody is near you',
    body: 'None of it works if you are flat against the wall with your hands in your pockets. Before anyone is anywhere near you, be out in front of the kiosk where they can see you, beside the entrance and never filling it, with the sample already in your hand. And have the energy on your face before you need it — people feel that before they hear a word you say. Slumped shoulders and a flat voice and they are past you before you open your mouth.',
    cta: 'I am set. How do I stop them?',
    tips: [
      'Out in front, where they can see you. If they have to find you, you have lost the first second.',
      'Sample already in your hand. Never rummaging for it while the one you wanted walks past.',
      'Beside the door, never in it. Nobody should have to squeeze past you.',
      'Hands doing something — the sample, the stand. Hands in pockets reads as bored, and bored is invisible.',
      'Smile BEFORE you speak. Let them see it coming.',
    ],
  },
  {
    title: 'Get the look from four or five metres',
    body: "This is the whole trick and it is the one beginners get backwards. You do not walk at somebody and then talk to them. You talk first, from where you are standing, while they are still four or five metres off and still walking — 'Hi guys, how you doing?' — and you do not move a foot. All you are buying with that sentence is their eyes. If their eyes come to yours, now you go: sample up, and come at them a bit from the side, never planted square in front of them. From the moment they look you have about three seconds to be moving, or it cools and you are shop staff again. And if they never look? You have lost nothing at all, because you never moved.",
    cta: 'They looked. Then what?',
    tips: [
      "Say it early — a greeting or a compliment, either does the job. 'Hi guys, how you doing?'",
      'You do not move until they look. Walking at someone who has not looked at you is how you become a person to avoid.',
      'Eyes up and warm. A seller looking at their own shoes has given them nothing to look back at.',
      'Two of them? Greet both. The bored one is the one who takes her away.',
      'They looked — three seconds and you are moving. Not a rush. Just not a wobble.',
    ],
  },
  {
    title: 'The sample, the rush, the gift',
    body: "You are stood in front of them now. Offer the sample — and whichever way that lands, it changes nothing. They take it, lovely. They wave it away, nothing happened, because you never asked them for anything. Same words either way, and the first one kills their exit before they can reach for it: \"Listen, I know you're in a rush — but can I ask you something really quick? It's just that you look so good, I have to ask what you normally use on your skin.\" Whatever comes back, you are impressed. 'Really? No way.' Your mother uses that one, your sister swears by it. Then you give them a reason to move that costs them nothing: 'Just because you look so amazing, I'm going to give you a small gift.'",
    cta: 'And then?',
    tips: [
      'A refused sample is not an answer. It is a hand not moving. Carry straight on.',
      'Say the rush yourself and it stops being their way out — they cannot use a reason you have already accepted.',
      "'What do you normally use?' — nobody can answer that with a yes or a no.",
      'Be impressed by whatever they say, then top it. Your mother, your sister. It costs you nothing.',
      'The gift is the reason to move. It costs them nothing, so there is nothing to say no to.',
    ],
  },
  {
    title: 'Walk in first. Then hand her over.',
    body: "Say the gift, turn around, walk into the shop — and do NOT look back to check. Checking asks permission, and permission is something they can refuse. Get inside, then turn your head and see who came. Still out on the pavement? Call them in warmly — \"come on guys, it's two seconds, I promise\" — then turn round and keep walking, because the walking is what does the persuading. Once they are in: chairs already set, backs to the street, one for him as well, and straight into the handover. Quick, warm, with her sitting down, never at the door — 'This is [name], she is going to look after you.' Then you stay and you watch. That is the rest of your fortnight, and it is how you learn the demo before anybody asks you to run one.",
    cta: 'I am ready — take me to training',
    tips: [
      'You go first and call them in. Never escort, never walk beside them.',
      'Do not check whether they are following. Checking is asking permission.',
      'Chairs set before they get there, facing into the shop. Ten seconds of moving furniture is ten seconds she uses to remember she was going somewhere.',
      'Hand over with her sitting down, never at the door. Say the colleague by name, do not just point at somebody.',
      'Then stay and listen. The demo, the two yeses, the ladder — you are learning them by watching, weeks before you run one.',
    ],
  },
];

const STEPS_ES: StepData[] = [
  {
    title: 'Dos semanas. Solo paras.',
    body: 'Te lo digo claro: durante tus dos primeras semanas no vendes nada. Ni demo, ni precios, ni cierres. Te colocas fuera, paras a desconocidos, los metes dentro y se los pasas a un compañero que sigue desde ahí. Y no es la parte fácil que le dan al nuevo — en esta tienda no pasa nada hasta que alguien para a alguien, y ese alguien eres tú. Dos semanas de eso y nada más. Luego empiezas a aprender el resto.',
    cta: '¿Y a quién paro?',
    tips: [
      'Dos semanas, no dos días. Nadie te va a poner delante de un precio.',
      'Tu única puntuación: cuánta gente metes por la puerta.',
      'La demo, los dos síes, la escalera — existen, y todavía no son tuyos.',
      'Parar no es el trabajo fácil. Es el trabajo del que dependen todos los demás.',
    ],
  },
  {
    title: 'Paras a todo el mundo',
    body: 'No te quedes ahí eligiendo. Ni los que parece que tienen dinero, ni los que parecen simpáticos, ni los que parece que no tienen prisa — a todos. Todavía no estás eligiendo clientes, estás cogiendo horas de vuelo, y el novato que solo va a por los que parecen fáciles se pasa medio turno quieto. Saber a quién parar viene después, y viene de meses en la calle, no de una lista que te dé nadie. Y cuenta con que la mayoría siga andando. Es el trabajo, le pasa igual al mejor vendedor del centro, y no dice nada de ti — hasta que te apagas y no paras a nadie, y entonces sí.',
    cta: 'Vale — ¿dónde me pongo?',
    tips: [
      'A todo el mundo. Sin filtrar, sin leerlos de lejos, sin saltarte a los que parecen complicados.',
      'Que te ignoren no es un rechazo. Ni siquiera te han oído.',
      'El décimo no no dice nada de la persona número once.',
      'Lo único que SÍ es culpa tuya: apagarte y no parar a nadie.',
      'Aprendes a quién parar parando primero a todo el mundo. Ni atajo ni lista.',
    ],
  },
  {
    title: 'Colocado antes de que nadie se acerque',
    body: 'Nada de esto funciona si estás pegado a la pared con las manos en los bolsillos. Antes de que nadie esté cerca, ponte delante del kiosco donde te vean, al lado de la puerta y sin taparla nunca, con la muestra ya en la mano. Y con la energía puesta antes de que haga falta — la gente la nota antes de oírte hablar. Hombros caídos y voz plana y te pasan de largo antes de que abras la boca.',
    cta: 'Estoy colocado. ¿Cómo los paro?',
    tips: [
      'Delante, donde te vean. Si te tienen que buscar, ya has perdido el primer segundo.',
      'La muestra ya en la mano. Nunca rebuscándola mientras la que te interesaba pasa de largo.',
      'Al lado de la puerta, nunca en ella. Nadie debería tener que colarse por un hueco para pasar.',
      'Las manos haciendo algo — la muestra, el expositor. Las manos en los bolsillos se leen como aburrimiento, y el aburrimiento es invisible.',
      'Sonríe ANTES de hablar. Que lo vean venir.',
    ],
  },
  {
    title: 'Consigue la mirada a cuatro o cinco metros',
    body: 'Aquí está todo el truco, y es justo lo que los novatos hacen al revés. No andas hacia alguien y luego le hablas. Hablas primero, desde donde estás, cuando todavía están a cuatro o cinco metros y siguen andando — "hola chicos, ¿qué tal?" — y no mueves un pie. Con esa frase estás comprando una sola cosa: su mirada. Si sus ojos van a los tuyos, ahora sí vas: la muestra en alto y te acercas un poco de lado, nunca plantado enfrente. Desde que te miran tienes unos tres segundos para estar ya en movimiento, o se enfría y vuelves a ser personal de tienda. ¿Y si no te miran? No has perdido nada, porque no te has movido.',
    cta: 'Me han mirado. ¿Y ahora?',
    tips: [
      'Suéltalo pronto — un saludo o un cumplido, cualquiera vale. "Hola chicos, ¿qué tal?"',
      'No te mueves hasta que te miran. Andar hacia alguien que no te ha mirado es cómo te conviertes en alguien a evitar.',
      'La mirada arriba y con buen rollo. Un vendedor mirándose los zapatos no les ha dejado nada a lo que mirar.',
      '¿Van dos? Saluda a los dos. El aburrido es el que se la lleva.',
      'Te han mirado — tres segundos y ya estás andando. No es ir con prisa. Es no dudar.',
    ],
  },
  {
    title: 'La muestra, la prisa, el regalo',
    body: 'Ya estás plantado delante de ellos. Ofrece la muestra — y caiga del lado que caiga, no cambia nada. La cogen, genial. La apartan con la mano, no ha pasado nada, porque no les has pedido nada. Las mismas palabras en los dos casos, y la primera les quita la salida antes de que la busquen: "mira, sé que vas con prisa — ¿pero te puedo preguntar una cosa rapidísima? Es que te veo tan bien que tengo que preguntarte qué usas normalmente para la piel". Contesten lo que contesten, te parece impresionante. "¿En serio? No me lo creo." Tu madre usa esa misma, tu hermana no la cambia por nada. Y luego les das un motivo para moverse que no les cuesta nada: "solo porque estás guapísima, te voy a hacer un regalito".',
    cta: '¿Y luego?',
    tips: [
      'Una muestra rechazada no es una respuesta. Es una mano que no se ha movido. Sigues igual.',
      'Di tú lo de la prisa y deja de servirles de salida — no pueden usar una razón que tú ya has aceptado.',
      '"¿Qué usas normalmente?" — a eso nadie puede contestar sí o no.',
      'Que te impresione lo que sea que digan, y remátalo. Tu madre, tu hermana. No te cuesta nada.',
      'El regalo es el motivo para moverse. No les cuesta nada, así que no hay a qué decir que no.',
    ],
  },
  {
    title: 'Entras tú primero. Y luego la pasas.',
    body: 'Dices lo del regalo, te das la vuelta y entras en la tienda — y NO mires atrás para comprobar. Comprobar es pedir permiso, y el permiso te lo pueden negar. Entra, y ya dentro giras la cabeza y miras quién ha venido. ¿Siguen fuera en la acera? Llámalos con buen rollo — "venga chicos, son dos segundos, os lo prometo" — y date la vuelta otra vez y sigue andando, porque lo que convence es el andar. Cuando entren: las sillas ya puestas, de espaldas a la calle, una para él también, y directo al traspaso. Rápido, con buen rollo, con ella sentada, nunca en la puerta — "esta es [nombre], te va a cuidar de maravilla". Y luego te quedas y miras. Eso es el resto de tus dos semanas, y es como aprendes la demo antes de que nadie te pida hacer una.',
    cta: '¡Estoy listo! Llévame a la formación',
    tips: [
      'Entras tú primero y los llamas. Ni los acompañes ni vayas a su lado.',
      'No compruebes si te siguen. Comprobar es pedir permiso.',
      'Las sillas puestas antes de que lleguen, mirando hacia dentro. Diez segundos moviendo muebles son diez segundos que ella usa para acordarse de que iba a algún sitio.',
      'El traspaso con ella sentada, nunca en la puerta. Di el nombre del compañero, no señales a alguien y ya está.',
      'Y luego quédate y escucha. La demo, los dos síes, la escalera — los estás aprendiendo mirando, semanas antes de hacer una.',
    ],
  },
];

const COPY = {
  overline: { en: 'First Day Track', es: 'Ruta del Primer Día' },
  title: { en: 'Survive your first two weeks', es: 'Sobrevive a tus dos primeras semanas' },
  subtitle: { en: 'Weeks 1-2: stopping only. No selling.', es: 'Semanas 1-2: solo parar. Nada de vender.' },
  step: { en: 'Step', es: 'Paso' },
  of: { en: 'of', es: 'de' },
  doneTitle: { en: 'You did it', es: 'Lo has conseguido' },
  doneBody: {
    en: 'That is the whole track. For the next two weeks your job is to stop people, walk them in and hand them to a colleague. The demo, the price, the close — all of it is coming, and none of it is yours yet.',
    es: 'Esa es toda la ruta. Durante las próximas dos semanas tu trabajo es parar gente, meterla dentro y pasársela a un compañero. La demo, el precio, el cierre — todo eso llega, y todavía no es tuyo.',
  },
  doneMantra: {
    en: 'Stood ready → The look → The gift → Walk in first → Hand over',
    es: 'Colocado → La mirada → El regalo → Entras tú primero → Pasas el relevo',
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
