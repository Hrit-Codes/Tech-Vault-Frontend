export const BackgroundEffects = ({ animated = false }: { animated?: boolean }) => {
  return (
    <div className="fixed h-full inset-0 overflow-hidden pointer-events-none bg-white dark:bg-slate-900 -z-10">
      {/* Vertical lines */}
      <div className="absolute inset-0 grid grid-cols-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="border-l border-primary-200/10 h-full"
          />
        ))}
      </div>

      {/* Horizontal lines */}
      <div className="absolute inset-0 grid grid-rows-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="border-t border-primary-200/10 w-full"
          />
        ))}
      </div>

      {animated && (
        <div className="absolute inset-0 animate-pulse opacity-30">
          <div className="absolute inset-0 grid grid-cols-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`va-${i}`}
                className="border-l border-slate-900/20 dark:border-white/20 h-full"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};