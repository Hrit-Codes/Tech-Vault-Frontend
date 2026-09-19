export default function ProductNFound({
  title = "Product not found",
  message = "We couldn't find what you're looking for. It may have been removed or the link is out of date.",
}) {
  return (
    <div className="min-h-[480px] w-full flex flex-col items-center justify-center bg-slate-50 px-6 py-16">
      <div className="relative w-full max-w-md">
        <svg
          viewBox="0 0 400 320"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* soft background blob */}
          <ellipse cx="200" cy="170" rx="150" ry="120" fill="#EEF2FF" />

          {/* browser window */}
          <g>
            <rect
              x="70"
              y="40"
              width="220"
              height="180"
              rx="10"
              fill="white"
              stroke="#E2E8F0"
              strokeWidth="2"
            />
            {/* title bar */}
            <path
              d="M70 50 a10 10 0 0 1 10 -10 h200 a10 10 0 0 1 10 10 v22 h-220 z"
              fill="#4F46E5"
            />
            <circle cx="86" cy="61" r="4" fill="#FCA5A5" />
            <circle cx="100" cy="61" r="4" fill="#FDE68A" />
            <circle cx="114" cy="61" r="4" fill="#A7F3D0" />

            {/* box icon */}
            <g transform="translate(150,95)">
              <path d="M0 22 L30 10 L60 22 L30 34 Z" fill="#C7D2FE" />
              <path d="M0 22 L30 34 L30 62 L0 50 Z" fill="#A5B4FC" />
              <path d="M60 22 L30 34 L30 62 L60 50 Z" fill="#818CF8" />
              {/* sparkle */}
              <path
                d="M22 -6 l0 10 M14 2 l16 0"
                stroke="#4F46E5"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M40 -10 l0 8 M36 -6 l8 0"
                stroke="#4F46E5"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* "product not found" text */}
            <text
              x="180"
              y="185"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="13"
              fill="#475569"
              fontWeight="600"
            >
              {title}
            </text>
          </g>

          {/* magnifying glass */}
          <g transform="translate(255,60) rotate(15)">
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="white"
              stroke="#1E293B"
              strokeWidth="6"
            />
            <line
              x1="49"
              y1="49"
              x2="72"
              y2="72"
              stroke="#1E293B"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </g>

          {/* sad shopping bag */}
          <g transform="translate(255,190)">
            <path
              d="M10 20 h70 l6 80 a8 8 0 0 1 -8 8 h-66 a8 8 0 0 1 -8 -8 z"
              fill="#F1F5F9"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            <path
              d="M28 24 v-10 a17 17 0 0 1 34 0 v10"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* sad face */}
            <circle cx="35" cy="62" r="4" fill="#1E293B" />
            <circle cx="61" cy="62" r="4" fill="#1E293B" />
            <path
              d="M32 88 q16 -14 32 0"
              fill="none"
              stroke="#1E293B"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* scattered dots */}
          <circle cx="60" cy="230" r="3" fill="#C7D2FE" />
          <circle cx="330" cy="250" r="3" fill="#C7D2FE" />
          <circle cx="340" cy="90" r="3" fill="#C7D2FE" />
          <rect x="45" y="60" width="6" height="6" fill="#C7D2FE" transform="rotate(45 48 63)" />
        </svg>
      </div>

      <h2 className="mt-6 text-xl font-semibold text-slate-800">{title}</h2>
      <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
        {message}
      </p>

    </div>
  );
}