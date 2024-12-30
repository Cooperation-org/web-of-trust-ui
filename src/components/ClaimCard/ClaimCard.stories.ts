import { ClaimCard } from './ClaimCard';
import type { Meta, StoryObj } from '@storybook/react';

// Mock data
const mockCredential = {
  data: {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json',
    ],
    id: 'urn:uuid:123',
    type: ['VerifiableCredential', 'OpenBadgeCredential'],
    issuanceDate: '2024-12-27T17:43:58.457Z',
    expirationDate: '2025-12-27T17:43:58.455Z',
    credentialSubject: {
      name: 'John Doe',
      duration: '3 months',
      achievement: [
        {
          name: 'Leadership Excellence',
          description: 'Demonstrated exceptional leadership skills',
          criteria: {
            narrative: 'Led multiple successful team projects',
          },
        },
      ],
      portfolio: [
        {
          name: 'Project Documentation',
          url: 'https://example.com/doc',
        },
      ],
      evidenceLink: 'https://example.com/evidence',
    },
  },
};

const mockComments = [
  {
    data: {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json',
      ],
      id: 'comment1',
      type: ['VerifiableCredential', 'OpenBadgeCredential'],
      issuanceDate: '2024-12-27T17:43:58.457Z',
      expirationDate: '2025-12-27T17:43:58.455Z',
      credentialSubject: {
        name: 'Jane Smith',
        howKnow: 'Worked together for 2 years',
        recommendationText: 'Excellent team player and leader',
        qualifications: 'Senior Manager',
        explainAnswer: 'Witnessed leadership abilities firsthand',
      },
    },
  },
];

// Meta configuration for the component
const meta: Meta<typeof ClaimCard> = {
  title: 'Components/ClaimCard',
  component: ClaimCard,
};
export default meta;

type Story = StoryObj<typeof meta>;

// Stories
export const Default: Story = {
  args: {
    claimDetail: mockCredential,
    fileID: '123',
    status: 'authenticated',
    comments: [],
    isView: false,
    isAskForRecommendation: false,
    loading: false,
    errorMessage: null,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    claimDetail: null,
    errorMessage: 'Failed to load claim details',
  },
};

export const ViewWithComments: Story = {
  args: {
    ...Default.args,
    isView: true,
    comments: mockComments,
  },
};

export const AskForRecommendation: Story = {
  args: {
    ...Default.args,
    isAskForRecommendation: true,
  },
};

export const Unauthenticated: Story = {
  args: {
    ...Default.args,
    status: 'unauthenticated',
  },
};

export const NoEvidence: Story = {
  args: {
    ...Default.args,
    claimDetail: {
      ...mockCredential,
      data: {
        ...mockCredential.data,
        credentialSubject: {
          ...mockCredential.data.credentialSubject,
          evidenceLink: undefined,
        },
      },
    },
  },
};

export const NoPortfolio: Story = {
  args: {
    ...Default.args,
    claimDetail: {
      ...mockCredential,
      data: {
        ...mockCredential.data,
        credentialSubject: {
          ...mockCredential.data.credentialSubject,
          portfolio: [],
        },
      },
    },
  },
};

export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const ComplexExample: Story = {
  args: {
    ...Default.args,
    claimDetail: {
      ...mockCredential,
      data: {
        ...mockCredential.data,
        credentialSubject: {
          ...mockCredential.data.credentialSubject,
          achievement: [
            {
              ...mockCredential.data.credentialSubject.achievement[0],
              description:
                'Extended description with <strong>HTML</strong> content',
              criteria: {
                narrative: `
                  Multiple criteria points:<br>
                  - Leadership<br>
                  - Innovation<br>
                  - Team building
                `,
              },
            },
          ],
          portfolio: [
            { name: 'Project A', url: 'https://example.com/a' },
            { name: 'Project B', url: 'https://example.com/b' },
            { name: 'Project C', url: 'https://example.com/c' },
          ],
        },
      },
    },
  },
};
