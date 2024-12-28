import type { Meta, StoryObj } from '@storybook/react';
import ClaimCard from './ClaimCard';

const meta: Meta<typeof ClaimCard> = {
  title: 'Components/ClaimCard',
  component: ClaimCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClaimCard>;
export const ValidClaim: Story = {
  args: {
    claim: {
      id: "1",
      type: ["VerifiableCredential"],
      issuanceDate: "2024-01-15",
      status: "valid",
      credentialSubject: {
        name: "John Doe",
        achievement: [{
          name: "Email Verification",
          description: "Verified email ownership"
        }],
        duration: "Permanent"
      }
    }
  }
};

export const ExpiredClaim: Story = {
  args: {
    claim: {
      id: "2",
      type: ["VerifiableCredential", "License"],
      issuanceDate: "2023-01-01",
      expirationDate: "2023-12-31",
      status: "expired",
      credentialSubject: {
        name: "Jane Smith",
        achievement: [{
          name: "Driver License",
          description: "State issued driver license"
        }],
        duration: "1 year"
      }
    }
  }
};

export const RevokedClaim: Story = {
  args: {
    claim: {
      id: "3",
      type: ["VerifiableCredential", "Certificate"],
      issuanceDate: "2023-06-15",
      status: "revoked",
      credentialSubject: {
        name: "Alice Johnson",
        achievement: [{
          name: "Professional Certificate",
          description: "Industry certification"
        }]
      }
    }
  }
};
