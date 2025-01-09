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

interface Recommendation {
  id: string;
  name: string;
  vouchText: string;
}

const exampleRecommendations: Recommendation[] = [
  { id: "1", name: "Golda Velez", vouchText: "Vouched for Ahlam Sayed" },
  { id: "2", name: "Omar Eloui", vouchText: "Vouched for Ahlam Sayed" },
  { id: "3", name: "Ahmed Abdelmenam", vouchText: "Vouched for Ahlam Sayed" },
];

interface RecommendationPageProps {
  recommendation: Recommendation;
  onDelete: (id: string) => void;
  user: { name?: string; image?: string };
  onAddRecommendation: () => void;
}

const borderColors = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#22c55e",
  "#6366f1",
];

const RecommendationsPage: React.FC<RecommendationPageProps> = ({
  onDelete,
  user,
  onAddRecommendation,
}) => {
  const recommendationsRef = useRef<Recommendation[]>([]);
  const loadingRef = useRef(false);
  const deleteDialogRef = useRef({
    open: false,
    recommendationId: null as string | null,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelete = async () => {
    const { recommendationId } = deleteDialogRef.current;
    if (!recommendationId) return;
    try {
      deleteDialogRef.current.open = false;
      await onDelete(recommendationId);
      recommendationsRef.current = recommendationsRef.current.filter(
        (recommendation) => recommendation.id !== recommendationId
      );
      deleteDialogRef.current.recommendationId = null;
    } catch (error) {
      console.error("Error deleting recommendation:", error);
    }
  };

  const loadRecommendations = async () => {
    try {
      loadingRef.current = true;
      recommendationsRef.current = exampleRecommendations;
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    } finally {
      loadingRef.current = false;
    }
  };

  loadRecommendations();

  const renderRecommendationCard = (recommendation: Recommendation) => (
    <Paper
      key={recommendation.id}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        marginBottom: 2,
        borderRadius: 2,
        border: "1px solid #ddd",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar alt={recommendation.name} src="/placeholder.png" />
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>
            {recommendation.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            {recommendation.vouchText}
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={() => {
          deleteDialogRef.current = {
            open: true,
            recommendationId: recommendation.id,
          };
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
      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <Avatar alt="Profile Picture" src={user.image} />
        <Typography variant="h6">
          Hi, <span>{user.name}</span>
        </Typography>
        <Button variant="contained" onClick={onAddRecommendation}>
          Add Recommendation
        </Button>
      </Box>

      {loadingRef.current ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>{recommendationsRef.current.map(renderRecommendationCard)}</Box>
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

export default RecommendationsPage;
