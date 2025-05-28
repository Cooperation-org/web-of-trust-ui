// index.ts - Export LinkedTrust components alongside existing exports
export * from './components/ClaimCard';
export * from './components/LinkedTrustCredentialDisplay';
export * from './types';

// Re-export credential utilities
export { 
  detectCredentialType,
  exportCredentialAsJSON,
  shareCredential 
} from './utils/credentialUtils';
