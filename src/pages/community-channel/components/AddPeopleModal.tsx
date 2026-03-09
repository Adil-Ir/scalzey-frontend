import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

interface AddPeopleModalProps {
  onClose: () => void;
  onAddFriend?: (name: string) => void;
}

const FRIEND_SUGGESTIONS = [
  { id: "1", name: "Savannah Nguyen", color: "bg-pink-500" },
  { id: "2", name: "Jenny Wilson", color: "bg-purple-500" },
  { id: "3", name: "Guy Hawkins", color: "bg-blue-500" },
  { id: "4", name: "Kristin Watson", color: "bg-emerald-500" },
];

export const AddPeopleModal = ({ onClose, onAddFriend }: AddPeopleModalProps) => {
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleAddFriend = (person: (typeof FRIEND_SUGGESTIONS)[0]) => {
    setAddedIds((prev) => new Set(prev).add(person.id));
    onAddFriend?.(person.name);
  };

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative z-50 w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-[#1D242A] border border-gray-200 dark:border-[#2D3D46]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200 dark:border-[#2D3D46]">
          <h2 className="text-[18px] font-semibold text-gray-900 dark:text-white">Add People</h2>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-white/20 transition"
            aria-label="Close"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="px-6 py-5">
          <h3 className="text-[13px] font-semibold text-gray-500 dark:text-slate-300 uppercase tracking-wider mb-3">
            Friend Suggestions
          </h3>
          <div className="divide-y divide-gray-200 dark:divide-[#2D3D46]">
            {FRIEND_SUGGESTIONS.map((person) => (
              <div key={person.id} className="flex items-center justify-between gap-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${person.color}`}
                  >
                    {person.name[0]}
                  </span>
                  <span className="text-[14px] font-medium text-gray-900 dark:text-white truncate">
                    {person.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddFriend(person)}
                  disabled={addedIds.has(person.id)}
                  className="shrink-0 px-4 py-2 rounded-lg text-[13px] font-medium border border-gray-300 dark:border-[#2D3D46] bg-gray-800 dark:bg-[#141E22] text-white hover:bg-gray-700 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {addedIds.has(person.id) ? "Added" : "Add Friend"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
