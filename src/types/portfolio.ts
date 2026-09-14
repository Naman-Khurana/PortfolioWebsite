export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  tagline: string;
  description: string;
  technologies: string[];
  metrics?: string[];
  focus: string;
  reliability: string;
  topology: {
    title: string;
    sourceLabel: string;
    statusLabel: string;
    details: [string, string, string, string];
  };
  link?: string;
  github?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
  keyHighlight?: string;
}

export interface CodingProfile {
  platform: string;
  handle: string;
  url: string;
  stats?: string;
}

export interface ProblemSolvingMetric {
  label: string;
  value: string;
}

export interface ProblemSolvingPlatform {
  id: string;
  name: string;
  handle: string;
  url: string;
  badge?: string;
  statusText?: string;
  metrics?: ProblemSolvingMetric[];
}

export interface ProblemSolvingData {
  topics: string[];
  platforms: ProblemSolvingPlatform[];
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  tagline: string;
  introduction: string;
}

export interface PortfolioData {
  identity: {
    name: string;
    role: string;
    specialization: string;
    coreStack: string[];
    bioShort: string;
    location: string;
    aboutNodes: {
      eyebrow: string;
      title: string;
      description: string;
    }[];
  };
  checkpoints: {
    id: string;
    number: string;
    title: string;
    range: [number, number];
    activeInPhase1: boolean;
  }[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  skills: {
    category: string;
    items: string[];
    capability: string;
    metric: string;
  }[];
  codingProfiles: CodingProfile[];
  problemSolving?: ProblemSolvingData & { philosophy: string };
  contact: ContactInfo;
}
