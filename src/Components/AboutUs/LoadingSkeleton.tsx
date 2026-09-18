export default function AboutUsPageSkeleton() {
  return (
    <div className="w-full mx-auto bg-section">
      {/* Story */}
      <section className="w-full py-24 px-6">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="h-3 w-24 bg-neutral-200 rounded animate-pulse" />
              <div className="h-12 w-3/4 bg-neutral-200 rounded animate-pulse" />
              <div className="h-12 w-2/3 bg-neutral-200 rounded animate-pulse" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-neutral-200 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-neutral-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <div className="w-10 h-px bg-primary-400/20" />
              <div className="h-3 w-44 bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="w-full aspect-[4/3] rounded-2xl bg-neutral-200 animate-pulse" />
        </div>

        {/* Promise */}
        <div className="w-full max-w-6xl mt-40 mx-auto flex flex-col items-center gap-16">
          <div className="h-8 w-48 bg-neutral-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-section-alternative border border-secondary-400/5 px-5 py-5 flex flex-col gap-3 rounded-2xl"
              >
                <div className="h-5 w-3/4 bg-neutral-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-neutral-200 rounded animate-pulse" />
                <div className="h-4 w-3/6 bg-neutral-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-section">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-3 w-24 bg-neutral-200 rounded animate-pulse" />
            <div className="h-8 w-72 bg-neutral-200 rounded animate-pulse" />
          </div>
          <div className="w-full px-2 sm:px-4 space-y-3 sm:space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-14 w-full bg-neutral-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="w-full py-30 pb-40 px-6 bg-section">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-4">
          <div className="h-8 w-64 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-80 bg-neutral-200 rounded animate-pulse" />
          <div className="w-full my-6 rounded-2xl h-[500px] bg-neutral-200 animate-pulse" />
        </div>
      </section>
    </div>
  );
}