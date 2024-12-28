import { ClaimCard } from './ClaimCard';
import type { Meta, StoryObj } from '@storybook/react';

// Mock data
const mockCredential = {
  data: {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json'
    ],
    id: 'urn:uuid:123',
    type: ['VerifiableCredential', 'OpenBadgeCredential'],
    issuanceDate: '2024-12-27T17:43:58.457Z',
    expirationDate: '2025-12-27T17:43:58.455Z',
    credentialSubject: {
      name: 'John Doe',
      duration: '3 months',
      achievement: [{
        name: 'Leadership Excellence',
        description: 'Demonstrated exceptional leadership skills',
        criteria: {
          narrative: 'Led multiple successful team projects'
        }
      }],
      portfolio: [{
        name: 'Project Documentation',
        url: 'https://example.com/doc'
      }],
      evidenceLink: 'https://example.com/evidence'
    }
  }
};

const mockComments = [
  {
    data: {
      id: 'comment1',
      credentialSubject: {
        name: 'Jane Smith',
        howKnow: 'Worked together for 2 years',
        recommendationText: 'Excellent team player and leader',
        qualifications: 'Senior Manager',
        explainAnswer: 'Witnessed leadership abilities firsthand'
      }
    }
  }
];

// Meta configuration for the component
type ComponentMeta = Meta<typeof ClaimCard>;

const meta: ComponentMeta = {
  title: 'Components/ClaimCard',
  component: ClaimCard,
  parameters: {
    layout: 'centered',
  },
};
type Story = StoryObj<typeof meta>;

// Base story with all data
export const Default: Story = {
  args: {
    content: mockCredential,
    fileID: '123',
    pathname: '/claims',
    session: {
      accessToken: 'mock-token'
    },
    storage: {},
    fetchFileMetadata: async () => {},
    onAchievementLoad: (name) => console.log('Achievement loaded:', name)
  }
};

// Loading state
export const Loading: Story = {
  args: {
    ...Default.args,
    content: null
  }
};

// Error state
export const Error: Story = {
  args: {
    ...Default.args,
    fileID: undefined
  }
};

// View mode with recommendations
export const ViewWithRecommendations: Story = {
  args: {
    ...Default.args,
    pathname: '/view/123',
    content: {
      ...mockCredential,
      comments: mockComments
    }
  }
};

// Ask for recommendation mode
export const AskForRecommendation: Story = {
  args: {
    ...Default.args,
    pathname: '/askforrecommendation/123'
  }
};

// Unauthenticated state
export const Unauthenticated: Story = {
  args: {
    ...Default.args,
    session: null
  }
};

// Without evidence link
export const NoEvidence: Story = {
  args: {
    ...Default.args,
    content: {
      ...mockCredential,
      data: {
        ...mockCredential.data,
        credentialSubject: {
          ...mockCredential.data.credentialSubject,
          evidenceLink: undefined
        }
      }
    }
  }
};

// Without portfolio
export const NoPortfolio: Story = {
  args: {
    ...Default.args,
    content: {
      ...mockCredential,
      data: {
        ...mockCredential.data,
        credentialSubject: {
          ...mockCredential.data.credentialSubject,
          portfolio: []
        }
      }
    }
  }
};

// Mobile view
export const Mobile: Story = {
  args: {
    ...Default.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

// Interactive example with expandable comments
export const InteractiveWithComments: Story = {
  args: {
    ...ViewWithRecommendations.args
  },
  play: async ({ canvasElement }) => {
    // You can add interaction tests here using testing-library
  }
};

// Custom story that combines multiple variations
export const ComplexExample: Story = {
  args: {
    ...Default.args,
    content: {
      ...mockCredential,
      data: {
        ...mockCredential.data,
        credentialSubject: {
          ...mockCredential.data.credentialSubject,
          achievement: [
            {
              ...mockCredential.data.credentialSubject.achievement[0],
              description: 'Extended description with <strong>HTML</strong> content',
              criteria: {
                narrative: 'Multiple criteria points:<br>- Leadership<br>- Innovation<br>- Team building'
              }
            }
          ],
          portfolio: [
            { name: 'Project A', url: 'https://example.com/a' },
            { name: 'Project B', url: 'https://example.com/b' },
            { name: 'Project C', url: 'https://example.com/c' }
          ]
        }
      }
    }
  }
};
