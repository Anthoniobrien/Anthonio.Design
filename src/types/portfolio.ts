export type DeviceType = 'iphone' | 'pixel' | 'tablet' | 'desktop';

export type InspectionMode = 'interactive' | 'hotspots' | 'redlines' | 'task';

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  duration: string;
  client: string;
  role: string;
  team: string;
  impactMetrics: {
    label: string;
    value: string;
    context: string;
  }[];
  heroSummary: string;
  problem: {
    context: string;
    painPoints: string[];
    userQuote: {
      text: string;
      author: string;
      role: string;
    };
  };
  research: {
    methodology: string;
    participants: string;
    findings: {
      title: string;
      description: string;
    }[];
  };
  solution: {
    summary: string;
    corePillars: {
      title: string;
      description: string;
    }[];
  };
  designSystem: {
    typography: { name: string; role: string; sample: string }[];
    colors: { name: string; hex: string; role: string }[];
    spacingScale: string[];
  };
  prototypeId: 'aura-pay' | 'pulse-health' | 'nova-workspace';
  tags: string[];
}

export interface DesignTokenGroup {
  category: string;
  tokens: {
    name: string;
    value: string;
    usage: string;
    preview?: string;
  }[];
}

export interface UsabilityChallenge {
  id: string;
  prototypeId: 'aura-pay' | 'pulse-health' | 'nova-workspace';
  title: string;
  goal: string;
  steps: string[];
  successCondition: string;
}
