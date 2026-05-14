import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Circle,
  Lock,
  ChevronDown,
  Clock,
  Flame,
  Trophy,
  Star,
  Zap,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  PenLine,
  Video,
  MessageSquare,
  Camera,
  Sparkles,
  Target,
  Menu,
  X,
  FileText,
  Upload,
  Eye,
  Mail,
  User,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  upsertStudent,
  syncProgressToCloud,
  loadProgressFromCloud,
  submitTask as submitTaskToCloud,
} from "../lib/supabase";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */
interface LessonResource {
  type: "info" | "summary" | "task" | "link";
  title: string;
  content: string;
  url?: string;
  taskType?: "photo" | "video" | "text";
}

interface LessonDef {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  videoUrl?: string;           // YouTube link — embed shows when set
  comingSoon: boolean;         // true = locked regardless
  requiresVideo: boolean;
  requiresLink: boolean;
  requiresTask: boolean;
  resources: LessonResource[];
}

interface LessonProgress {
  videoWatched: boolean;
  linkVisited: boolean;
  taskSubmitted: boolean;
  taskContent: string;
  completed: boolean;
}

/* ═══════════════════════════════════════════════════════════════
   YOUTUBE HELPER — normalizes any YouTube URL to an embed URL
   ═══════════════════════════════════════════════════════════════ */
const toYouTubeEmbed = (url: string): string => {
  if (!url) return "";
  if (url.includes("/embed/")) return url;
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = url.match(/[?&]v=([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortsMatch = url.match(/\/shorts\/([\w-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  return url;
};

/* ═══════════════════════════════════════════════════════════════
   COURSE DATA — The Forever Method (9 modules + 2 intermissions)
   To publish a video: paste its YouTube link into `videoUrl`.
   ═══════════════════════════════════════════════════════════════ */
const LESSONS: LessonDef[] = [
  {
    id: "welcome",
    title: "Welcome",
    subtitle: "Start here",
    duration: "",
    comingSoon: false,
    requiresVideo: false,
    requiresLink: false,
    requiresTask: false,
    resources: [],
  },
  {
    id: "module-0",
    title: "Module 0: Welcome",
    subtitle: "What this course actually is — and what it isn't",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: false,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• This is not a 30-day challenge, a diet, or a meal plan.\n• It's 9 modules + 2 intermissions explaining — with real neuroscience, endocrinology, and food industry history — why your brain does what it does around sugar.\n• Then it gives you a framework you can start using immediately.\n• You'll have homework after every module: small, specific, doable. The course doesn't work if you watch passively.\n• Twice, the lessons pause for an 'intermission' — you'll send Kristina photos directly, and she reads every one.\n• Honest disclaimer: this is not a substitute for medical or psychiatric care. If you're in active crisis with an eating disorder, reach out — there's no shame in that." },
    ],
  },
  {
    id: "my-story",
    title: "My Story",
    subtitle: "Ten years of disordered eating — and what finally changed it",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: false,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• Kristina spent ten years in disordered eating — bulimia, compulsive bingeing, regular relapses.\n• Diets and intense exercise made it worse. Psychologists and a psychiatrist didn't hold, because none of it explained what was actually happening inside her.\n• What changed everything wasn't a new rule or a stricter plan — it was real understanding: what sugar does, why the brain holds onto it, and what the environment does to us.\n• Today her relationship with food is free. She doesn't restrict — yet 95% of the time naturally chooses whole food, because the craving and dependency are gone.\n• When the brain is genuinely nourished and supported, sugar loses its power." },
    ],
  },
  {
    id: "module-1",
    title: "Module 1: You Are Not Broken",
    subtitle: "Food addiction is real, measurable, and not a personal failing",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• Roughly 1 in 5 people meet the clinical criteria for food addiction — the same framework used for cocaine and alcohol. It skews significantly higher in women.\n• The Yale Food Addiction Scale (YFAS) lists 9 clinical markers — from eating more than intended, to failed attempts to cut back, to real withdrawal symptoms.\n• You are a biological organism. Your brain evolved when sugar was rare — seeking dense, sweet food was survival, not a character flaw.\n• You now live in an environment engineered around the 'bliss point' — the exact sugar/fat/salt ratio that makes stopping feel neurologically wrong.\n• Willpower was always the wrong tool. It's built for short, five-second decisions — not a 24/7 fight against engineered biology.\n• The solution was never more willpower. It was always understanding." },
      { type: "info", title: "The Yale Food Addiction Scale — 9 markers", content: "1. You regularly eat more than you intended, especially sweet, salty, or fatty food.\n2. You've tried to cut back or stop many times — the attempts collapse.\n3. A significant amount of your mental energy goes to food.\n4. You experience cravings that feel almost physical, especially under stress.\n5. You keep eating this way knowing it's hurting you.\n6. Things you used to enjoy quietly get pushed aside as food takes the space.\n7. You see the harm clearly — your hand reaches anyway.\n8. What used to satisfy you doesn't anymore — the dose keeps moving.\n9. Removing a trigger food brings real withdrawal: irritability, anxiety, headaches, fatigue.\n\nTwo or three of these, persisting over time, is food addiction by clinical definition." },
      { type: "task", title: "Homework: See Yourself Clearly", content: "Get a piece of paper. Write 1 through 9. Go back through the YFAS criteria above and mark every one that describes you. Not to score yourself — to see yourself clearly, in clinical language. Then write a few sentences here about what you noticed.", taskType: "text" },
    ],
  },
  {
    id: "module-2",
    title: "Module 2: What's Happening In Your Brain",
    subtitle: "The three layers behind every craving",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• Layer 1 — Dopamine. It's not the 'pleasure chemical' — it's the chemical of wanting. Sugar triggers a dopamine release far larger than natural rewards. Receptors downregulate, so you need more sugar to feel normal and everything slower feels flat.\n• Layer 2 — Conditioning. Like Pavlov's dogs, your brain learned to fire a craving from context alone — a time of day, a place, an emotional state — before any real hunger.\n• Layer 3 — Physiological amplifiers. Vagus nerve sensors detect hidden sugar and signal 'find more.' Insulin overshoots after refined carbs, blood sugar drops below baseline, and the brain reads it as an emergency: eat sugar now.\n• All three fire at once, all day, in an environment built to keep them active.\n• The good news: the dopamine system recovers. Remove the overstimulation and sensitivity returns — slow pleasures come back within weeks to months." },
      { type: "task", title: "Homework: 24-Hour Craving Log", content: "For the next 24 hours, keep a craving log. Every time you feel a strong urge — for sugar, refined carbs, anything in the binge pattern — write down four things: the time of day, what you ate in the previous 2–3 hours, what was happening just before the craving, and what emotional state you were in. Don't try to change anything yet. Just observe. Then paste your log here.", taskType: "text" },
    ],
  },
  {
    id: "intermission-1",
    title: "Intermission 1: Your Kitchen",
    subtitle: "Send Kristina three photos — she reads every one",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "What To Do", content: "• Before the next module, do something unusual: when you have 5 quiet minutes, go to your kitchen and take three photos.\n• One of the inside of your fridge. One of your main snack or pantry shelf. One of wherever you keep the food you reach for when you're not actually hungry — a drawer, a jar by your bed, the glove compartment. Wherever the secret stash lives.\n• Send all three to Kristina on WhatsApp (the number is on your course page).\n• Why: every 'how to eat better' resource gives advice for a hypothetical kitchen. Kristina wants to see your real environment — so she can help you accurately instead of guessing.\n• She reads every photo personally and writes back with two or three specific things she notices: patterns most people miss, hidden traps, quick wins.\n• This is the part of the course that doesn't scale. Take your time. Don't skip it." },
      { type: "task", title: "Homework: Send Your Kitchen Photos", content: "Confirm you've sent your three kitchen photos to Kristina on WhatsApp. Then note here: what did you notice while taking them? Anything that surprised you about your own kitchen?", taskType: "text" },
    ],
  },
  {
    id: "module-3",
    title: "Module 3: Who Built This Environment",
    subtitle: "The difficulty you've experienced was never accidental",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• In 1967, the Sugar Research Foundation paid Harvard scientists to publish a review blaming fat for heart disease and downplaying sugar. The conflict of interest stayed hidden for nearly 50 years.\n• One author went on to help shape US dietary guidelines — telling hundreds of millions of people, for decades, to fear fat and not worry about sugar.\n• The low-fat campaign that followed reshaped the global food system: fat came out, sugar went in — everywhere.\n• A 2019 NIH study showed people eating ultra-processed food ate 500 more calories a day without realizing it — same macros, completely different outcome. A calorie is not a calorie.\n• The 'bliss point' — discovered by Howard Moskowitz — became the foundation of the ultra-processed food industry: products engineered to make stopping feel impossible.\n• You were not weak in a neutral environment. You were a normal human being in an environment engineered to exploit normal human biology." },
      { type: "task", title: "Homework: The Hidden Sugar Audit", content: "Go to your kitchen. Pick five packaged items — anything, random. Read the ingredient list on each one. Look for sugar under all its names: corn syrup, high-fructose corn syrup, dextrose, maltose, fructose, glucose syrup, fruit juice concentrate, agave nectar, cane juice, maltodextrin, and dozens more. Count how many of your five contain hidden sugar — and notice where it appears (ingredients are listed by weight; first three = a primary component). Write down what you found.", taskType: "text" },
    ],
  },
  {
    id: "module-4",
    title: "Module 4: What This Stuff Is Doing To You",
    subtitle: "Not 'sugar is bad' — the specific cascade, in your body",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• Ultra-processed food is built on three substances: refined sugar, refined white flour (behaves identically to sugar), and refined industrial fat — then flavoring, color, texture agents, and 'with real fruit' packaging.\n• It makes you fat — specifically visceral fat around your organs, the metabolically destructive kind — because it delivers maximum calories with minimum satiety signal.\n• The insulin crash loop: refined carbs spike blood glucose, insulin overshoots, glucose drops below baseline, your brain calls an emergency. Run that loop several times a day for years and cells stop responding — insulin resistance.\n• Your hormones are downstream of insulin: chronic elevation lowers SHBG and disrupts estrogen and progesterone — worsened PMS, jawline acne, mood instability, stubborn lower-belly fat. The cortisol piece adds baseline anxiety with no clear source.\n• Glycation: excess glucose bonds to collagen and elastin — your skin literally caramelizing from the inside. No serum reaches that.\n• Your gut microbiome gets dismantled — and since a large part of your mood lives in your gut, that shows up as anxiety, brain fog, and emotional reactivity.\n• Most of it is reversible. Your body is constantly working to restore equilibrium — the direction changes the moment the input changes." },
      { type: "task", title: "Homework: Name What You've Accepted", content: "Write down three things you've been experiencing — physically, emotionally, or hormonally — that you've accepted as 'just how you are.' Skin you're not happy with. Afternoon energy crashes. PMS that derails you. Anxiety with no clear story. Brain fog you've normalized. Next to each one, write: this may not be permanent. This may be a physiological response to a specific input. This may change when the input changes. Not as an affirmation — as a hypothesis you're about to test.", taskType: "text" },
    ],
  },
  {
    id: "intermission-2",
    title: "Intermission 2: Your Receipt",
    subtitle: "Send Kristina a grocery receipt — the most useful thing you can show her",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "What To Do", content: "• Next time you go grocery shopping, take a photo of the whole receipt and send it to Kristina on WhatsApp.\n• Why a receipt and not a food diary: a food diary is filtered. People forget, round down, write what they meant to eat. A receipt is the truth — what you actually bought, with prices, quantities, brands.\n• In 30 seconds she can see what would take a week of food journaling to surface: your protein-to-ultra-processed ratio, your hidden sugar exposure, your snack stockpile, your good intentions vs your real patterns.\n• Then she writes back with two or three specific swaps you can make on your next shop. Not a meal plan. Not 'eat clean.' Two or three changes you can do without thinking.\n• No judgment about anything you've bought. This is the second part of the course that doesn't scale." },
      { type: "task", title: "Homework: Send Your Receipt", content: "Confirm you've sent a photo of your grocery receipt to Kristina on WhatsApp. Then note here: looking at your own receipt, what stands out to you?", taskType: "text" },
    ],
  },
  {
    id: "module-5",
    title: "Module 5: The Food Framework",
    subtitle: "The first part of the solution — replacement, not restriction",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• Everything so far was diagnosis. This is the first part of the solution — and it's not 'identify what you shouldn't eat and suffer through the gap.' It's a way of eating that makes the biology work differently.\n• Be honest about carbohydrates: they're the one macronutrient with no minimum dietary requirement. Not bad — optional. Most diets are built backwards, around carbs, with protein and fat as afterthoughts.\n• The foundation: protein. Not about muscles — it's the structural material of your body, the source of every neurotransmitter and hormone. Build every meal around a clear protein source.\n• The second pillar: fat. It's the body's preferred fuel for stable energy, doesn't spike insulin, and is required for brain function and hormones. Decades of low-fat fear were the legacy of the 1967 corruption — not current evidence.\n• Whole foods carry the full context of signals your body uses to regulate hunger. The simple test: does this look like something that existed before industrial processing?\n• The honest conversation about flexibility: the 80/20 rule is dangerous for real food addiction. For your neurological profile, 'a little' is not a stable state — the priming effect means one square becomes the bar. Zero requires one decision; one requires endless renegotiation. Zero is easier.\n• The real exception is rare and genuine — and the test is simple: did you choose it, or did the craving choose for you?" },
      { type: "info", title: "What a meal on this framework looks like", content: "A clear protein, a real fat, and something for volume and variety. Examples: eggs with avocado, greens, and a handful of nuts. Salmon with roasted broccoli and olive oil. Full-fat Greek yogurt with berries, walnuts, and cinnamon. Chicken thighs with vegetables cooked in butter. Lentil soup made with bone broth, topped with a poached egg.\n\nThis is not sad diet food — fat carries flavor, protein provides satiety. One thing worth knowing: when you first transition away from ultra-processed food, real food can taste flat for a week or two. That's the dopamine recalibration. Give it two weeks — the taste comes back, and it comes back better." },
      { type: "task", title: "Homework: Design Tomorrow's Meals", content: "Design tomorrow's meals right now — before you close this video. Not a week. Just tomorrow. Three meals, or two if that's how you eat. For each one: name the protein, name the fat, name what provides volume and variety. Specific ingredients, not categories — not 'protein and vegetables' but 'two eggs, half an avocado, a handful of arugula, olive oil.' Write it here, then go to sleep knowing tomorrow is already decided.", taskType: "text" },
    ],
  },
  {
    id: "module-6",
    title: "Module 6: Environment & Operating System",
    subtitle: "Knowing what to eat is only half the battle",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• Your home is not neutral. If ultra-processed food is anywhere in it, it's already in your brain — your dopamine system tracks it the way a predator tracks prey, and waits for your prefrontal cortex to deplete.\n• 'Keep trigger foods in a high cupboard' assumes a casual relationship you don't have. The right model is the recovering alcoholic: remove it from the home entirely. Not restriction — environment design. One decision, made once.\n• The buying principle: don't buy ultra-processed food. Not when a craving hits, not when something catches your eye. The behavior starts at purchase, not consumption — remove the purchase and the consumption doesn't happen.\n• The city you can't control — it's a commercial environment engineered against you ('food noise'). The principle: never move through it in a vulnerable state. Don't leave home hungry or in a significantly negative emotional state. Go armored.\n• Your personal operating system: pre-decided if-then principles, so when a situation arises you don't have to decide — the decision was already made when your prefrontal cortex was fresh.\n• The allergy line: 'Thank you, I have an allergy' ends the conversation cleanly — no debate, no commentary.\n• The crab basket effect: when you change, people around you may push back — not from malice, but because your 'no' is a mirror. The pressure isn't about you. Hold your position." },
      { type: "task", title: "Homework: Clear The Kitchen + Write Your OS", content: "Two parts. First: go through your kitchen today — remove every ultra-processed product, out of the house. Give it away, throw it away, whatever's practical. Today, not tomorrow. Second: write your personal operating system. Think through the four or five situations that most reliably challenge you, and for each one write the if-then principle that governs your behavior. Keep it as a short list somewhere you'll see it. Paste it here.", taskType: "text" },
    ],
  },
  {
    id: "module-7",
    title: "Module 7: When The Craving Hits",
    subtitle: "Five tools for the moments that still come",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• Even with everything upstream in place, there will be moments — a depleted day, poor sleep, PMS, an unanticipated situation, or just an evening when the old conditioning fires.\n• A craving is a signal, not a command. Before responding, ask three questions: what do I actually want right now? what would genuinely make me feel better? what would actually relieve this? Then listen to the first honest answer — most of the time it isn't about food.\n• Tool 1 — The sparkling water protocol. Strong carbonation, no sugar. A pre-decided action that interrupts the craving physically and gives your hands and mouth something to do.\n• Tool 2 — Identify and name the source. Bored? Exhausted? Lonely? Anxious? Naming it breaks the automatic quality of the conditioned response and inserts a moment of choice.\n• Tool 3 — The notes dump. When there's emotional charge underneath, write it out — unedited, no grammar. The charge gets somewhere to go other than food.\n• Tool 4 — Change the physical environment. If the craving is boredom- or place-driven, leave. A café, a walk — even fifteen minutes changes the brain state.\n• Tool 5 — The if-then protocol. For your most common triggers, pre-decide the exact sequence. The decision already made is the decision that holds.\n• These tools matter most in early recovery. As the system recalibrates, craving frequency drops, then intensity — and eventually most of them become unnecessary." },
      { type: "task", title: "Homework: Your Personal Craving Protocol", content: "Write your personal craving protocol. Three parts: (1) your top three craving trigger situations — the specific times, places, or emotional states that most reliably produce a craving; (2) what is usually underneath each one — what real need is being activated; (3) your specific if-then response for each. Write it tonight and pin it somewhere physical — the fridge, the bathroom mirror, your phone wallpaper. Paste it here too.", taskType: "text" },
    ],
  },
  {
    id: "module-8",
    title: "Module 8: Values & The Long Game",
    subtitle: "What makes recovery permanent",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• The tools hold until life gets hard. What determines whether you stay or go back isn't whether you have good tools — it's what you actually value, at the level your choices reveal when nobody's watching.\n• You get what you prioritize. Not what you say you value — what your repeated choices reveal. Recovery means actually reordering that hierarchy, not performing new values while the old ones run underneath.\n• You can't genuinely value something you don't understand — which is why this course started with biology and mechanisms, not motivation. The picture is now in your head; the values can follow.\n• The identity question: the destination isn't 'I'm someone who controls herself around sugar' — that still centers the sugar. It's 'this is just not part of my life anymore.' Built through accumulated evidence: every time the protocol runs instead of the binge, you build one data point in the brain's model of who you are.\n• You have to build something to replace it. Removing sugar leaves a dopamine gap. The answer isn't new dopamine hits — it's restoring sensitivity to slower, natural sources: movement, creative work, learning something difficult, real connection.\n• Be careful with other dopamine drains — social media, compulsive shopping, alcohol, excessive caffeine, binge-watching. They run on the same architecture and quietly eat the resource that should build your actual life.\n• What you're protecting: your hormonal health, your skin, your brain, your gut, your energy — and access to your own life. That version of you isn't built from scratch. She's underneath, waiting for the addiction to lift enough to surface." },
      { type: "task", title: "Homework: Two Questions", content: "Two questions. Write the answers on paper, not just in your head. First: what do you actually value — at the level where your choices will reflect it when things are hard? Not what you think you should value. What genuinely sits above the momentary relief of the binge? Second: what are three things you're genuinely curious about, or want to do, that the addiction has been consuming the energy for? Not aspirations — specific things: a skill, a project, a practice, a relationship you want to show up differently in. Paste both answers here.", taskType: "text" },
    ],
  },
  {
    id: "module-9",
    title: "Module 9: What Comes Next",
    subtitle: "What you built — and the one thing to carry forward",
    duration: "",
    videoUrl: "", // TODO: paste YouTube link
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "Full Course Summary", content: "• You made it through the course — and if you did the homework, you didn't just watch, you engaged. That's the difference between information and the start of real change.\n• What you built: a mechanistic understanding of what happens in your brain around food. Who built the environment, and why. What chronic refined food does to your body — and that most of it is reversible. A food framework that works with your biology. An environment and an operating system. Real craving tools. And the beginning of a values reorientation.\n• What comes next, honestly: knowing all this doesn't mean you won't have hard moments. You will. Recovery is not a straight line. What matters is the direction across time — and the direction changes when the inputs change consistently.\n• The one thing to take from this: you were never fighting yourself. You were fighting a system — biological, neurological, industrial, social — that nobody had clearly explained. Now that you can see it, you can stop fighting yourself and start designing around it.\n• The version of you that was 'failing' wasn't weak. She was confused — solving a biological and environmental problem with shame and willpower, the wrong tools for the actual problem." },
      { type: "task", title: "Homework: One Commitment", content: "One commitment. Not ten, not five. One. Pick the single most important thing from this course — the one that, done consistently for the next 30 days, will move everything else forward. For some that's clearing the house and keeping it clean. For others it's a real protein-and-fat breakfast every morning. For others it's the craving log from Module 2. One thing — specific enough that you know each day whether you did it, small enough that you can't fail it on a normal day. Write it down here, right now.", taskType: "text" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   PROGRESS HELPERS
   ═══════════════════════════════════════════════════════════════ */
type ProgressMap = Record<string, LessonProgress>;

const defaultProgress = (): LessonProgress => ({
  videoWatched: false,
  linkVisited: false,
  taskSubmitted: false,
  taskContent: "",
  completed: false,
});

const isLessonComplete = (lesson: LessonDef, prog: LessonProgress): boolean => {
  if (lesson.requiresVideo && !prog.videoWatched) return false;
  if (lesson.requiresLink && !prog.linkVisited) return false;
  if (lesson.requiresTask && !prog.taskSubmitted) return false;
  return true;
};

const isLessonAccessible = (index: number, lessons: LessonDef[], progress: ProgressMap): boolean => {
  const lesson = lessons[index];
  if (lesson.comingSoon) return false;
  if (index === 0) return true;
  // previous non-comingSoon lesson must be completed
  for (let i = index - 1; i >= 0; i--) {
    if (!lessons[i].comingSoon) {
      const prev = progress[lessons[i].id] ?? defaultProgress();
      return prev.completed;
    }
  }
  return true;
};

const getXP = (progress: ProgressMap) =>
  Object.values(progress).reduce((sum, p) => sum + (p.completed ? 100 : 0) + (p.taskSubmitted ? 50 : 0), 0);

const getLevel = (xp: number) => Math.floor(xp / 200) + 1;
const getLevelTitle = (level: number) =>
  ["Beginner", "Explorer", "Learner", "Warrior", "Champion", "Master"][Math.min(level - 1, 5)];

/* ═══════════════════════════════════════════════════════════════
   STUDENT CONTEXT (email identification)
   ═══════════════════════════════════════════════════════════════ */
const loadStudent = () => {
  try {
    const d = localStorage.getItem("fm-student");
    return d ? JSON.parse(d) as { email: string; name: string } : null;
  } catch { return null; }
};

const loadProgress = (): ProgressMap => {
  try {
    const d = localStorage.getItem("fm-progress");
    return d ? JSON.parse(d) : {};
  } catch { return {}; }
};

/* ═══════════════════════════════════════════════════════════════
   EMAIL GATE
   ═══════════════════════════════════════════════════════════════ */
const EmailGate = ({ onSubmit }: { onSubmit: (email: string, name: string) => void }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic mb-2">
            The Forever Method
          </h1>
          <p className="text-gray-500">Enter your details to access the course</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Your Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => email.includes("@") && name.trim() && onSubmit(email, name)}
            disabled={!email.includes("@") || !name.trim()}
            className="w-full py-4 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            Access My Course <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-[10px] text-gray-400 mt-4">
            Use the same email you used on Gumroad
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════════════════════ */
const Sidebar = ({
  lessons,
  progress,
  activeId,
  onSelect,
  onClose,
  studentName,
}: {
  lessons: LessonDef[];
  progress: ProgressMap;
  activeId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
  studentName: string;
}) => {
  const completedCount = lessons.filter((l) => (progress[l.id] ?? defaultProgress()).completed).length;
  const availableCount = lessons.filter((l) => !l.comingSoon).length;
  const pct = Math.round((completedCount / availableCount) * 100);
  const xp = getXP(progress);

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Flame className="text-white w-4 h-4" />
            </div>
            <span className="font-black text-sm tracking-tighter text-gray-900 italic uppercase">
              FOREVER<span className="text-emerald-600">METHOD</span>
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-2 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>{completedCount}/{availableCount} completed</span>
          <span className="text-emerald-600">{pct}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Lessons */}
      <div className="flex-1 overflow-y-auto py-2">
        {lessons.map((lesson, i) => {
          const prog = progress[lesson.id] ?? defaultProgress();
          const isActive = lesson.id === activeId;
          const accessible = isLessonAccessible(i, lessons, progress);
          const locked = lesson.comingSoon || !accessible;

          let StatusIcon = Circle;
          let iconColor = "text-gray-300";
          if (locked) { StatusIcon = Lock; iconColor = "text-gray-200"; }
          else if (prog.completed) { StatusIcon = CheckCircle2; iconColor = "text-emerald-500"; }
          else if (isActive) { iconColor = "text-emerald-600"; }

          return (
            <div key={lesson.id} className="relative group">
              <button
                onClick={() => accessible && onSelect(lesson.id)}
                disabled={!accessible}
                className={`w-full text-left px-5 py-3 flex items-start gap-3 transition-colors ${
                  isActive ? "bg-emerald-50 border-r-2 border-emerald-600"
                  : locked ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <StatusIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-bold truncate ${isActive ? "text-emerald-700" : locked ? "text-gray-400" : "text-gray-800"}`}>
                    {lesson.title}
                  </div>
                  {lesson.duration && (
                    <span className="text-[10px] text-gray-400 font-medium flex items-center gap-0.5 mt-0.5">
                      <Clock className="w-3 h-3" /> {lesson.duration}
                    </span>
                  )}
                </div>
              </button>
              {/* Hover tooltip for locked lessons */}
              {locked && (
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 w-56 pointer-events-none">
                  <div className="bg-gray-900 text-white p-3 rounded-xl shadow-xl text-xs relative">
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900" />
                    <div className="flex items-center gap-2 mb-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-black text-amber-400 uppercase tracking-wider text-[10px]">Locked</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {lesson.comingSoon
                        ? "This lesson is being prepared. Complete the available lessons first — we'll notify you when this unlocks!"
                        : "Complete all steps in the previous lesson to unlock this one."
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer: XP + Level */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Trophy className="w-4 h-4 text-yellow-900" />
            </div>
            <div>
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Level {getLevel(xp)}</div>
              <div className="text-xs font-bold text-gray-700">{getLevelTitle(getLevel(xp))}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-emerald-600">{xp}</div>
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">XP</div>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 font-medium truncate">
          Logged in as <span className="font-bold text-gray-600">{studentName}</span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   WELCOME SCREEN
   ═══════════════════════════════════════════════════════════════ */
const WelcomeScreen = ({ name, onStart }: { name: string; onStart: () => void }) => (
  <div className="max-w-3xl mx-auto text-center py-12 px-4">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-200">
        <Flame className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter mb-3 uppercase italic">
        Welcome, {name}!
      </h1>
      <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
        I'm Kristina. This isn't a diet, a challenge, or a meal plan. It's nine modules and two intermissions that explain why your brain does what it does around sugar — and then give you a framework you can actually use.
      </p>

      <div className="bg-gray-50 rounded-3xl p-8 mb-8 text-left border border-gray-100">
        <h3 className="font-black text-gray-900 mb-4 uppercase text-sm tracking-wider">How this works:</h3>
        <ul className="space-y-3">
          {[
            "Watch each module video from start to finish",
            "Complete the homework task — it's small, specific, and the course doesn't work without it",
            "Two intermissions ask you to send Kristina photos on WhatsApp — she reads every one",
            "Finish a module's video and task to unlock the next one",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-amber-50 rounded-2xl p-5 mb-8 border border-amber-100 text-left">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800 mb-1">Start with Module 0 and move in order</p>
            <p className="text-xs text-amber-600">Each module builds on the one before it. Complete each fully — video + task — before moving on.</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-2xl p-5 mb-8 border border-emerald-100">
        <div className="flex items-center justify-center gap-8">
          {[
            { icon: <Flame className="w-5 h-5" />, label: "Streaks", color: "text-orange-500" },
            { icon: <Zap className="w-5 h-5" />, label: "Earn XP", color: "text-yellow-500" },
            { icon: <Trophy className="w-5 h-5" />, label: "Level Up", color: "text-purple-500" },
            { icon: <Target className="w-5 h-5" />, label: "Tasks", color: "text-emerald-600" },
          ].map((g, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={g.color}>{g.icon}</div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{g.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 transition-all uppercase"
      >
        Start My Journey <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   STEP CHECKLIST (shows what's left in current lesson)
   ═══════════════════════════════════════════════════════════════ */
const StepChecklist = ({ lesson, prog }: { lesson: LessonDef; prog: LessonProgress }) => {
  const steps: { label: string; done: boolean }[] = [];
  if (lesson.requiresVideo) steps.push({ label: "Watch the lesson video", done: prog.videoWatched });
  if (lesson.requiresLink) steps.push({ label: "Watch required external resource", done: prog.linkVisited });
  if (lesson.requiresTask) steps.push({ label: "Complete and submit the task", done: prog.taskSubmitted });

  if (steps.length === 0) return null;
  const allDone = steps.every((s) => s.done);

  return (
    <div className={`p-4 rounded-2xl border mb-6 ${allDone ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border-gray-100"}`}>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
        {allDone ? "✓ All steps completed — you can proceed!" : "Complete all steps to unlock the next lesson"}
      </div>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            {s.done ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <Circle className="w-4 h-4 text-gray-300" />
            )}
            <span className={`text-sm ${s.done ? "text-emerald-700 font-bold line-through" : "text-gray-600 font-medium"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   RESOURCE CARDS
   ═══════════════════════════════════════════════════════════════ */
const InfoCard = ({ resource }: { resource: LessonResource }) => {
  const [expanded, setExpanded] = useState(false);
  const colors = resource.type === "summary"
    ? { bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-600", iconBg: "bg-purple-100" }
    : { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600", iconBg: "bg-blue-100" };
  const icon = resource.type === "summary" ? <FileText className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />;

  return (
    <div className={`${colors.bg} rounded-2xl border ${colors.border} overflow-hidden`}>
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center gap-3 text-left hover:bg-white/50 transition-colors">
        <div className={`w-10 h-10 ${colors.iconBg} ${colors.text} rounded-xl flex items-center justify-center flex-shrink-0`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-bold ${colors.text}`}>{resource.title}</div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            {resource.type === "info" ? "Additional reading" : "Key points"}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-5 pb-5">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{resource.content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LinkCard = ({
  resource,
  visited,
  onVisit,
}: {
  resource: LessonResource;
  visited: boolean;
  onVisit: () => void;
}) => (
  <div className={`p-4 rounded-2xl border ${visited ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${visited ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
        {visited ? <CheckCircle2 className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-bold ${visited ? "text-emerald-700" : "text-amber-700"}`}>{resource.title}</div>
        <div className="text-xs text-gray-500">{resource.content}</div>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex-1 py-2.5 text-center text-sm font-bold rounded-xl transition-colors ${
          visited ? "bg-emerald-100 text-emerald-700" : "bg-amber-500 text-white hover:bg-amber-600"
        }`}
      >
        {visited ? "Watch Again" : "Open & Watch"} ↗
      </a>
      {!visited && (
        <button
          onClick={onVisit}
          className="py-2.5 px-4 text-sm font-bold text-emerald-600 bg-emerald-100 rounded-xl hover:bg-emerald-200 transition-colors"
        >
          I've watched it ✓
        </button>
      )}
    </div>
  </div>
);

const TaskCard = ({
  resource,
  submitted,
  onSubmit,
}: {
  resource: LessonResource;
  submitted: boolean;
  onSubmit: (content: string) => void;
}) => {
  const [input, setInput] = useState("");

  return (
    <div className={`p-5 rounded-2xl border ${submitted ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-100"}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${submitted ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
          {submitted ? <CheckCircle2 className="w-5 h-5" /> : <PenLine className="w-5 h-5" />}
        </div>
        <div className="flex-1">
          <div className={`text-sm font-bold ${submitted ? "text-emerald-700" : "text-amber-700"}`}>{resource.title}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            {resource.taskType === "photo" && <Camera className="w-3 h-3 text-gray-400" />}
            {resource.taskType === "video" && <Video className="w-3 h-3 text-gray-400" />}
            {resource.taskType === "text" && <MessageSquare className="w-3 h-3 text-gray-400" />}
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {resource.taskType} response {submitted ? "— submitted" : "— required"}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-4">{resource.content}</p>

      {submitted ? (
        <div className="p-3 bg-emerald-100 rounded-xl text-center">
          <p className="text-sm font-bold text-emerald-700 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Task completed! +50 XP
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {resource.taskType === "text" ? (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your response here..."
              className="w-full p-3 border border-amber-200 rounded-xl text-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
            />
          ) : (
            <div className="border-2 border-dashed border-amber-200 rounded-xl p-6 text-center bg-white cursor-pointer hover:border-amber-300 transition-colors">
              <Upload className="w-8 h-8 text-amber-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400 font-bold">Click to upload {resource.taskType === "photo" ? "a photo" : "a video"}</p>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Or paste a link / describe what you observed..."
                className="mt-3 w-full p-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
          )}
          <button
            onClick={() => input.trim() && onSubmit(input)}
            disabled={!input.trim()}
            className="w-full py-3 bg-amber-500 text-white font-bold text-sm rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Submit Task
          </button>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   LESSON VIEW
   ═══════════════════════════════════════════════════════════════ */
const LessonView = ({
  lesson,
  prog,
  onUpdate,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  nextAccessible,
}: {
  lesson: LessonDef;
  prog: LessonProgress;
  onUpdate: (p: Partial<LessonProgress>) => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  nextAccessible: boolean;
}) => {
  const allDone = isLessonComplete(lesson, prog);

  // Auto-complete lesson when all steps done
  useEffect(() => {
    if (allDone && !prog.completed) {
      onUpdate({ completed: true });
    }
  }, [allDone, prog.completed]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <motion.div key={lesson.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            {lesson.duration && (<><Clock className="w-3.5 h-3.5" /><span>{lesson.duration}</span><span>•</span></>)}
            <span>Video Lesson</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-1">{lesson.title}</h1>
          <p className="text-gray-500">{lesson.subtitle}</p>
        </div>

        {/* Step Checklist */}
        <StepChecklist lesson={lesson} prog={prog} />

        {/* Video Player */}
        {lesson.requiresVideo && (
          <div className="mb-8">
            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative shadow-lg mb-3">
              {lesson.videoUrl ? (
                <iframe
                  src={toYouTubeEmbed(lesson.videoUrl)}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-3">
                    <Video className="w-7 h-7 text-gray-500" />
                  </div>
                  <span className="text-gray-300 text-sm font-bold">Video coming soon</span>
                  <span className="text-gray-500 text-xs mt-1">This lesson's video is being added</span>
                </div>
              )}
            </div>
            {!prog.videoWatched ? (
              <button
                onClick={() => onUpdate({ videoWatched: true })}
                className="w-full py-3 bg-gray-900 text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" /> I've watched this video ✓
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 text-emerald-600 text-sm font-bold py-2">
                <CheckCircle2 className="w-4 h-4" /> Video watched
              </div>
            )}
          </div>
        )}

        {/* Resources */}
        {lesson.resources.length > 0 && (
          <div className="space-y-4 mb-8">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Lesson Materials</h3>
            {lesson.resources.map((r, i) => {
              if (r.type === "info" || r.type === "summary") return <InfoCard key={i} resource={r} />;
              if (r.type === "link") return <LinkCard key={i} resource={r} visited={prog.linkVisited} onVisit={() => onUpdate({ linkVisited: true })} />;
              if (r.type === "task") return <TaskCard key={i} resource={r} submitted={prog.taskSubmitted} onSubmit={(content) => onUpdate({ taskSubmitted: true, taskContent: content })} />;
              return null;
            })}
          </div>
        )}

        {/* Navigation */}
        <div className="border-t border-gray-100 pt-6 flex items-center gap-4">
          {hasPrev && (
            <button onClick={onPrev} className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
          )}
          <div className="flex-1" />
          {hasNext && (
            nextAccessible ? (
              <button
                onClick={onNext}
                className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all uppercase tracking-wider"
              >
                Next Lesson <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-400 font-bold text-sm rounded-xl">
                <Lock className="w-4 h-4" />
                {LESSONS[LESSONS.findIndex((l) => l.id === lesson.id) + 1]?.comingSoon
                  ? "Next lesson coming soon"
                  : "Complete all steps to continue"
                }
              </div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   CELEBRATION POPUP
   ═══════════════════════════════════════════════════════════════ */
const CelebrationPopup = ({ xp, onClose }: { xp: number; onClose: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center z-10">
      <motion.div initial={{ rotate: -10, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
        className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Sparkles className="w-10 h-10 text-yellow-900" />
      </motion.div>
      <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight uppercase">Lesson Complete!</h3>
      <p className="text-emerald-600 font-black text-3xl mb-1">+100 XP</p>
      <p className="text-gray-400 text-sm font-bold mb-6">Total: {xp} XP • Level {getLevel(xp)}</p>
      <button onClick={onClose} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors">
        Continue
      </button>
    </motion.div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN LEARN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Learn() {
  const [student, setStudent] = useState(loadStudent);
  const [progress, setProgress] = useState<ProgressMap>(loadProgress);
  const [activeId, setActiveId] = useState(LESSONS[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [celebration, setCelebration] = useState<number | null>(null);

  // Save progress to localStorage + sync to Supabase
  useEffect(() => {
    localStorage.setItem("fm-progress", JSON.stringify(progress));
  }, [progress]);

  // Load progress from Supabase on login
  useEffect(() => {
    if (!student) return;
    loadProgressFromCloud(student.email).then((cloudData) => {
      if (!cloudData || cloudData.length === 0) return;
      setProgress((prev) => {
        const merged = { ...prev };
        for (const row of cloudData) {
          const existing = merged[row.lesson_id] ?? defaultProgress();
          merged[row.lesson_id] = {
            ...existing,
            videoWatched: existing.videoWatched || row.video_watched,
            linkVisited: existing.linkVisited || row.link_visited,
            taskSubmitted: existing.taskSubmitted || row.task_submitted,
            completed: existing.completed || row.completed,
          };
        }
        return merged;
      });
    });
  }, [student]);

  // Student registration — save to localStorage + Supabase
  const handleRegister = (email: string, name: string) => {
    const s = { email, name };
    localStorage.setItem("fm-student", JSON.stringify(s));
    setStudent(s);
    upsertStudent(email, name);
  };

  // Gate: require email
  if (!student) return <EmailGate onSubmit={handleRegister} />;

  const activeLesson = LESSONS.find((l) => l.id === activeId)!;
  const activeIndex = LESSONS.findIndex((l) => l.id === activeId);
  const activeProg = progress[activeId] ?? defaultProgress();
  const xp = getXP(progress);

  const updateProgress = (lessonId: string, updates: Partial<LessonProgress>) => {
    setProgress((prev) => {
      const current = prev[lessonId] ?? defaultProgress();
      const updated = { ...current, ...updates };
      const newMap = { ...prev, [lessonId]: updated };

      // Show celebration when lesson first completed
      if (updates.completed && !current.completed) {
        setCelebration(getXP(newMap));
      }

      // Sync to Supabase
      syncProgressToCloud(student.email, lessonId, {
        video_watched: updated.videoWatched,
        link_visited: updated.linkVisited,
        task_submitted: updated.taskSubmitted,
        completed: updated.completed,
      });

      // If task was submitted, save the content to submissions table
      if (updates.taskSubmitted && updates.taskContent) {
        const lesson = LESSONS.find((l) => l.id === lessonId);
        const taskResource = lesson?.resources.find((r) => r.type === "task");
        submitTaskToCloud(student.email, lessonId, taskResource?.taskType ?? "text", updates.taskContent);
      }

      return newMap;
    });
  };

  const goTo = (id: string) => { setActiveId(id); setSidebarOpen(false); window.scrollTo(0, 0); };

  const goNext = () => {
    if (activeIndex < LESSONS.length - 1) goTo(LESSONS[activeIndex + 1].id);
  };
  const goPrev = () => {
    if (activeIndex > 0) goTo(LESSONS[activeIndex - 1].id);
  };

  const startCourse = () => {
    updateProgress("welcome", { completed: true });
    goTo("module-0");
  };

  const nextIndex = activeIndex + 1;
  const nextAccessible = nextIndex < LESSONS.length && isLessonAccessible(nextIndex, LESSONS, progress);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0 h-screen sticky top-0 shadow-sm">
        <Sidebar lessons={LESSONS} progress={progress} activeId={activeId} onSelect={goTo} onClose={() => {}} studentName={student.name} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: "spring", damping: 25 }} className="fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden shadow-2xl">
              <Sidebar lessons={LESSONS} progress={progress} activeId={activeId} onSelect={goTo} onClose={() => setSidebarOpen(false)} studentName={student.name} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-gray-900 truncate">{activeLesson.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-black text-emerald-600">{xp} XP</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeId === "welcome" ? (
          <WelcomeScreen name={student.name} onStart={startCourse} />
        ) : (
          <LessonView
            lesson={activeLesson}
            prog={activeProg}
            onUpdate={(updates) => updateProgress(activeId, updates)}
            onNext={goNext}
            onPrev={goPrev}
            hasNext={activeIndex < LESSONS.length - 1}
            hasPrev={activeIndex > 0}
            nextAccessible={nextAccessible}
          />
        )}
      </div>

      {/* Celebration */}
      <AnimatePresence>
        {celebration !== null && (
          <CelebrationPopup xp={celebration} onClose={() => setCelebration(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
