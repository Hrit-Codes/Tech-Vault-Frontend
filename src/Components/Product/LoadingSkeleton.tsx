export default function ProductDetailSkeleton() {
  return (
    <div className="w-full bg-section">
      {/* ── Main: gallery + info ── */}
      <div className="w-full max-w-6xl mx-auto py-36 grid grid-cols-1 lg:grid-cols-2 gap-10 px-6">
        {/* Left — Gallery */}
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-square rounded-2xl bg-neutral-200 animate-pulse" />
          <div className="flex flex-row gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-24 h-16 rounded-xl bg-neutral-200 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Right — Info */}
        <div className="flex flex-col gap-6">
          {/* Badge + rating */}
          <div className="flex items-center gap-4">
            <div className="h-6 w-24 rounded-full bg-neutral-200 animate-pulse" />
            <div className="h-4 w-40 rounded bg-neutral-200 animate-pulse" />
          </div>

          {/* Title + description */}
          <div className="flex flex-col gap-3">
            <div className="h-10 w-3/4 rounded bg-neutral-200 animate-pulse" />
            <div className="h-4 w-full rounded bg-neutral-200 animate-pulse" />
            <div className="h-4 w-full rounded bg-neutral-200 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-neutral-200 animate-pulse" />
          </div>

          {/* Color selector */}
          <div className="flex flex-col gap-3">
            <div className="h-3 w-16 rounded bg-neutral-200 animate-pulse" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-neutral-200 animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Variant selector */}
          <div className="flex flex-col gap-3">
            <div className="h-3 w-20 rounded bg-neutral-200 animate-pulse" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-20 rounded-xl bg-neutral-200 animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Price box */}
          <div className="bg-section-alternative rounded-2xl px-6 py-5 flex flex-col gap-5 border border-secondary-400/5">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2">
                <div className="h-3 w-20 rounded bg-neutral-200 animate-pulse" />
                <div className="h-8 w-32 rounded bg-neutral-200 animate-pulse" />
              </div>
              <div className="h-4 w-24 rounded bg-neutral-200 animate-pulse" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-14 w-full rounded-xl bg-neutral-200 animate-pulse" />
              <div className="h-14 w-full rounded-xl bg-neutral-200 animate-pulse" />
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex gap-3 flex-wrap">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-12 w-40 rounded-2xl bg-neutral-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="border-y border-secondary-400/20 py-28 px-6">
        <div className="w-full max-w-6xl mx-auto">
          <div className="w-full flex items-center border-b border-secondary-400/20">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-12 w-32 bg-neutral-200 animate-pulse border border-neutral-500"
              />
            ))}
          </div>
          <div className="py-10 max-w-3xl flex flex-col gap-4">
            <div className="h-4 w-full rounded bg-neutral-200 animate-pulse" />
            <div className="h-4 w-full rounded bg-neutral-200 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-neutral-200 animate-pulse" />
            <div className="h-4 w-4/6 rounded bg-neutral-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* ── Reviews ── */}
      <div className="w-full bg-section border-t border-secondary-400/5">
        <div className="w-full max-w-6xl mx-auto py-28 px-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          {/* Left — Rating summary */}
          <div className="flex flex-col gap-5">
            <div className="h-8 w-44 rounded bg-neutral-200 animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="h-12 w-14 rounded bg-neutral-200 animate-pulse" />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-24 rounded bg-neutral-200 animate-pulse" />
                <div className="h-3 w-32 rounded bg-neutral-200 animate-pulse" />
              </div>
            </div>
            <div className="h-12 w-full rounded-xl bg-neutral-200 animate-pulse" />
          </div>

          {/* Right — Review list */}
          <div className="flex flex-col gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 pb-8 border-b border-primary-400/20 last:border-0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-28 rounded bg-neutral-200 animate-pulse" />
                    <div className="h-3 w-20 rounded bg-neutral-200 animate-pulse" />
                  </div>
                  <div className="h-4 w-20 rounded bg-neutral-200 animate-pulse" />
                </div>
                <div className="h-4 w-full rounded bg-neutral-200 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-neutral-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}