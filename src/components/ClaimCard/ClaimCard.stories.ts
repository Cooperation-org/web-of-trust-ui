import { ClaimCard } from './ClaimCard';
import type { Meta, StoryObj } from '@storybook/react';
import { ClaimDetail } from '@/types/claim.types';

// Mock data
const mockCredential: ClaimDetail = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json',
    {
      duration: 'https://schema.org/duration',
      fullName: 'https://schema.org/name',
      portfolio: 'https://schema.org/portfolio',
      evidenceLink: 'https://schema.org/evidenceLink',
      evidenceDescription: 'https://schema.org/evidenceDescription',
      credentialType: 'https://schema.org/credentialType',
    },
    'https://w3id.org/security/suites/ed25519-2020/v1',
  ],
  id: 'urn:uuid:123',
  type: ['VerifiableCredential', 'OpenBadgeCredential'],
  issuer: {
    id: 'did:key:example',
    type: ['Profile'],
  },
  issuanceDate: '2024-12-27T17:43:58.457Z',
  expirationDate: '2025-12-27T17:43:58.455Z',
  credentialSubject: {
    type: ['AchievementSubject'],
    name: 'John Doe',
    duration: '3 months',
    achievement: [
      {
        id: 'urn:uuid:leadership-achievement',
        type: ['Achievement'],
        name: 'Leadership Excellence',
        description: 'Demonstrated exceptional leadership skills',
        criteria: {
          narrative: 'Led multiple successful team projects',
        },
      },
    ],
    portfolio: [
      {
        '@type': 'schema:CreativeWork',
        name: 'Project Documentation',
        url: 'https://example.com/doc',
      },
    ],
    evidenceLink: '',
    evidenceDescription:
      'some Describe how you earned this skill to test the text wrapping',
    credentialType: '',
  },
  proof: {
    type: 'Ed25519Signature2020',
    created: '2024-12-27T17:43:58Z',
    verificationMethod: 'did:key:example',
    proofPurpose: 'assertionMethod',
    proofValue: 'example-proof-value',
  },
};

const mockCredentialWithImage: ClaimDetail = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json',
    {
      duration: 'https://schema.org/duration',
      fullName: 'https://schema.org/name',
      portfolio: 'https://schema.org/portfolio',
      evidenceLink: 'https://schema.org/evidenceLink',
      evidenceDescription: 'https://schema.org/evidenceDescription',
      credentialType: 'https://schema.org/credentialType',
    },
    'https://w3id.org/security/suites/ed25519-2020/v1',
  ],
  id: 'urn:uuid:456',
  type: ['VerifiableCredential', 'OpenBadgeCredential'],
  issuer: {
    id: 'did:key:example2',
    type: ['Profile'],
  },
  issuanceDate: '2025-01-08T18:09:45.621Z',
  expirationDate: '2026-01-08T18:09:45.615Z',
  credentialSubject: {
    type: ['AchievementSubject'],
    name: 'Jane Smith',
    duration: '5 years',
    achievement: [
      {
        id: 'urn:uuid:software-dev-achievement',
        type: ['Achievement'],
        name: 'Software Development',
        description: 'Developed comprehensive software solutions',
        criteria: {
          narrative: 'Contributed to multiple software projects',
        },
        image: {
          id: 'https://placehold.co/600x400',
          type: 'Image',
        },
      },
    ],
    portfolio: [
      {
        '@type': 'schema:CreativeWork',
        name: 'Project Portfolio',
        url: 'https://example.com/portfolio',
      },
    ],
    evidenceLink: 'https://placehold.co/600x400',
    credentialType: 'Software Engineering',
  },
  proof: {
    type: 'Ed25519Signature2020',
    created: '2025-01-08T18:09:45Z',
    verificationMethod: 'did:key:example2',
    proofPurpose: 'assertionMethod',
    proofValue: 'example-proof-value-2',
  },
};

const mockComments: ClaimDetail[] = [
  {
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
    issuer: {
      id: 'did:key:commenter',
      type: ['Profile'],
    },
    proof: {
      type: 'Ed25519Signature2020',
      created: '2024-12-27T17:43:58Z',
      verificationMethod: 'did:key:commenter',
      proofPurpose: 'assertionMethod',
      proofValue: 'example-comment-proof-value',
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
    status: 'authenticated',
    comments: [],
    loading: false,
    errorMessage: null,
  },
};

export const WithImage: Story = {
  args: {
    claimDetail: mockCredentialWithImage,
    status: 'authenticated',
    comments: [],
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

export const NoClaimDetail: Story = {
  args: {
    ...Default.args,
    claimDetail: null,
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
    comments: mockComments,
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
      credentialSubject: {
        ...mockCredential.credentialSubject,
        evidenceLink: undefined,
      },
    },
  },
};

export const NoPortfolio: Story = {
  args: {
    ...Default.args,
    claimDetail: {
      ...mockCredential,
      credentialSubject: {
        ...mockCredential.credentialSubject,
        portfolio: [],
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
      credentialSubject: {
        ...mockCredential.credentialSubject,
        achievement: [
          {
            ...mockCredential.credentialSubject.achievement![0],
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
          {
            '@type': 'schema:CreativeWork',
            name: 'Project A',
            url: 'https://example.com/a',
          },
          {
            '@type': 'schema:CreativeWork',
            name: 'Project B',
            url: 'https://example.com/b',
          },
          {
            '@type': 'schema:CreativeWork',
            name: 'Project C',
            url: 'https://example.com/c',
          },
        ],
      },
    },
  },
};
