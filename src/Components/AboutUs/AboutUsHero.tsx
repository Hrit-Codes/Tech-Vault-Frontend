import HeroBackground from "../ui/HeroBackground";

export function AboutUsHero() {
    return (
        <section className="relative w-full py-36 overflow-hidden">
            <HeroBackground/>
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-8">
                <div className="flex flex-col gap-4">
                    {/* <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary-500">
                        Who We Are
                    </span> */}
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Built for the{" "}
                        <span className="text-primary-500">relentless</span>
                        <span className="block">pursuit of better tech.</span>
                    </h1>
                    <p className="text-sm text-primary-400 dark:text-primary-300 max-w-xl mx-auto leading-relaxed">
                        TechVault was born in Nepal with one mission — to make premium, genuine technology accessible to everyone who demands more from their devices.
                    </p>
                </div>
            </div>
        </section>
    );
}