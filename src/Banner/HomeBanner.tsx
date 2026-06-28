import { ArrowDown } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import scrollToSection from "../Components/ScrollToSection";

export default function HomeBannerSection() {
  return (
    <section className="relative overflow-hidden bg-section">
      <div className="relative max-w-6xl min-h-screen mx-auto py-30 grid grid-cols-1 justify-items-center md:grid-cols-2 gap-12 items-center place-items-center">
    
        {/* Left content */}
        <div className="space-y-6 flex flex-col px-2 lg:px-12 items-center lg:items-start text-center lg:text-left">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1 text-sm bg-secondary-800/10 text-primary-400 rounded-full border border-secondary-400/30 font-semibold">
              Nepal's Trusted Tech Store 🇳🇵
            </span>

            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
              Upgrade Your <br />
              <span className="text-primary-400">Tech Lifestyle</span>
            </h2>
          </div>

          <p className="max-w-sm md:max-w-lg lg:max-w-xl text-base md:text-lg leading-relaxed text-description font-normal">
            Premium tech accessories — earbuds, speakers, smartwatches and more.
            Genuine products with fast delivery across Nepal.
          </p>

          <div className="flex gap-4 justify-center lg:justify-start">
            <button className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-500/90 cursor-pointer transition">
              Shop Now
            </button>
            <button className="px-6 py-3 border border-secondary-400 rounded-xl text-description hover:bg-secondary-200/30 font-semibold cursor-pointer transition">
              Browse Categories
            </button>
          </div>
        </div>

        {/* Right visual */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-black/30 border border-[var(--primary)]/40 backdrop-blur flex items-center justify-center">
            <span className="text-description text-sm font-medium">
              Product Image / Slider
            </span>
          </div>
        </div>
      </div>

      {/* Social Floating Bars */}
      <div className="absolute text-description flex flex-row lg:flex-col z-10 bottom-14 left-4 gap-4">
        <div className="rounded-full flex justify-center outline-2 backdrop-blur-md p-3 items-center cursor-pointer hover:bg-secondary-100 hover:text-black transition-colors"><FaFacebookF size={20}/></div>
        <div className="rounded-full flex justify-center outline-2 backdrop-blur-md p-3 items-center cursor-pointer hover:bg-secondary-100 hover:text-black transition-colors"><FaInstagram size={20}/></div>
        <div className="rounded-full flex justify-center outline-2 backdrop-blur-md p-3 items-center cursor-pointer hover:bg-secondary-100 hover:text-black transition-colors"><RiTwitterXLine size={20}/></div>
        <div className="rounded-full flex justify-center outline-2 backdrop-blur-md p-3 items-center cursor-pointer hover:bg-secondary-100 hover:text-black transition-colors"><FaLinkedinIn size={20}/></div>
      </div>

      {/* Rotating Shop Side Bar */}
      <button onClick={() => scrollToSection("newArrivals")} className="absolute z-20 bottom-18 right-0 flex flex-row gap-4 items-center justify-center rotate-90 font-bold cursor-pointer border-r-2 border-t-2 border-zinc-200/40 text-description">
        <span className="uppercase tracking-widest text-md">Shop</span>
        <span className="flex items-center justify-center -rotate-90">
          <span className="animate-bounce text-[var(--primary)]">
            <ArrowDown size={34} />
          </span>
        </span>
      </button>
    </section>
  );
}