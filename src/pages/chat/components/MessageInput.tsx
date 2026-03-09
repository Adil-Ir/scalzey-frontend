import { useState, useRef, useEffect } from "react";
import { FiSend, FiLink, FiSmile, FiPaperclip } from "react-icons/fi";

interface MessageInputProps {
  onSend: (text: string) => void;
  onAttachFiles?: (files: File[]) => void;
}

const COMMON_EMOJIS = ["😀", "😊", "👍", "❤️", "😂", "🔥", "✨", "🙏", "👋", "✅"];

export const MessageInput = ({ onSend, onAttachFiles }: MessageInputProps) => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
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
    const url = prompt("Enter link URL:");
    if (url?.trim()) setText((prev) => (prev ? `${prev} ${url}` : url));
  };

  return (
    <div className="shrink-0 px-6 py-4 border-t border-gray-200 dark:border-[#2D3D46] bg-white dark:bg-[#0F161A]">
      <div className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-[#1D242A] px-4 py-2">
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
          placeholder="Type a message"
          className="flex-1 min-w-0 bg-transparent text-[13px] text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none border-none"
        />

        {/* Link — insert link URL */}
        <button
          type="button"
          id="message-input-link"
          onClick={handleLinkClick}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-[#44BCFF] transition"
          aria-label="Add link"
        >
          <FiLink size={18} />
        </button>

        {/* Attach file */}
        <button
          type="button"
          id="message-input-attach-file"
          onClick={handleAttachClick}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-[#44BCFF] transition"
          aria-label="Attach file"
        >
          <FiPaperclip size={18} />
        </button>

        {/* Emoji picker */}
        <div className="relative shrink-0" ref={emojiRef}>
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition"
            aria-label="Add emoji"
          >
            <FiSmile size={18} />
          </button>
          {showEmojiPicker && (
            <div
              className="absolute bottom-full left-0 mb-2 p-2 rounded-xl z-10 flex flex-wrap gap-1 max-w-[200px] bg-white dark:bg-[#1D242A] border border-gray-200 dark:border-[#2D3D46]"
            >
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
          className="h-9 w-9 rounded-full flex items-center justify-center bg-[#44BCFF] text-white hover:bg-[#2eaef5] transition"
        >
          <FiSend size={16} />
        </button>
      </div>
    </div>
  );
};
