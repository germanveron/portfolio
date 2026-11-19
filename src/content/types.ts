import type { ImageMetadata } from 'astro';

export type Lang = 'es' | 'en';
export type SectionKey = 'top' | 'ai' | 'exp' | 'tools' | 'about' | 'contact';

export interface Step { title: string; text: string }

export interface Evidence {
  /** Real image, or omitted while the capture is pending */
  image?: ImageMetadata;
  caption: string;
}

export interface Case {
  id: string; // same in both languages, used as URL anchor
  kind: 'product' | 'flow';
  theme: 'black' | 'graphite' | 'steel' | 'mist';
  title: string;
  tagline: string;
  link?: string;
  shot?: ImageMetadata;
  shotAlt?: string;
  /** Phone app: screenshots shown in phone frames (the middle one is the cover) */
  device?: 'browser' | 'phone';
  phones?: { image: ImageMetadata; alt: string }[];
  miniFlow?: string[];
  feeds?: { text: string; target: string; label: string };
  what: string;
  problem: string;
  audience: string;
  built: string;
  stack: string;
  delivered: string[];
  flow?: { title: string; steps: Step[] };
  evals?: { title: string; text: string; pending?: string; result?: string };
  evidence: Evidence[];
}

export interface Role { title: string; period: string; scale?: string; achievements: string[] }
export interface Company { id: string; name: string; context: string; roles: Role[] }
export interface EarlierRole { name: string; role: string; period: string; note?: string }

export interface ToolItem { name: string; icon?: string; use: string }
export interface ToolGroup { title: string; items: ToolItem[] }

export interface Site {
  lang: Lang;
  htmlLang: string;
  meta: { title: string; description: string };
  ids: Record<SectionKey, string>;
  nav: {
    label: string;
    items: { key: SectionKey; label: string }[];
    menu: string;
    close: string;
    language: string;
    skip: string;
  };
  intro: { name: string; title: string; lead: string; ctaCases: string; ctaCv: string; location: string };
  ai: { title: string; lead: string };
  cases: Case[];
  ui: {
    open: string;
    close: string;
    openApp: string;
    what: string;
    problem: string;
    audience: string;
    built: string;
    stack: string;
    delivered: string;
    evidence: string;
    pendingShot: string;
    prevStep: string;
    nextStep: string;
    stepOf: (n: number, total: number) => string;
    prevImage: string;
    nextImage: string;
    caseDetail: (title: string) => string;
    back: string;
  };
  exp: {
    title: string;
    lead: string;
    logosLabel: string;
    logosPrev: string;
    logosNext: string;
    earlierTitle: string;
    companies: Company[];
    earlier: EarlierRole[];
  };
  tools: { title: string; lead: string; groups: ToolGroup[] };
  about: {
    title: string;
    photoPending: string;
    intro: string;
    blocks: { title: string; text: string }[];
    facts: { label: string; value: string }[];
    certsTitle: string;
    certs: string[];
  };
  contact: {
    title: string;
    text: string;
    mail: string;
    cvEs: string;
    cvEn: string;
  };
  footer: { built: string };
}
