const SKELETON_LABEL_WIDTHS = ["w-32", "w-24", "w-28", "w-20", "w-36", "w-24"];

export default function FilterSidebarSkeleton() {
  return (
    <aside className="w-full bg-section rounded-3xl border border-secondary-400/5 shadow-sm p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-16 rounded bg-neutral-200 animate-pulse" />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1 pb-6 border-b border-secondary-400/10">
        <div className="h-4 w-20 rounded bg-neutral-200 animate-pulse mb-2" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5">
            <div className="w-5 h-5 rounded-md bg-neutral-200 animate-pulse shrink-0" />
            <div
              className={`h-4 ${SKELETON_LABEL_WIDTHS[i % SKELETON_LABEL_WIDTHS.length]} rounded bg-neutral-200 animate-pulse`}
            />
          </div>
        ))}
      </div>

      {/* Brand */}
      <div className="flex flex-col gap-1 pb-6 border-b border-secondary-400/10">
        <div className="h-4 w-14 rounded bg-neutral-200 animate-pulse mb-2" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5">
            <div className="w-5 h-5 rounded-md bg-neutral-200 animate-pulse shrink-0" />
            <div
              className={`h-4 ${SKELETON_LABEL_WIDTHS[i % SKELETON_LABEL_WIDTHS.length]} rounded bg-neutral-200 animate-pulse`}
            />
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-3 pb-6 border-b border-secondary-400/10">
        <div className="h-4 w-24 rounded bg-neutral-200 animate-pulse" />
        <div className="flex items-center gap-3">
          <div className="w-full h-10 rounded-xl bg-neutral-200 animate-pulse" />
          <span className="text-description font-semibold">-</span>
          <div className="w-full h-10 rounded-xl bg-neutral-200 animate-pulse" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-1 pb-6 border-b border-secondary-400/10">
        <div className="h-4 w-14 rounded bg-neutral-200 animate-pulse mb-2" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 py-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <div
                  key={j}
                  className="w-[15px] h-[15px] rounded-sm bg-neutral-200 animate-pulse"
                />
              ))}
            </div>
            <div className="h-3.5 w-10 rounded bg-neutral-200 animate-pulse ml-1" />
          </div>
        ))}
      </div>

      {/* Offers */}
      <div className="flex flex-col gap-1">
        <div className="h-4 w-32 rounded bg-neutral-200 animate-pulse mb-2" />
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5">
            <div className="w-5 h-5 rounded-md bg-neutral-200 animate-pulse shrink-0" />
            <div
              className={`h-4 ${SKELETON_LABEL_WIDTHS[i % SKELETON_LABEL_WIDTHS.length]} rounded bg-neutral-200 animate-pulse`}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}