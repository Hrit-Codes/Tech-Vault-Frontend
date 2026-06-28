export default function HeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

            {/* Base */}
            <div className="absolute inset-0 bg-white dark:bg-slate-900" />

            {/* Vertical grid lines */}
            <div className="absolute inset-0 grid grid-cols-6">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="border-l border-primary-200/30 dark:border-white/5 h-full" />
                ))}
            </div>

            {/* Horizontal grid lines */}
            <div className="absolute inset-0 grid grid-rows-8">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border-t border-primary-200/30 dark:border-white/5 w-full" />
                ))}
            </div>

            {/* Corner circuit accent — top left */}
            <svg className="absolute top-0 left-0 w-64 h-64 opacity-30 dark:opacity-20" viewBox="0 0 200 200" fill="none">
                <path d="M0 60 H40 V20 H100" stroke="#f97316" strokeWidth="1" />
                <path d="M0 100 H60 V40 H140" stroke="#f97316" strokeWidth="0.5" />
                <circle cx="40" cy="20" r="3" fill="#f97316" />
                <circle cx="100" cy="20" r="2" fill="#f97316" />
                <circle cx="60" cy="40" r="3" fill="#f97316" />
                <path d="M0 140 H20 V80 H80 V60 H120" stroke="#f97316" strokeWidth="0.5" opacity="0.5" />
            </svg>

            {/* Corner circuit accent — bottom right */}
            <svg className="absolute bottom-0 right-0 w-64 h-64 opacity-30 dark:opacity-20" viewBox="0 0 200 200" fill="none">
                <path d="M200 140 H160 V180 H100" stroke="#f97316" strokeWidth="1" />
                <path d="M200 100 H140 V160 H60" stroke="#f97316" strokeWidth="0.5" />
                <circle cx="160" cy="180" r="3" fill="#f97316" />
                <circle cx="100" cy="180" r="2" fill="#f97316" />
                <circle cx="140" cy="160" r="3" fill="#f97316" />
            </svg>

            {/* Dot cluster — top right */}
            <svg className="absolute top-8 right-16 w-32 h-32 opacity-25 dark:opacity-15" viewBox="0 0 100 100">
                {Array.from({ length: 5 }).map((_, row) =>
                    Array.from({ length: 5 }).map((_, col) => (
                        <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="1.5" fill="#f97316" />
                    ))
                )}
            </svg>

            {/* Dot cluster — bottom left */}
            <svg className="absolute bottom-8 left-16 w-32 h-32 opacity-25 dark:opacity-15" viewBox="0 0 100 100">
                {Array.from({ length: 5 }).map((_, row) =>
                    Array.from({ length: 5 }).map((_, col) => (
                        <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="1.5" fill="#f97316" />
                    ))
                )}
            </svg>

            {/* Orange glow — center left */}
            <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-primary-500/10 dark:bg-primary-500/10 blur-3xl" />

            {/* Blue glow — center right */}
            <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-secondary-500/10 dark:bg-secondary-500/10 blur-3xl" />

            {/* Extra light mode warm tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-transparent to-secondary-50/20 dark:hidden" />

        </div>
    );
}