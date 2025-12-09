import { InvestmentThesis } from '../types';

/**
 * Mock investment thesis for prototype
 */
export const mockThesis: InvestmentThesis = {
  id: 'thesis-1',
  fundId: 'fund-1',
  version: 1,
  focusStatement: 'We invest in B2B SaaS companies at Series A and Series B stages, with strong product-market fit and recurring revenue between $1M-$10M ARR. Our focus is on enterprise software that solves critical workflow problems for technical teams.',
  hardConstraints: {
    stages: ['Series A', 'Series B'],
    geographies: ['United States', 'Canada'],
    checkSizeMin: '$3M',
    checkSizeMax: '$15M',
    excludedSectors: ['Crypto', 'Consumer Hardware', 'Gaming', 'Gambling']
  },
  softPreferences: {
    teamWeight: 40,
    marketWeight: 25,
    tractionWeight: 25,
    productWeight: 10,
    sectorAppetites: [
      { sector: 'B2B SaaS', appetite: 'high' },
      { sector: 'Dev Tools', appetite: 'high' },
      { sector: 'Cybersecurity', appetite: 'high' },
      { sector: 'FinTech', appetite: 'medium' },
      { sector: 'HealthTech', appetite: 'medium' },
      { sector: 'EdTech', appetite: 'low' },
    ],
    businessModels: ['SaaS', 'Platform', 'API-first']
  },
  antiPortfolio: 'We avoid companies with low switching costs, heavy services components, or reliance on a single customer. We pass on marketplaces without network effects and consumer products without viral growth.',
  blocks: [
    {
      id: 'block-1',
      type: 'focus',
      title: 'Investment Focus',
      content: 'We invest in B2B SaaS companies at Series A and Series B stages, with strong product-market fit and recurring revenue between $1M-$10M ARR. Our focus is on enterprise software that solves critical workflow problems for technical teams.',
      order: 1,
      lastEditedBy: {
        name: 'AI Associate',
        isAi: true,
        timestamp: new Date().toISOString(),
      }
    },
    {
      id: 'block-2',
      type: 'constraints',
      title: 'Hard Constraints',
      content: JSON.stringify({
        stages: ['Series A', 'Series B'],
        geographies: ['United States', 'Canada'],
        checkSize: '$3M - $15M',
        excluded: ['Crypto', 'Consumer Hardware', 'Gaming', 'Gambling']
      }),
      order: 2,
    },
    {
      id: 'block-3',
      type: 'preferences',
      title: 'Investment Criteria',
      content: JSON.stringify({
        weights: {
          team: 40,
          market: 25,
          traction: 25,
          product: 10
        }
      }),
      order: 3,
    },
    {
      id: 'block-4',
      type: 'sectors',
      title: 'Sector Preferences',
      content: JSON.stringify({
        high: ['B2B SaaS', 'Dev Tools', 'Cybersecurity'],
        medium: ['FinTech', 'HealthTech'],
        low: ['EdTech'],
        businessModels: ['SaaS', 'Platform', 'API-first']
      }),
      order: 4,
    },
    {
      id: 'block-5',
      type: 'anti_portfolio',
      title: 'Anti-Portfolio Patterns',
      content: 'We avoid companies with low switching costs, heavy services components, or reliance on a single customer. We pass on marketplaces without network effects and consumer products without viral growth.',
      order: 5,
      lastEditedBy: {
        name: 'AI Associate',
        isAi: true,
        timestamp: new Date().toISOString(),
      }
    },
  ],
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
  updatedAt: new Date().toISOString(),
  updatedBy: {
    name: 'AI Associate',
    isAi: true,
  }
};

/**
 * Get the current investment thesis
 */
export function getThesis(): InvestmentThesis {
  // In prototype, return mock thesis
  // In production, this would fetch from database
  return mockThesis;
}

/**
 * Update thesis (mock implementation)
 */
export function updateThesis(updates: Partial<InvestmentThesis>): InvestmentThesis {
  // In prototype, merge with mock data
  // In production, this would save to database
  return {
    ...mockThesis,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Update a specific thesis block
 */
export function updateThesisBlock(blockId: string, content: string, isAi: boolean = false): boolean {
  const block = mockThesis.blocks.find(b => b.id === blockId);
  if (!block) return false;

  block.content = content;
  block.lastEditedBy = {
    name: isAi ? 'AI Associate' : 'You',
    isAi: isAi,
    timestamp: new Date().toISOString(),
  };

  mockThesis.updatedAt = new Date().toISOString();
  mockThesis.updatedBy = {
    name: isAi ? 'AI Associate' : 'You',
    isAi: isAi,
  };

  // Dispatch custom event to notify listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('thesis-updated', {
      detail: { blockId, content }
    }));
  }

  return true;
}
