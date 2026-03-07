import { useState } from "react";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import {
  MdOutlineMenuBook,
  MdOutlineAssignment,
  MdOutlineQuiz,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { VideoPlayer } from "./VideoPlayer";
import type { LessonItem } from "../data";

/* ─────────────── Reading / Chapter-Review view ─────────────── */
const ReadingView = ({ lesson }: { lesson: LessonItem }) => (
  <div className="flex-1 overflow-y-auto px-6 py-6">
    <div className="flex items-center gap-2 mb-4">
      {lesson.type === "reading" ? (
        <MdOutlineMenuBook size={20} className="text-[#44BCFF]" />
      ) : (
        <MdOutlineAssignment size={20} className="text-[#44BCFF]" />
      )}
      <h2 className="text-[17px] font-bold text-gray-900 dark:text-white">
        {lesson.title}
      </h2>
    </div>
    <p className="text-[14px] leading-relaxed text-gray-600 dark:text-[#FFFFFFBF]">
      {lesson.content ??
        "No content available for this lesson. Content will be added when the API is integrated."}
    </p>
  </div>
);

/* ─────────────── Quiz placeholder view ─────────────── */
const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "What is the primary purpose of an operating system?",
    options: [
      "Manage hardware resources",
      "Run web browsers",
      "Play multimedia",
      "Create documents",
    ],
    correct: 0,
  },
  {
    id: 2,
    question: "Which of the following is NOT a type of operating system?",
    options: [
      "Batch OS",
      "Time-sharing OS",
      "Distributed OS",
      "Compilation OS",
    ],
    correct: 3,
  },
  {
    id: 3,
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Processing Utility",
      "Central Program Unit",
      "Core Processing Unit",
    ],
    correct: 0,
  },
];

const QuizView = ({ lesson }: { lesson: LessonItem }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = submitted
    ? MOCK_QUESTIONS.filter((q) => answers[q.id] === q.correct).length
    : 0;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="flex items-center gap-2 mb-6">
        <MdOutlineQuiz size={20} className="text-[#44BCFF]" />
        <h2 className="text-[17px] font-bold text-gray-900 dark:text-white">
          {lesson.title}
        </h2>
        <span className="ml-auto text-[11px] text-gray-400 dark:text-slate-500 bg-gray-100 dark:bg-white/10 px-2.5 py-1 rounded-full">
          {MOCK_QUESTIONS.length} Questions
        </span>
      </div>

      {submitted ? (
        <div className="flex flex-col items-center gap-4 py-10">
          <span className="h-16 w-16 rounded-full bg-[#3CC982]/20 flex items-center justify-center">
            <FiCheck size={28} className="text-[#3CC982]" />
          </span>
          <p className="text-[20px] font-bold text-gray-900 dark:text-white">
            {score}/{MOCK_QUESTIONS.length} Correct
          </p>
          <p className="text-[13px] text-gray-500 dark:text-slate-400">
            {score === MOCK_QUESTIONS.length
              ? "Perfect score! Great work."
              : "Review the incorrect answers and try again."}
          </p>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
            className="px-6 py-2.5 rounded-full border border-[#44BCFF] text-[#44BCFF] text-[13px] font-medium hover:bg-[#44BCFF]/10 transition"
          >
            Retry Quiz
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {MOCK_QUESTIONS.map((q, qi) => (
            <div key={q.id}>
              <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-3">
                {qi + 1}. {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: oi }))
                    }
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-[13px] transition ${
                      answers[q.id] === oi
                        ? "border-[#44BCFF] bg-[#44BCFF]/10 text-[#44BCFF]"
                        : "border-gray-200 dark:border-[#2D3D46] text-gray-700 dark:text-slate-300 hover:border-[#44BCFF]/50"
                    }`}
                  >
                    {answers[q.id] === oi ? (
                      <MdOutlineRadioButtonChecked
                        size={16}
                        className="shrink-0"
                      />
                    ) : (
                      <MdOutlineRadioButtonUnchecked
                        size={16}
                        className="shrink-0 text-gray-400 dark:text-slate-500"
                      />
                    )}
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            disabled={Object.keys(answers).length < MOCK_QUESTIONS.length}
            onClick={() => setSubmitted(true)}
            className="self-end px-6 py-2.5 rounded-full bg-[#44BCFF] text-white text-[13px] font-medium hover:bg-[#2eaef5] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

/* ─────────────── Content panel (transcript/description) ─────────────── */
const ContentPanel = ({ lesson }: { lesson: LessonItem }) => (
  <div className="border-t border-gray-100 dark:border-[#2D3D46] px-6 py-4">
    <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white mb-2">
      Lesson Description
    </h3>
    <p className="text-[12px] leading-relaxed text-gray-500 dark:text-[#FFFFFFBF]">
      {lesson.content ??
        "A detailed description of this lesson will be available once the API is integrated. This will include key learning objectives, required materials, and a summary of the topics covered."}
    </p>
  </div>
);

/* ─────────────── Main component ─────────────── */
interface LessonContentProps {
  lesson: LessonItem;
  isCompleted: boolean;
  hasNext: boolean;
  gradientBg?: string;
  onMarkComplete: () => void;
  onNextLesson: () => void;
}

export const LessonContent = ({
  lesson,
  isCompleted,
  hasNext,
  gradientBg,
  onMarkComplete,
  onNextLesson,
}: LessonContentProps) => {
  const [showContent, setShowContent] = useState(false);

  const isVideo = lesson.type === "video";
  const isQuiz = lesson.type === "quiz";

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1D242A] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#2D3D46]">
      {/* ── Main body ── */}
      {isVideo ? (
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Video */}
          <div className="p-4">
            <VideoPlayer
              title={lesson.title}
              duration={lesson.duration}
              gradientBg={gradientBg}
            />
          </div>
          {/* Optional content panel below video */}
          {showContent && <ContentPanel lesson={lesson} />}
        </div>
      ) : isQuiz ? (
        <QuizView lesson={lesson} />
      ) : (
        <ReadingView lesson={lesson} />
      )}

      {/* ── Bottom action bar ── */}
      <div className="shrink-0 flex items-center justify-between gap-3 px-5 py-3.5 border-t border-gray-100 dark:border-[#2D3D46]">
        {/* Content toggle (only for video) */}
        {isVideo ? (
          <button
            type="button"
            onClick={() => setShowContent((p) => !p)}
            className={`px-4 py-2 rounded-full border text-[12px] font-medium transition ${
              showContent
                ? "border-[#44BCFF] text-[#44BCFF] bg-[#44BCFF]/10"
                : "border-gray-200 dark:border-[#2D3D46] text-gray-600 dark:text-slate-300 hover:border-[#44BCFF]/60"
            }`}
          >
            Content
          </button>
        ) : (
          <span />
        )}

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Mark as complete (hidden for quiz, which has its own submit) */}
          {!isQuiz && (
            <button
              type="button"
              onClick={onMarkComplete}
              disabled={isCompleted}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[12px] font-medium border transition ${
                isCompleted
                  ? "bg-[#44BCFF] border-[#44BCFF] text-white cursor-default"
                  : "border-gray-300 dark:border-[#2D3D46] text-gray-700 dark:text-slate-200 hover:border-[#44BCFF] hover:text-[#44BCFF]"
              }`}
            >
              {isCompleted && <FiCheck size={13} />}
              {isCompleted ? "Completed" : "Mark As Complete"}
            </button>
          )}

          {/* Next lesson */}
          {hasNext && (
            <button
              type="button"
              onClick={onNextLesson}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full border border-gray-200 dark:border-[#2D3D46] text-[12px] font-medium text-gray-700 dark:text-slate-200 hover:border-[#44BCFF] hover:text-[#44BCFF] transition"
            >
              Next Lesson
              <FiChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
