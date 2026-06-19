import { ArrowDown,Facebook, Instagram, Linkedin, X } from "lucide-react";

export default function HomeBannerSection() {
  return (
    <section className="relative overflow-hidden bg-section">

      <div className="relative max-w-6xl min-h-screen mx-auto py-30 grid grid-cols-1 justify-items-center md:grid-cols-2 gap-12 items-center place-items-center">
    
        {/* Left content */}
        <div className="space-y-6 flex flex-col px-2 lg:px-12  items-center lg:items-start text-center lg:text-left">
          <div className="space-y-4">
          <span className="inline-block px-4 py-1 text-sm bg-[#74c69d]/10 text-[var(--primary)] rounded-full border border-[#74c69d]/30">
              Nepal's Trusted Tech Store 🇳🇵
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
              Upgrade Your <br />
              <span className="text-[var(--primary)]">Tech Lifestyle</span>
          </h1>
          </div>

          <p className=" max-w-sm md:max-w-lg lg:max-w-xl text-base md:text-lg">
              Premium tech accessories — earbuds, speakers, smartwatches and more.
              Genuine products with fast delivery across Nepal.
          </p>

          <div className="flex gap-4 justify-center lg:justify-start">
              <button className="px-6 py-3 bg-[var(--primary)] text-black font-semibold rounded-xl hover:bg-[var(--primary-hover)] cursor-pointer transition">
              Shop Now
              </button>
              <button className="px-6 py-3 border border-[#60A5FA]/40 text-[var(--primary)] rounded-xl hover:bg-[var(--primary-hover)]/10 cursor-pointer transition">
              Browse Categories
              </button>
          </div>

        </div>

        {/* Right visual */}
        <div className="flex justify-center lg:justify-end">
        <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-black/30 border border-[var(--primary)]/40 backdrop-blur flex items-center justify-center">
            <span className="text-white/50 text-sm">
            Product Image / Slider
            </span>
        </div>


        </div>
        

    </div>

    <div className="absolute flex flex-row lg:flex-col z-10 bottom-14 left-4 gap-4">
      <div className="rounded-full bg-[var(--primary)]/30 outline-2 backdrop-blur-md p-3 items-center cursor-pointer hover:text-[var(--primary)] hover:outline-[var(--primary)]"><Facebook/></div>
      <div className="rounded-full bg-[var(--primary)]/30 outline-2 backdrop-blur-md p-3 items-center cursor-pointer hover:text-[var(--primary)] hover:outline-[var(--primary)]"><Instagram/></div>
      <div className="rounded-full bg-[var(--primary)]/30 outline-2 backdrop-blur-md p-3 items-center cursor-pointer hover:text-[var(--primary)] hover:outline-[var(--primary)]"><X/></div>
      <div className="rounded-full bg-[var(--primary)]/30 outline-2 backdrop-blur-md p-3 items-center cursor-pointer hover:text-[var(--primary)] hover:outline-[var(--primary)]"><Linkedin/></div>
    </div>

    <a className="absolute z-20 bottom-18 right-0 flex flex-row gap-4 items-center justify-center rotate-90 font-bold cursor-pointer border-r-2 border-t-2 border-zinc-200/40">
      <span className="text-white/70 uppercase tracking-widest text-md">Shop</span>
      <span className="flex items-center justify-center -rotate-90">
        <span className="animate-bounce text-[var(--primary)]">
          <ArrowDown size={34} />
        </span>
      </span>
    </a>
    </section>
  );
}
