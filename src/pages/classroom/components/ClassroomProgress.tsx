import { HiOutlineInformationCircle } from "react-icons/hi";
import type { ProgressItem } from "../data";

export const ClassroomProgress = ({ items }: { items: ProgressItem[] }) => (
  <div
    className="bg-white dark:bg-[#1D242A] flex flex-col"
    style={{ borderRadius: "26.53px", padding: "24px", border: "1px solid #2D3D46" }}
  >
    <div className="flex items-center gap-2 mb-5">
      <HiOutlineInformationCircle size={20} className="text-gray-400 dark:text-white shrink-0" />
      <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">Progress</h3>
    </div>

    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[12px] text-gray-600 dark:text-slate-300">{item.label}</span>
            <span className="text-[12px] font-semibold text-gray-900 dark:text-white">
              {item.percent}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${item.barColor}`}
              style={{ width: `${item.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
