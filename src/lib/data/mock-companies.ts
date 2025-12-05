/**
 * Mock company data for realistic deck analysis simulation
 */

export interface EnrichmentData {
  logo?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  crunchbase?: string;
  founders: {
    name: string;
    title: string;
    linkedin?: string;
    background: string;
  }[];
  competitors: string[];
  recentNews: {
    title: string;
    source: string;
    date: string;
    url?: string;
  }[];
  funding: {
    totalRaised: string;
    lastRound: string;
    lastRoundDate: string;
    investors: string[];
  };
  techStack?: string[];
  employeeGrowth?: string;
}

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
  enrichment?: EnrichmentData;
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
    marketSize: "TAM: $12B",
    enrichment: {
      website: "https://dataflow-ai.com",
      linkedin: "https://linkedin.com/company/dataflow-ai",
      twitter: "https://twitter.com/dataflowai",
      founders: [
        {
          name: "Sarah Chen",
          title: "CEO & Co-Founder",
          linkedin: "https://linkedin.com/in/sarahchen",
          background: "Ex-Databricks Staff Engineer, 8 years building data infrastructure"
        },
        {
          name: "Marcus Johnson",
          title: "CTO & Co-Founder",
          linkedin: "https://linkedin.com/in/marcusjohnson",
          background: "Former Google Cloud Data Engineer, PhD in Distributed Systems"
        }
      ],
      competitors: ["Fivetran", "Airbyte", "Matillion", "Stitch Data"],
      recentNews: [
        {
          title: "DataFlow AI raises $4M seed round led by Sequoia",
          source: "TechCrunch",
          date: "2024-11-15",
        },
        {
          title: "DataFlow AI announces partnership with Snowflake",
          source: "VentureBeat",
          date: "2024-10-20",
        },
        {
          title: "How DataFlow AI is revolutionizing data pipelines with AI",
          source: "Forbes",
          date: "2024-09-08",
        }
      ],
      funding: {
        totalRaised: "$4.5M",
        lastRound: "Seed",
        lastRoundDate: "Nov 2024",
        investors: ["Sequoia Capital", "Y Combinator", "Operator Partners"]
      },
      techStack: ["Python", "TypeScript", "Kubernetes", "PostgreSQL", "Apache Airflow"],
      employeeGrowth: "+60% in last 6 months"
    }
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
    marketSize: "TAM: $28B",
    enrichment: {
      website: "https://cloudsync.pro",
      linkedin: "https://linkedin.com/company/cloudsync-pro",
      twitter: "https://twitter.com/cloudsyncpro",
      founders: [
        {
          name: "James Park",
          title: "CEO & Founder",
          linkedin: "https://linkedin.com/in/jamespark",
          background: "Ex-HashiCorp Principal Engineer, 10+ years in infrastructure"
        },
        {
          name: "Lisa Martinez",
          title: "VP Engineering",
          linkedin: "https://linkedin.com/in/lisamartinez",
          background: "Former AWS Solutions Architect, DevOps expert"
        }
      ],
      competitors: ["Terraform Cloud", "Pulumi", "Spacelift", "env0"],
      recentNews: [
        {
          title: "CloudSync Pro closes $12M Series A led by Accel",
          source: "TechCrunch",
          date: "2024-08-22",
        },
        {
          title: "CloudSync Pro adds support for Azure and GCP",
          source: "The New Stack",
          date: "2024-07-10",
        }
      ],
      funding: {
        totalRaised: "$16M",
        lastRound: "Series A",
        lastRoundDate: "Aug 2024",
        investors: ["Accel", "Bessemer Venture Partners", "Bloomberg Beta"]
      },
      techStack: ["Go", "React", "Kubernetes", "Terraform", "Docker"],
      employeeGrowth: "+40% in last 6 months"
    }
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
    marketSize: "TAM: $15B",
    enrichment: {
      website: "https://finopshub.com",
      linkedin: "https://linkedin.com/company/finops-hub",
      twitter: "https://twitter.com/finopshub",
      founders: [
        {
          name: "David Kim",
          title: "CEO & Co-Founder",
          linkedin: "https://linkedin.com/in/davidkim",
          background: "Ex-Stripe Finance Lead, CPA with 12 years in FinTech"
        },
        {
          name: "Amanda Wu",
          title: "COO & Co-Founder",
          linkedin: "https://linkedin.com/in/amandawu",
          background: "Former Goldman Sachs VP, built fintech products for startups"
        }
      ],
      competitors: ["Ramp", "Brex", "Pilot", "Rho"],
      recentNews: [
        {
          title: "FinOps Hub raises $8M seed to automate startup finance",
          source: "Bloomberg",
          date: "2024-10-05",
        },
        {
          title: "FinOps Hub partners with Silicon Valley Bank",
          source: "Business Insider",
          date: "2024-09-12",
        },
        {
          title: "How FinOps Hub is saving startups $50K per month",
          source: "Forbes",
          date: "2024-08-18",
        }
      ],
      funding: {
        totalRaised: "$8.5M",
        lastRound: "Seed",
        lastRoundDate: "Oct 2024",
        investors: ["Andreessen Horowitz", "Kleiner Perkins", "SVB Capital"]
      },
      techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "Plaid"],
      employeeGrowth: "+50% in last 6 months"
    }
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
    marketSize: "TAM: $45B",
    enrichment: {
      website: "https://secureshield.io",
      linkedin: "https://linkedin.com/company/secureshield",
      twitter: "https://twitter.com/secureshield",
      crunchbase: "https://crunchbase.com/organization/secureshield",
      founders: [
        {
          name: "Dr. Rachel Kim",
          title: "CEO & Founder",
          linkedin: "https://linkedin.com/in/rachelkim",
          background: "Ex-Microsoft Security Principal, PhD in ML from Stanford"
        },
        {
          name: "Tom Anderson",
          title: "CTO & Co-Founder",
          linkedin: "https://linkedin.com/in/tomanderson",
          background: "Former Palantir Staff Engineer, built threat detection systems"
        },
        {
          name: "Jennifer Lee",
          title: "VP Product",
          linkedin: "https://linkedin.com/in/jenniferlee",
          background: "Ex-CrowdStrike Product Lead, 15 years in cybersecurity"
        }
      ],
      competitors: ["CrowdStrike", "SentinelOne", "Palo Alto Networks", "Darktrace"],
      recentNews: [
        {
          title: "SecureShield raises $18M Series A from Lightspeed Venture",
          source: "TechCrunch",
          date: "2024-11-01",
        },
        {
          title: "SecureShield achieves SOC 2 Type II certification",
          source: "SecurityWeek",
          date: "2024-09-25",
        },
        {
          title: "Fortune 500 companies adopting SecureShield's AI platform",
          source: "Forbes",
          date: "2024-08-30",
        },
        {
          title: "SecureShield detects zero-day exploit in major breach",
          source: "Wired",
          date: "2024-07-15",
        }
      ],
      funding: {
        totalRaised: "$23M",
        lastRound: "Series A",
        lastRoundDate: "Nov 2024",
        investors: ["Lightspeed Venture Partners", "Greylock Partners", "Cyberstarts"]
      },
      techStack: ["Python", "Go", "React", "TensorFlow", "Elasticsearch", "Kafka"],
      employeeGrowth: "+75% in last 6 months"
    }
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
