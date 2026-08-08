// ─────────────────────────────────────────────────────────────
// Zero Lines Academy — Motivational Quotes
// 100+ quotes to inspire confidence, action, resilience & success
// ─────────────────────────────────────────────────────────────

export interface Quote {
  id: string;
  text: string;
  textEs: string; // European Spanish translation
  author: string;
}

// ── Confidence & Self-Belief (15) ──
const confidenceQuotes: Quote[] = [
  {
    id: 'conf-1',
    text: "Believe you can and you're halfway there.",
    textEs: 'Cree que puedes y ya estás a mitad de camino.',
    author: 'Theodore Roosevelt',
  },
  {
    id: 'conf-2',
    text: "You are the only person on earth who can use your ability. It's an awesome responsibility.",
    textEs: 'Eres la única persona en el mundo que puede usar tu habilidad. Es una responsabilidad increíble.',
    author: 'Zig Ziglar',
  },
  {
    id: 'conf-3',
    text: 'Confidence is not "they will like me." Confidence is "I\'ll be fine if they don\'t."',
    textEs: 'La confianza no es "les voy a caer bien". La confianza es "no pasa nada si no les caigo".',
    author: 'Christina Grimmie',
  },
  {
    id: 'conf-4',
    text: 'The difference between who you are and who you want to be is what you do.',
    textEs: 'La diferencia entre quien eres y quien quieres ser es lo que haces.',
    author: 'Unknown',
  },
  {
    id: 'conf-5',
    text: 'Act as if what you do makes a difference. It does.',
    textEs: 'Actúa como si lo que haces marcara la diferencia. Porque la marca.',
    author: 'William James',
  },
  {
    id: 'conf-6',
    text: 'Your value does not decrease based on someone\'s inability to see your worth.',
    textEs: 'Tu valor no disminuye por la incapacidad de alguien de ver tu valía.',
    author: 'Unknown',
  },
  {
    id: 'conf-7',
    text: 'Doubt kills more dreams than failure ever will.',
    textEs: 'La duda mata más sueños que el fracaso.',
    author: 'Suzy Kassem',
  },
  {
    id: 'conf-8',
    text: 'You don\'t have to be great to start, but you have to start to be great.',
    textEs: 'No tienes que ser grande para empezar, pero tienes que empezar para ser grande.',
    author: 'Zig Ziglar',
  },
  {
    id: 'conf-9',
    text: 'The man who thinks he can and the man who thinks he can\'t are both right.',
    textEs: 'El hombre que cree que puede y el que cree que no puede, ambos tienen razón.',
    author: 'Henry Ford',
  },
  {
    id: 'conf-10',
    text: 'Own the room. Not because you\'re the loudest, but because you\'re the most prepared.',
    textEs: 'Domina la sala. No porque seas el más ruidoso, sino porque eres el más preparado.',
    author: 'Zero Lines',
  },
  {
    id: 'conf-11',
    text: 'Your energy introduces you before you even speak. Make it count.',
    textEs: 'Tu energía te presenta antes de que abras la boca. Haz que cuente.',
    author: 'Zero Lines',
  },
  {
    id: 'conf-12',
    text: 'You were not hired to be average. You were hired to be exceptional.',
    textEs: 'No te contrataron para ser mediocre. Te contrataron para ser excepcional.',
    author: 'Zero Lines',
  },
  {
    id: 'conf-13',
    text: 'If you don\'t believe in yourself, why should anyone else?',
    textEs: 'Si tú no crees en ti mismo, ¿por qué debería hacerlo alguien más?',
    author: 'Zero Lines',
  },
  {
    id: 'conf-14',
    text: 'Confidence comes from competence. Competence comes from repetition.',
    textEs: 'La confianza viene de la competencia. La competencia viene de la repetición.',
    author: 'Zero Lines',
  },
  {
    id: 'conf-15',
    text: 'Walk in like you own the place. Because today, you do.',
    textEs: 'Entra como si el local fuera tuyo. Porque hoy, lo es.',
    author: 'Zero Lines',
  },
];

// ── Action & Taking Initiative (15) ──
const actionQuotes: Quote[] = [
  {
    id: 'act-1',
    text: 'The best way to get started is to quit talking and begin doing.',
    textEs: 'La mejor manera de empezar es dejar de hablar y empezar a actuar.',
    author: 'Walt Disney',
  },
  {
    id: 'act-2',
    text: 'Do not wait to strike till the iron is hot; but make it hot by striking.',
    textEs: 'No esperes a que el hierro esté caliente; caliéntalo golpeando.',
    author: 'William Butler Yeats',
  },
  {
    id: 'act-3',
    text: 'Action is the foundational key to all success.',
    textEs: 'La acción es la clave fundamental de todo éxito.',
    author: 'Pablo Picasso',
  },
  {
    id: 'act-4',
    text: 'You don\'t have to see the whole staircase, just take the first step.',
    textEs: 'No tienes que ver toda la escalera, solo da el primer paso.',
    author: 'Martin Luther King Jr.',
  },
  {
    id: 'act-5',
    text: 'Opportunities don\'t happen. You create them.',
    textEs: 'Las oportunidades no suceden. Las creas tú.',
    author: 'Chris Grosser',
  },
  {
    id: 'act-6',
    text: 'The secret of getting ahead is getting started.',
    textEs: 'El secreto para salir adelante es empezar.',
    author: 'Mark Twain',
  },
  {
    id: 'act-7',
    text: 'Stop preparing. Start doing. The customer is walking past you right now.',
    textEs: 'Deja de prepararte. Empieza a actuar. El cliente está pasando ahora mismo.',
    author: 'Zero Lines',
  },
  {
    id: 'act-8',
    text: 'Every second you hesitate, someone else is making the sale you could have made.',
    textEs: 'Cada segundo que dudas, alguien más está haciendo la venta que tú podrías haber hecho.',
    author: 'Zero Lines',
  },
  {
    id: 'act-9',
    text: 'The 3-second rule isn\'t a suggestion. It\'s the difference between average and extraordinary.',
    textEs: 'La regla de los 3 segundos no es una sugerencia. Es la diferencia entre lo mediocre y lo extraordinario.',
    author: 'Zero Lines',
  },
  {
    id: 'act-10',
    text: 'Today, not tomorrow. Now, not later. Go.',
    textEs: 'Hoy, no mañana. Ahora, no después. Vamos.',
    author: 'Zero Lines',
  },
  {
    id: 'act-11',
    text: 'Motion creates emotion. Move, and the motivation will follow.',
    textEs: 'El movimiento crea emoción. Muévete, y la motivación seguirá.',
    author: 'Tony Robbins',
  },
  {
    id: 'act-12',
    text: 'The customer who just walked in doesn\'t care about your mood. They care about what you can show them.',
    textEs: 'Al cliente que acaba de entrar no le importa tu humor. Le importa lo que puedas mostrarle.',
    author: 'Zero Lines',
  },
  {
    id: 'act-13',
    text: 'You miss 100% of the shots you don\'t take.',
    textEs: 'Fallas el 100% de los tiros que no lanzas.',
    author: 'Wayne Gretzky',
  },
  {
    id: 'act-14',
    text: 'One stop today is worth ten plans for tomorrow.',
    textEs: 'Una parada hoy vale más que diez planes para mañana.',
    author: 'Zero Lines',
  },
  {
    id: 'act-15',
    text: 'The floor is your stage. Step onto it.',
    textEs: 'La tienda es tu escenario. Súbete a él.',
    author: 'Zero Lines',
  },
];

// ── Resilience & Persistence (15) ──
const resilienceQuotes: Quote[] = [
  {
    id: 'res-1',
    text: 'It does not matter how slowly you go as long as you do not stop.',
    textEs: 'No importa lo lento que vayas, siempre que no te detengas.',
    author: 'Confucius',
  },
  {
    id: 'res-2',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    textEs: 'El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el valor para continuar.',
    author: 'Winston Churchill',
  },
  {
    id: 'res-3',
    text: 'The comeback is always stronger than the setback.',
    textEs: 'La remontada siempre es más fuerte que el revés.',
    author: 'Unknown',
  },
  {
    id: 'res-4',
    text: 'Fall seven times, stand up eight.',
    textEs: 'Cáete siete veces, levántate ocho.',
    author: 'Japanese Proverb',
  },
  {
    id: 'res-5',
    text: 'Tough times never last, but tough people do.',
    textEs: 'Los tiempos difíciles no duran, pero la gente dura sí.',
    author: 'Robert H. Schuller',
  },
  {
    id: 'res-6',
    text: 'Persistence is to the character of man as carbon is to steel.',
    textEs: 'La persistencia es para el carácter del hombre lo que el carbono es para el acero.',
    author: 'Napoleon Hill',
  },
  {
    id: 'res-7',
    text: 'You may encounter many defeats, but you must not be defeated.',
    textEs: 'Puedes encontrar muchas derrotas, pero no debes ser derrotado.',
    author: 'Maya Angelou',
  },
  {
    id: 'res-8',
    text: 'A bad day on the floor is better than your best day at your old job. Learn from it.',
    textEs: 'Un mal día en la tienda es mejor que tu mejor día en tu antiguo trabajo. Aprende de ello.',
    author: 'Zero Lines',
  },
  {
    id: 'res-9',
    text: 'Every "no" is one step closer to "yes." Keep stepping.',
    textEs: 'Cada "no" es un paso más cerca del "sí". Sigue caminando.',
    author: 'Zero Lines',
  },
  {
    id: 'res-10',
    text: 'The salesperson who got rejected ten times and showed up for number eleven is the one who wins.',
    textEs: 'El vendedor al que rechazaron diez veces y volvió a por el número once es el que gana.',
    author: 'Zero Lines',
  },
  {
    id: 'res-11',
    text: 'Your worst day this month still taught you something your best day last month didn\'t.',
    textEs: 'Tu peor día de este mes te enseñó algo que tu mejor día del mes pasado no te enseñó.',
    author: 'Zero Lines',
  },
  {
    id: 'res-12',
    text: 'Diamonds are made under pressure. So are top sellers.',
    textEs: 'Los diamantes se forman bajo presión. Los mejores vendedores también.',
    author: 'Zero Lines',
  },
  {
    id: 'res-13',
    text: 'Rejection is redirection. Learn the lesson, adjust, and go again.',
    textEs: 'El rechazo es una redirección. Aprende la lección, ajusta y vuelve a intentarlo.',
    author: 'Zero Lines',
  },
  {
    id: 'res-14',
    text: 'Never confuse a single defeat with a final defeat.',
    textEs: 'Nunca confundas una derrota con la derrota definitiva.',
    author: 'F. Scott Fitzgerald',
  },
  {
    id: 'res-15',
    text: 'Grit is the fuel. Talent is just the vehicle.',
    textEs: 'La determinación es el combustible. El talento es solo el vehículo.',
    author: 'Zero Lines',
  },
];

// ── Sales-Specific Motivation (15) ──
const salesQuotes: Quote[] = [
  {
    id: 'sale-1',
    text: 'People don\'t buy what you do; they buy why you do it.',
    textEs: 'La gente no compra lo que haces; compra por qué lo haces.',
    author: 'Simon Sinek',
  },
  {
    id: 'sale-2',
    text: 'Every sale has five basic obstacles: no need, no money, no hurry, no desire, no trust.',
    textEs: 'Cada venta tiene cinco obstáculos básicos: sin necesidad, sin dinero, sin prisa, sin deseo, sin confianza.',
    author: 'Zig Ziglar',
  },
  {
    id: 'sale-3',
    text: 'Selling is essentially a transference of feeling.',
    textEs: 'Vender es esencialmente una transferencia de sentimiento.',
    author: 'Zig Ziglar',
  },
  {
    id: 'sale-4',
    text: 'The best salespeople are problem solvers, not product pushers.',
    textEs: 'Los mejores vendedores solucionan problemas, no colocan productos.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-5',
    text: 'Your product is the answer to a question the customer hasn\'t asked yet. Help them ask it.',
    textEs: 'Tu producto es la respuesta a una pregunta que el cliente aún no ha hecho. Ayúdale a hacerla.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-6',
    text: 'The demo is the sale. If they feel it, they buy it.',
    textEs: 'La demostración es la venta. Si lo sienten, lo compran.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-7',
    text: 'Stop selling. Start helping. The numbers will follow.',
    textEs: 'Deja de vender. Empieza a ayudar. Los números seguirán.',
    author: 'Zig Ziglar',
  },
  {
    id: 'sale-8',
    text: 'A satisfied customer is the best business strategy of all.',
    textEs: 'Un cliente satisfecho es la mejor estrategia de negocio de todas.',
    author: 'Michael LeBoeuf',
  },
  {
    id: 'sale-9',
    text: 'Treat objections as requests for more information.',
    textEs: 'Trata las objeciones como peticiones de más información.',
    author: 'Brian Tracy',
  },
  {
    id: 'sale-10',
    text: 'The close doesn\'t happen at the counter. It happens in the connection.',
    textEs: 'El cierre no ocurre en el mostrador. Ocurre en la conexión.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-11',
    text: 'Your commission check is a report card on how many people you helped today.',
    textEs: 'Tu comisión es el boletín de notas de a cuánta gente has ayudado hoy.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-12',
    text: 'If you\'re not making mistakes, you\'re not trying hard enough. Risk the stop. Risk the demo. Risk the close.',
    textEs: 'Si no estás cometiendo errores, no te estás esforzando lo suficiente. Arriésgate a parar. Arriésgate a la demo. Arriésgate a cerrar.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-13',
    text: 'The customer doesn\'t care how much you know until they know how much you care.',
    textEs: 'Al cliente no le importa cuánto sabes hasta que sabe cuánto te importa.',
    author: 'Theodore Roosevelt',
  },
  {
    id: 'sale-14',
    text: 'Stop waiting for the perfect customer. Every customer is perfect if you adapt.',
    textEs: 'Deja de esperar al cliente perfecto. Cada cliente es perfecto si te adaptas.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-15',
    text: 'Your next customer has no idea about your last rejection. Give them your best energy.',
    textEs: 'Tu próximo cliente no tiene ni idea de tu último rechazo. Dale tu mejor energía.',
    author: 'Zero Lines',
  },
];

// ── Energy & Enthusiasm (10) ──
const energyQuotes: Quote[] = [
  {
    id: 'nrg-1',
    text: 'Enthusiasm is the sparkle in your eyes, the swing in your gait, the grip of your hand.',
    textEs: 'El entusiasmo es el brillo de tus ojos, el brío de tu paso, la fuerza de tu apretón de manos.',
    author: 'Henry Ford',
  },
  {
    id: 'nrg-2',
    text: 'Nothing great was ever achieved without enthusiasm.',
    textEs: 'Nada grande se logró nunca sin entusiasmo.',
    author: 'Ralph Waldo Emerson',
  },
  {
    id: 'nrg-3',
    text: 'Energy and persistence conquer all things.',
    textEs: 'La energía y la persistencia conquistan todas las cosas.',
    author: 'Benjamin Franklin',
  },
  {
    id: 'nrg-4',
    text: 'Your energy is contagious. Infect the whole floor.',
    textEs: 'Tu energía se contagia. Contágiala a toda la tienda.',
    author: 'Zero Lines',
  },
  {
    id: 'nrg-5',
    text: 'Smile. Stand tall. Speak with conviction. That\'s half the sale.',
    textEs: 'Sonríe. Mantente erguido. Habla con convicción. Eso es la mitad de la venta.',
    author: 'Zero Lines',
  },
  {
    id: 'nrg-6',
    text: 'If you\'re not excited about what you\'re selling, why should the customer be?',
    textEs: 'Si tú no estás emocionado por lo que vendes, ¿por qué debería estarlo el cliente?',
    author: 'Zero Lines',
  },
  {
    id: 'nrg-7',
    text: 'The most powerful weapon on earth is the human soul on fire.',
    textEs: 'El arma más poderosa de la tierra es el alma humana en llamas.',
    author: 'Ferdinand Foch',
  },
  {
    id: 'nrg-8',
    text: 'Bring the fire. Every shift. Every stop. Every time.',
    textEs: 'Trae el fuego. Cada turno. Cada parada. Cada vez.',
    author: 'Zero Lines',
  },
  {
    id: 'nrg-9',
    text: 'Your vibe attracts your tribe. Be magnetic.',
    textEs: 'Tu energía atrae a tu gente. Sé magnético.',
    author: 'Zero Lines',
  },
  {
    id: 'nrg-10',
    text: 'Passion is energy. Feel the power that comes from focusing on what excites you.',
    textEs: 'La pasión es energía. Siente el poder que viene de centrarte en lo que te apasiona.',
    author: 'Oprah Winfrey',
  },
];

// ── Rejection & Overcoming Fear (10) ──
const rejectionQuotes: Quote[] = [
  {
    id: 'rej-1',
    text: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.',
    textEs: 'No he fracasado. Solo he encontrado 10.000 maneras que no funcionan.',
    author: 'Thomas Edison',
  },
  {
    id: 'rej-2',
    text: 'Fear has two meanings: Forget Everything And Run, or Face Everything And Rise.',
    textEs: 'El miedo tiene dos significados: Olvida Todo Y Corre, o Enfréntalo Todo Y Levántate.',
    author: 'Zig Ziglar',
  },
  {
    id: 'rej-3',
    text: 'Rejection doesn\'t mean you aren\'t good enough; it means the other person failed to notice what you have to offer.',
    textEs: 'El rechazo no significa que no seas lo suficientemente bueno; significa que la otra persona no supo ver lo que ofreces.',
    author: 'Unknown',
  },
  {
    id: 'rej-4',
    text: 'The only thing we have to fear is fear itself.',
    textEs: 'A lo único que tenemos que temer es al miedo mismo.',
    author: 'Franklin D. Roosevelt',
  },
  {
    id: 'rej-5',
    text: 'Courage is resistance to fear, mastery of fear — not absence of fear.',
    textEs: 'El coraje es resistencia al miedo, dominio del miedo — no ausencia de miedo.',
    author: 'Mark Twain',
  },
  {
    id: 'rej-6',
    text: '"No" is just a word. It has no power over you unless you give it power.',
    textEs: '"No" es solo una palabra. No tiene poder sobre ti a menos que se lo des.',
    author: 'Zero Lines',
  },
  {
    id: 'rej-7',
    text: 'The customer said no to the product, not to you. Separate yourself. Try again.',
    textEs: 'El cliente dijo no al producto, no a ti. Sepárate. Inténtalo de nuevo.',
    author: 'Zero Lines',
  },
  {
    id: 'rej-8',
    text: 'Fear of rejection is temporary. Regret of never trying is permanent.',
    textEs: 'El miedo al rechazo es temporal. El arrepentimiento de nunca haberlo intentado es permanente.',
    author: 'Zero Lines',
  },
  {
    id: 'rej-9',
    text: 'Every top earner has a graveyard of "no"s behind them. That\'s how you know they\'re warriors.',
    textEs: 'Todo gran vendedor lleva detrás un cementerio de "noes". Así es como sabes que es un guerrero.',
    author: 'Zero Lines',
  },
  {
    id: 'rej-10',
    text: 'The worst they can say is no. The best they can say changes your whole day. Risk it.',
    textEs: 'Lo peor que pueden decir es no. Lo mejor que pueden decir te cambia el día entero. Arriésgate.',
    author: 'Zero Lines',
  },
];

// ── Success & Achievement (10) ──
const successQuotes: Quote[] = [
  {
    id: 'suc-1',
    text: 'Success is the sum of small efforts, repeated day in and day out.',
    textEs: 'El éxito es la suma de pequeños esfuerzos, repetidos día tras día.',
    author: 'Robert Collier',
  },
  {
    id: 'suc-2',
    text: 'The only place where success comes before work is in the dictionary.',
    textEs: 'El único lugar donde el éxito viene antes que el trabajo es en el diccionario.',
    author: 'Vidal Sassoon',
  },
  {
    id: 'suc-3',
    text: 'Success usually comes to those who are too busy to be looking for it.',
    textEs: 'El éxito suele llegar a quienes están demasiado ocupados para buscarlo.',
    author: 'Henry David Thoreau',
  },
  {
    id: 'suc-4',
    text: 'Don\'t watch the clock; do what it does. Keep going.',
    textEs: 'No mires el reloj; haz lo que él hace. Sigue adelante.',
    author: 'Sam Levenson',
  },
  {
    id: 'suc-5',
    text: 'The harder you work for something, the greater you\'ll feel when you achieve it.',
    textEs: 'Cuanto más te dejas la piel en algo, más grande te sientes cuando lo consigues.',
    author: 'Unknown',
  },
  {
    id: 'suc-6',
    text: 'Your income is directly proportional to the number of people you help and how well you help them.',
    textEs: 'Tus ingresos son directamente proporcionales al número de personas que ayudas y a lo bien que lo haces.',
    author: 'Zero Lines',
  },
  {
    id: 'suc-7',
    text: 'Champions aren\'t made in the ring. They\'re made in the practice that nobody sees.',
    textEs: 'Los campeones no se hacen en el ring. Se hacen en la práctica que nadie ve.',
    author: 'Muhammad Ali',
  },
  {
    id: 'suc-8',
    text: 'Small daily improvements are the key to staggering long-term results.',
    textEs: 'Pequeñas mejoras diarias son la clave para resultados a largo plazo asombrosos.',
    author: 'Zero Lines',
  },
  {
    id: 'suc-9',
    text: 'The gap between average and extraordinary is narrower than you think. Cross it today.',
    textEs: 'La brecha entre lo mediocre y lo extraordinario es más estrecha de lo que crees. Crúzala hoy.',
    author: 'Zero Lines',
  },
  {
    id: 'suc-10',
    text: 'Your best month ever started with one decision: to give today everything you have.',
    textEs: 'Tu mejor mes comenzó con una decisión: dar hoy todo lo que tienes.',
    author: 'Zero Lines',
  },
];

// ── Morning & Mindset Starters (10) ──
const morningQuotes: Quote[] = [
  {
    id: 'mor-1',
    text: 'Today is a new day. Even if you were terrible yesterday, today you can be great.',
    textEs: 'Hoy es un día nuevo. Aunque ayer lo hicieras fatal, hoy puedes ser grande.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-2',
    text: 'The morning sets the tone. Choose energy. Choose optimism. Choose action.',
    textEs: 'La mañana marca el tono. Elige energía. Elige optimismo. Elige acción.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-3',
    text: 'Write down your goal for today. Now double it. That\'s your real target.',
    textEs: 'Escribe tu objetivo para hoy. Ahora dóblalo. Ese es tu objetivo de verdad.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-4',
    text: 'Today I will do what others won\'t, so tomorrow I can accomplish what others can\'t.',
    textEs: 'Hoy haré lo que otros no harán, para mañana lograr lo que otros no pueden.',
    author: 'Jerry Rice',
  },
  {
    id: 'mor-5',
    text: 'Every morning we are born again. What we do today is what matters most.',
    textEs: 'Cada mañana nacemos de nuevo. Lo que hacemos hoy es lo que más importa.',
    author: 'Buddha',
  },
  {
    id: 'mor-6',
    text: 'Your first stop of the day sets the rhythm. Make it bold. Make it count.',
    textEs: 'Tu primera parada del día marca el ritmo. Hazla audaz. Haz que cuente.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-7',
    text: 'The floor is waiting. Your customers are waiting. Your future self is waiting. Go get it.',
    textEs: 'La tienda te espera. Tus clientes te esperan. Tu yo del futuro te espera. Ve a por ello.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-8',
    text: 'One shift. One opportunity. Make it legendary.',
    textEs: 'Un turno. Una oportunidad. Hazlo legendario.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-9',
    text: 'Visualize your best demo. Now go make it real, ten times today.',
    textEs: 'Visualiza tu mejor demostración. Ahora ve y hazla realidad, diez veces hoy.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-10',
    text: 'You don\'t need motivation. You need momentum. Start moving.',
    textEs: 'No necesitas motivación. Necesitas impulso. Empieza a moverte.',
    author: 'Zero Lines',
  },
];

// ── Extra: Legendary Sales Quotes (10) ──
const legendaryQuotes: Quote[] = [
  {
    id: 'leg-1',
    text: 'Sales are contingent upon the attitude of the salesman, not the attitude of the prospect.',
    textEs: 'Las ventas dependen de la actitud del vendedor, no de la del cliente potencial.',
    author: 'William Clement Stone',
  },
  {
    id: 'leg-2',
    text: 'Approach each customer with the idea of helping them solve a problem or achieve a goal, not of selling a product or service.',
    textEs: 'Acércate a cada cliente con la idea de ayudarle a resolver un problema o lograr un objetivo, no de venderle un producto.',
    author: 'Brian Tracy',
  },
  {
    id: 'leg-3',
    text: 'The most unprofitable item ever manufactured is an excuse.',
    textEs: 'El artículo menos rentable jamás fabricado es una excusa.',
    author: 'John Mason',
  },
  {
    id: 'leg-4',
    text: 'You don\'t close a sale; you open a relationship if you want to build a long-term, successful enterprise.',
    textEs: 'No cierras una venta; abres una relación si quieres construir un negocio exitoso a largo plazo.',
    author: 'Patricia Fripp',
  },
  {
    id: 'leg-5',
    text: 'There are no limits to what you can accomplish, except the limits you place on your own thinking.',
    textEs: 'No hay límites para lo que puedes lograr, excepto los límites que pongas a tu propio pensamiento.',
    author: 'Brian Tracy',
  },
  {
    id: 'leg-6',
    text: 'Big shots are only little shots who keep shooting.',
    textEs: 'Los grandes triunfadores son solo pequeños triunfadores que siguen disparando.',
    author: 'Christopher Morley',
  },
  {
    id: 'leg-7',
    text: 'The secret of selling yourself is to have a product you truly believe in. And you, my friend, are that product.',
    textEs: 'El secreto para venderte a ti mismo es tener un producto en el que realmente creas. Y tú, amigo mío, eres ese producto.',
    author: 'Zero Lines',
  },
  {
    id: 'leg-8',
    text: 'Average salespeople sell features. Great salespeople sell outcomes. Legendary salespeople sell transformation.',
    textEs: 'Los vendedores mediocres venden características. Los grandes venden resultados. Los legendarios venden transformación.',
    author: 'Zero Lines',
  },
  {
    id: 'leg-9',
    text: 'The number one reason people fail in sales is because they care more about not being rejected than about making the sale.',
    textEs: 'La razón número uno por la que la gente fracasa en ventas es porque les importa más no ser rechazados que hacer la venta.',
    author: 'Zero Lines',
  },
  {
    id: 'leg-10',
    text: 'At the end of every shift, ask yourself: "Did I give it everything I had?" That\'s the only scoreboard that matters.',
    textEs: 'Al final de cada turno, pregúntate: "¿Le di todo lo que tenía?" Ese es el único marcador que importa.',
    author: 'Zero Lines',
  },
];

// ── Combine all quotes ──
export const quotes: Quote[] = [
  ...confidenceQuotes,
  ...actionQuotes,
  ...resilienceQuotes,
  ...salesQuotes,
  ...energyQuotes,
  ...rejectionQuotes,
  ...successQuotes,
  ...morningQuotes,
  ...legendaryQuotes,
];

// ── Helpers ──
export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getQuoteById(id: string): Quote | undefined {
  return quotes.find((q) => q.id === id);
}

export function getQuotesByAuthor(author: string): Quote[] {
  return quotes.filter((q) => q.author === author);
}
