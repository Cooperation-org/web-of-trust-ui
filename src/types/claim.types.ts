export interface Portfolio {
  name: string;
  url: string;
}

export interface Achievement {
  name: string;
  description?: string;
  criteria?: { narrative: string };
}

export interface CredentialSubject {
  name: string;
  achievement?: Achievement[];
  duration?: string;
  portfolio?: Portfolio[];
  evidenceLink?: string;
}

export interface ClaimData {
  id: string;
  type: string[];
  issuanceDate: string;
  expirationDate?: string;
  status?: 'valid' | 'expired' | 'revoked';
  credentialSubject: CredentialSubject;
}
