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
  image?: string;
  domains: Domain[];
  stackTags: StackTag[];
  metrics: { label: string; value: string }[];
};

export type Domain = "AI" | "SaaS" | "E-commerce" | "Analytics" | "Full-stack" | "Tools" | "Client";
export type StackTag = "Supabase" | "ML" | "Payments" | "Next.js" | "Python";

export const projects: Project[] = [
  {
    id: "acadence",
    year: "2025",
    title: "Acadence",
    role: "Attendance Intelligence System",
    problem:
      "Students and faculty track attendance manually, with no visibility into minimum required, missed-lecture impact, or subject-wise risk.",
    solution:
      "A real-time platform that computes minimum attendance to pass each subject and surfaces subject-wise analytics for both roles.",
    impact: "Live in production at Parul Institute of Technology. Used daily by students and faculty for attendance tracking and predictions.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    systems: [
      "GSD-based prediction algorithm for minimum lectures required",
      "Real-time data flow via Supabase subscriptions",
      "Role-based access control (student / faculty)",
      "Edge-case handling: Infinity values, ε-guarded precision",
      "Subject-wise risk scoring and attendance forecasting",
    ],
    architecture:
      "Next.js app router · Supabase Postgres with RLS · derived columns for attendance ratios · server actions for write paths",
    href: "https://acadence-pit.vercel.app/home",
    github: "https://github.com/Err0R2811/acadence",
    image: "/projects/acadence.png",
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
      "MSMEs take orders manually on WhatsApp, with no catalogue, no automation, and no scale.",
    solution:
      "A SaaS that lets any business run a full storefront inside WhatsApp: catalogue, chat-driven ordering, and payment links.",
    impact: "Targeting MSME businesses in Vadodara, built as a recurring-revenue SaaS with multi-tenant architecture designed from the ground up.",
    stack: ["Next.js", "Supabase", "WhatsApp Cloud API", "Razorpay"],
    systems: [
      "Multi-tenant architecture with isolated catalogues",
      "State machine for conversational order flow",
      "WhatsApp Cloud API integration for inbound + outbound",
      "Razorpay payment links generated per order",
      "Tenant onboarding with guided setup wizard",
    ],
    architecture:
      "Tenant-scoped Postgres schemas · webhook ingest → FSM → reply queue · per-tenant Razorpay key vault",
    image: "/projects/wa-store.png",
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
    impact: "Moves AI from chat into a structured learning system. Deployed on Vercel with live demo.",
    stack: ["TypeScript", "LLM APIs", "YouTube Data API", "Supabase"],
    systems: [
      "Prompt-driven generation pipeline with structured output",
      "Module decomposition into time-boxed learning units",
      "External content integration (YouTube, docs)",
      "Persisted roadmaps with progress state",
      "AI assistant for path refinement and Q&A",
    ],
    architecture:
      "Goal → planner LLM → module schema → resource enrichment → persisted roadmap",
    href: "https://path-ly-web.vercel.app",
    github: "https://github.com/Err0R2811/PathLy-web",
    image: "/projects/pathly.png",
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
      "A centralized cross-platform system for trip planning, expense tracking, and journey logging with all features a traveller needs.",
    impact: "Demonstrates scalable product design across web and mobile platforms with a complete feature set.",
    stack: ["React", "Vite", "Supabase", "Capacitor"],
    systems: [
      "Relational schema for trips, legs, and expenses",
      "Cross-platform architecture (web + mobile via Capacitor)",
      "6-phase production-readiness plan: security, perf, testing, deploy",
      "Structured user data with integrity guarantees",
      "Offline-first data sync for mobile use",
    ],
    architecture:
      "Single React codebase · Capacitor shell for iOS/Android · Supabase auth + storage · normalized trip/expense models",
    github: "https://github.com/Err0R2811/Safarnama-web-app",
    image: "/projects/safarnama.png",
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
    year: "2026",
    title: "Shivaali",
    role: "Client E-commerce Platform",
    problem:
      "Real client needed an online storefront and structured product presentation to go digital.",
    solution:
      "A responsive, production e-commerce site with clean browsing, product structure, dark/light mode, and live deployment for an ethnic fashion brand.",
    impact: "Live website serving real users for a real business. Handles product catalogue, WhatsApp integration, and brand storytelling.",
    stack: ["React", "TypeScript", "Vite"],
    systems: [
      "Production-ready frontend architecture",
      "Performance + responsiveness optimization",
      "Dark/light mode with luxury brand theming",
      "WhatsApp and Instagram CTA integrations",
      "Worked directly against real client requirements",
    ],
    architecture: "Static-first frontend · structured catalogue data · CDN-deployed on Vercel",
    href: "https://shivaali.vercel.app/",
    github: "https://github.com/Err0R2811/Shivaali",
    image: "/projects/shivaali.png",
    domains: ["E-commerce", "Client"],
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
      "An ML pipeline that detects plant type from an image and surfaces contextual botanical information with confidence scoring.",
    impact: "Real-world ML integrated into a usable product surface. Trained on 500+ samples with on-demand inference.",
    stack: ["Python", "Streamlit", "Scikit-learn"],
    systems: [
      "Image preprocessing + inference pipeline",
      "Trained on 500+ samples with data augmentation",
      "ML output rendered into a user-facing dashboard",
      "Confidence scoring with species detail lookup",
    ],
    architecture: "Image upload → preprocessing → classifier → result + reference content",
    github: "https://github.com/Err0R2811/Plant-pal-",
    image: "/projects/plant-pal.png",
    domains: ["AI", "Analytics"],
    stackTags: ["ML", "Python"],
    metrics: [
      { label: "Samples", value: "500+" },
      { label: "Model", value: "Image classifier" },
      { label: "Surface", value: "Streamlit" },
      { label: "Inference", value: "On-demand" },
    ],
  },
  {
    id: "luhns-algo",
    year: "2025",
    title: "Luhn's Algorithm",
    role: "Card Validation Tool",
    problem:
      "Validating credit/debit card numbers manually is error-prone and tedious for testing and learning purposes.",
    solution:
      "A Streamlit web app implementing Luhn's algorithm to instantly validate card numbers with visual step-by-step breakdown.",
    impact: "Clean utility demonstrating algorithm implementation skills and Streamlit proficiency.",
    stack: ["Python", "Streamlit"],
    systems: [
      "Luhn's algorithm with step-by-step visualization",
      "Real-time validation feedback",
      "Card type detection (Visa, Mastercard, etc.)",
      "Clean UI with educational breakdown",
    ],
    architecture: "Streamlit app · Luhn checksum · card pattern matching · visual result display",
    github: "https://github.com/Err0R2811/Luhns-Algo",
    image: "/projects/luhns.png",
    domains: ["Tools"],
    stackTags: ["Python"],
    metrics: [
      { label: "Stars", value: "1+" },
      { label: "Language", value: "Python" },
      { label: "Surface", value: "Streamlit" },
      { label: "Algorithm", value: "Luhn's" },
    ],
  },
  {
    id: "rathod-co",
    year: "2026",
    title: "Rathod & Co.",
    role: "Client Business Website",
    problem:
      "A Vadodara tax consultancy relied entirely on word-of-mouth referrals, with no online presence for GST, ITR, or company registration services.",
    solution:
      "A production marketing site presenting the firm's tax, registration, and accounting services with WhatsApp-first consultation and complete local SEO.",
    impact: "Built and shipped for a real client. Live at rathodandco.in with structured schema, OG tags, and canonical SEO targeting local tax-consultant searches.",
    stack: ["React", "TypeScript", "Vite"],
    systems: [
      "Service catalogue covering GST, ITR, MSME, Pvt Ltd registration, and accounting",
      "WhatsApp consultation flow for low-friction lead capture",
      "Local SEO with ProfessionalService JSON-LD, canonical, and social cards",
      "Contact, hours, and location details surfaced for walk-in clients",
    ],
    architecture: "Static-first frontend · structured service data · SEO schema · CDN-deployed",
    href: "https://www.rathodandco.in/",
    image: "/projects/rathod-co.png",
    domains: ["Client"],
    stackTags: [],
    metrics: [
      { label: "Client", value: "Real business" },
      { label: "Type", value: "Marketing site" },
      { label: "SEO", value: "Local + schema" },
      { label: "Status", value: "Live" },
    ],
  },
  {
    id: "restaurant-ms",
    year: "2026",
    title: "Restaurant Management System",
    role: "Client Operations Platform",
    problem:
      "A restaurant ran orders, billing, and menu updates on paper and ad-hoc sheets, giving staff no table view and the owner no sales data.",
    solution:
      "A management system covering table-wise orders, kitchen ticket flow, billing, and menu control with role-based staff access.",
    impact: "Done for a client. Digitized daily operations from order intake to billing and gave the owner visibility into sales and menu performance.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    systems: [
      "Table-wise order management with live status tracking",
      "Kitchen order ticket routing to kitchen staff",
      "Billing with tax breakdown and receipt generation",
      "Menu management with availability and pricing control",
      "Role-based access for owner, cashier, and floor staff",
    ],
    architecture:
      "Next.js app · Supabase Postgres with RLS · real-time order status via subscriptions",
    image: "/projects/restaurant-ms.svg",
    domains: ["Full-stack", "Client"],
    stackTags: ["Supabase", "Next.js"],
    metrics: [
      { label: "Client", value: "Delivered" },
      { label: "Modules", value: "Orders · KOT · Billing" },
      { label: "Backend", value: "Supabase" },
      { label: "Status", value: "Handed over" },
    ],
  },
  {
    id: "courier-ms",
    year: "2026",
    title: "Courier Management System",
    role: "Client Logistics Platform",
    problem:
      "A local courier service tracked consignments through registers and phone calls, with no tracking IDs, no status visibility, and manual billing.",
    solution:
      "A courier operations system for booking, tracking, branch assignment, and delivery status with automated rate calculation.",
    impact: "Done for a client. Replaced register-based tracking with a searchable system covering the full consignment lifecycle end to end.",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    systems: [
      "Consignment booking with auto-generated tracking IDs",
      "Status state machine from booked to in-transit to delivered",
      "Branch and agent assignment for multi-point routing",
      "Rate calculation by weight, distance, and service type",
      "Customer-facing tracking lookup by consignment ID",
    ],
    architecture:
      "React SPA · Supabase Postgres · FSM-driven status transitions · per-branch data scoping",
    image: "/projects/courier-ms.svg",
    domains: ["Full-stack", "Client"],
    stackTags: ["Supabase"],
    metrics: [
      { label: "Client", value: "Delivered" },
      { label: "Flow", value: "Booking to delivery" },
      { label: "Backend", value: "Supabase" },
      { label: "Status", value: "Handed over" },
    ],
  },
];

export const allDomains: Domain[] = ["AI", "SaaS", "E-commerce", "Analytics", "Full-stack", "Tools", "Client"];
export const allStackTags: StackTag[] = ["Supabase", "ML", "Payments", "Next.js", "Python"];
