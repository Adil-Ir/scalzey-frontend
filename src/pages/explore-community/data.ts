export interface Community {
  id: number;
  slug: string;
  type: string;
  name: string;
  description: string;
  members: string;
  avatarColors: string[];
  isPrivate?: boolean;
}

// TODO: replace with API call — GET /communities
export const COMMUNITIES: Community[] = [
  {
    id: 1,
    slug: "geeki-learn",
    type: "Community",
    name: "#Geeki_learn",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    members: "234+",
    avatarColors: ["bg-pink-500", "bg-purple-500", "bg-blue-400"],
    isPrivate: true,
  },
  {
    id: 2,
    slug: "product-visuals",
    type: "Community",
    name: "#Product_Visuals",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    members: "180+",
    avatarColors: ["bg-yellow-500", "bg-green-500", "bg-pink-400"],
    isPrivate: false,
  },
  {
    id: 3,
    slug: "dev-crown",
    type: "Community",
    name: "#Dev_Crown",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    members: "310+",
    avatarColors: ["bg-red-400", "bg-orange-400", "bg-sky-400"],
    isPrivate: true,
  },
  {
    id: 4,
    slug: "ux-masters",
    type: "Community",
    name: "#UX_Masters",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    members: "95+",
    avatarColors: ["bg-teal-500", "bg-cyan-400", "bg-indigo-400"],
    isPrivate: false,
  },
  {
    id: 5,
    slug: "java-guild",
    type: "Community",
    name: "#Java_Guild",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    members: "412+",
    avatarColors: ["bg-amber-500", "bg-rose-400", "bg-violet-400"],
    isPrivate: false,
  },
  {
    id: 6,
    slug: "agile-network",
    type: "Community",
    name: "#Agile_Network",
    description:
      "Lorem ipsum dolor sit amet consectetur. Blandit auctor in magna ipsum convallis elit tincidunt fringilla.",
    members: "67+",
    avatarColors: ["bg-emerald-500", "bg-lime-400", "bg-sky-500"],
    isPrivate: true,
  },
];

// Top 3 communities shown in the swiper header
export const TOP_COMMUNITIES = COMMUNITIES.slice(0, 3);

// All communities for the grid
export const EXPLORE_COMMUNITIES = COMMUNITIES;
