import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TopCommunitySwiper } from "./components/TopCommunitySwiper";
import { CommunityCard } from "./components/CommunityCard";
import { JoinModal } from "./components/JoinModal";
import { TOP_COMMUNITIES, EXPLORE_COMMUNITIES } from "./data";
import type { Community } from "./data";

export const ExploreCommunityPage = () => {
  const [joinTarget, setJoinTarget] = useState<Community | null>(null);
  const [query, setQuery] = useState("");

  const filtered = EXPLORE_COMMUNITIES.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  // TODO: replace with API call — POST /communities/:id/join-request
  const handleJoin = (community: Community) => {
    console.log("Join request for:", community.name);
  };

  return (
    <div className="space-y-10">
      {/* ── Top Communities ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-[#0F161A] dark:text-white shrink-0">
            Top Communities
          </h2>

          {/* Search */}
          <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1D242A] px-4 py-2.5 w-full sm:w-72">
            <FiSearch
              size={15}
              className="text-gray-400 dark:text-slate-500 shrink-0"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for communities"
              className="flex-1 bg-transparent text-sm text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none border-none"
            />
          </div>
        </div>

        <TopCommunitySwiper
          communities={TOP_COMMUNITIES}
          onJoinClick={setJoinTarget}
        />
      </div>

      {/* ── Explore Community grid ── */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-[#0F161A] dark:text-white">
          Explore Community
        </h2>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                onJoinClick={setJoinTarget}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40 text-gray-400 dark:text-slate-500 text-sm">
            No communities found for &quot;{query}&quot;.
          </div>
        )}
      </div>

      {/* ── Join modal ── */}
      {joinTarget && (
        <JoinModal
          community={joinTarget}
          onClose={() => setJoinTarget(null)}
          onJoin={handleJoin}
        />
      )}
    </div>
  );
};
