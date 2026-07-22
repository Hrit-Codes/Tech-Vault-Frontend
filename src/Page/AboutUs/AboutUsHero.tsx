import HeroBackground from "../../Components/ui/HeroBackground";

export default function AboutHero() {
  return (
    <section className="relative w-full py-36 overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            About.{" "}
            <span className="text-primary-500">The pursuit</span>{" "}
            <span className="block">of visual silence.</span>
          </h1>
          <p className="text-sm text-primary-400 dark:text-primary-300 max-w-xl mx-auto leading-relaxed">
            Founded on the principle that the most powerful technology is the one that stays out of your way.
          </p>
        </div>
      </div>
    </section>
  );
}