import HeroBackground from "../../Components/ui/HeroBackground";

export default function BlogHero() {
  return (
    <div className="relative w-full py-36 overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Read.{" "}
            <span className="text-primary-500">The latest insights</span>{" "}
            <span className="block">from the tech frontier.</span>
          </h1>
          <p className="text-sm text-primary-400 dark:text-primary-300 max-w-xl mx-auto leading-relaxed">
            Expert reviews, how‑to guides, and industry news – everything you need to stay ahead in the world of tech.
          </p>
        </div>
      </div>
    </div>
  );
}