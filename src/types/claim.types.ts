export interface Portfolio {
  "@type"?: string;
  name: string;
  url: string;
}

export interface Achievement {
  id?: string;
  type?: string[];
  name: string;
  description?: string;
  criteria?: {
    narrative: string;
  };
}

export interface CredentialSubject {
  type?: string[];
  name: string;
  portfolio?: Portfolio[];
  evidenceLink?: string;
  evidenceDescription?: string;
  duration?: string;
  credentialType?: string;
  achievement?: Achievement[];
}

export interface ClaimData {
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
