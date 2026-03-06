import { useState } from "react";
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMaximize2,
  FiSkipBack,
  FiSkipForward,
} from "react-icons/fi";
import type { ClassroomCourse } from "../data";

export const VideoPlayer = ({ course }: { course: ClassroomCourse }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(32);

  return (
    <div
      className={`relative w-full bg-gradient-to-br ${course.currentLesson.gradientBg} overflow-hidden`}
      style={{ borderRadius: "20px", aspectRatio: "16/9" }}
    >
      {/* Thumbnail overlay (shown when paused) */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
          >
            <FiPlay size={26} className="text-gray-900 ml-1" />
          </button>
        </div>
      )}

      {/* Instructor badge (top-left) */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
        <span
          className={`inline-flex h-5 w-5 rounded-full items-center justify-center text-white text-[9px] font-bold shrink-0 ${course.instructorColor}`}
        >
          {course.instructor[0]}
        </span>
        <span className="text-[11px] font-medium text-white">{course.instructor}</span>
      </div>

      {/* Duration badge (top-right) */}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-[11px] text-white font-medium">
        {course.currentLesson.duration}
      </div>

      {/* Bottom controls bar */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 py-3"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
      >
        {/* Progress bar */}
        <div className="mb-3">
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-1 appearance-none rounded-full outline-none"
            style={{
              background: `linear-gradient(to right, #44BCFF ${progress}%, rgba(255,255,255,0.3) ${progress}%)`,
            }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button type="button" className="text-white/80 hover:text-white transition">
              <FiSkipBack size={16} />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="h-8 w-8 rounded-full bg-[#44BCFF] flex items-center justify-center hover:bg-[#2eaef5] transition"
            >
              {playing ? (
                <FiPause size={14} className="text-white" />
              ) : (
                <FiPlay size={14} className="text-white ml-0.5" />
              )}
            </button>
            <button type="button" className="text-white/80 hover:text-white transition">
              <FiSkipForward size={16} />
            </button>
            <span className="text-[11px] text-white/70 ml-1">
              {Math.floor((progress / 100) * parseInt(course.currentLesson.duration))}:00 / {course.currentLesson.duration}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="text-white/80 hover:text-white transition"
            >
              {muted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
            </button>
            <button type="button" className="text-white/80 hover:text-white transition">
              <FiMaximize2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
