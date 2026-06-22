export interface TrendPoint {
  year: string;
  demand: number;
}

export interface RoleProfile {
  name: string;
  salary: string;
  share: number;
}

export interface MarketIntelligence {
  skillName: string;
  demandScore: number;
  growthRate: string;
  openingsCount: string;
  salaryRange: string;
  roleInDemand: string;
  trendGraphData: TrendPoint[];
  topRoleProfiles: RoleProfile[];
  futureDemandInsight: string;
  keyPrerequisites: string[];
}

export type SkillCategory = 
  | 'AI & Machine Learning'
  | 'Software Development'
  | 'Cloud Computing'
  | 'Cybersecurity'
  | 'Data Engineering'
  | 'DevOps'
  | 'Mobile Development'
  | 'Product Management';

export interface PreloadedDataMap {
  [key: string]: MarketIntelligence;
}
