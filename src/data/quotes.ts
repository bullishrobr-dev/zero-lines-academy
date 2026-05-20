// ─────────────────────────────────────────────────────────────
// Motivational Quotes for the Home Dashboard
// ─────────────────────────────────────────────────────────────

export interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The best salespeople don't have better pitches. They have better eyes.", author: "Zero Lines Method" },
  { text: "Every expert was once a beginner. Every pro was once an amateur.", author: "Helen Hayes" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
  { text: "Your energy introduces you before you even speak. Own the room.", author: "Zero Lines Method" },
  { text: "No stop, no sale. Courage is a muscle — train it daily.", author: "Zero Lines Method" },
  { text: "People don't care how much you know until they know how much you care.", author: "Theodore Roosevelt" },
  { text: "The master has failed more times than the beginner has even tried.", author: "Stephen McCranie" },
  { text: "Your vibe attracts your tribe. Bring the energy.", author: "Zero Lines Method" },
  { text: "The product sells itself once you learn how to show it.", author: "Zero Lines Academy" },
  { text: "Confidence is not 'they will like me.' Confidence is 'I'll be fine if they don't.'", author: "Christina Grimmie" },
  { text: "Stop selling. Start helping.", author: "Zig Ziglar" },
  { text: "The best investment you can make is in yourself.", author: "Warren Buffett" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Sales are contingent upon the attitude of the salesman, not the attitude of the prospect.", author: "William Clement Stone" },
  { text: "Become the person who would attract the results you seek.", author: "Jim Cathcart" },
  { text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.", author: "Stephen Covey" },
  { text: "A year from now you may wish you had started today.", author: "Karen Lamb" },
  { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "If you are working on something exciting, it will motivate you to keep going.", author: "Steve Jobs" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "Your only limit is your mind.", author: "Anonymous" },
  { text: "Excellence is not a skill. It's an attitude.", author: "Ralph Marston" },
  { text: "The only way to achieve the impossible is to believe it is possible.", author: "Charles Kingsleigh" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "A satisfied customer is the best business strategy of all.", author: "Michael LeBoeuf" },
];

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default quotes;
