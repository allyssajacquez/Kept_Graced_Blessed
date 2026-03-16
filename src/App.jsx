import { useState, useEffect, useCallback } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const LIGHT = {
  bg: "#fdf0f3", surface: "#fff5f7", card: "#ffffff",
  pink1: "#f4b8c8", pink2: "#e8839e", pink3: "#d45c7a", accent: "#c24a68",
  text: "#3a1a24", textMid: "#6b3347", textLight: "#a06680",
  border: "#f0c8d4", grid: "rgba(212,92,122,0.10)",
};
const DARK = {
  bg: "#1a0d11", surface: "#251219", card: "#2e1620",
  pink1: "#8c3d55", pink2: "#c24a68", pink3: "#e8839e", accent: "#f4b8c8",
  text: "#fde8ee", textMid: "#f0b8c8", textLight: "#c47a90",
  border: "#4a1f2e", grid: "rgba(244,184,200,0.06)",
};

// ─── BIBLE BOOK MAP (bolls.life book IDs for NKJV) ──────────────────────────
const BOOKS = [
  { id: 1,  name: "Genesis",        chapters: 50,  testament: "OT" },
  { id: 2,  name: "Exodus",         chapters: 40,  testament: "OT" },
  { id: 3,  name: "Leviticus",      chapters: 27,  testament: "OT" },
  { id: 4,  name: "Numbers",        chapters: 36,  testament: "OT" },
  { id: 5,  name: "Deuteronomy",    chapters: 34,  testament: "OT" },
  { id: 6,  name: "Joshua",         chapters: 24,  testament: "OT" },
  { id: 7,  name: "Judges",         chapters: 21,  testament: "OT" },
  { id: 8,  name: "Ruth",           chapters: 4,   testament: "OT" },
  { id: 9,  name: "1 Samuel",       chapters: 31,  testament: "OT" },
  { id: 10, name: "2 Samuel",       chapters: 24,  testament: "OT" },
  { id: 11, name: "1 Kings",        chapters: 22,  testament: "OT" },
  { id: 12, name: "2 Kings",        chapters: 25,  testament: "OT" },
  { id: 13, name: "1 Chronicles",   chapters: 29,  testament: "OT" },
  { id: 14, name: "2 Chronicles",   chapters: 36,  testament: "OT" },
  { id: 15, name: "Ezra",           chapters: 10,  testament: "OT" },
  { id: 16, name: "Nehemiah",       chapters: 13,  testament: "OT" },
  { id: 17, name: "Esther",         chapters: 10,  testament: "OT" },
  { id: 18, name: "Job",            chapters: 42,  testament: "OT" },
  { id: 19, name: "Psalms",         chapters: 150, testament: "OT" },
  { id: 20, name: "Proverbs",       chapters: 31,  testament: "OT" },
  { id: 21, name: "Ecclesiastes",   chapters: 12,  testament: "OT" },
  { id: 22, name: "Song of Solomon",chapters: 8,   testament: "OT" },
  { id: 23, name: "Isaiah",         chapters: 66,  testament: "OT" },
  { id: 24, name: "Jeremiah",       chapters: 52,  testament: "OT" },
  { id: 25, name: "Lamentations",   chapters: 5,   testament: "OT" },
  { id: 26, name: "Ezekiel",        chapters: 48,  testament: "OT" },
  { id: 27, name: "Daniel",         chapters: 12,  testament: "OT" },
  { id: 28, name: "Hosea",          chapters: 14,  testament: "OT" },
  { id: 29, name: "Joel",           chapters: 3,   testament: "OT" },
  { id: 30, name: "Amos",           chapters: 9,   testament: "OT" },
  { id: 31, name: "Obadiah",        chapters: 1,   testament: "OT" },
  { id: 32, name: "Jonah",          chapters: 4,   testament: "OT" },
  { id: 33, name: "Micah",          chapters: 7,   testament: "OT" },
  { id: 34, name: "Nahum",          chapters: 3,   testament: "OT" },
  { id: 35, name: "Habakkuk",       chapters: 3,   testament: "OT" },
  { id: 36, name: "Zephaniah",      chapters: 3,   testament: "OT" },
  { id: 37, name: "Haggai",         chapters: 2,   testament: "OT" },
  { id: 38, name: "Zechariah",      chapters: 14,  testament: "OT" },
  { id: 39, name: "Malachi",        chapters: 4,   testament: "OT" },
  { id: 40, name: "Matthew",        chapters: 28,  testament: "NT" },
  { id: 41, name: "Mark",           chapters: 16,  testament: "NT" },
  { id: 42, name: "Luke",           chapters: 24,  testament: "NT" },
  { id: 43, name: "John",           chapters: 21,  testament: "NT" },
  { id: 44, name: "Acts",           chapters: 28,  testament: "NT" },
  { id: 45, name: "Romans",         chapters: 16,  testament: "NT" },
  { id: 46, name: "1 Corinthians",  chapters: 16,  testament: "NT" },
  { id: 47, name: "2 Corinthians",  chapters: 13,  testament: "NT" },
  { id: 48, name: "Galatians",      chapters: 6,   testament: "NT" },
  { id: 49, name: "Ephesians",      chapters: 6,   testament: "NT" },
  { id: 50, name: "Philippians",    chapters: 4,   testament: "NT" },
  { id: 51, name: "Colossians",     chapters: 4,   testament: "NT" },
  { id: 52, name: "1 Thessalonians",chapters: 5,   testament: "NT" },
  { id: 53, name: "2 Thessalonians",chapters: 3,   testament: "NT" },
  { id: 54, name: "1 Timothy",      chapters: 6,   testament: "NT" },
  { id: 55, name: "2 Timothy",      chapters: 4,   testament: "NT" },
  { id: 56, name: "Titus",          chapters: 3,   testament: "NT" },
  { id: 57, name: "Philemon",       chapters: 1,   testament: "NT" },
  { id: 58, name: "Hebrews",        chapters: 13,  testament: "NT" },
  { id: 59, name: "James",          chapters: 5,   testament: "NT" },
  { id: 60, name: "1 Peter",        chapters: 5,   testament: "NT" },
  { id: 61, name: "2 Peter",        chapters: 3,   testament: "NT" },
  { id: 62, name: "1 John",         chapters: 5,   testament: "NT" },
  { id: 63, name: "2 John",         chapters: 1,   testament: "NT" },
  { id: 64, name: "3 John",         chapters: 1,   testament: "NT" },
  { id: 65, name: "Jude",           chapters: 1,   testament: "NT" },
  { id: 66, name: "Revelation",     chapters: 22,  testament: "NT" },
];

// ─── CONTENT DATA (deep dives, devotionals, modern retellings keyed to NKJV) ─
const CONTENT = {
  "Genesis": {
    tags: ["Creation","Identity","Promise","Redemption"],
    deepDive: `Genesis opens the entire biblical story with two foundational questions: *Who made all of this?* and *Who are we?* In the NKJV, God "created" (bara) is a word used only with God as subject — no human craftsman "bara" anything. This isn't poetry about process; it's a declaration of absolute sovereignty.\n\nThe patriarchal narratives — Abraham, Isaac, Jacob, Joseph — form the backbone of chapters 12–50. Each story wrestles with doubt, failure, and the unbreakable nature of God's covenant. Joseph's arc in particular (chs. 37–50) is one of the most psychologically rich narratives in ancient literature: betrayal, prison, power, and forgiveness.`,
    devotional: `Genesis 50:20 might be the most powerful verse in the entire book: "But as for you, you meant evil against me; but God meant it for good." Joseph says this to the brothers who sold him into slavery. Not from a place of denial — he wept openly — but from a perspective that could only come from years of watching God work.\n\nWhatever situation you're in right now that feels like betrayal, like wasted time, like someone else's fault — God has a Joseph perspective on it. He sees the whole arc. You're living inside a chapter. He's already read the ending.`,
    modern: `Picture your older siblings selling you to strangers because they're jealous. You end up in a foreign country, get falsely accused by your boss's wife, and spend years in prison — for something you didn't do. Most of us would've given up or gotten bitter. Joseph just kept being excellent wherever he was, because he knew who put him there.\n\nThat's the energy Genesis invites you into. Not toxic positivity. Not pretending hard things are fine. But a grounded, almost defiant trust that God doesn't waste suffering — He curates it.`
  },
  "Psalms": {
    tags: ["Worship","Lament","Trust","Emotion"],
    deepDive: `The Psalms are the most emotionally honest literature in the Bible — and in the NKJV, that honesty lands without being softened. Psalm 22 opens with "My God, My God, why have You forsaken Me?" — the very words Jesus quoted from the cross. The Psalms give language to experiences most people don't know how to voice.\n\nWritten across roughly 900 years by multiple authors including David, Asaph, and the Sons of Korah, the Psalter functions as both hymnal and prayer book. Scholars identify five books within Psalms (1–41, 42–72, 73–89, 90–106, 107–150), each ending with a doxology.`,
    devotional: `Psalm 34:18 — "The LORD is near to those who have a broken heart, and saves such as have a contrite spirit." The NKJV preserves that word *contrite* — crushed, humbled, not pretending to be okay. This isn't a verse for people who have it together. It's specifically addressed to people who are falling apart.\n\nGod doesn't need you cleaned up before He shows up. He moves toward the broken. If that's you today — the nearness isn't coming. It's already here.`,
    modern: `Imagine if your journal entries got turned into worship songs and sung for 3,000 years. That's basically what happened to David. He wrote about anxiety, betrayal, moments of genuine joy, political enemies, nights he couldn't sleep — and the church still sings them today.\n\nThe Psalms normalize the full range of human emotion *in prayer*. You don't have to perform peace. You don't have to pretend you're fine. The Psalms model what it looks like to bring your actual feelings to God — messy, raw, contradictory — and trust He can handle all of it.`
  },
  "Proverbs": {
    tags: ["Wisdom","Relationships","Character","Decisions"],
    deepDive: `Proverbs isn't a promise book — it's a pattern book. The NKJV's rendering of key terms helps clarify this: "wisdom" (hokmah) in Hebrew isn't IQ or information, it's practical skill for living. The wise person isn't just smart; they're good at being human.\n\nSolomon assembled this collection as formation material — meant to be memorized, internalized, and lived. Chapters 1–9 set the theological framework: wisdom begins with the fear of the LORD. Chapters 10–31 are where it gets practical: how to work, how to speak, how to handle money, how to choose friends.`,
    devotional: `Proverbs 4:23 in the NKJV: "Keep your heart with all diligence, for out of it spring the issues of life." The word "issues" translates the Hebrew totsaot — literally the outflows, the exits. Everything that comes out of your life flows from what's happening inside your heart.\n\nIn a generation that optimizes everything externally — aesthetics, output, social presence — Proverbs says the real work is internal. Guard what you let in. Steward what you're becoming. Your heart is the source, not just another thing to manage.`,
    modern: `Proverbs is basically a 3,000-year-old mentorship program. Solomon is basically saying: *I've seen what happens when people make these decisions. Let me save you some pain.*\n\nIt's shockingly relevant. There are chapters on not co-signing people's debt, on the danger of flattery, on how much your friend group actually shapes who you become, on the connection between work ethic and dignity. This isn't religious self-help — it's distilled wisdom from someone who had everything and figured out what actually mattered.`
  },
  "Isaiah": {
    tags: ["Prophecy","Hope","Salvation","Comfort"],
    deepDive: `Isaiah is often called "the fifth gospel" because of how directly it points to Jesus. Written 700 years before Christ, chapters 52–53 describe a Suffering Servant with such precision that early Christians saw it as written after the fact. The NKJV's poetic rendering preserves Isaiah's remarkable literary quality.\n\nThe book divides naturally around chapter 39: the first half deals primarily with judgment and accountability; the second half opens with "Comfort, yes, comfort My people" (40:1) and sustains that tone of redemptive hope through chapter 66. Isaiah holds both the severity and the tenderness of God simultaneously.`,
    devotional: `Isaiah 43:1 in the NKJV: "But now, thus says the LORD, who created you, O Jacob, and He who formed you, O Israel: 'Fear not, for I have redeemed you; I have called you by your name; you are Mine.'" \n\nNotice the sequence: *I created you. I formed you. I redeemed you. I named you. You are Mine.* God doesn't call you to belong to Him because you figured yourself out. He calls you by name first. Your identity isn't something you construct — it's something you receive.`,
    modern: `Isaiah writes into a culture that's falling apart. Political instability, corrupt leadership, people who call themselves God's people but act nothing like it. Sound familiar? His message isn't "everything's fine." It's "God hasn't lost the plot."\n\nChapter 40 alone is worth the entire book: "Have you not known? Have you not heard? The everlasting God, the LORD, the Creator of the ends of the earth, neither faints nor is weary." When everything around you is chaotic, Isaiah basically grabs you by the shoulders and says — *look at who you're dealing with.* That doesn't fix the chaos. But it changes how you stand in it.`
  },
  "John": {
    tags: ["Love","Identity","Belief","Eternal Life"],
    deepDive: `John's gospel is distinct from the synoptics (Matthew, Mark, Luke) in both structure and theology. Written last — likely in the 90s AD — John assumes his reader has some familiarity with the Jesus story and goes deeper. The NKJV preserves the prologue's (1:1-18) weight: "In the beginning was the Word" echoes Genesis 1:1 intentionally.\n\nSeven "I AM" statements form the spine of Jesus' self-revelation in John: bread of life, light of the world, door, good shepherd, resurrection and life, way/truth/life, true vine. Each one is a theological claim and a personal invitation simultaneously.`,
    devotional: `John 10:10 in the NKJV: "The thief does not come except to steal, and to kill, and to destroy. I have come that they may have life, and that they may have it more abundantly." That word *abundantly* — perissos in Greek — means exceeding, overflowing, beyond the expected measure.\n\nJesus isn't offering survival. He's not offering merely manageable. He's offering *abundance*. In seasons where you're just getting by, let that reframe what you're actually aiming for. You weren't made for barely enough.`,
    modern: `John writes like someone who spent decades thinking about one thing and finally sat down to explain it. He opens with the most cosmic possible claim — Jesus was there at creation, Jesus *is* God — and then spends the rest of the book showing that same cosmic Jesus at a wedding, crying at a tomb, making breakfast on a beach for exhausted fishermen.\n\nThat combination is what John wants you to sit with. The God of the universe is the same person who noticed you were out of wine, who showed up four days late to the grief and wept anyway. He's not distant. He's not detached. He's *here*.`
  },
  "Romans": {
    tags: ["Grace","Faith","Freedom","Identity"],
    deepDive: `Romans is the most systematic theological letter in the New Testament. Paul writes to a church he hasn't founded or visited yet, laying out his understanding of the gospel from first principles. The NKJV's translation choices matter here: "righteousness" (dikaiosyne), "justified" (dikaioo), and "sanctified" form a constellation of legal and relational terms.\n\nChapters 1–3 establish the universal human problem: all have sinned. Chapters 4–5 establish the solution: justification by faith, not works. Chapters 6–8 explore what the transformed life looks like. Chapters 9–11 wrestle with Israel's place in redemptive history. Chapters 12–16 are the practical outworking.`,
    devotional: `Romans 8:38-39 in the NKJV: "For I am persuaded that neither death nor life, nor angels nor principalities nor powers, nor things present nor things to come, nor height nor depth, nor any other created thing, shall be able to separate us from the love of God which is in Christ Jesus our Lord."\n\nPaul doesn't say nothing will try. He says nothing will *succeed*. There's a difference. The things that feel like they're separating you from God — your failures, your doubts, your distance — none of them have the power they appear to have. You are held.`,
    modern: `Romans is Paul basically writing the thesis he never got to defend in person. And his main argument is wild by any standard: the only way to actually be right with God has nothing to do with how good you are. It's entirely based on trust — specifically, trusting what Jesus did.\n\nFor a generation that grew up being evaluated constantly — GPA, followers, performance reviews — Romans is genuinely countercultural. Your worth isn't a score. Your standing before God isn't a grade you maintain. It's a gift you receive. Chapter 8 especially reads like someone finally gave you permission to exhale.`
  },
  "Ephesians": {
    tags: ["Identity","Unity","Purpose","Spiritual Life"],
    deepDive: `Ephesians is sometimes called the "queen of the epistles" — a soaring theological letter that moves from cosmic truth (who you are in Christ) to practical instruction (how to live that out). The NKJV preserves its elevated tone, especially in chapters 1–3 which read almost like an extended prayer.\n\nPaul's central thesis: you were chosen before the foundation of the world, adopted, redeemed, sealed — and now you live from that reality, not toward it. The famous "armor of God" passage (6:10-20) only makes sense in context of the spiritual warfare that comes with standing in this identity.`,
    devotional: `Ephesians 2:10 in the NKJV: "For we are His workmanship, created in Christ Jesus for good works, which God prepared beforehand that we should walk in them." The Greek word for workmanship is *poiema* — from which we get "poem." You are God's poem. Not His rough draft. Not His mistake. His crafted, intentional, beautiful work.\n\nThe works were prepared *beforehand.* Your purpose isn't something you manufacture. It's something you step into. That changes the pressure significantly.`,
    modern: `If you've ever felt like you don't know who you are or what you're supposed to be doing, Ephesians is basically a direct answer. Paul spends three full chapters just establishing *who you are* before he ever gets to what you should do. Identity before behavior. Belonging before performance.\n\nChapter 1 alone has enough material to rewire how you see yourself: chosen, adopted, redeemed, forgiven, sealed, purposeful. Paul wanted those words to be so internalized that how you live just naturally flows from them — not something you achieve, but something you already are.`
  },
  "Philippians": {
    tags: ["Joy","Contentment","Peace","Gratitude"],
    deepDive: `Philippians is Paul's most personally warm letter — written from prison, to a church that had repeatedly supported him financially and relationally. Despite its circumstances, it's the most joy-saturated letter in the New Testament. The NKJV's "Rejoice in the Lord always. Again I will say, rejoice!" (4:4) preserves the deliberate repetition.\n\nThe "Christ Hymn" in chapter 2 (vv. 5-11) is one of the earliest pieces of Christian poetry, describing Jesus' voluntary descent from glory into humanity and God's response of exaltation. Scholars believe Paul is quoting an already-existing hymn, suggesting how early Christians were already worshipping Jesus as divine.`,
    devotional: `Philippians 4:6-7 in the NKJV: "Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God; and the peace of God, which surpasses all understanding, will guard your hearts and minds through Christ Jesus."\n\nThis isn't "don't feel anxious." Paul felt it too — he's writing from prison. It's a redirect: take what's making you anxious and *bring it.* The peace that follows isn't explained by your circumstances changing. It surpasses understanding. It guards you before the situation resolves.`,
    modern: `Paul writes the most joyful letter in the Bible while under house arrest awaiting a verdict that could mean his execution. Let that sit. He's not performing happiness — he actually says he's "learned" contentment (4:11). It was a process, not a personality trait.\n\nFor anyone who feels like they'll be okay *once* [insert the thing] happens — Philippians is a challenge. Contentment isn't a destination you arrive at after your circumstances improve. It's a practice you develop while they're still hard. Paul's figured this out. He wants you to know it's possible.`
  },
};

// ─── VOTD ────────────────────────────────────────────────────────────────────
const VOTD_LIST = [
  { ref: "Jeremiah 29:11", bookId: 24, ch: 29, v: 11 },
  { ref: "Romans 8:28",    bookId: 45, ch: 8,  v: 28 },
  { ref: "Psalm 46:10",    bookId: 19, ch: 46, v: 10 },
  { ref: "Isaiah 40:31",   bookId: 23, ch: 40, v: 31 },
  { ref: "John 10:10",     bookId: 43, ch: 10, v: 10 },
  { ref: "Philippians 4:7",bookId: 50, ch: 4,  v: 7  },
  { ref: "Psalm 23:1",     bookId: 19, ch: 23, v: 1  },
];
const todayVotd = VOTD_LIST[new Date().getDay() % VOTD_LIST.length];

// ─── GINGHAM BACKGROUND ──────────────────────────────────────────────────────
function Gingham({ dark }) {
  const c = dark ? DARK : LIGHT;
  return (
    <svg style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,opacity:dark?0.5:0.65 }}>
      <defs>
        <pattern id="g" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="32" height="32" fill="none"/>
          <rect x="0" y="0" width="16" height="16" fill={c.grid}/>
          <rect x="16" y="16" width="16" height="16" fill={c.grid}/>
          <line x1="0" y1="0" x2="32" y2="0" stroke={c.grid} strokeWidth="0.6"/>
          <line x1="0" y1="16" x2="32" y2="16" stroke={c.grid} strokeWidth="0.6"/>
          <line x1="0" y1="32" x2="32" y2="32" stroke={c.grid} strokeWidth="0.6"/>
          <line x1="0" y1="0" x2="0" y2="32" stroke={c.grid} strokeWidth="0.6"/>
          <line x1="16" y1="0" x2="16" y2="32" stroke={c.grid} strokeWidth="0.6"/>
          <line x1="32" y1="0" x2="32" y2="32" stroke={c.grid} strokeWidth="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>
  );
}

// ─── HEART ICON (soft white / pink) ─────────────────────────────────────────
function Heart({ size = 18, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display:"inline-block", verticalAlign:"middle" }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

// ─── STRIP HTML from bolls.life response ─────────────────────────────────────
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").trim();
}

// ─── FETCH NKJV CHAPTER (via our proxy to avoid CORS) ───────────────────────
async function fetchChapter(bookId, chapter) {
  const url = `/api/bible?book=${bookId}&chapter=${chapter}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
}

// ─── FETCH SINGLE VERSE ──────────────────────────────────────────────────────
async function fetchVerse(bookId, chapter, verse) {
  const url = `/api/bible?book=${bookId}&chapter=${chapter}&verse=${verse}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("home"); // home | library | reading | today | notes
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [readingTab, setReadingTab] = useState("read");
  const [verses, setVerses] = useState([]);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const [verseError, setVerseError] = useState(false);
  const [votdVerse, setVotdVerse] = useState(null);
  const [notes, setNotes] = useState({});
  const [noteInput, setNoteInput] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [testament, setTestament] = useState("NT");
  const [searchQ, setSearchQ] = useState("");

  const c = dark ? DARK : LIGHT;

  // fetch VOTD on mount
  useEffect(() => {
    fetchVerse(todayVotd.bookId, todayVotd.ch, todayVotd.v)
      .then(v => setVotdVerse(v))
      .catch(() => {});
  }, []);

  // fetch chapter when reading
  useEffect(() => {
    if (page !== "reading" || !selectedBook) return;
    setLoadingVerses(true);
    setVerseError(false);
    setVerses([]);
    fetchChapter(selectedBook.id, selectedChapter)
      .then(data => { setVerses(data); setLoadingVerses(false); })
      .catch(() => { setVerseError(true); setLoadingVerses(false); });
  }, [page, selectedBook, selectedChapter]);

  // sync note input
  const noteKey = selectedBook ? `${selectedBook.name}-${selectedChapter}` : null;
  useEffect(() => {
    if (!noteKey) return;
    setNoteInput(notes[noteKey] || "");
    setNoteSaved(false);
  }, [noteKey]);

  const saveNote = () => {
    if (!noteKey) return;
    setNotes(p => ({ ...p, [noteKey]: noteInput }));
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const openBook = (book) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    setReadingTab("read");
    setPage("reading");
  };

  const contentData = selectedBook ? CONTENT[selectedBook.name] : null;

  // ── STYLES ─────────────────────────────────────────────────────────────────
  const S = {
    app: { minHeight:"100vh", background:c.bg, color:c.text,
      fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif",
      position:"relative", overflowX:"hidden", WebkitFontSmoothing:"antialiased" },
    z: { position:"relative", zIndex:1 },
    header: {
      background: dark ? `${c.surface}ee` : `#fff8fae0`,
      borderBottom:`2px solid ${c.border}`,
      position:"sticky", top:0, zIndex:100,
      backdropFilter:"blur(12px)",
      boxShadow: dark ? `0 2px 18px rgba(0,0,0,0.35)` : `0 2px 18px rgba(212,92,122,0.10)`,
    },
    headerInner: {
      maxWidth:480, margin:"0 auto", padding:"13px 18px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
    },
    title: {
      fontFamily:"'Palatino Linotype',Palatino,serif",
      fontSize:17, fontWeight:"bold", letterSpacing:"0.01em",
      background: dark
        ? `linear-gradient(135deg,${c.pink3},${c.accent})`
        : `linear-gradient(135deg,${c.accent},${c.pink2})`,
      WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
    },
    darkBtn: {
      background: dark ? c.card : c.surface, border:`1.5px solid ${c.border}`,
      borderRadius:20, padding:"5px 11px", cursor:"pointer",
      fontSize:13, display:"flex", alignItems:"center", gap:5, color:c.textMid,
    },
    main: { maxWidth:480, margin:"0 auto", paddingBottom:100 },
    // VOTD Card
    votdCard: {
      margin:"18px 14px",
      background: dark ? `linear-gradient(135deg,${c.card},${c.surface})` : `linear-gradient(135deg,#fff5f7,#fde4ec)`,
      border:`2px solid ${c.border}`, borderRadius:20, padding:"22px 20px",
      boxShadow: dark ? `0 4px 22px rgba(0,0,0,0.28)` : `0 4px 22px rgba(212,92,122,0.09)`,
      position:"relative", overflow:"hidden",
    },
    votdLabel: { fontSize:10, letterSpacing:"0.17em", textTransform:"uppercase", color:c.pink2, marginBottom:10, display:"flex", alignItems:"center", gap:6 },
    votdText: { fontSize:17, lineHeight:1.75, color:c.text, fontStyle:"italic", marginBottom:8 },
    votdRef: { fontSize:13, color:c.accent, fontWeight:"bold" },
    // section
    sectionLabel: { fontSize:10, letterSpacing:"0.17em", textTransform:"uppercase", color:c.textLight, padding:"16px 18px 6px" },
    // book card
    bookCard: {
      margin:"7px 14px", background:c.card, border:`1.5px solid ${c.border}`,
      borderRadius:14, padding:"15px 18px", cursor:"pointer",
      display:"flex", alignItems:"center", justifyContent:"space-between", gap:10,
      transition:"all 0.18s",
      boxShadow: dark ? `0 2px 10px rgba(0,0,0,0.18)` : `0 2px 10px rgba(212,92,122,0.05)`,
    },
    bookName: { fontSize:17, fontWeight:"bold", color:c.text, marginBottom:3 },
    bookChaps: { fontSize:11, color:c.pink2 },
    pill: { display:"inline-block", background:dark?c.surface:"#fde4ec", border:`1px solid ${c.border}`, borderRadius:20, padding:"2px 9px", fontSize:10, color:c.accent, margin:"2px 2px 0 0" },
    // reading page
    bookTitle: { fontSize:26, fontWeight:"bold", color:c.text, lineHeight:1.2, marginBottom:6 },
    tabBar: {
      display:"flex", gap:0, margin:"14px 14px 0",
      background:c.surface, borderRadius:12, padding:3,
      border:`1.5px solid ${c.border}`, overflowX:"auto",
    },
    tab: (a) => ({
      flex:1, padding:"8px 8px", borderRadius:9, border:"none", cursor:"pointer",
      fontSize:11, letterSpacing:"0.03em", whiteSpace:"nowrap", fontFamily:"Georgia,serif",
      transition:"all 0.15s",
      background: a ? c.accent : "transparent",
      color: a ? "#fff" : c.textLight,
      fontWeight: a ? "bold" : "normal",
    }),
    chGrid: { display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:7 },
    chBtn: (a) => ({
      padding:"9px 0", borderRadius:9, border:`1.5px solid ${a?c.accent:c.border}`,
      background: a ? c.accent : c.card, color: a ? "#fff" : c.textMid,
      fontSize:12, cursor:"pointer", fontFamily:"Georgia,serif",
      transition:"all 0.13s", fontWeight: a?"bold":"normal",
    }),
    contentBox: {
      margin:"14px 14px 0", background:c.card, border:`1.5px solid ${c.border}`,
      borderRadius:14, padding:"20px 18px",
      boxShadow: dark ? `0 2px 14px rgba(0,0,0,0.18)` : `0 2px 14px rgba(212,92,122,0.05)`,
    },
    contentLabel: { fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:c.pink2, marginBottom:12 },
    contentBody: { fontSize:15, lineHeight:1.85, color:c.textMid, whiteSpace:"pre-line" },
    verseNum: { fontSize:10, color:c.pink2, verticalAlign:"super", marginRight:3, fontWeight:"bold" },
    verseText: { fontSize:16, lineHeight:1.85, color:c.text },
    verseBlock: { marginBottom:8, paddingBottom:8, borderBottom:`1px solid ${c.border}` },
    backBtn: { background:"none", border:"none", cursor:"pointer", color:c.accent, fontSize:13, display:"flex", alignItems:"center", gap:4, padding:"6px 0", fontFamily:"Georgia,serif" },
    noteArea: {
      width:"100%", minHeight:130, background:dark?c.surface:"#fffbfc",
      border:`1.5px solid ${c.border}`, borderRadius:10, padding:"12px 14px",
      fontSize:14, fontFamily:"'Palatino Linotype',Georgia,serif", color:c.text,
      lineHeight:1.75, resize:"vertical", outline:"none", boxSizing:"border-box", marginTop:10,
    },
    saveBtn: { marginTop:9, padding:"10px 20px", background:c.accent, color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:13, fontFamily:"Georgia,serif" },
    // bottom nav
    nav: {
      position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
      width:"100%", maxWidth:480,
      background: dark ? `${c.surface}f2` : `#fff5f7f5`,
      borderTop:`2px solid ${c.border}`,
      display:"flex", justifyContent:"space-around",
      padding:"8px 0 max(8px,env(safe-area-inset-bottom))",
      zIndex:200, backdropFilter:"blur(14px)",
    },
    navBtn: (a) => ({
      display:"flex", flexDirection:"column", alignItems:"center", gap:2,
      background:"none", border:"none", cursor:"pointer", padding:"4px 14px",
      color: a ? c.accent : c.textLight,
      fontSize:10, letterSpacing:"0.06em", fontFamily:"Georgia,serif",
      transition:"color 0.14s",
    }),
  };

  // ── HOME ───────────────────────────────────────────────────────────────────
  const renderHome = () => (
    <div>
      <div style={{ padding:"26px 18px 4px", textAlign:"center" }}>
        <Heart size={30} color={dark ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.95)"} />
        <div style={{ ...S.bookTitle, textAlign:"center", marginTop:10, marginBottom:4, fontSize:24 }}>
          kept. graced. blessed.
        </div>
        <div style={{ fontSize:13, color:c.textLight, fontStyle:"italic" }}>
          Your space to read, reflect, and grow
        </div>
      </div>

      <div style={S.votdCard}>
        <div style={{ position:"absolute", top:14, right:16, opacity:0.13 }}>
          <Heart size={40} color={c.accent} />
        </div>
        <div style={S.votdLabel}>
          <Heart size={12} color={c.pink2} /> Verse of the Day
        </div>
        {votdVerse ? (
          <>
            <div style={S.votdText}>"{stripHtml(votdVerse.text)}"</div>
            <div style={S.votdRef}>— {todayVotd.ref} · NKJV</div>
          </>
        ) : (
          <div style={{ fontSize:14, color:c.textLight, fontStyle:"italic" }}>Loading…</div>
        )}
      </div>

      <div style={S.sectionLabel}>♡ Start Reading</div>
      {["John","Romans","Psalms","Philippians","Ephesians"].map(name => {
        const b = BOOKS.find(x => x.name === name);
        const cd = CONTENT[name];
        return (
          <div key={name} style={S.bookCard}
            onClick={() => openBook(b)}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.01)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          >
            <div style={{ flex:1 }}>
              <div style={S.bookName}>{name}</div>
              <div style={{ fontSize:11, color:c.textLight, marginBottom:5 }}>{b.chapters} chapters · NKJV</div>
              {cd?.tags.map(t=><span key={t} style={S.pill}>{t}</span>)}
            </div>
            <div style={{ fontSize:18, color:c.pink1 }}>›</div>
          </div>
        );
      })}
      <div style={{ ...S.sectionLabel, cursor:"pointer" }} onClick={()=>setPage("library")}>
        ♡ Full Bible  <span style={{ color:c.accent }}>→</span>
      </div>
    </div>
  );

  // ── LIBRARY ────────────────────────────────────────────────────────────────
  const renderLibrary = () => {
    const filtered = BOOKS.filter(b =>
      b.testament === testament &&
      b.name.toLowerCase().includes(searchQ.toLowerCase())
    );
    return (
      <div>
        <div style={{ padding:"20px 18px 8px" }}>
          <div style={{ ...S.bookTitle, fontSize:22 }}>Full Bible · NKJV</div>
          <input
            style={{ width:"100%", marginTop:10, padding:"10px 14px", borderRadius:10, border:`1.5px solid ${c.border}`, background:c.surface, color:c.text, fontSize:14, fontFamily:"Georgia,serif", outline:"none", boxSizing:"border-box" }}
            placeholder="Search books…"
            value={searchQ}
            onChange={e=>setSearchQ(e.target.value)}
          />
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            {["OT","NT"].map(t=>(
              <button key={t} onClick={()=>setTestament(t)}
                style={{ flex:1, padding:"9px", borderRadius:10, border:`1.5px solid ${testament===t?c.accent:c.border}`, background:testament===t?c.accent:c.card, color:testament===t?"#fff":c.textMid, cursor:"pointer", fontSize:12, fontFamily:"Georgia,serif" }}>
                {t==="OT"?"Old Testament":"New Testament"}
              </button>
            ))}
          </div>
        </div>
        {filtered.map(b => (
          <div key={b.id} style={S.bookCard} onClick={()=>openBook(b)}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.01)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          >
            <div style={{ flex:1 }}>
              <div style={S.bookName}>{b.name}</div>
              <div style={S.bookChaps}>{b.chapters} chapters</div>
              {CONTENT[b.name]?.tags.map(t=><span key={t} style={S.pill}>{t}</span>)}
            </div>
            <div style={{ fontSize:18, color:c.pink1 }}>›</div>
          </div>
        ))}
      </div>
    );
  };

  // ── READING ────────────────────────────────────────────────────────────────
  const renderReading = () => {
    if (!selectedBook) return null;
    const hasContent = !!contentData;
    const tabs = hasContent
      ? ["Read","Deep Dive","Devotional","Modern","Notes"]
      : ["Read","Notes"];

    return (
      <div>
        <div style={{ padding:"18px 18px 0" }}>
          <button style={S.backBtn} onClick={()=>setPage("library")}>← Back</button>
          <div style={S.bookTitle}>{selectedBook.name}</div>
          <div style={{ fontSize:12, color:c.textLight, fontStyle:"italic" }}>New King James Version</div>
        </div>

        {/* Chapter selector */}
        <div style={{ ...S.contentBox, marginTop:12 }}>
          <div style={S.contentLabel}>Chapter</div>
          <div style={S.chGrid}>
            {Array.from({length:selectedBook.chapters},(_,i)=>i+1).map(ch=>(
              <button key={ch} style={S.chBtn(selectedChapter===ch)}
                onClick={()=>{setSelectedChapter(ch);setReadingTab("read");}}>
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={S.tabBar}>
          {tabs.map(t=>(
            <button key={t} style={S.tab(readingTab===t.toLowerCase())}
              onClick={()=>setReadingTab(t.toLowerCase())}>{t}</button>
          ))}
        </div>

        {/* READ tab */}
        {readingTab==="read" && (
          <div style={S.contentBox}>
            <div style={S.contentLabel}>
              <Heart size={11} color={c.pink2} /> {selectedBook.name} {selectedChapter} · NKJV
            </div>
            {loadingVerses && (
              <div style={{ textAlign:"center", padding:"30px 0", color:c.textLight, fontStyle:"italic" }}>
                Loading scripture…
              </div>
            )}
            {verseError && (
              <div style={{ textAlign:"center", padding:"30px 0", color:c.textLight, fontStyle:"italic" }}>
                Couldn't load chapter. Check your connection and try again.
              </div>
            )}
            {!loadingVerses && !verseError && verses.map(v=>(
              <div key={v.verse} style={S.verseBlock}>
                <span style={S.verseNum}>{v.verse}</span>
                <span style={S.verseText}>{stripHtml(v.text)}</span>
              </div>
            ))}
          </div>
        )}

        {/* DEEP DIVE */}
        {readingTab==="deep dive" && contentData && (
          <div style={S.contentBox}>
            <div style={S.contentLabel}>📖 Deep Dive</div>
            <div style={S.contentBody}>{contentData.deepDive}</div>
          </div>
        )}

        {/* DEVOTIONAL */}
        {readingTab==="devotional" && contentData && (
          <div style={S.contentBox}>
            <div style={S.contentLabel}>🙏 Devotional</div>
            <div style={S.contentBody}>{contentData.devotional}</div>
          </div>
        )}

        {/* MODERN */}
        {readingTab==="modern" && contentData && (
          <div style={S.contentBox}>
            <div style={S.contentLabel}>✨ Modern Retelling</div>
            <div style={S.contentBody}>{contentData.modern}</div>
          </div>
        )}

        {/* NOTES */}
        {readingTab==="notes" && (
          <div style={S.contentBox}>
            <div style={S.contentLabel}>
              <Heart size={11} color={c.pink2}/> My Notes · {selectedBook.name} {selectedChapter}
            </div>
            <textarea
              style={S.noteArea}
              placeholder={`What is God speaking to you through ${selectedBook.name} ${selectedChapter}? Write freely — questions, prayers, insights, what hit different…`}
              value={noteInput}
              onChange={e=>setNoteInput(e.target.value)}
            />
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <button style={S.saveBtn} onClick={saveNote}>Save Note</button>
              {noteSaved && <span style={{ fontSize:13, color:c.pink2, fontStyle:"italic" }}>✓ Saved</span>}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── TODAY ──────────────────────────────────────────────────────────────────
  const renderToday = () => (
    <div>
      <div style={{ padding:"22px 18px 6px", textAlign:"center" }}>
        <Heart size={26} color={dark?"rgba(255,255,255,0.8)":"rgba(255,255,255,0.9)"} />
        <div style={{ ...S.bookTitle, fontSize:22, textAlign:"center", marginTop:8 }}>Today's Word</div>
      </div>
      <div style={S.votdCard}>
        <div style={{ position:"absolute", top:14, right:16, opacity:0.12 }}>
          <Heart size={42} color={c.accent}/>
        </div>
        <div style={S.votdLabel}><Heart size={12} color={c.pink2}/> Verse of the Day</div>
        {votdVerse ? (
          <>
            <div style={S.votdText}>"{stripHtml(votdVerse.text)}"</div>
            <div style={S.votdRef}>— {todayVotd.ref} · NKJV</div>
          </>
        ) : (
          <div style={{ color:c.textLight, fontStyle:"italic" }}>Loading…</div>
        )}
      </div>
      <div style={{ ...S.contentBox, marginTop:0 }}>
        <div style={S.contentLabel}>♡ A Word for You</div>
        <div style={S.contentBody}>
          {`Every day is an invitation. Not to have it all figured out, but to show up — open, expectant, and trusting the One who holds the day you're walking into.\n\nBring your actual self to this verse today. Not the version of you that has it together. The real one. That's who God's speaking to.`}
        </div>
      </div>
    </div>
  );

  // ── NOTES PAGE ─────────────────────────────────────────────────────────────
  const renderNotes = () => {
    const allNotes = Object.entries(notes).filter(([,v])=>v.trim());
    return (
      <div>
        <div style={{ padding:"22px 18px 6px" }}>
          <div style={{ ...S.bookTitle, fontSize:22 }}>My Notes</div>
          <div style={{ fontSize:13, color:c.textLight, fontStyle:"italic" }}>Your journey through Scripture</div>
        </div>
        {allNotes.length === 0 ? (
          <div style={{ ...S.contentBox, textAlign:"center", color:c.textLight, fontStyle:"italic", lineHeight:1.9, padding:"40px 24px" }}>
            <Heart size={32} color={dark?"rgba(255,255,255,0.15)":"rgba(212,92,122,0.2)"}/>
            <div style={{ marginTop:12 }}>No notes yet. Open a book, start reading, and write your thoughts as you go.</div>
          </div>
        ) : (
          allNotes.map(([key, note]) => {
            const parts = key.split("-");
            const ch = parts.pop();
            const bookName = parts.join("-");
            return (
              <div key={key} style={{ ...S.contentBox, marginBottom:4 }}>
                <div style={{ ...S.contentLabel, display:"flex", alignItems:"center", gap:6 }}>
                  <Heart size={10} color={c.pink2}/> {bookName} · Ch. {ch}
                </div>
                <div style={S.contentBody}>{note}</div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  const isReading = page === "reading";

  return (
    <div style={S.app}>
      <Gingham dark={dark}/>
      <div style={S.z}>
        {/* Header */}
        <div style={S.header}>
          <div style={S.headerInner}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              {isReading && (
                <button style={{ ...S.backBtn, padding:0, marginRight:4 }} onClick={()=>setPage("library")}>←</button>
              )}
              <div>
                <div style={S.title}>kept. graced. blessed.</div>
              </div>
            </div>
            <button style={S.darkBtn} onClick={()=>setDark(d=>!d)}>
              {dark?"☀️":"🌙"} <span style={{fontSize:10}}>{dark?"Light":"Dark"}</span>
            </button>
          </div>
        </div>

        {/* Page content */}
        <div style={S.main}>
          {page==="home"    && renderHome()}
          {page==="library" && renderLibrary()}
          {page==="reading" && renderReading()}
          {page==="today"   && renderToday()}
          {page==="notes"   && renderNotes()}
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={S.nav}>
        {[
          { id:"home",    icon:"🏠", label:"Home"    },
          { id:"library", icon:"📖", label:"Bible"   },
          { id:"today",   icon:"♡",  label:"Today"   },
          { id:"notes",   icon:"📝", label:"Notes"   },
        ].map(n=>(
          <button key={n.id} style={S.navBtn(page===n.id)}
            onClick={()=>{ if(n.id!=="reading") setPage(n.id); }}>
            <span style={{ fontSize:19 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
}
