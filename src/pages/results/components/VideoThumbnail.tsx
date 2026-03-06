import { FiPlay } from "react-icons/fi";

interface VideoThumbnailProps {
  instructorName: string;
  instructorColor: string;
  caption: string;
  gradientBg: string;
}

export const VideoThumbnail = ({
  instructorName,
  instructorColor,
  caption,
  gradientBg,
}: VideoThumbnailProps) => (
  <div
    className={`relative h-full min-h-[220px] w-full bg-gradient-to-br ${gradientBg} flex items-center justify-center overflow-hidden`}
    style={{ borderRadius: "18px" }}
  >
    {/* Play button */}
    <button
      type="button"
      className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-10"
    >
      <FiPlay size={20} className="text-gray-900 ml-0.5" />
    </button>

    {/* Bottom overlay */}
    <div
      className="absolute bottom-0 left-0 right-0 px-3 py-3"
      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className={`inline-flex h-6 w-6 rounded-full items-center justify-center text-white text-[10px] font-bold shrink-0 ${instructorColor}`}
        >
          {instructorName[0]}
        </span>
        <span className="text-[11px] font-medium text-white/90">{instructorName}</span>
      </div>
      <p className="text-[11px] text-white/80 leading-snug line-clamp-2">{caption}</p>
    </div>
  </div>
);
