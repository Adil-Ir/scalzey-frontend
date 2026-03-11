import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

export interface PollDraft {
  question: string;
  options: string[];
}

interface CreatePollModalProps {
  onClose: () => void;
  onCreate: (draft: PollDraft) => void;
}

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 10;

const getPortalRoot = () =>
  document.getElementById("dashboard-main") ?? document.body;

export const CreatePollModal = ({ onClose, onCreate }: CreatePollModalProps) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["Good", "Tired", "Frustrated", "Amazing"]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const addOption = () => {
    if (options.length < MAX_OPTIONS) setOptions((prev) => [...prev, ""]);
  };

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => prev.map((o, i) => (i === index ? value : o)));
  };

  const removeOption = (index: number) => {
    if (options.length > MIN_OPTIONS) setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    const q = question.trim();
    const opts = options.filter((o) => o.trim().length > 0);
    if (!q || opts.length < MIN_OPTIONS) return;
    onCreate({ question: q, options: opts });
    onClose();
  };

  const isValid = question.trim().length > 0 && options.filter((o) => o.trim()).length >= MIN_OPTIONS;

  const content = (
    <div className="absolute inset-0 z-40 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-50 w-full max-w-md mx-4 bg-white dark:bg-[#1D242A] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#2D3D46]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-[#2D3D46]">
          <h2 className="text-[18px] font-semibold text-gray-900 dark:text-white">Create Poll</h2>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-white/20 transition"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          <div>
            <label className="block text-[13px] font-medium text-gray-700 dark:text-slate-200 mb-2">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="How are you feeling today?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2D3D46] bg-gray-50 dark:bg-[#141E22] text-[13px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-[#44BCFF]/50"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-medium text-gray-700 dark:text-slate-200">Poll Option</label>
              <button type="button" onClick={addOption} className="text-[13px] font-medium text-[#44BCFF] hover:underline">
                + Add options
              </button>
            </div>
            <div className="space-y-2">
              {options.map((opt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#2D3D46] bg-gray-50 dark:bg-[#141E22]"
                >
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="flex-1 bg-transparent text-[13px] text-gray-900 dark:text-white placeholder-gray-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(i)}
                    disabled={options.length <= MIN_OPTIONS}
                    className="h-6 w-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-gray-200 dark:border-[#2D3D46] text-[13px] font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreate}
              disabled={!isValid}
              className="flex-1 py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const root = getPortalRoot();
  return root ? createPortal(content, root) : content;
};
