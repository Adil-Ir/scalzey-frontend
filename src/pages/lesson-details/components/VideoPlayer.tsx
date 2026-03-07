import { useState } from "react";
import { FiPlay, FiPause } from "react-icons/fi";

interface VideoPlayerProps {
  title: string;
  duration?: string;
  /** Tailwind gradient e.g. "from-pink-900 via-rose-800 to-slate-900" */
  gradientBg?: string;
  /** Actual video URL — set when API is integrated */
  videoUrl?: string;
}

export const VideoPlayer = ({
  title,
  duration,
  gradientBg = "from-slate-800 via-slate-700 to-slate-900",
  videoUrl,
}: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);

  /* When a real videoUrl is provided, render an actual <video> element */
  if (videoUrl) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl bg-black">
        <video
          className="w-full"
          src={videoUrl}
          controls
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
    );
  }

  /* Mock/placeholder player */
  return (
    <div
      className={`relative w-full bg-gradient-to-br ${gradientBg} overflow-hidden rounded-2xl`}
      style={{ aspectRatio: "16/9" }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "150px",
        }}
      />

      {/* Play / Pause button */}
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className="absolute inset-0 flex items-center justify-center group"
        aria-label={playing ? "Pause" : "Play"}
      >
        <span className="h-16 w-16 rounded-full bg-white/90 dark:bg-white/80 flex items-center justify-center shadow-2xl group-hover:scale-110 group-active:scale-95 transition-transform duration-150">
          {playing ? (
            <FiPause size={26} className="text-gray-900" />
          ) : (
            <FiPlay size={26} className="text-gray-900 ml-1" />
          )}
        </span>
      </button>

      {/* Bottom overlay: title + duration */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-4"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)",
        }}
      >
        <p className="text-[13px] font-medium text-white/90 leading-snug line-clamp-1">
          {title}
        </p>
        {duration && (
          <p className="text-[11px] text-white/60 mt-0.5">{duration}</p>
        )}
      </div>
    </div>
  );
};
