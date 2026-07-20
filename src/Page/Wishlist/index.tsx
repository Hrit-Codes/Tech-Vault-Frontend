import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, X } from "lucide-react";
import SliderComponent from "react-slick";
import ProductCard from "../../Components/Product/ProductCard";
import UltraWatch from "@/Assets/Products/UltraWatchSeries8.webp";
import MacbookAir from "@/Assets/Products/MacbookAir15.webp";
import IpadPro from "@/Assets/Products/IpadPro.webp";
import SoundCoreMax from "@/Assets/Products/SoundCoreMax.webp";
import SonicPodPro from "@/Assets/Products/SonicPodPro.webp";

const Slider = (SliderComponent as any).default || SliderComponent;

const initialWishlist = [
  {
    id: 1,
    image: UltraWatch,
    name: "UltraWatch Series 8",
    subtitle: "Midnight Aluminum",
    price: 399.0,
    isNew: true,
    description:
      "The ultimate smartwatch with advanced health tracking, 18-hour battery life, and always-on Retina display.",
  },
  {
    id: 2,
    image: SonicPodPro,
    name: "SonicPod Pro",
    subtitle: "Noise Cancelling",
    price: 249.0,
    isNew: false,
    description:
      "Premium wireless earbuds with active noise cancellation, spatial audio, and 24-hour total battery life.",
  },
  {
    id: 3,
    image: MacbookAir,
    name: "TechBook Air 15",
    subtitle: "M2 Chip / 16GB RAM",
    price: 1299.0,
    isNew: false,
    description:
      "Ultra-slim laptop featuring the M2 chip, 16GB unified memory, and all-day battery life for ultimate productivity.",
  },
  {
    id: 4,
    image: IpadPro,
    name: "PadVision Pro",
    subtitle: "Retina XDR Display",
    price: 899.0,
    isNew: false,
    description:
      "Revolutionary tablet with Retina XDR display, M2 chip, and Pencil hover support for creatives and professionals.",
  },
  {
    id: 5,
    image: SoundCoreMax,
    name: "SoundCore Max",
    subtitle: "360° Audio",
    price: 199.0,
    isNew: false,
    description:
      "Portable speaker with immersive 360° audio, 20-hour battery life, and waterproof design for any environment.",
  },
];

const recommendations = [
  { id: 1, image: UltraWatch, name: "UltraWatch Series 8", subtitle: "Midnight Aluminum", price: 399.0, isNew: true },
  { id: 2, image: SonicPodPro, name: "SonicPod Pro", subtitle: "Noise Cancelling", price: 249.0 },
  { id: 3, image: MacbookAir, name: "TechBook Air 15", subtitle: "M2 Chip / 16GB RAM", price: 1299.0 },
  { id: 4, image: IpadPro, name: "PadVision Pro", subtitle: "Retina XDR Display", price: 899.0 },
  { id: 5, image: SoundCoreMax, name: "SoundCore Max", subtitle: "360° Audio", price: 199.0 },
];

function getSlidesToShow(width: number) {
  if (width < 640) return 2;
  if (width < 1024) return 3;
  return 4;
}

export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState(initialWishlist);
  const [slidesToShow, setSlidesToShow] = useState(() =>
    getSlidesToShow(typeof window === "undefined" ? 1280 : window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => setSlidesToShow(getSlidesToShow(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const removeItem = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full bg-section">
      <div className="w-full max-w-6xl mx-auto py-30 flex flex-col gap-10 px-6">

        {/* Header */}
        <div className="w-full flex flex-col gap-2">
          <h2 className="heading-page">Wishlist</h2>
          <h3 className="text-sm text-description">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </h3>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="w-full flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-section-alternative flex items-center justify-center">
              <Heart size={28} className="text-secondary-400" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
              <p className="text-sm text-description">Save items you love and find them here anytime.</p>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="mt-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-2xl font-medium text-sm transition-colors hover:cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-14">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col cursor-pointer group bg-section-alternative rounded-2xl overflow-hidden border border-secondary-400/5 hover:border-primary-400/30 transition-colors"
              >

                {/* Image Container */}
                <div className="relative overflow-hidden aspect-square">
                  {item.isNew && (
                    <span className="absolute top-3 left-3 z-10 bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase shadow-sm">
                      New
                    </span>
                  )}

                  {/* Remove */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform hover:cursor-pointer border border-secondary-400/5"
                    aria-label="Remove from wishlist"
                  >
                    <X size={18} strokeWidth={3} className="text-secondary-500" />
                  </button>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 p-6"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-4 px-5 py-6">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex flex-row items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-lg font-semibold shrink-0">${item.price.toFixed(2)}</p>
                    </div>
                    <p className="text-sm font-medium text-description">{item.subtitle}</p>
                  </div>
                  <p className="text-xs text-description leading-relaxed">{item.description}</p>

                  {/* Actions */}
                  <div className="w-full flex flex-col gap-3 text-center font-medium mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.id);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-2xl hover:cursor-pointer transition-colors text-sm"
                    >
                      <ShoppingCart size={16} />
                      Move to Cart
                    </button>
                    <button
                      onClick={() => navigate("/product")}
                      className="cursor-pointer text-secondary-500 hover:underline hover:text-secondary-400 transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
        <div className="w-full max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="heading-section">You Might Also Like</h2>
              <h3 className="text-sm font-normal text-description leading-relaxed mt-1">
                Handpicked recommendations based on your taste.
              </h3>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="text-sm text-secondary-500 hover:text-secondary-600 font-semibold transition-colors cursor-pointer"
            >
              View All
            </button>
          </div>

          <Slider
            dots={false}
            infinite
            autoplay
            autoplaySpeed={3000}
            speed={500}
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            arrows={false}
            pauseOnHover
          >
            {recommendations.map((product) => (
              <div key={product.id} className="px-2 sm:px-4 md:px-6">
                <ProductCard
                  image={product.image}
                  name={product.name}
                  subtitle={product.subtitle}
                  price={product.price}
                  isNew={product.isNew}
                  bgColor="bg-section"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
