import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  image: string;
  name: string;
  subtitle: string;
  basePrice: number;
  salePrice: number;
  isNew?: boolean;
  bgColor: string;
  slug: string;
  id: string;
}

export default function ProductCard({
  image,
  name,
  basePrice,
  salePrice,
  isNew,
  slug,
  id,
}: ProductCardProps) {
  const navigate = useNavigate();

  const hasSale = salePrice !== undefined && salePrice > 0 && salePrice < basePrice;

  return (
    <div
      key={id}
      onClick={() => navigate(`/product/${slug}`)}
      className="relative flex flex-col cursor-pointer group overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative rounded-2xl overflow-hidden aspect-square bg-white p-2">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {isNew && (
            <span className="bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase shadow-sm">
              New
            </span>
          )}
          {hasSale && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase shadow-sm">
              On Sale
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform hover:cursor-pointer border border-secondary-400/5"
          aria-label="Add to wishlist"
        >
          <Heart
            size={20}
            strokeWidth={3.5}
            className="text-secondary-400 hover:fill-secondary-400 transition-all"
          />
        </button>

        {/* Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out p-4"
        />

        {/* Add to Cart — slides up on hover */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
        >
          <button className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white py-3.5 text-sm font-semibold tracking-wide hover:bg-primary-600 transition-colors hover:cursor-pointer">
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-2 mt-3 px-1">
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className="font-semibold text-base truncate">{name}</h3>
        </div>

        {/* Price — column layout when on sale, single line otherwise */}
        <div className="shrink-0 flex flex-col items-end mt-0.5">
          {hasSale ? (
            <>
              <span className="text-xs sm:text-sm font-semibold text-description line-through">
                Rs. {basePrice.toLocaleString("en-IN")}
              </span>
              <span className="font-bold text-sm sm:text-base text-red-500 whitespace-nowrap">
                Rs. {salePrice.toLocaleString("en-IN")}
              </span>
            </>
          ) : (
            <span className="font-bold text-sm sm:text-base whitespace-nowrap">
              Rs. {basePrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}