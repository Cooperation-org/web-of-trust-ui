# ClaimCard Component Documentation

## Overview

The `ClaimCard` component is a versatile React component for displaying and managing credential claims with support for authentication, evidence, and comments.

## Props Interface

```typescript
interface ClaimCardProps {
  onAchievementLoad?: (achievementName: string) => void;
  claimDetail: ClaimDetail | null;
  fileID: string;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  comments?: ClaimDetail[];
  isAskForRecommendation?: boolean;
  isView?: boolean;
  errorMessage?: string | null;
  loading?: boolean;
}
```

### Prop Descriptions

- `onAchievementLoad`: Optional callback function triggered when an achievement is loaded
- `claimDetail`: The main credential claim details
- `fileID`: Unique identifier for the file
- `status`: Current authentication status
- `comments`: Optional array of comment details
- `isAskForRecommendation`: Flag to modify display for recommendation requests
- `isView`: Flag to show comments section
- `errorMessage`: Optional error message to display
- `loading`: Optional loading state indicator

## Key Features

- Dynamic rendering based on authentication status
- Supports detailed achievement display
- Handles portfolio and evidence links
- Expandable comments section
- Responsive design with Material-UI components

## Usage Example

```tsx
import { ClaimCard } from '@web-of-trust/ui';

function CredentialView() {
  const [claimDetail, setClaimDetail] = useState(null);
  const [comments, setComments] = useState<ClaimDetail[]>([])

  const { data: session, status } = useSession()

  const params = useParams()

  const pathname = usePathname()

  const isView = pathname?.includes('/view')

  return (
    <ClaimCard
      claimDetail={claimDetail}
      fileID={"unique-file-id" || params.id as string}
      status={status}
      isView={isView}
      comments={comments}
      errorMessage={errorMessage}
      loading={loading}
    />
  );
}
```

## Rendering Conditions

1. **Loading State**:
   - Displays a circular progress indicator
   - Triggered when `status === 'loading'` or `loading` is true

2. **Unauthenticated State**:
   - Shows sign-in message
   - Provides information about app verification

3. **Error State**:
   - Displays error message when `errorMessage` is present

4. **Claim Display**:
   - Shows achievement name, description, and criteria
   - Displays portfolio/evidence links
   - Includes credential validation indicators

## Comments Section

- Expandable comment items
- Supports multiple comment types:
  - How they know each other
  - Recommendation text
  - Qualifications
  - Explanation

## Security Features

- Validates digital signature
- Checks credential expiration
- Verifies issuer revocation status

## Styling Notes

- Uses Material-UI theming
- Responsive design
- Supports mobile and desktop layouts

## Recommended Integration

Integrate with authentication and file management hooks for full functionality.
