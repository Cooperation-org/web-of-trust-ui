export interface Portfolio {
  '@type'?: string;
  name: string;
  url: string;
}

export interface AchievementImage {
  id: string;
  type?: string;
}

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
