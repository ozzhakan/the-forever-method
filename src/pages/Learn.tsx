import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Circle,
  Lock,
  ChevronDown,
  Clock,
  Flame,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  BookOpen,
  PenLine,
  Video,
  Sparkles,
  Menu,
  X,
  FileText,
  Eye,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  PlayCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ResourceLibrary, ResourceDetail, RESOURCES, RelatedResources } from "./Resources";
import { ProductTour, isTourComplete, resetTour } from "../components/ProductTour";

/* ═══════════════════════════════════════════════════════════════
   CONTACT — Kristina is reachable on WhatsApp at this number.
   ═══════════════════════════════════════════════════════════════ */
const WHATSAPP_URL = "https://wa.me/31618784896";
const WHATSAPP_DISPLAY = "+31 6 18784896";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */
interface LessonResource {
  type: "info" | "summary" | "task" | "link";
  title: string;
  content: string;
  href?: string;        // for type: "link"
  linkLabel?: string;   // for type: "link" — button label
}

interface LessonDef {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  videoUrl?: string;           // YouTube link — embed shows when set
  comingSoon: boolean;
  requiresVideo: boolean;
  resources: LessonResource[];
}

interface LessonProgress {
  videoWatched: boolean;
  completed: boolean;
}

/* ═══════════════════════════════════════════════════════════════
   VIDEO HELPERS
   • YouTube URL → embed URL with clean params (no logo, no related
     videos, no annotations, plays inline on iOS).
   • Self-hosted (.mp4/.webm/.mov or path starting with /) → returned
     as-is so we can render via a native <video> element.
   ═══════════════════════════════════════════════════════════════ */
const isSelfHostedVideo = (url: string): boolean =>
  !!url && (url.startsWith("/") || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url));

const toYouTubeEmbed = (url: string): string => {
  if (!url) return "";
  let id: string | null = null;
  if (url.includes("/embed/")) {
    const m = url.match(/\/embed\/([\w-]+)/);
    id = m?.[1] ?? null;
  } else {
    const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
    const watchMatch = url.match(/[?&]v=([\w-]+)/);
    const shortsMatch = url.match(/\/shorts\/([\w-]+)/);
    id = shortMatch?.[1] ?? watchMatch?.[1] ?? shortsMatch?.[1] ?? null;
  }
  if (!id) return url;
  // modestbranding=1 — hide YT logo • rel=0 — only same-channel related at end
  // iv_load_policy=3 — hide annotations/cards • playsinline=1 — iOS inline play
  // color=white — white progress bar • cc_load_policy=0 — no auto captions
  // disablekb=1 — disable keyboard shortcuts (no accidental skips)
  // (showinfo was removed by YouTube in 2018; title still shows on hover.)
  const params = "modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&color=white&cc_load_policy=0&disablekb=1";
  return `https://www.youtube.com/embed/${id}?${params}`;
};

/* ═══════════════════════════════════════════════════════════════
   COURSE DATA — The Unhooked Method (9 modules + 2 intermissions)
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
    resources: [],
  },
  {
    id: "module-0",
    title: "Module 0: Welcome",
    subtitle: "What this course actually is — and what it isn't",
    duration: "",
    videoUrl: "https://youtu.be/e2n6_KN92-o",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• This is not a 30-day challenge, a diet, or a meal plan.\n• It's 9 modules + 2 intermissions explaining — with real neuroscience, endocrinology, and food industry history — why your brain does what it does around sugar.\n• Then it gives you a framework you can start using immediately.\n• You'll have homework after every module: small, specific, doable. The course doesn't work if you watch passively.\n• Twice, the lessons pause for an 'intermission' — you'll send Kristina photos directly on WhatsApp, and she reads every one.\n• Honest disclaimer: this is not a substitute for medical or psychiatric care. If you're in active crisis with an eating disorder, message Kristina — there's no shame in that." },
    ],
  },
  {
    id: "my-story",
    title: "My Story",
    subtitle: "Ten years of disordered eating — and what finally changed it",
    duration: "",
    videoUrl: "https://youtu.be/7pl8K_CxSWE",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• Kristina spent ten years in disordered eating — bulimia, compulsive bingeing, regular relapses.\n• Diets and intense exercise made it worse. Psychologists and a psychiatrist didn't hold, because none of it explained what was actually happening inside her.\n• What changed everything wasn't a new rule or a stricter plan — it was real understanding: what sugar does, why the brain holds onto it, and what the environment does to us.\n• Today her relationship with food is free. She doesn't restrict — yet 95% of the time naturally chooses whole food, because the craving and dependency are gone.\n• When the brain is genuinely nourished and supported, sugar loses its power." },
    ],
  },
  {
    id: "module-1",
    title: "Module 1: You Are Not Broken",
    subtitle: "Food addiction is real, measurable, and not a personal failing",
    duration: "",
    videoUrl: "https://youtu.be/pYI7_YrqDgI",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• Roughly 1 in 5 people meet the clinical criteria for food addiction — the same framework used for cocaine and alcohol. It skews significantly higher in women.\n• The Yale Food Addiction Scale (YFAS) lists 9 clinical markers — from eating more than intended, to failed attempts to cut back, to real withdrawal symptoms.\n• You are a biological organism. Your brain evolved when sugar was rare — seeking dense, sweet food was survival, not a character flaw.\n• You now live in an environment engineered around the 'bliss point' — the exact sugar/fat/salt ratio that makes stopping feel neurologically wrong.\n• Willpower was always the wrong tool. It's built for short, five-second decisions — not a 24/7 fight against engineered biology.\n• The solution was never more willpower. It was always understanding." },
      { type: "info", title: "The Yale Food Addiction Scale — 9 markers", content: "1. You regularly eat more than you intended, especially sweet, salty, or fatty food.\n2. You've tried to cut back or stop many times — the attempts collapse.\n3. A significant amount of your mental energy goes to food.\n4. You experience cravings that feel almost physical, especially under stress.\n5. You keep eating this way knowing it's hurting you.\n6. Things you used to enjoy quietly get pushed aside as food takes the space.\n7. You see the harm clearly — your hand reaches anyway.\n8. What used to satisfy you doesn't anymore — the dose keeps moving.\n9. Removing a trigger food brings real withdrawal: irritability, anxiety, headaches, fatigue.\n\nTwo or three of these, persisting over time, is food addiction by clinical definition." },
      { type: "task", title: "Homework: See Yourself Clearly", content: "Get a piece of paper. Write 1 through 9. Go back through the YFAS criteria above and mark every one that describes you. Not to score yourself — to see yourself clearly, in clinical language." },
      { type: "link", title: "Take the YFAS Self-Assessment Online", content: "If you want to take the Yale Food Addiction Scale in an interactive format, this clinical tool walks you through the same 9-marker checklist with scoring at the end. Optional — useful if you'd rather click through it than write by hand.", href: "https://tools.psywellpath.com/yale-food-addiction-scale", linkLabel: "Open the tool" },
    ],
  },
  {
    id: "module-2",
    title: "Module 2: What's Happening In Your Brain",
    subtitle: "The three layers behind every craving",
    duration: "",
    videoUrl: "https://youtu.be/1n-tj1ooQlU",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• Layer 1 — Dopamine. It's not the 'pleasure chemical' — it's the chemical of wanting. Sugar triggers a dopamine release far larger than natural rewards. Receptors downregulate, so you need more sugar to feel normal and everything slower feels flat.\n• Layer 2 — Conditioning. Like Pavlov's dogs, your brain learned to fire a craving from context alone — a time of day, a place, an emotional state — before any real hunger.\n• Layer 3 — Physiological amplifiers. Vagus nerve sensors detect hidden sugar and signal 'find more.' Insulin overshoots after refined carbs, blood sugar drops below baseline, and the brain reads it as an emergency: eat sugar now.\n• All three fire at once, all day, in an environment built to keep them active.\n• The good news: the dopamine system recovers. Remove the overstimulation and sensitivity returns — slow pleasures come back within weeks to months." },
      { type: "task", title: "Homework: 24-Hour Craving Log", content: "For the next 24 hours, keep a craving log. Every time you feel a strong urge — for sugar, refined carbs, anything in the binge pattern — write down four things: the time of day, what you ate in the previous 2–3 hours, what was happening just before the craving, and what emotional state you were in. Don't try to change anything yet. Just observe." },
      { type: "link", title: "Andrew Huberman on Dopamine", content: "If you want to go deeper on Layer 1, Kristina recommends this episode. Huberman is a Stanford neuroscientist who walks through the dopamine system with precision — how it works, what crashes it, and how to rebuild sensitivity. Optional, but high-leverage if you have the time.", href: "https://www.youtube.com/watch?v=QmOF0crdyRU", linkLabel: "Watch on YouTube" },
    ],
  },
  {
    id: "intermission-1",
    title: "Intermission 1: Your Kitchen",
    subtitle: "A short pause — take a 'before' photo of your kitchen",
    duration: "",
    videoUrl: "",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Why This Matters", content: "• Before we proceed with the rest of the course, take a moment to capture where your kitchen is right now.\n• When you have 5 quiet minutes, take three photos: the inside of your fridge, your main snack or pantry shelf, and wherever the food you reach for when you're not actually hungry lives — a drawer, a jar by the bed, the glove compartment.\n• Send the three photos to yourself on WhatsApp (or save them somewhere you'll find them later).\n• That's the whole task today. No analysis, no judgment — just a clean 'before' snapshot.\n• Why this matters will become clear as the course unfolds. For now, trust the sequence and capture the state." },
      { type: "task", title: "Homework: Capture Your Kitchen (Three Photos)", content: "Take three photos — fridge interior, your main snack/pantry shelf, and wherever your honest stash lives. Save them somewhere you'll find them later in the course. If you want, send them to us on WhatsApp using the button below — we'll keep them ready for the lesson that uses them." },
    ],
  },
  {
    id: "module-3",
    title: "Module 3: Who Built This Environment",
    subtitle: "The difficulty you've experienced was never accidental",
    duration: "",
    videoUrl: "https://youtu.be/tCP6nPLhd8M",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• In 1967, the Sugar Research Foundation paid Harvard scientists to publish a review blaming fat for heart disease and downplaying sugar. The conflict of interest stayed hidden for nearly 50 years.\n• One author went on to help shape US dietary guidelines — telling hundreds of millions of people, for decades, to fear fat and not worry about sugar.\n• The low-fat campaign that followed reshaped the global food system: fat came out, sugar went in — everywhere.\n• A 2019 NIH study showed people eating ultra-processed food ate 500 more calories a day without realizing it — same macros, completely different outcome. A calorie is not a calorie.\n• The 'bliss point' — discovered by Howard Moskowitz — became the foundation of the ultra-processed food industry: products engineered to make stopping feel impossible.\n• You were not weak in a neutral environment. You were a normal human being in an environment engineered to exploit normal human biology." },
      { type: "task", title: "Homework: The Hidden Sugar Audit", content: "Go to your kitchen. Pick five packaged items — anything, random. Read the ingredient list on each one. Look for sugar under all its names: corn syrup, high-fructose corn syrup, dextrose, maltose, fructose, glucose syrup, fruit juice concentrate, agave nectar, cane juice, maltodextrin, and dozens more. Count how many of your five contain hidden sugar — and notice where it appears (ingredients are listed by weight; first three = a primary component)." },
      { type: "link", title: "The 1967 Sugar Industry Paper — Original Research", content: "If you want to read the JAMA Internal Medicine analysis of the internal Sugar Research Foundation documents that revealed the 1967 conflict of interest yourself, this is the primary source. Heavy reading, but it's the receipt for everything covered in this module.", href: "https://www.researchgate.net/publication/311648113_Sugar_Industry_and_Coronary_Heart_Disease_Research_A_Historical_Analysis_of_Internal_Industry_Documents_vol_176_pg_1680_2016", linkLabel: "Read the paper" },
      { type: "link", title: "The 2019 NIH Ultra-Processed Food Study", content: "Kevin Hall's NIH metabolic ward study — the one referenced in the lesson where participants on ultra-processed food ate 500 extra calories a day. Same macros on paper, completely different outcome in the body. This is the official NIH write-up.", href: "https://www.cc.nih.gov/news/2019/summer/story-01", linkLabel: "Read the study" },
      { type: "link", title: "The Food Industry Engineering — Documentary Clip", content: "A short, well-produced explainer of how processed food is engineered around the bliss point — including the 'mouthfeel' research and the Snackwell effect. Adds a useful visual layer to what's in the lesson.", href: "https://www.youtube.com/watch?v=0w9oCD-sbEU", linkLabel: "Watch on YouTube" },
    ],
  },
  {
    id: "module-4",
    title: "Module 4: What This Stuff Is Doing To You",
    subtitle: "Not 'sugar is bad' — the specific cascade, in your body",
    duration: "",
    videoUrl: "https://youtu.be/hSxLGKJAFn0",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• Ultra-processed food is built on three substances: refined sugar, refined white flour (behaves identically to sugar), and refined industrial fat — then flavoring, color, texture agents, and 'with real fruit' packaging.\n• It makes you fat — specifically visceral fat around your organs, the metabolically destructive kind — because it delivers maximum calories with minimum satiety signal.\n• The insulin crash loop: refined carbs spike blood glucose, insulin overshoots, glucose drops below baseline, your brain calls an emergency. Run that loop several times a day for years and cells stop responding — insulin resistance.\n• Your hormones are downstream of insulin: chronic elevation lowers SHBG and disrupts estrogen and progesterone — worsened PMS, jawline acne, mood instability, stubborn lower-belly fat. The cortisol piece adds baseline anxiety with no clear source.\n• Glycation: excess glucose bonds to collagen and elastin — your skin literally caramelizing from the inside. No serum reaches that.\n• Your gut microbiome gets dismantled — and since a large part of your mood lives in your gut, that shows up as anxiety, brain fog, and emotional reactivity.\n• Most of it is reversible. Your body is constantly working to restore equilibrium — the direction changes the moment the input changes." },
      { type: "task", title: "Homework: Name What You've Accepted", content: "Write down three things you've been experiencing — physically, emotionally, or hormonally — that you've accepted as 'just how you are.' Skin you're not happy with. Afternoon energy crashes. PMS that derails you. Anxiety with no clear story. Brain fog you've normalized. Next to each one, write: this may not be permanent. This may be a physiological response to a specific input. This may change when the input changes. Not as an affirmation — as a hypothesis you're about to test." },
      { type: "link", title: "What Sugar Actually Does to the Body — Recommended Video", content: "A clear walkthrough of the metabolic cascade covered in this module — insulin, visceral fat, gut, hormones. Useful if you want a visual reinforcement of the mechanism.", href: "https://www.youtube.com/watch?v=xjEFo3a1AnI", linkLabel: "Watch on YouTube" },
      { type: "link", title: "How Sugar Affects Brain and Hormones — Recommended Video", content: "Andrew Huberman walks through the systems-level effects of sugar and processed food on brain chemistry and hormonal balance. Pairs especially well with the PMS / mood / brain-fog parts of this lesson.", href: "https://www.youtube.com/watch?v=n28W4AmvMDE", linkLabel: "Watch on YouTube" },
    ],
  },
  {
    id: "module-5",
    title: "Module 5: The Food Framework",
    subtitle: "The first part of the solution — replacement, not restriction",
    duration: "",
    videoUrl: "https://youtu.be/CUdOG9A-LH0",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• Everything so far was diagnosis. This is the first part of the solution — and it's not 'identify what you shouldn't eat and suffer through the gap.' It's a way of eating that makes the biology work differently.\n• Be honest about carbohydrates: they're the one macronutrient with no minimum dietary requirement. Not bad — optional. Most diets are built backwards, around carbs, with protein and fat as afterthoughts.\n• The foundation: protein. Not about muscles — it's the structural material of your body, the source of every neurotransmitter and hormone. Build every meal around a clear protein source.\n• The second pillar: fat. It's the body's preferred fuel for stable energy, doesn't spike insulin, and is required for brain function and hormones. Decades of low-fat fear were the legacy of the 1967 corruption — not current evidence.\n• Whole foods carry the full context of signals your body uses to regulate hunger. The simple test: does this look like something that existed before industrial processing?\n• The honest conversation about flexibility: the 80/20 rule is dangerous for real food addiction. For your neurological profile, 'a little' is not a stable state — the priming effect means one square becomes the bar. Zero requires one decision; one requires endless renegotiation. Zero is easier.\n• The real exception is rare and genuine — and the test is simple: did you choose it, or did the craving choose for you?" },
      { type: "info", title: "What a meal on this framework looks like", content: "A clear protein, a real fat, and something for volume and variety. Examples: eggs with avocado, greens, and a handful of nuts. Salmon with roasted broccoli and olive oil. Full-fat Greek yogurt with berries, walnuts, and cinnamon. Chicken thighs with vegetables cooked in butter. Lentil soup made with bone broth, topped with a poached egg.\n\nThis is not sad diet food — fat carries flavor, protein provides satiety. One thing worth knowing: when you first transition away from ultra-processed food, real food can taste flat for a week or two. That's the dopamine recalibration. Give it two weeks — the taste comes back, and it comes back better." },
      { type: "task", title: "Homework: Design Tomorrow's Meals", content: "Design tomorrow's meals right now — before you close this video. Not a week. Just tomorrow. Three meals, or two if that's how you eat. For each one: name the protein, name the fat, name what provides volume and variety. Specific ingredients, not categories — not 'protein and vegetables' but 'two eggs, half an avocado, a handful of arugula, olive oil.' Write it down, then go to sleep knowing tomorrow is already decided." },
    ],
  },
  {
    id: "intermission-2",
    title: "Intermission 2: Your Receipt",
    subtitle: "Optional — if you'd like personalized swap suggestions, send a receipt",
    duration: "",
    videoUrl: "",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Why This Matters", content: "• You've just finished the food framework. Before the next module, here's an optional pause where you can get personalized suggestions on top of what you've learned.\n• Next time you grocery shop, take a photo of the whole receipt — and if you want, send it to us on WhatsApp.\n• Why a receipt and not a food diary: a food diary is filtered. People forget, round down, write what they meant to eat. A receipt is the truth: what you actually bought, with prices, quantities, brands.\n• If you send it, we'll write back with two or three specific swaps you can make on your next shop — tailored to what's already in your basket. Not a meal plan, not 'eat clean.' Two or three changes you can do without thinking.\n• Completely optional. If you'd rather just move on with the framework you have, skip and mark this complete." },
      { type: "task", title: "Optional: Send Your Receipt for Tailored Suggestions", content: "Next time you grocery shop, snap a photo of the whole receipt. If you'd like personalized swap suggestions, send it to us on WhatsApp using the button below — we'll write back with two or three specific tweaks for your next shop. Or just save the photo for yourself and mark this intermission complete to move on." },
    ],
  },
  {
    id: "module-6",
    title: "Module 6: Environment & Operating System",
    subtitle: "Knowing what to eat is only half the battle",
    duration: "",
    videoUrl: "https://youtu.be/EqnIT1KCv2U",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• Your home is not neutral. If ultra-processed food is anywhere in it, it's already in your brain — your dopamine system tracks it the way a predator tracks prey, and waits for your prefrontal cortex to deplete.\n• 'Keep trigger foods in a high cupboard' assumes a casual relationship you don't have. The right model is the recovering alcoholic: remove it from the home entirely. Not restriction — environment design. One decision, made once.\n• The buying principle: don't buy ultra-processed food. Not when a craving hits, not when something catches your eye. The behavior starts at purchase, not consumption — remove the purchase and the consumption doesn't happen.\n• The city you can't control — it's a commercial environment engineered against you ('food noise'). The principle: never move through it in a vulnerable state. Don't leave home hungry or in a significantly negative emotional state. Go armored.\n• Your personal operating system: pre-decided if-then principles, so when a situation arises you don't have to decide — the decision was already made when your prefrontal cortex was fresh.\n• The allergy line: 'Thank you, I have an allergy' ends the conversation cleanly — no debate, no commentary.\n• The crab basket effect: when you change, people around you may push back — not from malice, but because your 'no' is a mirror. The pressure isn't about you. Hold your position." },
      { type: "info", title: "What to actually remove", content: "Now that you've finished Module 6 and you're ready to clear the kitchen, the rule from the course is simple:\n\nIf it's ultra-processed, it does not live in your home.\n\nNot hidden. Not in a high cupboard. Not 'for guests.' Not 'for emergencies.' Out of the house. Give it away, donate it, throw it away — whatever's most practical. One decision, made once, structurally protects you from a thousand 9pm decisions.\n\nSee the Pantry Restock List in the Resource Library for what to fill the space with afterwards." },
      { type: "task", title: "Homework: Clear The Kitchen + Write Your OS", content: "Two parts. First: go through your kitchen today — remove every ultra-processed product, out of the house. Give it away, throw it away, whatever's practical. Today, not tomorrow. Second: write your personal operating system. Think through the four or five situations that most reliably challenge you, and for each one write the if-then principle that governs your behavior. Keep it as a short list somewhere you'll see it." },
    ],
  },
  {
    id: "module-7",
    title: "Module 7: When The Craving Hits",
    subtitle: "Five tools for the moments that still come",
    duration: "",
    videoUrl: "https://youtu.be/2ULSUD8KyOs",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• Even with everything upstream in place, there will be moments — a depleted day, poor sleep, PMS, an unanticipated situation, or just an evening when the old conditioning fires.\n• A craving is a signal, not a command. Before responding, ask three questions: what do I actually want right now? what would genuinely make me feel better? what would actually relieve this? Then listen to the first honest answer — most of the time it isn't about food.\n• Tool 1 — The sparkling water protocol. Strong carbonation, no sugar. A pre-decided action that interrupts the craving physically and gives your hands and mouth something to do.\n• Tool 2 — Identify and name the source. Bored? Exhausted? Lonely? Anxious? Naming it breaks the automatic quality of the conditioned response and inserts a moment of choice.\n• Tool 3 — The notes dump. When there's emotional charge underneath, write it out — unedited, no grammar. The charge gets somewhere to go other than food.\n• Tool 4 — Change the physical environment. If the craving is boredom- or place-driven, leave. A café, a walk — even fifteen minutes changes the brain state.\n• Tool 5 — The if-then protocol. For your most common triggers, pre-decide the exact sequence. The decision already made is the decision that holds.\n• These tools matter most in early recovery. As the system recalibrates, craving frequency drops, then intensity — and eventually most of them become unnecessary." },
      { type: "task", title: "Homework: Your Personal Craving Protocol", content: "Write your personal craving protocol. Three parts: (1) your top three craving trigger situations — the specific times, places, or emotional states that most reliably produce a craving; (2) what is usually underneath each one — what real need is being activated; (3) your specific if-then response for each. Write it tonight and pin it somewhere physical — the fridge, the bathroom mirror, your phone wallpaper." },
    ],
  },
  {
    id: "module-8",
    title: "Module 8: Values & The Long Game",
    subtitle: "What makes recovery permanent",
    duration: "",
    videoUrl: "https://youtu.be/11vHVDzPjGk",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "• The tools hold until life gets hard. What determines whether you stay or go back isn't whether you have good tools — it's what you actually value, at the level your choices reveal when nobody's watching.\n• You get what you prioritize. Not what you say you value — what your repeated choices reveal. Recovery means actually reordering that hierarchy, not performing new values while the old ones run underneath.\n• You can't genuinely value something you don't understand — which is why this course started with biology and mechanisms, not motivation. The picture is now in your head; the values can follow.\n• The identity question: the destination isn't 'I'm someone who controls herself around sugar' — that still centers the sugar. It's 'this is just not part of my life anymore.' Built through accumulated evidence: every time the protocol runs instead of the binge, you build one data point in the brain's model of who you are.\n• You have to build something to replace it. Removing sugar leaves a dopamine gap. The answer isn't new dopamine hits — it's restoring sensitivity to slower, natural sources: movement, creative work, learning something difficult, real connection.\n• Be careful with other dopamine drains — social media, compulsive shopping, alcohol, excessive caffeine, binge-watching. They run on the same architecture and quietly eat the resource that should build your actual life.\n• What you're protecting: your hormonal health, your skin, your brain, your gut, your energy — and access to your own life. That version of you isn't built from scratch. She's underneath, waiting for the addiction to lift enough to surface." },
      { type: "task", title: "Homework: Two Questions", content: "Two questions. Write the answers on paper. First: what do you actually value — at the level where your choices will reflect it when things are hard? Not what you think you should value. What genuinely sits above the momentary relief of the binge? Second: what are three things you're genuinely curious about, or want to do, that the addiction has been consuming the energy for? Not aspirations — specific things: a skill, a project, a practice, a relationship you want to show up differently in." },
    ],
  },
  {
    id: "module-9",
    title: "Module 9: What Comes Next",
    subtitle: "What you built — and the one thing to carry forward",
    duration: "",
    videoUrl: "https://youtu.be/8UCmgqFY1z8",
    comingSoon: false,
    requiresVideo: true,
    resources: [
      { type: "summary", title: "Full Course Summary", content: "• You made it through the course — and if you did the homework, you didn't just watch, you engaged. That's the difference between information and the start of real change.\n• What you built: a mechanistic understanding of what happens in your brain around food. Who built the environment, and why. What chronic refined food does to your body — and that most of it is reversible. A food framework that works with your biology. An environment and an operating system. Real craving tools. And the beginning of a values reorientation.\n• What comes next, honestly: knowing all this doesn't mean you won't have hard moments. You will. Recovery is not a straight line. What matters is the direction across time — and the direction changes when the inputs change consistently.\n• The one thing to take from this: you were never fighting yourself. You were fighting a system — biological, neurological, industrial, social — that nobody had clearly explained. Now that you can see it, you can stop fighting yourself and start designing around it.\n• The version of you that was 'failing' wasn't weak. She was confused — solving a biological and environmental problem with shame and willpower, the wrong tools for the actual problem." },
      { type: "task", title: "Homework: One Commitment", content: "One commitment. Not ten, not five. One. Pick the single most important thing from this course — the one that, done consistently for the next 30 days, will move everything else forward. For some that's clearing the house and keeping it clean. For others it's a real protein-and-fat breakfast every morning. For others it's the craving log from Module 2. One thing — specific enough that you know each day whether you did it, small enough that you can't fail it on a normal day. Write it down right now." },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   PROGRESS HELPERS
   ═══════════════════════════════════════════════════════════════ */
type ProgressMap = Record<string, LessonProgress>;

const defaultProgress = (): LessonProgress => ({
  videoWatched: false,
  completed: false,
});

const isLessonComplete = (lesson: LessonDef, prog: LessonProgress): boolean => {
  if (lesson.requiresVideo && !prog.videoWatched) return false;
  return true;
};

const isLessonAccessible = (index: number, lessons: LessonDef[], progress: ProgressMap): boolean => {
  const lesson = lessons[index];
  if (lesson.comingSoon) return false;
  if (index === 0) return true;
  for (let i = index - 1; i >= 0; i--) {
    if (!lessons[i].comingSoon) {
      const prev = progress[lessons[i].id] ?? defaultProgress();
      return prev.completed;
    }
  }
  return true;
};

const loadProgress = (): ProgressMap => {
  try {
    const d = localStorage.getItem("fm-progress");
    return d ? JSON.parse(d) : {};
  } catch { return {}; }
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
  previewMode = false,
}: {
  lessons: LessonDef[];
  progress: ProgressMap;
  activeId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
  previewMode?: boolean;
}) => {
  const completedCount = lessons.filter((l) => (progress[l.id] ?? defaultProgress()).completed).length;
  const availableCount = lessons.filter((l) => !l.comingSoon).length;
  const pct = Math.round((completedCount / availableCount) * 100);

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 overflow-x-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center shadow-sm shadow-amber-200/60">
              <Flame className="text-white w-4 h-4" />
            </div>
            <span className="font-black text-sm tracking-tight text-gray-900">
              The Unhooked Method<sup className="text-[8px] font-bold text-amber-700 ml-0.5 align-super">™</sup>
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-2 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>{completedCount}/{availableCount} completed</span>
          <span className="text-amber-600">{pct}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Lessons */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 overscroll-contain">
        {lessons.map((lesson, i) => {
          const prog = progress[lesson.id] ?? defaultProgress();
          const isActive = lesson.id === activeId;
          const accessibleNormal = isLessonAccessible(i, lessons, progress);
          const accessible = previewMode
            ? PREVIEW_OPEN_LESSON_IDS.has(lesson.id)
            : accessibleNormal;
          const locked = lesson.comingSoon || !accessible;

          let StatusIcon = Circle;
          let iconColor = "text-gray-300";
          if (locked) { StatusIcon = Lock; iconColor = "text-gray-200"; }
          else if (prog.completed) { StatusIcon = CheckCircle2; iconColor = "text-amber-500"; }
          else if (isActive) { iconColor = "text-amber-600"; }

          return (
            <div key={lesson.id} className="relative group">
              <button
                onClick={() => accessible && onSelect(lesson.id)}
                disabled={!accessible}
                className={`w-full text-left px-5 py-3 flex items-start gap-3 transition-colors ${
                  isActive ? "bg-amber-50 border-r-2 border-amber-600"
                  : locked ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <StatusIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-bold truncate ${isActive ? "text-amber-700" : locked ? "text-gray-400" : "text-gray-800"}`}>
                    {lesson.title}
                  </div>
                  {lesson.duration && (
                    <span className="text-[10px] text-gray-400 font-medium flex items-center gap-0.5 mt-0.5">
                      <Clock className="w-3 h-3" /> {lesson.duration}
                    </span>
                  )}
                </div>
              </button>
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
                        ? "This lesson is being prepared. We'll let you know when it unlocks."
                        : "Watch the previous module to unlock this one."
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Library section — Resource Library + Watch List */}
        <div className="px-5 pt-4 pb-2 mt-3 border-t border-gray-100">
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.22em] mb-2 px-1">Library</div>
        </div>
        <button
          onClick={() => onSelect("resources")}
          className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-colors ${
            activeId === "resources" || activeId.startsWith("resource:")
              ? "bg-amber-50 border-r-2 border-amber-600"
              : "hover:bg-gray-50 cursor-pointer"
          }`}
        >
          <BookOpen className={`w-5 h-5 flex-shrink-0 ${
            activeId === "resources" || activeId.startsWith("resource:") ? "text-amber-600" : "text-gray-400"
          }`} />
          <div className="min-w-0 flex-1">
            <div className={`text-sm font-bold ${
              activeId === "resources" || activeId.startsWith("resource:") ? "text-amber-700" : "text-gray-800"
            }`}>
              Resource Library
            </div>
            <div className="text-[10px] text-gray-400 font-medium mt-0.5">
              Cheat sheets · Templates · PDFs
            </div>
          </div>
        </button>
        <button
          onClick={() => onSelect("watch-list")}
          className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-colors ${
            activeId === "watch-list"
              ? "bg-amber-50 border-r-2 border-amber-600"
              : "hover:bg-gray-50 cursor-pointer"
          }`}
        >
          <PlayCircle className={`w-5 h-5 flex-shrink-0 ${
            activeId === "watch-list" ? "text-amber-600" : "text-gray-400"
          }`} />
          <div className="min-w-0 flex-1">
            <div className={`text-sm font-bold ${
              activeId === "watch-list" ? "text-amber-700" : "text-gray-800"
            }`}>
              Watch List
            </div>
            <div className="text-[10px] text-gray-400 font-medium mt-0.5">
              Curated videos · growing
            </div>
          </div>
        </button>
      </div>

      {/* Footer: WhatsApp contact */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50/40 transition-colors group"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm shadow-amber-200/60">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Need help? Message us</div>
            <div className="text-xs font-bold text-gray-900 truncate">{WHATSAPP_DISPLAY}</div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors flex-shrink-0" />
        </a>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   WELCOME SCREEN
   ═══════════════════════════════════════════════════════════════ */
const WelcomeScreen = ({
  onStart,
  onReplayTour,
  previewMode = false,
}: {
  onStart: () => void;
  onReplayTour: () => void;
  previewMode?: boolean;
}) => (
  <div className="max-w-2xl mx-auto py-10 sm:py-14 px-4 sm:px-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl shadow-amber-200/50">
        <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </div>
      <h1 className="text-[1.7rem] sm:text-4xl font-black text-gray-900 tracking-tight mb-3 sm:mb-4 leading-tight">
        {previewMode ? <>You're previewing<br className="sm:hidden" /> The Unhooked Method<sup className="text-[14px] font-bold text-amber-700 ml-0.5 align-super">™</sup></> : <>Welcome to<br className="sm:hidden" /> The Unhooked Method<sup className="text-[14px] font-bold text-amber-700 ml-0.5 align-super">™</sup></>}
      </h1>
      <p className="text-[15px] sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
        {previewMode
          ? "This is the actual platform — same layout, same library, same Watch List. The 9 video lessons are locked until you join. You can open Module 0 below as a sample and browse the full Resource Library at the bottom of the sidebar."
          : "I'm Kristina. This isn't a diet or a meal plan — it's a guided 9-module journey out of sugar and food addiction, with tasks and personal feedback at the key moments."}
      </p>

      {/* How this works */}
      <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 mb-5 sm:mb-6 text-left border border-gray-100">
        <h3 className="font-black text-gray-900 mb-4 sm:mb-5 uppercase text-xs tracking-[0.2em]">How this works</h3>
        <ul className="space-y-3 sm:space-y-3.5">
          {[
            "Watch each module video — about 15–25 minutes each.",
            "Mark a module as watched to unlock the next one.",
            "After every module, complete the homework task — designed to move you toward the solution.",
            "At two key points, send your photos on WhatsApp — every one gets reviewed personally.",
            "If you need help or have questions, you can write any time during the course.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span className="text-[13.5px] sm:text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* WhatsApp callout — large, prominent */}
      <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white rounded-3xl p-5 sm:p-7 mb-5 sm:mb-6 text-left shadow-lg shadow-amber-300/40">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-[15px] sm:text-lg mb-1 sm:mb-1.5 leading-snug">If you need help or have questions, you can write any time.</h3>
            <p className="text-amber-50 text-[13px] sm:text-sm leading-relaxed mb-4">
              Got a question, a realization, or something you want to share — message us on WhatsApp. The team reads every chat.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white text-amber-800 hover:bg-amber-50 rounded-full text-[13px] sm:text-sm font-bold transition-colors break-all"
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{WHATSAPP_DISPLAY}</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Order note */}
      <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 mb-8 sm:mb-10 border border-amber-100 text-left">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[13.5px] sm:text-sm font-bold text-amber-900 mb-1">Start with Module 0 and move in order</p>
            <p className="text-[12px] sm:text-xs text-amber-800 leading-relaxed">Each module builds on the one before it.</p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-br from-amber-600 to-amber-800 text-white font-black text-[15px] sm:text-lg rounded-2xl shadow-xl shadow-amber-300/40 hover:from-amber-700 hover:to-amber-900 hover:-translate-y-1 transition-all w-full sm:w-auto justify-center"
      >
        {previewMode ? <>Open Module 0 (sample)</> : <>Start Module 0</>} <ArrowRight className="w-5 h-5" />
      </button>

      {previewMode ? (
        <div className="mt-6">
          <a
            href={PAYPAL_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-900 transition-colors underline-offset-4 underline"
          >
            Unlock all 9 modules — $29
          </a>
        </div>
      ) : (
        <div className="mt-5">
          <button
            onClick={onReplayTour}
            className="text-xs sm:text-sm font-semibold text-gray-500 hover:text-amber-700 transition-colors underline-offset-4 hover:underline"
          >
            Replay the platform tour
          </button>
        </div>
      )}
    </motion.div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   PREVIEW BANNER — pinned strip at the very top in /preview mode
   ═══════════════════════════════════════════════════════════════ */
const PreviewBanner = () => (
  <div className="fixed top-0 inset-x-0 z-[60] h-10 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[11.5px] sm:text-xs font-bold flex items-center justify-center gap-2 sm:gap-3 px-4 shadow-md shadow-amber-700/30">
    <span className="hidden sm:inline uppercase tracking-[0.22em] text-amber-100">Preview Mode</span>
    <span className="sm:hidden uppercase tracking-[0.18em] text-amber-100">Preview</span>
    <span className="opacity-50 hidden sm:inline">·</span>
    <span className="hidden md:inline">Unlock 9 video modules + 19 PDFs + an ever-growing curated video list — $29, yours forever.</span>
    <span className="hidden sm:inline md:hidden">9 modules + 19 PDFs + growing video list — $29 forever.</span>
    <span className="sm:hidden">9 modules · 19 PDFs · $29 forever</span>
    <a
      href={PAYPAL_CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-1 sm:ml-2 inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-white text-amber-800 hover:bg-amber-50 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm transition-colors"
    >
      Unlock
      <ArrowRight className="w-3 h-3" />
    </a>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   PREVIEW LOCKED RESOURCE — gated resource detail in /preview mode
   ═══════════════════════════════════════════════════════════════ */
const PreviewLockedResource = ({ slug, onBack }: { slug: string; onBack: () => void }) => {
  const resource = RESOURCES.find((r) => r.slug === slug);
  if (!resource) return null;
  const Icon = resource.icon;
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Resource Library</span>
      </button>
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-300/40 mx-auto mb-5">
          <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <p className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-[0.3em] mb-2">
          {resource.eyebrow} · Locked in preview
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight tracking-tight mb-3">
          {resource.title}
        </h1>
        <p className="text-gray-600 text-[14.5px] sm:text-base leading-relaxed mb-7 max-w-md mx-auto">
          {resource.description}
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full mb-7">
          <Icon className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">For {resource.module}</span>
        </div>
        <a
          href={PAYPAL_CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full max-w-sm mx-auto py-4 bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-black text-[14px] sm:text-base rounded-2xl shadow-lg shadow-amber-300/40 transition-all uppercase tracking-[0.08em]"
        >
          Unlock everything — $29
          <ArrowRight className="w-5 h-5" />
        </a>
        <p className="mt-3 text-center text-[12px] sm:text-xs text-gray-500">
          9 video modules · 19 PDFs · growing video list · WhatsApp
        </p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PREVIEW LOCKED LESSON — shown when a non-preview lesson is opened
   in /preview mode. Same header layout as a real lesson so the
   user can tell the platform structure, but content is gated.
   ═══════════════════════════════════════════════════════════════ */
const PreviewLockedLesson = ({ lesson }: { lesson: LessonDef }) => {
  const isIntermission = lesson.id.startsWith("intermission");
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          <Lock className="w-3.5 h-3.5" />
          <span>{isIntermission ? "Intermission · Locked in preview" : "Video Lesson · Locked in preview"}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-1.5 leading-tight">
          {lesson.title}
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">{lesson.subtitle}</p>
      </div>
      <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative shadow-lg mb-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(245,158,11,0.18),transparent)]" />
        <div className="relative flex flex-col items-center text-center px-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
            <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <p className="text-white text-sm sm:text-base font-bold mb-1.5">This lesson is locked in preview</p>
          <p className="text-gray-400 text-[12.5px] sm:text-sm max-w-sm leading-relaxed">
            One-time $29 unlocks all 9 video modules, 19 downloadable PDFs, an ever-growing curated video list, and WhatsApp support — yours forever.
          </p>
        </div>
      </div>
      <a
        href={PAYPAL_CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 w-full py-4 sm:py-5 bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-black text-[14px] sm:text-base rounded-2xl shadow-lg shadow-amber-300/40 transition-all uppercase tracking-[0.08em]"
      >
        Unlock the full course — $29
        <ArrowRight className="w-5 h-5" />
      </a>
      <p className="mt-3 text-center text-[12px] sm:text-xs text-gray-500">
        Instant access · 14-day refund · One-time payment
      </p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   CONTENT BLOCK — elegant, always-visible key points card
   ═══════════════════════════════════════════════════════════════ */
const ContentBlock = ({ resource }: { resource: LessonResource }) => {
  const lines = resource.content.split("\n").map((l) => l.trimEnd()).filter((l) => l !== "");
  const isSummary = resource.type === "summary";
  const Icon = isSummary ? FileText : BookOpen;
  const eyebrow = isSummary ? "Key Takeaways" : "Deep Dive";

  return (
    <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <header className="px-6 sm:px-8 pt-7 pb-5 border-b border-gray-50">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 rounded-full mb-3">
          <Icon className="w-3 h-3 text-amber-700" />
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.22em]">
            {eyebrow}
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug tracking-tight">
          {resource.title}
        </h3>
      </header>

      <div className="px-6 sm:px-8 py-7 space-y-3.5">
        {lines.map((line, i) => {
          const trimmed = line.trim();

          // Bulleted line
          if (trimmed.startsWith("•")) {
            return (
              <div key={i} className="flex gap-3.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-[10px] flex-shrink-0" />
                <p className="text-gray-700 text-[15px] sm:text-[15.5px] leading-[1.65] flex-1">
                  {trimmed.replace(/^•\s*/, "")}
                </p>
              </div>
            );
          }

          // Numbered line like "1. ..."
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={i} className="flex gap-3.5 items-start">
                <span className="text-amber-700 font-black text-sm tabular-nums w-5 flex-shrink-0 mt-0.5">
                  {numMatch[1]}.
                </span>
                <p className="text-gray-700 text-[15px] sm:text-[15.5px] leading-[1.65] flex-1">
                  {numMatch[2]}
                </p>
              </div>
            );
          }

          // Regular paragraph
          return (
            <p key={i} className="text-gray-700 text-[15px] sm:text-[15.5px] leading-[1.65]">
              {trimmed}
            </p>
          );
        })}
      </div>
    </article>
  );
};

/* ═══════════════════════════════════════════════════════════════
   TASK DISPLAY — read-only, no submission
   ═══════════════════════════════════════════════════════════════ */
const TaskDisplay = ({ resource, isIntermission }: { resource: LessonResource; isIntermission: boolean }) => (
  <article className="bg-gradient-to-br from-amber-50 to-amber-50/40 rounded-2xl border border-amber-100 overflow-hidden">
    <header className="px-6 sm:px-8 pt-7 pb-5 border-b border-amber-100/70">
      <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-100 rounded-full mb-3">
        <PenLine className="w-3 h-3 text-amber-700" />
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.22em]">
          Homework
        </span>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug tracking-tight">
        {resource.title}
      </h3>
    </header>

    <div className="px-6 sm:px-8 py-7">
      <p className="text-gray-700 text-[15px] sm:text-[15.5px] leading-[1.65] whitespace-pre-line">
        {resource.content}
      </p>

      {isIntermission ? (
        <div className="mt-6 sm:mt-7">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex sm:inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold text-sm rounded-full hover:from-amber-700 hover:to-amber-900 transition-all shadow-md shadow-amber-300/40"
          >
            <MessageCircle className="w-4 h-4 flex-shrink-0" />
            <span>Send on WhatsApp</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </a>
          <p className="mt-3 text-[11px] sm:text-xs text-amber-800/70 text-center sm:text-left">
            Opens WhatsApp · {WHATSAPP_DISPLAY}
          </p>
        </div>
      ) : null}
    </div>
  </article>
);

/* ═══════════════════════════════════════════════════════════════
   LINK CARD — external "go deeper" reference
   ═══════════════════════════════════════════════════════════════ */
const LinkCard = ({ resource }: { resource: LessonResource }) => (
  <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
    <div className="px-6 sm:px-8 py-6 sm:py-7">
      <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 rounded-full mb-3">
        <Sparkles className="w-3 h-3 text-amber-700" />
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.22em]">
          Go Deeper · Optional
        </span>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug tracking-tight mb-2.5">
        {resource.title}
      </h3>
      <p className="text-gray-700 text-[14.5px] sm:text-[15.5px] leading-[1.65] mb-5 whitespace-pre-line">
        {resource.content}
      </p>
      {resource.href && (
        <a
          href={resource.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 rounded-full shadow-md shadow-amber-300/40 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          {resource.linkLabel ?? "Watch on YouTube"}
          <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  </article>
);

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
  onOpenResource,
}: {
  lesson: LessonDef;
  prog: LessonProgress;
  onUpdate: (p: Partial<LessonProgress>) => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  nextAccessible: boolean;
  onOpenResource: (slug: string) => void;
}) => {
  const allDone = isLessonComplete(lesson, prog);
  const isIntermission = lesson.id.startsWith("intermission");

  // Auto-complete lesson when all requirements are met
  useEffect(() => {
    if (allDone && !prog.completed) {
      onUpdate({ completed: true });
    }
  }, [allDone, prog.completed]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <motion.div key={lesson.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            {lesson.duration && (<><Clock className="w-3.5 h-3.5" /><span>{lesson.duration}</span><span>·</span></>)}
            <span>{isIntermission ? "Intermission" : "Video Lesson"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-1.5 leading-tight">
            {lesson.title}
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">{lesson.subtitle}</p>
        </div>

        {/* Video Player — hidden entirely when the lesson has no video URL (e.g. intermissions) */}
        {lesson.requiresVideo && lesson.videoUrl && (
          <div className="mb-8">
            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative shadow-lg mb-3">
              {isSelfHostedVideo(lesson.videoUrl) ? (
                <video
                  src={lesson.videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full bg-black"
                >
                  Your browser doesn't support video playback.
                </video>
              ) : (
                <iframe
                  src={toYouTubeEmbed(lesson.videoUrl)}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        )}

        {/* Mark-complete button — always available (with or without a video) */}
        {lesson.requiresVideo && (
          <div className={lesson.videoUrl ? "" : "mb-8"}>
            {!prog.videoWatched ? (
              <button
                data-mark-watched
                onClick={() => onUpdate({ videoWatched: true })}
                className={`w-full py-4 sm:py-5 bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-black text-[14px] sm:text-base rounded-2xl transition-all shadow-lg shadow-amber-300/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 uppercase tracking-[0.08em] ${lesson.videoUrl ? "mb-8" : ""}`}
              >
                <Eye className="w-5 h-5" />
                {isIntermission ? "I've done this — mark complete" : "I've watched this — mark complete"}
              </button>
            ) : (
              <div className={`space-y-3 ${lesson.videoUrl ? "mb-8" : ""}`}>
                <div className="flex items-center justify-center gap-2.5 text-amber-800 font-bold py-3.5 px-4 bg-amber-50 border border-amber-200 rounded-2xl text-[14px] sm:text-[15px]">
                  <CheckCircle2 className="w-5 h-5 text-amber-700 flex-shrink-0" />
                  {isIntermission ? "Marked complete — next module unlocked" : "Marked as watched — next module unlocked"}
                </div>
                {hasNext && nextAccessible && (
                  <button
                    onClick={onNext}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-black text-[13px] sm:text-sm rounded-2xl shadow-md shadow-amber-300/30 hover:-translate-y-0.5 transition-all uppercase tracking-[0.08em]"
                  >
                    Skip to Next Lesson
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Resources */}
        {lesson.resources.length > 0 && (
          <div className="space-y-4 mb-8">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.22em] pl-1">
              Lesson Materials
            </h3>
            {lesson.resources.map((r, i) => {
              if (r.type === "info" || r.type === "summary") return <ContentBlock key={i} resource={r} />;
              if (r.type === "task") return <TaskDisplay key={i} resource={r} isIntermission={isIntermission} />;
              if (r.type === "link") return <LinkCard key={i} resource={r} />;
              return null;
            })}
          </div>
        )}

        {/* Related Resources — only renders if any are bound to this lesson */}
        <RelatedResources lessonId={lesson.id} onOpen={onOpenResource} />

        {/* Navigation — stacks on mobile, row on desktop */}
        <div className="border-t border-gray-100 pt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          {hasPrev && (
            <button
              onClick={onPrev}
              className="flex items-center justify-center sm:justify-start gap-2 px-5 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
          )}
          <div className="hidden sm:block flex-1" />
          {hasNext && (
            nextAccessible ? (
              <button
                onClick={onNext}
                className="flex items-center justify-center gap-2 px-6 sm:px-7 py-4 bg-gradient-to-br from-amber-600 to-amber-800 text-white font-black text-[13px] sm:text-sm rounded-xl shadow-lg shadow-amber-300/40 hover:from-amber-700 hover:to-amber-900 transition-all uppercase tracking-wider"
              >
                Next Lesson <ArrowRight className="w-5 h-5" />
              </button>
            ) : LESSONS[LESSONS.findIndex((l) => l.id === lesson.id) + 1]?.comingSoon ? (
              <div className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 bg-gray-100 text-gray-500 font-bold text-[12.5px] sm:text-sm rounded-xl">
                <Lock className="w-4 h-4 flex-shrink-0" />
                <span className="leading-tight">Next lesson coming soon</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  const btn = document.querySelector<HTMLElement>('[data-mark-watched]');
                  if (btn) {
                    btn.scrollIntoView({ behavior: "smooth", block: "center" });
                    btn.animate(
                      [
                        { boxShadow: "0 0 0 0 rgba(245, 158, 11, 0.6)" },
                        { boxShadow: "0 0 0 14px rgba(245, 158, 11, 0)" },
                      ],
                      { duration: 900, iterations: 2 }
                    );
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-900 font-bold text-[13px] sm:text-sm rounded-xl transition-all group"
              >
                <ArrowUp className="w-4 h-4 flex-shrink-0 group-hover:-translate-y-0.5 transition-transform" />
                Mark as watched to unlock
              </button>
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
const CelebrationPopup = ({ onClose }: { onClose: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center z-10">
      <motion.div initial={{ rotate: -10, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", delay: 0.15 }}
        className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-300/40">
        <Sparkles className="w-10 h-10 text-white" />
      </motion.div>
      <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Lesson Complete</h3>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">Nice work. The next module is unlocked.</p>
      <button onClick={onClose} className="w-full py-3.5 bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold rounded-xl hover:from-amber-700 hover:to-amber-900 transition-all">
        Continue
      </button>
    </motion.div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN LEARN PAGE
   ═══════════════════════════════════════════════════════════════ */
/* ─────────── URL <-> activeId helpers ───────────
   URL patterns:
     /learn                              → welcome
     /learn?lesson=module-3              → that lesson
     /learn?view=resources               → resource library
     /learn?resource=if-then-protocols   → that resource detail
   Lets browser refresh / back-forward / link-sharing land in place. */
const idFromParams = (sp: URLSearchParams): string => {
  const lesson = sp.get("lesson");
  if (lesson) return lesson;
  const view = sp.get("view");
  if (view === "resources") return "resources";
  if (view === "watch-list") return "watch-list";
  const resource = sp.get("resource");
  if (resource) return `resource:${resource}`;
  return LESSONS[0].id;
};

const paramsFromId = (id: string): URLSearchParams => {
  const p = new URLSearchParams();
  if (id === LESSONS[0].id) return p;
  if (id === "resources") { p.set("view", "resources"); return p; }
  if (id === "watch-list") { p.set("view", "watch-list"); return p; }
  if (id.startsWith("resource:")) { p.set("resource", id.slice("resource:".length)); return p; }
  p.set("lesson", id);
  return p;
};

/* ─────────── PREVIEW MODE ─────────── */
// In /preview mode the only thing fully accessible is the Welcome
// screen (the platform's entry view). Every numbered lesson and every
// resource shows its title but stays locked. The Watch List shows the
// video count but not the actual embeds. This keeps the preview as a
// genuine UI-quality showcase without giving the content away.
const PREVIEW_OPEN_LESSON_IDS = new Set(["welcome"]);
const PAYPAL_CHECKOUT_URL = "https://www.paypal.com/ncp/payment/DQDESNZ9DVQ7G";

export default function Learn({ previewMode = false }: { previewMode?: boolean } = {}) {
  const [progress, setProgress] = useState<ProgressMap>(loadProgress);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeId, setActiveId] = useState(() => idFromParams(searchParams));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  // Remembers where the user came from when they opened a resource —
  // so the Back button returns them to that lesson (not always the library)
  const [resourceReturnTo, setResourceReturnTo] = useState<string>("resources");

  // URL → state (browser back/forward)
  useEffect(() => {
    const next = idFromParams(searchParams);
    if (next !== activeId) setActiveId(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Lock body scroll when the mobile sidebar is open so swipes inside
  // the drawer don't scroll the page underneath or trigger the browser
  // forward/back swipe gesture.
  useEffect(() => {
    if (!sidebarOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehaviorX;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehaviorX = "contain";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehaviorX = prevOverscroll;
    };
  }, [sidebarOpen]);

  // Persist progress to localStorage
  useEffect(() => {
    localStorage.setItem("fm-progress", JSON.stringify(progress));
  }, [progress]);

  // Auto-open the product tour on the very first visit
  useEffect(() => {
    if (!isTourComplete()) {
      // Slight delay so the page mounts before the modal pops
      const id = setTimeout(() => setTourOpen(true), 400);
      return () => clearTimeout(id);
    }
  }, []);

  const isResourcesIndex = activeId === "resources" || activeId === "watch-list";
  const isResourceDetail = activeId.startsWith("resource:");
  const initialLibraryTab: "resources" | "watch-list" = activeId === "watch-list" ? "watch-list" : "resources";
  const resourceSlug = isResourceDetail ? activeId.slice("resource:".length) : "";
  const activeLesson = LESSONS.find((l) => l.id === activeId);
  const activeIndex = activeLesson ? LESSONS.findIndex((l) => l.id === activeId) : -1;
  const activeProg = progress[activeId] ?? defaultProgress();

  const headerTitle =
    activeId === "watch-list"
      ? "Watch List"
      : isResourcesIndex
        ? "Resource Library"
        : isResourceDetail
          ? RESOURCES.find((r) => r.slug === resourceSlug)?.title ?? "Resource"
          : activeLesson?.title ?? "";

  const updateProgress = (lessonId: string, updates: Partial<LessonProgress>) => {
    setProgress((prev) => {
      const current = prev[lessonId] ?? defaultProgress();
      const updated = { ...current, ...updates };

      // Show celebration when lesson first completed
      if (updates.completed && !current.completed) {
        setCelebration(true);
      }

      return { ...prev, [lessonId]: updated };
    });
  };

  const goTo = (id: string) => {
    setActiveId(id);
    setSearchParams(paramsFromId(id));
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };
  const goNext = () => { if (activeIndex < LESSONS.length - 1) goTo(LESSONS[activeIndex + 1].id); };
  const goPrev = () => { if (activeIndex > 0) goTo(LESSONS[activeIndex - 1].id); };

  const startCourse = () => {
    updateProgress("welcome", { completed: true });
    goTo("module-0");
  };

  const nextIndex = activeIndex + 1;
  const nextAccessible = nextIndex < LESSONS.length && isLessonAccessible(nextIndex, LESSONS, progress);

  const activeLessonLockedByPreview =
    previewMode &&
    activeLesson !== undefined &&
    !PREVIEW_OPEN_LESSON_IDS.has(activeId);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Preview banner — pinned across the top, full width */}
      {previewMode && <PreviewBanner />}

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block w-72 flex-shrink-0 h-screen sticky shadow-sm ${previewMode ? "top-10" : "top-0"}`}>
        <Sidebar lessons={LESSONS} progress={progress} activeId={activeId} onSelect={goTo} onClose={() => {}} previewMode={previewMode} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              style={{ touchAction: "none" }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-72 max-w-[85vw] z-50 lg:hidden shadow-2xl overflow-hidden"
              style={{ touchAction: "pan-y", overscrollBehavior: "contain" }}
            >
              <Sidebar lessons={LESSONS} progress={progress} activeId={activeId} onSelect={goTo} onClose={() => setSidebarOpen(false)} previewMode={previewMode} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className={`sticky z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-4 ${previewMode ? "top-10" : "top-0"}`}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-gray-900 truncate">{headerTitle}</h2>
          </div>
        </div>

        {/* Content */}
        {activeId === "welcome" ? (
          <WelcomeScreen
            onStart={startCourse}
            onReplayTour={() => { resetTour(); setTourOpen(true); }}
            previewMode={previewMode}
          />
        ) : isResourcesIndex ? (
          <ResourceLibrary
            previewMode={previewMode}
            initialTab={initialLibraryTab}
            onOpen={(slug) => {
              setResourceReturnTo("resources");
              goTo(`resource:${slug}`);
            }}
          />
        ) : isResourceDetail ? (
          previewMode ? (
            <PreviewLockedResource slug={resourceSlug} onBack={() => goTo("resources")} />
          ) : (
            <ResourceDetail
              slug={resourceSlug}
              onBack={() => goTo(resourceReturnTo)}
              backLabel={resourceReturnTo === "resources" ? "Back to Resource Library" : "Back to Lesson"}
            />
          )
        ) : activeLessonLockedByPreview && activeLesson ? (
          <PreviewLockedLesson lesson={activeLesson} />
        ) : activeLesson ? (
          <LessonView
            lesson={activeLesson}
            prog={activeProg}
            onUpdate={(updates) => updateProgress(activeId, updates)}
            onNext={goNext}
            onPrev={goPrev}
            hasNext={activeIndex < LESSONS.length - 1}
            hasPrev={activeIndex > 0}
            nextAccessible={nextAccessible}
            onOpenResource={(slug) => {
              setResourceReturnTo(activeId);
              goTo(`resource:${slug}`);
            }}
          />
        ) : null}
      </div>

      {/* Celebration */}
      <AnimatePresence>
        {celebration && (
          <CelebrationPopup onClose={() => setCelebration(false)} />
        )}
      </AnimatePresence>

      {/* Product Tour — auto-opens on first visit, also reachable via the
          'Replay the platform tour' link on the Welcome screen */}
      <ProductTour open={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  );
}
