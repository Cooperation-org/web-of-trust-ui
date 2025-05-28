# web-of-trust-ui LinkedTrust Integration

## Overview

The `@web-of-trust/ui` package now includes LinkedTrust integration components for displaying credentials stored in the LinkedTrust network.

## New Components

### LinkedTrustCredentialDisplay

A wrapper around the existing `CredentialDisplay` component that:
- Fetches credentials from LinkedTrust API by URI
- Applies LinkedTrust theming
- Handles sharing with LinkedTrust URLs
- Shows related claims (optional)

### LinkedTrustCredentialViewer

A standalone viewer for embedding LinkedTrust credentials:

```tsx
<LinkedTrustCredentialViewer uri="https://linkedtrust.us/credentials/123" />
```

## Usage Examples

### 1. Display by URI

```tsx
import { LinkedTrustCredentialDisplay } from '@web-of-trust/ui';

function CredentialPage({ credentialUri }) {
  return (
    <LinkedTrustCredentialDisplay
      uri={credentialUri}
      showRelatedClaims={true}
      onViewDetails={() => console.log('View details clicked')}
    />
  );
}
```

### 2. Display with Provided Credential

```tsx
function CredentialView({ credential }) {
  return (
    <LinkedTrustCredentialDisplay
      credential={credential}
      onShare={handleCustomShare}
      onExport={handleCustomExport}
    />
  );
}
```

### 3. Custom API URL

```tsx
<LinkedTrustCredentialDisplay
  uri={credentialUri}
  apiUrl="https://custom.linkedtrust.instance/api"
/>
```

## Hook Usage

For more control, use the `useLinkedTrustCredential` hook:

```tsx
import { useLinkedTrustCredential } from '@web-of-trust/ui';

function CustomCredentialView({ uri }) {
  const { credential, loading, error } = useLinkedTrustCredential(uri);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{credential.credentialSubject.achievement?.name}</h1>
      {/* Custom rendering */}
    </div>
  );
}
```

## LinkedTrust Features

### Automatic Type Detection

The component automatically detects credential types:
- OpenBadges v3
- Blockcerts
- Generic Verifiable Credentials

### Display Hints

LinkedTrust credentials include display hints for optimal rendering:

```json
{
  "displayHints": {
    "primaryDisplay": "achievement.name",
    "imageField": "achievement.image",
    "showSkills": true
  }
}
```

### Related Claims

When `showRelatedClaims` is enabled, the component displays:
- Endorsements
- Validations
- Corroborations
- Disputes

## Styling

The component uses LinkedTrust brand colors by default:

```typescript
const linkedTrustTheme = {
  palette: {
    primary: {
      main: '#00c9a7', // LinkedTrust green
    },
    t3BodyText: '#202e5b',
    bgCredentialDetails: '#C2F1BE',
  }
};
```

To override, wrap with your own ThemeProvider:

```tsx
<ThemeProvider theme={customTheme}>
  <LinkedTrustCredentialDisplay uri={uri} />
</ThemeProvider>
```

## Building a Credential Gallery

```tsx
import { LinkedTrustCredentialDisplay } from '@web-of-trust/ui';

function CredentialGallery({ credentialUris }) {
  return (
    <div className="credential-gallery">
      {credentialUris.map(uri => (
        <div key={uri} className="credential-item">
          <LinkedTrustCredentialDisplay
            uri={uri}
            onViewDetails={() => navigate(`/credentials/${encodeURIComponent(uri)}`)}
          />
        </div>
      ))}
    </div>
  );
}
```

## Error Handling

The component handles common errors:
- Network failures
- Invalid URIs
- Missing credentials
- API errors

Custom error handling:

```tsx
function SafeCredentialDisplay({ uri }) {
  const [fallbackError, setFallbackError] = useState(null);
  
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <LinkedTrustCredentialDisplay
        uri={uri}
        onError={(error) => {
          console.error('Credential error:', error);
          setFallbackError(error);
        }}
      />
    </ErrorBoundary>
  );
}
```

## Performance Considerations

1. **Caching**: The hook doesn't cache by default. Wrap with React Query or SWR for caching:

```tsx
import { useQuery } from 'react-query';

function CachedCredentialDisplay({ uri }) {
  const { data, isLoading, error } = useQuery(
    ['credential', uri],
    () => fetchLinkedTrustCredential(uri),
    { staleTime: 5 * 60 * 1000 } // 5 minutes
  );
  
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  
  return <CredentialDisplay credential={data} />;
}
```

2. **Lazy Loading**: For galleries, use intersection observer:

```tsx
import { useInView } from 'react-intersection-observer';

function LazyCredential({ uri }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px'
  });
  
  return (
    <div ref={ref}>
      {inView ? (
        <LinkedTrustCredentialDisplay uri={uri} />
      ) : (
        <div style={{ height: 400 }}>Loading...</div>
      )}
    </div>
  );
}
```

## Migration Guide

If you're currently using the base `CredentialDisplay` component:

1. Replace imports:
```tsx
// Before
import { CredentialDisplay } from '@web-of-trust/ui';

// After
import { LinkedTrustCredentialDisplay } from '@web-of-trust/ui';
```

2. Update props:
```tsx
// Before
<CredentialDisplay claimDetail={credential} />

// After
<LinkedTrustCredentialDisplay credential={credential} />
```

3. Add URI support:
```tsx
// Now you can display by URI
<LinkedTrustCredentialDisplay uri={credentialUri} />
```

## Future Enhancements

- Credential verification status display
- Trust path visualization
- Inline claim creation
- QR code generation for credential URIs
- Offline credential caching
