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

### Full ClaimDetail Interface

```typescript
export interface ClaimDetail {
  data: {
    '@context': string[];
    id: string;
    type: string[];
    issuanceDate: string;
    expirationDate: string;
    credentialSubject: CredentialSubject;
  };
}
```

### Example Usage

```typescript
const exampleClaim: ClaimDetail = {
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
}

const mockComments: ClaimDetail[] = [
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
```

## Data Schema Considerations

- All fields are optional except where noted
- Supports complex nested structures
- Follows W3C Verifiable Credentials data model
- Flexible for various credential types

# React 18 Manual Setup Guide

### Prerequisites

- Node.js (recommended version 16+)
- npm (Node Package Manager)

### Step 1: Create Project Directory

```bash
mkdir weboftrust-app
cd weboftrust-app
```

### Step 2: Initialize Project

```bash
npm init -y
```

### Step 3: Install Dependencies

```bash
# React and React DOM
npm install react@18.2.0 react-dom@18.2.0

# Material-UI and Emotion (for styling)
npm install @mui/material @emotion/react @emotion/styled

# Development Dependencies
npm install --save-dev \
  webpack \
  webpack-cli \
  webpack-dev-server \
  ts-loader \
  html-webpack-plugin \
  typescript \
  @types/react \
  @types/react-dom
```

### Step 4: Update package.json Scripts

Modify the `scripts` section in `package.json`:

```json
{
  "scripts": {
    "start": "webpack serve",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### Step 5: Project Structure

Create the following directory structure:

```
weboftrust-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CredentialView.tsx
│   ├── lib/
│   │   └── theme.ts
│   ├── index.tsx
│   └── App.tsx
├── constants.ts
├── tsconfig.json
├── webpack.config.js
└── package.json
```

### Step 6: Configuration Files

#### public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Of Trust App</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

#### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ES6",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

#### webpack.config.js

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
  },
  mode: 'development',
};
```

### Step 7: Create Theme Configuration (src/lib/theme.ts)

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

export const theme = createTheme({
  palette: {
    primary: {
      main: '#003FE0',
    },
    t3BodyText: '#202e5b',
    bgCredentialDetails: '#C2F1BE',
  },
});
```

### Step 8: Create Source Files

#### src/index.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### src/App.tsx

```tsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './lib/theme';
import CredentialView from './components/CredentialView';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Web Of Trust Application</h1>
        <CredentialView />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

#### src/constants.ts

```typescript
import { ClaimDetail } from '@web-of-trust/ui';

export const CLAIM_DATA: ClaimDetail = {
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
      evidenceLink: '<https://example.com/evidence>',
    },
  },
}

export const COMMENTS:: ClaimDetail[] = [
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
```

#### src/components/CredentialView.tsx

```tsx
import React, { useState } from 'react';
import { ClaimCard, ClaimDetail } from '@web-of-trust/ui';
import { CLAIM_DATA, COMMENTS } from '../../constants'


const CredentialView: React.FC = () => {
  const [claimDetail, setClaimDetail] = useState<ClaimDetail | null>(CLAIM_DATA);
  const [comments, setComments] = useState<ClaimDetail | null>(COMMENTS);

  return (
    <ClaimCard 
      claimDetail={claimDetail}
      fileID="unique-file-id"
      status="loading"
      comments={comments}
    />
  );
};

export default CredentialView;
```

### Step 9: Run the Application

```bash
npm run start
```

## Common Troubleshooting

1. **Dependency Conflicts**: Ensure exact versions of dependencies are used.
2. **TypeScript Errors**: Check `tsconfig.json` and ensure all type definitions are correct.
3. **Webpack Configuration**: Verify that `webpack.config.js` matches your project structure.

## Notes

- This setup provides a basic manual configuration for a React 18 project with TypeScript.
- Customize the configuration as needed for your specific project requirements.
- The `@web-of-trust/ui` library is assumed to be installed or mocked for this example.

## Next Steps

- Add testing framework (Jest, React Testing Library)
- Configure ESLint and Prettier
- Set up CI/CD pipeline
