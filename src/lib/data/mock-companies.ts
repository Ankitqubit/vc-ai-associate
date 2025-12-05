/**
 * Mock company data for realistic deck analysis simulation
 */

export interface MockCompany {
  name: string;
  description: string;
  industry: string;
  mrr: string;
  arr?: string;
  teamSize: number;
  location: string;
  founded: string;
  stage: string;
  fitScore: number;
  problem: string;
  solution: string;
  traction: string;
  marketSize: string;
}

export const MOCK_COMPANIES: MockCompany[] = [
  {
    name: "DataFlow AI",
    description: "Real-time data pipeline platform for modern data teams",
    industry: "B2B SaaS - Data Infrastructure",
    mrr: "$180K",
    arr: "$2.2M",
    teamSize: 8,
    location: "San Francisco, CA",
    founded: "2023",
    stage: "Seed",
    fitScore: 85,
    problem: "Data teams spend 60% of time on pipeline maintenance",
    solution: "No-code data pipeline builder with AI-powered optimization",
    traction: "15 paying customers, 120% NRR",
    marketSize: "TAM: $12B"
  },
  {
    name: "CloudSync Pro",
    description: "DevOps automation platform for cloud infrastructure",
    industry: "B2B SaaS - DevOps",
    mrr: "$450K",
    arr: "$5.4M",
    teamSize: 15,
    location: "Austin, TX",
    founded: "2022",
    stage: "Series A",
    fitScore: 78,
    problem: "DevOps teams manually manage 100+ cloud resources",
    solution: "Unified platform for multi-cloud orchestration and monitoring",
    traction: "42 enterprise customers, $1.2M ARR growth in Q4",
    marketSize: "TAM: $28B"
  },
  {
    name: "HealthTrack",
    description: "AI-powered patient engagement platform for healthcare providers",
    industry: "Healthcare Tech - Patient Engagement",
    mrr: "$95K",
    arr: "$1.1M",
    teamSize: 6,
    location: "Boston, MA",
    founded: "2024",
    stage: "Pre-Seed",
    fitScore: 72,
    problem: "40% patient no-show rate costs healthcare $150B annually",
    solution: "SMS + AI reminders with personalized scheduling",
    traction: "8 clinics, 2,400 patients, 22% no-show reduction",
    marketSize: "TAM: $8B"
  },
  {
    name: "FinOps Hub",
    description: "Financial operations platform for high-growth startups",
    industry: "B2B SaaS - FinTech",
    mrr: "$320K",
    arr: "$3.8M",
    teamSize: 12,
    location: "New York, NY",
    founded: "2022",
    stage: "Seed",
    fitScore: 88,
    problem: "Startups waste $50K+/month on manual financial operations",
    solution: "Automated AP/AR, forecasting, and compliance in one platform",
    traction: "65 customers, 30% MoM growth, partnerships with 3 major banks",
    marketSize: "TAM: $15B"
  },
  {
    name: "EduLearn",
    description: "Personalized learning platform powered by adaptive AI",
    industry: "EdTech - K-12 Education",
    mrr: "$65K",
    arr: "$780K",
    teamSize: 5,
    location: "Denver, CO",
    founded: "2023",
    stage: "Pre-Seed",
    fitScore: 68,
    problem: "One-size-fits-all curriculum leaves 30% of students behind",
    solution: "AI tutor that adapts to each student's learning style",
    traction: "12 schools, 3,500 students, 18% improvement in test scores",
    marketSize: "TAM: $6B"
  },
  {
    name: "SecureShield",
    description: "Enterprise cybersecurity platform with AI threat detection",
    industry: "B2B SaaS - Cybersecurity",
    mrr: "$580K",
    arr: "$7.0M",
    teamSize: 22,
    location: "Seattle, WA",
    founded: "2021",
    stage: "Series A",
    fitScore: 91,
    problem: "Enterprises take 200+ days to detect security breaches",
    solution: "Real-time AI threat detection and automated response",
    traction: "28 enterprise customers, SOC 2 certified, 99.9% threat detection",
    marketSize: "TAM: $45B"
  },
  {
    name: "FarmTech Solutions",
    description: "IoT sensors and AI analytics for precision agriculture",
    industry: "AgTech - Precision Farming",
    mrr: "$125K",
    arr: "$1.5M",
    teamSize: 10,
    location: "Des Moines, IA",
    founded: "2023",
    stage: "Seed",
    fitScore: 65,
    problem: "Farmers lose 20% of yield due to inefficient resource management",
    solution: "Soil sensors + weather AI for optimized irrigation and fertilization",
    traction: "140 farms, 15K acres monitored, 12% yield increase",
    marketSize: "TAM: $10B"
  },
  {
    name: "RecruitBot",
    description: "AI recruiting assistant for technical hiring",
    industry: "B2B SaaS - HR Tech",
    mrr: "$210K",
    arr: "$2.5M",
    teamSize: 9,
    location: "Palo Alto, CA",
    founded: "2023",
    stage: "Seed",
    fitScore: 82,
    problem: "Companies spend 40+ hours per technical hire",
    solution: "AI screens candidates, schedules interviews, generates scorecards",
    traction: "85 companies, 1,200 hires made, 60% time reduction",
    marketSize: "TAM: $18B"
  },
  {
    name: "LogiTrack",
    description: "Supply chain visibility platform for e-commerce brands",
    industry: "B2B SaaS - Supply Chain",
    mrr: "$395K",
    arr: "$4.7M",
    teamSize: 14,
    location: "Chicago, IL",
    founded: "2022",
    stage: "Seed",
    fitScore: 76,
    problem: "E-commerce brands have zero visibility into supplier delays",
    solution: "Real-time tracking across 50+ carriers with predictive ETA",
    traction: "52 brands, tracking 500K shipments/month, 25% reduction in delays",
    marketSize: "TAM: $22B"
  },
  {
    name: "MarketMind",
    description: "AI-powered market research platform for product teams",
    industry: "B2B SaaS - Market Intelligence",
    mrr: "$155K",
    arr: "$1.9M",
    teamSize: 7,
    location: "San Francisco, CA",
    founded: "2024",
    stage: "Pre-Seed",
    fitScore: 79,
    problem: "Product teams spend $100K+ on slow, manual market research",
    solution: "AI analyzes 10M+ data sources to deliver insights in 24 hours",
    traction: "24 customers, partnerships with 2 Fortune 500 companies",
    marketSize: "TAM: $9B"
  }
];

/**
 * Get a random company from the mock data
 */
export function getRandomCompany(): MockCompany {
  const randomIndex = Math.floor(Math.random() * MOCK_COMPANIES.length);
  return MOCK_COMPANIES[randomIndex];
}

/**
 * Get a company by name (partial match)
 */
export function getCompanyByName(searchName: string): MockCompany | undefined {
  const lowerSearch = searchName.toLowerCase();
  return MOCK_COMPANIES.find(c =>
    c.name.toLowerCase().includes(lowerSearch)
  );
}

/**
 * Generate varied fit score reasoning based on score
 */
export function generateFitScoreReason(company: MockCompany): string {
  const { fitScore, industry, stage, teamSize } = company;

  if (fitScore >= 85) {
    return `Excellent fit. ${industry} aligns perfectly with thesis, ${stage} stage matches target, and team of ${teamSize} has strong execution capacity.`;
  } else if (fitScore >= 75) {
    return `Strong fit. ${industry} is within focus area, ${stage} stage is appropriate, though team size of ${teamSize} could be larger for scale.`;
  } else if (fitScore >= 65) {
    return `Moderate fit. ${industry} is adjacent to thesis focus, ${stage} stage acceptable, team of ${teamSize} may need reinforcement.`;
  } else {
    return `Weaker fit. ${industry} outside core focus, ${stage} stage early, and team of ${teamSize} needs significant growth.`;
  }
}
