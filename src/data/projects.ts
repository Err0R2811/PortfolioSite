export type Project = {
  id: string;
  year: string;
  title: string;
  role: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  systems: string[];
  architecture?: string;
  href?: string;
  github?: string;
  domains: Domain[];
  stackTags: StackTag[];
  metrics: { label: string; value: string }[];
};

export type Domain = "AI" | "SaaS" | "E-commerce" | "Analytics" | "Full-stack";
export type StackTag = "Supabase" | "ML" | "Payments" | "Next.js" | "Python";

export const projects: Project[] = [
  {
    id: "acadence",
    year: "2025",
    title: "Acadence",
    role: "Attendance Intelligence System",
    problem:
      "Students and faculty track attendance manually — no visibility into minimum required, missed-lecture impact, or subject-wise risk.",
    solution:
      "A real-time platform that computes minimum attendance to pass each subject and surfaces subject-wise analytics for both roles.",
    impact: "Live in production at Parul Institute of Technology.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    systems: [
      "GSD-based prediction algorithm for minimum lectures required",
      "Real-time data flow via Supabase subscriptions",
      "Role-based access control (student / faculty)",
      "Edge-case handling: Infinity values, ε-guarded precision",
    ],
    architecture:
      "Next.js app router · Supabase Postgres with RLS · derived columns for attendance ratios · server actions for write paths",
    href: "https://acadence-pit.vercel.app/home",
    domains: ["Full-stack", "Analytics"],
    stackTags: ["Supabase", "Next.js"],
    metrics: [
      { label: "Users", value: "Faculty + students" },
      { label: "Latency", value: "< 200ms" },
      { label: "Status", value: "Production" },
      { label: "Throughput", value: "Real-time" },
    ],
  },
  {
    id: "wa-store",
    year: "2025",
    title: "WhatsApp Store Builder",
    role: "Multi-tenant SaaS",
    problem:
      "MSMEs take orders manually on WhatsApp — no catalogue, no automation, no scale.",
    solution:
      "A SaaS that lets any business run a full storefront inside WhatsApp: catalogue, chat-driven ordering, and payment links.",
    impact: "Targeting MSME businesses in Vadodara — recurring-revenue SaaS in build.",
    stack: ["Next.js", "Supabase", "WhatsApp Cloud API", "Razorpay"],
    systems: [
      "Multi-tenant architecture with isolated catalogues",
      "State machine for conversational order flow",
      "WhatsApp Cloud API integration for inbound + outbound",
      "Razorpay payment links generated per order",
    ],
    architecture:
      "Tenant-scoped Postgres schemas · webhook ingest → FSM → reply queue · per-tenant Razorpay key vault",
    domains: ["SaaS"],
    stackTags: ["Supabase", "Payments", "Next.js"],
    metrics: [
      { label: "Tenants", value: "Multi-tenant" },
      { label: "Channel", value: "WhatsApp Cloud" },
      { label: "Payments", value: "Razorpay" },
      { label: "Status", value: "In build" },
    ],
  },
  {
    id: "pathly",
    year: "2025",
    title: "Pathly",
    role: "AI Learning System",
    problem:
      "Learners get stuck on where to start, how to structure time, and which resources to trust.",
    solution:
      "An AI pipeline that turns a vague goal into a modular, time-bound roadmap with curated external resources.",
    impact: "Moves AI from chat into a structured learning system.",
    stack: ["TypeScript", "LLM APIs", "YouTube Data API", "Supabase"],
    systems: [
      "Prompt-driven generation pipeline with structured output",
      "Module decomposition into time-boxed learning units",
      "External content integration (YouTube, docs)",
      "Persisted roadmaps with progress state",
    ],
    architecture:
      "Goal → planner LLM → module schema → resource enrichment → persisted roadmap",
    domains: ["AI"],
    stackTags: ["Supabase"],
    metrics: [
      { label: "Model", value: "LLM planner" },
      { label: "Output", value: "Structured JSON" },
      { label: "Sources", value: "YouTube + docs" },
      { label: "Status", value: "Beta" },
    ],
  },
  {
    id: "safarnama",
    year: "2025",
    title: "Safarnama",
    role: "Travel Data System",
    problem:
      "Travelers juggle expenses, itineraries, and journey logs across disconnected tools.",
    solution:
      "A centralized cross-platform system for trip planning, expense tracking, and journey logging.",
    impact: "Demonstrates scalable product design across web and mobile.",
    stack: ["React", "Vite", "Supabase", "Capacitor"],
    systems: [
      "Relational schema for trips, legs, and expenses",
      "Cross-platform architecture (web + mobile via Capacitor)",
      "6-phase production-readiness plan: security, perf, testing, deploy",
      "Structured user data with integrity guarantees",
    ],
    architecture:
      "Single React codebase · Capacitor shell for iOS/Android · Supabase auth + storage · normalized trip/expense models",
    domains: ["Full-stack"],
    stackTags: ["Supabase"],
    metrics: [
      { label: "Targets", value: "Web · iOS · Android" },
      { label: "Core flows", value: "5+ shipped" },
      { label: "Backend", value: "Supabase" },
      { label: "Phases", value: "6-phase rollout" },
    ],
  },
  {
    id: "shivaali",
    year: "2024",
    title: "Shivaali",
    role: "Client E-commerce Platform",
    problem:
      "Real client needed an online storefront and structured product presentation to go digital.",
    solution:
      "A responsive, production e-commerce site with clean browsing, product structure, and live deployment.",
    impact: "Live website serving real users for a real business.",
    stack: ["React", "TypeScript", "Vite"],
    systems: [
      "Production-ready frontend architecture",
      "Performance + responsiveness optimization",
      "Worked directly against real client requirements",
    ],
    architecture: "Static-first frontend · structured catalogue data · CDN-deployed on Vercel",
    href: "https://shivaali.vercel.app/",
    domains: ["E-commerce"],
    stackTags: [],
    metrics: [
      { label: "Status", value: "Live" },
      { label: "Client", value: "Real business" },
      { label: "Stack", value: "React + Vite" },
      { label: "Hosting", value: "Vercel" },
    ],
  },
  {
    id: "plant-pal",
    year: "2023",
    title: "Plant-Pal",
    role: "AI Plant Detection",
    problem:
      "Identifying plants requires expertise, manual search, and trust in unreliable results.",
    solution:
      "An ML pipeline that detects plant type from an image and surfaces contextual information.",
    impact: "Real-world ML integrated into a usable product surface.",
    stack: ["Python", "Streamlit", "Scikit-learn"],
    systems: [
      "Image preprocessing + inference pipeline",
      "Trained on 500+ samples",
      "ML output rendered into a user-facing dashboard",
    ],
    architecture: "Image upload → preprocessing → classifier → result + reference content",
    domains: ["AI", "Analytics"],
    stackTags: ["ML", "Python"],
    metrics: [
      { label: "Samples", value: "500+" },
      { label: "Model", value: "Image classifier" },
      { label: "Surface", value: "Streamlit" },
      { label: "Inference", value: "On-demand" },
    ],
  },
];

export const allDomains: Domain[] = ["AI", "SaaS", "E-commerce", "Analytics", "Full-stack"];
export const allStackTags: StackTag[] = ["Supabase", "ML", "Payments", "Next.js", "Python"];
