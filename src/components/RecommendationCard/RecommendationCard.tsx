import React, { useRef } from "react";
import {
  Typography,
  CircularProgress,
  Box,
  Button,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Claim {
  id: string;
  achievementName: string;
}

interface ClaimsPageProps {
  fetchClaims: () => Promise<Claim[]>;
  onDelete: (claimId: string) => Promise<void>;
  user: { name?: string; image?: string };
  onAddSkill: () => void;
}

const borderColors = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#22c55e",
  "#6366f1",
];

const getRandomBorderColor = (): string =>
  borderColors[Math.floor(Math.random() * borderColors.length)];

const ClaimsPage: React.FC<ClaimsPageProps> = ({
  fetchClaims,
  onDelete,
  user,
  onAddSkill,
}) => {
  const claimsRef = useRef<Claim[]>([]);
  const loadingRef = useRef(true);
  const deleteDialogRef = useRef({
    open: false,
    claimId: null as string | null,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelete = async () => {
    const { claimId } = deleteDialogRef.current;
    if (!claimId) return;
    try {
      deleteDialogRef.current.open = false;
      await onDelete(claimId);
      claimsRef.current = claimsRef.current.filter(
        (claim) => claim.id !== claimId
      );
      deleteDialogRef.current.claimId = null;
    } catch (error) {
      console.error("Error deleting claim:", error);
    }
  };

  const loadClaims = async () => {
    try {
      loadingRef.current = true;
      claimsRef.current = await fetchClaims();
    } catch (error) {
      console.error("Error fetching claims:", error);
    } finally {
      loadingRef.current = false;
    }
  };

  loadClaims();

  const renderClaimCard = (claim: Claim) => (
    <Paper
      key={claim.id}
      sx={{
        border: `3px solid ${getRandomBorderColor()}`,
        padding: 2,
        marginBottom: 2,
        borderRadius: 2,
      }}
    >
      <Typography>{claim.achievementName}</Typography>
      <IconButton
        onClick={() => {
          deleteDialogRef.current = { open: true, claimId: claim.id };
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? 2 : 3,
      }}
    >
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar alt="Profile Picture" src={user.image} />
        <Typography variant="h6">
          Hi, <span>{user.name}</span>
        </Typography>
        <Button variant="contained" onClick={onAddSkill}>
          Add a new skill
        </Button>
      </Box>

      {loadingRef.current ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>{claimsRef.current.map(renderClaimCard)}</Box>
      )}

      <Dialog
        open={deleteDialogRef.current.open}
        onClose={() => {
          deleteDialogRef.current.open = false;
        }}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this item is irreversible. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteDialogRef.current.open = false;
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClaimsPage;
