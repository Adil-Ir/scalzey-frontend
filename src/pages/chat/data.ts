// TODO: replace with API — GET /messages/contacts, GET /messages/:id

export interface Contact {
  id: string;
  name: string;
  email: string;
  slug: string;
  color: string;
  isFriend?: boolean;
  isOnline?: boolean;
}

export const CONTACTS: Contact[] = [
  { id: "1", name: "Savannah Nguyen", email: "savannah@example.com", slug: "savannah-nguyen", color: "bg-violet-600", isFriend: true, isOnline: true },
  { id: "2", name: "Jenny Wilson", email: "jenny@example.com", slug: "jenny-wilson", color: "bg-pink-600", isFriend: true, isOnline: false },
  { id: "3", name: "Guy Hawkins", email: "guy@example.com", slug: "guy-hawkins", color: "bg-amber-600", isFriend: false, isOnline: true },
];

export interface ChatMessage {
  id: string;
  text?: string;
  senderId: string;
  time: string;
  date?: string;
  imageUrl?: string;
  imageUrls?: string[];
}

export const formatDateLabel = (date: string) => {
  const d = new Date(date);
  const today = new Date();
  if (date === today.toISOString().split("T")[0]) return "Today";
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date === yesterday.toISOString().split("T")[0]) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const today = new Date().toISOString().split("T")[0];
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayStr = yesterday.toISOString().split("T")[0];

export const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  "savannah-nguyen": [
    { id: "1", text: "Hey! How's the project going?", senderId: "1", time: "10:30 AM", date: today },
    { id: "2", text: "Going well! Almost done with the design.", senderId: "me", time: "10:32 AM", date: today },
    { id: "3", text: "That's great to hear! Let me know when you need a review.", senderId: "1", time: "10:35 AM", date: today },
  ],
  "jenny-wilson": [
    { id: "1", text: "Hi! Do you have time for a quick call today?", senderId: "2", time: "9:15 AM", date: today },
    { id: "2", text: "Sure, how about 3 PM?", senderId: "me", time: "9:20 AM", date: today },
  ],
  "guy-hawkins": [
    { id: "1", text: "Thanks for the feedback on my proposal!", senderId: "3", time: "2:45 PM", date: yesterdayStr },
    { id: "2", text: "No problem! Happy to help.", senderId: "me", time: "2:46 PM", date: yesterdayStr },
  ],
};
