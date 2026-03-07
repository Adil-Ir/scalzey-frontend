import { useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiCalendar } from "react-icons/fi";
import {
  MdOutlineOndemandVideo,
  MdOutlineMenuBook,
  MdOutlineAssignment,
  MdOutlineQuiz,
  MdOutlinePeople,
} from "react-icons/md";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import type { ModuleDetail, LessonItem } from "../data";

interface LessonSidebarProps {
  moduleData: ModuleDetail;
  activeLessonId: number;
  completedIds: Set<number>;
  onLessonClick: (lesson: LessonItem) => void;
}

const LESSON_TYPE_META: Record<
  string,
  { label: string; Icon: React.ElementType }
> = {
  video: { label: "Video", Icon: MdOutlineOndemandVideo },
  reading: { label: "Reading", Icon: MdOutlineMenuBook },
  "chapter-review": { label: "Chapter Review", Icon: MdOutlineAssignment },
  quiz: { label: "Multiple Choice Questions", Icon: MdOutlineQuiz },
};

/* ── Lesson row ── */
const LessonRow = ({
  lesson,
  isActive,
  isCompleted,
  onClick,
}: {
  lesson: LessonItem;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}) => {
  const meta = LESSON_TYPE_META[lesson.type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left flex items-start gap-3 py-2.5 px-3 rounded-xl transition ${
        isActive
          ? "bg-[#44BCFF]/10"
          : "hover:bg-gray-50 dark:hover:bg-white/[0.04]"
      }`}
    >
      {/* Tick / circle indicator */}
      {isActive ? (
        <BsCheckCircleFill
          size={14}
          className="shrink-0 mt-0.5 text-[#44BCFF]"
        />
      ) : isCompleted ? (
        <BsCheckCircleFill
          size={14}
          className="shrink-0 mt-0.5 text-[#3CC982]"
        />
      ) : (
        <BsCircle
          size={14}
          className="shrink-0 mt-0.5 text-gray-300 dark:text-slate-600"
        />
      )}

      {/* Lesson text */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-[13px] font-semibold leading-snug ${
            isActive ? "text-[#44BCFF]" : "text-gray-800 dark:text-white"
          }`}
        >
          {lesson.title}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <meta.Icon
            size={11}
            className="text-gray-400 dark:text-slate-500 shrink-0"
          />
          <span className="text-[11px] text-gray-400 dark:text-slate-500">
            {meta.label}
          </span>
        </div>
      </div>
    </button>
  );
};

/* ── Workshop event card ── */
const EventCard = ({
  workshopType,
  name,
}: {
  workshopType: string;
  name: string;
}) => (
  <div className="mx-2 my-3 rounded-2xl border border-[#2D3D46] bg-[#20303B] p-3">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-start gap-2">
        <MdOutlinePeople
          size={14}
          className="text-gray-400 dark:text-slate-400 mt-0.5 shrink-0"
        />
        <div>
          <p className="text-[10px] text-gray-400 dark:text-slate-500 leading-none">
            {workshopType}
          </p>
          <p className="text-[12px] font-semibold text-white leading-snug mt-0.5">
            {name}
          </p>
        </div>
      </div>
      <FiCalendar
        size={14}
        className="text-gray-400 dark:text-slate-400 shrink-0 mt-0.5"
      />
    </div>
    <button
      type="button"
      className="w-full py-2 rounded-full bg-[#44BCFF] text-white text-[11px] font-medium hover:bg-[#2eaef5] transition"
    >
      Mark on calendar
    </button>
  </div>
);

/* ── Main sidebar ── */
export const LessonSidebar = ({
  moduleData,
  activeLessonId,
  completedIds,
  onLessonClick,
}: LessonSidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1D242A] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#2D3D46]">
      {/* ── Scrollable chapter + lesson list ── */}
      <div className="flex-1 overflow-y-auto py-2">
        {moduleData.chapterList.map((chapter) => (
          <div key={chapter.id}>
            {/* Chapter label */}
            <p className="px-4 pt-3 pb-1 text-[11px] font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider">
              {chapter.title}
            </p>

            {/* Lessons */}
            <div className="px-1">
              {chapter.lessons.map((lesson) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  isActive={lesson.id === activeLessonId}
                  isCompleted={completedIds.has(lesson.id)}
                  onClick={() => onLessonClick(lesson)}
                />
              ))}
            </div>

            {/* Event card after specified chapter */}
            {moduleData.event &&
              chapter.id === moduleData.event.afterChapterId && (
                <EventCard
                  workshopType={moduleData.event.workshopType}
                  name={moduleData.event.name}
                />
              )}
          </div>
        ))}

        {/* Final Quiz */}
        {moduleData.finalQuiz && (
          <div>
            <p className="px-4 pt-3 pb-1 text-[11px] font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider">
              Final Quiz
            </p>
            <div className="px-1">
              <LessonRow
                lesson={{
                  id: moduleData.finalQuiz.id,
                  title: moduleData.finalQuiz.title,
                  type: "quiz",
                  completed: completedIds.has(moduleData.finalQuiz.id),
                  content: moduleData.finalQuiz.description,
                }}
                isActive={moduleData.finalQuiz.id === activeLessonId}
                isCompleted={completedIds.has(moduleData.finalQuiz.id)}
                onClick={() =>
                  onLessonClick({
                    id: moduleData.finalQuiz!.id,
                    title: moduleData.finalQuiz!.title,
                    type: "quiz",
                    completed: completedIds.has(moduleData.finalQuiz!.id),
                    content: moduleData.finalQuiz!.description,
                  })
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Result button (fixed bottom) ── */}
      <div className="shrink-0 p-3 border-t border-gray-100 dark:border-[#2D3D46]">
        <button
          type="button"
          onClick={() => navigate("/courses/results")}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition"
        >
          <span className="text-[13px] font-semibold text-gray-800 dark:text-white">
            Result
          </span>
          <span className="h-7 w-7 rounded-full bg-[#44BCFF]/20 flex items-center justify-center">
            <FiArrowUpRight size={14} className="text-[#44BCFF]" />
          </span>
        </button>
      </div>
    </div>
  );
};
