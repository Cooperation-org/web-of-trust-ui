import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Link as MuiLink,
  styled,
} from '@mui/material';
// import { SVGDate, SVGBadge } from '../../Assets/SVGs';
// import EvidencePreview from './EvidencePreview';

const StyledCard = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '10px',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
  padding: theme.spacing(3),
}));

interface Portfolio {
  name: string;
  url: string;
}

interface Achievement {
  name: string;
  description: string;
  criteria?: { narrative: string };
}

interface CredentialSubject {
  name: string;
  achievement?: Achievement[];
  duration?: string;
  portfolio?: Portfolio[];
  evidenceLink?: string;
}

interface ClaimData {
  id: string;
  type: string[];
  issuanceDate: string;
  expirationDate?: string;
  status: string;
  credentialSubject: CredentialSubject;
}

interface ClaimCardProps {
  claim: ClaimData;
  onViewClick?: () => void;
  onRecommendClick?: () => void;
}

const cleanHTML = (htmlContent: any): string => {
  if (typeof htmlContent !== 'string') return '';
  return htmlContent
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<br>/g, '')
    .replace(/class="[^"]*"/g, '')
    .replace(/style="[^"]*"/g, '');
};

const ClaimCard: React.FC<ClaimCardProps> = ({ claim, onViewClick, onRecommendClick }) => {
  const credentialSubject = claim.credentialSubject;
  const achievement = credentialSubject.achievement?.[0];
  const hasValidEvidence =
    credentialSubject.portfolio && credentialSubject.portfolio.length > 0;

  return (
    <StyledCard>
      <Container sx={{ maxWidth: '2000px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          {/* {credentialSubject.evidenceLink && (
            // <EvidencePreview
            //   url={credentialSubject.evidenceLink}
            //   width={180}
            //   height={150}
            // />
          )} */}

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* <SVGBadge /> */}
              <Typography variant="h6">
                {credentialSubject.name} has claimed:
              </Typography>
            </Box>

            <Typography variant="h5" sx={{ mt: 2 }}>
              {achievement?.name ?? 'Unnamed Achievement'}
            </Typography>

            {credentialSubject.duration && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '2px 5px',
                  borderRadius: '5px',
                  bgcolor: '#d5e1fb',
                  mt: 2,
                }}
              >
                {/* <SVGDate /> */}
                <Typography variant="body2">{credentialSubject.duration}</Typography>
              </Box>
            )}

            {achievement?.description && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML(achievement.description),
                  }}
                />
              </Typography>
            )}

            {achievement?.criteria?.narrative && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">What does that entail?:</Typography>
                <ul style={{ marginLeft: '25px' }}>
                  <li>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: cleanHTML(achievement.criteria.narrative),
                      }}
                    />
                  </li>
                </ul>
              </Box>
            )}

            {hasValidEvidence && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1">Supporting Evidence:</Typography>
                <ul style={{ marginLeft: '25px' }}>
                  {/* {credentialSubject.portfolio.map((portfolioItem, idx) => (
                    <li key={`portfolio-${idx}`} style={{ marginBottom: '10px' }}>
                      <MuiLink
                        href={portfolioItem.url}
                        underline="hover"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {portfolioItem.name}
                      </MuiLink>
                    </li>
                  ))} */}
                </ul>
              </Box>
            )}

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              {onViewClick && (
                <Button variant="contained" onClick={onViewClick}>
                  View Credential
                </Button>
              )}
              {onRecommendClick && (
                <Button variant="contained" onClick={onRecommendClick}>
                  Ask for Recommendation
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </StyledCard>
  );
};

export default ClaimCard;
