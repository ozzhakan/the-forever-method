/* ═══════════════════════════════════════════════════════════════
   BLOG CONTENT — single source of truth.
   Add a post = add an object to POSTS. Funnel stage drives the CTA:
     TOFU (awareness)     -> soft nudge to the free PDF / videos
     MOFU (consideration) -> free PDF + course mention
     BOFU (decision)      -> the course
   Inline prose supports **bold** and [text](/internal-or-https-link).
   ═══════════════════════════════════════════════════════════════ */

export type Stage = "TOFU" | "MOFU" | "BOFU";

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "callout"; text: string }
  | { t: "cta"; kind: "pdf" | "course" | "watch" };

export interface Post {
  slug: string;
  title: string;
  description: string;
  stage: Stage;
  category: string;
  date: string; // ISO
  readMins: number;
  excerpt: string;
  body: Block[];
  related: string[];
}

export const STAGE_LABEL: Record<Stage, string> = {
  TOFU: "Start here",
  MOFU: "Going deeper",
  BOFU: "The method",
};

export const POSTS: Post[] = [
  {
    slug: "why-adhd-brains-crave-sugar",
    title: "Why Your ADHD Brain Craves Sugar (And What Actually Helps)",
    description:
      "If you have ADHD and can't stop reaching for sugar, it's not a willpower problem. Here's the dopamine science behind ADHD sugar cravings — and the simple shift that quiets them.",
    stage: "TOFU",
    category: "ADHD & cravings",
    date: "2026-06-20",
    readMins: 6,
    excerpt:
      "It's not that you're weak or undisciplined. An ADHD brain is wired to chase sugar harder than most — and once you understand why, the cravings get a lot easier to handle.",
    body: [
      { t: "p", text: "If you have ADHD and you feel like you physically cannot stop reaching for sugar, I want to start by taking some weight off you: this is not a willpower problem, and it's not a character flaw. There's a real, biological reason ADHD brains chase sugar harder than most — and once you understand it, the whole thing gets easier to deal with." },
      { t: "h2", text: "It starts with dopamine" },
      { t: "p", text: "Dopamine is the brain chemical behind motivation, focus, and reward — the \"this matters, let's do it\" signal. ADHD brains tend to run a bit low on it. So your brain is constantly, quietly looking for quick ways to top it up, and sugar is one of the fastest, most reliable ways there is." },
      { t: "p", text: "That's why reaching for sugar can feel almost automatic, especially when you're tired, bored, or stressed. You're not being greedy. Your brain is trying to fix something that's genuinely a little off — it's just using a tool that doesn't work for very long." },
      { t: "h2", text: "The spike-and-crash cycle" },
      { t: "p", text: "Here's the catch. Sugar gives you a quick lift, then your body brings your blood sugar back down — usually lower than where you started. And a brain that's just crashed wants more sugar to climb back up. So it becomes a cycle: spike, crash, crave, repeat." },
      { t: "p", text: "For an ADHD brain that already struggles with steadiness, this is rough, because your focus, mood, and energy are all riding that same rollercoaster. Most of the time you're not even chasing the taste — you're chasing the feeling of being level." },
      { t: "callout", text: "You were never chasing sugar. You were chasing stability — with a tool that gives it to you for an hour and then takes back more than it gave." },
      { t: "h2", text: "Why \"just have more willpower\" never works" },
      { t: "p", text: "If the craving is your brain trying to fix a chemical shortfall, then \"try harder\" was never going to win. You can white-knuckle it for a while, but you're fighting your own biology with a motivational speech. That's why every round of restriction tends to end the same way." },
      { t: "p", text: "The mental chatter that comes with all this even has a name — it's called [food noise](/blog/what-is-food-noise), and it gets a lot louder when you're on the sugar rollercoaster." },
      { t: "h2", text: "What actually helps" },
      { t: "p", text: "The thing that works isn't more willpower — it's steadier fuel. When you eat in a way that keeps your blood sugar stable (more protein and fat, a lot less sugar), there's no spike, so there's no crash, and your brain stops sounding the alarm every couple of hours." },
      { t: "p", text: "That's why people say they feel calm when they come off sugar. It's not a personality change — it's just the rollercoaster slowing down. It doesn't happen overnight, but it happens faster than you'd expect, and each steady day makes the next one easier." },
      { t: "p", text: "If you want the simple version of how to eat this way, the [free 60-Day ADHD Meal Plan](/adhd-meal-plan) lays it out — two easy plates a day, no calorie counting." },
      { t: "cta", kind: "pdf" },
    ],
    related: ["what-is-food-noise", "how-to-quit-sugar-with-adhd"],
  },
  {
    slug: "what-is-food-noise",
    title: "What Is Food Noise? Why Your Brain Won't Stop Thinking About Food",
    description:
      "Food noise is the constant mental chatter about what to eat next. Here's what causes it, why it's louder with ADHD, and how it finally goes quiet.",
    stage: "TOFU",
    category: "ADHD & cravings",
    date: "2026-06-23",
    readMins: 5,
    excerpt:
      "That constant background chatter — what to eat, when, what you shouldn't have eaten — has a name. Here's what's really driving it, and how to turn the volume down.",
    body: [
      { t: "p", text: "There's a name for that constant mental chatter about food — what to eat next, when you're allowed to eat, what you shouldn't have eaten earlier. It's called food noise, and if you have ADHD it can be relentless. For years a lot of people assume it's just normal background noise that everyone lives with. It isn't, and it doesn't have to be." },
      { t: "h2", text: "Where food noise comes from" },
      { t: "p", text: "Food noise isn't a discipline problem — it's a real signal, and it gets loudest when two things are true at once: your blood sugar is unstable, and your brain is a little under-stimulated." },
      { t: "p", text: "When you're on the sugar up-and-down, every crash basically sends up a flare: find food, find fuel, now. That flare is the noise. It's your biology doing its job — just badly, because of what it's being fed." },
      { t: "h2", text: "Why it's louder with ADHD" },
      { t: "p", text: "An ADHD brain is already looking for stimulation and a quick dopamine hit, so it's more sensitive to that \"find food\" flare in the first place. Put an under-stimulated brain on top of an unstable blood-sugar pattern, and the signal more or less never switches off. (There's more on the dopamine side of this in [why ADHD brains crave sugar](/blog/why-adhd-brains-crave-sugar).)" },
      { t: "h2", text: "Why diets usually make it louder" },
      { t: "p", text: "Here's the cruel part of most diet advice: restriction tends to crank food noise up, not down. When you're hungry, counting, and telling yourself \"no\" all day, your brain thinks about food even more. So the harder you try to ignore it, the louder it gets." },
      { t: "callout", text: "You can't think your way out of a biological signal. You have to change what's producing it." },
      { t: "h2", text: "How to turn it down" },
      { t: "p", text: "The noise drops when you come off sugar and onto steadier food. No spikes means no crashes, which means the \"find food\" flare stops going off every hour. This is exactly what people are describing when they say their head \"went quiet\" — it's not willpower appearing out of nowhere, it's the signal settling because you removed what was driving it." },
      { t: "p", text: "For most people the first real quiet shows up within the first week or two of eating steadier. If you want to see what that actually looks like day to day, the [videos on YouTube](/watch) walk through it, and the [free meal plan](/adhd-meal-plan) gives you the simple version to follow." },
      { t: "cta", kind: "watch" },
    ],
    related: ["why-adhd-brains-crave-sugar", "how-to-quit-sugar-with-adhd"],
  },
  {
    slug: "how-to-quit-sugar-with-adhd",
    title: "How to Quit Sugar When You Have ADHD (Without Willpower)",
    description:
      "A practical, ADHD-friendly way to quit sugar that doesn't rely on willpower — fewer decisions, steadier food, and a simple plan for cravings. Step by step.",
    stage: "MOFU",
    category: "How-to",
    date: "2026-06-27",
    readMins: 8,
    excerpt:
      "Most advice assumes you have endless willpower. You don't — especially at the end of a long day. Here's the lazy, low-decision way to quit sugar that actually works with an ADHD brain.",
    body: [
      { t: "p", text: "Almost every piece of advice about quitting sugar quietly assumes you have a deep reserve of willpower to draw on. With ADHD, you usually don't — and definitely not at nine at night after a long day. So this is the lazy way: how to make quitting easy enough that you barely have to decide. It's the approach that works when \"just try harder\" has failed a dozen times." },
      { t: "h2", text: "1. Stop relying on willpower" },
      { t: "p", text: "Willpower is a battery, and it's nearly empty by the evening — which is exactly when cravings show up. So any plan that depends on you out-deciding sugar a hundred times a day in your own kitchen is going to lose. The whole strategy here is to need less willpower, not more." },
      { t: "h2", text: "2. Remove the decision" },
      { t: "p", text: "Make the choice once, in the shop, by simply not buying it — instead of fighting it all night at home. One decision in the aisle beats a hundred decisions on the sofa. You can't lose a fight you never have to show up for, and you don't need willpower for snacks that aren't in the house." },
      { t: "h2", text: "3. Eat so you're never starving" },
      { t: "p", text: "A lot of what feels like a willpower failure is really just hunger and tiredness in disguise. When you eat enough protein and fat that real hunger never ambushes you, cravings have almost nothing to grab onto. Lead every meal with protein, keep the fat in, and you'll feel the difference within a few days." },
      { t: "callout", text: "Full people don't raid the cupboard. The move isn't to resist harder — it's to be so well-fed that there's nothing left to resist." },
      { t: "h2", text: "4. The same-meals trick" },
      { t: "p", text: "Pick about five meals you actually like, and rotate them. No deciding what to eat every day, no decision fatigue, no daily opening for your brain to start negotiating. To an ADHD brain, routine is a relief — it removes the exact part your brain finds hard, which is the deciding. And don't overhaul everything on day one; just get one meal solid, then build from there." },
      { t: "h2", text: "5. Have a plan for cravings" },
      { t: "p", text: "A craving is a wave — it builds, peaks, and passes in a few minutes if you don't feed it. So decide your response ahead of time: drink water with a pinch of salt (a lot of cravings are really thirst or low minerals), have some protein if you're actually hungry, and move for a minute to break the loop. Decide it once, when you're calm, so you're not negotiating with a screaming brain in the moment." },
      { t: "p", text: "One more thing worth knowing: if quitting sugar makes you feel genuinely rough in the first week — tired, headachy, foggy — that's usually a salt-and-minerals issue, not a sign your body needs sugar. Salt your food and add an electrolyte, and most of that disappears." },
      { t: "p", text: "If you'd rather have the meals and the plan done for you, the [free 60-Day ADHD Meal Plan](/adhd-meal-plan) maps it out. And if you want the full system — the science, the food framework, and exact craving protocols — that's what [The Unhooked Method](/course) is." },
      { t: "cta", kind: "pdf" },
    ],
    related: ["why-adhd-brains-crave-sugar", "the-unhooked-method-course"],
  },
  {
    slug: "the-unhooked-method-course",
    title: "Inside The Unhooked Method: How the Course Works (and Who It's For)",
    description:
      "A clear look at The Unhooked Method — the self-paced course for breaking the sugar and food loop with science, not willpower. What's inside, who it's for, and how it works.",
    stage: "BOFU",
    category: "The course",
    date: "2026-06-30",
    readMins: 6,
    excerpt:
      "If the free guide helped and you want the whole system, here's an honest look at the course — what's inside, who it's for, who it's not for, and how it actually works.",
    body: [
      { t: "p", text: "If you've grabbed the free meal plan and watched a few videos, and you're thinking about going deeper, this is an honest walkthrough of [The Unhooked Method](/course) — what it is, what's inside, and who it's actually for. No hype, just a clear picture so you can decide for yourself." },
      { t: "h2", text: "What it is" },
      { t: "p", text: "The Unhooked Method is a self-paced course for breaking the sugar and food loop with science, not willpower. It's the deeper version of everything on the channel and in the free guide — the why behind the cravings, the food framework, and exactly what to do in the moment one hits." },
      { t: "h2", text: "What's inside" },
      { t: "ul", items: [
        "Nine self-paced video modules you can watch on any device.",
        "The neuroscience of cravings — your brain decoded, in plain language.",
        "The eat-to-fullness food framework: steady meals, no counting.",
        "38 if-then craving protocols for the exact moment a craving hits.",
        "A 19-piece resource library of cheat sheets, templates and guides.",
      ]},
      { t: "h2", text: "Who it's for" },
      { t: "p", text: "It's for you if you've tried to quit sugar with willpower and it never lasted, if cravings and food noise are wearing you down, and if you want to understand what's actually happening so you can finally get out of the loop. It's especially built for ADHD brains that need things simple and low-decision." },
      { t: "p", text: "It's not for you if you're looking for a meal-tracking app, a calorie counter, or a strict 1-on-1 coaching program. It's a self-paced course you go through on your own schedule." },
      { t: "h2", text: "How it works" },
      { t: "p", text: "You work through the modules in order, at your own pace. Each one builds on the last — you understand the problem, then change the food, then learn exactly what to do when cravings show up. Everything is yours to keep, on every device." },
      { t: "callout", text: "It comes with a 14-day money-back guarantee — if it's not for you, you get a full refund, no questions." },
      { t: "p", text: "If you're not ready for the course yet, that's genuinely fine — start with the [free 60-Day ADHD Meal Plan](/adhd-meal-plan) and the [videos](/watch). The course is there whenever you want the whole system in one place." },
      { t: "cta", kind: "course" },
    ],
    related: ["how-to-quit-sugar-with-adhd", "why-adhd-brains-crave-sugar"],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
