# @web-of-trust/ui

## Overview

The `@web-of-trust/ui` package offers a collection of versatile and reusable React components designed to facilitate the display and management of credential claims within your applications. Built with Material-UI (MUI) for consistent styling and seamless integration, these components support features like authentication, evidence presentation, and interactive comments.

## Features

- **ClaimCard Component**: Display and manage credential claims with support for authentication, evidence, and comments.
- **Responsive Design**: Ensures components adapt seamlessly across various devices and screen sizes.
- **Theme Customization**: Easily extend and customize the Material-UI theme to match your application's branding.
- **TypeScript Support**: Fully typed components for enhanced developer experience and type safety.
- **Image Handling**: Support for displaying images within achievements and portfolio items.

## Installation

Ensure you have Node.js (>=16) installed.

Install the package via npm:

```bash
npm install @web-of-trust/ui
```

Or using yarn:

```bash
yarn add @web-of-trust/ui
```

## Quick Start: Create a Demo Project Using `create-wot-app`

To rapidly set up a demo project showcasing the `@web-of-trust/ui` components, use the `create-wot-app` CLI tool. This tool automates the creation of a modern React-based development environment, complete with Webpack, TypeScript, and Material-UI.

### Installation & Usage

You can run the CLI tool directly via `npx`:

```bash
npx create-wot-app
```

### Steps

1. **Run the CLI Tool**

   ```bash
   npx create-wot-app
   ```

2. **Follow the Prompts**

   The CLI will prompt you for the project name and other configurations.

3. **Navigate to the Project Directory**

   ```bash
   cd your-project-name
   ```

4. **Start the Development Server**

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

5. **View the Demo**

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the demo project in action, featuring the `@web-of-trust/ui` components.

## Theme Configuration

To leverage the `ClaimCard` component and other UI components effectively, extend the Material-UI theme with custom palette properties.

### Required Theme Extensions

```typescript
import { createTheme } from '@mui/material/styles';

// Extend theme declaration
declare module '@mui/material/styles' {
  interface Palette {
    t3BodyText: string;
    bgCredentialDetails: string;
  }
  interface PaletteOptions {
    t3BodyText?: string;
    bgCredentialDetails?: string;
  }
}

// Create theme with required properties
const theme = createTheme({
  palette: {
    primary: {
      main: '#003FE0', // Default primary color
    },
    t3BodyText: '#202e5b', // Text color for specific elements
    bgCredentialDetails: '#C2F1BE', // Background for credential detail indicators
  },
});
```

### Theme Provider Usage

Wrap your application with `ThemeProvider` to apply the custom theme:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './lib/theme';
import { ClaimCard } from '@web-of-trust/ui';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ClaimCard 
        claimDetail={claimDetail}
        status="authenticated"
      />
    </ThemeProvider>
  );
}
```

### Consequences of Not Using Theme Provider

If you do not use the `ThemeProvider`:

- Default Material-UI theme will be applied.
- Custom palette properties (`t3BodyText`, `bgCredentialDetails`) will be undefined.
- Components may have inconsistent styling.
- Some color-specific styles might fall back to hardcoded values.

## ClaimCard Component Documentation

The `ClaimCard` component is a versatile React component for displaying and managing credential claims with support for authentication, evidence, and comments.

### Props Interface

```typescript
interface ClaimCardProps {
  onAchievementLoad?: (achievementName: string) => void;
  claimDetail: ClaimDetail | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  comments?: ClaimDetail[];
  errorMessage?: string | null;
  loading?: boolean;
}
```

### Prop Descriptions

- **`onAchievementLoad`**: Optional callback triggered when an achievement is loaded.
- **`claimDetail`**: Credential claim details.
- **`status`**: Authentication status; can be `'loading'`, `'authenticated'`, or `'unauthenticated'`.
- **`comments`**: Optional array of comment details.
- **`errorMessage`**: Optional error message string.
- **`loading`**: Optional loading state indicator.

### Rendering Conditions

1. **Loading State**:
   - Displays a circular progress indicator.
   - Triggered when `status === 'loading'` or `loading` is `true`.

2. **Unauthenticated State**:
   - Shows a sign-in message.
   - Displays app verification information.

3. **Error State**:
   - Shows an error message when `errorMessage` is present.

4. **Authenticated State**:
   - Displays credential details, achievements, portfolio, and comments.

### Key Features

- Dynamic rendering based on authentication status.
- Detailed achievement display.
- Portfolio and evidence link handling.
- Expandable comments section.
- Responsive Material-UI design.

## Example Usage

Here's how to use the `ClaimCard` component in your application:

```tsx
import React, { useState } from 'react';
import { ClaimCard } from '@web-of-trust/ui';
import { ClaimDetail } from '@web-of-trust/ui';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { ClaimDetail } from '@web-of-trust/ui'; // Assuming types are exported

const theme = createTheme({
  palette: {
    t3BodyText: '#202e5b',
    bgCredentialDetails: '#C2F1BE',
  },
});

const mockClaimDetail: ClaimDetail = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json',
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
      'Describe how you earned this skill to test the text wrapping',
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

const mockComments: ClaimDetail[] = [
  {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json',
    ],
    id: 'comment1',
    type: ['VerifiableCredential', 'OpenBadgeCredential'],
    issuer: {
      id: 'did:key:commenter',
      type: ['Profile'],
    },
    issuanceDate: '2024-12-27T17:43:58.457Z',
    expirationDate: '2025-12-27T17:43:58.455Z',
    credentialSubject: {
      name: 'Jane Smith',
      howKnow: 'Worked together for 2 years',
      recommendationText: 'Excellent team player and leader',
      qualifications: 'Senior Manager',
      explainAnswer: 'Witnessed leadership abilities firsthand',
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

function CredentialView() {
  const [claimDetail, setClaimDetail] = useState<ClaimDetail | null>(mockClaimDetail);
  const [comments, setComments] = useState<ClaimDetail[]>(mockComments);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: session, status } = useSession();

  return (
    <ThemeProvider theme={theme}>
      <ClaimCard
        claimDetail={claimDetail}
        status={status as 'loading' | 'authenticated' | 'unauthenticated'}
        comments={comments}
        errorMessage={errorMessage}
        loading={loading}
      />
    </ThemeProvider>
  );
}

export default CredentialView;
```

## Data Schema

### Portfolio Interface

```typescript
export interface Portfolio {
  '@type'?: string;
  name: string;
  url: string;
}
```

### AchievementImage Interface

```typescript
export interface AchievementImage {
  id: string;
  type?: string;
}
```

### Achievement Interface

```typescript
export interface Achievement {
  id?: string;
  type?: string[];
  name: string;
  description?: string;
  criteria?: {
    narrative?: string;
  };
  image?: AchievementImage;
}
```

### CredentialSubject Interface

```typescript
export interface CredentialSubject {
  type?: string[];
  name: string;
  portfolio?: Portfolio[];
  duration?: string;
  createdTime?: string;
  evidenceLink?: string;
  evidenceDescription?: string;
  howKnow?: string;
  recommendationText?: string;
  qualifications?: string;
  explainAnswer?: string;
  credentialType?: string;
  achievement?: Achievement[];
}
```

### Full ClaimDetail Interface

```typescript
export interface ClaimDetail {
  '@context': (string | { [key: string]: string })[];
  id: string;
  type: string[];
  issuer?: {
    id: string;
    type?: string[];
  };
  issuanceDate: string;
  expirationDate: string;
  credentialSubject: CredentialSubject;
  proof?: {
    type: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    proofValue: string;
  };
}
```

### Example Usage

```typescript
const exampleClaim: ClaimDetail = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json',
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
      'Describe how you earned this skill to test the text wrapping',
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

const exampleClaimWithImage: ClaimDetail = {
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
    issuer: {
      id: 'did:key:commenter',
      type: ['Profile'],
    },
    issuanceDate: '2024-12-27T17:43:58.457Z',
    expirationDate: '2025-12-27T17:43:58.455Z',
    credentialSubject: {
      name: 'Jane Smith',
      howKnow: 'Worked together for 2 years',
      recommendationText: 'Excellent team player and leader',
      qualifications: 'Senior Manager',
      explainAnswer: 'Witnessed leadership abilities firsthand',
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
```

## License

This project is licensed under the ISC License.

---
