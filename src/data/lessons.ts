// ─────────────────────────────────────────────────────────────
// Zero Lines Academy — Lesson Data Structure
// All lesson content lives here as structured data.
// UI components render dynamically from this file.
// ─────────────────────────────────────────────────────────────

export type SectionType =
  | 'header'
  | 'subheader'
  | 'paragraph'
  | 'quote'
  | 'tip'
  | 'keypoint'
  | 'script'
  | 'checklist'
  | 'bullets'
  | 'numbered'
  | 'divider'
  | 'comparison';

export interface ContentSection {
  type: SectionType;
  text?: string;
  attribution?: string;
  items?: string[];
  left?: { label: string; text: string };
  right?: { label: string; text: string };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
  duration: string; // e.g. "5 min"
  icon: string; // lucide-react icon name
  order: number;
  xpReward: number;
  sections: ContentSection[];
  quiz: QuizQuestion[];
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // lucide-react icon name
  accentColor: string; // hex color for category theming
  lessonOrder: string[]; // ordered lesson IDs
}

// ── Categories ──
export const categories: Category[] = [
  {
    id: 'psychology',
    title: 'Sales Psychology & Self-Mastery',
    subtitle: 'Master your mind, master the floor',
    description:
      'Everything starts with you. Your energy, your confidence, your mindset — that is what customers feel before you say a single word. These lessons are about becoming the kind of salesperson who walks in and owns the room.',
    icon: 'Brain',
    accentColor: '#0ABAB5',
    lessonOrder: ['psych-1', 'psych-2', 'psych-3', 'psych-4', 'psych-5', 'psych-6', 'psych-7', 'psych-8'],
  },
  {
    id: 'connecting',
    title: 'Reading & Connecting with People',
    subtitle: 'See what others miss',
    description:
      'The best salespeople are master observers. They read people in seconds — their mood, their budget, their relationship dynamics — and they adapt instantly. These lessons give you the tools to connect with anyone who walks through your door.',
    icon: 'Users',
    accentColor: '#8B5CF6',
    lessonOrder: ['connect-1', 'connect-2', 'connect-3', 'connect-4', 'connect-5', 'connect-6', 'connect-7', 'connect-8'],
  },
  {
    id: 'stopping',
    title: 'The Art of Stopping',
    subtitle: 'Turn strangers into demos',
    description:
      'Stopping is the hardest skill and the most important. No stop, no sale. These lessons give you a whole toolbox of approaches — different styles, different energies, different techniques — so you can find what works for YOUR personality.',
    icon: 'Hand',
    accentColor: '#F59E0B',
    lessonOrder: ['stop-1', 'stop-2', 'stop-3', 'stop-4', 'stop-5', 'stop-6', 'stop-7'],
  },
  {
    id: 'products',
    title: 'Product Mastery',
    subtitle: 'Know your weapons inside out',
    description:
      'Your products are incredible — but only if you know how to show them. Deep-dive into every product pitch, demo technique, price structure, and closing strategy. These are your money-makers.',
    icon: 'Sparkles',
    accentColor: '#0ABAB5',
    lessonOrder: ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6', 'prod-7', 'prod-8'],
  },
];


// ── Lessons ──
export const lessons: Record<string, Lesson> = {
  'connect-1': {
    id: 'connect-1',
    categoryId: 'connecting',
    title: 'The 15-Second Scan',
    subtitle: 'Systematic observation: building a mental profile before you speak',
    duration: '8 min',
    icon: 'Eye',
    order: 1,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'See Everything Before You Say Anything'
    },
    {
            type: 'paragraph',
      text: 'The 15 seconds before you speak are worth more than the 15 minutes after. In that window, you gather the intelligence that shapes your entire approach. What you observe determines what you say, how you say it, and whether you\'ll close. Master salespeople don\'t just look at customers — they READ them.'
    },
    {
            type: 'keypoint',
      text: 'Every detail is data. The watch on their wrist, the bags in their hands, the person beside them, the way they walk — all of it feeds into your mental profile. The more accurate your scan, the more precise your pitch.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The SCAN System: 5 Categories to Assess in 15 Seconds'
    },
    {
            type: 'paragraph',
      text: 'Use this acronym to quickly categorize what you observe:'
    },
    {
            type: 'bullets',
      items: [
        'S — STYLE: What are they wearing? Look at fabric quality, brand logos, fit, and coordination. Are they dressed casually (tourist mode), elegantly (shopping mode), or practically (skiing/sightseeing)? A woman in a €2,000 coat is a different prospect than one in hiking gear.',
        'C — CARRY: What bags are they carrying? Shopping bags from luxury stores (Louis Vuitton, Chanel, local ski boutiques) signal buying mood AND spending power. A person with no bags might be just starting their shopping day — perfect timing.',
        'A — ACCESSORIES: Watch, jewelry, sunglasses, handbag. A Rolex or Cartier watch signals serious spending power. Costume jewelry signals budget-conscious. The quality of accessories often reveals more than clothing.',
        'N — NETWORK: Who are they with? Solo travelers make fast decisions. Couples require different engagement (see the Partner Dynamic lesson). Groups are social — energy and humor work best. Families with young children are harder stops but can be big buyers when engaged.',
        'P — PACE & POSTURE: How fast are they walking? Are they window-shopping (slow, looking around) or destination-shopping (fast, purposeful)? Relaxed posture means receptive. Tense posture means they\'re in a hurry or stressed.'
      ]
    },
    {
            type: 'tip',
      text: 'Practice the SCAN on random pedestrians even when you\'re not working. Sit at a café and mentally scan people walking by. Guess their spending power, their mood, their relationship to the person beside them. Then check your guesses if they enter a nearby shop. This builds your observation muscle.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Quick Signals: Red, Yellow, and Green'
    },
    {
            type: 'comparison',
      left: { label: 'GREEN (Stop Immediately)', text: 'Carrying luxury shopping bags, window-shopping slowly, well-dressed, good grooming, with a partner, smiling and chatting, looking at displays, no phone in hand. These people are in buying mode. Approach with confidence.' },
      right: { label: 'RED (Low Priority)', text: 'Walking fast with purpose, on phone call, pushing stroller with fussy baby, wearing headphones, carrying heavy bags (tired), frowning, checking watch repeatedly. These people are unlikely to stop. Let them pass or use a very light touch.' }
    },
    {
            type: 'keypoint',
      text: 'YELLOW means caution and creativity. They\'re neutral — not obviously receptive but not closed off. Maybe they\'re dressed well but walking fast. Maybe they\'re with a partner who seems interested while they seem indifferent. These require your best stopping technique and often become your most satisfying wins.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Grooming Signal'
    },
    {
            type: 'paragraph',
      text: 'One of the most reliable buying indicators is self-care. People who invest in their appearance are prime candidates for premium skincare:'
    },
    {
            type: 'bullets',
      items: [
        'WELL-MAINTAINED NAILS: Whether natural or polished, cared-for nails signal someone who values appearance. Perfect for the Nail Kit pitch.',
        'QUALITY HAIR: Styled, colored, well-cut hair suggests investment in self-presentation.',
        'SKIN QUALITY: Someone with good skin cares about skincare. Someone with skin concerns (redness, dryness, visible bags) has a PROBLEM you can solve.',
        'TEETH: Straight, white teeth often correlate with overall self-care investment and disposable income.',
        'MAKEUP APPLICATION: Skillful makeup (not overdone) shows someone who invests time in their appearance daily.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Mistakes to Avoid'
    },
    {
            type: 'bullets',
      items: [
        'DON\'T JUDGE BY ETHNICITY: Never assume spending power based on someone\'s nationality or ethnicity. You will miss incredible sales and look foolish.',
        'DON\'T PRE-JUDGE AGE: Young people often have more disposable income than older people (fewer dependents, different priorities). Don\'t skip someone because they look young.',
        'DON\'T IGNORE MIXED SIGNALS: A person in hiking boots with a Rolex is a complex profile — high spending power but practical mindset. Adapt accordingly.',
        'DON\'T STARE: Your scan should be quick and subtle. Lingering eye contact before approaching feels creepy, not observant.'
      ]
    },
    {
            type: 'script',
      text: '\'I love your bag — is that from [brand]?\' A specific, genuine compliment based on your observation instantly builds rapport. It shows you\'ve actually SEEN them, not just targeted them randomly.'
    },
    {
            type: 'quote',
      text: 'The best salespeople don\'t have better pitches. They have better eyes. They see what others miss.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What does the \'C\' in the SCAN system stand for?',
      options: [
        'Clothing',
        'Carry (shopping bags)',
        'Cultural background',
        'Conversation style'
      ],
      correctIndex: 1,
      explanation: 'C stands for \'Carry\' — what shopping bags or items they\'re carrying. Bags from luxury stores signal buying mood and spending power.',
    },
    {
      question: 'Which of these is a \'GREEN\' signal to stop immediately?',
      options: [
        'Walking fast and checking their watch',
        'On a phone call, looking stressed',
        'Carrying luxury shopping bags and window-shopping slowly',
        'Pushing a stroller with a crying baby'
      ],
      correctIndex: 2,
      explanation: 'Luxury shopping bags + slow window-shopping signals buying mode. The person is already spending and receptive to new experiences.',
    },
    {
      question: 'Why is grooming quality a reliable buying indicator?',
      options: [
        'It means they\'re vain',
        'It indicates someone who invests in their appearance and self-care',
        'It shows they\'re wealthy',
        'It means they wear makeup'
      ],
      correctIndex: 1,
      explanation: 'People who invest in their appearance (nails, hair, skin, teeth) are prime candidates for premium skincare because they already value self-care and invest in it.',
    }
    ],
  },
  'connect-2': {
    id: 'connect-2',
    categoryId: 'connecting',
    title: 'Reading Spending Power',
    subtitle: 'Detailed signals: brand logos, watch quality, bag condition, and more',
    duration: '10 min',
    icon: 'Gem',
    order: 2,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Know Who Can Spend Before They Open Their Wallet'
    },
    {
            type: 'paragraph',
      text: 'Reading spending power isn\'t about snobbery — it\'s about precision. Offering a €300 syringe to someone with a €50 budget wastes everyone\'s time. But missing a €500 sale because you pitched the €30 scrub to a wealthy buyer? That\'s leaving money on the table. The ability to read spending power lets you match the right product and price point to the right person.'
    },
    {
            type: 'keypoint',
      text: 'Spending power signals are everywhere — but they\'re subtle. A fake designer bag looks similar to a real one to the untrained eye. Learn the difference.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Hierarchy of Signals (Most to Least Reliable)'
    },
    {
            type: 'numbered',
      items: [
        'WATCH QUALITY: This is the #1 indicator. A genuine Rolex, Cartier, Omega, or Patek Philippe signals serious wealth. But also look for quality mid-range watches (Longines, TAG Heuer, Tissot) which signal comfortable middle-to-upper income. No watch, or a basic digital watch, signals budget consciousness or practical mindset.',
        'SHOE QUALITY: Shoes reveal spending habits more honestly than almost anything else. Well-maintained leather shoes or designer sneakers (clean, current season) signal investment in quality. Scuffed, worn, or budget shoes suggest either limited budget or different priorities.',
        'HANDBAG AUTHENTICITY: Learn to spot quality leather, hardware weight, stitching precision, and logo placement. Real luxury bags have perfect stitching, heavy zippers, and consistent logo patterns. But remember: some wealthy people carry simple bags. Use this signal in combination with others.',
        'NAIL AND TEETH QUALITY: Professional manicures and dental work (straight, white teeth) require ongoing investment. These are lifestyle signals — the person regularly invests in self-maintenance.',
        'CLOTHING FABRIC AND FIT: Natural fibers (wool, silk, cashmere, quality cotton) drape differently than synthetics. Well-fitted clothing suggests either expensive purchases or tailoring — both indicate quality consciousness.',
        'CURRENT SHOPPING BAGS: Bags from luxury or high-end stores in the area are immediate, context-specific spending signals. Someone already carrying Chanel and ski boutique bags is primed to buy more.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Tourist Origin: Typical Spending Patterns'
    },
    {
            type: 'paragraph',
      text: 'These are generalizations based on aggregate patterns. ALWAYS read the individual, not just their nationality. But knowing typical patterns helps you calibrate:'
    },
    {
            type: 'bullets',
      items: [
        'SPANISH TOURISTS: Often day-trippers or weekend visitors. Shopping-focused, price-conscious but will spend for genuine value. Love the tax-haven angle. Respond well to energy and warmth.',
        'FRENCH TOURISTS: Sophisticated about skincare (French beauty culture). Appreciate product knowledge and quality. Less impressed by hype, more by substance. May seem reserved initially — don\'t mistake this for disinterest.',
        'BRITISH TOURISTS: Direct communicators. Appreciate humor and straightforwardness. Often generous spenders once convinced. May need more product education (less familiar with some skincare categories).',
        'EASTERN EUROPEAN TOURISTS: Often big spenders in luxury categories. Strong responders to premium positioning. Appreciate exclusivity and status signaling. Direct and decisive when interested.',
        'ASIAN TOURISTS: Often highly educated about skincare ingredients and technology. Respect demonstrations and visible results. May be methodical in decision-making. Group dynamics matter — friends influence heavily.',
        'SOUTH AMERICAN TOURISTS: Warm, social, relationship-oriented. Respond to emotional connection and personal attention. Often generous gift-buyers. Family-oriented purchasing (buying for multiple people).'
      ]
    },
    {
            type: 'tip',
      text: 'The tax-haven pricing is your universal equalizer. Even budget-conscious tourists perk up when they realize they\'re getting a €500 product for €300. Lead with the Europe price, then deliver the Andorra advantage as a gift — not a discount.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Already Buying\' Signal'
    },
    {
            type: 'paragraph',
      text: 'This is one of the most powerful spending indicators: someone who is ALREADY in buying mode. When a tourist is carrying multiple shopping bags, they have:'
    },
    {
            type: 'bullets',
      items: [
        'Mental buying momentum: The decision to spend has already been made. Their wallet is open, their inhibitions are lowered.',
        'Budget flexibility: Someone who has already spent €500 today is more likely to spend €100 more than someone who hasn\'t spent anything.',
        'Trust in the location: They\'re already committed to shopping in Andorra. Your shop is just another stop on their buying journey.',
        'Time investment: They\'ve dedicated time to shopping. Stopping for a 5-minute demo fits their current activity.'
      ]
    },
    {
            type: 'script',
      text: '\'I see you\'ve been shopping! You clearly know how to find the best spots in Andorra. Let me show you something that most tourists don\'t know about — it\'s my favorite hidden gem here.\' This connects their existing buying behavior to your offer.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When Signals Contradict'
    },
    {
            type: 'paragraph',
      text: 'Sometimes spending signals conflict. A person in budget clothing wearing an expensive watch. Someone with designer shoes but no shopping bags. These contradictions require deeper reading:'
    },
    {
            type: 'bullets',
      items: [
        'EXPENSIVE WATCH + BUDGET CLOTHES: Often a successful person who doesn\'t care about fashion but values one signature piece. Pitch based on product RESULTS, not luxury status.',
        'DESIGNER EVERYTHING BUT NO SHOPPING BAGS: Could be window-shopping without buying, OR just starting their day. Time your approach carefully.',
        'BUDGET SIGNALS BUT CONFIDENT DEMEANOR: Sometimes the wealthiest people dress simply. If their energy is confident and open, pitch normally. Let the demo do the work.',
        'ALL SIGNALS POINT TO WEALTH BUT THEY\'RE HESITANT: Wealthy people can also be cautious or comparison shoppers. Don\'t pressure. Build trust through expertise.'
      ]
    },
    {
            type: 'tip',
      text: 'When in doubt, lead with the syringe (flagship). If they recoil at the €300 price point, you can always descale to the peeling or scrub. It\'s harder to upgrade someone who started at €30 than to descale someone who started at €300.'
    },
    {
            type: 'quote',
      text: 'Reading spending power isn\'t about judging worth. It\'s about matching the right offer to the right person at the right time. Everyone deserves your best service — but not everyone needs your most expensive product.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What is generally considered the #1 indicator of spending power?',
      options: [
        'Handbag brand',
        'Shoe quality',
        'Watch quality',
        'Clothing brand logos'
      ],
      correctIndex: 2,
      explanation: 'Watch quality is typically the most reliable indicator of spending power because watches are worn for function AND status, and luxury watches are expensive enough to separate serious wealth from average income.',
    },
    {
      question: 'Why is the \'already buying\' signal so powerful?',
      options: [
        'It means they\'re rich',
        'They\'re in buying mode with mental momentum, budget flexibility, and trust in the location',
        'They have no budget limit',
        'They\'ll buy anything'
      ],
      correctIndex: 1,
      explanation: 'Someone already carrying shopping bags has buying momentum, budget flexibility, trust in the location, and has dedicated time to shopping. Their wallet is already metaphorically open.',
    },
    {
      question: 'What should you do when spending signals contradict each other?',
      options: [
        'Always trust the most expensive signal',
        'Always assume they have no money',
        'Read deeper — contradictions often reveal personality type and priorities',
        'Ignore the signals and pitch the cheapest product'
      ],
      correctIndex: 2,
      explanation: 'Contradictory signals require deeper reading. An expensive watch with budget clothing might mean someone who values specific quality over fashion. Read their energy and demeanor alongside material signals.',
    }
    ],
  },
  'connect-3': {
    id: 'connect-3',
    categoryId: 'connecting',
    title: 'Cultural Intelligence',
    subtitle: 'Selling to Spanish, French, British, and Eastern European tourists — key differences and phrases',
    duration: '10 min',
    icon: 'Globe',
    order: 3,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Every Culture Buys Differently. Know the Difference.'
    },
    {
            type: 'paragraph',
      text: 'Andorra is a crossroads — Spanish, French, British, Eastern European, and Asian tourists all converge on the same street. Selling the same product to a Frenchwoman from Paris requires a different approach than selling to a British family or a solo Spanish shopper. Cultural intelligence isn\'t stereotyping — it\'s understanding how cultural background shapes communication style, decision-making, and buying psychology.'
    },
    {
            type: 'keypoint',
      text: 'A technique that closes a Spanish customer might repel a French one. Humor that charms a British tourist might confuse an Eastern European. Adapt your approach to the person in front of you.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Spanish Tourists: Warmth, Energy, and Value'
    },
    {
            type: 'paragraph',
      text: 'Spanish tourists often arrive in groups — families, couples, friends. They\'re typically shopping-oriented, respond well to high energy, and appreciate genuine warmth. The tax-haven angle resonates strongly because Spanish VAT is high.'
    },
    {
            type: 'bullets',
      items: [
        'COMMUNICATION STYLE: Warm, expressive, relationship-oriented. They appreciate personal connection before business. Ask about their trip, their day, their plans.',
        'DECISION-MAKING: Often consensus-based (especially in groups). The group dynamic matters — get everyone involved.',
        'PRICE SENSITIVITY: Value-conscious but will spend for quality. The tax-haven savings narrative works brilliantly — frame it as \'smart shopping.\'',
        'KEY PHRASES: \'Hola!\' (always greet warmly), \'Ahorras mucho aquí en Andorra\' (You save a lot here in Andorra), \'Es de muy buena calidad\' (It\'s very good quality), \'Regalo perfecto\' (Perfect gift).',
        'APPROACH: High energy, warm smile, personal questions. Show enthusiasm. Spanish customers often mirror your energy — bring it.'
      ]
    },
    {
            type: 'script',
      text: '\'Hola! ¿Qué tal vuestro día en Andorra? Me encanta tu bolso — claramente sabes encontrar las mejores tiendas. Déjame enseñarte algo que la mayoría de turistas no conocen. Es mi producto favorito aquí.\' (Hello! How\'s your day in Andorra? I love your bag — you clearly know how to find the best shops. Let me show you something most tourists don\'t know about. It\'s my favorite product here.)'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'French Tourists: Sophistication, Knowledge, and Subtlety'
    },
    {
            type: 'paragraph',
      text: 'French culture has deep skincare knowledge. French customers often know about ingredients, brands, and beauty science. They appreciate quality demonstrations but can be skeptical of hype. Subtlety works better than high-pressure energy.'
    },
    {
            type: 'bullets',
      items: [
        'COMMUNICATION STYLE: Measured, thoughtful, appreciate expertise. Show product knowledge. Don\'t oversell — let the product speak.',
        'DECISION-MAKING: Individual or couple-based. They think before deciding. Give them space to consider. Pressure backfires.',
        'PRICE SENSITIVITY: Quality over price. A French customer will pay €300 for something that works vs. €50 for something cheap. Frame it as investment, not discount.',
        'KEY PHRASES: \'Bonjour!\' (essential greeting), \'C\'est un produit exceptionnel\' (It\'s an exceptional product), \'Résultats immédiats\' (Immediate results), \'Sans parabènes, sans chimie\' (Without parabens, without chemicals).',
        'APPROACH: Professional, knowledgeable, respectful. Demonstrate the product with confidence. Answer technical questions well. Give them time to decide.'
      ]
    },
    {
            type: 'script',
      text: '\'Bonjour! Vous connaissez les produits de la Mer Morte? C\'est exceptionnel — les minéraux sont les plus concentrés au monde. Regardez ce résultat, c\'est immédiat.\' (Hello! Do you know Dead Sea products? It\'s exceptional — the minerals are the most concentrated in the world. Look at this result, it\'s immediate.)'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'British Tourists: Directness, Humor, and Straight Talk'
    },
    {
            type: 'paragraph',
      text: 'British tourists generally appreciate directness, humor, and no-nonsense communication. They can be skeptical of \'sales talk\' and respond well to someone who feels genuine rather than performative. Self-deprecating humor works brilliantly.'
    },
    {
            type: 'bullets',
      items: [
        'COMMUNICATION STYLE: Direct, humorous, appreciates authenticity. Don\'t be too \'salesy.\' Be a real person having a real conversation.',
        'DECISION-MAKING: Usually couple-based. The partner\'s opinion matters heavily. Involve them with humor and direct questions.',
        'PRICE SENSITIVITY: Reasonably price-aware but responsive to genuine value. The tax-haven angle works well. They love a \'bargain\' but hate feeling \'sold to.\'',
        'APPROACH: Friendly, slightly cheeky, direct. \'I know you weren\'t planning to stop, but I promise this is worth two minutes of your time.\' British customers respect honesty and humor.'
      ]
    },
    {
            type: 'script',
      text: '\'I know, I know — you\'re thinking \'not another salesperson.\' But I promise you, this is actually worth stopping for. Two minutes, and if you don\'t love it, you can tell me I\'m terrible at my job. Fair deal?\' This disarms skepticism with humor and directness.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Eastern European Tourists: Exclusivity, Status, and Results'
    },
    {
            type: 'paragraph',
      text: 'Eastern European tourists often respond to premium positioning, exclusivity, and visible results. They\'re typically decisive buyers — when interested, they move fast. They appreciate being treated as VIPs.'
    },
    {
            type: 'bullets',
      items: [
        'COMMUNICATION STYLE: Direct, relationship-oriented, appreciate status and exclusivity. Frame the product as premium and exclusive.',
        'DECISION-MAKING: Often individual or with a trusted companion. Once convinced, they decide quickly. Don\'t slow them down with too many options.',
        'PRICE SENSITIVITY: Less price-sensitive when the value is clear. Premium framing actually INCREASES appeal. They want the BEST.',
        'APPROACH: Confident, premium, results-focused. Show the demo. Let the result speak. Frame it as the #1 product, the flagship, the best-seller.'
      ]
    },
    {
            type: 'script',
      text: '\'This is our number one product across all of Europe. Everyone who tries it is shocked by the result. Here, look in the mirror — you see the difference? That\'s after two minutes. Imagine after one month.\' Results-driven, premium-framed, confident delivery.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Personal Space and Touch: Cultural Differences'
    },
    {
            type: 'paragraph',
      text: 'Physical proximity and touch are interpreted differently across cultures:'
    },
    {
            type: 'bullets',
      items: [
        'SOUTHERN EUROPEANS (Spanish, Italian, Portuguese): Generally comfortable with closer proximity and light touch (shoulder, hand). Warm, expressive gestures are welcome.',
        'NORTHERN EUROPEANS (British, German, Scandinavian): Prefer more personal space. Touch should be minimal and only after rapport is established. Respect their bubble.',
        'FRENCH: Moderate personal space. Appreciate elegance and grace in movement. Touch is acceptable during the demo but keep it professional.',
        'EASTERN EUROPEANS: Generally comfortable with warmth and proximity once rapport is established. Build trust first, then be warm.'
      ]
    },
    {
            type: 'tip',
      text: 'When uncertain about someone\'s cultural background, start with moderate distance and minimal touch. If they lean in, move closer. If they stay back, respect their space. Let THEM close the distance.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Language Tips: Key Phrases That Open Doors'
    },
    {
            type: 'paragraph',
      text: 'Even a few words in someone\'s native language creates instant connection. It shows respect and effort. Here are essential phrases:'
    },
    {
            type: 'bullets',
      items: [
        'SPANISH: \'Hola\' (Hello), \'¿Cómo estás?\' (How are you?), \'Mira\' (Look), \'Increíble\' (Incredible), \'Regalo\' (Gift), \'Precio especial\' (Special price), \'Para ti\' (For you), \'Gracias\' (Thank you)',
        'FRENCH: \'Bonjour\' (Hello), \'Regardez\' (Look), \'Incroyable\' (Incredible), \'Résultat immédiat\' (Immediate result), \'Cadeau\' (Gift), \'Prix spécial\' (Special price), \'Merci\' (Thank you)',
        'ENGLISH: You\'re likely already fluent, but British-specific phrases help: \'Brilliant,\' \'Lovely,\' \'Absolutely,\' \'Cheers\' — mirror their vocabulary.',
        'RUSSIAN (common in Andorra): \'Zdravstvuyte\' (Hello), \'Smotrite\' (Look), \'Potryasayushche\' (Amazing) — even attempting a greeting creates goodwill.'
      ]
    },
    {
            type: 'quote',
      text: 'Language is the road map of a culture. It tells you where its people come from and where they are going. Speaking even a few words in someone\'s language is a sign of respect that opens wallets.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'Which approach works best with French tourists?',
      options: [
        'High energy and lots of enthusiasm',
        'Professional expertise with product knowledge and space to decide',
        'Self-deprecating humor and cheekiness',
        'Exclusivity and VIP treatment'
      ],
      correctIndex: 1,
      explanation: 'French tourists appreciate expertise, product knowledge, and space to consider. They\'re often knowledgeable about skincare and respond to substance over hype. Pressure backfires.',
    },
    {
      question: 'Why does the tax-haven savings narrative work especially well with Spanish tourists?',
      options: [
        'They don\'t care about quality',
        'Spanish VAT is high, so the savings feel significant and smart',
        'They only buy cheap products',
        'They don\'t understand luxury pricing'
      ],
      correctIndex: 1,
      explanation: 'Spanish VAT is relatively high, so the tax-haven savings feel significant. Spanish tourists respond well to value framing — \'smart shopping\' in Andorra.',
    },
    {
      question: 'What should you do when uncertain about someone\'s cultural background?',
      options: [
        'Guess based on appearance',
        'Start with moderate distance and minimal touch, letting them close the gap',
        'Ask directly where they\'re from',
        'Use the same approach for everyone'
      ],
      correctIndex: 1,
      explanation: 'When uncertain, start with moderate distance and minimal touch. Watch their body language — if they lean in, you can move closer. Let them set the proximity comfort level.',
    }
    ],
  },
  'connect-4': {
    id: 'connect-4',
    categoryId: 'connecting',
    title: 'The Partner Dynamic',
    subtitle: 'How to read couples, engage the skeptical partner, and close together',
    duration: '8 min',
    icon: 'Users',
    order: 4,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Couples Close at Twice the Rate — If You Know How to Work Them'
    },
    {
            type: 'paragraph',
      text: 'A solo shopper makes decisions alone. A couple makes decisions together — and that dynamic is either your greatest asset or your biggest obstacle. When you engage both partners skillfully, they validate each other\'s buying decision. When you ignore one partner, they become a silent veto. Couples who both feel included close at nearly double the rate of solo shoppers.'
    },
    {
            type: 'keypoint',
      text: 'The golden rule: never make one partner feel irrelevant. The person standing quietly might be the one who ultimately decides. Bring them in. Make them feel seen. Their involvement is the key to the sale.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reading the Decision-Maker'
    },
    {
            type: 'paragraph',
      text: 'In most couples, one person drives the interaction while the other observes. But the driver isn\'t always the decision-maker. Watch for these signals:'
    },
    {
            type: 'bullets',
      items: [
        'THE DRIVER: Does most of the talking, asks questions, engages with you directly. They\'re interested and leading the exploration. Often the one who will USE the product.',
        'THE DECISION-MAKER: May be quieter but their reactions carry more weight. Watch who the driver looks at after your pitch. If they seek eye contact with their partner before responding, the partner is the decision-maker.',
        'THE INFLUENCER: Sometimes there\'s a third dynamic — one person uses the product, but a third person (friend, adult child) influences the decision. Read the group\'s attention patterns.'
      ]
    },
    {
            type: 'tip',
      text: 'A classic tell: after you present the offer, the interested partner looks at the other and says \'What do you think?\' That\'s the moment of truth. How the partner responds determines the sale. Prepare for that moment.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Engaging the Skeptical Partner'
    },
    {
            type: 'paragraph',
      text: 'The skeptical partner is often a man watching his female partner\'s interaction. He may seem bored, suspicious, or protective. Your job is to transform him from potential veto into active supporter. Here\'s how:'
    },
    {
            type: 'numbered',
      items: [
        'INCLUDE HIM EARLY: Don\'t wait until the close. From the moment they\'re inside, make eye contact with him. Ask his opinion. \'Sir, you see what I mean about the eye area? You know how she sometimes says she looks tired even after sleeping well?\' This makes him an expert on HIS partner, not just an observer of your sale.',
        'APPEAL TO HIS LOGIC: Men often respond to practical benefits. \'This lasts a whole year — one syringe, 52 treatments. That\'s less than €6 per week for this result.\' Logic defuses skepticism.',
        'MAKE HIM THE HERO: Frame the purchase as something HE can give her. \'Imagine her waking up every morning looking this fresh — and she\'ll know it\'s because of you.\' Men love being the source of their partner\'s happiness.',
        'HUMOR DISARMS: A light joke directed at him breaks tension. \'Sir, don\'t worry — we\'re not changing her face, just making her eyes look like she slept twelve hours.\' Humor makes him smile, and a smiling man doesn\'t veto.'
      ]
    },
    {
            type: 'script',
      text: '\'Sir, be honest — do you see the difference? Look at the lift, the smoothness. You\'re going home with a younger version of your wife!\' This makes him an active evaluator (his opinion matters) while framing the result as something he benefits from too.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Body Language Between Couples'
    },
    {
            type: 'paragraph',
      text: 'Couples communicate through body language constantly. Learn to read these signals:'
    },
    {
            type: 'bullets',
      items: [
        'POSITIVE SIGNALS: Standing close together, making eye contact with each other while you talk, one touching the other lightly while considering, both leaning in during the demo, shared smiles or laughter. These couples are likely to buy.',
        'NEGATIVE SIGNALS: Standing apart, crossed arms (especially the partner), checking phone while you talk, one person walking away to look at other products, eye-rolling, sighing. These are vetos in progress.',
        'MIXED SIGNALS: She\'s interested but he\'s checking his watch. She\'s asking questions but he\'s stepping back. This requires immediate intervention — engage the skeptical partner NOW before they veto.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Handling Different Couple Types'
    },
    {
            type: 'bullets',
      items: [
        'THE ENTHUSIASTIC COUPLE: Both are interested, both ask questions. Easy mode — deliver your best pitch, give them space to discuss, and close naturally.',
        'THE INTERESTED WOMAN + RELUCTANT MAN: Common scenario. Your mission: convert him. Use logic, humor, and make him feel included. Don\'t let him feel like a wallet.',
        'THE INTERESTED MAN + OBSERVING WOMAN: Less common but happens. Men buying for their partners can be decisive. Make sure SHE likes it by involving her in the demo directly.',
        'THE FRIEND COUPLE: Two friends traveling together. Friend dynamics are social and fun. Group energy works — involve both, create a shared experience, suggest they both try it.'
      ]
    },
    {
            type: 'tip',
      text: 'When a couple is deciding, GIVE THEM SPACE. Step back after presenting the offer. Say \'Take your time, I\'ll be right here.\' Hovering creates pressure. Space creates comfort. The conversation they have in that 30-second gap often seals the deal — one convinces the other.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Gift\' Angle for Couples'
    },
    {
            type: 'paragraph',
      text: 'Couples are primed for gift purchases. Even when shopping for themselves, they often frame purchases as gifts to each other:'
    },
    {
            type: 'script',
      text: '\'This would make an incredible Christmas gift for her — but honestly? Use it together. The Scrub and Body Butter work for men too. Make it a couples\' spa night at home.\' This transforms a single purchase into a shared experience and removes the \'selfish purchase\' barrier.'
    },
    {
            type: 'quote',
      text: 'The couple isn\'t two individual sales. It\'s one sale with two gatekeepers. Unlock both, and the sale opens.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'How can you identify who the actual decision-maker is in a couple?',
      options: [
        'The person who talks the most is always the decision-maker',
        'Watch who the driver looks at after your pitch — if they seek eye contact, that person decides',
        'The man always decides',
        'The person who walks into the shop first decides'
      ],
      correctIndex: 1,
      explanation: 'The person doing most of the talking (the driver) often seeks eye contact with their partner after your pitch. If they look to their partner and ask \'What do you think?\' — that partner is the decision-maker.',
    },
    {
      question: 'What is the best way to engage a skeptical male partner?',
      options: [
        'Ignore him and focus entirely on the woman',
        'Include him early, appeal to logic, make him feel like his opinion matters',
        'Tell him the price first to see if he can afford it',
        'Make him feel guilty for not buying'
      ],
      correctIndex: 1,
      explanation: 'Engage the skeptical partner early, appeal to his logic with practical benefits, and make him feel like his opinion matters. Transform him from potential veto into active supporter.',
    },
    {
      question: 'Why is giving a couple space after presenting the offer important?',
      options: [
        'It shows you don\'t care about the sale',
        'It lets them have a private conversation where one often convinces the other',
        'It gives you time to approach other customers',
        'Couples never buy immediately'
      ],
      correctIndex: 1,
      explanation: 'After presenting the offer, stepping back lets the couple have a private conversation. Often one partner convinces the other during that 30-second gap. Hovering creates pressure that kills this natural persuasion process.',
    }
    ],
  },
  'connect-5': {
    id: 'connect-5',
    categoryId: 'connecting',
    title: 'Building Instant Rapport',
    subtitle: '10 specific techniques to connect with anyone in 60 seconds',
    duration: '10 min',
    icon: 'MessageCircle',
    order: 5,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Rapport Is the Bridge Between Stranger and Customer'
    },
    {
            type: 'paragraph',
      text: 'Rapport is that magical moment when a stranger shifts from \'Who is this person talking to me?\' to \'I like this person, I\'ll hear them out.\' It happens fast — within 30 to 60 seconds — and once established, it transforms the entire interaction. Without rapport, you\'re a salesperson. With rapport, you\'re a friendly expert they trust.'
    },
    {
            type: 'keypoint',
      text: 'Rapport isn\'t one technique — it\'s a combination of signals that tell the customer\'s brain: \'This person is safe. This person is like me. This person cares.\' Stack multiple rapport techniques for maximum effect.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Technique 1: Mirroring'
    },
    {
            type: 'paragraph',
      text: 'Mirroring is subtly matching the customer\'s body language, speech pace, energy level, and vocabulary. When done naturally (not mimicry), it creates subconscious similarity. The customer\'s brain registers: \'This person is like me.\''
    },
    {
            type: 'bullets',
      items: [
        'BODY LANGUAGE: If they stand with hands in pockets, relax your arms. If they lean in during the demo, lean in too. Match their posture generally.',
        'SPEECH PACE: Fast talker? Speed up slightly. Slow, measured speaker? Slow down. Matching pace creates conversational harmony.',
        'ENERGY LEVEL: Enthusiastic customer? Match their enthusiasm. Reserved customer? Warm but calm. Energy mismatch creates discomfort.',
        'VOCABULARY: If they say \'cream,\' say \'cream.\' If they say \'moisturizer,\' say \'moisturizer.\' Using their words shows you listen.'
      ]
    },
    {
            type: 'tip',
      text: 'Mirroring should feel natural, not obvious. Wait 2-3 seconds after they change posture, then shift yours. If they notice you\'re copying them, it backfires completely. Subtlety is everything.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Technique 2: Name Usage'
    },
    {
            type: 'paragraph',
      text: 'A person\'s name is the sweetest sound in any language. When you learn their name, use it naturally 2-3 times during the interaction. Not excessively — that feels manipulative — but enough to create personal connection.'
    },
    {
            type: 'script',
      text: '\'Maria, come look in the mirror — you won\'t believe what you see.\' \'So Maria, which option feels better for you?\' \'It was wonderful meeting you, Maria. Enjoy Andorra!\' Three uses: one during the experience, one during the close, one at goodbye. Perfect.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Technique 3: Genuine Compliments'
    },
    {
            type: 'paragraph',
      text: 'Compliments work when they\'re SPECIFIC and GENUINE. Generic compliments (\'You\'re beautiful\') feel fake. Specific compliments (\'That emerald scarf brings out your eyes perfectly\') feel observant and real.'
    },
    {
            type: 'bullets',
      items: [
        'COMPLIMENT CHOICES: Accessories (scarf, watch, bag), grooming (hair, nails, skin), style (color coordination, unique piece), energy (warm smile, confident walk)',
        'AVOID: Physical compliments that could feel inappropriate (body, weight, age-related). Keep it to choices they\'ve MADE, not attributes they were born with.',
        'DELIVERY: Make eye contact, smile, say it warmly, then move on. Don\'t linger on the compliment — that creates awkwardness.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Technique 4: Finding Common Ground'
    },
    {
            type: 'paragraph',
      text: 'Shared experiences create instant connection. Travelers in Andorra have common ground waiting to be discovered:'
    },
    {
            type: 'bullets',
      items: [
        'THE LOCATION: \'Is this your first time in Andorra? I love it here — the mountains are incredible.\'',
        'THE WEATHER: \'Beautiful day for shopping! Better than yesterday\'s rain, right?\'',
        'SHARED ORIGINS: \'Oh, you\'re from Madrid? I have family there!\' Even distant connections create bonds.',
        'THE EXPERIENCE: \'Everyone who tries this is shocked — you\'re going to have the same reaction.\' Shared anticipation of the demo result.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Technique 5: Humor'
    },
    {
            type: 'paragraph',
      text: 'Humor breaks tension, creates positive emotion, and makes you memorable. The key is LIGHT humor — nothing edgy, political, or potentially offensive. Self-deprecating humor is safest and most disarming.'
    },
    {
            type: 'script',
      text: '\'I promise this is worth two minutes of your time. If you don\'t love it, you can tell me I\'m terrible at my job.\' \'Promise not to scream when you see this result — my last customer actually did, and her husband got jealous.\' Humor makes people smile, and smiling people buy.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Techniques 6-10: Advanced Rapport Builders'
    },
    {
            type: 'bullets',
      items: [
        '6. VULNERABILITY: Brief, genuine honesty creates deep trust. \'When I first started, I didn\'t believe the hype either. Then I tried it myself and became obsessed.\' This shows you\'re a real person, not a sales robot.',
        '7. CURIOSITY: Ask questions that show genuine interest in THEM, not just their wallet. \'What do you usually use on your skin? You clearly take care of yourself.\' People love talking about themselves.',
        '8. AGREEMENT FRAMES: Start with something they can\'t disagree with. \'Andorra is beautiful, isn\'t it?\' \'You clearly have great taste.\' \'Taking care of your skin is important.\' Each agreement creates momentum toward the sale.',
        '9. STORYTELLING: Share a 30-second story about another customer. \'A woman came in yesterday saying she\'d think about it. She came back an hour later and bought two for her sisters.\' Stories bypass skepticism and go straight to imagination.',
        '10. APPROPRIATE TOUCH: A light hand on the forearm during a key moment, or guiding their hand during the demo. Only when rapport is established and culturally appropriate. Touch accelerates trust when done right, destroys it when done wrong.'
      ]
    },
    {
            type: 'tip',
      text: 'Rapport is not a script — it\'s a state of being. The most powerful rapport tool is genuine LIKING. Actually care about the person in front of you. Be curious about their life. When your interest is real, everything else falls into place.'
    },
    {
            type: 'quote',
      text: 'People don\'t care how much you know until they know how much you care. Rapport is the proof of caring.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What makes a compliment feel genuine rather than fake?',
      options: [
        'Using more elaborate words',
        'Being specific about something the person chose',
        'Complimenting their physical body',
        'Complimenting them multiple times rapidly'
      ],
      correctIndex: 1,
      explanation: 'Specific compliments about choices people make (accessories, style, grooming) feel observant and real. Generic or physical compliments often feel fake or inappropriate.',
    },
    {
      question: 'How should mirroring be done to avoid detection?',
      options: [
        'Copy their movements immediately and exactly',
        'Wait 2-3 seconds after they shift, then adjust your posture subtly',
        'Mirror only their speech, not body language',
        'Tell them you\'re mirroring to build rapport'
      ],
      correctIndex: 1,
      explanation: 'Mirroring should be delayed by 2-3 seconds and done subtly. Immediate, exact copying feels like mimicry and backfires. Natural, delayed matching creates subconscious similarity.',
    },
    {
      question: 'Which type of humor is safest and most disarming in sales?',
      options: [
        'Political humor',
        'Self-deprecating humor',
        'Sarcasm about the customer',
        'Edgy jokes'
      ],
      correctIndex: 1,
      explanation: 'Self-deprecating humor is safest because it shows confidence and vulnerability without risking offense. Political, sarcastic, or edgy humor can alienate customers.',
    }
    ],
  },
  'connect-6': {
    id: 'connect-6',
    categoryId: 'connecting',
    title: 'Asking Questions That Reveal Everything',
    subtitle: 'Open vs closed questions, the question ladder, and avoiding interrogation mode',
    duration: '8 min',
    icon: 'MessageCircle',
    order: 6,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Questions Are Your Intelligence-Gathering Tool'
    },
    {
            type: 'paragraph',
      text: 'The salesperson who asks the best questions learns the most. And the salesperson who learns the most sells the most. Questions reveal spending power, skin concerns, buying motivation, decision dynamics, and objections — all before you present the offer. Master question-asking and you\'ll never be surprised by a \'no.\''
    },
    {
            type: 'keypoint',
      text: 'Your goal with questions isn\'t interrogation — it\'s conversation. Questions should feel natural, flow with the chat, and make the customer feel understood, not interviewed.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Open vs. Closed Questions'
    },
    {
            type: 'comparison',
      left: { label: 'Closed Questions (Weak)', text: '\'Do you use cream?\' — Yes/No answer. Ends conversation. Reveals nothing. \'Do you like it?\' — \'It\'s nice.\' Dead end. \'Have you been to Andorra before?\' — \'Yes.\' Nothing to work with.' },
      right: { label: 'Open Questions (Powerful)', text: '\'What do you use on your skin?\' — Reveals routine, spending, and concerns. \'What do you think of the result?\' — Gets them talking about feelings. \'What brings you to Andorra?\' — Opens connection opportunities.' }
    },
    {
            type: 'tip',
      text: 'Start with open questions. Use closed questions only to confirm what you\'ve learned (\'So you use a night cream already — that\'s great\'). Open questions gather intelligence; closed questions confirm understanding.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Question Ladder: From Surface to Deep'
    },
    {
            type: 'paragraph',
      text: 'Don\'t start with personal questions. Build from light to deep, like climbing a ladder. Each level requires trust earned at the previous level.'
    },
    {
            type: 'numbered',
      items: [
        'LEVEL 1 — OBSERVATIONAL (0-30 seconds): \'I love your scarf — is that from a local designer?\' \'How\'s your day in Andorra going?\' Light, surface-level, easy to answer. Creates initial comfort.',
        'LEVEL 2 — CONTEXTUAL (30 seconds - 2 minutes): \'What brings you to Andorra?\' \'Are you here for skiing or shopping?\' \'What do you usually use on your skin?\' Slightly more personal but still easy. Reveals context.',
        'LEVEL 3 — PERSONAL (2-5 minutes): \'What are your main skin concerns?\' \'How much time do you spend on your skincare routine?\' \'When was the last time you really treated yourself?\' Requires some trust. Reveals motivation and concerns.',
        'LEVEL 4 — DECISION-ORIENTED (During the close): \'Which option feels better for you?\' \'What would make this perfect for you?\' \'If price weren\'t an issue, which would you choose?\' Reveals objections and buying signals.'
      ]
    },
    {
            type: 'tip',
      text: 'Never skip levels. Asking a Level 3 question (\'What are your main skin concerns?\') before establishing any rapport feels invasive. Climb the ladder naturally.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Questions That Make Them Feel Smart'
    },
    {
            type: 'paragraph',
      text: 'The best questions elevate the customer. They make the person feel knowledgeable, sophisticated, and perceptive. When someone feels smart, they\'re more confident — and confident buyers spend more.'
    },
    {
            type: 'bullets',
      items: [
        '\'You clearly take care of your skin — what products do you swear by?\' — Acknowledges their expertise while gathering data.',
        '\'I can tell you know quality — what do you look for in skincare?\' — Flatters their discernment.',
        '\'Most people don\'t know this, but the Dead Sea minerals are the most concentrated on Earth. Have you heard about them before?\' — Gives them a chance to show knowledge OR learn something impressive.',
        '\'You seem like someone who does their research. What have you heard about collagen treatments?\' — Positions them as informed and thoughtful.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Questions to Uncover Objections Early'
    },
    {
            type: 'paragraph',
      text: 'If you know the objection before you present the offer, you can address it proactively. These questions reveal hidden concerns:'
    },
    {
            type: 'bullets',
      items: [
        '\'When you buy skincare, what matters most to you — ingredients, results, or value?\' — Reveals their buying criteria.',
        '\'Are you shopping for yourself or looking for gifts too?\' — Reveals budget flexibility and motivation.',
        '\'What\'s your usual budget range for skincare treatments?\' — Direct but effective when asked warmly after rapport is built.',
        '\'Have you tried anything like this before? What was your experience?\' — Reveals past objections and expectations.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Avoiding Interrogation Mode'
    },
    {
            type: 'paragraph',
      text: 'Questions can backfire if they feel like an interview. Here\'s how to keep it conversational:'
    },
    {
            type: 'bullets',
      items: [
        'SHARE BETWEEN QUESTIONS: Don\'t ask three questions in a row. Share something about yourself or the product between each question. It should feel like a conversation, not a survey.',
        'USE STATEMENTS INSTEAD: Instead of \'Do you have dry skin?\' say \'The mountain air here can really dry out your skin.\' This invites them to respond without feeling questioned.',
        'FOLLOW THE THREAD: When they mention something interesting, follow it. Don\'t rigidly stick to your question list. If they mention their daughter, ask about her. That\'s where the real connection lives.',
        'KEEP IT LIGHT: Heavy, serious questioning creates pressure. Maintain a warm, playful tone throughout.'
      ]
    },
    {
            type: 'script',
      text: '\'So what brings you to Andorra?\' — \'Skiing with my husband.\' — \'Oh amazing! Which ski resort? I love the slopes here. And after a day of skiing, your skin must be so dry — the mountain air is brutal. What do you usually use to rehydrate?\' See how each question follows naturally from the last? That\'s conversational questioning.'
    },
    {
            type: 'quote',
      text: 'The best salespeople don\'t talk customers into buying. They ask customers into revealing what they truly want. Then they simply provide it.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What is the main difference between open and closed questions?',
      options: [
        'Open questions are longer',
        'Open questions invite detailed responses and reveal information; closed questions get yes/no answers',
        'Closed questions are more polite',
        'Open questions are only for experienced sellers'
      ],
      correctIndex: 1,
      explanation: 'Open questions (What, How, Why) invite detailed responses that reveal information. Closed questions (Do, Are, Have) get yes/no answers that end conversation.',
    },
    {
      question: 'What does the \'question ladder\' refer to?',
      options: [
        'Asking as many questions as possible',
        'Building from light surface questions to deeper personal ones as trust develops',
        'Only asking questions about the product',
        'A specific list of 10 questions every seller must ask'
      ],
      correctIndex: 1,
      explanation: 'The question ladder means starting with light observational questions, then moving to contextual, personal, and finally decision-oriented questions as trust builds. Skipping levels feels invasive.',
    },
    {
      question: 'How can you avoid \'interrogation mode\' when asking questions?',
      options: [
        'Only ask one question per interaction',
        'Share information between questions and follow conversational threads naturally',
        'Write all questions down and read them',
        'Avoid questions altogether'
      ],
      correctIndex: 1,
      explanation: 'Avoid interrogation by sharing between questions, following conversational threads (not rigid lists), using statements that invite response, and keeping the tone light and warm.',
    }
    ],
  },
  'connect-7': {
    id: 'connect-7',
    categoryId: 'connecting',
    title: 'Spotting Buying Signals',
    subtitle: 'Body language and verbal cues that scream \'I\'m ready to buy\'',
    duration: '8 min',
    icon: 'Target',
    order: 7,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'The Customer Is Always Telling You What They Want — If You\'re Listening'
    },
    {
            type: 'paragraph',
      text: 'The biggest mistake in sales is talking past the buying signal. The customer leans in, touches the product, asks about price — and the salesperson keeps pitching instead of closing. Buying signals are the green lights of sales. They tell you the customer is ready. Your job is to see them and act.'
    },
    {
            type: 'keypoint',
      text: 'Buying signals happen before the customer verbally commits. If you wait for them to say \'I\'ll take it,\' you\'ve waited too long. Close when you SEE the signal, not when you HEAR the decision.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Physical Buying Signals'
    },
    {
            type: 'paragraph',
      text: 'The body reveals the decision before the mouth does. Watch for these physical cues:'
    },
    {
            type: 'bullets',
      items: [
        'LEANING IN: When a customer physically moves closer to you, the product, or the mirror, they\'re interested. Leaning back or stepping away means resistance. Leaning in means engagement.',
        'TOUCHING THE FACE: Touching cheeks, chin, or under the eyes while looking at the product or mirror = they\'re imagining themselves using it. This is one of the strongest positive signals.',
        'HOLDING THE PRODUCT: If they pick up the bottle, read the label, or turn it over in their hands, they\'re taking ownership mentally. Encourage this — let them hold it.',
        'MIRROR CHECKING: Looking at themselves in the mirror repeatedly during or after the demo is a strong buying signal. They like what they see and are imagining the result.',
        'RELAXED SHOULDERS: Tense shoulders signal hesitation. When shoulders drop and relax, resistance is dropping too.',
        'OPEN PALMS: Showing open palms while discussing the product indicates openness and receptivity. Closed fists or crossed arms signal the opposite.',
        'NODDING: Nodding while you speak (especially during the offer) indicates agreement. Multiple nods = building commitment.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Verbal Buying Signals'
    },
    {
            type: 'paragraph',
      text: 'Words are data. These phrases almost always indicate buying intent:'
    },
    {
            type: 'bullets',
      items: [
        '\'HOW LONG DOES IT LAST?\' — They\'re calculating value per use. This is a value-oriented buyer calculating ROI.',
        '\'DO YOU SHIP?\' — They\'re imagining owning it but worried about logistics. Solve the logistics, close the sale.',
        '\'HOW OFTEN DO I USE IT?\' — They\'re fitting it into their lifestyle. Mental ownership has begun.',
        '\'WHAT DO YOU THINK?\' (to partner) — They\'re seeking validation for a decision they\'ve already made. Engage the partner positively.',
        '\'CAN I GET THIS IN...?\' — They\'re personalizing the purchase. Color, size, scent — doesn\'t matter. Personalization = commitment.',
        '\'IS THIS THE LAST ONE?\' — Scarcity concern means they want it. Create gentle urgency.',
        '\'WHAT\'S THE RETURN POLICY?\' — Risk management. They\'re close but need a safety net.',
        '\'DO YOU HAVE A CARD?\' — This is as close to \'I\'ll take it\' as you can get without hearing the words. Close immediately.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Micro-Signals: Blink-and-You-Miss-Them'
    },
    {
            type: 'paragraph',
      text: 'These happen in fractions of a second. Train yourself to notice:'
    },
    {
            type: 'bullets',
      items: [
        'EYEBROW FLASH: A quick raise of both eyebrows when you mention a benefit or show the result. Surprise and interest. Follow up immediately.',
        'PUPIL DILATION: When people see something they want, their pupils dilate. Hard to spot but reliable.',
        'LIP PRESS: Pressing lips together while considering = internal deliberation. Stay quiet and let them think.',
        'BREATH HOLD + RELEASE: Holding breath during the price reveal, then releasing = relief. They can afford it.',
        'QUICK GLANCE AT WALLET/BAG: Checking if they have payment ready. Almost always a buying signal.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When to Close: Timing Is Everything'
    },
    {
            type: 'paragraph',
      text: 'Closing too early feels pushy. Closing too late loses momentum. The sweet spot is the SECOND buying signal. Here\'s why:'
    },
    {
            type: 'numbered',
      items: [
        'FIRST SIGNAL: \'Interesting.\' They lean in. Good, but not enough. Keep building value.',
        'SECOND SIGNAL: They touch the product and ask \'How long does it last?\' NOW. This is your moment. The second signal confirms genuine interest, not just politeness.',
        'THIRD SIGNAL: They\'re asking about payment or shipping. If you haven\'t closed by now, close immediately — every word past this point risks the sale.'
      ]
    },
    {
            type: 'script',
      text: 'Customer: \'How long does one syringe last?\' (Buying signal!) You: \'A full year of treatments — 52 weeks. That\'s less than €6 per week for this result. Shall I set one aside for you?\' Direct close. Don\'t oversell past this point.'
    },
    {
            type: 'tip',
      text: 'When you spot a buying signal, STOP TALKING ABOUT FEATURES. Switch to closing mode. Summarize the value, present the options, and ask for the decision. Every additional feature you mention past the buying signal creates new objections.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'False Signals: When Interest Isn\'t Buying Intent'
    },
    {
            type: 'paragraph',
      text: 'Not every positive signal means a sale is imminent. Learn to distinguish genuine buying signals from polite interest:'
    },
    {
            type: 'comparison',
      left: { label: 'Genuine Buying Signal', text: 'They ask specific questions about usage, logistics, or value. Their questions are about OWNING the product. They\'re problem-solving for purchase.' },
      right: { label: 'Polite Interest (Not Ready)', text: 'They say \'It\'s nice\' or \'I\'ll think about it.\' Their questions are general. No specifics about owning. They\'re being polite, not buying.' }
    },
    {
            type: 'quote',
      text: 'The moment you see the buying signal, your job changes from convincing to facilitating. Make it easy for them to say yes.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'When is the optimal time to close based on buying signals?',
      options: [
        'After the first positive signal',
        'After the second buying signal confirms genuine interest',
        'Only after they explicitly say they want to buy',
        'After you\'ve listed all product features'
      ],
      correctIndex: 1,
      explanation: 'The second buying signal is the sweet spot. The first signal could be politeness; the second confirms genuine interest. Closing after the third signal may be too late.',
    },
    {
      question: 'Which of these is a strong PHYSICAL buying signal?',
      options: [
        'Checking their phone',
        'Touching their face while looking at the product',
        'Crossing their arms',
        'Stepping backward'
      ],
      correctIndex: 1,
      explanation: 'Touching the face (cheeks, chin, under eyes) while looking at the product means they\'re imagining themselves using it. This is one of the strongest positive buying signals.',
    },
    {
      question: 'What should you do when you spot a buying signal?',
      options: [
        'Keep listing more product features',
        'Switch to closing mode and stop adding new information',
        'Lower the price immediately',
        'Ask if they\'re ready to buy in a pushy way'
      ],
      correctIndex: 1,
      explanation: 'When you spot a buying signal, switch from convincing to closing. Summarize value, present options, and ask for the decision. Every new feature you mention creates potential objections.',
    }
    ],
  },
  'connect-8': {
    id: 'connect-8',
    categoryId: 'connecting',
    title: 'Handling Different Personality Types',
    subtitle: 'The 4 buyer types: Analytical, Driver, Amiable, and Expressive',
    duration: '10 min',
    icon: 'Users',
    order: 8,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'One Pitch Does NOT Fit All'
    },
    {
            type: 'paragraph',
      text: 'You\'ve probably noticed that some customers want every detail while others just want the bottom line. Some need to feel emotionally connected; others want facts and data. These differences aren\'t random — they\'re personality types. Understanding the four buyer types transforms your approach from guessing to precision.'
    },
    {
            type: 'keypoint',
      text: 'The four buyer types — Analytical, Driver, Amiable, and Expressive — each require a different sales approach. Using the wrong style with the wrong type is like speaking French to a German speaker. Adapt and close.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Type 1: The Analytical (Facts First)'
    },
    {
            type: 'paragraph',
      text: 'The Analytical buyer is methodical, detail-oriented, and risk-averse. They want to understand HOW the product works before they commit. They\'ll ask about ingredients, research, and proof. They\'re not being difficult — they\'re being thorough.'
    },
    {
            type: 'bullets',
      items: [
        'IDENTIFYING THEM: Asks specific questions about ingredients, science, or proof. Reads labels. Takes time to consider. May seem skeptical but is actually just processing.',
        'YOUR APPROACH: Lead with facts and evidence. \'This is recommended by dermatologists.\' \'The Dead Sea has the highest mineral concentration on Earth.\' \'One syringe lasts 52 treatments — here is the math.\'',
        'WHAT TO AVOID: High-pressure tactics, emotional appeals, rushing them. They need time. Pressure creates resistance, not commitment.',
        'CLOSING TECHNIQUE: Give them space to decide. \'I know you want to think this through. Here is my WhatsApp — if you have any questions later, just ask.\' Respect their process.'
      ]
    },
    {
            type: 'script',
      text: '\'I completely understand wanting the details. The active ingredient is Dead Sea mineral salt, which contains 21 minerals including magnesium, calcium, and potassium. These are clinically shown to improve skin barrier function. One jar gives you 8-12 months of weekly treatments. The math works out to about €2 per use. Does that help with your decision?\' Facts, structure, respect.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Type 2: The Driver (Results Fast)'
    },
    {
            type: 'paragraph',
      text: 'The Driver is goal-oriented, time-pressed, and decisive. They don\'t want small talk. They want to know what it does, what it costs, and whether it works. Waste their time and they are gone.'
    },
    {
            type: 'bullets',
      items: [
        'IDENTIFYING THEM: Walks with purpose. Checks their watch. Gives direct answers. May seem abrupt — they are not rude, they are efficient.',
        'YOUR APPROACH: Fast, direct, results-focused. Skip the long rapport-building. Get to the demo and the result quickly. \'Two minutes, visible result, lasts a year.\'',
        'WHAT TO AVOID: Excessive chatting, too many options, slow pacing. Drivers want to make a decision and move on. Respect their time.',
        'CLOSING TECHNIQUE: Binary choice, quick close. \'Option 1: €210 with a gift. Option 2: €300 with two syringes. Which works for you?\' Clean and decisive.'
      ]
    },
    {
            type: 'script',
      text: '\'I know you are in a hurry. Two minutes. One eye. You will see the result yourself in the mirror. If you don\'t love it, no problem. If you do, I have two price options that take 30 seconds to explain. Sound fair?\' Direct, time-bound, respectful of their schedule.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Type 3: The Amiable (Feel Good)'
    },
    {
            type: 'paragraph',
      text: 'The Amiable buyer is warm, people-oriented, and relationship-driven. They want to trust you before they buy from you. They make decisions based on how the purchase FEELS, not just the product specs.'
    },
    {
            type: 'bullets',
      items: [
        'IDENTIFYING THEM: Friendly, asks personal questions, engages in chat, makes eye contact, smiles easily. Takes their partner\'s opinion seriously. Often the most fun to work with.',
        'YOUR APPROACH: Build genuine rapport first. Share stories. Make them feel special. Emotional connection is the gateway to the sale. The demo should feel like an experience, not a transaction.',
        'WHAT TO AVOID: Cold facts, aggressive closing, making them feel rushed. Amiable buyers need warmth and connection. Pressure feels like betrayal.',
        'CLOSING TECHNIQUE: Emotional framing with partner involvement. \'Imagine waking up every morning looking this fresh. Which option feels right for you?\' Feelings over facts.'
      ]
    },
    {
            type: 'script',
      text: '\'Oh my gosh, your energy is amazing! Where are you visiting from? ... That is incredible! I love it there. You know what, I am going to give you my favorite treatment — it is like a spa moment in the middle of your shopping day. Just relax and enjoy.\' Experience-first, relationship-driven, warm.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Type 4: The Expressive (Storyteller)'
    },
    {
            type: 'paragraph',
      text: 'The Expressive buyer is enthusiastic, talkative, and imaginative. They love stories, emotions, and the big picture. They may seem scattered because they jump between topics — that is just how their mind works.'
    },
    {
            type: 'bullets',
      items: [
        'IDENTIFYING THEM: Talks a lot, tells stories, gets excited easily, asks creative questions, imagines scenarios (\'Oh, my sister would LOVE this!\').',
        'YOUR APPROACH: Match their enthusiasm. Use storytelling. Paint pictures of the future. \'Your skin will glow like you just came back from a two-week spa retreat.\' Let them talk — they sell themselves through their own excitement.',
        'WHAT TO AVOID: Shutting down their stories, being too structured, dampening their enthusiasm. Expressive buyers need to feel heard and excited.',
        'CLOSING TECHNIQUE: Story-based close with gift potential. \'Your sister would absolutely love this too! Should we do two — one for you, one for her?\' Connect their enthusiasm to the purchase.'
      ]
    },
    {
            type: 'script',
      text: '\'Wait until you tell your friends about this! They are going to be SO jealous. You will be at brunch like \'Oh this? Just something I picked up in Andorra.\' So — are we doing the full experience or starting with the essentials? Let us make it fun!\' Enthusiastic, story-driven, playful.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Quick Reference: Adapting Your Style'
    },
    {
            type: 'bullets',
      items: [
        'ANALYTICAL → Use data, respect their process, give space',
        'DRIVER → Be fast, be direct, respect their time',
        'AMIABLE → Build rapport, create warmth, involve feelings',
        'EXPRESSIVE → Match enthusiasm, tell stories, paint pictures'
      ]
    },
    {
            type: 'tip',
      text: 'Most people are a blend of two types. A Driver-Analytical wants fast facts. An Amiable-Expressive wants warm stories. Read the primary type first, then blend in the secondary. Flexibility is the superpower.'
    },
    {
            type: 'quote',
      text: 'The golden rule of sales is not \'treat everyone the same.\' It is \'treat everyone how THEY want to be treated.\' Personality types show you the way.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'Which approach works best with an Analytical buyer?',
      options: [
        'High-energy enthusiasm and storytelling',
        'Facts, evidence, and respect for their decision-making process',
        'Fast, direct results with no small talk',
        'Emotional connection and warm rapport'
      ],
      correctIndex: 1,
      explanation: 'Analytical buyers want facts, evidence, and proof. They need to understand how things work before committing. Respect their thoroughness and give them space to decide.',
    },
    {
      question: 'How should you handle a Driver personality type?',
      options: [
        'Build extensive rapport before pitching',
        'Be fast, direct, and results-focused with binary choices',
        'Tell stories and paint pictures',
        'Give them lots of detailed information'
      ],
      correctIndex: 1,
      explanation: 'Drivers are time-pressed and decisive. They want quick results, clear options, and respect for their schedule. Skip the small talk, get to the demo and close fast.',
    },
    {
      question: 'Why is it important to adapt your style to different personality types?',
      options: [
        'It is not important — one pitch works for everyone',
        'Because different types respond to different communication styles, and mismatching creates resistance',
        'Because the manager requires it',
        'Because it makes the job more interesting'
      ],
      correctIndex: 1,
      explanation: 'Different personality types process information and make decisions differently. Using the wrong approach with the wrong type creates resistance — like speaking the wrong language. Adaptation is the key to precision selling.',
    }
    ],
  },
  'prod-1': {
    id: 'prod-1',
    categoryId: 'products',
    title: 'Price Anchoring Psychology',
    subtitle: 'Why stating the Europe price first works — the contrast principle and anchoring mistakes',
    duration: '10 min',
    icon: 'TrendingUp',
    order: 1,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'The First Number They Hear Becomes Their Reference Point'
    },
    {
            type: 'paragraph',
      text: 'Price anchoring is one of the most powerful tools in sales psychology. The first price a customer hears becomes their mental anchor — the reference point against which all other prices are judged. If you start with €50, €300 sounds expensive. If you start with €500, €300 sounds like a bargain. The product hasn\'t changed. Only the anchor has. This is why we ALWAYS state the Europe price before the Andorra price.'
    },
    {
            type: 'keypoint',
      text: 'The anchor sets the frame. Frame the product as a €500 item that happens to cost €300 in Andorra, and it feels like a steal. Frame it as a €300 item, and it feels like a purchase decision. Always anchor HIGH.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Contrast Principle: How €500 Makes €300 Feel Cheap'
    },
    {
            type: 'paragraph',
      text: 'The contrast principle states that we perceive things differently depending on what we compare them to. A 20kg weight feels light if you first lift a 40kg weight. A €300 price feels cheap if you first hear €500. This isn\'t manipulation — it\'s how human perception works.'
    },
    {
            type: 'script',
      text: '\'Across Europe, this treatment goes for around €500. It\'s expensive because it works instantly and lasts long-term. But here in Andorra — you know how special it is here — we\'re a tax haven, so instead of €500, we charge only €300.\' The customer doesn\'t hear \'€300 product.\' They hear \'€500 product for €300.\' That\'s a €200 win.'
    },
    {
            type: 'bullets',
      items: [
        'STEP 1 — ESTABLISH EUROPE PRICE: \'Around Europe this goes for €200\' (Peeling) or \'€500\' (Syringe) or \'€100 each\' (Scrub/Butter). This is the anchor.',
        'STEP 2 — EXPLAIN WHY IT\'S EXPENSIVE: Brief justification — \'because it works,\' \'because it\'s proven,\' \'dermatologist recommended.\' This validates the high anchor.',
        'STEP 3 — DELIVER THE ANDORRA ADVANTAGE: \'But here in Andorra, because we\'re a tax haven...\' This is the magic phrase. It\'s TRUE. It\'s verifiable. It frames the lower price as a location advantage, not a product discount.',
        'STEP 4 — STATE THE ANDORRA PRICE: \'...it\'s only €150.\' After hearing €500, €150 doesn\'t just sound lower. It sounds like a completely different category of purchase.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When to Mention the Tax Haven'
    },
    {
            type: 'paragraph',
      text: 'The tax-haven angle is your credibility booster. It explains WHY the price is lower without devaluing the product. But timing matters:'
    },
    {
            type: 'bullets',
      items: [
        'BEST: Right after the Europe price, before stating the Andorra price. \'Around Europe it\'s €500... but here in Andorra, because we\'re a tax haven, it\'s €300.\' The tax haven explains the discount before they question product quality.',
        'GOOD: During the initial stop. \'Come try this — prices are amazing because Andorra is a tax haven!\' Sets expectation early.',
        'LESS EFFECTIVE: After they\'ve already heard the price. If you say \'It\'s €300\' first, then mention the tax haven, it feels like an excuse, not an explanation.'
      ]
    },
    {
            type: 'tip',
      text: 'Never apologize for the price. Never say \'I know it\'s expensive\' or \'It\'s a lot, but...\' These phrases undermine the anchor. State the Europe price confidently, explain the tax-haven advantage matter-of-factly, and let the contrast do the work.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Anchoring Mistakes That Backfire'
    },
    {
            type: 'bullets',
      items: [
        'STARTING WITH THE LOW PRICE: \'It\'s only €50!\' Now €50 is the anchor, and if you try to upsell to €120, it feels like a huge jump. Always anchor high first.',
        'MENTIONING THE COST PRICE: \'We buy this for €30 and sell it for €60.\' This destroys perceived value. Customers don\'t care about your margins. They care about what they get.',
        'APOLOGETIC FRAMING: \'I know it\'s expensive, but...\' This tells the customer they should feel bad about the price. Instead: \'This is a premium product because it delivers premium results.\'',
        'COMPARING TO CHEAP ALTERNATIVES: \'This is better than drugstore cream.\' Now you\'ve anchored to drugstore prices. Compare to luxury alternatives instead: \'This replaces a €200 salon treatment.\'',
        'GIVING THE DISCOUNT FIRST: \'It\'s 50% off!\' Now they wonder what the original price was and why it\'s discounted so heavily. Lead with full price, then reveal the savings.'
      ]
    },
    {
            type: 'comparison',
      left: { label: 'Weak Anchoring', text: '\'This peeling is €100. It\'s a good deal.\' No contrast. No frame. The customer evaluates €100 against their general sense of what skincare should cost.' },
      right: { label: 'Strong Anchoring', text: '\'Around Europe this goes for €200. But here in Andorra, because we\'re a tax haven, it\'s only €100 — that\'s 50% off the Europe price just for being here.\' The customer evaluates €100 against €200. It feels like a €100 win.' }
    },
    {
            type: 'quote',
      text: 'The price is not a number — it\'s a story. Tell the story right, and the number becomes small. Tell it wrong, and the number becomes a wall.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'Why should you always state the Europe price before the Andorra price?',
      options: [
        'Because Europe prices are more accurate',
        'Because the first price heard becomes the mental anchor that makes the Andorra price feel like a bargain',
        'Because customers prefer European pricing',
        'Because it\'s required by law'
      ],
      correctIndex: 1,
      explanation: 'The first price heard becomes the mental anchor. When a customer hears €500 first, €300 feels like a bargain. If they hear €300 first, they evaluate it against their general sense of skincare pricing, which is less favorable.',
    },
    {
      question: 'What is the role of the \'tax haven\' phrase in price anchoring?',
      options: [
        'It makes Andorra sound special',
        'It explains WHY the price is lower without devaluing the product quality',
        'It confuses the customer',
        'It justifies high prices'
      ],
      correctIndex: 1,
      explanation: 'The tax-haven phrase explains the price difference as a location advantage (true and verifiable) rather than implying the product itself is discounted or lower quality. It maintains value perception.',
    },
    {
      question: 'Which of these is a price anchoring mistake?',
      options: [
        'Starting with the Europe price',
        'Mentioning the tax-haven advantage',
        'Starting with the low price or apologizing for the cost',
        'Using the contrast principle'
      ],
      correctIndex: 2,
      explanation: 'Starting with the low price sets a low anchor, making upsells feel expensive. Apologizing for the price (\'I know it\'s expensive\') undermines the value. Both destroy effective anchoring.',
    }
    ],
  },
  'prod-2': {
    id: 'prod-2',
    categoryId: 'products',
    title: 'The Two-Choice Framework',
    subtitle: 'Why two options beat one — changing \'yes or no\' into \'which one\'',
    duration: '10 min',
    icon: 'GitFork',
    order: 2,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Two Choices Turn a Decision Into a Selection'
    },
    {
            type: 'paragraph',
      text: 'When you offer one option, the customer\'s brain asks: \'Should I buy this or not?\' That\'s a yes/no question, and \'no\' is the default — it\'s easier, safer, requires no action. When you offer two options, the brain asks a different question: \'Which one should I choose?\' The decision to buy is assumed. Now they\'re just picking between A and B. This simple reframing dramatically increases conversion.'
    },
    {
            type: 'keypoint',
      text: 'A single offer invites rejection. Two offers invite comparison. Comparison assumes purchase. The psychology is subtle but profound — and it works on virtually every human decision.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Psychology: \'Which One\' vs. \'Yes or No\''
    },
    {
            type: 'paragraph',
      text: 'This is based on a well-studied cognitive bias called \'choice architecture.\' When people face a binary yes/no decision, the default is often \'no\' (status quo bias). But when faced with multiple options within a category, they evaluate which option fits them better — implicitly accepting the category itself.'
    },
    {
            type: 'script',
      text: 'Single option: \'The syringe is €210.\' Customer thinks: \'€210? That\'s a lot. I don\'t know if I need this. No thanks.\' Two options: \'You can take the single syringe for €210 with a gift, or the double for €300 and treat your forehead and upper lip too. Which works better for you?\' Customer thinks: \'Hmm, do I want the single or double? The double makes more sense...\' See the difference? They went from \'Should I buy?\' to \'Which one?\''
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Option Structure: How to Build Your Two Choices'
    },
    {
            type: 'paragraph',
      text: 'Not any two options work. The structure matters. Here\'s how to build effective choices:'
    },
    {
            type: 'numbered',
      items: [
        'OPTION 1 — THE VALUE CHOICE: Lower price point with a smaller gift or no gift. This captures budget-conscious buyers. Example: Syringe at €210 + one gift.',
        'OPTION 2 — THE FULL CHOICE: Standard or higher price with a bigger gift or added value. This captures buyers who want the complete experience. Example: Syringe at €300 + second syringe free.',
        'THE CONTRAST: The gap between options should be clear but not extreme. €210 vs €300 is a meaningful difference. €210 vs €250 is too close — it creates decision paralysis.',
        'THE DEFAULT: If you sense hesitation, guide them toward Option 1: \'Most people start with Option 1 — it\'s a great entry point.\' This simplifies their decision.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Two-Choice Examples by Product'
    },
    {
            type: 'bullets',
      items: [
        'SYRINGE: Option 1 — €210 (single syringe + gift). Option 2 — €300 (two syringes + Day & Night Cream free). One is entry-level value; the other is the complete experience.',
        'PEELING: Option 1 — €100 (single peeling + Dead Sea Scrub gift). Option 2 — €150 (peeling + Day & Night Cream free). Budget-conscious vs. skincare routine builders.',
        'SCRUB & BUTTER: Option 1 — €60 (Buy 1 Get 1 — Scrub + Body Butter). Option 2 — €120 (Buy 2 Get 1 — trio with Nail Kit or Cleanser). Casual buyer vs. serious self-care or gift shopper.',
        'NAIL KIT: Option 1 — €60 (Buy 1 Get 1 — mix with Scrub or Butter). Option 2 — €120 (Buy 2 Get 1 — three full kits for gifting).'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Decoy Effect (Advanced)'
    },
    {
            type: 'paragraph',
      text: 'A more advanced technique involves adding a third option that\'s designed to make one of the two main options more attractive:'
    },
    {
            type: 'script',
      text: '\'We have three options. The basic scrub alone is €30. The Scrub + Body Butter duo is €60. Or the full trio with the Nail Kit is €120.\' The €30 option makes the €60 option look like much better value. The €120 option makes the €60 option look like a smart, budget-friendly choice. Most people pick the middle — which is exactly what you want.'
    },
    {
            type: 'tip',
      text: 'The two-choice framework only works when BOTH options are genuinely good values. If Option 1 is a terrible deal designed to push people to Option 2, customers sense the manipulation. Make both options attractive, just for different types of buyers.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When Two Choices Become One'
    },
    {
            type: 'paragraph',
      text: 'Sometimes the customer\'s situation clearly points to one option. When this happens, guide them to it rather than forcing a comparison that doesn\'t make sense:'
    },
    {
            type: 'bullets',
      items: [
        'CLEAR BUDGET CONSTRAINT: If they visibly hesitate at €300, immediately pivot to €210. Don\'t make them reject both options.',
        'CLEAR GIFT SHOPPER: If they\'re buying for three sisters, Option 2 (Buy 2 Get 1) is obvious. Don\'t overcomplicate.',
        'CLEAR PREMIUM BUYER: If they\'re carrying luxury bags and show zero price sensitivity, lead with Option 2 or even an upsell beyond it.',
        'UNCERTAIN BUYER: When genuinely unsure, default to Option 1. It\'s easier to say yes to, and they can always upgrade later.'
      ]
    },
    {
            type: 'quote',
      text: 'Give them one option and they decide whether to buy. Give them two options and they decide which to buy. That\'s the difference between a conversation and a close.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What cognitive shift happens when you offer two options instead of one?',
      options: [
        'The customer thinks the prices are too high',
        'The customer shifts from \'Should I buy?\' to \'Which one should I choose?\'',
        'The customer gets confused',
        'The customer always picks the cheaper option'
      ],
      correctIndex: 1,
      explanation: 'Two options change the mental frame from a yes/no purchase decision (where \'no\' is the default) to a comparison between options (where buying is assumed and they\'re just picking which one).',
    },
    {
      question: 'What is the decoy effect?',
      options: [
        'A technique where you trick the customer',
        'Adding a third option designed to make one of the main options more attractive',
        'Giving away free products',
        'Only showing the expensive option first'
      ],
      correctIndex: 1,
      explanation: 'The decoy effect involves adding a third option (like a basic €30 scrub) that makes the target option (€60 duo) look like better value by comparison. Most customers pick the middle option.',
    },
    {
      question: 'What should you do when a customer clearly has budget constraints?',
      options: [
        'Still present both options equally',
        'Immediately pivot to the lower-priced option',
        'Insist on the premium option',
        'End the conversation'
      ],
      correctIndex: 1,
      explanation: 'When budget constraints are clear, immediately pivot to the lower-priced option. Forcing a comparison that doesn\'t make sense for their situation creates awkwardness and can lose the sale entirely.',
    }
    ],
  },
  'prod-3': {
    id: 'prod-3',
    categoryId: 'products',
    title: 'Adaptive Pricing Mastery',
    subtitle: 'Reading body language for price comfort, the gradual descent technique, and never going below minimum',
    duration: '10 min',
    icon: 'TrendingUp',
    order: 3,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'The Best Closers Read the Room and Adjust in Real Time'
    },
    {
            type: 'paragraph',
      text: 'Presenting the offer isn\'t the end — it\'s the beginning of the close. Adaptive pricing is the art of reading the customer\'s reaction to your price and adjusting the offer on the fly. This is what separates good sellers from great ones. Anyone can memorize a script. Only masters can feel the room and adapt.'
    },
    {
            type: 'keypoint',
      text: 'The gradual descent: Start high, observe reactions, remove gifts to lower the price, but NEVER go below your floor price. Each step down should feel like a personalized solution, not a desperate discount.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reading Body Language for Price Comfort'
    },
    {
            type: 'paragraph',
      text: 'The moment you state the price, watch their body. It tells you everything:'
    },
    {
            type: 'bullets',
      items: [
        'COMFORT SIGNAL: Brief nod, relaxed shoulders, slight smile, maintaining eye contact. They can afford it. Move to close.',
        'SHOCK SIGNAL: Eyes widen, sharp breath intake, head pulls back slightly. The price is higher than expected. You need to reframe value or prepare to descale.',
        'HIDDEN SHOCK: They maintain composure but glance at their partner, or their smile becomes fixed. They feel pressure to appear comfortable but are actually concerned. Watch for partner reactions.',
        'REJECTION SIGNAL: Immediate step back, cross arms, shake head. Price is too high OR they weren\'t interested regardless. Don\'t chase too hard.',
        'THOUGHTFUL SIGNAL: They look down, touch chin, purse lips. They\'re calculating. Give them silence and space. This is often a buying signal disguised as hesitation.'
      ]
    },
    {
            type: 'tip',
      text: 'Price reactions happen in the first 2 seconds after you state the number. Train yourself to watch their face during those 2 seconds, not to keep talking. The information you gather determines your next move.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Gradual Descent Technique'
    },
    {
            type: 'paragraph',
      text: 'This is your pricing staircase. Each step down removes value (gifts) to lower the price. The customer feels like they\'re getting a deal, not that you were overcharging:'
    },
    {
            type: 'numbered',
      items: [
        'STEP 1 — FULL OFFER: Present both options at full value. \'Option 1: €210 with a gift. Option 2: €300 with two syringes and creams.\' This is your ceiling.',
        'STEP 2 — REMOVE THE GIFT: If they hesitate on €210: \'You know what, let me make it easier. I\'ll take away the gift — that\'s €35 value — and bring the syringe to €175.\' They save money; you lose a gift, not margin.',
        'STEP 3 — THE VOUCHER CLOSE: If they still hesitate: \'Alright, I can do something a bit crazy — just this once. With a 20% voucher, I can bring the single syringe to €140. But only on the single one, not the combo.\' This feels exclusive and final.',
        'STEP 4 — THE FLOOR: Your absolute minimum. Know it and never cross it. If they won\'t buy at €140, they weren\'t going to buy at any price. Let them go graciously.'
      ]
    },
    {
            type: 'script',
      text: '\'So Option 1 is €210 with a gift...\' [Watch their face. Shock?] \'...or, you know what, let me remove the gift — that\'s €35 — and bring it to €175 just for you.\' [Watch again. Still hesitant?] \'Listen, I just checked, and I can do a one-time voucher that brings it to €140. But just this once, and only on the single syringe.\' Three steps, each feeling like a personal favor.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When to Drop the Gift vs. When to Add Value'
    },
    {
            type: 'paragraph',
      text: 'Sometimes you descale (remove gifts, lower price). Sometimes you upscale (add value, maintain price). Know which to use:'
    },
    {
            type: 'comparison',
      left: { label: 'Descale (Drop Price)', text: 'Use when: Customer shows price shock, mentions budget constraints, seems genuinely interested but can\'t afford the price, is comparing to a cheaper alternative. Remove gifts gradually to find their price point.' },
      right: { label: 'Upscale (Add Value)', text: 'Use when: Customer shows no price sensitivity, carries luxury bags, expresses love for the product, is buying gifts for multiple people. Add a cream, add a second syringe, create a bundle. They\'re willing to spend — help them.' }
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Psychology of \'Store Credit\' Reframing'
    },
    {
            type: 'paragraph',
      text: 'One of the most effective techniques is reframing a removed gift as \'store credit.\' Instead of saying \'I\'ll remove the Scrub,\' say \'I\'ll take away the Scrub — we value it at €25 — and use that as store credit to bring your price down.\' This feels like you\'re being creative on their behalf, not just removing value.'
    },
    {
            type: 'script',
      text: '\'I totally understand. Let me make it easy — I can take away the Scrub, we charge €25 for it anyway, so let\'s just use it as store credit. This way I can make it €75 for you.\' The word \'credit\' makes them feel smart for saving. Not poor for hesitating.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Never Going Below Minimum'
    },
    {
            type: 'paragraph',
      text: 'Your floor price is your professional boundary. Here\'s why it matters:'
    },
    {
            type: 'bullets',
      items: [
        'MARGIN PROTECTION: Going below minimum destroys profitability. You didn\'t set the floor randomly — it protects the business.',
        'VALUE PERCEPTION: Desperate discounting tells the customer (and yourself) that the product wasn\'t worth the original price. Protect the product\'s value.',
        'PRECEDENT: If you go below minimum once, the customer tells friends. Word spreads. The floor becomes the ceiling.',
        'YOUR COMMISSION: Every euro below minimum comes out of your potential earnings. Respect your own paycheck.'
      ]
    },
    {
            type: 'tip',
      text: 'Know your minimums for every product by heart: Syringe €140 (voucher close), Peeling €50 (voucher close), Scrub €30 (single), Nail Kit €30 (single). These are your floors. Practice saying no to going lower — \'I wish I could, but that\'s genuinely the best I can do.\''
    },
    {
            type: 'quote',
      text: 'Adaptive pricing isn\'t about being cheap. It\'s about being flexible within your boundaries. The customer who respects your floor price is the customer who values what you sell.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What is the gradual descent technique?',
      options: [
        'Randomly lowering the price until they agree',
        'A structured staircase where each step removes gifts to lower the price while maintaining value perception',
        'Starting with the lowest price and going up',
        'Matching the customer\'s first offer'
      ],
      correctIndex: 1,
      explanation: 'The gradual descent is a structured approach: present full offer, then remove gift (Step 2), then voucher close (Step 3), each feeling like a personalized solution rather than desperate discounting.',
    },
    {
      question: 'What does \'store credit\' reframing accomplish?',
      options: [
        'It tricks the customer into paying more',
        'It makes the customer feel smart for saving rather than poor for hesitating',
        'It adds actual store credit to their account',
        'It confuses the customer'
      ],
      correctIndex: 1,
      explanation: 'Reframing a removed gift as \'store credit\' (e.g., \'the Scrub is €25, so I\'ll use that as credit\') makes the price reduction feel like a creative solution on their behalf, not just removing value.',
    },
    {
      question: 'Why should you never go below your minimum floor price?',
      options: [
        'Because the manager will be angry',
        'It protects margins, value perception, and your commission — and sets a dangerous precedent if broken',
        'Because customers will always demand it',
        'Because the products are too expensive'
      ],
      correctIndex: 1,
      explanation: 'Going below minimum destroys profitability, devalues the product in customers\' eyes, sets a bad precedent, and reduces your commission. The floor exists for good business reasons.',
    }
    ],
  },
  'prod-4': {
    id: 'prod-4',
    categoryId: 'products',
    title: 'The Voucher Close',
    subtitle: 'Psychological breakdown of why it works — scarcity, exclusivity, and reciprocity combined',
    duration: '8 min',
    icon: 'Ticket',
    order: 4,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Your Final Weapon, Used Wisely'
    },
    {
            type: 'paragraph',
      text: 'The voucher close is the ace up your sleeve. When the customer loves the product, appreciates the value, but just can\'t quite pull the trigger — the voucher close provides the gentle nudge. Done right, it feels like an insider secret. Done wrong, it feels like a cheap trick. Master the psychology and the delivery.'
    },
    {
            type: 'keypoint',
      text: 'The voucher close combines three psychological principles simultaneously: scarcity (one-time only), exclusivity (just for you), and reciprocity (I\'m doing you a favor — you should commit). This triple-whammy is why it\'s so effective.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Why the Voucher Close Works: The Psychology'
    },
    {
            type: 'paragraph',
      text: 'Let\'s break down exactly what\'s happening in the customer\'s mind during a voucher close:'
    },
    {
            type: 'bullets',
      items: [
        'SCARCITY: \'This is a one-time thing.\' The customer knows the opportunity won\'t come again. Loss aversion kicks in — the pain of missing out feels worse than the pain of spending.',
        'EXCLUSIVITY: \'Just for you.\' The customer feels special, not sold to. They\'re receiving insider treatment. This creates a personal bond — they don\'t want to disappoint you after you \'went to bat\' for them.',
        'RECIPROCITY: You\'ve just done them a favor by finding a special price. Human psychology compels them to reciprocate — by saying yes. The \'two promises\' at the end activate this reciprocity explicitly.',
        'AUTHORITY: \'I just checked\' implies you have the power to make this happen. You\'re not just a salesperson — you\'re a decision-maker who chose to help them.',
        'COMMITMENT: \'Promise me you\'ll actually use it\' creates a verbal commitment. Once someone promises something, they\'re more likely to follow through.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Exact Script and Delivery'
    },
    {
            type: 'paragraph',
      text: 'Delivery is everything. The words are only half the formula. Here\'s how to deliver the voucher close:'
    },
    {
            type: 'numbered',
      items: [
        'STEP 1 — DROP YOUR VOICE: Lower your volume slightly. This signals that what you\'re about to say is exclusive, maybe even a little secretive. Loud announcements feel public and therefore less special.',
        'STEP 2 — THE SETUP: \'Alright, alright... listen, I just checked something, and I can do a small crazy offer for you. But you can\'t be greedy, okay?\' This frames the offer as something YOU\'RE doing for THEM, not a standard discount.',
        'STEP 3 — THE LIMITATION: \'I can\'t do this on the big option — only on the single one.\' Limitations increase perceived value. If you could do it on everything, it\'s not special. Limiting it makes it feel real.',
        'STEP 4 — THE PRICE: \'So remember I told you without the gift it\'s €175? If you use this small 20% discount voucher, it brings it down to €140. But this is a one-time thing — next time, it goes back to normal.\'',
        'STEP 5 — THE TWO PROMISES: \'You just promise me two things, okay? One: you\'ll actually use it. Two: if you\'re happy, you\'ll tell your friends about us.\' This creates commitment and plants a referral seed.',
        'STEP 6 — THE WHATSAPP BRIDGE: \'You use WhatsApp, right? Perfect. You\'ll have my number and email — just let me know if you need anything.\' Transforms transaction into relationship.'
      ]
    },
    {
            type: 'script',
      text: '\'Alright, alright... listen, I just checked, and I can do something a little crazy for you. But you can\'t be greedy, okay? I can\'t do this on the double syringe, only on the single one. So remember I told you it\'s €175 without the gift? If you use this small 20% voucher, I can bring it down to €140. But this is a one-time thing — next time, it goes back to normal. You just promise me two things: you\'ll actually use it, and if you love it, you\'ll tell your friends. Deal?\''
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Script Variations for Different Situations'
    },
    {
            type: 'bullets',
      items: [
        'THE FRIENDLY VERSION: \'Okay, I\'m going to do something I probably shouldn\'t... but you seem so lovely, and I really want you to have this. Just don\'t tell my boss!\' Playful, conspiratorial.',
        'THE PROFESSIONAL VERSION: \'I have some flexibility on the single item. Let me see what I can do... Okay, with our promotional voucher, I can bring the single syringe to €140. This is the best available rate.\' Measured, credible.',
        'THE URGENT VERSION: \'I only have one voucher left today, and honestly, I\'ve been saving it for someone who really appreciates the product. That\'s you. €140, just this once.\' Scarcity + personalization.',
        'THE RELATIONSHIP VERSION: \'I want you to be a happy customer who comes back. So here\'s what I\'ll do — €140 on the single one, and you have my WhatsApp for anything you need later.\' Long-term focus.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When to Use the Voucher Close vs. When It Hurts'
    },
    {
            type: 'comparison',
      left: { label: 'Use the Voucher Close', text: 'Customer loves the product but hesitates on price. They\'ve seen the demo, they\'re engaged, but need a final nudge. They say \'I need to think about it.\' You sense genuine interest held back by budget.' },
      right: { label: 'Don\'t Use the Voucher Close', text: 'Customer shows no interest in the product. They haven\'t engaged with the demo. Price isn\'t the issue — the product is. Using the voucher close here devalues the product for no reason. Save it for the right moment.' }
    },
    {
            type: 'tip',
      text: 'The voucher close loses power if overused. If you offer it to every single customer, it becomes your default price, not a special deal. Use it selectively — on customers who genuinely need that final push, not as your opening offer.'
    },
    {
            type: 'quote',
      text: 'The voucher close isn\'t a discount. It\'s a key to a locked door. The customer is already inside the room, looking at what they want. You\'re just handing them the key to take it home.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'Which three psychological principles does the voucher close combine?',
      options: [
        'Fear, guilt, and shame',
        'Scarcity, exclusivity, and reciprocity',
        'Love, hope, and charity',
        'Pride, envy, and greed'
      ],
      correctIndex: 1,
      explanation: 'The voucher close combines scarcity (one-time only), exclusivity (just for you), and reciprocity (I\'m doing you a favor — you should commit). This triple combination is why it\'s so effective.',
    },
    {
      question: 'Why should you drop your voice during the voucher close?',
      options: [
        'To intimidate the customer',
        'To signal that what you\'re saying is exclusive and secretive, making it feel more special',
        'Because you\'re whispering a secret',
        'To save your voice'
      ],
      correctIndex: 1,
      explanation: 'Lowering your volume signals exclusivity and confidentiality. It makes the offer feel like an insider secret rather than a public announcement, increasing its perceived value and personal nature.',
    },
    {
      question: 'When should you NOT use the voucher close?',
      options: [
        'When the customer genuinely loves the product but hesitates on price',
        'When the customer shows no interest in the product — it devalues the product unnecessarily',
        'When the customer asks for a discount',
        'When it\'s the end of your shift'
      ],
      correctIndex: 1,
      explanation: 'The voucher close should only be used when the customer genuinely loves the product but needs a final nudge. Using it on uninterested customers devalues the product and wastes your most powerful closing tool.',
    }
    ],
  },
  'prod-5': {
    id: 'prod-5',
    categoryId: 'products',
    title: 'Cross-Selling & Upselling',
    subtitle: 'Reading the moment for an upsell, natural transitions, and when NOT to upsell',
    duration: '8 min',
    icon: 'TrendingUp',
    order: 5,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'If They Love It, Build On It. If They Don\'t, Don\'t.'
    },
    {
            type: 'paragraph',
      text: 'Upselling isn\'t greed — it\'s service. When a customer loves the syringe demo, offering them the second syringe for their forehead completes their experience. When a customer buys the scrub, suggesting the body butter that pairs with it makes their purchase more effective. Cross-selling and upselling are about COMPLETING the customer\'s journey, not extracting more money.'
    },
    {
            type: 'keypoint',
      text: 'The key to ethical upselling: only upsell when the customer is genuinely delighted. If they liked the product but weren\'t blown away, pushing for more creates resentment. If their eyes lit up during the demo, NOT offering more is actually doing them a disservice.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reading the Moment for an Upsell'
    },
    {
            type: 'paragraph',
      text: 'Upsell timing is everything. These are the signals that an upsell will be welcomed:'
    },
    {
            type: 'bullets',
      items: [
        'THEIR EYES LIT UP: Genuine amazement during the demo. \'Wow!\' \'Oh my god!\' \'That\'s incredible!\' These are green lights.',
        'THEY ASK ABOUT OTHER PRODUCTS: \'Do you have anything for...?\' They\'re already thinking beyond what you\'re showing. Guide them.',
        'THEY MENTION GIFTS: \'This would be perfect for my sister.\' Gift buyers are multi-buyers. They\'re already in buying mode for others.',
        'NO PRICE OBJECTION: When you present the offer and they don\'t blink at the price, they have room for more. Test with a gentle upsell.',
        'THEY ASK ABOUT ROUTINES: \'So I use this and then what?\' They\'re imagining incorporating your products into their life. Fill in the gaps.'
      ]
    },
    {
            type: 'tip',
      text: 'The 30-second rule: If they express delight within 30 seconds of seeing the result, upsell. If their reaction is muted or delayed, don\'t. Delight is your upsell signal.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Natural Transition Phrases'
    },
    {
            type: 'paragraph',
      text: 'The transition to upsell should feel seamless, not like a new sales pitch. These phrases bridge naturally:'
    },
    {
            type: 'bullets',
      items: [
        '\'Since you\'re already doing the eyes, let\'s give the rest of the face a glow too.\' — Natural extension from one product to related areas.',
        '\'You know what would make this even better? The body butter with the same Dead Sea minerals. Your hands felt amazing — imagine your whole body.\' — Sensory bridge.',
        '\'Since you\'re buying for your mom, what about your sister? The Nail Kit is perfect for her too, and it\'s small enough to travel with.\' — Gift expansion.',
        '\'This is our most popular combo — the peeling for weekly treatment and the scrub for your body. Together they\'re €X, which saves you €Y.\' — Bundle logic.',
        '\'You clearly love quality skincare. Can I show you what I personally use with this? It\'s my secret weapon.\' — Personal recommendation bridge.'
      ]
    },
    {
            type: 'script',
      text: '\'Since you\'re already getting the syringe for your eyes, the most popular upgrade is adding the second one for your forehead and upper lip. Most people don\'t realize the forehead shows age just as much as the eyes. For €90 more, you\'re getting the complete treatment. Does that make sense?\' Logic + value + gentle close.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Since You\'re Already...\' Technique'
    },
    {
            type: 'paragraph',
      text: 'This is the most powerful upsell framework because it frames the additional purchase as a natural extension of what they\'re already buying:'
    },
    {
            type: 'numbered',
      items: [
        '\'Since you\'re already getting the Peeling...\' (Acknowledge their current decision — validates their choice)',
        '\'...the scrub uses the same Dead Sea minerals but for your body...\' (Introduce the complementary product with familiar framing)',
        '\'...and together they create a complete weekly routine...\' (Paint the full picture — lifestyle upgrade, not just another product)',
        '\'...I can do both for €X instead of €Y...\' (Add value — bundle pricing makes the upsell feel smart, not excessive)'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Bundle Psychology'
    },
    {
            type: 'paragraph',
      text: 'Bundles work because they reframe the purchase from \'buying multiple things\' to \'getting a complete solution.\''
    },
    {
            type: 'bullets',
      items: [
        'THE COMPLETE ROUTINE: \'This is your full face-and-body care for the year. One purchase, everything you need.\' Simplicity is compelling.',
        'THE GIFT BUNDLE: \'Three gifts, one purchase, done with Christmas shopping.\' Gift buyers love efficiency.',
        'THE SAVINGS FRAME: \'Together they\'re €X, which saves you €Y versus buying separately.\' Even small savings feel smart.',
        'THE EXPERIENCE FRAME: \'This isn\'t just products — it\'s a spa experience at home.\' Elevates the purchase from transaction to lifestyle.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When NOT to Upsell'
    },
    {
            type: 'paragraph',
      text: 'Knowing when NOT to upsell is as important as knowing how. Here are the red flags:'
    },
    {
            type: 'bullets',
      items: [
        'BUDGET STRESS: If they visibly stressed about the base price, don\'t add more. Close what you can and let them leave happy.',
        'INDIFFERENT REACTION: If they said \'It\'s nice\' without enthusiasm, an upsell will feel pushy. They weren\'t sold on the first product.',
        'PARTNER OPPOSITION: If their partner was skeptical about the first product, adding more will trigger a veto. Secure the first sale.',
        'TIME PRESSURE: If they\'re in a rush and agreed to the base product just to move on, adding complexity kills the deal.',
        'SINGLE-ITEM SHOPPERS: Some people came in for one thing and want one thing. Respect their simplicity. A happy single-item customer returns. A pressured multi-item customer doesn\'t.'
      ]
    },
    {
            type: 'quote',
      text: 'Upselling is not about getting more money. It\'s about giving more value to someone who wants it. When the desire is real, the upsell is service. When the desire is pushed, the upsell is greed.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What is the key signal that an upsell will be welcomed?',
      options: [
        'They ask about the price',
        'They show genuine delight and amazement during the demo',
        'They look at their watch',
        'They ask about return policy'
      ],
      correctIndex: 1,
      explanation: 'Genuine delight (eyes lighting up, exclamations of amazement) is the strongest signal that an upsell will be welcomed. If they loved the first product, offering more is service, not greed.',
    },
    {
      question: 'What is the \'Since You\'re Already...\' technique?',
      options: [
        'A way to pressure customers',
        'A framework that frames the upsell as a natural extension of their current purchase',
        'A discount strategy',
        'A way to rush the close'
      ],
      correctIndex: 1,
      explanation: 'The \'Since you\'re already...\' technique acknowledges their current purchase and frames the upsell as a natural, logical extension. It validates their choice while introducing the next step.',
    },
    {
      question: 'When should you NOT attempt to upsell?',
      options: [
        'When the customer shows budget stress or indifference to the first product',
        'When the customer loved the demo',
        'When the customer asks about other products',
        'When the customer has no price objection'
      ],
      correctIndex: 0,
      explanation: 'Never upsell when the customer showed budget stress, indifference, partner opposition, or time pressure. Secure the base sale and let them leave happy. A pressured customer doesn\'t return.',
    }
    ],
  },
  'prod-6': {
    id: 'prod-6',
    categoryId: 'products',
    title: 'Product Comparison Guide',
    subtitle: 'When to pitch which product — skin type matching, age, tourist origin, and decision trees',
    duration: '10 min',
    icon: 'GitCompare',
    order: 6,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'The Right Product to the Right Person at the Right Time'
    },
    {
            type: 'paragraph',
      text: 'A 25-year-old solo female traveler has different skincare needs than a 55-year-old couple on a luxury vacation. A French tourist interested in ingredients needs a different pitch than a British tourist buying Christmas gifts. Product matching isn\'t random — it\'s strategic. This lesson gives you decision trees to quickly determine which product to lead with.'
    },
    {
            type: 'keypoint',
      text: 'Every person who walks past your door has a product that\'s optimal for them. Your job is to identify it in 10 seconds and deliver the perfect pitch. Matching = higher conversion, higher satisfaction, and higher return visits.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Quick Decision Tree: Which Product to Lead With'
    },
    {
            type: 'paragraph',
      text: 'Follow this flow chart mentally for each customer:'
    },
    {
            type: 'numbered',
      items: [
        'VISIBLE EYE CONCERNS? (Bags, crow\'s feet, tired eyes) → LEAD WITH SYRINGE. Immediate visual result. High perceived value. Premium price point.',
        'YOUNG (20s-30s) + GOOD SKIN? → LEAD WITH PEELING. Prevention-focused, glow-enhancing, weekly ritual appeal. Or NAIL KIT for visible natural nails.',
        'DRY SKIN SIGNS? (Flaky, dull, mentions dryness) → LEAD WITH SCRUB. Sensory demo is immediate and universally appealing.',
        'NATURAL NAILS + NO POLISH? → LEAD WITH NAIL KIT. Fast demo, visible result, gift potential.',
        'BUYING GIFTS? → LEAD WITH SCRUB/NAIL KIT COMBO. Lower price points, unisex appeal, easy gifting.',
        'MALE CUSTOMER OR SKEPTICAL PARTNER? → LEAD WITH SCRUB. Unisex, no beauty stigma, feels practical rather than cosmetic.',
        'LUXURY BUYER? (Designer bags, expensive watch) → LEAD WITH SYRINGE. Premium positioning matches their expectations.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Skin Type Matching'
    },
    {
            type: 'paragraph',
      text: 'Different skin types respond to different products. Here\'s how to match:'
    },
    {
            type: 'bullets',
      items: [
        'DRY SKIN: Peeling (removes dead layers, allows better cream absorption) + Scrub (Dead Sea minerals hydrate) + Body Butter (rich moisture). Avoid: nothing — all products work for dry skin.',
        'OILY SKIN: Peeling (weekly deep clean, reduces oil buildup) + Syringe (eye area typically not oily). Scrub is fine in moderation. Body Butter may feel heavy — suggest smaller amounts.',
        'SENSITIVE SKIN: Lead with the gentle approach. Peeling is dermatologist-recommended for sensitivity and eczema. Emphasize the \'natural, no chemicals\' angle. Do a small patch test first.',
        'MATURE SKIN (50+): Syringe (collagen stimulation, visible anti-aging) + Peeling (restores glow that diminishes with age) + rich Body Butter. Focus on results and investment in self-care.',
        'YOUNG SKIN (20s): Peeling (prevention, weekly glow) + Nail Kit (fun, affordable, giftable). Syringe may feel unnecessary unless they have specific eye concerns.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Age-Appropriate Recommendations'
    },
    {
            type: 'comparison',
      left: { label: 'Younger Customers (20s-30s)', text: 'Lead with: Peeling (prevention + glow) or Nail Kit (affordable + fun). Frame as: Self-care ritual, Instagram-worthy results, smart prevention. Avoid: Heavy anti-aging language. They don\'t relate to \'wrinkles\' yet.' },
      right: { label: 'Mature Customers (40s+)', text: 'Lead with: Syringe (visible anti-aging) or Peeling (restores radiance). Frame as: Investment in yourself, proven results, dermatologist-recommended. Emphasize: The visible difference in the mirror. They know their skin and notice changes.' }
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Tourist Origin → Product Matching'
    },
    {
            type: 'paragraph',
      text: 'Different nationalities have different skincare cultures and preferences:'
    },
    {
            type: 'bullets',
      items: [
        'SPANISH: Peeling or Scrub (value-conscious, respond to tax-haven savings). Emphasize: \'Smart shopping in Andorra.\'',
        'FRENCH: Syringe or Peeling (skincare-savvy, appreciate quality and science). Emphasize: Ingredients, dermatologist recommendation, European quality.',
        'BRITISH: Scrub or Nail Kit (love sensory experiences, appreciate humor, gift-buyers). Emphasize: Fun demo, Christmas gifts, bargain pricing.',
        'EASTERN EUROPEAN: Syringe (premium positioning, visible results, status). Emphasize: #1 best-seller, luxury treatment, European prestige.',
        'ASIAN: Peeling or Syringe (ingredient-conscious, results-driven). Emphasize: Science, natural ingredients, visible before/after.',
        'GERMAN/DUTCH: Peeling or Scrub (practical, quality-focused). Emphasize: Value per use, long-lasting, dermatologist-approved.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Decision Tree Summary'
    },
    {
            type: 'paragraph',
      text: 'Here\'s the ultra-quick version for the door:'
    },
    {
            type: 'bullets',
      items: [
        'EYES LOOK TIRED → SYRINGE (€140-€300)',
        'YOUNG + GLOW-FOCUSED → PEELING (€50-€150)',
        'DRY SKIN / WINTER → SCRUB (€30-€120)',
        'NATURAL NAILS → NAIL KIT (€30-€120)',
        'CHRISTMAS GIFTS → SCRUB/NAIL KIT COMBO (€60-€120)',
        'LUXURY SHOPPER → SYRINGE → PEELING UPSALE (€300+)',
        'SKEPTICAL MAN → SCRUB (practical, sensory, €30-€60)'
      ]
    },
    {
            type: 'tip',
      text: 'This isn\'t rigid — it\'s a starting point. The best sellers read the individual, not just the demographic. A 25-year-old with prominent eye bags is still a syringe candidate. A 60-year-old who loves nail care is still a Nail Kit candidate. Use the guide, then adapt.'
    },
    {
            type: 'quote',
      text: 'Matching the right product isn\'t about stereotypes. It\'s about observation, empathy, and giving each person exactly what they need. That\'s how you become a trusted advisor, not just a seller.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'Which product should you lead with for a customer with visible under-eye bags?',
      options: [
        'Peeling',
        'Scrub',
        'Syringe',
        'Nail Kit'
      ],
      correctIndex: 2,
      explanation: 'Visible eye concerns (bags, crow\'s feet, tired eyes) make the Syringe the optimal lead product. The immediate visual result and high perceived value make it the perfect match.',
    },
    {
      question: 'Which product is best for a skeptical male partner?',
      options: [
        'Syringe',
        'Peeling',
        'Scrub',
        'Nail Kit'
      ],
      correctIndex: 2,
      explanation: 'The Scrub is ideal for skeptical men because it\'s unisex, feels practical rather than cosmetic, has an immediate sensory demo, and doesn\'t carry a beauty stigma.',
    },
    {
      question: 'Why should you adapt product recommendations by tourist origin?',
      options: [
        'Because of stereotypes',
        'Because different cultures have different skincare priorities, knowledge levels, and buying motivations',
        'Because the manager says so',
        'Because some products are only for certain nationalities'
      ],
      correctIndex: 1,
      explanation: 'Different nationalities have different skincare cultures, ingredient knowledge, and buying motivations. French tourists appreciate science; British tourists love sensory experiences; Eastern European tourists respond to premium positioning. Matching to cultural context increases relevance.',
    }
    ],
  },
  'prod-7': {
    id: 'prod-7',
    categoryId: 'products',
    title: 'Objection Handling Library',
    subtitle: '20 common objections and exactly how to respond to each one',
    duration: '10 min',
    icon: 'Shield',
    order: 7,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Every Objection Is an Opportunity Dressed as a Problem'
    },
    {
            type: 'paragraph',
      text: 'Objections aren\'t rejections — they\'re questions wearing disguise. When a customer says \'It\'s too expensive,\' what they often mean is \'I don\'t understand the value yet.\' When they say \'I need to ask my husband,\' they might mean \'I need validation for a decision I already want to make.\' Learning to translate objections and respond to the real concern underneath is a superpower.'
    },
    {
            type: 'keypoint',
      text: 'The objection handling framework: Acknowledge → Reframe → Provide solution → Close. Never argue. Never dismiss. Always validate their concern first, then guide them to a new perspective.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Price Objections'
    },
    {
            type: 'bullets',
      items: [
        '\'IT\'S TOO EXPENSIVE\' → \'I completely understand. Let me break it down: this lasts a full year. That\'s less than €3 per week. How much is your daily coffee? This costs less and lasts far longer. Which option works better for your budget?\' (Reframe as cost-per-use, then offer choices.)',
        '\'I CAN GET CHEAPER ONLINE\' → \'You absolutely can find cheaper products online. But can you try them first? See the result in 2 minutes? This is the experience you\'re paying for — knowing it works before you buy. Plus, you have my WhatsApp if you ever need anything. Try getting that from a website.\' (Value of experience + service.)',
        '\'I WASN\'T PLANNING TO SPEND THIS MUCH TODAY\' → \'I totally get it — neither was my last customer! But she tried it, saw the result, and realized it\'s an investment, not an impulse buy. This isn\'t something you\'ll replace next month. It\'s a year of results. Want me to show you what she saw?\' (Normalize + reframe as investment + curiosity.)',
        '\'I DON\'T HAVE CASH\' → \'No problem at all! We take all cards, Apple Pay, Google Pay — whatever works for you.\' (Remove the payment barrier immediately.)'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Product Skepticism Objections'
    },
    {
            type: 'bullets',
      items: [
        '\'I ALREADY HAVE CREAM AT HOME\' → \'That\'s great — this isn\'t a cream! It\'s completely different. Your cream hydrates; this removes dead skin layers so your cream works 10 times better. They work together. Think of this as the prep step your routine is missing.\' (Differentiate, don\'t compete.)',
        '\'I\'VE NEVER HEARD OF THIS BRAND\' → \'That\'s actually why I\'m here — to introduce it! We\'re a boutique brand, not a mass-market label. That\'s why you can only find us in select locations like Andorra. Smaller brand, better ingredients, real results. Let the demo speak for itself.\' (Reframe boutique as exclusive advantage.)',
        '\'I DON\'T BELIEVE IT WORKS\' → \'I love that you\'re skeptical — that means you\'re smart. Don\'t believe me. Believe your own eyes. Two minutes, one demo, you be the judge. If you don\'t see a difference, I\'ll be the first to say it\'s not for you. Deal?\' (Validate skepticism + challenge + low risk.)',
        '\'IT\'S PROBABLY FULL OF CHEMICALS\' → \'Actually, it\'s the opposite! 100% natural, no parabens, no chemicals, no injections. That\'s exactly why dermatologists recommend it. Want to see the ingredient list?\' (Correct with facts, not defensiveness.)'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Decision Delay Objections'
    },
    {
            type: 'bullets',
      items: [
        '\'I NEED TO ASK MY HUSBAND/WIFE\' → \'Of course! But can I ask — do you love it? Because if YOU love it, let\'s get his opinion. Sir, come see what I just showed your wife!\' (Involve the partner immediately — don\'t let them leave.)',
        '\'I\'LL THINK ABOUT IT AND COME BACK\' → \'I totally understand. But honestly? Most people who say they\'ll come back don\'t. Not because they don\'t love it — because life gets busy. And this offer is only here today. If you know you love it, why wait?\' (Gentle urgency + truth.)',
        '\'I NEED TO COMPARE PRICES\' → \'Smart shopping! But here\'s the thing — you can\'t compare this to anything else because there\'s nothing like it. And the price you see here only exists in Andorra. Once you cross that border, it\'s €500. This is a now-or-never price.\' (Tax-haven urgency.)',
        '\'I DON\'T HAVE TIME RIGHT NOW\' → \'I totally get it — you\'re busy. How about this: 60 seconds. Not even 2. I\'ll do the demo on one hand. If you don\'t feel the difference immediately, you walk away. Deal?\' (Time-bound offer removes the barrier.)'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Lifestyle & Practical Objections'
    },
    {
            type: 'bullets',
      items: [
        '\'I DON\'T HAVE TIME FOR A SKINCARE ROUTINE\' → \'That\'s exactly why you\'ll love this. It\'s once a week. Five minutes. One bottle lasts a year. It\'s the lowest time investment for the highest return in skincare. Less time than you spend brushing your teeth daily.\' (Reframe as time-saving.)',
        '\'I\'M TRAVELING AND DON\'T WANT TO CARRY MORE\' → \'Perfect timing, actually! This is exactly what your skin needs after travel — the Dead Sea minerals rehydrate brutally. And it\'s small enough for your carry-on. Plus, you can\'t get this price anywhere else. Get it now while you\'re here.\' (Turn travel into an advantage.)',
        '\'I\'M ALLERGIC TO EVERYTHING\' → \'I appreciate you telling me. The good news is this is 100% natural — no synthetic fragrances, no harsh chemicals. But let me do a small patch test on your wrist first. If there\'s any reaction, we stop immediately. Sound fair?\' (Safety first + confidence in product.)',
        '\'I NEVER BUY FROM STREET SELLERS\' → \'I totally get that! I\'m not a street seller — I\'m a brand ambassador. This is our boutique shop right here. Come inside, sit down, have a proper experience. No pressure, just results. If you don\'t love it, no problem.\' (Reframe from street to boutique.)'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Emotional Objections'
    },
    {
            type: 'bullets',
      items: [
        '\'I FEEL GUILTY SPENDING MONEY ON MYSELF\' → \'I hear this all the time. But listen — you work hard, you take care of everyone else, when was the last time you did something just for YOU? This isn\'t selfish. It\'s self-care. And you deserve it.\' (Emotional reframe — guilt into deservingness.)',
        '\'I BOUGHT SOMETHING LAST TIME AND NEVER USED IT\' → \'I totally understand. That\'s why I ask for two promises: that you\'ll actually use it, and that you\'ll tell your friends if you love it. Most of my customers text me within a week saying they\'re obsessed. I think you will too.\' (Accountability + social proof.)',
        '\'I\'M NOT THE TYPE TO BUY LUXURY THINGS\' → \'You know what? The best customers are the ones who don\'t usually splurge. Because when they do, they actually appreciate it. This isn\'t about being fancy — it\'s about feeling good when you look in the mirror. Everyone deserves that.\' (Democratize luxury.)',
        '\'MY PRODUCT AT HOME WORKS FINE\' → \'That\'s great! This doesn\'t replace what works — it makes it work BETTER. Think of it like this: you have a good car, but wouldn\'t you rather drive on a freshly paved road? This is the road. Your cream is the car. Together, perfection.\' (Complement, don\'t compete.)'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Meta-Framework for ALL Objections'
    },
    {
            type: 'paragraph',
      text: 'No matter what the objection is, follow this structure:'
    },
    {
            type: 'numbered',
      items: [
        'ACKNOWLEDGE: \'I completely understand.\' \'That\'s totally fair.\' \'I hear this all the time.\' Validation disarms defensiveness.',
        'REFRAME: Show them a different way to see the situation. Cost-per-use. Investment vs. expense. Experience vs. product.',
        'PROVIDE PROOF OR SOLUTION: Demo result, social proof, alternative option, or logical breakdown.',
        'SOFT CLOSE: \'Does that help?\' \'Which option works better?\' \'Want to see what I mean?\' Give them a path forward.'
      ]
    },
    {
            type: 'tip',
      text: 'The most powerful phrase in objection handling: \'I completely understand.\' These three words validate the customer\'s concern without agreeing with it. They create psychological safety. Once the customer feels heard, they\'re open to hearing your perspective.'
    },
    {
            type: 'quote',
      text: 'An objection is not a wall. It\'s a door with a question mark on it. Knock correctly, and it opens to a sale.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What is the four-step objection handling framework?',
      options: [
        'Argue → Convince → Pressure → Close',
        'Acknowledge → Reframe → Provide solution → Close',
        'Ignore → Discount → Give up → Walk away',
        'Agree → Agree → Agree → Accept no'
      ],
      correctIndex: 1,
      explanation: 'The framework is: Acknowledge (validate their concern), Reframe (show a new perspective), Provide solution (proof, demo, or alternative), and Close (give them a path forward).',
    },
    {
      question: 'How should you respond to \'I already have cream at home\'?',
      options: [
        'Tell them their cream is inferior',
        'Differentiate your product as a complementary prep step that makes their cream work better',
        'Offer to throw in a free cream',
        'End the conversation'
      ],
      correctIndex: 1,
      explanation: 'Don\'t compete with their cream — complement it. Position your product as the prep step that makes their existing cream work 10x better. They\'re not replacing; they\'re enhancing.',
    },
    {
      question: 'Why is \'I completely understand\' such a powerful phrase in objection handling?',
      options: [
        'It ends the conversation',
        'It validates the customer\'s concern without agreeing with it, creating psychological safety',
        'It means you agree with their objection',
        'It confuses the customer'
      ],
      correctIndex: 1,
      explanation: '\'I completely understand\' validates the customer\'s feelings without conceding the point. It creates psychological safety that opens them to hearing your perspective.',
    }
    ],
  },
  'prod-8': {
    id: 'prod-8',
    categoryId: 'products',
    title: 'The WhatsApp Close & Follow-Up',
    subtitle: 'Turning one sale into a relationship — follow-up templates, client books, and referral strategies',
    duration: '10 min',
    icon: 'MessageSquare',
    order: 8,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'The Sale Is Just the Beginning of the Relationship'
    },
    {
            type: 'paragraph',
      text: 'A one-time sale is good. A returning customer is gold. A referring customer is a gold mine. The WhatsApp close transforms a single transaction into an ongoing relationship — and relationships are where real money is made. A customer who buys once might spend €150. A customer who returns three times and refers two friends might spend €1,000+ over their lifetime. That\'s the math that matters.'
    },
    {
            type: 'keypoint',
      text: 'The WhatsApp close isn\'t just about having their number. It\'s about becoming their personal beauty advisor — the person they text when they need more product, when they have a question, when they\'re planning their next Andorra trip. You become their connection to the brand.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The WhatsApp Close: During the Sale'
    },
    {
            type: 'paragraph',
      text: 'The WhatsApp exchange should feel natural and mutual, not one-sided. Here\'s how to set it up:'
    },
    {
            type: 'numbered',
      items: [
        'THE SETUP: \'You use WhatsApp, right? Perfect.\' This assumes they use it (most people do) and frames the exchange as natural.',
        'THE EXCHANGE: \'Give me your number and I\'ll send you my contact — if you ever need anything, want to reorder, or have questions about how to use it, just message me directly.\' This positions the connection as SERVICE, not marketing.',
        'THE IMMEDIATE VALUE: Send a message RIGHT THEN while they\'re still in the shop. \'Hi [Name]! It\'s [Your Name] from Zero Lines in Andorra. Here\'s my number — save it! If you need anything at all, I\'m here. Enjoy your new products!\' This confirms the number works and establishes the channel immediately.',
        'THE TWO PROMISES: \'Promise me two things: you\'ll actually use it, and if you love it, you\'ll tell your friends about us.\' These two promises create accountability and plant the referral seed.'
      ]
    },
    {
            type: 'script',
      text: '\'You use WhatsApp, right? Perfect. Give me your number — I\'ll send you my contact right now. If you ever need to reorder, have questions about how to use it, or just want to say hi when you\'re back in Andorra, I\'m here. Here\'s my number too. We\'re officially friends now!\' [Send message immediately while they\'re in the shop.]'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Follow-Up Message Templates'
    },
    {
            type: 'paragraph',
      text: 'These are word-for-word templates you can use. Adapt them to your voice:'
    },
    {
            type: 'bullets',
      items: [
        'DAY 1 — THE CHECK-IN: \'Hi [Name]! Hope you\'re enjoying Andorra. Just wanted to check — did you try the [product] yet? Any questions? I\'m here if you need me!\' (Shows you care, opens dialogue.)',
        'DAY 3 — THE TIP: \'Hey [Name]! Pro tip for the [product]: use it at night before bed so it has time to work its magic while you sleep. Let me know how it goes!\' (Adds value, keeps connection alive.)',
        'DAY 7 — THE LOVE CHECK: \'Hi [Name]! It\'s been a week — how are you loving the [product]? Have people noticed the difference? I bet they have!\' (Encourages them to reflect on results and share positive feelings.)',
        'DAY 14 — THE REORDER NUDGE: \'Hey [Name]! If you\'re running low on anything or want to grab another before your next trip, just let me know. I can hold something for you!\' (Plants the reorder seed without pressure.)',
        'MONTH 3 — THE RETURNING CUSTOMER: \'Hi [Name]! Missing Andorra yet? When you\'re planning your next trip, let me know — I have some new products I think you\'ll love. Plus, I\'ll have a little surprise waiting for you!\' (Creates anticipation for return visit.)'
      ]
    },
    {
            type: 'tip',
      text: 'Space your messages appropriately. One message in the first week, then one more after two weeks, then monthly at most. Too many messages feels spammy. Too few feels forgotten. Quality over quantity.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Building Your Client Book'
    },
    {
            type: 'paragraph',
      text: 'A client book is your most valuable sales asset. It\'s your personal database of customers who know, like, and trust you. Here\'s how to build and manage it:'
    },
    {
            type: 'bullets',
      items: [
        'SAVE EVERY NUMBER: Every customer who gives you their WhatsApp goes into your client book. No exceptions. Even the small €30 scrub buyers.',
        'ADD NOTES: After each sale, add a quick note: \'Maria — bought syringe, from Madrid, skiing trip, husband was skeptical but loved the result.\' These notes make future conversations personal.',
        'SEGMENT YOUR LIST: Mark customers by product purchased, location, and buying behavior. Your syringe customers are different from your scrub customers. Your gift buyers are different from your self-buyers.',
        'TRACK INTERACTIONS: Note who responded, who didn\'t, who asked questions, who referred friends. This data tells you who your best relationship customers are.'
      ]
    },
    {
            type: 'script',
      text: 'After each sale, quickly note in your phone: \'Name: Maria. Product: Syringe Option 1. From: Madrid. Trip: Skiing. Notes: Husband loved the result, buying for daughter next time. Follow up: Day 3, Day 7.\' This takes 30 seconds and pays dividends.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Return Customer Techniques'
    },
    {
            type: 'paragraph',
      text: 'Getting a customer to return is significantly easier than finding a new one. Here\'s how to encourage repeat visits:'
    },
    {
            type: 'bullets',
      items: [
        'THE EXCLUSIVE RETURN OFFER: \'When you come back, mention my name and I\'ll have a little something special waiting for you.\' Creates anticipation and exclusivity.',
        'THE NEW PRODUCT TEASE: \'We\'re getting a new line next month that I think you\'ll love. I\'ll message you when it arrives.\' Gives them a reason to stay connected.',
        'THE COMPLEMENTARY PRODUCT SUGGESTION: \'You have the syringe for your eyes. Next time, try the peeling for your face — they\'re incredible together.\' Plants the seed for an upsell on their return.',
        'THE PERSONAL CONNECTION: Remember details. \'How was your ski trip?\' \'Did your daughter like the Nail Kit?\' Personal memory creates loyalty stronger than any discount.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Asking for Referrals'
    },
    {
            type: 'paragraph',
      text: 'Referrals are the highest-quality leads you can get. A referred customer trusts you before they even meet you. Here\'s how to ask:'
    },
    {
            type: 'numbered',
      items: [
        'THE IMMEDIATE ASK: During the two promises at close: \'If you love it, tell your friends about us.\' This plants the seed.',
        'THE RESULTS-BASED ASK: After they text you positively: \'I\'m so glad you love it! If you have any friends who\'d enjoy the same result, send them my way. I\'ll take great care of them too.\'',
        'THE INCENTIVIZED ASK: \'Refer a friend who buys something, and next time you\'re in, I\'ll have a free gift waiting for you.\' Small incentive creates reciprocity.',
        'THE SOCIAL PROOF ASK: \'Most of my new customers come from referrals. If you know anyone heading to Andorra, I\'d love to meet them!\' Makes asking feel natural, not salesy.'
      ]
    },
    {
            type: 'tip',
      text: 'The best time to ask for a referral is immediately after a customer expresses happiness. When they text \'I love the syringe!\' — that\'s your moment. Strike while the emotional high is fresh.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'What NOT to Do on WhatsApp'
    },
    {
            type: 'bullets',
      items: [
        'DON\'T SPAM: One message per week MAX. Unsolicited daily messages get you blocked.',
        'DON\'T BE TOO SALESY: Lead with value, care, and tips. Sales messages should be 1 in 5, not 5 in 5.',
        'DON\'T IGNORE RESPONSES: If they reply, reply back. A conversation is two-way.',
        'DON\'T SHARE THEIR NUMBER: Never give a customer\'s contact to colleagues or managers without permission. Trust is everything.',
        'DON\'T MESSAGE AT ODD HOURS: Respect their time zone. A 11pm message feels invasive.'
      ]
    },
    {
            type: 'quote',
      text: 'A customer who leaves with your WhatsApp number doesn\'t just leave with a product. They leave with a relationship. And relationships are the only thing that compounds in sales.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'Why is the WhatsApp close valuable beyond the initial sale?',
      options: [
        'It\'s required by the company',
        'It transforms a one-time transaction into an ongoing relationship with repeat and referral potential',
        'It gives you more work to do',
        'Customers prefer text over talking'
      ],
      correctIndex: 1,
      explanation: 'The WhatsApp close creates an ongoing channel for reordering, questions, and referrals. A returning customer is worth significantly more than a one-time buyer, and referred customers trust you before they even meet you.',
    },
    {
      question: 'What is the most important principle for WhatsApp follow-up messages?',
      options: [
        'Send as many messages as possible',
        'Lead with value and care; sales messages should be rare',
        'Only message when you have a sale to announce',
        'Copy and paste the same message to everyone'
      ],
      correctIndex: 1,
      explanation: 'WhatsApp follow-up should lead with value, tips, and genuine care. Sales messages should be the minority. Too many sales-focused messages feel spammy and get you blocked.',
    },
    {
      question: 'When is the best time to ask for a referral?',
      options: [
        'Before they buy anything',
        'Immediately after they express happiness with the product',
        'Six months after the sale',
        'Never — referrals happen naturally'
      ],
      correctIndex: 1,
      explanation: 'The best time to ask for a referral is when the customer is emotionally high — right after they text you positively about the product. Strike while their enthusiasm is fresh and genuine.',
    }
    ],
  },
  'psych-1': {
    id: 'psych-1',
    categoryId: 'psychology',
    title: 'The \'Luxury Aggressor\' Identity',
    subtitle: 'How to think of yourself as a premium brand ambassador, not a pushy seller',
    duration: '8 min',
    icon: 'Crown',
    order: 1,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'You Are Not a Pushy Seller. You Are a Curator of Transformation.'
    },
    {
            type: 'paragraph',
      text: 'The word \'aggressive\' scares people. But in luxury sales, aggression doesn\'t mean pushing — it means approaching with certainty. You are not begging. You are offering a carefully selected experience to someone who deserves it. The \'Luxury Aggressor\' is someone who combines the fearlessness of street sales with the polish of a Tiffany & Co. ambassador.'
    },
    {
            type: 'keypoint',
      text: 'The mindset shift: You\'re not interrupting someone\'s day — you\'re enhancing it. The products you sell deliver visible, immediate results. You\'re doing them a favor by stopping them.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Three Pillars of the Luxury Aggressor'
    },
    {
            type: 'numbered',
      items: [
        'CERTAINTY: You know the product works. You\'ve seen the reactions. That belief radiates from you before you open your mouth.',
        'PRESENCE: You stand tall. You make eye contact. Your voice is clear and warm. You occupy space like you belong there — because you do.',
        'SELECTIVITY: You\'re not desperate. You choose who to stop. You assess, you approach, you invite. This posture of selectivity makes customers feel special when you DO approach them.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Identity Reframe Exercise'
    },
    {
            type: 'paragraph',
      text: 'Before your next shift, stand in front of a mirror and say this out loud:'
    },
    {
            type: 'script',
      text: '\'I am the gatekeeper to an exclusive experience. I don\'t chase — I invite. My products transform how people look and feel. When I stop someone, I\'m offering them something most tourists walk right past. I am a Luxury Aggressor.\''
    },
    {
            type: 'tip',
      text: 'Say it even if it feels silly. Your brain doesn\'t know the difference between practiced confidence and real confidence. After a week of this, it becomes who you are.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Practical Techniques'
    },
    {
            type: 'bullets',
      items: [
        'Dress the part: Your appearance is your first credibility signal. Polish your shoes. Style your hair. Look like you belong in a premium boutique — because you do.',
        'Language matters: Say \'I\'d love to show you something\' not \'Can I show you something?\' The first is an invitation. The second is a question they can reject.',
        'Posture check: Shoulders back, chin up, smile in your eyes. Practice power poses in the stockroom before your shift.',
        'The pause: After you deliver your opener, pause. Let silence work. The Luxury Aggressor doesn\'t rush — they command attention, then let it land.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When Rejection Hits'
    },
    {
            type: 'paragraph',
      text: 'Even the Luxury Aggressor gets ignored. The difference? They don\'t flinch. A rejected invitation isn\'t a reflection on you — it\'s a reflection on their timing, mood, or preoccupations. Maintain your posture. Smile at the next person. Your energy doesn\'t dip because one person said no.'
    },
    {
            type: 'quote',
      text: 'The difference between a pushy seller and a luxury ambassador is belief. The pushy seller hopes someone will buy. The ambassador knows they will.',
      attribution: 'Zero Lines Method'
    },
    {
            type: 'tip',
      text: 'Watch videos of luxury retail staff at stores like Chanel, Dior, or high-end jewelers. Notice how they move, how they stand, how they speak. Copy what feels natural. Adapt it to your energy.'
    }
    ],
    quiz: [
    {
      question: 'What are the three pillars of the \'Luxury Aggressor\' identity?',
      options: [
        'Confidence, Speed, Volume',
        'Certainty, Presence, Selectivity',
        'Charm, Beauty, Intelligence',
        'Aggression, Persistence, Volume'
      ],
      correctIndex: 1,
      explanation: 'The three pillars are Certainty (belief in the product), Presence (how you carry yourself), and Selectivity (choosing who to approach with confidence, not desperation).',
    },
    {
      question: 'Why does the \'Luxury Aggressor\' use statements instead of questions when approaching?',
      options: [
        'Because questions are rude',
        'Because statements command while questions invite rejection',
        'Because customers prefer orders',
        'Because it\'s faster'
      ],
      correctIndex: 1,
      explanation: 'Questions like \'Can I show you something?\' give the customer an easy escape (\'No thanks\'). Statements like \'I\'ll show you something amazing\' lead the customer rather than asking permission.',
    },
    {
      question: 'What should you do after delivering your opening line?',
      options: [
        'Keep talking to fill silence',
        'Immediately show the product',
        'Pause and let silence work',
        'Ask another question'
      ],
      correctIndex: 2,
      explanation: 'The Luxury Aggressor pauses after the opener. Silence creates anticipation and shows confidence. Rushing signals nervousness.',
    }
    ],
  },
  'psych-2': {
    id: 'psych-2',
    categoryId: 'psychology',
    title: 'Energy is Your #1 Weapon',
    subtitle: 'Managing energy throughout a shift — rituals, micro-breaks, and the art of faking it till you make it',
    duration: '8 min',
    icon: 'Zap',
    order: 2,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Energy Sells Before Words Do'
    },
    {
            type: 'paragraph',
      text: 'Customers feel your energy from 5 meters away. Before they hear your voice, before they see your smile, they sense your vibration. Tired, heavy energy repels. Light, excited energy attracts. This isn\'t mystical — it\'s neuroscience. Humans have mirror neurons that cause us to emotionally sync with people around us. Your mood literally becomes their mood.'
    },
    {
            type: 'keypoint',
      text: 'Energy is more important than script, product knowledge, or pricing. A salesperson with great energy and average skills will outsell a tired expert every single time.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Energy Lifecycle of a Shift'
    },
    {
            type: 'paragraph',
      text: 'Most salespeople\'s energy follows a predictable curve: high at opening, dipping after the first hour, crashing mid-day, then a small recovery before closing. Top performers break this curve deliberately. Here\'s how:'
    },
    {
            type: 'numbered',
      items: [
        'PRE-SHIFT (30 min before): Fuel your body. Eat a light, protein-rich meal — not heavy carbs that make you sluggish. Hydrate. Listen to music that pumps you up. Do 2 minutes of jumping jacks or shadow boxing to wake up your nervous system.',
        'OPENING HOUR (peak alertness): Use this wisely. Your first stops set the tone for the whole day. Smile at EVERY person who passes, even if you don\'t stop them. This builds momentum.',
        'MID-MORNING (first dip): This is when the 4-minute rotation saves you. Use your inside time to recharge — not by scrolling your phone, but by taking 5 deep breaths, drinking water, and celebrating any small win so far.',
        'LUNCH PERIOD: Eat light. A heavy meal will kill your afternoon. Salads, protein, fruit. Avoid the pasta and bread trap.',
        'AFTERNOON SAG (the danger zone 2-4pm): This is where sales are won or lost. Stand up straighter. Move faster. Speak louder. Consciously elevate every physical action — your brain follows your body.',
        'POWER HOUR (last 90 minutes): End strong. The final push of the day often has the best customers — they\'re done shopping and ready to be sold to. Bring everything you have left.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The 4-Minute Rotation Advantage'
    },
    {
            type: 'paragraph',
      text: 'The 4-minute door rotation isn\'t just fair — it\'s energy management genius. Knowing you only have 4 minutes outside before switching keeps your intensity high. It\'s like interval training for sales. You sprint, recover, sprint again. This prevents the burnout that kills most street sellers by hour 3.'
    },
    {
            type: 'tip',
      text: 'During your 4 minutes outside, give 100% energy to every person you stop. During your inside time, consciously lower your shoulders, unclench your jaw, and breathe. This oscillation keeps you fresh all day.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Fake It Till You Make It\' Technique'
    },
    {
            type: 'paragraph',
      text: 'Some days you just don\'t have it. You didn\'t sleep well. You\'re fighting with your partner. You\'re hungover. Here\'s the truth: your body can trick your brain. Research shows that acting energetic actually creates energy. Stand tall → feel more confident. Smile → feel happier. Speak loudly → feel more alert.'
    },
    {
            type: 'script',
      text: '\'Even on my worst days, I play a character. I am High-Energy Salesperson. I smile bigger. I move faster. I speak with more enthusiasm. And within 30 minutes, I\'m not playing anymore — I actually feel it.\''
    },
    {
            type: 'bullets',
      items: [
        'POWER POSE: Before your shift, stand with hands on hips and chest open for 2 minutes. It literally changes your cortisol/testosterone balance.',
        'THE SMILE LOOP: Force a wide smile for 10 seconds. Your brain releases dopamine and serotonin. Repeat every hour.',
        'MUSIC TRIGGERS: Create a 3-song playlist that always hypes you up. Listen during breaks.',
        'VOICE PROJECTION: Speak 20% louder than normal. Projecting energy through your voice makes you feel more energetic.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Hydration, Nutrition & Physical Maintenance'
    },
    {
            type: 'paragraph',
      text: 'Coffee is not hydration. Energy drinks create crashes. Sugar spikes then drops. The best fuel for a sales shift is:'
    },
    {
            type: 'bullets',
      items: [
        'Water: Drink at least 500ml every 2 hours. Dehydration is the #1 cause of afternoon fatigue.',
        'Protein snacks: Nuts, protein bars, boiled eggs. Sustained energy without the crash.',
        'Fresh fruit: Natural sugars for quick energy plus fiber to prevent crashes.',
        'Avoid heavy lunches: They redirect blood from your brain to your stomach. You\'ll feel foggy and slow.'
      ]
    },
    {
            type: 'tip',
      text: 'Bring a water bottle to the floor. Sip between customers. Being well-hydrated improves your voice quality, skin appearance, and mental sharpness — all things customers notice subconsciously.'
    },
    {
            type: 'quote',
      text: 'Your energy introduces you before you even speak. Make sure it\'s saying the right thing.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'Why is the 4-minute rotation system effective for energy management?',
      options: [
        'It gives you more breaks',
        'It works like interval training — high intensity followed by recovery',
        'It lets you check your phone',
        'It reduces the number of customers you need to stop'
      ],
      correctIndex: 1,
      explanation: 'The 4-minute rotation creates an interval-training effect. You give 100% energy for 4 minutes, then recover inside. This oscillation prevents the burnout that kills performance.',
    },
    {
      question: 'What should you eat during your lunch break to maintain afternoon energy?',
      options: [
        'Pasta and bread for carbs',
        'A heavy meal to feel satisfied',
        'Light protein, salads, and fruit',
        'Skip lunch to stay sharp'
      ],
      correctIndex: 2,
      explanation: 'Heavy meals redirect blood from your brain to your stomach, causing afternoon fog. Light protein, salads, and fruit provide sustained energy without the crash.',
    },
    {
      question: 'How does \'faking\' energy actually work according to psychological research?',
      options: [
        'It doesn\'t work — customers can tell',
        'Your body can trick your brain into actually feeling more energetic',
        'It only works for experienced sellers',
        'It\'s about lying to yourself'
      ],
      correctIndex: 1,
      explanation: 'Research on embodied cognition shows that acting energetic (power poses, smiling, speaking loudly) actually changes your brain chemistry and creates real energy.',
    }
    ],
  },
  'psych-3': {
    id: 'psych-3',
    categoryId: 'psychology',
    title: 'Confidence When You Don\'t Feel It',
    subtitle: 'Body language hacks, the \'act as if\' technique, and why customers can smell insecurity',
    duration: '10 min',
    icon: 'Shield',
    order: 3,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Confidence Is a Skill, Not a Trait'
    },
    {
            type: 'paragraph',
      text: 'The most dangerous myth in sales is that confident people are \'born that way.\' Nonsense. Confidence is a set of behaviors practiced until they become automatic. Every \'naturally confident\' salesperson you admire has bombed hundreds of times. The difference is they kept going until confidence became their default setting.'
    },
    {
            type: 'keypoint',
      text: 'Customers don\'t buy from people who seem unsure. If you hesitate, if your voice shakes, if you avoid eye contact — the customer feels that something is wrong, even if they can\'t name it. Confidence is the container that makes everything else you do work.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Body Language Hacks'
    },
    {
            type: 'paragraph',
      text: 'Your body speaks louder than your words. Before you even open your mouth, customers have judged your credibility from your posture, movement, and facial expression. Here are the specific adjustments that create instant confidence perception:'
    },
    {
            type: 'bullets',
      items: [
        'SHOULDER POSITION: Roll your shoulders back and down. This opens your chest, improves breathing, and signals dominance without aggression. Practice this every time you walk through the door.',
        'EYE CONTACT: Maintain eye contact for 2-3 seconds at a time. Breaking eye contact too quickly signals nervousness. Holding too long feels aggressive. The sweet spot is brief, confident connection.',
        'SMILE WITH YOUR EYES: A genuine smile crinkles the corners of your eyes (Duchenne smile). A fake mouth-only smile triggers customer\'s distrust. Think of something that genuinely makes you happy before you approach.',
        'OPEN PALMS: Keep your hands visible with palms slightly open. This is an ancient biological signal of \'I have no weapons.\' It triggers subconscious trust.',
        'SLOW MOVEMENTS: Nervous people move quickly and jerkily. Confident people move deliberately. Slow your gestures by 20%. Pause between movements.',
        'STABLE POSTURE: Avoid shifting your weight from foot to foot. Plant your feet shoulder-width apart. This \'grounded\' posture signals stability and certainty.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Act As If\' Technique'
    },
    {
            type: 'paragraph',
      text: 'Pick the most confident salesperson you know — at your shop, in a luxury store, or even a character from a movie. Study them. How do they stand? How do they speak? What would THEY do in your situation? Then act as if you are them.'
    },
    {
            type: 'script',
      text: '\'When I first started, I wasn\'t confident at all. So I picked a character — I imagined I was a famous actress playing the role of a badass saleswoman. I copied her posture, her voice, her walk. After two weeks, I wasn\'t acting anymore. I had become her.\''
    },
    {
            type: 'tip',
      text: 'This is not about being fake. It\'s about rapid behavioral learning. By mimicking confident behaviors, you build the neural pathways that make confidence natural. Within 30 days of consistent practice, the \'act\' becomes authentic.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Confidence Through Preparation'
    },
    {
            type: 'paragraph',
      text: 'The deepest source of confidence is knowing you\'re ready. A prepared salesperson walks differently. They know they can handle any question, any objection, any situation. Here\'s your preparation checklist:'
    },
    {
            type: 'checklist',
      items: [
        'I can pitch all 4 products from memory without hesitation',
        'I know every price point and offer combination by heart',
        'I have 3 different openers for each product ready to go',
        'I\'ve practiced the demo on myself or a teammate until it\'s smooth',
        'I know 5 common objections and my responses to each',
        'I\'ve rehearsed my voucher close until it feels natural',
        'I know my daily target and my personal best — and I\'m committed to beating it'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Vocal Confidence Techniques'
    },
    {
            type: 'bullets',
      items: [
        'VOLUME: Speak 15-20% louder than your normal conversational voice. Quiet voices signal uncertainty. Projected voices command attention.',
        'PACE: Nervous people talk fast. Slow your speech by 20%. Pauses feel longer to you than to the listener. A 2-second pause sounds thoughtful, not awkward.',
        'TONE DOWN: End sentences with a slightly lower pitch. Upspeak (rising intonation at the end of statements) sounds like you\'re asking a question, which undermines authority.',
        'BREATHING: Take a full breath before speaking. Shallow breathing creates shaky voices. Deep diaphragmatic breathing creates resonance and stability.'
      ]
    },
    {
            type: 'tip',
      text: 'Record yourself pitching on your phone. Listen back. Most people are shocked at how uncertain they sound. Do this weekly and track your improvement. Within a month, you\'ll hear the transformation.'
    },
    {
            type: 'quote',
      text: 'Confidence is not \'they will like me.\' Confidence is \'I\'ll be fine if they don\'t.\'',
      attribution: 'Zero Lines Method'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'What to Do When Confidence Crashes'
    },
    {
            type: 'paragraph',
      text: 'Everyone has moments where their confidence evaporates — a string of rejections, a rude customer, a bad demo. When this happens, you need an emergency protocol:'
    },
    {
            type: 'numbered',
      items: [
        'STEP AWAY: Ask for a quick 2-minute bathroom break. Splash cold water on your face. The physical reset triggers a mental reset.',
        'RECALL A WIN: Think of your best sale ever. Feel that moment again. Remember that you ARE capable.',
        'ADJUST ONE THING: Don\'t try to fix everything. Pick ONE behavior — maybe your posture, maybe your smile — and focus only on that for the next 3 customers.',
        'LOWER THE STAKES: Tell yourself \'I\'m just practicing.\' This removes the pressure and lets you be playful again.'
      ]
    },
    {
            type: 'tip',
      text: 'Create a \'confidence anchor\' — a physical gesture paired with a powerful memory. For example, touching your thumb and forefinger together while remembering your best sale. After practicing this 20 times, the gesture alone triggers confidence.'
    }
    ],
    quiz: [
    {
      question: 'What is the ideal duration for maintaining eye contact with a customer?',
      options: [
        'As long as possible to show dominance',
        'Brief glances to avoid intimidation',
        '2-3 seconds at a time',
        'Only when closing the sale'
      ],
      correctIndex: 2,
      explanation: 'The sweet spot for eye contact is 2-3 seconds at a time. Too short signals nervousness; too long feels aggressive. Brief, confident connection builds trust.',
    },
    {
      question: 'Why is upspeak (rising intonation at the end of statements) harmful in sales?',
      options: [
        'It makes you sound friendly',
        'It undermines your authority by making statements sound like questions',
        'It\'s harder for customers to hear',
        'It\'s culturally inappropriate'
      ],
      correctIndex: 1,
      explanation: 'Upspeak makes statements sound like questions, which subconsciously undermines your authority and certainty. End sentences with a stable or slightly lower pitch.',
    },
    {
      question: 'What is the purpose of a \'confidence anchor\'?',
      options: [
        'To impress customers with jewelry',
        'To trigger a confident state through a practiced physical gesture',
        'To show your rank in the company',
        'To remember your sales targets'
      ],
      correctIndex: 1,
      explanation: 'A confidence anchor is a physical gesture paired with a powerful memory that, after repeated practice, can trigger a confident state on demand.',
    }
    ],
  },
  'psych-4': {
    id: 'psych-4',
    categoryId: 'psychology',
    title: 'Rejection-Proof Mindset',
    subtitle: 'Why \'no\' is training. The numbers game. How top sellers process rejection.',
    duration: '8 min',
    icon: 'Shield',
    order: 4,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Every \'No\' Is a Step Closer to \'Yes\''
    },
    {
            type: 'paragraph',
      text: 'If you stop 100 people in a day, and 80 ignore you, 15 say \'no thanks,\' and 5 buy — you\'ve had a GREAT day. But most people don\'t see the 95 rejections as the path to 5 wins. They see 95 failures. That perspective destroys performance. The rejection-proof mindset sees every interaction as data, not drama.'
    },
    {
            type: 'keypoint',
      text: 'Top performers know their numbers. If your close rate is 5%, then every \'no\' is 5% of a \'yes.\' A string of 10 rejections isn\'t failure — it\'s statistical progress toward your next sale.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reframe: The Baseball Batting Average'
    },
    {
            type: 'paragraph',
      text: 'The best baseball hitters in history fail 70% of the time. A .300 batting average — failing 7 out of 10 times — is considered excellent. In sales, a 5-10% close rate makes you a top earner. You\'re not failing 90-95% of the time. You\'re succeeding at a rate that most people would consider elite performance.'
    },
    {
            type: 'comparison',
      left: { label: 'Amateur Mindset', text: '\'I\'m terrible. 20 people said no today. I suck at this. Maybe I\'m not cut out for sales.\' Each rejection feels personal and builds a story of failure.' },
      right: { label: 'Pro Mindset', text: '\'20 rejections today means I\'m 20% closer to my next close. My ratio holds at 1 in 15. Two more stops and I\'ll likely hit a sale.\' Each rejection is data confirming the ratio.' }
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Next One\' Mentality'
    },
    {
            type: 'paragraph',
      text: 'The most powerful mental habit in sales is instantaneous reset. The moment a customer walks away, that interaction is erased. It doesn\'t exist anymore. Your total focus shifts to the next person approaching. This is how top sellers maintain energy through 8 hours of rejection.'
    },
    {
            type: 'script',
      text: '\'I used to replay every rejection in my head. I\'d still be thinking about the rude woman from 20 minutes ago while missing the friendly couple right in front of me. Now I have a rule: the moment someone walks away, I literally say \'next\' under my breath. It clears my mental slate.\''
    },
    {
            type: 'tip',
      text: 'Practice the \'next\' technique literally. After every rejection — verbal or just being ignored — say the word \'next\' quietly to yourself. This creates a mental reset ritual that becomes automatic.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Why Customers Say No (Hint: It\'s Almost Never About You)'
    },
    {
            type: 'bullets',
      items: [
        'They\'re in a hurry: Meeting, reservation, tired from shopping. Nothing you could have done.',
        'They just spent money: Budget exhaustion is real. The best pitch in the world won\'t open an empty wallet.',
        'They\'re not in a buying mood today: Some days people browse. Same person might buy enthusiastically tomorrow.',
        'They had a bad experience with a previous salesperson: You\'re paying for someone else\'s mistake.',
        'They don\'t buy anything on vacation: Some people have a \'no purchases while traveling\' rule.',
        'They\'re overwhelmed: Too many options, too much information. They shut down.',
        'Personal problems: Fights, health issues, stress. They\'re not really there.'
      ]
    },
    {
            type: 'keypoint',
      text: 'When you internalize that rejection is almost never personal, you stop carrying it. The customer isn\'t rejecting YOU. They\'re rejecting the interaction, the timing, or their own readiness.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'How Top Sellers Process a Bad Day'
    },
    {
            type: 'paragraph',
      text: 'Even the best have terrible days. Here\'s the protocol that separates pros from amateurs:'
    },
    {
            type: 'numbered',
      items: [
        'DON\'T TAKE IT HOME: The moment you clock out, the day is done. Don\'t replay rejections in your head all evening. That day doesn\'t exist anymore.',
        'FIND ONE WIN: Even on the worst day, find ONE thing you did well. Maybe your opener was smooth. Maybe your demo was great even though they didn\'t buy. Focus on that.',
        'ANALYZE PATTERNS: If you\'re getting rejected more than usual, look for patterns. Is your energy low? Are you stopping the wrong people? Is your opener tired? Fix the mechanics, not your self-worth.',
        'SLEEP IT OFF: A bad day feels like a crisis at 6pm and often feels like nothing the next morning. Never make career decisions based on one bad shift.',
        'TALK TO TEAMMATES: Everyone has bad days. Sharing yours normalizes it. Hearing that your colleague also got rejected 30 times makes you feel less alone.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Turning a Bad Day Around'
    },
    {
            type: 'paragraph',
      text: 'Sometimes you can actually SAVE a bad day. Here\'s the emergency turnaround protocol:'
    },
    {
            type: 'bullets',
      items: [
        'CHANGE ONE THING: If you\'ve been using the same opener all day and getting rejected, switch it completely. New energy breaks the pattern.',
        'TARGET DIFFERENT PEOPLE: If you\'ve been stopping solo women and failing, try couples. Or vice versa. Different demographics respond to different energies.',
        'GO BACK TO BASICS: When everything falls apart, simplify. Stop overthinking. Smile, make eye contact, deliver your cleanest opener. Fundamentals fix slumps.',
        'ASK A TEAMMATE TO WATCH YOU: Sometimes you have a blind spot. A colleague might notice you\'re rushing, or your posture has collapsed, or you\'re not making eye contact. External feedback is gold.'
      ]
    },
    {
            type: 'quote',
      text: 'The only difference between a top seller and a quitter is that the top seller kept going through the days they wanted to quit.',
      attribution: 'Zero Lines Method'
    },
    {
            type: 'tip',
      text: 'Track your numbers daily. Write down: stops, demos, closes, total revenue. Over time, you\'ll see your personal ratio. When you KNOW that you close 1 in 15, the 14 rejections before your next sale become... expected. Peaceful, even.'
    }
    ],
    quiz: [
    {
      question: 'If your close rate is 5%, how should you view a string of 10 rejections?',
      options: [
        'As proof you\'re having a bad day',
        'As statistical progress toward your next sale',
        'As a sign you need to change your pitch completely',
        'As a reason to take a long break'
      ],
      correctIndex: 1,
      explanation: 'With a 5% close rate, every \'no\' is simply 5% of a \'yes.\' A string of rejections is expected statistical progress toward your next close, not evidence of failure.',
    },
    {
      question: 'What is the \'next one\' mentality?',
      options: [
        'Always focusing on the next customer while ignoring the current one',
        'Instantly resetting your focus to the next person after each rejection',
        'Trying to stop the next person you see regardless of quality',
        'Planning your next day during your shift'
      ],
      correctIndex: 1,
      explanation: 'The \'next one\' mentality is an instantaneous mental reset. The moment a customer walks away, that interaction is erased and total focus shifts to the next person approaching.',
    },
    {
      question: 'Which of these is the LEAST likely reason a customer says \'no\'?',
      options: [
        'They\'re in a hurry or have a reservation',
        'They don\'t buy anything while traveling',
        'You personally are unlikeable',
        'They\'re overwhelmed from shopping'
      ],
      correctIndex: 2,
      explanation: 'Rejection is almost never personal. Customers say no due to timing, budget, mood, travel habits, or overwhelm. Believing it\'s about your personality is the amateur mindset that destroys performance.',
    }
    ],
  },
  'psych-5': {
    id: 'psych-5',
    categoryId: 'psychology',
    title: 'The Mirror Effect',
    subtitle: 'Emotional contagion. Why YOUR mood becomes THEIR mood. The shop as an energy ecosystem.',
    duration: '8 min',
    icon: 'Heart',
    order: 5,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Your Mood Is Contagious — Choose What You Spread'
    },
    {
            type: 'paragraph',
      text: 'Have you ever walked into a room and instantly felt tense? Or walked into another room and felt relaxed? That\'s emotional contagion — the phenomenon where humans automatically \'catch\' the emotions of those around them. On the sales floor, YOU are the source of emotional contagion. Your frustration, excitement, calm, or anxiety spreads to customers like a virus.'
    },
    {
            type: 'keypoint',
      text: 'Emotional contagion happens through micro-expressions, vocal tone, body posture, and even pheromones. Customers don\'t consciously read your mood — they FEEL it. A frustrated seller creates guarded customers. An excited seller creates curious customers.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Science of Emotional Contagion'
    },
    {
            type: 'paragraph',
      text: 'Research by psychologists Elaine Hatfield and others shows that emotional contagion occurs in three stages: mimicry (unconsciously copying facial expressions), feedback (your brain reads your own facial expression and generates matching emotions), and synchronization (both people end up in the same emotional state).'
    },
    {
            type: 'paragraph',
      text: 'When you approach a customer with tight facial muscles and a flat voice, they unconsciously mirror that tension. Their guard goes up. When you approach with genuine warmth and energy, they mirror that openness. The sale becomes possible.'
    },
    {
            type: 'tip',
      text: 'Before you approach ANY customer, check your face. Are you smiling? Is your forehead relaxed? Are your eyes soft? Customers decide whether to trust you in the first 2 seconds — mostly from your facial expression.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Managing Frustration on the Floor'
    },
    {
            type: 'paragraph',
      text: 'Frustration is the most dangerous emotion on the sales floor. It spreads fast and kills sales. After three rejections in a row, frustration builds. Your shoulders tense. Your smile fades. Your voice tightens. Now the fourth customer feels that heaviness and rejects you too. It\'s a spiral.'
    },
    {
            type: 'bullets',
      items: [
        'RECOGNIZE THE SPIRAL: The first step is awareness. Notice when your shoulders tense, when your breathing becomes shallow, when you start thinking \'this is pointless.\'',
        'BREAK THE PHYSICAL PATTERN: Frustration lives in your body. Shake your hands out. Roll your shoulders. Take 3 deep breaths. Physical reset creates emotional reset.',
        'CHANGE YOUR SELF-TALK: Instead of \'this sucks,\' try \'I\'m due for a win.\' Instead of \'nobody\'s buying today,\' try \'the right customer is coming.\' Your brain believes what you tell it.',
        'SEEK POSITIVE INPUT: Talk to an upbeat teammate. Their energy will pull you out of the frustration spiral. Energy is contagious in BOTH directions.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Excitement vs. Calm: When to Use Which'
    },
    {
            type: 'comparison',
      left: { label: 'High Energy / Excitement', text: 'Best for: Groups, holiday shoppers, first sales of the day, younger customers, high-traffic periods. Creates urgency and fun. Risks: Can overwhelm introverts or analytical buyers. Can feel pushy if overdone.' },
      right: { label: 'Calm / Warm Energy', text: 'Best for: Couples, older customers, serious buyers, afternoon lulls, luxury positioning. Creates trust and sophistication. Risks: Can feel low-energy if you\'re not genuinely present. Requires excellent listening skills.' }
    },
    {
            type: 'tip',
      text: 'Match the customer\'s energy, then slightly elevate it. If they\'re calm and thoughtful, be calm and warm — but with a spark of enthusiasm. If they\'re energetic and laughing, match that energy and add 10%. This creates comfortable rapport that pulls them toward buying.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Shop as an Energy Ecosystem'
    },
    {
            type: 'paragraph',
      text: 'The shop isn\'t just a collection of individuals — it\'s an energy ecosystem. When one person is closing a sale with excitement, that energy lifts everyone. When one person is slumped and frustrated, that energy drags everyone down. Top shops understand this and protect the collective energy fiercely.'
    },
    {
            type: 'bullets',
      items: [
        'CELEBRATE WINS LOUDLY: When a teammate closes, cheer for them. The celebration creates positive emotional contagion for the whole shop.',
        'NEVER VENT ON THE FLOOR: If you need to complain, do it in the back room. Complaining in the customer area poisons the energy ecosystem.',
        'HELP THE STRUGGLING TEAMMATE: If you see a colleague\'s energy crashing, switch with them. Give them a moment to reset. The whole shop benefits when everyone\'s energy is up.',
        'PROTECT THE FIRST HOUR: No breaks, no negativity, no slacking in the first hour. It sets the energy tone for the entire day.'
      ]
    },
    {
            type: 'quote',
      text: 'You\'re not just selling a product. You\'re selling a feeling. And the feeling starts with you.',
      attribution: 'Zero Lines Method'
    },
    {
            type: 'subheader',
      text: 'Daily Energy Audit'
    },
    {
            type: 'paragraph',
      text: 'At the end of each shift, ask yourself these three questions:'
    },
    {
            type: 'numbered',
      items: [
        'What energy did I bring to the floor today? Was I excited, calm, frustrated, distracted?',
        'How did customers respond to my energy? Were they open and warm, or guarded and distant?',
        'What one thing can I do tomorrow to bring better energy? (Sleep earlier, eat better, listen to music, talk to a friend before work?)'
      ]
    },
    {
            type: 'tip',
      text: 'Keep a small notebook and track your mood and your sales for two weeks. You\'ll likely discover a clear pattern: your best sales days correlate strongly with your best energy days. This data becomes powerful motivation to prioritize your own wellbeing.'
    }
    ],
    quiz: [
    {
      question: 'How does emotional contagion work according to psychological research?',
      options: [
        'Customers consciously analyze your body language',
        'Through mimicry, feedback, and synchronization between people',
        'Only through verbal communication',
        'It doesn\'t exist — it\'s just a theory'
      ],
      correctIndex: 1,
      explanation: 'Research shows emotional contagion works in three stages: mimicry (copying expressions), feedback (brain generates matching emotions from your own expressions), and synchronization (both people end up in the same emotional state).',
    },
    {
      question: 'When is calm, warm energy most appropriate?',
      options: [
        'With young groups and holiday shoppers',
        'With couples, older customers, and serious buyers',
        'Never — high energy always wins',
        'Only when you\'re tired'
      ],
      correctIndex: 1,
      explanation: 'Calm, warm energy works best with couples, older customers, and serious buyers. It creates trust and sophistication. Match the customer\'s energy, then slightly elevate it.',
    },
    {
      question: 'Why should you never vent frustration on the sales floor?',
      options: [
        'The manager will hear you',
        'It poisons the energy ecosystem for everyone including customers',
        'Customers might complain',
        'It\'s unprofessional but doesn\'t affect sales'
      ],
      correctIndex: 1,
      explanation: 'The shop is an energy ecosystem. Complaining on the floor creates negative emotional contagion that affects teammates and customers. Vent in the back room, never in customer areas.',
    }
    ],
  },
  'psych-6': {
    id: 'psych-6',
    categoryId: 'psychology',
    title: 'Your Life Outside Work',
    subtitle: 'Exercise, sleep, nutrition, social life — how taking care of yourself makes you a better seller',
    duration: '8 min',
    icon: 'Sparkles',
    order: 6,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'The Best Salespeople Take Care of Themselves'
    },
    {
            type: 'paragraph',
      text: 'You can\'t pour from an empty cup. A salesperson running on 4 hours of sleep, fast food, and no exercise is a salesperson running at 40% capacity. The job demands energy, clarity, emotional stability, and presence — all of which are built OUTSIDE the shop. Investing in your physical and mental wellbeing isn\'t indulgent. It\'s professional development.'
    },
    {
            type: 'keypoint',
      text: 'Your commission is directly tied to your energy. If you earn 25-30% commission, every 10% improvement in your daily performance (from better sleep, nutrition, or exercise) translates to real money — potentially hundreds of euros per month.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Sleep: The Foundation of Everything'
    },
    {
            type: 'paragraph',
      text: 'Sleep deprivation affects the prefrontal cortex — the part of your brain responsible for decision-making, emotional regulation, and social interaction. In other words, it destroys the exact skills you need for sales. After a poor night\'s sleep:'
    },
    {
            type: 'bullets',
      items: [
        'Your emotional resilience drops by 60%. Rejections hurt more.',
        'Your facial expressions become flatter and less genuine. Customers notice.',
        'Your verbal fluency decreases. Words don\'t come as easily.',
        'Your motivation and drive plummet. You stop more hesitantly.'
      ]
    },
    {
            type: 'tip',
      text: 'Aim for 7-8 hours of sleep. If you have a late night before an early shift, a 20-minute power nap before work can restore significant cognitive function. The 20-minute length is critical — longer naps create grogginess.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Exercise: Your Energy Multiplier'
    },
    {
            type: 'paragraph',
      text: 'You don\'t need to be an athlete. You need consistent movement that builds energy and reduces stress. The best exercise for salespeople is anything that gets your heart rate up and your mood elevated.'
    },
    {
            type: 'bullets',
      items: [
        'CARDIO (running, cycling, dancing): Builds baseline energy and lung capacity. Better breathing = better voice projection and calmer nerves.',
        'STRENGTH TRAINING: Builds confidence through physical capability. Standing tall with good posture is easier with a strong back and core.',
        'YOGA / STRETCHING: Reduces physical tension that accumulates during shifts. A relaxed body creates a relaxed presence.',
        'WALKING: Even a 20-minute walk after work helps process the day\'s stress and transition out of \'work mode.\''
      ]
    },
    {
            type: 'tip',
      text: 'The best time to exercise for sales performance is BEFORE your shift, even if just 10 minutes of jumping jacks and stretching. This elevates your energy when you need it most. If mornings are impossible, exercise on your days off to build baseline energy.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Nutrition: Fuel for Performance'
    },
    {
            type: 'paragraph',
      text: 'What you eat directly affects your brain function, mood stability, and energy levels. A sugary breakfast creates a mid-morning crash. A heavy lunch creates afternoon fog. Smart nutrition is strategic.'
    },
    {
            type: 'numbered',
      items: [
        'BREAKFAST: Protein + complex carbs. Eggs with whole grain toast, Greek yogurt with nuts, or a protein smoothie. Avoid pastries and sugary cereals — they create a crash by 10am.',
        'DURING SHIFT: Light snacks. Nuts, fruit, protein bars. Avoid heavy meals during breaks. A salad with chicken is perfect. Pizza will make you sluggish.',
        'HYDRATION: Water is your #1 performance tool. Dehydration causes fatigue, headaches, and poor concentration. Keep a water bottle on the floor.',
        'AFTER WORK: Eat to recover, not to reward. A nutritious dinner helps you sleep better and wake up with more energy. The \'I deserve junk food after a hard day\' mindset sabotages tomorrow\'s performance.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Social Life & Mental Health'
    },
    {
            type: 'paragraph',
      text: 'Sales is emotionally demanding. You\'re performing all day — smiling, engaging, handling rejection. You need people who recharge you, not drain you. A supportive social circle is essential for long-term performance.'
    },
    {
            type: 'bullets',
      items: [
        'SPEND TIME WITH PEOPLE WHO ENERGIZE YOU: After a day of giving energy to customers, you need people who fill your cup. Limit time with people who complain, criticize, or drain you.',
        'PROCESS REJECTION WITH FRIENDS: Talk about your bad days. Normalize the experience. A friend who says \'that sounds tough, but I know you\'ll crush it tomorrow\' is worth their weight in gold.',
        'HAVE NON-SALES CONVERSATIONS: Don\'t let your whole identity become selling. Talk about movies, sports, philosophy, travel. A well-rounded mind is a more interesting salesperson.',
        'CREATE RITUALS: Weekly dinner with friends, a hobby class, a sports team. Scheduled activities ensure you\'re building a life outside work, not just recovering from it.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Building a Growth Mindset: Books, Podcasts & Learning'
    },
    {
            type: 'paragraph',
      text: 'The best salespeople are perpetual learners. They read, listen, and constantly expand their understanding of human psychology, communication, and business. Here are recommended resources:'
    },
    {
            type: 'bullets',
      items: [
        'BOOKS: \'Influence\' by Robert Cialdini (the science of persuasion), \'How to Win Friends and Influence People\' by Dale Carnegie (classic rapport building), \'Mindset\' by Carol Dweck (growth vs. fixed mindset), \'The Psychology of Selling\' by Brian Tracy (sales-specific strategies), \'Atomic Habits\' by James Clear (building better routines)',
        'PODCASTS: Sales-focused podcasts for daily motivation and new techniques. Listen during your commute or while getting ready for work.',
        'VIDEO CONTENT: Watch TED talks on body language, persuasion, and confidence. Amy Cuddy\'s talk on power posing is particularly relevant.',
        'LEARN FROM OTHER INDUSTRIES: Great ideas come from cross-pollination. Watch how luxury hotels greet guests. Study how Apple Store employees approach customers. Notice what great restaurant servers do to create experiences.'
      ]
    },
    {
            type: 'tip',
      text: 'Set a learning goal: one book per month, or one podcast episode per day during your commute. In 6 months, you\'ll have absorbed more sales knowledge than most people acquire in years. Small daily learning compounds into massive advantage.'
    },
    {
            type: 'quote',
      text: 'Taking care of yourself isn\'t selfish — it\'s your most profitable investment. A well-rested, well-fed, well-exercised salesperson is a money-making machine.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'How does sleep deprivation specifically affect sales performance?',
      options: [
        'It only makes you feel tired but doesn\'t affect sales',
        'It reduces emotional resilience, verbal fluency, and facial expressiveness',
        'It actually improves performance because you\'re more desperate for commission',
        'It only affects your ability to close big sales'
      ],
      correctIndex: 1,
      explanation: 'Sleep deprivation affects the prefrontal cortex, reducing emotional resilience, verbal fluency, and making facial expressions flatter. These are exactly the skills needed for sales.',
    },
    {
      question: 'Why is exercise particularly valuable for salespeople?',
      options: [
        'It helps you look better in the uniform',
        'It builds energy, lung capacity for voice projection, and confidence',
        'It\'s required by company policy',
        'It gives you something to talk about with customers'
      ],
      correctIndex: 1,
      explanation: 'Exercise builds baseline energy, improves breathing for better voice projection, and builds confidence through physical capability — all directly relevant to sales performance.',
    },
    {
      question: 'What type of lunch should you eat to maintain afternoon energy?',
      options: [
        'Pizza or pasta for satisfaction',
        'A heavy meal to feel full',
        'Light protein, salad, and fruit',
        'Skip lunch and power through'
      ],
      correctIndex: 2,
      explanation: 'Heavy meals redirect blood from the brain to the stomach, causing afternoon fog. Light protein, salads, and fruit provide sustained energy without the crash.',
    }
    ],
  },
  'psych-7': {
    id: 'psych-7',
    categoryId: 'psychology',
    title: 'The Science of Persuasion',
    subtitle: 'Cialdini\'s 6 principles applied to YOUR floor — with real examples for each',
    duration: '10 min',
    icon: 'Brain',
    order: 7,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'The 6 Weapons of Influence — On Your Floor, Today'
    },
    {
            type: 'paragraph',
      text: 'Dr. Robert Cialdini spent decades researching what makes people say \'yes.\' He identified six universal principles of persuasion that work across all cultures and contexts. Every single one of them is happening on your sales floor — either by accident or by design. Master them, and you control the conversation.'
    },
    {
            type: 'keypoint',
      text: 'These principles aren\'t tricks or manipulation. They are fundamental aspects of human social psychology. Using them ethically means creating genuine win-win situations where customers get real value and you earn your commission.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '1. Reciprocity — People Feel Obliged to Give Back'
    },
    {
            type: 'paragraph',
      text: 'When someone gives us something, we feel a psychological pull to return the favor. It\'s hardwired into human social behavior. On your floor, this principle is activated constantly:'
    },
    {
            type: 'bullets',
      items: [
        'THE FREE SAMPLE: When you give someone a hand massage with the scrub or buff their nail, you\'ve given them something of value. They now feel a subtle obligation to reciprocate — by listening to your pitch, considering your offer, or making a purchase.',
        'YOUR TIME AND ATTENTION: When you spend 5 minutes explaining, demonstrating, and educating, you\'ve invested in them. Most people feel uncomfortable walking away after someone has invested energy in them.',
        'THE COMPLIMENT: A genuine compliment (\'I love your jacket\') is a small gift. It creates warmth and openness because the person feels you\'ve given them something positive.'
      ]
    },
    {
            type: 'script',
      text: '\'Let me give you a small gift — this hand treatment takes just one minute and you\'ll feel the difference immediately.\' By framing it as a GIFT, you activate reciprocity before the demo even begins.'
    },
    {
            type: 'tip',
      text: 'The key to ethical reciprocity: give GENUINE value first. A fake compliment or a rushed demo doesn\'t create reciprocity — it creates distrust. Invest real time and energy, and the principle works naturally.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '2. Scarcity — We Want What Is Rare'
    },
    {
            type: 'paragraph',
      text: 'Opportunities seem more valuable when their availability is limited. This is why \'limited edition\' products, flash sales, and countdown timers are so effective. On your floor, scarcity is built into your location:'
    },
    {
            type: 'bullets',
      items: [
        'THE TAX HAVEN ADVANTAGE: \'Around Europe this is €500, but here in Andorra, because we\'re a tax haven, it\'s only €300.\' The scarcity of the tax-haven pricing creates urgency — they can\'t get this price at home.',
        'SEASONAL OFFERS: \'This Christmas offer ends soon, and I\'d hate for you to miss it.\' Time-limited scarcity pushes decision-making.',
        'LIMITED STOCK: \'I only have two samples left\' or \'These sell out every weekend.\' Physical scarcity increases perceived value.',
        'THE VOUCHER CLOSE: \'I can only do this once, just for you.\' Personal scarcity — a unique opportunity that won\'t repeat.'
      ]
    },
    {
            type: 'comparison',
      left: { label: 'Weak Scarcity', text: '\'You should buy this while you\'re here.\' Vague, generic, no specific reason to act now. Customers ignore it.' },
      right: { label: 'Strong Scarcity', text: '\'This price only exists in Andorra. When you cross the border, it goes back to €500. That\'s a €200 savings you only get today, right here.\' Specific, verifiable, personal.' }
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '3. Authority — We Trust Experts'
    },
    {
            type: 'paragraph',
      text: 'People defer to experts and credible sources. When a doctor recommends a treatment, we listen. When you position yourself as a skincare expert, customers listen. Authority is built through:'
    },
    {
            type: 'bullets',
      items: [
        'KNOWLEDGE: Knowing the ingredients, the science, the dermatologist recommendations. \'This contains Dead Sea minerals — the lowest place on Earth with the highest mineral concentration.\'',
        'CONFIDENT DELIVERY: Experts don\'t hesitate. They don\'t say \'um\' and \'I think.\' They state facts clearly: \'This is our #1 seller across Europe.\'',
        'VISUAL CREDIBILITY: Looking professional, well-groomed, and polished. Your appearance IS your authority signal.',
        'SOCIAL PROOF: \'I\'ve done this demo over 20 times today, and the reaction is always the same.\' Your experience IS authority.'
      ]
    },
    {
            type: 'script',
      text: '\'Dermatologists actually recommend this for eczema and psoriasis. It\'s not just beauty — it\'s science-backed skin health.\' This positions the product as medically endorsed, not just cosmetically appealing.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '4. Consistency — People Want to Act in Alignment'
    },
    {
            type: 'paragraph',
      text: 'Once people commit to something, they want to act in ways that are consistent with that commitment. Small initial agreements lead to larger ones. This is incredibly powerful on the sales floor:'
    },
    {
            type: 'bullets',
      items: [
        'THE AGREEMENT FRAME: \'You take care of your skin, right?\' They say yes. Now they\'ve committed to the identity of someone who cares about skincare. Buying becomes consistent with that identity.',
        'THE SMALL YES: \'Can I show you something quickly?\' Small agreement. Then: \'Can I try this on your hand?\' Another small agreement. Each yes makes the next yes more likely.',
        'SELF-IMAGE CONSISTENCY: When someone says \'I believe in investing in quality,\' they\'ve created a standard for themselves. Passing on a high-quality product would be inconsistent with that self-image.'
      ]
    },
    {
            type: 'tip',
      text: 'Get small agreements early. \'You have amazing skin — you clearly take care of yourself, right?\' When they agree, they\'ve anchored their identity as a skincare-conscious person. Everything that follows should reinforce that identity.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '5. Liking — We Say Yes to People We Like'
    },
    {
            type: 'paragraph',
      text: 'This seems obvious, but it\'s profound. People buy from people they like, trust, and feel connected to. Liking is built through:'
    },
    {
            type: 'bullets',
      items: [
        'SIMILARITY: \'Oh, you\'re from Barcelona? I love it there!\' Shared backgrounds, interests, or experiences create instant rapport.',
        'COMPLIMENTS: Genuine, specific compliments make people feel seen and appreciated. \'That scarf is beautiful — is it from a local designer?\'',
        'COOPERATION: Working together on the demo (\'Rub this in gently\') creates a sense of teamwork. You\'re not seller and buyer — you\'re collaborators.',
        'POSITIVE ENERGY: Smiling, warmth, humor — these make you likable. People don\'t buy from grumpy salespeople, even if the product is great.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '6. Consensus — We Follow What Others Do'
    },
    {
            type: 'paragraph',
      text: 'When uncertain, people look to what others are doing. Social proof is one of the most powerful persuasion tools:'
    },
    {
            type: 'bullets',
      items: [
        'POPULARITY: \'This is our #1 best-seller.\' If everyone else is buying it, it must be good.',
        'TESTIMONIALS: \'My customer from last week texted me saying her husband noticed the difference immediately.\' Real stories are more powerful than statistics.',
        'VISIBLE DEMAND: When customers see other customers in the shop being served, it validates the shop\'s credibility. A busy shop is an attractive shop.',
        '\'ALREADY BOUGHT\' SIGNAL: \'Most people who try the demo end up taking at least the Scrub. It\'s hard to resist once you feel it.\' This normalizes buying as the expected outcome.'
      ]
    },
    {
            type: 'script',
      text: '\'I did this demo for a woman earlier who said she\'d \'think about it.\' She came back an hour later and bought two. Once you feel the difference, it stays with you.\' This story creates social proof AND plants the seed that they might come back too.'
    },
    {
            type: 'quote',
      text: 'Understanding these six principles transforms selling from a battle of wills into a dance of psychology. You\'re not fighting the customer — you\'re guiding them through a decision-making process that feels natural and comfortable.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'Which Cialdini principle is activated when you give a customer a free hand massage before pitching?',
      options: [
        'Scarcity',
        'Authority',
        'Reciprocity',
        'Consensus'
      ],
      correctIndex: 2,
      explanation: 'Reciprocity is the principle that people feel obliged to give back when they receive something. A free hand massage is a gift that creates a psychological pull to reciprocate by listening to your pitch or making a purchase.',
    },
    {
      question: 'How does the tax-haven pricing activate the scarcity principle?',
      options: [
        'It makes the product seem rare',
        'It creates a unique price advantage that only exists in Andorra and cannot be replicated elsewhere',
        'It makes customers feel special',
        'It creates time pressure'
      ],
      correctIndex: 1,
      explanation: 'The tax-haven pricing creates genuine scarcity — the €300 price only exists in Andorra. Customers cannot get this price at home, making the opportunity geographically limited and rare.',
    },
    {
      question: 'Why is getting a small \'yes\' early in the interaction powerful?',
      options: [
        'It tricks the customer',
        'It activates consistency — people want to act in alignment with their commitments',
        'It\'s just a nice way to start',
        'It shows you\'re in control'
      ],
      correctIndex: 1,
      explanation: 'The principle of consistency means that once people commit to something (even a small yes), they want to act in alignment with that commitment. Small initial agreements make larger agreements more likely.',
    }
    ],
  },
  'psych-8': {
    id: 'psych-8',
    categoryId: 'psychology',
    title: 'Developing Your Sales Intuition',
    subtitle: 'How experience becomes instinct. Pattern recognition. Reading micro-signals.',
    duration: '10 min',
    icon: 'Compass',
    order: 8,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'From Thinking to Knowing: The Path to Sales Instinct'
    },
    {
            type: 'paragraph',
      text: 'Watch a master salesperson work, and it looks like magic. They seem to just KNOW who will buy, when to push, when to back off, what to say. But it\'s not magic — it\'s pattern recognition developed through hundreds of interactions. Every customer you\'ve ever stopped has taught you something. The question is: are you paying attention?'
    },
    {
            type: 'keypoint',
      text: 'Sales intuition is the ability to read a situation and know the right move without consciously thinking through it. It comes from deliberate practice + active reflection on every interaction.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'How Experience Becomes Instinct'
    },
    {
            type: 'paragraph',
      text: 'Your brain is a pattern-recognition machine. When you encounter a situation repeatedly, your brain starts building mental models. Over time, these models become so ingrained that you recognize patterns instantly, without conscious thought. This is how a chess grandmaster \'sees\' the right move in seconds, or how a doctor \'feels\' a diagnosis before the tests come back.'
    },
    {
            type: 'numbered',
      items: [
        'STAGE 1 — CONSCIOUS INCOMPETENCE: You\'re new. You don\'t know what you don\'t know. Every interaction requires intense focus. You think through every word.',
        'STAGE 2 — CONSCIOUS COMPETENCE: You\'ve had enough interactions to start seeing patterns. You can read some customers, but it still takes effort. You\'re thinking AND doing.',
        'STAGE 3 — UNCONSCIOUS COMPETENCE: The magic stage. Patterns jump out at you. You just KNOW. Your body moves before your brain decides. This is where top sellers live.',
        'STAGE 4 — MASTERY: Not only do you intuitively read situations, but you can ALSO explain your intuition to others. You can teach. This is the level of a true sales leader.'
      ]
    },
    {
            type: 'tip',
      text: 'Most salespeople reach Stage 2 and stop growing. They get good enough to make money and plateau. The ones who reach Stage 3 and 4 are those who actively reflect on every interaction, seeking patterns rather than just counting wins.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Building Pattern Recognition Deliberately'
    },
    {
            type: 'paragraph',
      text: 'Intuition isn\'t just \'experience\' — it\'s EXPERIENCE THAT YOU\'VE PROCESSED. Here\'s how to accelerate the process:'
    },
    {
            type: 'bullets',
      items: [
        'THE AFTER-ACTION REVIEW: After every interaction — yes OR no — ask yourself three questions: What did I notice about this person? What did I do? What was the result? Write it down. This forces your brain to process patterns.',
        'THE CUSTOMER LOG: Keep a small notebook. For each customer: nationality (if known), approximate age, what they were wearing, who they were with, what product you demoed, what objection they gave, did they buy. Over weeks, patterns emerge.',
        'STUDY YOUR WINS: What did your buyers have in common? Were they couples? Did they carry luxury bags? Were they in a certain age range? Your best customers have patterns.',
        'STUDY YOUR LOSSES EQUALLY: What did non-buyers have in common? Were they in a rush? Were they on their phones? Did they have kids? Understanding who WON\'T buy is as valuable as understanding who will.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reading Micro-Signals: The Language of the Body'
    },
    {
            type: 'paragraph',
      text: 'Micro-signals are tiny, often unconscious cues that reveal what someone is really thinking. They happen in milliseconds. A master salesperson reads these automatically:'
    },
    {
            type: 'bullets',
      items: [
        'EYE DIRECTION: Looking up and to the left often indicates visual imagination (they\'re picturing the result). Looking down indicates internal dialogue (they\'re thinking through the logic). Rapid eye movement between you and the product indicates interest.',
        'MICRO-EXPRESSIONS: A brief flash of surprise when you mention the price (they expected higher). A quick eyebrow raise when you show the demo result (they\'re impressed but trying to hide it). These flashes reveal true feelings beneath the polite mask.',
        'POSTURE SHIFTS: Leaning in = interest. Crossing arms after the price = resistance. Relaxing shoulders after the offer = acceptance. The body reveals the decision before the mouth does.',
        'TOUCHING THE FACE: Touching the cheek or chin while looking at the product = they\'re imagining themselves using it. A very positive signal.',
        'BREATHING CHANGES: A held breath when you show the price, then a release = relief (they can afford it). Shallow breathing = anxiety about the price.',
        'VOICE TONE CHANGES: Higher pitch when asking questions = excitement. Lower, slower speech = thoughtful consideration (often a buying signal). Flat tone = disengagement.'
      ]
    },
    {
            type: 'tip',
      text: 'Don\'t try to read all micro-signals at once. Pick ONE signal per week to focus on. For example, week 1: notice when customers lean in vs. lean back. Week 2: watch for face-touching. Within 2 months, you\'ll be reading the full picture automatically.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When to Push and When to Back Off'
    },
    {
            type: 'paragraph',
      text: 'This is the million-euro question. The answer lies in reading the customer\'s buying temperature:'
    },
    {
            type: 'numbered',
      items: [
        'GREEN LIGHTS (PUSH): Leaning in, touching the product, asking unprompted questions about usage or price, involving their partner positively, smiling with genuine eye crinkles, touching their face while looking at the product. These customers are warm — close with confidence.',
        'YELLOW LIGHTS (GENTLE): Hesitant questions, looking at partner for approval, saying \'it\'s nice but...\', touching the product but not committing. These customers need reassurance, not pressure. Use emotional connection and logic together.',
        'RED LIGHTS (BACK OFF): Crossed arms after price, stepping back, checking phone repeatedly, flat responses, looking around for exit, partner shaking head subtly. These customers are not buying today. Plant a seed and let them go gracefully.'
      ]
    },
    {
            type: 'script',
      text: '\'I can see you\'re thinking about it — that\'s smart. Here\'s my WhatsApp. If you have any questions later, or if you want to come back and try something else, just message me. No pressure at all.\' This plants a seed, builds a bridge, and respects their signals.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Learning from Every Interaction'
    },
    {
            type: 'paragraph',
      text: 'The fastest way to develop intuition is to extract a lesson from EVERY customer — even the ones who ignore you completely:'
    },
    {
            type: 'bullets',
      items: [
        'THE IGNORE: \'They were walking fast, looking at their phone, carrying coffee. I probably should have let them pass.\' → Lesson: Match stopping effort to customer receptivity.',
        'THE \'NO THANKS\': \'They smiled but kept walking. Good energy but bad timing.\' → Lesson: My approach was warm but they\'re in a rush. Speed up the opener next time.',
        'THE DEMO, NO BUY: \'They loved the nail kit demo but said it was too expensive even at €30.\' → Lesson: Either a price objection to work through, or genuinely no budget. Note the signals for future reference.',
        'THE CLOSE: \'They bought the syringe after I involved the husband in the demo.\' → Lesson: Partner engagement was the key factor. Replicate that approach with couples.'
      ]
    },
    {
            type: 'tip',
      text: 'At the end of each day, write down the ONE most important lesson you learned. Just one sentence. After 6 months, you\'ll have 180 lessons. That\'s more accumulated wisdom than most salespeople acquire in years.'
    },
    {
            type: 'quote',
      text: 'Intuition is not magic. It is pattern recognition that has been practiced until it becomes automatic. Every customer is a teacher — if you\'re willing to learn.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What are the four stages of developing sales intuition?',
      options: [
        'Beginner, Intermediate, Advanced, Expert',
        'Conscious Incompetence, Conscious Competence, Unconscious Competence, Mastery',
        'Learning, Doing, Teaching, Leading',
        'Theory, Practice, Failure, Success'
      ],
      correctIndex: 1,
      explanation: 'The four stages are Conscious Incompetence (new, thinking hard), Conscious Competence (seeing patterns with effort), Unconscious Competence (intuitive knowing), and Mastery (can also teach others).',
    },
    {
      question: 'What does it mean when a customer touches their face while looking at the product?',
      options: [
        'They\'re anxious about the price',
        'They\'re imagining themselves using it — a very positive signal',
        'They want to leave',
        'They\'re checking their makeup'
      ],
      correctIndex: 1,
      explanation: 'Face-touching while looking at a product is a strong positive signal. It indicates the customer is unconsciously imagining themselves using it — a key buying indicator.',
    },
    {
      question: 'Why is it valuable to study your losses (non-buyers) as much as your wins?',
      options: [
        'To feel bad about yourself',
        'To understand patterns of who won\'t buy, saving time and energy',
        'To blame external factors',
        'To avoid those types of customers entirely'
      ],
      correctIndex: 1,
      explanation: 'Understanding patterns in non-buyers is as valuable as understanding buyers. It helps you recognize who to invest energy in, when to pivot, and when to gracefully let someone go.',
    }
    ],
  },
  'stop-1': {
    id: 'stop-1',
    categoryId: 'stopping',
    title: 'The 2-Metre Rule & Timing',
    subtitle: 'Where to stand, when to start, and why starting too late means talking to their back',
    duration: '8 min',
    icon: 'Target',
    order: 1,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Distance and Timing Determine Everything'
    },
    {
            type: 'paragraph',
      text: 'The stop doesn\'t begin when you speak. It begins when the customer first registers your presence. Your position, your eye contact, your body language — all of these are working before your first word. Master the physical setup and your words become ten times more effective.'
    },
    {
            type: 'keypoint',
      text: 'The 2-metre rule: Start your approach when the customer is 2 metres away from your zone. Any closer and they feel ambushed. Any farther and they don\'t hear you or process your presence in time.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Optimal Door Setup'
    },
    {
            type: 'paragraph',
      text: 'Your physical position at the door is the foundation of every stop. Here\'s how to position for maximum effect:'
    },
    {
            type: 'bullets',
      items: [
        'STAND SLIGHTLY FORWARD: Position yourself just outside the shop entrance, not flush against the wall. You need to be in the pedestrian\'s sight line, not hidden.',
        'ANGLE YOUR BODY: Face 45 degrees toward the street, not directly at the shop. This signals openness to passersby rather than closed-off shop posture.',
        'VISIBLE AND ACTIVE: Hold a product, arrange a display, or offer samples. Active hands signal engagement. Hands in pockets signal boredom.',
        'CLEAR THE PATH: Make sure the entrance is unobstructed. If people have to navigate around you, the stop feels like an obstacle, not an invitation.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The 2-Metre Strike Zone'
    },
    {
            type: 'paragraph',
      text: 'The 2-metre zone is your optimal engagement window. Here\'s the breakdown:'
    },
    {
            type: 'numbered',
      items: [
        '3+ METRES: Too far. Your voice won\'t carry well against street noise. They may not visually register you. Save your energy.',
        '2 METRES: THE SWEET SPOT. Close enough for clear communication. Far enough that they have time to process you and adjust their pace. This is where you make eye contact and begin your opener.',
        '1 METRE: AMBUSH ZONE. Too close for comfort. They feel trapped. Starting here makes you seem aggressive or desperate. If they\'re already this close, either they came to you (great) or you missed your window.',
        'TALKING TO THEIR BACK: If you wait until they\'ve passed you, you\'re done. A person walking away is psychologically closed off. You might as well be talking to the wall.'
      ]
    },
    {
            type: 'tip',
      text: 'Practice judging 2 metres visually. Find a spot outside your shop and mark it mentally. Stand there and note where 2 metres ends on the pavement. After a few days, you\'ll have a natural sense of the strike zone.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Eye Contact Technique'
    },
    {
            type: 'paragraph',
      text: 'Eye contact is the trigger. Before you speak, your eyes do the work. Here\'s how to use eye contact effectively:'
    },
    {
            type: 'bullets',
      items: [
        'CATCH AND HOLD: Make eye contact 2 metres out. Hold for 1-2 seconds. Smile with your eyes. This establishes human connection before words.',
        'DON\'T STARE DOWN: Prolonged intense eye contact feels aggressive. 1-2 seconds is enough. Then shift to a natural gaze as you begin speaking.',
        'THE THREE-PERSON RULE: If you\'re in a group area, make brief eye contact with multiple people. Don\'t lock onto one person exclusively unless they\'re clearly solo.',
        'READ THEIR EYES: Eyes that meet yours with curiosity = receptive. Eyes that dart away = not interested. Eyes that widen slightly = surprised but open. Adjust your opener accordingly.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Approach Angle'
    },
    {
            type: 'paragraph',
      text: 'How you physically move toward a customer matters. Different angles create different psychological effects:'
    },
    {
            type: 'bullets',
      items: [
        'FRONTAL APPROACH: Facing them directly. Highest engagement but can feel confrontational. Best when your energy is warm and inviting, not aggressive.',
        'SIDE ANGLE: Approaching from a slight angle (45 degrees). Less confrontational. Natural for pedestrians who are walking past. Your opener feels like a friendly comment, not an interception.',
        'PARALLEL WALK: Walking alongside them for 1-2 steps while talking, then slowing to invite them in. Works for people walking quickly. Matches their pace before redirecting it.',
        'THE LEAD: Starting slightly ahead of them, turning as they approach, then leading inside. This is the most natural — you\'re not blocking them, you\'re inviting them to follow.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Timing by Customer Speed'
    },
    {
            type: 'comparison',
      left: { label: 'Slow Walkers (Window Shoppers)', text: 'Approach early (2.5-3 metres). They have time. Use a warm, extended opener. Build rapport before the pitch. They respond to connection.' },
      right: { label: 'Fast Walkers (Purposeful)', text: 'Hit at exactly 2 metres with a fast, intriguing opener. \'Two seconds — you have to see this!\' They need energy and intrigue to break stride. You have 3 words to hook them.' }
    },
    {
            type: 'tip',
      text: 'Watch their gait. Slow, meandering walkers are in browsing mode — prime targets. Fast, straight-line walkers are on a mission — only stop if you have something extremely compelling or if they give you eye contact first.'
    },
    {
            type: 'quote',
      text: 'A stop is like a dance invitation. Your position, timing, and eye contact set the stage. Your opener is simply asking them to dance. If the setup is wrong, the words don\'t matter.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'Why is the 2-metre zone considered the sweet spot for stopping?',
      options: [
        'It is closest to the shop door',
        'Close enough for clear communication but far enough for them to process you naturally',
        'It is where most customers walk',
        'It is the legal requirement'
      ],
      correctIndex: 1,
      explanation: 'The 2-metre zone is optimal because it is close enough for clear communication against street noise, but far enough that the customer has time to process your presence and adjust their pace naturally.',
    },
    {
      question: 'What happens when you wait until a customer is only 1 metre away before stopping them?',
      options: [
        'They are more likely to stop because you are close',
        'They feel ambushed and trapped — it creates a negative first impression',
        'It does not matter as long as your opener is good',
        'They appreciate your confidence'
      ],
      correctIndex: 1,
      explanation: 'The 1-metre zone is the ambush zone. Starting this close makes customers feel trapped and creates a negative first impression. They feel intercepted rather than invited.',
    },
    {
      question: 'What is the best approach angle for a fast-walking customer?',
      options: [
        'Direct frontal approach to block their path',
        'A side angle or parallel walk that matches their pace before redirecting',
        'Waiting until they pass then calling after them',
        'Standing still and waving'
      ],
      correctIndex: 1,
      explanation: 'For fast walkers, a side angle or parallel walk matches their pace and feels natural. Blocking their path creates resistance. Redirecting their momentum is more effective than stopping it.',
    }
    ],
  },
  'stop-2': {
    id: 'stop-2',
    categoryId: 'stopping',
    title: 'The Compliment Stop',
    subtitle: '15 compliment openers for different situations, plus when compliments backfire',
    duration: '8 min',
    icon: 'Star',
    order: 2,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'A Genuine Compliment Opens More Doors Than Any Pitch'
    },
    {
            type: 'paragraph',
      text: 'The compliment stop is the most versatile stopping technique because it works on everyone. Who doesn\'t like being noticed? A well-delivered compliment creates an instant positive emotion, breaks the stranger barrier, and gives the customer a reason to engage. But it MUST be genuine. Fake compliments are detected instantly and destroy trust before it begins.'
    },
    {
            type: 'keypoint',
      text: 'The compliment stop formula: Specific observation + Genuine warmth + Immediate transition to product. The compliment is the hook; the smooth transition to the demo is the catch.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '15 Compliment Openers by Situation'
    },
    {
            type: 'paragraph',
      text: 'These are word-for-word openers you can adapt. The key is specificity — the more specific, the more real it feels.'
    },
    {
            type: 'bullets',
      items: [
        'ACCESSORY FOCUS: \'That scarf is gorgeous — the color is perfect on you! Let me show you something that would complement your style...\'',
        'GROOMING: \'Your skin is absolutely glowing! What do you use? ... Actually, let me show you my secret weapon for keeping that glow...\'',
        'NAIL FOCUS: \'I love that you keep your nails natural — they look so healthy! Speaking of nails, I have something you\'ll adore...\'',
        'STYLE: \'That jacket is incredible — you clearly know quality. Speaking of quality, let me show you something amazing...\'',
        'ENERGY: \'You have such a warm smile! I can tell you\'re having a great day. Can I make it even better with a quick gift?\'',
        'COUPLE COMPLIMENT: \'You two look like you\'re having the best vacation! I have something that will make your Andorra trip even more memorable...\'',
        'BAG COMPLEMENT: \'That bag is stunning — is it [brand]? You clearly appreciate the finer things. Let me show you my favorite luxury find here...\'',
        'CONFIDENCE: \'I love your confidence — you walk like you own the street! Quick question: do you ever get dry skin from the mountain air?\'',
        'EYE FOCUS: \'You have beautiful eyes! Let me show you something that makes them look even more incredible...\'',
        'SHOE APPRECIATION: \'Those boots are perfect for Andorra! Stylish AND practical. Let me give you a quick spa moment for your hands to match...\'',
        'FAMILY WARMTH: \'Your family is adorable! Are you all having a wonderful time? I have something that makes an amazing family gift...\'',
        'ELEGANCE: \'You look so elegant — like you just stepped out of a magazine! Let me show you the secret to that just-returned-from-spa glow...\'',
        'VITAMIN D (TAN): \'That vacation glow is everything! Where were you? ... Let me show you how to keep that skin looking incredible...\'',
        'WATCH: \'Beautiful watch — you clearly appreciate quality craftsmanship. Let me show you a skincare tool with the same level of precision...\'',
        'HAIR: \'Your hair is stunning! What do you use? ... You clearly invest in yourself. Let me show you what I invest in for my skin...\''
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Anatomy of a Compliment That Works'
    },
    {
            type: 'numbered',
      items: [
        'IT\'S SPECIFIC: \'Nice jacket\' is weak. \'That olive green jacket brings out your eyes perfectly\' is strong. Specificity = observation = real.',
        'IT\'S ABOUT THEIR CHOICE: Compliment things they chose (clothes, accessories, grooming) not things they were born with (unless it\'s eyes — those work universally).',
        'IT LEADS NATURALLY TO PRODUCT: The best compliments have a bridge. \'Beautiful nails\' → Nail Kit. \'Glowing skin\' → Peeling. \'Quality taste\' → Any product. The bridge must feel natural, not forced.',
        'IT\'S DELIVERED WITH EYE CONTACT: Look them in the eye. Smile genuinely. Pause for 1 second after the compliment. Let it land. Then transition.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Complimenting Men vs. Women'
    },
    {
            type: 'paragraph',
      text: 'Compliments to men require a different approach. Many men are less accustomed to receiving compliments from strangers, so the technique must be adjusted:'
    },
    {
            type: 'bullets',
      items: [
        'FOR MEN: Focus on style choices, accessories (watch, shoes), or partner compliments. \'Sir, your wife clearly has amazing taste — look at how she glows after this treatment!\' This includes him through his partner.',
        'FOR WOMEN: Broader range works — style, grooming, accessories, energy. Women typically receive more compliments, so yours needs to be specific and genuine to stand out.',
        'FOR COUPLES: Complimenting the woman and engaging the man works better than the reverse. Most couples are comfortable with the woman receiving attention; the man feels included through his role as observer and validator.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When Compliments Backfire'
    },
    {
            type: 'paragraph',
      text: 'Compliments can work against you if done poorly. Here are the danger zones:'
    },
    {
            type: 'bullets',
      items: [
        'GENERIC COMPLIMENTS: \'You\'re beautiful\' feels like a line. \'That emerald scarf is perfect with your coloring\' feels like an observation. Specificity is the difference between charm and creepiness.',
        'TOO MANY COMPLIMENTS: One genuine compliment opens the door. Three compliments feels like flattery. Move on after the first one.',
        'INAPPROPRIATE FOCUS: Never compliment body parts, weight, or anything that could feel objectifying. Stick to choices they\'ve made — clothes, accessories, grooming, style.',
        'FAKE ENTHUSIASM: If you don\'t mean it, don\'t say it. Customers can detect false compliments instantly. It\'s better to skip the compliment and use a different opener than to deliver a fake one.'
      ]
    },
    {
            type: 'script',
      text: '\'I love your nails — you keep them so natural and healthy! Speaking of nails, I have the most amazing little gift for you. Just two minutes, I promise you\'ll be shocked.\' Compliment → Bridge → Time-bound invitation → Intrigue. That\'s the formula.'
    },
    {
            type: 'quote',
      text: 'A genuine compliment is the only opening line that makes the customer feel good about themselves before they feel anything about you. That\'s a powerful place to start.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What makes a compliment feel genuine rather than fake?',
      options: [
        'Using elaborate and flowery language',
        'Being specific about something the person chose',
        'Complimenting their physical appearance generically',
        'Giving multiple compliments rapidly'
      ],
      correctIndex: 1,
      explanation: 'Specific compliments about choices people make (clothes, accessories, grooming) feel like real observations. Generic or physical compliments often feel like lines or flattery.',
    },
    {
      question: 'What is the recommended approach when complimenting men?',
      options: [
        'Compliment their body or physique',
        'Focus on style choices, accessories, or partner compliments that include them indirectly',
        'Avoid complimenting men entirely',
        'Use the same approach as for women'
      ],
      correctIndex: 1,
      explanation: 'Men are often less accustomed to receiving compliments from strangers. Focus on style choices, accessories, or compliment their partner while engaging them as the observer.',
    },
    {
      question: 'When should you avoid using a compliment opener?',
      options: [
        'When the customer looks angry or rushed',
        'When you cannot find something genuinely specific to compliment',
        'When the customer is in a group',
        'When it is raining'
      ],
      correctIndex: 1,
      explanation: 'If you cannot find something genuinely specific to compliment, it is better to use a different stopping technique. Fake compliments are detected instantly and destroy trust.',
    }
    ],
  },
  'stop-3': {
    id: 'stop-3',
    categoryId: 'stopping',
    title: 'The Humor Stop',
    subtitle: 'Making them smile before they can say no — funny openers that actually work',
    duration: '8 min',
    icon: 'Smile',
    order: 3,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'If They Smile, They Stop. If They Stop, You Sell.',
      textEs: 'Si Sonríen, Se Detienen. Si Se Detienen, Vendes.'
    },
    {
            type: 'paragraph',
      text: 'Humor is the ultimate disarmer. When someone laughs, their guard drops. They\'re no longer in \'defend against salesperson\' mode — they\'re in \'this person is fun\' mode. A smile creates a micro-moment of connection that buys you the 10 seconds you need to deliver your pitch. But humor is a scalpel, not a hammer. Use it precisely.',
      textEs: 'El humor es el mejor desarmador. Cuando alguien se ríe, baja la guardia. Ya no está en modo \'defenderse del vendedor\' — está en modo \'esta persona es divertida\'. Una sonrisa crea un micro-momento de conexión que te compra los 10 segundos que necesitas para lanzar tu pitch. Pero el humor es un bisturí, no un martillo. Úsalo con precisión.'
    },
    {
            type: 'keypoint',
      text: 'The humor stop formula: Light observational humor + Self-awareness about selling + Quick transition to value. You\'re not doing stand-up comedy — you\'re just breaking the tension with a smile.',
      textEs: 'La fórmula de la parada del humor: Humor observacional ligero + Autoconciencia sobre vender + Transición rápida al valor. No estás haciendo stand-up comedy — solo estás rompiendo la tensión con una sonrisa.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Funny Openers That Work',
      textEs: 'Aperturas Divertidas Que Funcionan'
    },
    {
            type: 'paragraph',
      text: 'These openers acknowledge the awkwardness of street selling and turn it into a shared joke:',
      textEs: 'Estas aperturas reconocen lo incómodo de vender en la calle y lo convierten en una broma compartida:'
    },
    {
            type: 'bullets',
      items: [
        'THE HONEST APPROACH: \'I know, I know — another salesperson. But I promise, this is the one time today you\'ll actually be glad someone stopped you.\'',
        'THE SELF-DEPRECATING: \'I\'m clearly not very good at this because you\'re still walking, but give me 30 seconds and I\'ll change your mind.\'',
        'THE CHALLENGE: \'Two minutes. If you don\'t love it, you can tell me I\'m terrible at my job. Deal?\'',
        'THE OVERDRAMATIC: \'STOP! Don\'t make me chase you! ... Okay, I won\'t chase you because that would be creepy. But seriously, two seconds.\'',
        'THE REALITY CHECK: \'I know you\'re thinking \'not another one.\' I think the same thing when I walk down this street on my day off.\'',
        'THE CURIOSITY HOOK: \'Can I ask you something? What made you look over here just now? ... Exactly! Your instincts are good. Come see why.\''
      ],
      itemsEs: [
        'EL ENFOQUE HONESTO: \'Lo sé, lo sé — otro vendedor. Pero te prometo que esta es la única vez hoy que vas a agradecer que alguien te detuviera.\'',
        'EL AUTODEPRECATIVO: \'Claramente no soy muy bueno en esto porque sigues caminando, pero dame 30 segundos y te haré cambiar de opinión.\'',
        'EL RETO: \'Dos minutos. Si no te encanta, me puedes decir que soy terrible en mi trabajo. ¿Trato?\'',
        'EL DRAMÁTICO: \'¡ALTO! ¡No me hagas perseguirte! ... Ok, no te voy a perseguir porque sería raro. Pero en serio, dos segundos.\'',
        'EL TOQUE DE REALIDAD: \'Sé que estás pensando \'otro más.\' Yo pienso lo mismo cuando camino por esta calle en mi día libre.\'',
        'EL GANCHO DE CURIOSIDAD: \'¿Te puedo preguntar algo? ¿Qué te hizo voltear aquí ahorita? ... ¡Exacto! Tus instintos son buenos. Ven a ver por qué.\''
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Humor by Product',
      textEs: 'Humor por Producto'
    },
    {
            type: 'paragraph',
      text: 'Product-specific humor that connects the joke to what you\'re selling:',
      textEs: 'Humor específico por producto que conecta la broma con lo que estás vendiendo:'
    },
    {
            type: 'bullets',
      items: [
        'SYRINGE: \'Don\'t worry, it\'s not that kind of syringe! No needles, just magic for your eyes. Promise.\'',
        'NAIL KIT: \'I promise not to scream when I show you this. My last customer did, and her husband got jealous.\'',
        'SCRUB: \'This will make your hands softer than a baby\'s... actually, that\'s a weird comparison. Just trust me, they\'re going to feel incredible.\'',
        'PEELING: \'This is my favorite trick for glowing skin. And by trick, I mean scientifically-proven miracle. But trick sounds cooler.\''
      ],
      itemsEs: [
        'JERINGA: \'¡No te preocupes, no es ese tipo de jeringa! Sin agujas, solo magia para tus ojos. Prometido.\'',
        'KIT DE UÑAS: \'Prometo no gritar cuando te muestre esto. Mi última clienta sí gritó, y su esposo se puso celoso.\'',
        'EXFOLIANTE: \'Esto va a dejar tus manos más suaves que las de un bebé... bueno, esa comparación está rara. Solo confía en mí, van a sentirse increíbles.\'',
        'PEELING: \'Este es mi truco favorito para piel radiante. Y por truco, me refiero a un milagro científicamente comprobado. Pero truco suena más cool.\''
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reading Humor Receptivity',
      textEs: 'Leyendo la Receptividad al Humor'
    },
    {
            type: 'paragraph',
      text: 'Not everyone responds to humor. Here\'s how to read who will:',
      textEs: 'No todo el mundo responde al humor. Así es como leer a quién sí le funcionará:'
    },
    {
            type: 'bullets',
      items: [
        'GREEN FOR HUMOR: Smiling already, laughing with their companion, playful energy, eye contact with a twinkle, young or young-at-heart vibe, casual relaxed clothing.',
        'RED FOR HUMOR: Frowning, intense purpose in their walk, formal business attire with serious demeanor, on a phone call, visibly stressed or angry.',
        'YELLOW FOR HUMOR: Neutral expression but not negative, solo traveler (harder to read), older customer (test with gentle humor first).'
      ],
      itemsEs: [
        'VERDE PARA HUMOR: Ya sonriendo, riendo con su acompañante, energía juguetona, contacto visual con brillo en los ojos, vibra joven o joven de corazón, ropa casual y relajada.',
        'ROJO PARA HUMOR: Frunciendo el ceño, caminando con propósito intenso, atuendo formal de negocios con comportamiento serio, en una llamada, visiblemente estresado o enojado.',
        'AMARILLO PARA HUMOR: Expresión neutral pero no negativa, viajero solo (más difícil de leer), cliente mayor (prueba con humor suave primero).'
      ]
    },
    {
            type: 'tip',
      text: 'Test humor with a light comment first. If they smile or laugh, escalate. If they don\'t react, pivot immediately to a warm, professional tone. Don\'t keep trying to be funny — it becomes awkward.',
      textEs: 'Prueba el humor con un comentario ligero primero. Si sonríen o se ríen, escala. Si no reaccionan, pivota inmediatamente a un tono cálido y profesional. No sigas intentando ser gracioso — se vuelve incómodo.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Cultural Humor Differences',
      textEs: 'Diferencias Culturales del Humor'
    },
    {
            type: 'paragraph',
      text: 'Humor doesn\'t translate equally across cultures:',
      textEs: 'El humor no se traduce igual entre culturas:'
    },
    {
            type: 'bullets',
      items: [
        'SPANISH: Appreciate warmth and playful energy. Physical humor and exaggeration work. Self-deprecating humor is charming.',
        'FRENCH: Subtle, witty humor works better than slapstick. Intellectual observations are appreciated. Avoid overly silly humor.',
        'BRITISH: Self-deprecating humor is the national sport. They LOVE it. Dry wit and understatement are their love language.',
        'EASTERN EUROPEAN: Direct humor works. Bold statements with a smile. They appreciate confidence more than subtlety.',
        'GENERAL RULE: Physical comedy (demonstrative gestures, funny faces during the demo) transcends language barriers. Actions are funnier than words.'
      ],
      itemsEs: [
        'ESPAÑOLES: Aprecian la calidez y la energía juguetona. El humor físico y la exageración funcionan. El humor autodepreciativo es encantador.',
        'FRANCESES: El humor sutil e ingenioso funciona mejor que el slapstick. Las observaciones intelectuales se aprecian. Evita el humor demasiado tonto.',
        'BRITÁNICOS: El humor autodepreciativo es el deporte nacional. ¡LO ADORAN! El ingenio seco y la understatement son su lenguaje del amor.',
        'EUROPEOS ORIENTALES: El humor directo funciona. Declaraciones atrevidas con una sonrisa. Aprecian la confianza más que la sutileza.',
        'REGLA GENERAL: La comedia física (gestos demostrativos, caras graciosas durante la demo) trasciende barreras del idioma. Las acciones son más divertidas que las palabras.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When Humor Backfires',
      textEs: 'Cuando el Humor Se Vuelve en Contra'
    },
    {
            type: 'bullets',
      items: [
        'FORCED HUMOR: If it doesn\'t come naturally to you, don\'t force it. Awkward humor is worse than no humor.',
        'TOO MUCH: One joke opens the door. Three jokes makes you a comedian trying to sell something. Keep it light and move on.',
        'AT SOMEONE\'S EXPENSE: Never joke about the customer\'s appearance, clothing, or companion. Self-deprecating humor ONLY.',
        'INAPPROPRIATE TOPICS: Stay away from politics, religion, crude humor, or anything edgy. Keep it universally safe.',
        'IGNORING SIGNALS: If they don\'t laugh at your first attempt, pivot. Don\'t keep trying to \'win them over\' with humor.'
      ],
      itemsEs: [
        'HUMOR FORZADO: Si no te sale natural, no lo fuerces. El humor incómodo es peor que ningún humor.',
        'DEMASIADO: Una broma abre la puerta. Tres bromas te convierten en un comediante intentando vender algo. Manténlo ligero y sigue adelante.',
        'A COSTA DE ALGUIEN: Nunca bromees sobre la apariencia, ropa o acompañante del cliente. Humor autodepreciativo SOLAMENTE.',
        'TÓPICOS INAPROPIADOS: Mantente alejado de política, religión, humor vulgar o cualquier cosa controversial. Mantenlo universalmente seguro.',
        'IGNORAR SEÑALES: Si no se ríen en tu primer intento, pivotea. No sigas intentando \'conquistarlos\' con humor.'
      ]
    },
    {
            type: 'script',
      text: '\'I know what you\'re thinking — not another salesperson! I think the same thing when I\'m shopping. But here\'s the thing — this demo takes literally two minutes, and everyone who tries it walks out smiling. Even the people who don\'t buy. Want to see why?\' Humor → relatability → value proposition → invitation.',
      textEs: '\'Sé lo que estás pensando — ¡otro vendedor! Yo pienso lo mismo cuando voy de compras. Pero mira — esta demo toma literalmente dos minutos, y todos los que la prueban se van sonriendo. Hasta los que no compran. ¿Quieres ver por qué?\' Humor → empatía → propuesta de valor → invitación.'
    },
    {
            type: 'quote',
      text: 'Laughter is the shortest distance between two strangers. Cross that distance, and the rest of the sale becomes a conversation.',
      textEs: 'La risa es la distancia más corta entre dos desconocidos. Cruza esa distancia, y el resto de la venta se convierte en una conversación.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines'
    }
    ],
    quiz: [
    {
      question: 'What is the humor stop formula?',
      options: [
        'Tell as many jokes as possible',
        'Light observational humor + self-awareness about selling + quick transition to value',
        'Make fun of the customer gently',
        'Use physical comedy only'
      ],
      correctIndex: 1,
      explanation: 'The humor stop uses light observational humor, acknowledges the awkwardness of street selling, and quickly transitions to value. You\'re not doing stand-up — you\'re breaking tension with a smile.',
    },
    {
      question: 'Which type of humor is universally safest in sales?',
      options: [
        'Political humor',
        'Self-deprecating humor',
        'Sarcasm about the customer',
        'Edgy jokes'
      ],
      correctIndex: 1,
      explanation: 'Self-deprecating humor is safest because it shows confidence and vulnerability without risking offense. You\'re the punchline, never the customer.',
    },
    {
      question: 'What should you do if a customer doesn\'t laugh at your first humorous attempt?',
      options: [
        'Try harder with more jokes',
        'Pivot immediately to a warm, professional tone',
        'Give up on that customer',
        'Make a more extreme joke'
      ],
      correctIndex: 1,
      explanation: 'If humor doesn\'t land on the first attempt, pivot immediately. Don\'t keep trying — it becomes awkward. Read the customer\'s receptivity and adapt your approach.',
    }
    ],
  },
  'stop-4': {
    id: 'stop-4',
    categoryId: 'stopping',
    title: 'The Urgency Stop',
    subtitle: 'Creating FOMO — ethical urgency vs. pushy pressure',
    duration: '8 min',
    icon: 'Clock',
    order: 4,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Make Them Feel the Moment'
    },
    {
            type: 'paragraph',
      text: 'Urgency is one of the oldest and most effective sales tools because it works with human psychology. When people feel that an opportunity is limited — in time, quantity, or availability — they act faster. Without urgency, decisions get postponed indefinitely. With urgency, decisions happen NOW. The key is creating genuine urgency without being manipulative or pushy.'
    },
    {
            type: 'keypoint',
      text: 'Ethical urgency means highlighting real, verifiable limitations. Pushy pressure means inventing false scarcity. Customers can smell fake urgency. Real urgency creates excitement. Fake urgency creates resistance.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Types of Urgency That Work'
    },
    {
            type: 'numbered',
      items: [
        'TIME-BASED URGENCY: \'We\'re closing in 30 minutes\' or \'This offer ends today.\' Real, verifiable time limits. The customer knows these are true and acts accordingly.',
        'QUANTITY-BASED URGENCY: \'I only have two samples left\' or \'We sold out of this scent last weekend.\' Limited availability creates competition instinct.',
        'LOCATION-BASED URGENCY: \'This price only exists in Andorra. Once you cross the border, it\'s back to €500.\' The tax-haven advantage IS genuine scarcity.',
        'SEASONAL URGENCY: \'Christmas is two weeks away and these are our most popular gifts. I\'d hate for you to miss out.\' Seasonal relevance creates natural deadlines.',
        'EXPERIENTIAL URGENCY: \'You\'ve already felt the difference. You know it works. This result is waiting for you — why wait?\' The demo itself creates urgency because they\'ve experienced the value.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Urgency Openers by Situation'
    },
    {
            type: 'bullets',
      items: [
        '\'I only have two samples of our best-seller left — want to see what everyone\'s been talking about?\' (Quantity scarcity)',
        '\'We\'re closing soon, but I can squeeze you in for a 2-minute demo that\'ll blow your mind.\' (Time pressure + value)',
        '\'This offer literally ends when we close tonight. I know, it sounds like a sales line, but check the sign — it\'s real.\' (Transparency builds trust)',
        '\'The last customer bought our last two scrubs in this scent. Want to see what the hype is about before the rest are gone?\' (Social proof + scarcity)',
        '\'You\'re here at the perfect time — we just restocked the syringe after selling out all weekend. But they go fast.\' (Fresh availability creates urgency)'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Ethical Urgency vs. Pushy Pressure'
    },
    {
            type: 'comparison',
      left: { label: 'Ethical Urgency (Good)', text: 'Based on real facts. \'We\'re closing in 20 minutes\' when you actually are. Creates excitement and motivation. Customer feels informed, not pressured. Respects their decision-making.' },
      right: { label: 'Pushy Pressure (Bad)', text: 'Based on lies or manipulation. \'This is the last one\' when there are 20 more in the back. Creates anxiety and resentment. Customer feels trapped and manipulated. Destroys trust and referrals.' }
    },
    {
            type: 'tip',
      text: 'The best urgency is REAL urgency. If you actually are low on stock, say so. If the offer actually ends today, say so. When urgency is verifiable, it works. When it\'s fabricated, customers sense it and trust evaporates.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Seasonal Urgency: Christmas & Ski Season'
    },
    {
            type: 'paragraph',
      text: 'Andorra\'s peak season (November-February) creates natural urgency that you should leverage:'
    },
    {
            type: 'bullets',
      items: [
        'CHRISTMAS SHOPPING: \'This is the easiest Christmas gift you\'ll buy. Everyone loves it, it\'s unisex, and it actually gets used.\' Gift purchases have a natural deadline — December 25th.',
        'LAST-MINUTE GIFTS: \'Christmas is in 5 days. If you\'re still looking for gifts, this is your answer. Small, elegant, and under €60.\'',
        'SKI SEASON: \'After a day on the slopes, your skin is so dry from the mountain air. This is what the locals use to recover.\' Seasonal relevance creates immediate need.',
        'WEEKEND RUSH: \'Weekends are crazy here. I\'d hate for you to come back and find your scent sold out.\' Weekend timing creates shopping pressure.'
      ]
    },
    {
            type: 'script',
      text: '\'Look, I\'m not going to give you the fake pressure thing. But I will tell you the truth: we sold 40 of these yesterday, and I have 8 left. The weekend rush starts tomorrow. If you know you want it, I\'d grab it now. If you\'re not sure, no pressure — but I can\'t guarantee it\'ll be here tomorrow.\' Honest, transparent urgency. This builds trust while creating motivation.'
    },
    {
            type: 'quote',
      text: 'Urgency isn\'t about pressuring people. It\'s about helping them overcome procrastination. The customer who genuinely wants your product but leaves to \'think about it\' often never returns. Urgency helps them make the decision they already want to make.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What is the difference between ethical urgency and pushy pressure?',
      options: [
        'There is no difference',
        'Ethical urgency is based on real facts; pushy pressure uses lies or manipulation',
        'Ethical urgency is more aggressive',
        'Pushy pressure works better'
      ],
      correctIndex: 1,
      explanation: 'Ethical urgency highlights real, verifiable limitations (actual closing time, real stock levels). Pushy pressure invents false scarcity. Customers detect fake urgency and trust evaporates.',
    },
    {
      question: 'Which type of urgency is the tax-haven pricing advantage?',
      options: [
        'Time-based urgency',
        'Location-based urgency',
        'Quantity-based urgency',
        'Seasonal urgency'
      ],
      correctIndex: 1,
      explanation: 'The tax-haven pricing is location-based urgency. The €300 price only exists in Andorra. Once the customer crosses the border, the price goes back to €500. This is genuine, verifiable scarcity.',
    },
    {
      question: 'Why does urgency help customers who genuinely want your product?',
      options: [
        'It tricks them into buying',
        'It helps them overcome procrastination and make a decision they already want to make',
        'It makes them feel guilty',
        'It confuses them'
      ],
      correctIndex: 1,
      explanation: 'Urgency helps customers overcome natural procrastination. Many customers who leave to \'think about it\' never return. Ethical urgency helps them make the decision they already want to make.',
    }
    ],
  },
  'stop-5': {
    id: 'stop-5',
    categoryId: 'stopping',
    title: 'Product-Specific Stops',
    subtitle: 'Detailed scripts for each product matched to the person\'s visible traits',
    duration: '10 min',
    icon: 'Sparkles',
    order: 5,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Match the Product to the Person'
    },
    {
            type: 'paragraph',
      text: 'Generic stops work. Targeted stops work BETTER. When you match the product to something visible about the person, your stop feels personalized and relevant — not random. A woman with beautiful natural nails is the perfect Nail Kit target. Someone with visible under-eye bags is your Syringe customer. Reading the person\'s traits and matching them to the right product transforms your hit rate.'
    },
    {
            type: 'keypoint',
      text: 'The formula: Observe a trait → Connect it to the product → Deliver a personalized opener. This makes the customer feel seen, not targeted.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Syringe Stop (Eye Treatment)'
    },
    {
            type: 'paragraph',
      text: 'Best targets: visible under-eye bags, crow\'s feet, tired-looking eyes, people who mention looking exhausted, older customers (40+) concerned with aging.'
    },
    {
            type: 'bullets',
      items: [
        'THE DIRECT APPROACH: \'You look amazing — but the eyes... maybe we can make them look even more relaxed?\' Said with a cheeky smile. This opener acknowledges their overall appearance while pinpointing the improvement area.',
        'THE TIRED TRAVELER: \'Long trip? I can see it in your eyes — and not in a good way. Let me fix that in two minutes.\' For people who genuinely look tired from travel.',
        'THE AGE-APPROPRIATE: \'You clearly take great care of yourself. Want to see what I can do around the eyes? It\'s like a spa treatment in two minutes.\' Positions it as enhancement, not correction.',
        'THE COMPLEMENT TO MAKEUP: \'Your makeup is flawless! Let me show you something that makes the eyes pop even more without any makeup.\' Appeals to beauty enthusiasts.'
      ]
    },
    {
            type: 'script',
      text: '\'You have beautiful eyes — but I can see the travel fatigue. Let me show you our secret weapon. Two minutes, one eye, and you\'ll see the difference yourself in the mirror. It\'s honestly shocking.\' Specific observation + time promise + intrigue.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Peeling Stop (Glow Treatment)'
    },
    {
            type: 'paragraph',
      text: 'Best targets: dull skin, dry skin, people asking about skincare routines, younger customers (20s-30s) focused on glow, people who mention wanting \'fresher\' skin.'
    },
    {
            type: 'bullets',
      items: [
        'THE GLOW HOOK: \'Your skin is nice, but I can give you that \'just got back from vacation\' glow in two minutes. Want to see?\'',
        'THE SKINCARE ENTHUSIAST: \'I can tell you care about your skin. Let me show you my favorite weekly treatment — it\'s completely different from daily cream.\'',
        'THE DRY SKIN ANGLE: \'The mountain air here is so drying. Let me show you something that removes all the dead skin instantly — your cream will work 10 times better.\'',
        'THE AGE-DEFYING: \'This is what I use once a week to keep my skin looking fresh. Want to try it? It\'s like a facial at home.\' Peer recommendation works especially well from younger staff.'
      ]
    },
    {
            type: 'script',
      text: '\'Let me show you my favorite quick trick for glowing skin. It\'s a weekly treatment that removes all the dead layers — your regular cream will work so much better after. Two minutes, and you\'ll feel the difference immediately.\' Quick, friendly, no pressure.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Scrub & Body Butter Stop'
    },
    {
            type: 'paragraph',
      text: 'Best targets: dry hands (especially in winter), people mentioning the mountain air, eczema or dry skin concerns, gift buyers, couples (great unisex product).'
    },
    {
            type: 'bullets',
      items: [
        'THE DRY SKIN QUESTION: \'Do you ever get dry skin? Ugh, I know — it\'s the worst. You know what? Let me give you something amazing. Come!\' This classic opener works because almost everyone has dry skin, especially in Andorra.',
        'THE SENSORY HOOK: \'Want to feel something incredible? This is from the Dead Sea — lowest place on Earth, highest mineral concentration. Your hands have never felt this soft.\'',
        'THE GIFT ANGLE: \'Looking for Christmas gifts? This is our most popular one — everyone loves it, it\'s unisex, and it\'s actually useful. Feel this...\'',
        'THE COVID LEGACY: \'Since Covid, everyone\'s hands are so dry from sanitizer. This became our #1 seller — people were like, \'Finally something that actually helps!\'\''
      ]
    },
    {
            type: 'script',
      text: '\'Do you ever get dry skin, especially in winter? Let me show you something from the Dead Sea. Rub this on your hand... now add water... feel that? That\'s not just soft — that\'s mineral-treated skin. And it lasts even after you wash your hands.\' Interactive demo + education.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Nail Kit Stop'
    },
    {
            type: 'paragraph',
      text: 'Best targets: natural nails (no heavy polish), well-maintained nails, younger women, gift buyers, people who appreciate natural beauty.'
    },
    {
            type: 'bullets',
      items: [
        'THE NATURAL NAIL APPRECIATION: \'Wow! You always keep your nails natural? That\'s awesome. Let me give you a small gift — you\'re gonna love this.\'',
        'THE CONTRAST APPROACH: \'I see you have polish on — that\'s pretty! But you know what? Let me show you how gorgeous your natural nail can look without any chemicals.\'',
        'THE GIFT APPROACH: \'These make the perfect gifts — small, elegant, and everyone actually uses them. Watch this...\'',
        'THE SALON ALTERNATIVE: \'This replaces salon visits. Natural shine that lasts two weeks, no chemicals, lifetime warranty. Look at this...\''
      ]
    },
    {
            type: 'script',
      text: '\'Wow, you keep your nails so natural and healthy! Let me show you something — this isn\'t a regular buffer. It brings out your natural shine without any polish or chemicals. Watch... see? Nothing yet. Now the last step... WOW. That is YOUR natural nail. No polish. It stays like this for two weeks.\' Build anticipation, deliver the reveal.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Matching Multiple Products'
    },
    {
            type: 'paragraph',
      text: 'Sometimes you can offer multiple products in one stop. Here\'s when to combine:'
    },
    {
            type: 'bullets',
      items: [
        'THE CLASSIC TRIO (€120): Scrub + Body Butter + Nail Kit. Best for: gift shoppers, couples, people who want variety.',
        'THE SPA TRIO (€120): Scrub + Body Butter + Face Cleanser. Best for: self-care focused customers, people interested in routines.',
        'THE SMART DUO (€60): Scrub + Nail Kit. Best for: budget-conscious buyers, the Nail Kit already includes cream.',
        'THE SCENT DUO (€60): Scrub + Body Butter. Best for: people who love the sensory experience of the scrub demo.'
      ]
    },
    {
            type: 'tip',
      text: 'Start with ONE product in your stop. Once they\'re inside and engaged, you can introduce combos and additional products. Leading with multiple options confuses the stop. Simplify to amplify.'
    },
    {
            type: 'quote',
      text: 'The best stops don\'t feel like stops. They feel like a friend noticing something about you and offering a helpful suggestion. That\'s what happens when you match the product to the person.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'What is the formula for a product-specific stop?',
      options: [
        'Mention all products at once',
        'Observe a trait → Connect it to the product → Deliver a personalized opener',
        'Lead with the price',
        'Ask if they want to buy'
      ],
      correctIndex: 1,
      explanation: 'The formula is: observe a visible trait, connect it naturally to a specific product, then deliver a personalized opener. This makes the stop feel relevant, not random.',
    },
    {
      question: 'Who is the best target for the Syringe stop?',
      options: [
        'Young children',
        'People with visible under-eye concerns, tired eyes, or aging concerns',
        'People who hate skincare',
        'Men only'
      ],
      correctIndex: 1,
      explanation: 'The Syringe (eye treatment) is best matched to people with visible under-eye bags, crow\'s feet, tired-looking eyes, or those concerned with aging around the eyes.',
    },
    {
      question: 'Why should you start with one product in your stop rather than offering multiple products?',
      options: [
        'You only have one product to sell',
        'Multiple options confuse the stop; simplify to amplify',
        'Customers only want one product',
        'It\'s company policy'
      ],
      correctIndex: 1,
      explanation: 'Leading with multiple products confuses the stop. Start with one clear, targeted product to get them inside. Once engaged, you can introduce combos and additional products.',
    }
    ],
  },
  'stop-6': {
    id: 'stop-6',
    categoryId: 'stopping',
    title: 'The Recovery Stop',
    subtitle: 'What to do when they say \'no\' — second attempts, seed planting, and graceful exits',
    duration: '8 min',
    icon: 'RotateCcw',
    order: 6,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: '\'No\' Is Not the End. It\'s Just the Beginning.'
    },
    {
            type: 'paragraph',
      text: 'Most salespeople hear \'no thanks\' and immediately give up. Top performers know that \'no\' often means \'not yet,\' \'not this product,\' \'not from this angle,\' or simply \'I need a moment.\' A recovery stop is your second chance — and second chances convert at surprising rates when handled well. The recovery isn\'t about being pushy; it\'s about being persistent with grace.'
    },
    {
            type: 'keypoint',
      text: 'Statistics show that 44% of salespeople give up after one \'no.\' Yet 80% of sales require at least five follow-up contacts. The salesperson who recovers gracefully after rejection outperforms the one who quits on the first \'no.\''
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Why They Said No (And What to Do About It)'
    },
    {
            type: 'paragraph',
      text: 'Not all \'nos\' are equal. Understanding which type you\'re dealing with determines your recovery strategy:'
    },
    {
            type: 'bullets',
      items: [
        'THE REFLEX NO: Automatic, without thinking. They didn\'t even process what you said. Response: Acknowledge and re-engage with humor or curiosity.',
        'THE RUSH NO: \'No thanks, I\'m in a hurry.\' They have somewhere to be. Response: Respect the time constraint, offer a faster alternative.',
        'THE SKEPTICAL NO: \'I don\'t believe you.\' They\'ve been burned before. Response: Social proof, evidence, or a no-risk trial.',
        'THE BUDGET NO: \'I can\'t afford it.\' Real or perceived price barrier. Response: Emphasize value, offer a lower price point, or reframe as an investment.',
        'THE POLITE NO: \'No thank you.\' Said gently, often with a smile. They\'re not interested but are being nice. Response: Plant a seed and let them go warmly.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Second Attempt Techniques'
    },
    {
            type: 'paragraph',
      text: 'When the first stop fails, try one of these recovery approaches:'
    },
    {
            type: 'numbered',
      items: [
        'THE HUMOR RECOVERY: \'I know, I know — you weren\'t planning to stop today. But I promise you, this is the one time you\'ll be glad you did. Thirty seconds?\' Humor disarms the automatic \'no.\'',
        'THE CURIOSITY HOOK: \'I get it — you\'re busy. But can I ask you something? When was the last time a stranger showed you something that actually impressed you?\' Curiosity overrides rejection.',
        'THE TIME-RESPECTFUL RECOVERY: \'I totally understand. How about this — I won\'t even explain. Just let me do the demo. If you don\'t love it in 30 seconds, you walk away. Deal?\' Removes the risk of being trapped in a long pitch.',
        'THE SOCIAL PROOF RECOVERY: \'You know what? Every single person who just walked past me said the same thing. And every single one who came back to try it bought something. I\'m just saying...\' Creates intrigue through social proof.',
        'THE GIFT REFRAME: \'I know you weren\'t looking for it, but I want to GIVE you something. No purchase, no catch. Just a free hand treatment because your hands deserve it.\' Reframing as a gift removes the sales pressure.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Humorous Recovery Lines'
    },
    {
            type: 'paragraph',
      text: 'These work best with customers who smiled or seemed friendly even while saying no:'
    },
    {
            type: 'bullets',
      items: [
        '\'You\'re breaking my heart! Just kidding — but seriously, you\'re missing out.\'',
        '\'Okay, but when you walk past our shop later and see everyone smiling inside, you\'ll wonder what you missed.\'',
        '\'I\'ll be here all day. When you change your mind after seeing someone else\'s results, come find me!\'',
        '\'My manager is watching — can you at least pretend to be interested for 10 seconds?\' (Self-deprecating humor that creates connection.)',
        '\'That\'s the fourth \'no\' in a row. You\'re all going to make me cry!\' (Playful, not desperate.)'
      ]
    },
    {
            type: 'tip',
      text: 'Recovery humor only works if your energy is genuinely playful, not needy. If you feel desperate, customers sense it. Recover from a place of abundance (\'I have something great to show you\') not scarcity (\'Please, I need this sale\').'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Seed Planting Technique'
    },
    {
            type: 'paragraph',
      text: 'Sometimes the best recovery is no recovery at all. Sometimes you plant a seed and let it grow:'
    },
    {
            type: 'script',
      text: '\'No problem at all! Enjoy your day in Andorra. But hey — when you see someone walk out of our shop with that \'wow\' look on their face, remember I offered!\' This plants a seed of curiosity. They might walk past later, see a happy customer, and come back. It happens more than you think.'
    },
    {
            type: 'bullets',
      items: [
        'GIVE THEM A CARD OR FLYER: Physical reminders work. Something they can put in their pocket and consider later.',
        'MENTION YOUR LOCATION: \'We\'re right here — number 15. If you change your mind, just pop in.\' Makes returning feel easy.',
        'REFERENCE A SPECIFIC PRODUCT: \'If you find yourself thinking about glowing skin later, ask for the Peeling. That\'s the one everyone comes back for.\'',
        'LEAVE THE DOOR OPEN: \'No pressure at all. If you pass by later and feel like it, I\'ll be here. I\'d love to show you then.\' Warm, non-desperate, inviting.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Knowing When to Let Go'
    },
    {
            type: 'paragraph',
      text: 'This is critical: recovery stops work, but pushy persistence doesn\'t. There\'s a line between persistence and harassment. Here\'s how to know when to stop:'
    },
    {
            type: 'bullets',
      items: [
        'ONE RECOVERY ATTEMPT: If they say no and you try one recovery, that\'s professional persistence.',
        'TWO RECOVERY ATTEMPTS: If the first recovery fails and they seem receptive, a second (different) approach is acceptable.',
        'THREE OR MORE: This is pushing. If two attempts fail, let them go gracefully. Pursuing further damages your reputation and the shop\'s reputation.',
        'BODY LANGUAGE SIGNALS: Crossed arms, stepping away, flat expression, no engagement — these are definitive \'stop\' signals. Respect them immediately.',
        'VERBAL SHUTDOWN: \'Please leave me alone,\' \'I said no,\' or aggressive language means immediate disengagement. Smile, apologize, and step back.'
      ]
    },
    {
            type: 'quote',
      text: 'The salesperson who knows when to walk away earns more respect than the one who never lets go. A graceful exit plants a seed for tomorrow. A desperate chase burns every bridge.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'According to research, what percentage of sales require at least five follow-up contacts?',
      options: [
        '20%',
        '44%',
        '80%',
        '95%'
      ],
      correctIndex: 2,
      explanation: 'Research shows 80% of sales require at least five follow-up contacts, yet 44% of salespeople give up after one \'no.\' Persistence with grace is a massive competitive advantage.',
    },
    {
      question: 'What is the \'seed planting\' technique?',
      options: [
        'Forcing a sale through repeated attempts',
        'Planting a curiosity seed that may bring the customer back later',
        'Giving them a physical plant as a gift',
        'Asking them to plant a tree'
      ],
      correctIndex: 1,
      explanation: 'Seed planting means leaving the customer with a positive, curiosity-inducing final impression that may bring them back later. It references what they might see or feel after leaving.',
    },
    {
      question: 'How many recovery attempts should you generally make before letting go?',
      options: [
        'As many as it takes',
        'One to two attempts maximum, then let go gracefully',
        'Never attempt recovery — respect the first no',
        'Five or more — statistics say persistence pays'
      ],
      correctIndex: 1,
      explanation: 'One recovery attempt is professional persistence. Two is acceptable if they seem receptive. Three or more is pushing into harassment territory. Know when to walk away gracefully.',
    }
    ],
  },
  'stop-7': {
    id: 'stop-7',
    categoryId: 'stopping',
    title: 'Finding YOUR Stopping Style',
    subtitle: 'Why copying others does not work — assessing your personality and building your unique approach',
    duration: '8 min',
    icon: 'Compass',
    order: 7,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Your Best Style Is the One That Fits YOU'
    },
    {
            type: 'paragraph',
      text: 'New salespeople often try to copy the top performer verbatim. They use the same words, the same gestures, the same energy. And it falls flat. Why? Because the top performer has found a style that fits THEIR personality — their humor, their energy, their body language, their voice. You need to find YOURS. The goal isn\'t to be a clone. It\'s to be the best version of yourself on the floor.'
    },
    {
            type: 'keypoint',
      text: 'There is no single \'best\' stopping style. The best style is the one that feels authentic to YOU while being effective with customers. A calm, warm seller can outsell a high-energy seller — if they lean into their strengths.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Personality Assessment: Who Are You on the Floor?'
    },
    {
            type: 'paragraph',
      text: 'Before choosing your style, honestly assess your natural tendencies:'
    },
    {
            type: 'bullets',
      items: [
        'HIGH ENERGY or CALM? Do you naturally speak fast, move quickly, and radiate enthusiasm? Or are you more measured, warm, and steady? Both work — but forcing calm when you\'re energetic (or vice versa) feels fake.',
        'DIRECT or INDIRECT? Do you prefer getting straight to the point? Or do you like building rapport first, easing into the pitch? Drivers can be direct. Amiables should build connection first.',
        'HUMOR-DRIVEN or SERIOUS? Are you naturally funny? Do people laugh around you? If yes, humor is your weapon. If not, warmth and professionalism are just as powerful.',
        'VERBAL or PHYSICAL? Some sellers captivate with words — smooth talkers. Others captivate with the demo — the product does the talking. Know which one you are.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Four Stopping Archetypes'
    },
    {
            type: 'paragraph',
      text: 'These archetypes aren\'t boxes — they\'re starting points. Most people blend two:'
    },
    {
            type: 'numbered',
      items: [
        'THE ENERGIZER: High energy, fast-paced, loud and proud. Uses humor, excitement, and enthusiasm to draw people in. Best for: Young crowds, groups, holiday shoppers, high-traffic periods. Risk: Can overwhelm introverts or older customers.',
        'THE WARM INVITER: Calm, warm, genuinely caring. Builds rapport slowly. Uses gentle curiosity and kindness. Best for: Couples, older customers, serious buyers, afternoon lulls. Risk: Can seem low-energy during peak times.',
        'THE EXPERT: Knowledgeable, confident, authority-driven. Leads with facts and lets the product speak. Best for: Analytical buyers, French tourists, skeptical customers. Risk: Can feel cold without enough warmth.',
        'THE CHAMELEON: Adapts to each customer. High energy with energetic people, calm with calm people. Flexible and observant. Best for: Sellers with strong empathy and reading skills. Risk: Can feel inconsistent if not grounded in authenticity.'
      ]
    },
    {
            type: 'comparison',
      left: { label: 'High-Energy Approach', text: '\'HEY! Oh my gosh, you have to see this! Come here, come here — two minutes, I promise you\'ll freak out!\' Works brilliantly for some. Exhausting and off-putting for others. Use when the situation matches your natural enthusiasm.' },
      right: { label: 'Calm Approach', text: '\'Excuse me — I know you\'re busy, but I have something that might surprise you. Just two minutes, and if you don\'t love it, no hard feelings.\' Warm, respectful, confident. Some customers prefer this 100% of the time.' }
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Testing Different Styles'
    },
    {
            type: 'paragraph',
      text: 'Finding your style requires experimentation. Here\'s a systematic approach:'
    },
    {
            type: 'numbered',
      items: [
        'WEEK 1 — OBSERVE: Don\'t experiment yet. Just watch your teammates. Notice what each person does. What feels natural to you when you watch? What makes you cringe? Your reactions are data.',
        'WEEK 2 — TEST HIGH ENERGY: Even if you\'re calm, try one high-energy shift. Ramp up your enthusiasm. Speak louder. Move faster. See what happens. Track your stops and closes.',
        'WEEK 3 — TEST CALM ENERGY: Now try the opposite. Slow down. Speak softly. Build rapport before pitching. Track the difference in customer response.',
        'WEEK 4 — TEST DIRECT vs. INDIRECT: Try shifts where you get straight to the point vs. shifts where you build connection first. Which feels better? Which gets better results?',
        'WEEK 5 — BLEND: By now you know what works. Create YOUR hybrid — the style that blends your natural personality with the techniques that got the best results.'
      ]
    },
    {
            type: 'tip',
      text: 'Track your numbers by style. Write down: energy level (1-10), approach type (direct/indirect), and result. After two weeks of tracking, patterns will emerge. Let data guide your style development, not just feelings.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Recording Yourself'
    },
    {
            type: 'paragraph',
      text: 'This is uncomfortable but incredibly valuable. Ask a teammate to record a few of your stops on your phone. Then watch the footage. You\'ll notice things you never knew you did:'
    },
    {
            type: 'bullets',
      items: [
        'BODY LANGUAGE: Are your arms crossed? Are you leaning away? Is your posture confident or collapsed?',
        'FACIAL EXPRESSION: Are you genuinely smiling or forcing it? Do your eyes match your mouth?',
        'VOICE: Do you sound confident? Do you speak too fast? Do you end statements like questions (upspeak)?',
        'TIMING: Are you giving them space to respond? Or are you rushing through your pitch?',
        'TRANSITION: How do you move from opener to demo? Is it smooth or awkward?'
      ]
    },
    {
            type: 'tip',
      text: 'Record yourself once per month. It\'s the fastest way to see your progress. Most people are shocked by how much they\'ve improved after just one month of recording and adjusting.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Getting Feedback from Teammates'
    },
    {
            type: 'paragraph',
      text: 'Your teammates see you from the outside. Their feedback is gold. Here\'s how to get useful feedback:'
    },
    {
            type: 'bullets',
      items: [
        'ASK SPECIFIC QUESTIONS: Not \'How am I doing?\' but \'Did my energy seem high or low during that last stop?\' or \'Was my opener clear?\' Specific questions get specific answers.',
        'ASK YOUR TOP PERFORMER: \'What do you think is my biggest opportunity for improvement?\' Top performers usually have sharp observational skills.',
        'ASK SOMEONE YOU TRUST: Feedback feels safer from someone who cares about you. Find a teammate you trust and ask for honest input.',
        'RECEIVE WITHOUT DEFENSIVENESS: When someone gives feedback, say \'Thank you\' and process it. Defensive reactions shut down future feedback.'
      ]
    },
    {
            type: 'quote',
      text: 'The best stopping style isn\'t the one that looks best on someone else. It\'s the one that makes you feel confident, authentic, and effective. Find it, refine it, own it.',
      attribution: 'Zero Lines Method'
    }
    ],
    quiz: [
    {
      question: 'Why is copying the top performer\'s style verbatim usually ineffective?',
      options: [
        'Because the top performer is naturally talented',
        'Because the top performer\'s style fits THEIR personality, not yours',
        'Because customers prefer new approaches',
        'Because it\'s unethical'
      ],
      correctIndex: 1,
      explanation: 'The top performer has found a style that fits their unique personality, humor, energy, and voice. Your style should be the best version of YOU, not a clone of someone else.',
    },
    {
      question: 'What is the recommended method for testing different stopping styles?',
      options: [
        'Switch styles randomly every hour',
        'Systematically test one style per week and track your results',
        'Only use the style that feels most comfortable immediately',
        'Copy each teammate for one day'
      ],
      correctIndex: 1,
      explanation: 'Systematic testing over weeks with tracked results lets you compare what works. Test high energy, calm energy, direct and indirect approaches, then blend what worked best into your unique hybrid.',
    },
    {
      question: 'Why is recording yourself valuable for style development?',
      options: [
        'To post on social media',
        'To see your blind spots — body language, voice, timing, and facial expressions you don\'t notice in the moment',
        'To show the manager you\'re working',
        'To send to customers'
      ],
      correctIndex: 1,
      explanation: 'Recording reveals blind spots you can\'t see yourself — posture, facial expressions, voice tone, pacing, and awkward transitions. Watching footage is the fastest way to spot improvement opportunities.',
    }
    ],
  },
};

// ── Helper functions ──
export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getLessonsForCategory(categoryId: string): Lesson[] {
  const cat = getCategory(categoryId);
  if (!cat) return [];
  return cat.lessonOrder
    .map((id) => lessons[id])
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

export function getLesson(id: string): Lesson | undefined {
  return lessons[id];
}

export function getNextLesson(lessonId: string): Lesson | undefined {
  const lesson = lessons[lessonId];
  if (!lesson) return undefined;
  const catLessons = getLessonsForCategory(lesson.categoryId);
  const idx = catLessons.findIndex((l) => l.id === lessonId);
  return catLessons[idx + 1];
}

export function getTotalLessons(): number {
  return Object.keys(lessons).length;
}
