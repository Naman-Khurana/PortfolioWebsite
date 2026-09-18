import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  // ================================================================
  // SECTION: Phase01 Hero + Phase02AboutWall ("About Me" satellite nodes)
  // - name/role/coreStack/bioShort/location -> Phase01 hero intro
  // - aboutNodes[]      -> the satellite boxes around the gateway node.
  //                        Any number of entries works (Phase02AboutWall
  //                        auto-positions them on a circle and cycles
  //                        colors) — just add/remove entries here.
  // - aboutSubtitle     -> optional. Text under the "System Philosophy ·
  //                        Architecture Wall" header. Falls back to
  //                        bioShort if omitted.
  // ================================================================
  identity: {
    name: "Naman Khurana",
    role: "Software Engineer",
    category: "SOFTWARE & SYSTEMS",
    specialization: "Distributed Systems & Robust API Architecture",
    coreStack: ["Java", "Spring Boot", "PostgreSQL"],
    bioShort:
      "A backend-focused software engineer who enjoys building reliable systems, APIs, and data-driven applications.",
    location: "India",
    aboutSubtitle: "Turning complex problems into reliable, maintainable software.",
    aboutNodes: [
      {
        eyebrow: "NODE // 01 · ENGINEERING",
        title: "Building Reliable Software",
        description:
          "I focus on building software that is reliable, maintainable, and built to handle real-world use - from designing APIs and data flows to making sure systems behave predictably as they grow.",
      },

      {
        eyebrow: "NODE // 02 · SYSTEMS",
        title: "Thinking Beyond the Code",
        description:
          "I care about how the pieces fit together - architecture, data, APIs, infrastructure, and the trade-offs between them. I aim for systems that are clear enough to understand and flexible enough to evolve.",
      },

      {
        eyebrow: "NODE // 03 · DELIVERY",
        title: "Turning Ideas Into Products",
        description:
          "I like taking a problem from idea to working software - designing the system, building the core functionality, connecting the pieces, and iterating until it becomes something people can actually use.",
      },
    ],
  },

  // ================================================================
  // SECTION: Scroll timeline / left-hand progress rail (all phases)
  // Drives the section labels and 0–1 scroll-progress ranges used by
  // every Phase0X component's useTransform calls.
  // ================================================================
  checkpoints: [
    { id: "intro", number: "01", title: "Introduction", range: [0.0, 0.45], activeInPhase1: true },
    { id: "about", number: "02", title: "About Me", range: [0.45, 0.62], activeInPhase1: true },
    { id: "projects", number: "03", title: "Projects", range: [0.62, 0.77], activeInPhase1: true },
    { id: "experience", number: "04", title: "Experience", range: [0.77, 0.88], activeInPhase1: true },
    { id: "engineering", number: "05", title: "Engineering", range: [0.88, 0.94], activeInPhase1: true },
    { id: "problem-solving", number: "06", title: "Problem Solving", range: [0.94, 0.98], activeInPhase1: true },
    { id: "connect", number: "07", title: "Connect", range: [0.98, 1.0], activeInPhase1: true },
  ],

  // ================================================================
  // SECTION: Phase03ProjectsWorkspace ("DEPLOYED SYSTEMS" panel)
  // One entry per project card. `topology` feeds the right-hand
  // "// TECH TOPOLOGY" panel for that project.
  // ================================================================
  projects: [
    {
      id: "wealth-tracker",
      title: "Wealth Tracker",
      role: "Backend Lead / Architect",
      tagline: "Full-stack investment & net-worth tracking platform",
      description:
        "A Spring Boot backend paired with a Next.js frontend for tracking investments, assets, and net worth over time, with secure auth and role-gated access.",
      technologies: ["Java", "Spring Boot", "Next.js", "JWT", "RBAC", "React Query", "Chart.js", "Docker Compose"],
      metrics: ["JWT refresh-token rotation", "Role-based access control"],
      focus: "Clean API layering using MapStruct for DTO mapping and the Builder pattern for complex object construction.",
      reliability: "Refresh-token rotation for session security, with RBAC-gated endpoints across roles.",
      topology: { title: "AUTH & DATA FLOW", sourceLabel: "SPRING_BOOT // JWT_REFRESH", statusLabel: "RBAC: ENFORCED", details: ["Spring Boot + Next.js", "JWT Refresh Rotation", "MapStruct DTO Mapping", "Dockerized via Compose"] },
      github: "https://github.com/Naman-Khurana/wealthTrackerProject",
    },
    {
      id: "campushire",
      title: "Placement Portal",
      role: "Full-Stack Engineer",
      tagline: "Campus placement portal for the full recruitment lifecycle",
      description:
        "Built as the IITM MAD 2 capstone project — manages campus placements end-to-end, from job postings and applications to interview scheduling and candidate tracking, with role-based views for students, recruiters, and admins.",
      technologies: ["Vue.js", "Flask", "SQLAlchemy", "SQLite", "Redis", "Celery", "Pinia", "Bootstrap"],
      metrics: [],
      focus: "Role-based dashboards (student / recruiter / admin) with Celery-driven background jobs for exports and reminders.",
      reliability: "Redis-backed caching and async task queues to keep the UI responsive during bulk operations.",
      topology: { title: "RECRUITMENT PIPELINE", sourceLabel: "FLASK // ROLE_BASED_ACCESS", statusLabel: "QUEUE: CELERY", details: ["Vue.js + Flask", "SQLAlchemy ORM", "Redis + Celery Jobs", "Pinia State Management"] },
      github: "https://github.com/Naman-Khurana/placement_portal_V2",
    },
    {
      id: "nexaserve-ai",
      title: "NexaServe AI",
      role: "AI & Backend Engineer",
      tagline: "Document-grounded AI assistant with retrieval-augmented generation",
      description:
        "A RAG-based assistant that answers questions grounded in uploaded documents (multi-PDF support), built on Flask with LangChain and FAISS for retrieval and the Gemini API for generation. Falls back gracefully when retrieval confidence is low, instead of guessing.",
      technologies: ["Python", "Flask", "LangChain", "FAISS", "Gemini API"],
      metrics: [],
      focus: "Vector similarity search over document chunks with prompt grounding to reduce hallucination.",
      reliability: "Confidence-based escalation — the assistant defers rather than answering when it isn't confident in the retrieved context.",
      topology: { title: "RAG PIPELINE", sourceLabel: "FAISS // COSINE_SIMILARITY", statusLabel: "GROUNDED: MULTI-PDF", details: ["Flask + LangChain", "FAISS Vector Store", "Gemini API Generation", "Confidence-Based Fallback"] },
      github: "https://github.com/Naman-Khurana/NexaServeAI",
    },
  ],

  // ================================================================
  // SECTION: Phase04 Experience ("PRODUCTION ENVIRONMENTS" panel)
  // One entry per job/internship.
  // ================================================================
  experience: [
    {
      company: "Onelap Telematics",
      role: "Software Engineering Intern / Backend Engineer",
      period: "Aug 2025 - Feb 2026",
      description: [
        "Debugged and resolved a silent real-time alert failure in a microservices architecture by tracing a cross-service state refresh that broadcasted to all user-owned devices instead of the triggering device.",
        "Developed a Spring Boot service to parse over 100K daily GPS records, extracting trip and stop events while effectively handling dropped packets, invalid coordinates, and offline device scenarios.",
        "Designed a fault-tolerant background recovery service that detects and recomputes missing daily data summaries on demand, ensuring 100% data completeness when scheduled cron jobs fail across services.",
        "Migrated a mobile Flutter app to a web application within an Agile sprint cycle, integrating over 6 web-compatible APIs (Google Maps JS, Firebase Web, WebSocket) to replace incompatible plugins, successfully shipping to production.",
        "Redesigned device troubleshooting logic by mapping unhandled failure states, resulting in a ~70% reduction in escalation rate.",
        "Reduced over 2 redundant API calls per session by replacing timer-based polling with state-driven triggers.",

      ],
      technologies: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Flutter", "Dart"],
      keyHighlight: "Optimized geospatial query processing on millions of GPS coordinates.",
    },
  ],

  // ================================================================
  // SECTION: Phase05Engineering ("SYSTEM TOPOLOGY MATRIX")
  // One entry per tier. Any number of entries works — Phase05Engineering
  // auto-positions them around the hub and cycles through its color
  // palette. Optional per-entry overrides (both default from `category`
  // and `items` if omitted):
  //   badge?: string        -> small label under the category name
  //   streamLabel?: string  -> bottom telemetry bar text when tier is active
  // ================================================================
  skills: [
    {
      category: "Backend & Systems",
      items: ["Java", "Spring Boot", "Spring Security", "RESTful APIs", "Microservices Architecture", "Python", "Flask"],
      capability: "Relational schema normalization, high-frequency caching, geospatial indexing, and ACID transaction auditing.",
      metric: "Applied on a production geospatial telemetry pipeline handling continuous GPS streams.",
    },
    {
      category: "Databases & Caching",
      items: ["PostgreSQL", "MySQL", "SQLAlchemy", "Redis", "JPA / Hibernate"],
      capability: "Schema design, query optimization, and caching layers across relational stores.",
      metric: "Used across production (PostgreSQL) and portfolio (MySQL/SQLite) projects.",
    },
    {
      category: "DevOps & Infrastructure",
      items: ["Docker", "Git", "CI/CD Pipelines", "Linux"],
      capability: "Containerized application lifecycle, multi-stage Docker builds, and reproducible dev environments.",
      metric: "Docker Compose used for local multi-service orchestration on portfolio projects.",
    },
    {
      category: "Frontend & Full-Stack",
      items: ["Next.js", "Vue.js", "React Query", "Pinia", "Chart.js", "Bootstrap", "HTML", "CSS", "Tailwind CSS", "JavaScript", "TypeScript"],
      capability: "Pairing backend services with responsive, state-managed frontends to ship complete products, not just APIs.",
      metric: "Shipped end-to-end on Wealth Tracker (Next.js) and CampusHire (Vue.js + Pinia).",
    },
  ],

  // ================================================================
  // SECTION: legacy coding-profile links (kept in sync with
  // problemSolving.platforms below — some older component may still
  // read this array directly for icon links, e.g. in the footer/hero).
  // ================================================================
  codingProfiles: [
    {
      platform: "LeetCode",
      handle: "naman2004",
      url: "https://leetcode.com/u/naman2004",
    },
    {
      platform: "Codeforces",
      handle: "NamanKhurana",
      url: "https://codeforces.com/profile/NamanKhurana",
    },
    {
      platform: "AlgoZenith",
      handle: "Naman_Khurana",
      url: "https://maang.in/users/Naman_Khurana",
    },
  ],

  // ================================================================
  // SECTION: Phase06 Problem Solving ("ALGORITHMIC_GRAPH" panel)
  // philosophy/topics -> left-hand blurb + topic tags
  // platforms[]       -> one card per practice platform
  // ================================================================
  problemSolving: {
    philosophy: "Decompose high-dimension complexity into atomic subproblems. Rigorously optimize invariant bounds (O(N log N) / O(V+E)), stress-test edge conditions, and enforce deterministic correctness.",
    topics: [
      "Dynamic Programming",
      "Graph Theory & Trees",
      "Advanced Data Structures",
      "Algorithmic Complexity & Optimization",
      "System Design & Scalability",
    ],
    platforms: [
      {
        id: "leetcode",
        name: "LeetCode",
        handle: "naman2004",
        url: "https://leetcode.com/u/naman2004",
        statusText: "Algorithmic Pattern Mastery",
        metrics: [],
      },
      {
        id: "codeforces",
        name: "Codeforces",
        handle: "NamanKhurana",
        url: "https://codeforces.com/profile/NamanKhurana",
        badge: "COMPETITIVE PROGRAMMING",
        statusText: "Time-Constrained Problem Solving",
        metrics: [],
      },
      {
        id: "algozenith",
        name: "AlgoZenith / MAANG",
        handle: "Naman_Khurana",
        url: "https://maang.in/users/Naman_Khurana",
        badge: "ADVANCED DSA BOOTCAMP",
        statusText: "Rigorous Interview/DSA/CP Preparation",
        metrics: [],
      },
    ],
  },

  // ================================================================
  // SECTION: Phase07 Connect (footer / contact panel)
  // ================================================================
  contact: {
    email: "namankhurana.dev@gmail.com",
    github: "https://www.github.com/naman-khurana",
    linkedin: "https://www.linkedin.com/in/naman-khurana-a444a6204/",
    resumeUrl: "/resume.pdf",
    tagline: "Let's build something amazing.",
    introduction: "Architecting high-throughput backends, scalable APIs, and distributed systems. Let's build together.",
  },
};