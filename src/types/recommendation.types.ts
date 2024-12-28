export interface RecommendationData {
  id?: string;
  recommender: string;
  recipient: string;
  skills: string[];
  rating?: number;
  comment?: string;
  date: string;
  endorsements?: number;
}
