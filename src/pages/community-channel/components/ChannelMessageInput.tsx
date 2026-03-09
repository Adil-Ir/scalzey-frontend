import { useState, useRef, useEffect } from "react";
import { FiSend, FiPlus, FiSmile, FiPaperclip, FiLink } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";

interface ChannelMessageInputProps {
  onSend: (text: string) => void;
  onCreatePollClick: () => void;
  onAttachFiles?: (files: File[]) => void;
}

const COMMON_EMOJIS = ["😀", "😊", "👍", "❤️", "😂", "🔥", "✨", "🙏", "👋", "✅"];

export const ChannelMessageInput = ({
  onSend,
  onCreatePollClick,
  onAttachFiles,
}: ChannelMessageInputProps) => {
  const [text, setText] = useState("");
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const plusRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (plusRef.current && !plusRef.current.contains(e.target as Node)) setShowPlusMenu(false);
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) setShowEmojiPicker(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmoji = (emoji: string) => {
    setText((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleAttachClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    onAttachFiles?.(Array.from(files));
    e.target.value = "";
  };

  const handleLinkClick = () => {
    const url = window.prompt("Enter link URL:");
    if (url?.trim()) setText((prev) => (prev ? `${prev} ${url}` : url));
  };

  return (
    <div className="shrink-0 px-6 py-4 border-t border-gray-200 dark:border-[#2D3D46] bg-white dark:bg-[#0F161A]">
      <div className="flex items-center gap-2 pl-4 rounded-full bg-gray-100 dark:bg-[#1D242A]">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,*/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="message #general"
          className="flex-1 bg-transparent text-[13px] text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none border-none min-w-0"
        />

        <div className="relative shrink-0" ref={plusRef}>
          <button
            type="button"
            onClick={() => setShowPlusMenu((prev) => !prev)}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition border border-gray-300 dark:border-[#2D3D46]"
          >
            <FiPlus size={18} />
          </button>
          {showPlusMenu && (
            <div className="absolute bottom-full right-0 mb-2 py-2 rounded-xl min-w-[160px] z-10 bg-white dark:bg-[#1D242A] border border-gray-200 dark:border-[#2D3D46]">
              <button
                type="button"
                onClick={() => { onCreatePollClick(); setShowPlusMenu(false); }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-[13px] text-gray-900 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-white/5"
              >
                <HiOutlineUserGroup size={18} />
                Create poll
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          id="message-input-link"
          onClick={handleLinkClick}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-[#44BCFF] transition"
          aria-label="Add link"
        >
          <FiLink size={18} />
        </button>

        <button
          type="button"
          id="message-input-attach-file"
          onClick={handleAttachClick}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-[#44BCFF] transition"
          aria-label="Attach file"
        >
          <FiPaperclip size={18} />
        </button>

        <div className="relative shrink-0" ref={emojiRef}>
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition"
          >
            <FiSmile size={18} />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-full left-0 mb-2 p-2 rounded-xl z-10 flex flex-wrap gap-1 max-w-[200px] bg-white dark:bg-[#1D242A] border border-gray-200 dark:border-[#2D3D46]">
              {COMMON_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmoji(emoji)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSend}
          className="flex items-center justify-center h-10 px-6 rounded-full bg-[#44BCFF] text-white transition hover:bg-[#2eaef5]"
        >
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
};
