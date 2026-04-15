import { motion, AnimatePresence } from "motion/react";
import {
  Play,
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
   COURSE DATA
   ═══════════════════════════════════════════════════════════════ */
const LESSONS: LessonDef[] = [
  {
    id: "welcome",
    title: "Welcome",
    subtitle: "Your transformation starts here",
    duration: "",
    comingSoon: false,
    requiresVideo: false,
    requiresLink: false,
    requiresTask: false,
    resources: [],
  },
  {
    id: "intro",
    title: "Introduction",
    subtitle: "The truth about food, your body, and why diets fail",
    duration: "7 min",
    comingSoon: false,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: false,
    resources: [
      { type: "summary", title: "Key Takeaways", content: "An overview of what you'll learn: how modern food hijacks your biology, why willpower isn't the problem, and the 3 hormonal systems that control your weight." },
    ],
  },
  {
    id: "lesson-1",
    title: "Lesson 1: Dopamine",
    subtitle: "How processed food hijacks your brain's reward system",
    duration: "24 min",
    comingSoon: false,
    requiresVideo: true,
    requiresLink: true,
    requiresTask: true,
    resources: [
      { type: "info", title: "Deep Dive: Dopamine & Food Addiction", content: "Dopamine isn't about pleasure — it's about anticipation. Processed food triggers dopamine surges 2-5x higher than natural food, creating a craving cycle that has nothing to do with hunger. Over time, your receptors downregulate, meaning you need MORE stimulation for the same satisfaction. This is the exact mechanism behind every addiction." },
      { type: "summary", title: "Lesson Summary", content: "• Dopamine drives craving, not enjoyment\n• Processed foods create supernormal dopamine responses\n• Your brain adapts by reducing receptor sensitivity\n• This creates a tolerance cycle identical to addiction\n• Breaking the cycle requires a dopamine 'reset' period" },
      { type: "task", title: "Reflection Task", content: "Write about a food you know you're 'addicted' to. Describe what happens in your mind and body when you crave it vs. when you eat it. Is the experience of eating it as good as the craving promised?", taskType: "text" },
      { type: "link", title: "Required: Watch Huberman on Dopamine", content: "Dr. Andrew Huberman explains the neuroscience of dopamine and how it drives motivation, craving, and addiction. You must watch this before proceeding.", url: "https://www.youtube.com/results?search_query=huberman+dopamine+motivation" },
    ],
  },
  {
    id: "lesson-2",
    title: "Lesson 2: Bliss Point",
    subtitle: "How food companies engineer addiction for profit",
    duration: "24 min",
    comingSoon: false,
    requiresVideo: true,
    requiresLink: true,
    requiresTask: true,
    resources: [
      { type: "info", title: "The Bliss Point & Food Marketing", content: "The 'Bliss Point' is the precise combination of sugar, fat, and salt that maximizes pleasure and consumption. Food scientists spend millions engineering this exact ratio. Every texture, flavor, and aroma is optimized to override your natural satiety signals." },
      { type: "summary", title: "Lesson Summary", content: "• The 'Bliss Point' is scientifically engineered\n• Sugar + Fat + Salt = maximum addictive potential\n• Food marketing specifically targets your vulnerabilities\n• 'Health foods' often use the same manipulation tactics\n• Awareness is your first line of defense" },
      { type: "task", title: "Kitchen Audit", content: "Take a photo of 3 'health foods' in your kitchen and read their ingredient labels. Identify hidden sugars, fats, and additives. Share what surprised you.", taskType: "photo" },
      { type: "link", title: "Required: Watch Sugar, Fat and Salt", content: "Documentary about how the food industry engineers products for maximum consumption and addiction.", url: "https://www.youtube.com/results?search_query=sugar+fat+salt+documentary" },
    ],
  },
  {
    id: "lesson-3",
    title: "Lesson 3: Consequences",
    subtitle: "What sugar and processed food do to your body",
    duration: "19 min",
    comingSoon: true,
    requiresVideo: true,
    requiresLink: true,
    requiresTask: true,
    resources: [
      { type: "info", title: "Hidden Sugars Are Everywhere", content: "The average person consumes 77g of sugar per day — 3x the recommended amount. Most of it is hidden in bread, pasta sauce, yogurt, granola bars, and virtually every processed food." },
      { type: "summary", title: "Lesson Summary", content: "• Sugar drives insulin resistance\n• Hidden sugars make up 70%+ of average sugar intake\n• Chronic insulin elevation forces fat-storage mode\n• Fructose is processed like alcohol by your liver" },
      { type: "task", title: "Sugar Detective", content: "For one day, photograph every food label of what you eat and count the total grams of sugar.", taskType: "photo" },
      { type: "link", title: "Required: Watch Dr. Robert Lustig", content: "Dr. Lustig's groundbreaking lecture on how fructose and sugar drive metabolic disease.", url: "https://www.youtube.com/results?search_query=robert+lustig+sugar" },
    ],
  },
  {
    id: "lesson-4",
    title: "Lesson 4: Food Reset",
    subtitle: "How to reset your palate and break the cycle",
    duration: "36 min",
    comingSoon: true,
    requiresVideo: true,
    requiresLink: true,
    requiresTask: true,
    resources: [
      { type: "info", title: "Fructose: The Hidden Driver", content: "Fructose goes straight to your liver, where it's converted to fat. Unlike glucose, it doesn't trigger insulin or leptin properly — your brain never gets the 'full' signal." },
      { type: "summary", title: "Lesson Summary", content: "• Your taste buds reset in 7-14 days\n• Start by removing liquid sugars\n• Focus on protein + healthy fats\n• The first 3 days are hardest" },
      { type: "task", title: "My Reset Plan", content: "Write out your personal 7-day food reset plan. List 3 processed foods you'll remove and 3 whole foods you'll add.", taskType: "text" },
      { type: "link", title: "Required: Watch Dr. Boz", content: "Dr. Boz explains practical strategies for resetting your metabolism.", url: "https://www.youtube.com/results?search_query=dr+boz+metabolic+health" },
    ],
  },
  {
    id: "lesson-5",
    title: "Lesson 5: The 80/20 Rule",
    subtitle: "Sustainable eating without perfection",
    duration: "18 min",
    comingSoon: true,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: true,
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• Perfection is the enemy of sustainability\n• 80% whole, unprocessed foods is the goal\n• 20% flexibility prevents binge cycles\n• Build systems, not restrictions" },
      { type: "task", title: "Weekly Meal Map", content: "Create a visual map of your typical week's meals. Mark which are 'whole food' meals and which need upgrading. Aim for 80%.", taskType: "text" },
    ],
  },
  {
    id: "lesson-6",
    title: "Lesson 6: Emotional Eating",
    subtitle: "Breaking the link between feelings and food",
    duration: "24 min",
    comingSoon: true,
    requiresVideo: true,
    requiresLink: true,
    requiresTask: true,
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• Emotional eating is a coping mechanism, not a character flaw\n• Use the HALT method: Hungry, Angry, Lonely, or Tired?\n• Replace food coping with targeted alternatives\n• When you fix your diet, emotions become easier to manage" },
      { type: "task", title: "Trigger Journal", content: "For 3 days, every time you reach for food outside of meals, write: What happened? What am I feeling? What do I actually need?", taskType: "text" },
      { type: "link", title: "Required: Huberman on Addiction", content: "Dr. Huberman on neuroscience of addiction and breaking destructive patterns.", url: "https://www.youtube.com/results?search_query=huberman+addiction" },
    ],
  },
  {
    id: "outro",
    title: "Course Outro",
    subtitle: "Your new beginning",
    duration: "5 min",
    comingSoon: true,
    requiresVideo: true,
    requiresLink: false,
    requiresTask: false,
    resources: [
      { type: "summary", title: "Full Course Summary", content: "1. DOPAMINE — Processed food hijacks your reward system\n2. BLISS POINT — Food companies engineer addiction\n3. CONSEQUENCES — Sugar drives insulin resistance\n4. FOOD RESET — Break the cycle in 7-14 days\n5. 80/20 RULE — Sustainable eating\n6. EMOTIONAL EATING — Break the feelings-food link\n\nThis isn't a diet. It's an understanding of how your body works." },
    ],
  },
  {
    id: "bonus-iron",
    title: "Bonus: Iron for Women",
    subtitle: "Essential information about iron deficiency",
    duration: "5 min",
    comingSoon: true,
    requiresVideo: false,
    requiresLink: false,
    requiresTask: false,
    resources: [
      { type: "info", title: "Why Iron Matters", content: "Iron deficiency is the most common nutritional deficiency worldwide. Women are disproportionately affected. Symptoms include fatigue, brain fog, hair loss — many overlap with metabolic issues." },
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

          let StatusIcon = Circle;
          let iconColor = "text-gray-300";
          if (lesson.comingSoon) { StatusIcon = Lock; iconColor = "text-gray-200"; }
          else if (prog.completed) { StatusIcon = CheckCircle2; iconColor = "text-emerald-500"; }
          else if (isActive) { iconColor = "text-emerald-600"; }
          else if (!accessible) { StatusIcon = Lock; iconColor = "text-gray-300"; }

          return (
            <button
              key={lesson.id}
              onClick={() => accessible && onSelect(lesson.id)}
              disabled={!accessible}
              className={`w-full text-left px-5 py-3 flex items-start gap-3 transition-colors ${
                isActive ? "bg-emerald-50 border-r-2 border-emerald-600"
                : !accessible ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-50 cursor-pointer"
              }`}
            >
              <StatusIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
              <div className="min-w-0 flex-1">
                <div className={`text-sm font-bold truncate ${isActive ? "text-emerald-700" : "text-gray-800"}`}>
                  {lesson.title}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  {lesson.duration && (
                    <span className="text-[10px] text-gray-400 font-medium flex items-center gap-0.5">
                      <Clock className="w-3 h-3" /> {lesson.duration}
                    </span>
                  )}
                  {lesson.comingSoon && (
                    <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Coming Soon</span>
                  )}
                </div>
              </div>
            </button>
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
        I'm Kristina, and I'm so glad you're here. This course will change the way you think about food, your body, and weight loss — forever.
      </p>

      <div className="bg-gray-50 rounded-3xl p-8 mb-8 text-left border border-gray-100">
        <h3 className="font-black text-gray-900 mb-4 uppercase text-sm tracking-wider">How this works:</h3>
        <ul className="space-y-3">
          {[
            "Watch each video lesson completely",
            "Watch the required external resources (marked as Required)",
            "Complete the task for each lesson",
            "All 3 steps must be done before the next lesson unlocks",
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
            <p className="text-sm font-bold text-amber-800 mb-1">Currently Available: Introduction + Lessons 1-2</p>
            <p className="text-xs text-amber-600">Lessons 3-6 are coming soon — we'll notify you when they're ready!</p>
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
            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative group shadow-lg mb-3">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-600/90 rounded-full flex items-center justify-center shadow-xl mb-3 group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <span className="text-white/60 text-sm font-bold">Click to play</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                <div className={`h-full bg-emerald-500 transition-all duration-500 ${prog.videoWatched ? "w-full" : "w-0"}`} />
              </div>
            </div>
            {!prog.videoWatched && (
              <button
                onClick={() => onUpdate({ videoWatched: true })}
                className="w-full py-3 bg-gray-900 text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" /> I've watched this video ✓
              </button>
            )}
            {prog.videoWatched && (
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
  const [celebration, setCelebration] = useState<number | null>(null); // xp at time of celebration

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("fm-progress", JSON.stringify(progress));
  }, [progress]);

  // Student registration
  const handleRegister = (email: string, name: string) => {
    const s = { email, name };
    localStorage.setItem("fm-student", JSON.stringify(s));
    setStudent(s);
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
    goTo("intro");
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
