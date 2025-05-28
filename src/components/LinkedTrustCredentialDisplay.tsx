// LinkedTrustCredentialDisplay.tsx - Credential display component that works with LinkedTrust API
import React from 'react';
import { 
  CredentialDisplay, 
  detectCredentialType, 
  exportCredentialAsJSON,
  shareCredential 
} from '@web-of-trust/ui';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CircularProgress, Alert } from '@mui/material';

// LinkedTrust API integration
interface LinkedTrustCredential {
  id: string;
  canonicalUri: string;
  name: string;
  credentialSchema: string;
  context: any;
  type: any;
  issuer: any;
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: any;
  proof: any;
  sameAs?: any; // Contains metadata including displayHints
}

interface LinkedTrustCredentialResponse {
  credential: LinkedTrustCredential;
  relatedClaims?: any[];
}

// Hook to fetch credential from LinkedTrust
export function useLinkedTrustCredential(uri: string, apiUrl?: string) {
  const [credential, setCredential] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchCredential() {
      try {
        setLoading(true);
        const baseUrl = apiUrl || 'https://live.linkedtrust.us/api';
        const response = await fetch(`${baseUrl}/credentials/${encodeURIComponent(uri)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch credential: ${response.statusText}`);
        }

        const data: LinkedTrustCredentialResponse = await response.json();
        
        // Transform LinkedTrust credential to standard W3C format
        const w3cCredential = {
          '@context': data.credential.context,
          id: data.credential.id,
          type: data.credential.type,
          issuer: data.credential.issuer,
          issuanceDate: data.credential.issuanceDate,
          expirationDate: data.credential.expirationDate,
          credentialSubject: data.credential.credentialSubject,
          proof: data.credential.proof,
          // Add metadata for enhanced display
          _metadata: data.credential.sameAs
        };

        setCredential(w3cCredential);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setCredential(null);
      } finally {
        setLoading(false);
      }
    }

    if (uri) {
      fetchCredential();
    }
  }, [uri, apiUrl]);

  return { credential, loading, error };
}

// Theme with LinkedTrust branding
const linkedTrustTheme = createTheme({
  palette: {
    primary: {
      main: '#00c9a7', // LinkedTrust green
    },
    t3BodyText: '#202e5b',
    bgCredentialDetails: '#C2F1BE',
  },
});

// Props for LinkedTrust credential display
interface LinkedTrustCredentialDisplayProps {
  uri?: string;
  credential?: any;
  apiUrl?: string;
  onViewDetails?: () => void;
  onShare?: () => void;
  onExport?: () => void;
  showRelatedClaims?: boolean;
}

// Main component that displays LinkedTrust credentials
export const LinkedTrustCredentialDisplay: React.FC<LinkedTrustCredentialDisplayProps> = ({
  uri,
  credential: providedCredential,
  apiUrl,
  onViewDetails,
  onShare,
  onExport,
  showRelatedClaims = false
}) => {
  // Fetch credential if URI provided
  const { 
    credential: fetchedCredential, 
    loading, 
    error 
  } = useLinkedTrustCredential(uri || '', apiUrl);

  // Use provided credential or fetched one
  const credential = providedCredential || fetchedCredential;

  // Handle share with LinkedTrust URI
  const handleShare = async () => {
    if (onShare) {
      onShare();
    } else if (credential) {
      const shareUrl = `https://linkedtrust.us/credentials/${encodeURIComponent(credential.id)}`;
      await shareCredential(credential, shareUrl);
    }
  };

  // Handle export
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else if (credential) {
      exportCredentialAsJSON(credential);
    }
  };

  // Handle view details
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else if (credential?.id) {
      window.open(`https://linkedtrust.us/credentials/${encodeURIComponent(credential.id)}`, '_blank');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!credential) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No credential found
      </Alert>
    );
  }

  return (
    <ThemeProvider theme={linkedTrustTheme}>
      <Box>
        <CredentialDisplay
          credential={credential}
          onViewDetails={handleViewDetails}
          onShare={handleShare}
          onExport={handleExport}
        />
        
        {showRelatedClaims && credential._metadata?.relatedClaims && (
          <Box mt={2}>
            <h3>Related Claims</h3>
            {/* Add related claims display here */}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

// Standalone credential viewer that can be embedded
export const LinkedTrustCredentialViewer: React.FC<{ uri: string }> = ({ uri }) => {
  return (
    <LinkedTrustCredentialDisplay 
      uri={uri}
      showRelatedClaims={true}
    />
  );
};

// Export utilities for LinkedTrust integration
export { detectCredentialType, exportCredentialAsJSON };
