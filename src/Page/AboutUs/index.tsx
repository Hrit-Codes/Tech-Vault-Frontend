import { CheckCircle } from "lucide-react";
import { faqItems, promises } from "../../configs/constants";
import { AboutUsHero } from "../../Components/AboutUs/AboutUsHero";
import FaqAccordion from "./FaqAccordion";

export default function AboutUsPage() {
  return (
    <div className="w-full mx-auto flex flex-col">
      <AboutUsHero/>

      <div className="w-full mx-auto bg-section">

        {/* ── 1. OUR STORY ── */}
        <section className="w-full py-24 px-6">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — Text */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-secondary-400">
                  Since 2024
                </span>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Trusted Tech,<br />Made Accessible.
                </h1>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed font-semibold text-description">
                  TechVault was built on a simple idea: finding great tech accessories shouldn't mean gambling on authenticity or overpaying for the privilege of trust. We started by connecting a handful of buyers with verified, quality-checked products — and that same standard has guided every decision since.
                </p>
                <p className="text-sm leading-relaxed font-semibold text-description">
                  Today, thousands of customers rely on TechVault to source everything from everyday essentials to premium gear, backed by careful selection, transparent pricing, and support that actually helps. As our catalog has grown, our commitment to getting the details right hasn't changed.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-10 h-px bg-primary-400 dark:bg-primary-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-secondary-400">
                  Built On Trust, Driven By Detail
                </span>
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
            <h2 className="heading-section w-fit border-b-4 border-secondary-400 pb-1">Our Promise</h2>

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
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-secondary-400">Quick Answers</span>
              <h2 className="heading-section">Frequently Asked Questions</h2>
            </div>

              <div className="px-8 lg:px-16 xl:px-24 w-4xl mx-auto">
                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <FaqAccordion key={index} question={faq.question} answer={faq.answer}/>
                  ))}
                </div>
              </div>
          </div>
        </section>

        {/* ── 4. VISIT OUR OFFICE ── */}
        <section className="w-full py-30 pb-40 px-6 bg-section">
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-4">
            <h2 className="heading-section">Visit Our Main Office</h2>
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

      </div>
    </div>
  );
}