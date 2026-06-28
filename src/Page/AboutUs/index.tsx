import { CheckCircle, ShieldCheck, Zap, Layers } from "lucide-react";
import { ShopHero } from "../../Components/Shop/ShopHero";
import { promises, reasons } from "../../configs/constants";

export default function AboutUsPage() {
  return (
    <div className="w-full mx-auto flex flex-col">
      <ShopHero />

      <div className="w-full mx-auto bg-section">

        {/* ── 1. FOUNDER VISION ── */}
        <section className="w-full py-24 px-6">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — Text */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-secondary-400">
                  Since 2024
                </span>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  The Pursuit of<br />Visual Silence.
                </h1>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed font-semibold text-description">
                  TechVault was founded on the principle that the most powerful technology is the one that stays out of your way. Our journey in industrial design began with a simple goal: to eliminate the unnecessary and amplify the essential.
                </p>
                <p className="text-sm leading-relaxed font-semibold text-description">
                  From our first prototype to our global presence today, we maintain the same obsessive attention to detail that makes every TechVault product feel like a bespoke artifact for the digital age.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-10 h-px bg-primary-400 dark:bg-primary-600" />
                <button className="text-xs font-bold tracking-[0.2em] uppercase hover:text-secondary-500 transition-colors italic hover:cursor-pointer">
                  The Founder's Vision
                </button>
              </div>
            </div>

            {/* Right — Image with corner accents */}
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary-400 rounded-tr-lg z-10" />
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-primary-400 rounded-bl-lg z-10" />
              <div className="w-full h-full rounded-2xl overflow-hidden bg-primary-100 dark:bg-primary-950 grayscale">
                <div className="w-full h-full flex items-center justify-center text-primary-300 text-sm">
                  Office / Workspace Image
                </div>
              </div>
            </div>

          </div>

          <div className="w-full max-w-6xl mt-40 mx-auto flex flex-col items-center gap-16">
            <h2 className="w-fit border-b-4 border-secondary-400 pb-1 font-bold text-3xl">Our Promise</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
              {promises.map((promise, index) => (
                <div key={index} className="bg-section-alternative border border-secondary-400/5 hover:border-primary-400/30 px-5 py-5 flex flex-col gap-3 rounded-2xl shadow-sm">
                  <h4 className="flex gap-2 items-start min-h-[3.5rem] font-semibold text-base">
                    <CheckCircle className="text-primary-400 shrink-0 mt-0.5" strokeWidth={3} />
                    {promise.title}
                  </h4>
                  <p className="text-sm text-description font-semibold leading-relaxed">
                    {promise.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. WHY CHOOSE US ── */}
        <section className="w-full py-24 px-6 bg-section">
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-14">
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-secondary-400">The Template Advantage</span>
              <h2 className="text-3xl md:text-4xl font-bold">Why Leading Brands Trust Us</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
              {reasons.map((reason, index) => (
                <div key={index} className="group bg-section-alternative border border-secondary-400/5 p-8 rounded-3xl flex flex-col justify-between gap-8 hover:border-primary-400/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                      {index === 0 && <Zap size={22} />}
                      {index === 1 && <Layers size={22} />}
                      {index === 2 && <ShieldCheck size={22} />}
                    </div>
                    <h3 className="text-xl font-bold pt-2">{reason.title}</h3>
                    <p className="text-sm text-description leading-relaxed font-semibold">{reason.description}</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-400 bg-primary-500/5 px-3 py-1 w-fit rounded-md border border-primary-500/10">
                    {reason.highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. VISIT OUR OFFICE ── */}
        <section className="w-full py-30 pb-40 px-6 bg-section">
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold">Visit Our Main Office</h2>
            <p className="text-sm text-secondary-400 font-medium">123 Precision Way, Silicon Valley, CA 94025</p>

            <div className="w-full my-6 border border-primary-100 dark:border-primary-800 rounded-2xl overflow-hidden h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34205.42761585327!2d-74.02231133084236!3d40.73207638735103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2snp!4v1782582084682!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* ── 5. STATS ──
        <section className="w-full py-30 px-6 bg-section">
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-10">
            <h2 className="w-fit border-b-4 border-secondary-400 pb-1 font-bold text-3xl">By The Numbers</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
              {stats.map((stat, index) => (
                <div key={index} className="bg-section-alternative px-5 py-6 flex flex-col items-center gap-2 rounded-2xl border border-secondary-400/5 shadow-sm">
                  <h4 className="text-2xl font-bold">{stat.value}</h4>
                  <p className="text-sm text-primary-400 text-center leading-relaxed font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ── 6. STAY AHEAD ──
        <section className="w-full py-24 px-6 bg-section flex flex-col gap-6 items-center text-center">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">
              Stay ahead of the curve.
            </h2>
            <p className="text-sm text-description max-w-md leading-relaxed font-semibold">
              Subscribe to get exclusive access to new product drops, technical insights, and premium offers.
            </p>
          </div>
          <button className="px-6 py-3 rounded-full bg-primary-500 hover:bg-primary-500/80 text-white text-sm font-semibold transition-colors hover:cursor-pointer">
            Start Shopping
          </button>
        </section> */}

      </div>
    </div>
  );
}