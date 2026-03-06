import { useState } from "react";
import { FiDownload, FiExternalLink, FiSend } from "react-icons/fi";
import { MdOutlineMenuBook, MdOutlineQuiz } from "react-icons/md";
import type { ClassroomCourse } from "../data";

type Tab = "Overview" | "Resources" | "Notes" | "Discussion";
const TABS: Tab[] = ["Overview", "Resources", "Notes", "Discussion"];

const resourceIcon = (type: string) => {
  if (type === "LINK") return <FiExternalLink size={13} className="text-[#44BCFF]" />;
  return <FiDownload size={13} className="text-[#44BCFF]" />;
};

const resourceBadgeColor = (type: string) => {
  if (type === "PDF") return "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400";
  if (type === "DOC") return "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400";
  if (type === "XLS") return "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400";
  return "bg-[#44BCFF]/10 text-[#44BCFF]";
};

const DISCUSSION_MESSAGES = [
  {
    id: 1,
    name: "Sarah K.",
    color: "bg-pink-500",
    time: "2h ago",
    text: "Great explanation on user interviews! Could you expand on affinity mapping in the next lesson?",
  },
  {
    id: 2,
    name: "James T.",
    color: "bg-purple-500",
    time: "1h ago",
    text: "I struggled with synthesising qualitative data — the template in resources helped a lot 🙌",
  },
  {
    id: 3,
    name: "Ava M.",
    color: "bg-orange-500",
    time: "45m ago",
    text: "When does the live Q&A session start for this module?",
  },
];

export const ClassroomTabs = ({ course }: { course: ClassroomCourse }) => {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleAddNote = () => {
    const trimmed = note.trim();
    if (!trimmed) return;
    setNotes((prev) => [trimmed, ...prev]);
    setNote("");
  };

  return (
    <div
      className="bg-white dark:bg-[#1D242A] flex flex-col overflow-hidden"
      style={{ borderRadius: "20px", border: "1px solid #2D3D46" }}
    >
      {/* Tab bar */}
      <div className="flex items-center border-b border-[#2D3D46] px-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-4 py-3.5 text-[13px] font-medium border-b-2 transition ${
              activeTab === tab
                ? "border-[#44BCFF] text-[#44BCFF]"
                : "border-transparent text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* ── Overview ── */}
        {activeTab === "Overview" && (
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-[13px] font-semibold text-gray-900 dark:text-white mb-2">
                Current Lesson
              </h4>
              <p className="text-[13px] font-medium text-[#44BCFF]">
                {course.currentLesson.title}
              </p>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-gray-900 dark:text-white mb-2">
                About this lesson
              </h4>
              <p className="text-[13px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF]">
                {course.currentLesson.description}
              </p>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-gray-900 dark:text-white mb-2">
                Course Overview
              </h4>
              <p className="text-[13px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF]">
                {course.overview}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
              {[
                { icon: <MdOutlineMenuBook size={15} />, label: "Lessons", value: course.totalLessons },
                { icon: <MdOutlineQuiz size={15} />, label: "Quizzes", value: course.modules.reduce((a, m) => a + m.lessons.filter((l) => l.type === "quiz").length, 0) },
                { icon: <MdOutlineMenuBook size={15} />, label: "Progress", value: `${course.progress}%` },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 bg-gray-50 dark:bg-[#141E22] rounded-2xl px-4 py-3"
                  style={{ border: "1px solid #2D3D46" }}
                >
                  <span className="text-gray-400 dark:text-slate-500">{stat.icon}</span>
                  <span className="text-[15px] font-bold text-gray-900 dark:text-white">{stat.value}</span>
                  <span className="text-[11px] text-gray-400 dark:text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Resources ── */}
        {activeTab === "Resources" && (
          <div className="flex flex-col gap-3">
            <p className="text-[12px] text-gray-400 dark:text-slate-500">
              Downloadable materials for this course
            </p>
            {course.resources.map((res, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 bg-gray-50 dark:bg-[#141E22] px-4 py-3 rounded-2xl"
                style={{ border: "1px solid #2D3D46" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${resourceBadgeColor(res.type)}`}>
                    {res.type}
                  </span>
                  <p className="text-[12px] text-gray-700 dark:text-slate-200 truncate">{res.title}</p>
                  {res.size && (
                    <span className="text-[11px] text-gray-400 dark:text-slate-500 shrink-0">{res.size}</span>
                  )}
                </div>
                <button type="button" className="shrink-0 text-[#44BCFF] hover:opacity-70 transition">
                  {resourceIcon(res.type)}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Notes ── */}
        {activeTab === "Notes" && (
          <div className="flex flex-col gap-4">
            {/* Input */}
            <div
              className="flex items-end gap-3 bg-gray-50 dark:bg-[#141E22] rounded-2xl px-4 py-3"
              style={{ border: "1px solid #2D3D46" }}
            >
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note for this lesson…"
                className="flex-1 bg-transparent text-[12px] text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none resize-none leading-relaxed"
              />
              <button
                type="button"
                onClick={handleAddNote}
                className="shrink-0 px-4 py-2 rounded-full bg-[#44BCFF] text-white text-[12px] font-medium hover:bg-[#2eaef5] transition"
              >
                Save
              </button>
            </div>
            {/* Saved notes */}
            {notes.length === 0 ? (
              <p className="text-[12px] text-gray-400 dark:text-slate-500 text-center py-4">
                No notes yet — add your first note above.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {notes.map((n, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 dark:bg-[#141E22] px-4 py-3 rounded-2xl"
                    style={{ border: "1px solid #2D3D46" }}
                  >
                    <p className="text-[12px] text-gray-700 dark:text-slate-200 leading-relaxed">{n}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Discussion ── */}
        {activeTab === "Discussion" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {DISCUSSION_MESSAGES.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3">
                  <span
                    className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold ${msg.color}`}
                  >
                    {msg.name[0]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[12px] font-semibold text-gray-800 dark:text-white">{msg.name}</span>
                      <span className="text-[10px] text-gray-400 dark:text-slate-500">{msg.time}</span>
                    </div>
                    <div
                      className="bg-gray-50 dark:bg-[#141E22] px-3.5 py-2.5 rounded-2xl"
                      style={{ border: "1px solid #2D3D46" }}
                    >
                      <p className="text-[12px] text-gray-600 dark:text-slate-300 leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Reply input */}
            <div
              className="flex items-center gap-3 bg-gray-50 dark:bg-[#141E22] rounded-full px-4 py-2.5"
              style={{ border: "1px solid #2D3D46" }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message…"
                className="flex-1 bg-transparent text-[12px] text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 outline-none"
              />
              <button
                type="button"
                className="shrink-0 h-7 w-7 rounded-full bg-[#44BCFF] flex items-center justify-center hover:bg-[#2eaef5] transition"
                onClick={() => setMessage("")}
              >
                <FiSend size={13} className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
