export function PromotionalBanners() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1 */}
        <a 
          href="/product" 
          className="group relative overflow-hidden rounded-2xl block shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <img 
            src="/Promotions/banner1.webp" 
            alt="Soundcore Liberty 4 Pro - Available Now" 
            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-300"
          />
        </a>

        {/* Banner 2 */}
        <a 
          href="/product" 
          className="group relative overflow-hidden rounded-2xl block shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <img 
            src="/Promotions/banner2.webp" 
            alt="HiFuture FlyBuds 4 - Available Now" 
            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-300"
          />
        </a>
      </div>
    </section>
  );
}