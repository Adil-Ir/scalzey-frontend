import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { COMMUNITY_CHANNELS, getInitialMessages } from "./data";
import { ChannelSidebar } from "./components/ChannelSidebar";
import { ChannelHeader } from "./components/ChannelHeader";
import { ChannelMessageFeed } from "./components/ChannelMessageFeed";
import { ChannelMessageInput } from "./components/ChannelMessageInput";
import { CreatePollModal } from "./components/CreatePollModal";
import { AddPeopleModal } from "./components/AddPeopleModal";
import type { ChannelMessage } from "./data";
import type { PollDraft } from "./components/CreatePollModal";

export const CommunityChannelPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const config = slug ? COMMUNITY_CHANNELS[slug] : null;

  const [selectedChannelId, setSelectedChannelId] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<ChannelMessage[]>(getInitialMessages);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [showAddPeople, setShowAddPeople] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarExpanded, setDesktopSidebarExpanded] = useState(false);

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileSidebarOpen]);

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">Community not found</p>
        <button
          onClick={() => navigate("/community/explore")}
          className="px-6 py-2.5 rounded-full bg-[#44BCFF] text-white text-sm font-medium hover:bg-[#2eaef5] transition"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  const handleSend = (text: string, files?: File[]) => {
    const imageUrls = files
      ?.filter((f) => f.type.startsWith("image/"))
      .map((f) => URL.createObjectURL(f));
    const allUrls = imageUrls ?? [];
    const hasContent = text.trim() || allUrls.length > 0;
    if (!hasContent) return;

    const newMsg: ChannelMessage = {
      id: `msg-${Date.now()}`,
      type: "text",
      senderName: "Annette Black",
      senderColor: "bg-pink-600",
      text: text.trim() || undefined,
      imageUrl: allUrls[0],
      imageUrls: allUrls.length > 1 ? allUrls : undefined,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toISOString().split("T")[0],
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleCreatePoll = (draft: PollDraft) => {
    const validOpts = draft.options.filter((o) => o.trim()).map((o) => o.trim());
    if (validOpts.length < 2) return;

    const votes = validOpts.map((_, i) => [86, 54, 69, 40, 30][i % 5] ?? 25);
    const totalVotes = votes.reduce((a, b) => a + b, 0);
    const options = validOpts.map((label, i) => ({
      label,
      votes: votes[i],
      percent: totalVotes > 0 ? Math.round((votes[i] / totalVotes) * 100) : 0,
    }));

    const pollMsg: ChannelMessage = {
      id: `poll-${Date.now()}`,
      type: "poll",
      senderName: "Annette Black",
      senderColor: "bg-pink-600",
      senderIsOnline: true,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toISOString().split("T")[0],
      poll: { question: draft.question, options, totalVotes },
    };
    setMessages((prev) => [...prev, pollMsg]);
  };


  const handleVote = (messageId: string, optionIndex: number) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId || m.type !== "poll" || !m.poll) return m;
        const opts = m.poll.options.map((o, i) =>
          i === optionIndex ? { ...o, votes: o.votes + 1 } : o
        );
        const total = opts.reduce((a, o) => a + o.votes, 0);
        const options = opts.map((o) => ({
          ...o,
          percent: total > 0 ? Math.round((o.votes / total) * 100) : 0,
        }));
        return { ...m, poll: { ...m.poll, options, totalVotes: total } };
      })
    );
  };

  const handleSelectChannel = (id: string) => {
    setSelectedChannelId(id);
    setMobileSidebarOpen(false);
  };

  const handleChannelsClick = () => {
    setMobileSidebarOpen((prev) => !prev);
    setDesktopSidebarExpanded((prev) => !prev);
  };
  const handleCloseSidebar = () => {
    setMobileSidebarOpen(false);
    setDesktopSidebarExpanded(false);
  };

  return (
    <>
      <div
        className="relative flex -m-4 md:-m-6 xl:-m-10 overflow-hidden"
        style={{ height: "calc(100vh - 64px)" }}
      >
        {/* Mobile overlay — only on small screens */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-[45] md:hidden bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Channel sidebar — fixed on mobile (overlay), inline on md+ (collapsed by default) */}
        <div
          className={`fixed md:relative inset-y-0 left-0 z-50 md:z-auto flex flex-col border-r border-gray-200 dark:border-[#2D3D46] bg-white dark:bg-[#0F161A] transition-all duration-200 ease-out
            ${mobileSidebarOpen ? "translate-x-0 w-[260px]" : "-translate-x-full w-[260px] md:translate-x-0"}
            ${desktopSidebarExpanded ? "md:w-[200px] lg:w-[240px]" : "md:w-0 md:min-w-0 md:overflow-hidden"}`}
        >
          <div className="w-[260px] md:w-[200px] lg:w-[240px] min-w-[200px] lg:min-w-[240px] h-full flex flex-col shrink-0 overflow-hidden">
            <ChannelSidebar
              config={config}
              selectedChannelId={selectedChannelId}
              onSelectChannel={handleSelectChannel}
              onClose={handleCloseSidebar}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 bg-[#F6F8F9] dark:bg-[#0F161A] relative">
          <ChannelHeader
            config={config}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onChannelsClick={handleChannelsClick}
          />
          <ChannelMessageFeed
            messages={messages}
            searchQuery={searchQuery}
            onVote={handleVote}
            onAddClick={() => setShowAddPeople(true)}
          />
          <ChannelMessageInput
            onSend={handleSend}
            onCreatePollClick={() => setShowCreatePoll(true)}
          />

          {showAddPeople && (
            <AddPeopleModal
              onClose={() => setShowAddPeople(false)}
              onAddFriend={(name) => console.log("Add friend:", name)}
            />
          )}
        </div>
      </div>

      {showCreatePoll && (
        <CreatePollModal
          onClose={() => setShowCreatePoll(false)}
          onCreate={handleCreatePoll}
        />
      )}
    </>
  );
};
