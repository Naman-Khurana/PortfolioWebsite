export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  tagline: string;
  description: string;
  technologies: string[];
  metrics?: string[];
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

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  tagline: string;
}

export interface PortfolioData {
  identity: {
    name: string;
    role: string;
    specialization: string;
    coreStack: string[];
    bioShort: string;
    location: string;
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
  }[];
  codingProfiles: CodingProfile[];
  contact: ContactInfo;
}
