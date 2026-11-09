// ─────────────────────────────────────────────────────────────────────────────
// stopping.ts — The Art of Stopping, as one printed sheet per language.
//
// "Sometimes people are very lazy to go into the app." So the handouts exist.
// But a printed sheet that drifts from the app is worse than no sheet at all:
// a seller reads the paper, the app teaches something else, and the next time
// the owner changes his mind only one of them follows. So this file is an
// EXTRACTOR, not a second manuscript. Everything it prints comes from the
// app's own data:
//
//   • the three lines said out loud in the approach come from
//     `canonicalScripts.ts`, the same import `stop-1` and `close-1` use, so
//     the greeting on the paper is the greeting on the screen, forever;
//   • the two numbers in the location-gap line are computed from
//     `pricing.ts`, never typed, so moving a rung moves the handout;
//   • every string goes through `substitute()` on the way out, so no
//     `{currency}` or `{locationName}` can ever reach a printed page.
//
// ── WHAT IT IS, EDITORIALLY ─────────────────────────────────────────────────
// The source is the seven tier-1 lessons `stop-1` … `stop-7`. They are seven
// screens because that is how a phone wants to be read. This is ONE lesson,
// because that is how paper wants to be read: the nine-step sequence first and
// in order, then the openers, then urgency, then the one more line after a no,
// then the morning that tells a seller which style is theirs.
//
// Dropped on purpose, and it is worth writing down so nobody "restores" it:
//
//   • The humour-receptivity traffic light ("red for humour: frowning, intense
//     purpose in their walk…") and the by-nationality humour notes. A newbie
//     stops EVERYBODY — a colour-coded read of a stranger's face is the
//     who-to-skip list this app deliberately does not have.
//   • The four stopping archetypes and the personality questionnaire. The
//     two-hour test does the same job with numbers instead of labels.
//   • The budget-objection row and the combo prices. Those belong to whoever
//     is sitting in the chair, not to a sheet about the pavement.
//   • "I'd hate for you to come back and find your scent sold out." Anything
//     whose best case is the customer returning tomorrow is a lost sale with
//     extra steps.
//
// The currency edition is fixed below. Andorra prints euros; a Gibraltar
// edition is the same two docs with the symbol swapped, which is exactly why
// nothing in here hand-types a price.
// ─────────────────────────────────────────────────────────────────────────────

import type { Block, Doc } from '../types';
import { substitute } from '../../../src/utils/currency';
import { SYRINGE_LADDER } from '../../../src/data/pricing';
import {
  GREETING,
  THE_RUSH_AND_THE_QUESTION,
  CALL_THEM_IN,
} from '../../../src/data/canonicalScripts';

/** Which shop this edition prints for. Swap the pair, get the other shop. */
const CURRENCY = '€';
const LOCATION_NAME = 'Andorra';

/** Here, versus across the border. Computed, so a ladder move cannot strand it. */
const HERE = `${CURRENCY}${SYRINGE_LADDER.base}`;
const ACROSS = `${CURRENCY}${SYRINGE_LADDER.europeAnchor}`;

// ── English ──────────────────────────────────────────────────────────────────

const EN_BLOCKS: Block[] = [
  {
    type: 'intro',
    text:
      'Stopping is the hardest thing in this job and the most important one: no stop, no sale. ' +
      'For your first two weeks it is also the ONLY thing you do — you stand out there, you stop ' +
      'strangers, you walk them in and you hand them to a colleague. No demo, no prices, no close. ' +
      'Everything on this sheet happens in the twenty seconds between a stranger walking past you ' +
      'and a stranger sitting in your chair. Learn it in order, because the order IS the technique.',
  },
  {
    type: 'quote',
    text:
      'People that are new in the job, all they do for the first two weeks is the syringe. They ' +
      "don't do nothing else. They literally stop people and pass them to other colleagues. They " +
      "don't even do the demonstrations themselves. They literally just stop.",
    attribution: 'The owner',
  },
  {
    type: 'callout',
    title: 'You stop everybody',
    body:
      'There is no list on this sheet of who to skip, and there never will be. As a newbie you try ' +
      'to stop everybody, just for the sake of practising. Who to go for and who to leave is ' +
      'something time gives you, not something you decide on your second shift. Fast walker, phone ' +
      'in hand, face like a wet Tuesday — you go anyway. Nobody can tell you who was never going ' +
      'to buy, and the moment you start guessing you have stopped practising.',
  },

  { type: 'heading', text: 'The sequence — nine steps, always in this order' },
  {
    type: 'steps',
    items: [
      {
        n: '1',
        title: 'Be stood ready before anybody is near you',
        body:
          'Out in front of the kiosk where they can see you — not tucked against the wall, and never ' +
          'filling the doorway, because somebody who has to squeeze past you has already decided ' +
          'something about you. Sample already in your hand: you do not want to be rummaging for it ' +
          'while the one you wanted walks past. Hands doing something — holding the sample, sorting ' +
          'the stand, moving. Hands in pockets reads as bored, and bored is invisible.',
      },
      {
        n: '2',
        title: 'Get their attention from four or five metres',
        body:
          'While they are still walking, and before you take a single step. Eyes up, warm, a second ' +
          'or two — long enough to be a person, not long enough to be a stare. A greeting or a ' +
          'compliment, either does the job. If there are two of them you greet both, because the ' +
          'bored one is the one who takes her away. Leave it until they are nearly level with you ' +
          'and you have left it too late: by the time they turn their head they are already past.',
      },
      {
        n: '3',
        title: 'They look. Now you move.',
        body:
          'Not before. From the moment their eyes come to yours you have about three seconds to be ' +
          'moving — longer than that and it cools, because they have filed you as shop staff and put ' +
          'the "just looking" wall up. Three seconds is not a rush, it is just not a wobble. Raise ' +
          'the sample and come at them a bit from the side, never planted square in the line they ' +
          'were walking: somebody stepping in beside them for a second, not a checkpoint. And if ' +
          'they never looked, you have lost nothing, because you never moved.',
      },
      {
        n: '4',
        title: 'The sample is a coin toss',
        body:
          'They take it, lovely. They wave it away, nothing happens. You have not been rejected, ' +
          'because you never asked them for anything. Either way you are still stood in front of ' +
          'them and you carry straight on into the next line, same words, same warmth. Sellers lose ' +
          'people right here by treating a refused sample as an answer. It is not an answer. It is a ' +
          'hand that did not move.',
      },
      {
        n: '5',
        title: 'Say the rush before they can',
        body:
          'The most common escape in the world is "sorry, I\'m in a rush". So say it first — once it ' +
          'has come out of your mouth they cannot use a reason you have already accepted. Then a ' +
          'question they have to answer with a real answer, because nobody can say yes or no to ' +
          '"what do you use?". This line runs whether they took the sample or not. The sample was ' +
          'never the point; it was the excuse to be stood in front of them saying this.',
      },
      {
        n: '6',
        title: 'Be impressed, whatever they say',
        body:
          'A big brand, olive oil, a cream her sister brought back, nothing at all — you are ' +
          'impressed by it. You are not marking her homework, you are finding a bit of common ground ' +
          'and handing her three seconds of feeling good about herself. Then top it: your mother uses ' +
          'the same one, your sister swears by it, you have always wanted to try it. It costs you ' +
          'nothing and it turns a stranger being polite into two people having a conversation.',
      },
      {
        n: '7',
        title: 'The gift, then turn around',
        body:
          'Give them a reason to move that costs them nothing — and then turn around and walk into ' +
          'the shop. Do NOT check whether they are following you. Checking asks permission, and ' +
          'asking permission gives them the chance to say no. You do not give a damn whether they ' +
          'walk your route: you walk it, and you find out afterwards.',
      },
      {
        n: '8',
        title: 'If they do not follow, nothing happens',
        body:
          'Same as the sample. You keep going, you get inside, and only then do you turn your head ' +
          'and see who came. Still out there? Call them in warmly — you are not begging, you are ' +
          'holding a door open — then turn back round and keep walking. The walking is what does the ' +
          'persuading, because now there is nothing to say no to. You never walk beside them and you ' +
          'never escort them: you walk first and you call them to come.',
      },
      {
        n: '9',
        title: 'They came in. Now the day starts.',
        body:
          'The chairs are ready before anybody reaches them, because the ten seconds you spend ' +
          'clearing a seat is the ten seconds she uses to remember she was going somewhere. Facing ' +
          'into the shop, never at the street — if she can see the pavement moving she starts ' +
          'thinking about being back out on it. A chair for him as well. Then she is sitting, ' +
          'somebody has her hand and is already talking. For your first two weeks that somebody is a ' +
          'colleague: you stop, you hand over, you go straight back out, and that IS the job. The ' +
          'handover is quick and warm and it happens with her sitting down, never at the door.',
      },
    ],
  },
  {
    type: 'script',
    label: 'The lines, in order. Say all five out loud before your shift.',
    lines: [
      GREETING.text,
      THE_RUSH_AND_THE_QUESTION.text,
      '"Really? No way. My mother swears by that stuff."',
      '"You know what — just because you look so amazing, I\'m going to give you a small gift. I think you\'re going to love it."',
      CALL_THEM_IN.text,
    ],
  },
  {
    type: 'rules',
    items: [
      'Attention first, feet second. You do not move until they have looked at you.',
      'Four or five metres, while they are still walking. Leave it until they are nearly level with you and the look comes too late to use.',
      'Three seconds from the look to your first step.',
      'Come in a bit from the side. Never stand in the line they were walking.',
      'A refused sample changes nothing. Same words, same warmth, carry on.',
      'Never check whether they are following you. Checking is asking permission.',
      'Never walk beside them and never escort them. You walk first, you call them in, you keep walking.',
      'Nothing goes in their pocket. No card, no flyer, no price written on anything — that is permission to go and think about it somewhere you are not standing.',
      'Chairs set before they arrive, backs to the street, one for him as well.',
      'In your first two weeks you do not demo at all. You stop, you hand over, you go back out for the next one.',
      'Say the whole thing out loud before a shift, in order. Any one of those lines on its own is just something nice said to a stranger.',
    ],
  },

  { type: 'heading', text: 'Openers — the ones that get you the look' },
  {
    type: 'script',
    label: 'Compliments. Specific, or it sounds like a line.',
    lines: [
      '"That scarf is gorgeous — that colour was made for you."',
      '"Your skin is glowing. What do you use? ... Go on, tell me your secret."',
      '"You keep your nails natural? You hardly ever see that, and they look so healthy."',
      '"That jacket is serious. You know quality when you see it, I can tell."',
      '"You have got a lovely smile on you. Let me make the day even better — two seconds."',
      '"You two look like you are having the best day. Come here, I have got something for you."',
      '"Beautiful watch. You like things done properly, don\'t you."',
      '"I love the confidence — you walk like you own the street."',
    ],
  },
  {
    type: 'tips',
    items: [
      {
        title: 'Specific beats pretty',
        body:
          '"Nice jacket" is nothing. "That olive green brings your eyes out" is somebody who actually ' +
          'looked. Specific is the entire difference between charm and creepy.',
      },
      {
        title: 'Compliment the choice, not the body',
        body:
          'Clothes, accessories, nails, the way she has done her hair — things she picked. Eyes are ' +
          'the one exception and they work on everybody. Never weight, never body parts.',
      },
      {
        title: 'One is plenty',
        body:
          'One genuine compliment opens the door. Three is flattery and she can hear it. Say it, let ' +
          'it land for a second, then move.',
      },
      {
        title: 'Two of them? Include him',
        body:
          'Compliment her, then bring him in as the one who gets to look: "your wife has unbelievable ' +
          'taste — watch this." A partner left standing there bored is the person who says "come on, ' +
          'we should go".',
      },
      {
        title: 'If you do not mean it, do not say it',
        body:
          'A fake compliment is spotted instantly and then you never get a second sentence. Warm and ' +
          'straight sells just as much.',
      },
    ],
  },
  {
    type: 'script',
    label: 'Make them smile. A smile buys you the ten seconds.',
    lines: [
      '"I know, I know — another salesperson. But this is the one time today you will be glad somebody stopped you."',
      '"Clearly I am terrible at this, because you are still walking. Give me thirty seconds and I will change your mind."',
      '"Two minutes. If you do not love it, you can tell me I am rubbish at my job. Deal?"',
      '"STOP! Don\'t make me chase you... all right, I won\'t chase you, that would be weird. But seriously — two seconds."',
      '"I know what you are thinking: not another one. I think the same thing on my day off."',
      '"Don\'t worry, it is not that kind of syringe. No needles. Just magic for your eyes, I promise."',
      '"Can I ask you something? What made you look over here just now? ... Exactly. Good instincts. Come and see why."',
    ],
  },
  {
    type: 'tips',
    items: [
      {
        title: 'Light one first',
        body:
          'They smile, go further. The joke dies, do not chase it — go straight and quick instead: ' +
          '"Fair enough. Thirty seconds, and I\'ll show you." Warm, fast, no sulking. The dead joke ' +
          'costs you nothing; going stiff about it costs you the stop.',
      },
      {
        title: 'You are the punchline, never them',
        body:
          'Self-deprecating only. Never her clothes, never her face, never the fella she is with, and ' +
          'nothing about politics or religion, ever.',
      },
      {
        title: 'Hands are funnier than words',
        body:
          'A face pulled during the demo crosses every language in this centre. When your English ' +
          'and her French are not meeting, do it with your hands.',
      },
      {
        title: 'If you are not funny, do not force it',
        body:
          'Forced humour is worse than none at all. Warm and direct sells exactly as much — know ' +
          'which one you are and lean on it.',
      },
    ],
  },

  { type: 'heading', text: 'One line per product — open on what you can actually see' },
  {
    type: 'script',
    label: 'The eyes. This is what the shop sells, and everybody has got two.',
    lines: [
      '"You look amazing — but the eyes... shall we make them look a bit more rested?"',
      '"Long trip? I can see it in your eyes, and not in a good way. Give me two minutes and I\'ll fix it."',
      '"You clearly look after yourself. Want to see what I can do around the eyes? Two minutes, like a spa."',
      '"Your make-up is flawless. Let me show you something that does that to your eyes with no make-up at all."',
    ],
  },
  {
    type: 'script',
    label: 'The peeling, the scrub, the nails — the smaller doors in.',
    lines: [
      '"Your skin is lovely, but I can give you the just-back-from-holiday glow in two minutes. Want to see?"',
      '"The air up here is brutal on skin. This takes every dead layer off — your own cream will work ten times better after it."',
      '"Do you ever get dry hands? Ugh, the worst. Right — let me give you something amazing. Come!"',
      '"Want to feel something incredible? Dead Sea. Lowest place on earth, highest minerals on earth. Your hands have never felt this."',
      '"You always keep your nails natural? Good for you. Let me give you a little gift, you are going to love this."',
      '"No polish, no chemicals. Watch... nothing yet... and now the last step. There. That is YOUR nail, and it stays like that for two weeks."',
    ],
  },
  {
    type: 'callout',
    title: 'One line in. Then you stop choosing.',
    body:
      'Never open with two products. Two options at four metres is a decision, and a stranger ' +
      'walking past does not want to make one — they want one clear thing to pull them in. And the ' +
      'line is a door, not a contract: you opened on nails and the demo goes to the eyes? Perfect. ' +
      'Nobody sat down expecting a menu. Whichever line worked, the syringe is what the day gets ' +
      'counted in — the scrub and the nail kit are how you learn to sell and how you keep your ' +
      'energy up, not the target. Combo prices belong to whoever is sitting in the chair with her, ' +
      'never to your opening line on the pavement.',
  },

  { type: 'heading', text: 'Why it has to be today' },
  {
    type: 'script',
    label: 'Urgency. Say it like information, then carry on as if you had mentioned the weather.',
    lines: [
      '"I have got two left. That\'s not a line, that\'s the drawer."',
      '"We\'re closing in half an hour, but I can squeeze you in. Two minutes."',
      '"That offer is gone tonight. I know, I know — it sounds like a sales line. Have a look at the sign."',
      `"The syringe is ${HERE} here. Cross the border and it is back to ${ACROSS}."`,
      '"Christmas is in two weeks and this is the easiest present you will buy all month."',
      '"You have already felt it. You know what it does. What exactly are you going to think about?"',
    ],
  },
  {
    type: 'tips',
    items: [
      {
        title: 'A decision with no deadline never gets made',
        body:
          '"I\'ll think about it" is not a maybe, it is a no with better manners. Give them a reason ' +
          'for it to be today and they decide today.',
      },
      {
        title: 'It is all in the delivery',
        body:
          'The same six words land or die depending on whether you say them like a fact or like a ' +
          'favour you are begging for. Straight face, half a smile, then straight on to something ' +
          'else. Urgency is theatre and they are enjoying it as much as you are.',
      },
      {
        title: 'Specific, or nothing',
        body:
          '"Two left" and "gone at closing" give them something to take hold of. "You should really ' +
          'get it while you\'re here" gives them nothing at all.',
      },
      {
        title: 'Drop it the second they push back',
        body:
          '"Fine, fine, I tried" — and straight back to the thing in your hand. Letting go instantly ' +
          'is what makes the next one land. Said again after a no, it turns two seconds of theatre ' +
          'into somebody following a stranger up a walkway.',
      },
    ],
  },
  {
    type: 'callout',
    title: 'The one line you never cross',
    body:
      'Never promise anything the shop has to honour once they are out of the door. ' +
      'Do not promise refunds, do not promise money back, no ask-for-me-by-name, nothing kept ' +
      'behind the counter for later, nothing in their pocket to take away. You will be on a ' +
      'different pitch tomorrow and somebody else has to have that argument. The one promise that ' +
      'IS real: bring the old buffer back and you get a new one, forever. Say that one with your ' +
      'chest out. Everything else out here is yours to play with.',
  },

  { type: 'heading', text: 'They said no. You have got one more line.' },
  {
    type: 'callout',
    title: 'The first "no thanks" is a reflex, not a decision',
    body:
      'They said it before they had even heard you — the same as saying "fine" when somebody asks ' +
      'how you are. It costs you one more line to find out whether they meant it, and almost nobody ' +
      'on this street spends that line. That is your edge. Throw it from a place of having ' +
      'something good, never from needing the sale: they can smell desperate from four metres.',
  },
  {
    type: 'script',
    label: 'The recovery — one more line, two at the very most.',
    lines: [
      '"I know, you weren\'t planning to stop today. But this is the one time you\'ll be glad you did. Thirty seconds?"',
      '"I get it, you\'re busy. But can I ask you something? When was the last time a stranger showed you something that actually impressed you?"',
      '"Don\'t worry about it. How about this — I won\'t explain anything at all. Just let me do it. Thirty seconds, and if you don\'t love it you walk off. Deal?"',
      '"I know you weren\'t looking for it. I want to GIVE you something. No buying, no catch, just your hands done because they deserve it."',
      '"It\'s two steps. Put your hand on it, and then tell me no."',
      '"You didn\'t take your eyes off that peeling. Sixty seconds and you\'ll know."',
      '"You\'re breaking my heart! ... I\'m joking. But you are missing out."',
      '"That\'s the fourth no in a row. You lot are going to make me cry."',
    ],
  },
  {
    type: 'rules',
    items: [
      'One line after the no, always. It is free and almost nobody spends it.',
      'A second, different line if they are still smiling at you. Not the same one louder.',
      'A third is somebody following a stranger up a walkway. That has the shop\'s name on it, not just yours.',
      '"Leave me alone", "I said no", or anything aggressive — smile, step back, done, immediately.',
      'Point at the table, never at tomorrow. A tiny specific ask beats an open invitation every single time.',
      'Name the thing they were looking at. Being properly seen is what turns a walker around.',
      'If the no is real, mean it: "Fair enough, gorgeous — have a lovely day." Warm, quick, nothing attached to it. Then straight back out, because the next one is already walking past you.',
    ],
  },

  { type: 'heading', text: 'Your own style, found in one morning' },
  {
    type: 'steps',
    items: [
      {
        n: '1',
        title: 'An hour loud',
        body:
          'Big, fast, straight in. Louder than is comfortable. Count how many came through the door.',
      },
      {
        n: '2',
        title: 'An hour quiet',
        body:
          'Slow it right down, warm it up, get them talking before you go anywhere near the product. ' +
          'Count again.',
      },
      {
        n: '3',
        title: 'Read your own numbers',
        body:
          'One of those hours beat the other, and it is not always the one you expected. The feeling ' +
          'lies — you will swear the loud hour flopped and then find out it did not. The numbers ' +
          'do not lie.',
      },
      {
        n: '4',
        title: 'Stop testing and go',
        body:
          'Lean into whichever won and stop worrying about the other one. You can borrow bits off it ' +
          'later, once the main thing comes out of you on its own.',
      },
    ],
  },
  {
    type: 'tips',
    items: [
      {
        title: 'Two numbers an hour',
        body:
          'How many you stopped, and how many sat down. That is all the tracking anybody needs.',
      },
      {
        title: 'Calm sells as much as loud',
        body:
          'Copying the top seller word for word falls flat, because that style fits them and not ' +
          'you. A calm, warm seller outsells a loud one any day of the week — as long as the warmth ' +
          'is real.',
      },
      {
        title: 'Dead morning, work harder',
        body:
          'On a quiet morning you go at every single person twice as hard, because the four who walk ' +
          'past might be your whole day. On a packed afternoon it is the opposite: keep it tight, do ' +
          'not grind water with one person, because there is another one outside the second you ' +
          'finish.',
      },
      {
        title: 'Get somebody to film you',
        body:
          'Hand a colleague your phone for three stops and then watch it back. Crossed arms, a smile ' +
          'your eyes are not in, talking too fast, ending every sentence like a question. You will ' +
          'not believe what you do, and you will fix it in a day.',
      },
      {
        title: 'Ask a sharp question, not a nice one',
        body:
          'Not "how am I doing?" — "was my energy high or low on that last one?" Specific questions ' +
          'get specific answers. Then say thank you and use it.',
      },
    ],
  },

  {
    type: 'facts',
    items: [
      { label: 'Who you stop', value: 'Everybody. There is no list of who to skip.' },
      { label: 'Where you get the look', value: 'Four or five metres, while they are still walking' },
      { label: 'When you move', value: 'Within three seconds of their eyes meeting yours' },
      { label: 'The sample', value: 'Taken or waved away — changes nothing' },
      { label: 'Checking if they followed', value: 'Never. Walk in, then call them.' },
      { label: 'First two weeks', value: 'Stop, bring in, hand to a colleague. No demo at all.' },
      { label: 'What the day is counted in', value: 'Syringes' },
      { label: 'Lines after a no', value: 'One, two at the most — then the next person' },
      { label: 'Goes in their pocket', value: 'Nothing. Ever.' },
      { label: 'The whole sequence', value: 'About twenty seconds, start to finish' },
    ],
  },
  {
    type: 'quote',
    text:
      'Everything else in this app is a variation on this one sequence. Learn the spine first, and ' +
      'then the compliments, the demo and the price all have somewhere to hang.',
    attribution: 'Zero Lines Method',
  },
];

// ── Spanish (peninsular, tú / vosotros) ──────────────────────────────────────

const ES_BLOCKS: Block[] = [
  {
    type: 'intro',
    text:
      'Parar es lo más difícil de este trabajo y lo más importante: sin parada no hay venta. Y ' +
      'durante tus primeras dos semanas es además lo ÚNICO que haces — estás ahí fuera, paras a ' +
      'desconocidos, los metes dentro y se los pasas a un compañero. Sin demo, sin precios, sin ' +
      'cierre. Todo lo que hay en esta hoja pasa en los veinte segundos entre un desconocido que te ' +
      'pasa por delante y un desconocido sentado en tu silla. Apréndetelo en orden, porque el orden ' +
      'ES la técnica.',
  },
  {
    type: 'quote',
    text:
      'La gente que es nueva en el trabajo, lo único que hace las primeras dos semanas es la ' +
      'jeringa. No hacen nada más. Literalmente paran a la gente y se la pasan a los compañeros. No ' +
      'hacen ni las demostraciones. Literalmente solo paran.',
    attribution: 'El dueño',
  },
  {
    type: 'callout',
    title: 'Paras a todo el mundo',
    body:
      'En esta hoja no hay ninguna lista de a quién dejar pasar, y nunca la va a haber. Cuando eres ' +
      'nuevo intentas parar a todo el mundo, aunque solo sea por practicar. A quién ir y a quién no, ' +
      'eso te lo da el tiempo, no lo decides en tu segundo turno. Va rápido, va con el móvil, tiene cara de ' +
      'martes lluvioso — vas igual. Nadie te puede decir quién no iba a comprar nunca, y en cuanto ' +
      'empiezas a adivinarlo has dejado de practicar.',
  },

  { type: 'heading', text: 'La secuencia — nueve pasos, siempre en este orden' },
  {
    type: 'steps',
    items: [
      {
        n: '1',
        title: 'Estate colocado antes de que nadie se acerque',
        body:
          'Delante del kiosco, donde te vean — no metido contra la pared, y nunca tapando la puerta, ' +
          'porque quien tiene que colarse por un hueco para pasar ya ha decidido algo sobre ti. La ' +
          'muestra ya en la mano: no quieres estar rebuscándola mientras la que te interesaba te pasa ' +
          'de largo. Las manos haciendo algo — sujeta la muestra, coloca el expositor, muévete. Las ' +
          'manos en los bolsillos se leen como aburrimiento, y el aburrimiento es invisible.',
      },
      {
        n: '2',
        title: 'Llámales la atención a cuatro o cinco metros',
        body:
          'Mientras todavía andan, y antes de dar un solo paso. La mirada arriba, con buen rollo, un ' +
          'segundo o dos — lo justo para parecer una persona, no tanto como para quedarte clavado ' +
          'mirándola. Un saludo o un cumplido, cualquiera de los dos vale. Si van dos, saludas a los ' +
          'dos, porque el que se aburre es el que se la lleva. Si esperas a que estén casi a tu ' +
          'altura, ya llegas tarde: para cuando giran la cabeza ya te han pasado.',
      },
      {
        n: '3',
        title: 'Te miran. Ahora te mueves.',
        body:
          'Antes no. Desde que sus ojos van a los tuyos tienes unos tres segundos para estar ya en ' +
          'movimiento — más de eso y se enfría, porque ya te han catalogado como personal de tienda y ' +
          'han levantado el muro del "solo miro". Tres segundos no es ir con prisa, es simplemente no ' +
          'dudar. Levanta la muestra y ve hacia ellos un poco de lado, nunca plantado en la línea por ' +
          'la que iban andando: alguien que se pone a su lado un segundo, no un control policial. Y ' +
          'si no te han mirado, no has perdido nada, porque no te has movido.',
      },
      {
        n: '4',
        title: 'La muestra es cara o cruz',
        body:
          'Si la cogen, genial. Si la apartan con la mano, no pasa nada. No te han rechazado, porque ' +
          'no les has pedido nada. En los dos casos sigues plantado delante de ellos y pasas a la ' +
          'frase siguiente igual, las mismas palabras y el mismo buen rollo. Aquí es donde los ' +
          'vendedores pierden gente: se toman una muestra rechazada como una respuesta. No es una ' +
          'respuesta. Es una mano que no se ha movido.',
      },
      {
        n: '5',
        title: 'Di lo de la prisa antes que ellos',
        body:
          'Lo que más dice la gente para escaparse es "perdona, voy con prisa". Así que dilo tú ' +
          'primero — una vez que ha salido de tu boca ya no pueden usar una razón que tú has ' +
          'aceptado. Y luego una pregunta que les obliga a dar una respuesta de verdad, porque a ' +
          '"¿qué usas?" no se puede contestar sí o no. Esta frase va igual hayan cogido la muestra o ' +
          'no. La muestra nunca era el objetivo; era la excusa para estar plantado delante de ellos ' +
          'diciendo esto.',
      },
      {
        n: '6',
        title: 'Que te impresione, digan lo que digan',
        body:
          'Una marca grande, aceite de oliva, una crema que le trajo su hermana, nada de nada — te ' +
          'parece impresionante. No le estás corrigiendo los deberes, estás buscando algo en común y ' +
          'regalándole tres segundos de sentirse bien. Y luego remátalo: tu madre usa la misma, tu ' +
          'hermana no la cambia por nada, siempre has querido probarla. No te cuesta nada y convierte ' +
          'a una desconocida siendo educada en dos personas teniendo una conversación.',
      },
      {
        n: '7',
        title: 'El regalo, y date la vuelta',
        body:
          'Dales un motivo para moverse que no les cueste nada — y date la vuelta y entra en la ' +
          'tienda. NO compruebes si te están siguiendo. Comprobar es pedir permiso, y pedir permiso ' +
          'les da la oportunidad de decir que no. Te da exactamente igual si hacen tu mismo camino: ' +
          'tú lo haces, y ya te enteras después.',
      },
      {
        n: '8',
        title: 'Si no te siguen, no pasa nada',
        body:
          'Igual que con la muestra. Sigues andando, entras, y solo entonces giras la cabeza y miras ' +
          'quién ha venido. ¿Siguen ahí fuera? Llámalos con buen rollo — no estás suplicando, estás ' +
          'sujetando una puerta abierta — y date la vuelta otra vez y sigue andando. Lo que convence ' +
          'es el andar, porque ya no hay nada a lo que decir que no. Nunca andas a su lado y nunca ' +
          'los acompañas: andas tú primero y los llamas.',
      },
      {
        n: '9',
        title: 'Han entrado. Ahora empieza el día.',
        body:
          'Las sillas están listas antes de que nadie llegue, porque los diez segundos que pasas ' +
          'despejando un sitio son los diez segundos que ella usa para acordarse de que iba a algún ' +
          'lado. Mirando hacia dentro, nunca hacia la calle — si ve la acera pasando por delante, ' +
          'empieza a pensar en volver a salir a ella. Una silla para él también. Y entonces está ' +
          'sentada, alguien le tiene la mano cogida y ya está hablando. Durante tus primeras dos ' +
          'semanas ese alguien es un compañero: paras, pasas, sales otra vez, y ESE es el trabajo. El ' +
          'traspaso es rápido y con buen rollo, y pasa con ella sentada, nunca en la puerta.',
      },
    ],
  },
  {
    type: 'script',
    label: 'Las frases, en orden. Di las cinco en voz alta antes del turno.',
    lines: [
      GREETING.textEs,
      THE_RUSH_AND_THE_QUESTION.textEs,
      '"¿En serio? No me lo creo. Mi madre no la cambia por nada."',
      '"¿Sabes qué? Solo porque estás guapísima, te voy a hacer un regalito. Creo que te va a encantar."',
      CALL_THEM_IN.textEs,
    ],
  },
  {
    type: 'rules',
    items: [
      'Primero la atención, después los pies. No te mueves hasta que te han mirado.',
      'A cuatro o cinco metros, mientras todavía andan. Si esperas a que estén casi a tu altura, la mirada ya te llega tarde.',
      'Tres segundos desde la mirada hasta tu primer paso.',
      'Entra un poco de lado. Nunca te plantes en la línea por la que iban andando.',
      'Una muestra rechazada no cambia nada. Las mismas palabras, el mismo buen rollo, y sigues.',
      'Nunca compruebes si te están siguiendo. Comprobar es pedir permiso.',
      'Nunca andes a su lado y nunca los acompañes. Andas tú primero, los llamas, y sigues andando.',
      'Que no se lleven nada en el bolsillo. Ni tarjeta, ni folleto, ni el precio apuntado en ningún sitio — eso es darles permiso para irse a pensarlo donde tú no estás.',
      'Las sillas puestas antes de que lleguen, de espaldas a la calle, y una para él también.',
      'En tus primeras dos semanas no haces demos. Paras, pasas, y vuelves a salir a por el siguiente.',
      'Di la secuencia entera en voz alta antes del turno, en orden. Cualquiera de esas frases suelta es solo algo majo que le dices a un desconocido.',
    ],
  },

  { type: 'heading', text: 'Frases de apertura — las que te consiguen la mirada' },
  {
    type: 'script',
    label: 'Cumplidos. Concretos, o suenan a frase hecha.',
    lines: [
      '"Qué bufanda más bonita — ese color está hecho para ti."',
      '"Tienes la piel radiante. ¿Qué usas? ... Venga, cuéntame tu secreto."',
      '"¿Llevas las uñas naturales? Eso ya casi no se ve, y las tienes sanísimas."',
      '"Esa chaqueta es una pasada. Tú de calidad entiendes, se te nota."',
      '"Qué sonrisa tienes. Déjame mejorarte el día — dos segundos."',
      '"Vosotros dos tenéis pinta de estar pasándolo genial. Venid, que tengo algo para vosotros."',
      '"Vaya reloj. A ti te gustan las cosas bien hechas, ¿eh?"',
      '"Me encanta esa seguridad — andas como si la calle fuera tuya."',
    ],
  },
  {
    type: 'tips',
    items: [
      {
        title: 'Concreto gana a bonito',
        body:
          '"Qué chaqueta más bonita" no es nada. "Ese verde oliva te saca los ojos" es alguien que de ' +
          'verdad se ha fijado. Lo concreto es toda la diferencia entre caer bien y dar mal rollo.',
      },
      {
        title: 'Cumplimenta la elección, no el cuerpo',
        body:
          'Ropa, complementos, uñas, cómo se ha hecho el pelo — cosas que ha elegido ella. Los ojos ' +
          'son la única excepción y funcionan con todo el mundo. Nunca el peso, nunca partes del ' +
          'cuerpo.',
      },
      {
        title: 'Con uno te sobra',
        body:
          'Un cumplido de verdad abre la puerta. Tres es peloteo y se le nota. Lo dices, dejas que ' +
          'caiga un segundo, y sigues.',
      },
      {
        title: '¿Van dos? Mételo a él',
        body:
          'El cumplido para ella, y a él lo metes como el que tiene el privilegio de mirar: "tu mujer ' +
          'tiene un gusto increíble — mira esto". Una pareja que se queda ahí de pie aburriéndose es ' +
          'la que dice "venga, que nos tenemos que ir".',
      },
      {
        title: 'Si no lo sientes, no lo digas',
        body:
          'Un cumplido falso se pilla al instante y ya no te dan una segunda frase. Cálido y directo ' +
          'vende exactamente igual.',
      },
    ],
  },
  {
    type: 'script',
    label: 'Hazles sonreír. Una sonrisa te compra los diez segundos.',
    lines: [
      '"Ya lo sé, ya lo sé — otro vendedor. Pero esta es la única vez hoy que vas a agradecer que alguien te pare."',
      '"Está claro que soy malísimo en esto, porque sigues andando. Dame treinta segundos y te cambio de opinión."',
      '"Dos minutos. Si no te encanta, me dices que soy un desastre en mi trabajo. ¿Trato?"',
      '"¡ALTO! No me hagas perseguirte... vale, no te persigo, que sería raro. Pero en serio — dos segundos."',
      '"Sé lo que estás pensando: otro más. Yo pienso lo mismo en mi día libre."',
      '"Tranquila, no es ese tipo de jeringa. Sin agujas. Magia para los ojos, te lo prometo."',
      '"¿Te puedo preguntar una cosa? ¿Qué te ha hecho girarte ahora mismo? ... Exacto. Buen instinto. Ven a ver por qué."',
    ],
  },
  {
    type: 'tips',
    items: [
      {
        title: 'Primero algo ligero',
        body:
          'Si sonríen, sube la apuesta. Si el chiste se muere, no lo persigas — ve directo y rápido: ' +
          '"Vale, vale. Treinta segundos y te lo enseño". Cálido, rápido, sin enfurruñarte. El chiste ' +
          'muerto no te cuesta nada; ponerte tieso por eso te cuesta la parada.',
      },
      {
        title: 'El del chiste eres tú, nunca ellos',
        body:
          'Solo a tu costa. Nunca su ropa, nunca su cara, nunca el tío que va con ella, y nada de ' +
          'política ni religión, jamás.',
      },
      {
        title: 'Las manos hacen más gracia que las palabras',
        body:
          'Una cara puesta durante la demo cruza todos los idiomas de este centro. Cuando tu inglés y ' +
          'su francés no se encuentran, hazlo con las manos.',
      },
      {
        title: 'Si no tienes gracia, no lo fuerces',
        body:
          'El humor forzado es peor que no tener ninguno. Cálido y directo vende exactamente igual — ' +
          'ten claro cuál de los dos eres y tira por ahí.',
      },
    ],
  },

  { type: 'heading', text: 'Una frase por producto — abre por lo que de verdad le ves' },
  {
    type: 'script',
    label: 'Los ojos. Es lo que vende esta tienda, y todo el mundo tiene dos.',
    lines: [
      '"Estás guapísima — pero los ojos... ¿los dejamos un poco más descansados?"',
      '"¿Viaje largo? Se te nota en los ojos, y no para bien. Dame dos minutos y te lo arreglo."',
      '"Se nota que te cuidas. ¿Quieres ver qué puedo hacerte alrededor del ojo? Dos minutos, como un spa."',
      '"Llevas un maquillaje impecable. Déjame enseñarte algo que te hace eso en los ojos sin nada de maquillaje."',
    ],
  },
  {
    type: 'script',
    label: 'El peeling, el exfoliante, las uñas — las puertas pequeñas para entrar.',
    lines: [
      '"Tienes buena piel, pero puedo darte el brillo de recién vuelta de vacaciones en dos minutos. ¿Quieres verlo?"',
      '"El aire de aquí es un crimen para la piel. Esto se lleva toda la piel muerta — tu crema de siempre te va a funcionar diez veces mejor."',
      '"¿A ti se te secan las manos? Uf, lo peor. Mira — déjame darte algo increíble. ¡Ven!"',
      '"¿Quieres notar algo brutal? Mar Muerto. El sitio más bajo del planeta y el que más minerales tiene. Tus manos no han estado así nunca."',
      '"¿Siempre llevas las uñas naturales? Qué bien. Déjame hacerte un regalito, que te va a encantar."',
      '"Sin esmalte y sin químicos. Mira... todavía nada... y ahora el último paso. Ahí está. Esa es TU uña, y se queda así dos semanas."',
    ],
  },
  {
    type: 'callout',
    title: 'Una frase para entrar. Y ahí se te acaba lo de elegir.',
    body:
      'Nunca abras con dos productos. Dos opciones a cuatro metros son una decisión, y un ' +
      'desconocido que va pasando no quiere tomar ninguna — quiere que algo claro tire de él. Y la ' +
      'frase es una puerta, no un contrato: ¿has abierto por las uñas y la demo se va a los ojos? ' +
      'Perfecto. Nadie se ha sentado esperando un menú. Haya funcionado la frase que sea, la jeringa ' +
      'es lo que cuenta en el día — el exfoliante y el kit de uñas son cómo aprendes a vender y cómo ' +
      'mantienes la energía, no son el objetivo. Los precios de los combos son de quien esté ' +
      'sentado con ella, nunca de tu frase de apertura en la acera.',
  },

  { type: 'heading', text: 'Por qué tiene que ser hoy' },
  {
    type: 'script',
    label: 'Urgencia. Dilo como información, y sigue como si hubieras hablado del tiempo.',
    lines: [
      '"Me quedan dos. No es una frase, es lo que hay en el cajón."',
      '"Cerramos en media hora, pero te hago un hueco. Dos minutos."',
      '"Esta oferta se acaba esta noche. Ya lo sé, ya lo sé, suena a frase de vendedor — mira el cartel."',
      `"La jeringa son ${HERE} aquí. Cruzas la frontera y vuelve a ${ACROSS}."`,
      '"La Navidad es en dos semanas y este es el regalo más fácil que vas a comprar este mes."',
      '"Ya lo has notado. Ya sabes lo que hace. ¿Qué te tienes que pensar exactamente?"',
    ],
  },
  {
    type: 'tips',
    items: [
      {
        title: 'Una decisión sin fecha límite no se toma nunca',
        body:
          '"Me lo pienso" no es un quizá, es un no con mejores modales. Dales un motivo para que sea ' +
          'hoy y deciden hoy.',
      },
      {
        title: 'Está todo en cómo lo dices',
        body:
          'Las mismas seis palabras entran o se mueren según si las dices como un dato o como un ' +
          'favor que estás suplicando. Cara seria, media sonrisa, y a otra cosa. La urgencia es ' +
          'teatro y lo disfrutan tanto como tú.',
      },
      {
        title: 'Concreta, o nada',
        body:
          '"Me quedan dos" y "eso se acaba al cerrar" les dan algo de donde coger. "Deberías ' +
          'llevártelo ya que estás aquí" no les da nada.',
      },
      {
        title: 'Suéltalo en cuanto te lo discutan',
        body:
          '"Vale, vale, lo he intentado" — y vuelta a lo que tienes en la mano. Soltarlo al momento ' +
          'es lo que hace que funcione la siguiente. Repetido después de un no, convierte dos ' +
          'segundos de teatro en alguien persiguiendo a un desconocido por el pasillo.',
      },
    ],
  },
  {
    type: 'callout',
    title: 'La única línea que no se cruza',
    body:
      'No prometas nunca nada que la tienda tenga que cumplir cuando ya se hayan ido. ' +
      'Nunca prometas devoluciones, nunca prometas dinero de vuelta, nada de pregunta-por-mí, ' +
      'nada guardado detrás del mostrador para luego, nada en el bolsillo para llevarse. Mañana ' +
      'estarás en otro turno y la discusión se la come otro. La única promesa que SÍ es real: trae ' +
      'el pulidor viejo y te llevas uno nuevo, para siempre. Esa la dices con el pecho fuera. Todo ' +
      'lo demás aquí fuera es tuyo para jugar.',
  },

  { type: 'heading', text: 'Te han dicho que no. Te queda una frase más.' },
  {
    type: 'callout',
    title: 'El primer "no, gracias" es un reflejo, no una decisión',
    body:
      'Lo han dicho antes incluso de escucharte — igual que decir "bien" cuando te preguntan qué ' +
      'tal. Te cuesta una frase más averiguar si lo decían en serio, y casi ningún vendedor de esta ' +
      'calle gasta esa frase. Ahí está tu ventaja. Suéltala como alguien que tiene algo bueno, ' +
      'nunca como alguien que necesita la venta: lo desesperado se huele a cuatro metros.',
  },
  {
    type: 'script',
    label: 'La recuperación — una frase más, dos como mucho.',
    lines: [
      '"Ya lo sé, no habías salido a parar hoy. Pero esta es la única vez que te vas a alegrar de haberlo hecho. ¿Treinta segundos?"',
      '"Te entiendo, vas liada. Pero ¿te puedo preguntar una cosa? ¿Cuándo fue la última vez que un desconocido te enseñó algo que de verdad te dejó loca?"',
      '"No te preocupes. Mira, hacemos una cosa: no te explico nada. Déjame hacerlo y ya está. Treinta segundos, y si no te encanta te vas. ¿Trato?"',
      '"Sé que no lo estabas buscando. Yo te quiero REGALAR algo. Sin comprar nada, sin truco, solo las manos hechas porque se lo merecen."',
      '"Si son dos pasos. Pon la mano aquí y luego me dices que no."',
      '"No le has quitado el ojo de encima al peeling. Sesenta segundos y lo sabes."',
      '"¡Me estás rompiendo el corazón! ... Es broma. Pero te lo estás perdiendo."',
      '"Ese es el cuarto no seguido. Me vais a hacer llorar."',
    ],
  },
  {
    type: 'rules',
    items: [
      'Una frase después del no, siempre. Es gratis y casi nadie la gasta.',
      'Una segunda, distinta, si siguen sonriéndote. No la misma más alto.',
      'Una tercera ya es alguien persiguiendo a un desconocido por el pasillo. Ahí va el nombre de la tienda, no solo el tuyo.',
      '"Déjame en paz", "ya te he dicho que no", o cualquier cosa agresiva — sonríes, te retiras, y ya está, al momento.',
      'Señala la mesa, nunca el mañana. Una petición pequeña y concreta gana siempre a una invitación abierta.',
      'Nombra lo que estaban mirando. Que se sientan vistos de verdad es lo que hace que se den la vuelta.',
      'Si el no es de verdad, que sea de verdad: "Nada, guapa, que tengas buen día". Con cariño, rápido y sin nada colgando. Y vuelta a la acera, que el siguiente ya está pasando por delante.',
    ],
  },

  { type: 'heading', text: 'Tu propio estilo, en una sola mañana' },
  {
    type: 'steps',
    items: [
      {
        n: '1',
        title: 'Una hora a lo grande',
        body:
          'Alto, rápido, entrando a saco. Más alto de lo que te resulta cómodo. Cuenta cuántos han ' +
          'entrado por la puerta.',
      },
      {
        n: '2',
        title: 'Una hora tranquila',
        body:
          'Baja el ritmo del todo, ponlo cálido, hazles hablar antes de acercarte al producto. ' +
          'Cuenta otra vez.',
      },
      {
        n: '3',
        title: 'Lee tus propios números',
        body:
          'Una de esas horas le ha ganado a la otra, y no siempre es la que esperabas. La sensación ' +
          'miente — jurarías que la hora a lo grande fue un desastre y luego resulta que no. Los ' +
          'números no mienten.',
      },
      {
        n: '4',
        title: 'Deja de probar y ve',
        body:
          'Tira por la que ha ganado y olvídate de la otra. Ya le cogerás cosas más adelante, cuando ' +
          'lo principal te salga solo.',
      },
    ],
  },
  {
    type: 'tips',
    items: [
      {
        title: 'Dos números por hora',
        body: 'A cuántos has parado y cuántos se han sentado. Con eso te sobra.',
      },
      {
        title: 'Lo tranquilo vende igual que lo alto',
        body:
          'Copiar al mejor vendedor palabra por palabra cae plano, porque ese estilo le queda a él y ' +
          'no a ti. Un vendedor tranquilo y cálido vende más que uno a gritos cualquier día de la ' +
          'semana — siempre que la calidez sea de verdad.',
      },
      {
        title: 'Mañana muerta, el doble de trabajo',
        body:
          'Una mañana floja vas a por cada persona con el doble de ganas, porque los cuatro que ' +
          'pasen pueden ser el día entero. Una tarde a tope es lo contrario: al grano, no le des ' +
          'vueltas al agua con una sola persona, que en cuanto termines hay otra ahí fuera.',
      },
      {
        title: 'Que alguien te grabe',
        body:
          'Dale el móvil a un compañero para tres paradas y luego míralo. Los brazos cruzados, una ' +
          'sonrisa en la que no están los ojos, hablar demasiado rápido, acabar cada frase como si ' +
          'fuera una pregunta. No te vas a creer lo que haces, y lo arreglas en un día.',
      },
      {
        title: 'Pregunta algo afilado, no algo simpático',
        body:
          'No "¿qué tal lo hago?", sino "¿mi energía en esa última parada fue alta o baja?". Las ' +
          'preguntas concretas traen respuestas concretas. Y luego das las gracias y lo usas.',
      },
    ],
  },

  {
    type: 'facts',
    items: [
      { label: 'A quién paras', value: 'A todo el mundo. No hay lista de a quién dejar pasar.' },
      { label: 'Dónde consigues la mirada', value: 'A cuatro o cinco metros, mientras todavía andan' },
      { label: 'Cuándo te mueves', value: 'En los tres segundos siguientes a cruzar la mirada' },
      { label: 'La muestra', value: 'La cojan o la aparten — no cambia nada' },
      { label: 'Comprobar si te han seguido', value: 'Nunca. Entras, y luego los llamas.' },
      { label: 'Primeras dos semanas', value: 'Parar, meter dentro, pasar a un compañero. Sin demo.' },
      { label: 'En qué se cuenta el día', value: 'En jeringas' },
      { label: 'Frases después de un no', value: 'Una, dos como mucho — y a la siguiente persona' },
      { label: 'Qué se llevan en el bolsillo', value: 'Nada. Nunca.' },
      { label: 'La secuencia entera', value: 'Unos veinte segundos de principio a fin' },
    ],
  },
  {
    type: 'quote',
    text:
      'Todo lo demás en esta app es una variación de esta misma secuencia. Apréndete la columna ' +
      'vertebral primero, y luego los cumplidos, la demo y el precio ya tienen dónde apoyarse.',
    attribution: 'Método Zero Lines',
  },
];

// ── Substitution ─────────────────────────────────────────────────────────────

/**
 * Walk every string in a value through `substitute`.
 *
 * Doing it at the boundary rather than at each call site is the point: a future
 * editor pasting a line straight out of `lessons.ts` cannot leak a `{currency}`
 * onto a printed page, because nothing reaches a `Doc` without passing through
 * here.
 */
function resolveDeep<T>(value: T): T {
  if (typeof value === 'string') {
    return substitute(value, CURRENCY, LOCATION_NAME) as unknown as T;
  }
  if (Array.isArray(value)) {
    return (value as unknown[]).map((item) => resolveDeep(item)) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      out[key] = resolveDeep(item);
    }
    return out as unknown as T;
  }
  return value;
}

/** The Art of Stopping, one printed lesson per language. */
export function buildStoppingDocs(): Doc[] {
  return resolveDeep<Doc[]>([
    {
      slug: 'art-of-stopping-en',
      lang: 'en',
      kind: 'lesson',
      eyebrow: 'Zero Lines Academy · The Art of Stopping',
      title: 'Stop a Stranger, Walk Them In',
      subtitle:
        'The whole sequence in order, the openers, the urgency, and the one more line after the no',
      blocks: EN_BLOCKS,
    },
    {
      slug: 'art-of-stopping-es',
      lang: 'es',
      kind: 'lesson',
      eyebrow: 'Zero Lines Academy · El Arte de Parar',
      title: 'Para a un Desconocido y Mételo Dentro',
      subtitle:
        'La secuencia entera en orden, las frases de apertura, la urgencia, y la frase de más después del no',
      blocks: ES_BLOCKS,
    },
  ]);
}
