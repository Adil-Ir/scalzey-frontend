// TODO: replace with API — GET /communities/:slug, GET /channels/:id/messages

export interface ChannelSection {
  heading: string;
  channels: { id: string; name: string }[];
}

export interface ChannelMessage {
  id: string;
  type: "text" | "poll";
  senderName: string;
  senderColor: string;
  time: string;
  date: string;
  text?: string;
  imageUrl?: string;
  imageUrls?: string[];
  poll?: {
    question: string;
    options: { label: string; votes: number; percent: number }[];
    totalVotes: number;
  };
}

export interface CommunityChannelConfig {
  slug: string;
  name: string;
  displayName: string;
  avatarColors: string[];
  sections: ChannelSection[];
}

export const COMMUNITY_CHANNELS: Record<string, CommunityChannelConfig> = {
  "geeki-learn": {
    slug: "geeki-learn",
    name: "#Geeki_learn",
    displayName: "Gekilearn",
    avatarColors: ["bg-pink-500", "bg-purple-500", "bg-blue-400"],
    sections: [
      { heading: "Chat", channels: [{ id: "general", name: "#general" }, { id: "new-joiness", name: "#new joiness" }] },
      { heading: "Information", channels: [{ id: "announcements", name: "#announcements" }, { id: "updates", name: "#updates" }] },
    ],
  },
  "product-visuals": {
    slug: "product-visuals",
    name: "#Product_Visuals",
    displayName: "Product Visuals",
    avatarColors: ["bg-yellow-500", "bg-green-500", "bg-pink-400"],
    sections: [
      { heading: "Chat", channels: [{ id: "general", name: "#general" }, { id: "design", name: "#design" }] },
    ],
  },
  "dev-crown": {
    slug: "dev-crown",
    name: "#Dev_Crown",
    displayName: "Dev Crown",
    avatarColors: ["bg-red-400", "bg-orange-400", "bg-sky-400"],
    sections: [
      { heading: "Chat", channels: [{ id: "general", name: "#general" }] },
    ],
  },
  "ux-masters": {
    slug: "ux-masters",
    name: "#UX_Masters",
    displayName: "UX Masters",
    avatarColors: ["bg-teal-500", "bg-cyan-400", "bg-indigo-400"],
    sections: [
      { heading: "Chat", channels: [{ id: "general", name: "#general" }] },
    ],
  },
  "java-guild": {
    slug: "java-guild",
    name: "#Java_Guild",
    displayName: "Java Guild",
    avatarColors: ["bg-amber-500", "bg-rose-400", "bg-violet-400"],
    sections: [
      { heading: "Chat", channels: [{ id: "general", name: "#general" }] },
    ],
  },
  "agile-network": {
    slug: "agile-network",
    name: "#Agile_Network",
    displayName: "Agile Network",
    avatarColors: ["bg-emerald-500", "bg-lime-400", "bg-sky-500"],
    sections: [
      { heading: "Chat", channels: [{ id: "general", name: "#general" }] },
    ],
  },
};

export const formatDateLabel = (date: string) => {
  const d = new Date(date);
  const today = new Date();
  if (date === today.toISOString().split("T")[0]) return "Today";
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date === yesterday.toISOString().split("T")[0]) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const getInitialMessages = (): ChannelMessage[] => [
  {
    id: "1",
    type: "text",
    senderName: "Wade Warren",
    senderColor: "bg-blue-500",
    text: "Welcome to #general! Feel free to introduce yourself.",
    time: "9:00 AM",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "2",
    type: "text",
    senderName: "Annette Black",
    senderColor: "bg-pink-600",
    text: "Hi everyone! Excited to be here #general",
    time: "9:15 AM",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "3",
    type: "poll",
    senderName: "Wade Warren",
    senderColor: "bg-blue-500",
    time: "9:30 AM",
    date: new Date().toISOString().split("T")[0],
    poll: {
      question: "How are you feeling today?",
      options: [
        { label: "Good", votes: 12, percent: 35 },
        { label: "Tired", votes: 8, percent: 24 },
        { label: "Frustrated", votes: 5, percent: 15 },
        { label: "Amazing", votes: 9, percent: 26 },
      ],
      totalVotes: 34,
    },
  },
];
