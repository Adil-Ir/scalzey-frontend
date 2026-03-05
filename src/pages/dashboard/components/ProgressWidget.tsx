import { HiOutlineInformationCircle } from "react-icons/hi";

interface ProgressItem {
  id: number;
  label: string;
  percent: number;
  barColor: string;
}

const PROGRESS_ITEMS: ProgressItem[] = [
  { id: 1, label: "Product Design",     percent: 75, barColor: "bg-orange-400" },
  { id: 2, label: "Project Management", percent: 15, barColor: "bg-sky-400" },
  { id: 3, label: "Advanced Java",      percent: 60, barColor: "bg-sky-400" },
  { id: 4, label: "Project Management", percent: 96, barColor: "bg-emerald-400" },
];

export const ProgressWidget = () => {
  return (
    <div
      className="bg-white dark:bg-[#1D242A] h-full flex flex-col"
      style={{ borderRadius: "26.53px", padding: "24px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <HiOutlineInformationCircle size={18} className="text-gray-600 dark:text-white shrink-0" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Progress</h3>
      </div>

      <div className="flex flex-col gap-5 flex-1">
        {PROGRESS_ITEMS.map((item) => (
          <div key={item.id}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] text-gray-700 dark:text-slate-300">
                {item.label}
              </span>
              <span className="text-[13px] font-semibold text-gray-900 dark:text-white">
                {item.percent}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
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
};
