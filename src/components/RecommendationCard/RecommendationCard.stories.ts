import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import RecommendationsPage from "./RecommendationCard";
const meta: Meta<typeof RecommendationsPage> = {
  title: "Components/RecommendationsPage",
  component: RecommendationsPage,

  argTypes: {
    onDelete: { action: "onDelete" },
    onAddRecommendation: { action: "onAddRecommendation" },
  },
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;
type Story = StoryObj<typeof RecommendationsPage>;

const exampleRecommendations = [
  { id: "1", name: "Golda Velez", vouchText: "Vouched for Ahlam Sayed" },
  { id: "2", name: "Omar Eloui", vouchText: "Vouched for Ahlam Sayed" },
  { id: "3", name: "Ahmed Abdelmenam", vouchText: "Vouched for Ahlam Sayed" },
];

export const Default: Story = {
  args: {
    onDelete: fn(),
    onAddRecommendation: fn(),
    user: {
      name: "John Doe",
      image: "https://mui.com/static/images/avatar/1.jpg",
    },
  },
};
export const Loading: Story = {
  args: {
    recommendation: exampleRecommendations[0],
    onDelete: fn(),
    onAddRecommendation: fn(),
    user: {
      name: "Jane Smith",
      image: "https://mui.com/static/images/avatar/2.jpg",
    },
  },
};
export const EmptyRecommendations: Story = {
  args: {
    onDelete: fn(),
    onAddRecommendation: fn(),
    user: {
      name: "Alex Johnson",
      image: "https://mui.com/static/images/avatar/3.jpg",
    },
  },
};
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    onDelete: fn(),
    onAddRecommendation: fn(),
    user: {
      name: "Sam Wilson",
      image: "https://mui.com/static/images/avatar/4.jpg",
    },
  },
};
export const DeleteDialog: Story = {
  args: {
    ...Default.args,
  },
};
