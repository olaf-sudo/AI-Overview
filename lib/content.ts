/**
 * Alle copy en data van de landingspagina op één plek.
 * Taal: Engels. Merknaam: "AI Overview".
 */

export type AiKey = "chatgpt" | "gemini" | "claude";

export type Ai = {
  key: AiKey;
  /** Volledige naam, voor alt-teksten en rapportrijen */
  name: string;
  /** Korte naam, voor tabelkoppen */
  short: string;
  src: string;
};

/** Volgorde is overal: ChatGPT, Gemini, Claude. */
export const AIS: Ai[] = [
  { key: "chatgpt", name: "ChatGPT", short: "ChatGPT", src: "/logos/openai.svg" },
  { key: "gemini", name: "Google Gemini", short: "Gemini", src: "/logos/gemini-color.svg" },
  { key: "claude", name: "Claude", short: "Claude", src: "/logos/claude-color.svg" },
];

/* ---------------------------------------------------------------- *
 * Hero
 * ---------------------------------------------------------------- */
export const HERO = {
  brand: "AI Overview",
  /** De kop wordt gesplitst rond het gemarkeerde deel. */
  h1Before: "Get your company into ",
  h1Highlight: "Google's AI Overview",
  h1After: ".",
  lead: "There's a new number 1 spot on Google, above the ads and above every blue link. One answer, a handful of sources, and that's where your buyers stop scrolling. We make sure that answer names you.",
  chip: { domain: "yoursite.com", more: "+1" },
  stepsTitle: "How it works",
  steps: [
    { title: "Add your blog domain:", body: "connect the domain where your content lives." },
    { title: "Add the blog URL to your footer:", body: "one link tells AI engines where to look." },
    { title: "Done:", body: "we make sure AI engines find you, trust you, and name you." },
  ],
  placeholder: "yourwebsite.com",
  inputLabel: "Your website",
  submitLabel: "Submit",
  scrollHint: "Scroll down for more info",
};

export const TRUST = ["Takes 30 seconds", "No account needed", "Cancel any month"];

/* ---------------------------------------------------------------- *
 * 2. Cijferbalk
 * ---------------------------------------------------------------- */
export const STATS = {
  title: "This is how people search now.",
  sub: "Not in ten blue links any more, but in one answer.",
  items: [
    { n: "45%", label: "ask AI for a local business", src: "BrightLocal 2026" },
    { n: "7.5x", label: "more than a year ago", src: "From 6% to 45%" },
    {
      n: "3 to 5",
      label: "businesses AI names per question. The rest do not exist.",
      src: "Uberall 2026",
    },
  ],
};

/* ---------------------------------------------------------------- *
 * 3. Google-sectie
 * ---------------------------------------------------------------- */
export const GOOGLE = {
  pill: "Why this counts",
  h2: "Even in Google, Gemini's answer sits on top.",
  body: "Above the ads. Above the regular results. If you are not in that answer, you are invisible to most searchers.",
  stats: [
    {
      n: "40%+",
      label: "of Google searches start with an AI answer",
      src: "Similarweb, 2026",
    },
    {
      n: "8%",
      label: "still click through to the results below",
      // TODO: bron bij 8% controleren en aanvullen
      src: "Click-through under AI Overviews",
    },
  ],
  shotAlt: "Google search result with the AI answer at the top",
};

/* ---------------------------------------------------------------- *
 * 4. Zo werkt het
 * ---------------------------------------------------------------- */
export const HOW = {
  pill: "How it works",
  h2: "We tell AI who you are.",
  body: "We build a knowledge base on your own domain. Your visitors see none of it, AI does. That way AI knows more about you and you become the obvious choice.",
  logosLabel: "For ChatGPT, Google Gemini and Claude",
  cta: "Check my business",
  steps: [
    { n: "1", title: "Tell us", body: "One intake, fifteen minutes." },
    {
      n: "2",
      title: "We build",
      body: "New pages every month. You approve with one click.",
    },
    {
      n: "3",
      title: "Mentioned",
      body: "Every week you see where you are and are not mentioned.",
    },
  ],
  intake: {
    label: "Intake · 4 of 6",
    fields: [
      { q: "What do you do?", a: "Dental practice, including implantology" },
      { q: "Where?", a: "Zwolle and Kampen" },
      { q: "What sets you apart?", a: "New patients within 2 weeks", active: true },
    ],
  },
  pages: {
    url: "kennis.tandartsdevries.nl",
    title: "Which dentist in Zwolle is taking new patients?",
    status: "Ready for approval",
    approve: "✓ Approve",
  },
  week: {
    label: "Weekly report · week 8",
    delta: "+5 since week 1",
    score: "7 of 10",
    scoreLabel: "customer questions where you are mentioned",
    scores: ["8/10", "9/10", "5/10"],
  },
};

/* ---------------------------------------------------------------- *
 * 5. Rapport
 * ---------------------------------------------------------------- */
export const REPORT = {
  h2: "Every week you see exactly which questions you are mentioned in.",
  sub: "And which ones not yet. That is what we work on.",
  window: "Weekly report · week 8",
  status: "7 of 10 mentioned · was 2 of 10",
  colQuestion: "Your customer's question",
  cta: "See if AI already mentions you",
  caption: "Per customer question, whether ChatGPT, Gemini and Claude mention you",
  /** Alleen voor schermlezers, bij de ✓/✕-bolletjes. */
  mentioned: "mentioned",
  notMentioned: "not mentioned",
  rows: [
    { q: "physiotherapist Breda neck", ai: [1, 1, 1] },
    { q: "best physio for runners Breda", ai: [1, 1, 0] },
    { q: "physio Breda without referral", ai: [0, 1, 1] },
    { q: "back pain physiotherapy Breda centre", ai: [1, 1, 1] },
    { q: "sports physiotherapist Breda knee", ai: [0, 1, 1] },
    { q: "physiotherapy Breda open evenings", ai: [0, 0, 1] },
  ] satisfies { q: string; ai: number[] }[],
};

/* ---------------------------------------------------------------- *
 * 8. Prijzen
 * ---------------------------------------------------------------- */
export const PRICING = {
  h2: "How fast do you want to be mentioned?",
  sub: "Every plan does the same work. The difference is pace. An agency charges €1,500 a month or more for this.",
  planCta: (name: string) => `Start with ${name}`,
  per: "/month",
  plans: [
    {
      name: "Start",
      badge: "Steady pace",
      price: "€29",
      visible: "Visible in about 6 months",
      who: "For those who want to start calmly.",
      featuresTitle: "What you get:",
      checks: ["Knowledge base on your own domain", "4 new pages a month", "Monthly report"],
    },
    {
      name: "Growth",
      badge: "Most chosen",
      price: "€99",
      visible: "Visible in about 3 months",
      who: "For those who want to be mentioned within a quarter.",
      featuresTitle: "Everything in Start, and:",
      checks: [
        "12 pages a month",
        "Measurement in ChatGPT, Gemini and Claude",
        "Weekly report with competitors",
      ],
      highlight: true,
    },
    {
      name: "Sprint",
      badge: "Fastest",
      price: "€249",
      visible: "Visible in 6 to 8 weeks",
      who: "For those who want it sorted fast.",
      featuresTitle: "Everything in Growth, and:",
      checks: ["30 pages a month", "Mentions on third-party sites"],
    },
  ],
  expert: {
    label: "Growth with an expert · On request",
    title:
      "Personal coaching from Marrallisa Kreijkes, founder and GEO expert. With an hour-long call every week.",
    body: "She really looks along every week and coaches you: reads your report with you, compares you to your competitors and picks up the chances the tool does not see.",
    cta: "Book an intro call",
    link: "More about the expert",
    photo: "/img/marrallisa-kreijkes.webp",
    photoAlt: "Marrallisa Kreijkes",
  },
};

/* ---------------------------------------------------------------- *
 * 9. FAQ
 * ---------------------------------------------------------------- */
export const FAQ = {
  h2: "FAQ",
  footer: { text: "Question not listed? ", link: "Email us." },
  items: [
    {
      q: "How long does it take?",
      a: "We usually see first mentions after 4 to 8 weeks. Solidly visible after about 3 months with Growth, 6 months with Start.",
    },
    {
      q: "Does this work for ChatGPT too?",
      a: "Yes. ChatGPT leans more on third-party sites, which is why reviews and mentions are part of Growth and Sprint.",
    },
    {
      q: "What is GEO?",
      a: "Generative Engine Optimization: making sure AI mentions you. Like SEO, but for ChatGPT, Gemini and Claude.",
    },
    {
      q: "Do I have to do anything myself?",
      a: "One intake of fifteen minutes. After that you approve pages with one click. Your current website does not change.",
    },
    {
      q: "Is this the same as SEO?",
      a: "It looks like it, but AI chooses differently from Google. It helps you in Google, it does not replace it.",
    },
    {
      q: "What if I stop?",
      a: "Then the work and the measurement stop. Whatever is there stays yours.",
    },
  ],
};

/* ---------------------------------------------------------------- *
 * 10. Slotkaart
 * ---------------------------------------------------------------- */
export const CLOSING = {
  h2: "Get your company into Google's AI Overview.",
  placeholder: "yourcompany.com",
  inputLabel: "Your website",
  body: "See in 30 seconds whether AI already mentions you. Then you decide.",
  submit: "Check for free if AI mentions you",
};

/* ---------------------------------------------------------------- *
 * 11. Footer
 * ---------------------------------------------------------------- */
export const FOOTER = {
  // TODO: echte linkdoelen en KvK-/btw-nummer invullen
  links: [
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
  kvk: "Chamber of Commerce [number]",
  vat: "VAT [number]",
  claim: "AI Overview is an independent service and is not affiliated with OpenAI, Google or Anthropic.",
};
