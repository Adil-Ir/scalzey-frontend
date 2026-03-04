type DashboardSectionProps = {
  title: string;
  subtitle?: string;
};

export const DashboardSection = ({ title, subtitle }: DashboardSectionProps) => {
  return (
    <div className="space-y-3">
      <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-slate-400 max-w-2xl">{subtitle}</p>
      )}
      <div className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 min-h-[260px] flex items-center justify-center text-slate-500 text-sm">
        <span>This is the {title} page. Add your content here.</span>
      </div>
    </div>
  );
};

