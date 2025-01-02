export interface Portfolio {
  name: string;
  url: string;
}

export interface Achievement {
  name: string;
  description: string;
  criteria?: { narrative: string };
  image?: { id: string };
}

export interface CredentialSubject {
  name: string;
  achievement?: Achievement[];
  duration?: string;
  portfolio?: Portfolio[];
  createdTime?: string;
  evidenceLink?: string;
  howKnow?: string;
  recommendationText?: string;
  qualifications?: string;
  explainAnswer?: string;
}

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
