# ClaimCard Component Documentation

## Overview

The `ClaimCard` component is a versatile React component for displaying and managing credential claims with support for authentication, evidence, and comments.

## Theme Configuration

### Required Theme Extensions

To use the ClaimCard component, you must extend the Material-UI theme with custom palette properties:

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

Wrap your application with ThemeProvider:

```tsx
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ClaimCard 
        claimDetail={claimDetail}
        fileID="unique-file-id"
        status="authenticated"
      />
    </ThemeProvider>
  );
}
```

## Consequences of Not Using Theme Provider

If you do not use the ThemeProvider:

- Default Material-UI theme will be applied
- Custom palette properties (`t3BodyText`, `bgCredentialDetails`) will be undefined
- Component may have inconsistent styling
- Some color-specific styles might fall back to hardcoded values

## Props Interface

```typescript
interface ClaimCardProps {
  onAchievementLoad?: (achievementName: string) => void;
  claimDetail: ClaimDetail | null;
  fileID: string;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  comments?: ClaimDetail[];
  errorMessage?: string | null;
  loading?: boolean;
}
```

### Prop Descriptions

- `onAchievementLoad`: Optional callback when achievement is loaded
- `claimDetail`: Credential claim details
- `fileID`: Unique file identifier
- `status`: Authentication status
- `comments`: Optional comment details
- `errorMessage`: Optional error message
- `loading`: Optional loading state indicator

## Rendering Conditions

1. **Loading State**:
   - Displays circular progress indicator
   - Triggered when `status === 'loading'` or `loading` is true

2. **Unauthenticated State**:
   - Shows sign-in message
   - Displays app verification information

3. **Error State**:
   - Shows error message when `errorMessage` is present

## Key Features

- Dynamic rendering based on authentication status
- Detailed achievement display
- Portfolio and evidence link handling
- Expandable comments section
- Responsive Material-UI design

## Usage Example

```tsx
import { ClaimCard } from '@web-of-trust/ui';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react'

function CredentialView() {
  const [claimDetail, setClaimDetail] = useState(null);
  const [comments, setComments] = useState<ClaimDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { data: session, status } = useSession()


  const theme = createTheme({
    palette: {
      t3BodyText: '#202e5b',
      bgCredentialDetails: '#C2F1BE',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ClaimCard
        claimDetail={claimDetail}
        fileID="unique-file-id"
        status={status}
        comments={comments}
        errorMessage={errorMessage}
        loading={loading}
      />
    </ThemeProvider>
  );
}
```

## Data Schema

### Portfolio Interface

```typescript
interface Portfolio {
  "@type"?: string;
  name: string;
  url: string;
}
```

### Achievement Interface

```typescript
interface Achievement {
  id?: string;
  type?: string[];
  name: string;
  description?: string;
  criteria?: {
    narrative: string;
  };
}
```

### CredentialSubject Interface

```typescript
interface CredentialSubject {
  type?: string[];
  name: string;
  portfolio?: Portfolio[];
  evidenceLink?: string;
  evidenceDescription?: string;
  duration?: string;
  credentialType?: string;
  achievement?: Achievement[];
}
```

### Full ClaimData Interface

```typescript
interface ClaimData {
  id: string;
  name: string;
  data: {
    "@context": (string | { [key: string]: string })[];
    id: string;
    type: string[];
    issuer: {
      id: string;
      type: string[];
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
  };
}
```

### Example Usage

```typescript
const exampleClaim: ClaimData = {
  id: 'unique-claim-id',
  name: 'John Doe',
  data: {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      { "ex": "https://example.org/examples#" }
    ],
    id: 'urn:uuid:specific-credential-id',
    type: ['VerifiableCredential', 'ExampleCredential'],
    issuer: {
      id: 'https://example.com/issuer',
      type: ['Organization']
    },
    issuanceDate: '2024-01-15T00:00:00Z',
    expirationDate: '2025-01-15T00:00:00Z',
    credentialSubject: {
      name: 'John Doe',
      achievement: [{
        name: 'Leadership Certification',
        description: 'Advanced leadership training completed'
      }],
      portfolio: [{
        name: 'Project Report',
        url: 'https://example.com/project'
      }]
    }
  }
};
```

## Data Schema Considerations

- All fields are optional except where noted
- Supports complex nested structures
- Follows W3C Verifiable Credentials data model
- Flexible for various credential types
