export type ProjectCategory =
  | "All"
  | "AI"
  | "3D"
  | "Accessibility"
  | "Agri-Tech"
  | "Web3"
  | "Full-Stack"
  | "Design";

export interface ProjectLinks {
  live?: string;
  github?: string;
  frontend?: string;
  backend?: string;
  demoVideo?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory[];
  tagline: string;
  problem: string;
  solution: string;
  impact?: string;
  role: string;
  team?: string;
  stack: string[];
  links: ProjectLinks;
  featured: boolean;
  awardBadge?: string;
  architectureDiagram?: string;
  highlights?: string[];
  imagePlaceholderText?: string;
  accentColor?: string;
  isEnriched?: boolean;
  todoNote?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  period: string;
  award?: string;
  bullets: string[];
  certificateUrl?: string;
  certificateTitle?: string;
  techStack?: string[];
  isTodo?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  statNumber?: string;
  statLabel?: string;
  description: string;
  badge?: string;
  iconName: string;
}

export interface SkillItem {
  name: string;
  level?: "Expert" | "Proficient" | "Exploring";
  iconTag?: string;
  color?: string;
}

export interface SkillCategoryGroup {
  name: string;
  description: string;
  skills: SkillItem[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  badgeText?: string;
  category: "Award" | "Internship" | "Hackathon" | "Certification";
  imagePath: string;
  caption: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Hackathons" | "Live Demos" | "Awards" | "Team Sprints" | "Builder";
  imagePath: string;
  location?: string;
  date?: string;
  event?: string;
  caption: string;
  highlightBadge?: string;
}

