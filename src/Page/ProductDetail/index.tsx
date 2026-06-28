import { useState } from "react";
import { Heart, ShoppingBag, Star, Ticket } from "lucide-react";
import { product, specifications, reviews } from "../../configs/constants";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full bg-section">
      <div className="w-full max-w-6xl mx-auto py-36 grid grid-cols-1 lg:grid-cols-2 gap-10 px-6">

        {/* Left — Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-section-alternative border border-secondary-400/5">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-row gap-3 overflow-x-auto pb-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all hover:cursor-pointer ${
                  selectedImage === i
                    ? "border-primary-500"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right — Product Info */}
        <div className="flex flex-col gap-6">

          {/* Badge + Rating */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold tracking-widest px-3 py-1 rounded-full border border-primary-400 text-primary-500 bg-primary-500/5">
              {product.badge}
            </span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating) ? "fill-secondary-500 text-secondary-500" : "fill-secondary-300 text-secondary-300"}
                />
              ))}
              <span className="text-sm text-description font-medium ml-1">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Title + Description */}
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>
            <p className="text-sm leading-relaxed font-semibold text-description">
              {product.description}
            </p>
          </div>

          {/* Price Box */}
          <div className="bg-section-alternative rounded-2xl px-6 py-5 flex flex-col gap-5 border border-secondary-400/5">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-description font-semibold">Starting from</p>
                <h2 className="text-3xl font-bold">
                  ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </h2>
              </div>
              {product.freeShipping && (
                <span className="text-sm font-bold text-secondary-500 uppercase tracking-wider">Free Shipping</span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-semibold text-sm transition-colors hover:cursor-pointer">
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button className="w-full flex items-center justify-center gap-2 border-2 border-primary-400/30 py-4 rounded-xl font-semibold text-sm hover:bg-section transition-colors hover:cursor-pointer text-description">
                <Heart size={18} />
                Add to Wishlist
              </button>
            </div>
          </div>

          {/* Specs Mini Summary */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {product.specs.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon size={24} className="text-secondary-400" />
                <div>
                  <p className="text-sm font-bold">{label}</p>
                  <p className="text-xs text-description font-semibold mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Deep Dive Technical Specifications Section */}
      <div className="bg-section-alternative py-8 px-6 border-t border-secondary-400/5">
        <div className="w-full max-w-6xl mx-auto py-14">
          <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Technical Specifications</h2>
            <h3 className="text-sm text-description font-semibold leading-relaxed">
              Precision tuned hardware components designed to deliver unparalleled performance for demanding creative workflows.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            {specifications.map((specification) => (
              <div
                key={specification.title}
                className="flex flex-col gap-5 p-6 rounded-2xl bg-section border border-secondary-400/5 hover:border-primary-400/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary-500/10 flex items-center justify-center">
                  <Ticket size={20} className="text-secondary-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold">{specification.title}</h3>
                  <p className="text-sm leading-relaxed text-description font-semibold">{specification.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="w-full bg-section border-t border-secondary-400/5">
        <div className="w-full max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">

          {/* Left — Rating Summary */}
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Customer Reviews</h2>

            <div className="flex items-center gap-3">
              <span className="text-5xl font-bold">{product.rating}</span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.round(product.rating) ? "fill-secondary-500 text-secondary-500" : "fill-secondary-300 text-secondary-300"}
                    />
                  ))}
                </div>
                <p className="text-xs text-description font-semibold">Based on {product.reviews} reviews</p>
              </div>
            </div>

            <button className="border-2 border-primary-400/30 py-3 rounded-xl font-semibold text-sm hover:bg-primary-400 transition-colors hover:cursor-pointer hover:text-white">
              Write a Review
            </button>
          </div>

          {/* Right — Review List */}
          <div className="flex flex-col">
            {reviews.map((review, i) => (
              <div
                key={review.name}
                className={`flex flex-col gap-3 py-10 ${i !== reviews.length - 1 ? "border-b border-primary-400/30" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-base font-bold">{review.name}</h4>
                    <p className="text-xs text-description font-semibold">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? "fill-secondary-500 text-secondary-500" : "fill-secondary-300 text-secondary-300"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-description font-semibold">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}