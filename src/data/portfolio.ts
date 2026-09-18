import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  identity: {
    name: "Naman Khurana",
    role: "Backend Software Engineer",
    specialization: "Distributed Systems & Robust API Architecture",
    coreStack: ["Java", "Spring Boot", "PostgreSQL"],
    bioShort:
      "Crafting high-throughput backend services, resilient data pipelines, and scalable architectures.",
    location: "India",
    aboutNodes: [
      {
        eyebrow: "NODE // 01 · SYSTEMS",
        title: "High-Throughput Core",
        description: "Low-latency services, spatial telemetry pipelines, and ACID-compliant transactional backends in Java & Spring Boot.",
      },
      {
        eyebrow: "NODE // 02 · ARCHITECTURE",
        title: "Simplifying Complexity",
        description: "Decomposing distributed friction into modular microservices with strict separation of concerns and robust indexing.",
      },
      {
        eyebrow: "NODE // 03 · AI & PIPELINES",
        title: "Grounding & Vector Retrieval",
        description: "Integrating RAG pipelines and pgvector search with verified grounding to automate enterprise workflows.",
      },
    ],
  },
  checkpoints: [
    { id: "intro", number: "01", title: "Introduction", range: [0.0, 0.45], activeInPhase1: true },
    { id: "about", number: "02", title: "About Me", range: [0.45, 0.62], activeInPhase1: true },
    { id: "projects", number: "03", title: "Projects", range: [0.62, 0.77], activeInPhase1: true },
    { id: "experience", number: "04", title: "Experience", range: [0.77, 0.88], activeInPhase1: true },
    { id: "engineering", number: "05", title: "Engineering", range: [0.88, 0.94], activeInPhase1: true },
    { id: "problem-solving", number: "06", title: "Problem Solving", range: [0.94, 0.98], activeInPhase1: true },
    { id: "connect", number: "07", title: "Connect", range: [0.98, 1.0], activeInPhase1: true },
  ],
  projects: [
    {
      id: "wealth-tracker",
      title: "Wealth Tracker",
      role: "Backend Lead / Architect",
      tagline: "Backend-focused financial tracking and portfolio analytics platform",
      description:
        "High-performance asset tracking system built for granular portfolio computation and transaction auditing.",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker"],
      metrics: ["Sub-50ms query latency", "ACID compliant ledger"],
      focus: "High-concurrency data models, transaction isolation, and modular REST microservices.",
      reliability: "Resilient error propagation, query indexing, and verifiable ledger contracts.",
      topology: { title: "ACID FINANCIAL LEDGER", sourceLabel: "LEDGER_ENGINE // SERIALIZABLE", statusLabel: "AUDIT_TRAIL: ACTIVE", details: ["Sub-50ms Query", "PostgreSQL + Redis", "ACID Ledger Compliant", "Dockerized Lifecycle"] },
      github: "https://github.com/namankhurana",
    },
    {
      id: "placement-portal",
      title: "Placement Portal",
      role: "Full-Stack Engineer",
      tagline: "Comprehensive recruitment lifecycle & candidate management platform",
      description:
        "Engineered role-based access, automated interview scheduling pipelines, and real-time candidate evaluation flows.",
      technologies: ["Java", "Spring Security", "MySQL", "React", "REST APIs"],
      metrics: ["Over 2,000+ candidate applications handled"],
      focus: "Role-based access security, candidate state machines, and evaluation pipelines.",
      reliability: "Transactional consistency during high-volume interview schedule dispatches.",
      topology: { title: "RECRUITMENT PIPELINE", sourceLabel: "AUTH_RBAC // SPRING_SECURITY", statusLabel: "PIPELINE: REAL-TIME", details: ["<30ms REST API", "MySQL Enterprise", "Role-Based Token Auth", "Dockerized Lifecycle"] },
      github: "https://github.com/namankhurana",
    },
    {
      id: "ai-customer-service",
      title: "AI Customer Service / RAG System",
      role: "AI & Backend Engineer",
      tagline: "Enterprise contextual retrieval-augmented generation engine",
      description:
        "Vector search engine integrated with customer support workflows to autonomously resolve complex queries with verified grounding.",
      technologies: ["Python", "FastAPI", "PostgreSQL pgvector", "LangChain", "Docker"],
      metrics: ["70% reduction in first-response escalation time"],
      focus: "Dense vector similarity search, context grounding, and low-latency inference dispatch.",
      reliability: "Anti-hallucination verification boundaries and source chunk citation grounding.",
      topology: { title: "VECTOR RAG ENGINE", sourceLabel: "PGVECTOR // COSINE_SIMILARITY", statusLabel: "GROUNDED: VERIFIED", details: ["<120ms Vector Search", "pgvector Embeddings", "Context-Bound Citations", "Dockerized Lifecycle"] },
      github: "https://github.com/namankhurana",
    },
  ],
  experience: [
    {
      company: "Onelap Telematics",
      role: "Software Engineering Intern / Backend Engineer",
      period: "Aug 2025 - Feb 2026",
      description: [
        "Architected scalable telematics telemetry processors handling continuous GPS data streams.",
        "Implemented trip and stoppage detection algorithms with robust spatial indexing.",

      ],
      technologies: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Flutter", "Dart"],
      keyHighlight: "Optimized geospatial query processing on millions of GPS coordinates.",
    },
  ],
  skills: [
    {
      category: "Backend & Systems",
      items: ["Java", "Spring Boot", "Spring Security", "RESTful APIs", "Microservices Architecture"],
      capability: "Relational schema normalization, high-frequency caching, geospatial indexing, and ACID transaction auditing.",
      metric: "Sub-50ms query latency on complex analytical joins with connection pooling optimization.",
    },
    {
      category: "Databases & Caching",
      items: ["PostgreSQL", "MySQL", "Redis", "JPA / Hibernate", "Database Optimization"],
      capability: "Decoupled REST microservices, asynchronous message queues, high-throughput RPC endpoints, and secure auth layers.",
      metric: "Concurrent request handling with thread-safe execution and resilient backpressure.",
    },
    {
      category: "DevOps & Infrastructure",
      items: ["Docker", "Git", "CI/CD Pipelines", "Linux", "Nginx"],
      capability: "Containerized application lifecycle, multi-stage Docker builds, reproducible CI/CD pipelines, and reverse proxies.",
      metric: "Zero-downtime deployment workflows with immutable container tagging and Linux hardening.",
    },
    {
      category: "Methodologies & Concepts",
      items: ["Data Structures & Algorithms", "System Design", "RAG & Vector Search", "Clean Architecture"],
      capability: "Granular computational efficiency, vector similarity search, modular domain design, and resilient failure isolation.",
      metric: "Context-aware vector embeddings with optimized cosine similarity indexing.",
    },
  ],
  codingProfiles: [
    {
      platform: "LeetCode",
      handle: "namankhurana",
      url: "https://leetcode.com",
    },
    {
      platform: "Codeforces",
      handle: "namankhurana",
      url: "https://codeforces.com",
    },
    {
      platform: "AlgoZenith",
      handle: "namankhurana",
      url: "https://algozenith.com",
    },
  ],
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
  contact: {
    email: "namankhurana.dev@gmail.com",
    github: "https://www.github.com/naman-khurana",
    linkedin: "https://www.linkedin.com/in/naman-khurana-a444a6204/",
    resumeUrl: "/resume.pdf",
    tagline: "Let's build something amazing.",
    introduction: "Architecting high-throughput backends, scalable APIs, and distributed systems. Let's build together.",
  },
};
