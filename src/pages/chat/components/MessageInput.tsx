import { useState, useRef, useEffect } from "react";
import { FiSend, FiSmile, FiPaperclip, FiX } from "react-icons/fi";
import EmojiPicker, { type EmojiClickData, Theme, EmojiStyle } from "emoji-picker-react";
import { useTheme } from "../../../context/ThemeContext";

interface MessageInputProps {
  onSend: (text: string, files?: File[]) => void;
}

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const [isMultiLine, setIsMultiLine] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<
    { file: File; objectUrl: string | null }[]
  >([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node))
        setShowEmojiPicker(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleSend = () => {
    const trimmed = text.trim();
    const files = pendingFiles.map((e) => e.file);
    if (!trimmed && files.length === 0) return;
    onSend(trimmed || "", files.length > 0 ? files : undefined);
    setText("");
    pendingFiles.forEach(
      (e) => e.objectUrl && URL.revokeObjectURL(e.objectUrl),
    );
    setPendingFiles([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleAttachClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const newEntries = Array.from(files).map((file) => ({
      file,
      objectUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));
    setPendingFiles((prev) => [...prev, ...newEntries]);
    e.target.value = "";
  };

  const removePendingFile = (index: number) => {
    setPendingFiles((prev) => {
      const entry = prev[index];
      if (entry.objectUrl) URL.revokeObjectURL(entry.objectUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const pendingRef = useRef(pendingFiles);
  useEffect(() => {
    pendingRef.current = pendingFiles;
  }, [pendingFiles]);
  useEffect(
    () => () => {
      pendingRef.current.forEach(
        (e) => e.objectUrl && URL.revokeObjectURL(e.objectUrl),
      );
    },
    [],
  );

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const h = Math.min(ta.scrollHeight, 160);
    ta.style.height = `${h}px`;
    setIsMultiLine(h > 40);
  }, [text]);

  return (
    <div className="shrink-0 px-4 md:px-6 py-4 bg-[#F6F8F9] dark:bg-[#0F161A]">
      {pendingFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {pendingFiles.map((entry, i) => (
            <div
              key={`${entry.file.name}-${i}`}
              className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-[#2D3D46] bg-gray-50 dark:bg-[#1D242A]"
            >
              {entry.objectUrl ? (
                <img
                  src={entry.objectUrl}
                  alt={entry.file.name}
                  className="h-20 w-20 object-cover"
                />
              ) : (
                <div className="h-20 w-20 flex items-center justify-center p-2">
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 truncate max-w-full">
                    {entry.file.name}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => removePendingFile(i)}
                className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-gray-800 dark:bg-gray-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-500"
                aria-label="Remove"
              >
                <FiX size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className={`flex items-end gap-2 pl-4 pr-2 py-3 bg-white dark:bg-[#1D242A] min-h-[52px] transition-[border-radius] duration-200 ${
          isMultiLine ? "rounded-xl" : "rounded-full"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,*/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          rows={1}
          className="flex-1 bg-transparent text-[13px] text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none border-none min-w-0 resize-none py-2 min-h-[24px] max-h-[160px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        />

        <div className="flex items-center gap-1 shrink-0 pb-0.5">
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
              <div className="absolute bottom-full right-0 mb-2 z-50 max-w-[calc(100vw-2rem)] max-h-[80vh] overflow-auto">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                  width={400}
                  height={480}
                  emojiStyle={EmojiStyle.NATIVE}
                  searchPlaceHolder="Search emoji"
                />
              </div>
            )}
          </div>
          <button
            type="button"
            id="message-input-attach-file"
            onClick={handleAttachClick}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-[#44BCFF] transition"
            aria-label="Attach file"
          >
            <FiPaperclip size={18} />
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="flex items-center justify-center h-9 px-5 rounded-full bg-[#44BCFF] text-white transition hover:bg-[#2eaef5] shrink-0"
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
