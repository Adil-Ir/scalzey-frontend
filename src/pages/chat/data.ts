// TODO: replace with API — GET /messages/contacts, GET /messages/:id

export interface Contact {
  id: string;
  name: string;
  email: string;
  slug: string;
  color: string;
}

export const CONTACTS: Contact[] = [
  { id: "1", name: "Savannah Nguyen", email: "savannah@example.com", slug: "savannah-nguyen", color: "bg-violet-600" },
  { id: "2", name: "Jenny Wilson", email: "jenny@example.com", slug: "jenny-wilson", color: "bg-pink-600" },
  { id: "3", name: "Guy Hawkins", email: "guy@example.com", slug: "guy-hawkins", color: "bg-amber-600" },
];

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  time: string;
}

export const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  "savannah-nguyen": [
    { id: "1", text: "Hey! How's the project going?", senderId: "1", time: "10:30 AM" },
    { id: "2", text: "Going well! Almost done with the design.", senderId: "me", time: "10:32 AM" },
    { id: "3", text: "That's great to hear! Let me know when you need a review.", senderId: "1", time: "10:35 AM" },
  ],
  "jenny-wilson": [
    { id: "1", text: "Hi! Do you have time for a quick call today?", senderId: "2", time: "9:15 AM" },
    { id: "2", text: "Sure, how about 3 PM?", senderId: "me", time: "9:20 AM" },
  ],
  "guy-hawkins": [
    { id: "1", text: "Thanks for the feedback on my proposal!", senderId: "3", time: "Yesterday" },
    { id: "2", text: "No problem! Happy to help.", senderId: "me", time: "Yesterday" },
  ],
};
