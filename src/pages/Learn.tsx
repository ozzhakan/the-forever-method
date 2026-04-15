import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  CheckCircle2,
  Circle,
  Lock,
  ChevronRight,
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
  Image,
  Video,
  MessageSquare,
  Camera,
  Sparkles,
  Target,
  Award,
  Heart,
  Brain,
  Activity,
  Menu,
  X,
  FileText,
  Upload,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ───────────────────────── TYPES ───────────────────────── */
interface LessonResource {
  type: "info" | "summary" | "task" | "link";
  title: string;
  content: string;
  url?: string;
  taskType?: "photo" | "video" | "text";
}

interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  videoUrl?: string;
  resources: LessonResource[];
  completed: boolean;
  locked: boolean;
}

/* ───────────────────────── COURSE DATA ───────────────────────── */
const INITIAL_LESSONS: Lesson[] = [
  {
    id: "welcome",
    title: "Welcome",
    subtitle: "Your transformation starts here",
    duration: "",
    resources: [],
    completed: false,
    locked: false,
  },
  {
    id: "intro",
    title: "Introduction",
    subtitle: "The truth about food, your body, and why diets fail",
    duration: "7 min",
    resources: [
      { type: "summary", title: "Key Takeaways", content: "An overview of what you'll learn in this course: how modern food hijacks your biology, why willpower isn't the problem, and the 3 hormonal systems that control your weight." },
    ],
    completed: false,
    locked: false,
  },
  {
    id: "lesson-1",
    title: "Lesson 1: Dopamine",
    subtitle: "How processed food hijacks your brain's reward system",
    duration: "24 min",
    resources: [
      { type: "info", title: "Deep Dive: Dopamine & Food Addiction", content: "Dopamine isn't about pleasure — it's about anticipation. Processed food triggers dopamine surges that are 2-5x higher than natural food, creating a cycle of craving that has nothing to do with hunger. Over time, your dopamine receptors downregulate, meaning you need MORE stimulation to feel the same satisfaction. This is the exact same mechanism behind every addiction." },
      { type: "summary", title: "Lesson Summary", content: "• Dopamine drives craving, not enjoyment\n• Processed foods create supernormal dopamine responses\n• Your brain adapts by reducing receptor sensitivity\n• This creates a tolerance cycle identical to addiction\n• Breaking the cycle requires a dopamine 'reset' period" },
      { type: "task", title: "Reflection Task", content: "Write about a food you know you're 'addicted' to. Describe what happens in your mind and body when you crave it vs. when you eat it. Is the experience of eating it as good as the craving promised?", taskType: "text" },
      { type: "link", title: "Watch: Huberman on Dopamine", content: "Dr. Andrew Huberman explains the neuroscience of dopamine and how it drives motivation, craving, and addiction.", url: "https://www.youtube.com/results?search_query=huberman+dopamine" },
    ],
    completed: false,
    locked: false,
  },
  {
    id: "lesson-2",
    title: "Lesson 2: Bliss Point",
    subtitle: "How food companies engineer addiction for profit",
    duration: "24 min",
    resources: [
      { type: "info", title: "The Bliss Point & Food Marketing", content: "The 'Bliss Point' is the precise combination of sugar, fat, and salt that maximizes pleasure and consumption. Food scientists spend millions engineering this exact ratio. It's not an accident that you can't stop eating chips or cookies — they're designed that way. Every texture, flavor, and aroma is optimized to override your natural satiety signals." },
      { type: "summary", title: "Lesson Summary", content: "• The 'Bliss Point' is scientifically engineered\n• Sugar + Fat + Salt = maximum addictive potential\n• Food marketing specifically targets your vulnerabilities\n• 'Health foods' often use the same manipulation tactics\n• Awareness is your first line of defense" },
      { type: "task", title: "Kitchen Audit", content: "Take a photo of 3 'health foods' in your kitchen and read their ingredient labels. Identify hidden sugars, fats, and additives. Share what surprised you.", taskType: "photo" },
      { type: "link", title: "Watch: Sugar, Fat and Salt", content: "Documentary about how the food industry engineers products for maximum consumption and addiction.", url: "https://www.youtube.com/results?search_query=sugar+fat+salt+documentary" },
    ],
    completed: false,
    locked: false,
  },
  {
    id: "lesson-3",
    title: "Lesson 3: Consequences",
    subtitle: "What sugar and processed food do to your body",
    duration: "19 min",
    resources: [
      { type: "info", title: "Hidden Sugars Are Everywhere", content: "The average person consumes 77 grams of sugar per day — 3x the recommended amount. But most of it isn't from candy or soda. It's hidden in bread, pasta sauce, yogurt, granola bars, salad dressing, and virtually every processed food. Sugar has 56+ different names on ingredient labels, making it nearly impossible to avoid without education." },
      { type: "summary", title: "Lesson Summary", content: "• Sugar drives insulin resistance — the root of metabolic disease\n• Hidden sugars make up 70%+ of average sugar intake\n• Chronic insulin elevation forces your body into fat-storage mode\n• Fructose is processed like alcohol by your liver\n• Understanding consequences creates lasting motivation for change" },
      { type: "task", title: "Sugar Detective", content: "For one day, photograph every food label of what you eat and count the total grams of sugar. Share your total and your reaction.", taskType: "photo" },
      { type: "link", title: "Watch: Dr. Robert Lustig", content: "Dr. Lustig's groundbreaking lecture on how fructose and sugar drive metabolic disease.", url: "https://www.youtube.com/results?search_query=robert+lustig+sugar+the+bitter+truth" },
    ],
    completed: false,
    locked: false,
  },
  {
    id: "lesson-4",
    title: "Lesson 4: Food Reset",
    subtitle: "How to reset your palate and break the cycle",
    duration: "36 min",
    resources: [
      { type: "info", title: "Fructose: The Hidden Driver", content: "Fructose is metabolized differently than glucose — it goes straight to your liver, where it's converted to fat. Unlike glucose, fructose doesn't trigger insulin or leptin properly, meaning your brain never gets the 'full' signal. This is why you can drink 500 calories of juice and still feel hungry. Removing concentrated fructose sources is one of the most impactful changes you can make." },
      { type: "summary", title: "Lesson Summary", content: "• Your taste buds reset in 7-14 days\n• Start with removing liquid sugars (juice, soda, sweetened coffee)\n• Replace processed snacks with whole food alternatives\n• Focus on protein + healthy fats to stabilize blood sugar\n• The first 3 days are hardest — then it gets dramatically easier" },
      { type: "task", title: "My Reset Plan", content: "Write out your personal 7-day food reset plan. List 3 processed foods you'll remove and 3 whole foods you'll add. Be specific about meals.", taskType: "text" },
      { type: "link", title: "Watch: Dr. Boz — Metabolic Health", content: "Dr. Boz explains the science of metabolic health and practical strategies for resetting your metabolism.", url: "https://www.youtube.com/results?search_query=dr+boz+metabolic+health" },
    ],
    completed: false,
    locked: false,
  },
  {
    id: "lesson-5",
    title: "Lesson 5: The 80/20 Rule",
    subtitle: "Sustainable eating without perfection",
    duration: "18 min",
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• Perfection is the enemy of sustainability\n• 80% whole, unprocessed foods is the goal\n• 20% flexibility prevents binge cycles\n• Focus on progress, not perfection\n• Build systems, not restrictions\n• Social eating and travel don't have to derail you" },
      { type: "task", title: "Weekly Meal Map", content: "Create a visual map of your typical week's meals. Mark which ones are already 'whole food' meals and which need upgrading. Aim for 80%.", taskType: "text" },
    ],
    completed: false,
    locked: false,
  },
  {
    id: "lesson-6",
    title: "Lesson 6: Emotional Eating",
    subtitle: "Breaking the link between feelings and food",
    duration: "24 min",
    resources: [
      { type: "summary", title: "Lesson Summary", content: "• Emotional eating is a coping mechanism, not a character flaw\n• Identify your triggers: stress, boredom, loneliness, anxiety\n• The HALT method: ask if you're Hungry, Angry, Lonely, or Tired\n• Replace food coping with targeted alternatives\n• When you fix your diet, emotions become easier to manage\n• You stop eating to numb and start tuning into your true needs" },
      { type: "task", title: "Trigger Journal", content: "For the next 3 days, every time you reach for food outside of meals, write down: What happened? What am I feeling? What do I actually need? Share your observations.", taskType: "text" },
      { type: "link", title: "Watch: Huberman on Addiction", content: "Dr. Andrew Huberman on the neuroscience of addiction, habits, and breaking destructive behavioral patterns.", url: "https://www.youtube.com/results?search_query=huberman+addiction+habits" },
    ],
    completed: false,
    locked: false,
  },
  {
    id: "outro",
    title: "Course Outro",
    subtitle: "Your new beginning",
    duration: "5 min",
    resources: [
      { type: "summary", title: "Full Course Summary", content: "Congratulations on completing The Forever Method. Here's everything we covered:\n\n1. DOPAMINE — Processed food hijacks your reward system\n2. BLISS POINT — Food companies engineer addiction\n3. CONSEQUENCES — Sugar drives insulin resistance\n4. FOOD RESET — How to break the cycle in 7-14 days\n5. 80/20 RULE — Sustainable eating without perfection\n6. EMOTIONAL EATING — Breaking the feelings-food link\n\nRemember: this isn't a diet you go on and off. It's an understanding of how your body works. Once you see the matrix, you can't unsee it.\n\nYour body wants to be healthy. You just have to stop fighting it." },
    ],
    completed: false,
    locked: false,
  },
  {
    id: "bonus-iron",
    title: "Bonus: Iron for Women",
    subtitle: "Essential information about iron deficiency",
    duration: "5 min",
    resources: [
      { type: "info", title: "Why Iron Matters for Women", content: "Iron deficiency is the most common nutritional deficiency worldwide, and women are disproportionately affected due to menstruation, pregnancy, and dietary patterns. Symptoms include fatigue, brain fog, hair loss, cold hands, and difficulty concentrating — many of which overlap with metabolic issues. Getting your iron levels checked and optimized can dramatically improve your energy and results." },
    ],
    completed: false,
    locked: false,
  },
];

/* ───────────────────────── GAMIFICATION HELPERS ───────────────────────── */
const getXP = (lessons: Lesson[]) => lessons.filter((l) => l.completed).length * 100;
const getLevel = (xp: number) => Math.floor(xp / 300) + 1;
const getLevelTitle = (level: number) => {
  const titles = ["Beginner", "Explorer", "Learner", "Warrior", "Champion", "Master"];
  return titles[Math.min(level - 1, titles.length - 1)];
};
const getStreak = () => {
  const stored = localStorage.getItem("fm-streak");
  if (!stored) return 1;
  const data = JSON.parse(stored);
  const today = new Date().toDateString();
  if (data.lastDate === today) return data.count;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (data.lastDate === yesterday) return data.count + 1;
  return 1;
};

/* ───────────────────────── SIDEBAR ───────────────────────── */
const Sidebar = ({
  lessons,
  activeId,
  onSelect,
  onClose,
}: {
  lessons: Lesson[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) => {
  const completed = lessons.filter((l) => l.completed).length;
  const total = lessons.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Flame className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-sm tracking-tighter text-gray-900 italic uppercase">
              FOREVER<span className="text-emerald-600">METHOD</span>
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-gray-500">
          <span>{completed}/{total} completed</span>
          <span className="text-emerald-600">{pct}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto py-2">
        {lessons.map((lesson, i) => {
          const isActive = lesson.id === activeId;
          const Icon = lesson.completed ? CheckCircle2 : lesson.locked ? Lock : Circle;
          const iconColor = lesson.completed
            ? "text-emerald-500"
            : lesson.locked
            ? "text-gray-300"
            : isActive
            ? "text-emerald-600"
            : "text-gray-300";

          return (
            <button
              key={lesson.id}
              onClick={() => !lesson.locked && onSelect(lesson.id)}
              disabled={lesson.locked}
              className={`w-full text-left px-5 py-3 flex items-start gap-3 transition-colors ${
                isActive
                  ? "bg-emerald-50 border-r-2 border-emerald-600"
                  : lesson.locked
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
              <div className="min-w-0">
                <div className={`text-sm font-bold truncate ${isActive ? "text-emerald-700" : "text-gray-800"}`}>
                  {lesson.title}
                </div>
                {lesson.duration && (
                  <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {lesson.duration}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Gamification Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Trophy className="w-4 h-4 text-yellow-900" />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Level {getLevel(getXP(lessons))}</div>
              <div className="text-xs font-bold text-gray-700">{getLevelTitle(getLevel(getXP(lessons)))}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-emerald-600">{getXP(lessons)}</div>
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">XP</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── WELCOME SCREEN ───────────────────────── */
const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="max-w-3xl mx-auto text-center py-12 px-4">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-200">
        <Flame className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter mb-4 uppercase italic">
        Welcome to The Forever Method
      </h1>
      <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
        Hi! I'm Kristina, and I'm so glad you're here. This course will change the way you think about food, your body, and weight loss — forever.
      </p>

      <div className="bg-gray-50 rounded-3xl p-8 mb-8 text-left border border-gray-100">
        <h3 className="font-black text-gray-900 mb-4 uppercase text-sm tracking-wider">What to expect:</h3>
        <ul className="space-y-3">
          {[
            "7 video lessons (under 3 hours total)",
            "Practical tasks after each lesson to deepen your understanding",
            "External resources from world-class researchers",
            "A complete system you can implement immediately",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-emerald-50 rounded-2xl p-6 mb-8 border border-emerald-100">
        <div className="flex items-center justify-center gap-6 text-center">
          {[
            { icon: <Flame className="w-5 h-5" />, label: "Track Streaks", color: "text-orange-500" },
            { icon: <Zap className="w-5 h-5" />, label: "Earn XP", color: "text-yellow-500" },
            { icon: <Trophy className="w-5 h-5" />, label: "Level Up", color: "text-purple-500" },
            { icon: <Target className="w-5 h-5" />, label: "Complete Tasks", color: "text-emerald-600" },
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
        Start My Journey
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  </div>
);

/* ───────────────────────── RESOURCE CARD ───────────────────────── */
const ResourceCard = ({ resource }: { resource: LessonResource }) => {
  const [expanded, setExpanded] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [taskSubmitted, setTaskSubmitted] = useState(false);

  const iconMap = {
    info: <BookOpen className="w-5 h-5" />,
    summary: <FileText className="w-5 h-5" />,
    task: <PenLine className="w-5 h-5" />,
    link: <ExternalLink className="w-5 h-5" />,
  };

  const colorMap = {
    info: { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600", iconBg: "bg-blue-100" },
    summary: { bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-600", iconBg: "bg-purple-100" },
    task: { bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-600", iconBg: "bg-amber-100" },
    link: { bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600", iconBg: "bg-emerald-100" },
  };

  const c = colorMap[resource.type];

  if (resource.type === "link") {
    return (
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block p-4 ${c.bg} rounded-2xl border ${c.border} hover:shadow-md transition-shadow group`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${c.iconBg} ${c.text} rounded-xl flex items-center justify-center flex-shrink-0`}>
            {iconMap[resource.type]}
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-sm font-bold ${c.text}`}>{resource.title}</div>
            <div className="text-xs text-gray-500 truncate">{resource.content}</div>
          </div>
          <ExternalLink className={`w-4 h-4 ${c.text} group-hover:translate-x-1 transition-transform flex-shrink-0`} />
        </div>
      </a>
    );
  }

  if (resource.type === "task") {
    return (
      <div className={`p-5 ${c.bg} rounded-2xl border ${c.border}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 ${c.iconBg} ${c.text} rounded-xl flex items-center justify-center flex-shrink-0`}>
            {iconMap[resource.type]}
          </div>
          <div>
            <div className={`text-sm font-bold ${c.text}`}>{resource.title}</div>
            <div className="flex items-center gap-2 mt-0.5">
              {resource.taskType === "photo" && <Camera className="w-3 h-3 text-gray-400" />}
              {resource.taskType === "video" && <Video className="w-3 h-3 text-gray-400" />}
              {resource.taskType === "text" && <MessageSquare className="w-3 h-3 text-gray-400" />}
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {resource.taskType} response
              </span>
            </div>
          </div>
          {taskSubmitted && (
            <div className="ml-auto">
              <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3" /> Done
              </div>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">{resource.content}</p>

        {!taskSubmitted ? (
          <div className="space-y-3">
            {resource.taskType === "text" ? (
              <textarea
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Write your response here..."
                className="w-full p-3 border border-amber-200 rounded-xl text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
              />
            ) : (
              <div className="border-2 border-dashed border-amber-200 rounded-xl p-6 text-center bg-white cursor-pointer hover:border-amber-300 transition-colors">
                <Upload className="w-8 h-8 text-amber-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400 font-bold">
                  Click to upload {resource.taskType === "photo" ? "a photo" : "a video"}
                </p>
              </div>
            )}
            <button
              onClick={() => setTaskSubmitted(true)}
              disabled={resource.taskType === "text" && !taskInput.trim()}
              className="w-full py-3 bg-amber-500 text-white font-bold text-sm rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Submit Task
            </button>
          </div>
        ) : (
          <div className="p-3 bg-emerald-50 rounded-xl text-center">
            <p className="text-sm font-bold text-emerald-700 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Great job! +50 XP earned
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${c.bg} rounded-2xl border ${c.border} overflow-hidden`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center gap-3 text-left hover:bg-white/50 transition-colors"
      >
        <div className={`w-10 h-10 ${c.iconBg} ${c.text} rounded-xl flex items-center justify-center flex-shrink-0`}>
          {iconMap[resource.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-bold ${c.text}`}>{resource.title}</div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            {resource.type === "info" ? "Additional reading" : "Key points"}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{resource.content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ───────────────────────── LESSON VIEW ───────────────────────── */
const LessonView = ({
  lesson,
  onComplete,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: {
  lesson: Lesson;
  onComplete: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}) => (
  <div className="max-w-3xl mx-auto py-8 px-4">
    <motion.div key={lesson.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          {lesson.duration && (
            <>
              <Clock className="w-3.5 h-3.5" />
              <span>{lesson.duration}</span>
              <span>•</span>
            </>
          )}
          <span>Video Lesson</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">{lesson.title}</h1>
        <p className="text-gray-500">{lesson.subtitle}</p>
      </div>

      {/* Video Player Placeholder */}
      <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden mb-8 relative group shadow-lg">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-emerald-600/90 rounded-full flex items-center justify-center shadow-xl mb-3 group-hover:scale-110 transition-transform cursor-pointer">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
          <span className="text-white/60 text-sm font-bold">Click to play</span>
        </div>
        {/* Fake progress */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
          <div className="w-0 h-full bg-emerald-500" />
        </div>
      </div>

      {/* Resources */}
      {lesson.resources.length > 0 && (
        <div className="space-y-4 mb-10">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Lesson Materials</h3>
          {lesson.resources.map((r, i) => (
            <ResourceCard key={i} resource={r} />
          ))}
        </div>
      )}

      {/* Complete + Navigation */}
      <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center gap-4">
        {hasPrev && (
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
        )}
        <div className="flex-1" />
        {!lesson.completed ? (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all uppercase tracking-wider"
          >
            <CheckCircle2 className="w-5 h-5" />
            Mark Complete — +100 XP
          </button>
        ) : hasNext ? (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all uppercase tracking-wider"
          >
            Next Lesson <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex items-center gap-2 px-6 py-4 bg-yellow-100 text-yellow-800 font-black text-sm rounded-xl uppercase tracking-wider">
            <Trophy className="w-5 h-5" />
            Course Complete!
          </div>
        )}
      </div>
    </motion.div>
  </div>
);

/* ───────────────────────── COMPLETION CELEBRATION ───────────────────────── */
const CompletionPopup = ({ xp, onClose }: { xp: number; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center z-10"
      >
        <motion.div
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <Sparkles className="w-10 h-10 text-yellow-900" />
        </motion.div>
        <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight uppercase">Lesson Complete!</h3>
        <p className="text-emerald-600 font-black text-3xl mb-1">+100 XP</p>
        <p className="text-gray-400 text-sm font-bold mb-6">Total: {xp} XP • Level {getLevel(xp)}</p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

/* ───────────────────────── MAIN LEARN PAGE ───────────────────────── */
export default function Learn() {
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const stored = localStorage.getItem("fm-lessons");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return INITIAL_LESSONS.map((l) => ({
          ...l,
          completed: parsed.find((p: any) => p.id === l.id)?.completed ?? false,
        }));
      } catch { return INITIAL_LESSONS; }
    }
    return INITIAL_LESSONS;
  });
  const [activeId, setActiveId] = useState(lessons[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Save progress
  useEffect(() => {
    localStorage.setItem("fm-lessons", JSON.stringify(lessons.map((l) => ({ id: l.id, completed: l.completed }))));
  }, [lessons]);

  // Track streak
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("fm-streak");
    if (stored) {
      const data = JSON.parse(stored);
      if (data.lastDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const count = data.lastDate === yesterday ? data.count + 1 : 1;
        localStorage.setItem("fm-streak", JSON.stringify({ lastDate: today, count }));
      }
    } else {
      localStorage.setItem("fm-streak", JSON.stringify({ lastDate: today, count: 1 }));
    }
  }, []);

  const activeLesson = lessons.find((l) => l.id === activeId)!;
  const activeIndex = lessons.findIndex((l) => l.id === activeId);

  const completeLesson = () => {
    setLessons((prev) => prev.map((l) => (l.id === activeId ? { ...l, completed: true } : l)));
    setShowCelebration(true);
  };

  const goNext = () => {
    if (activeIndex < lessons.length - 1) {
      setActiveId(lessons[activeIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      setActiveId(lessons[activeIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };

  const startCourse = () => {
    setActiveId("intro");
    setLessons((prev) => prev.map((l) => (l.id === "welcome" ? { ...l, completed: true } : l)));
  };

  const streak = getStreak();
  const xp = getXP(lessons);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0 h-screen sticky top-0 shadow-sm">
        <Sidebar lessons={lessons} activeId={activeId} onSelect={(id) => { setActiveId(id); window.scrollTo(0, 0); }} onClose={() => {}} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden shadow-2xl"
            >
              <Sidebar
                lessons={lessons}
                activeId={activeId}
                onSelect={(id) => { setActiveId(id); setSidebarOpen(false); window.scrollTo(0, 0); }}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-gray-900 truncate">{activeLesson.title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-black text-orange-600">{streak}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-black text-emerald-600">{xp} XP</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeId === "welcome" ? (
          <WelcomeScreen onStart={startCourse} />
        ) : (
          <LessonView
            lesson={activeLesson}
            onComplete={completeLesson}
            onNext={goNext}
            onPrev={goPrev}
            hasNext={activeIndex < lessons.length - 1}
            hasPrev={activeIndex > 0}
          />
        )}
      </div>

      {/* Celebration Popup */}
      {showCelebration && (
        <CompletionPopup
          xp={xp}
          onClose={() => {
            setShowCelebration(false);
            if (activeIndex < lessons.length - 1) goNext();
          }}
        />
      )}
    </div>
  );
}
