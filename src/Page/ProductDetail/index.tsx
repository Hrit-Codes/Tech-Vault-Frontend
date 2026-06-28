import { useState } from "react";
import { Heart, ShoppingBag, Star, Ticket, } from "lucide-react";
import { product, specifications, reviews } from "../../configs/constants";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full bg-section">

        <div className="w-full max-w-6xl mx-auto py-36 grid grid-cols-1 lg:grid-cols-2 gap-10 ">

            {/* Left — Image Gallery */}
            <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-primary-100 dark:bg-primary-800">
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
                    className={`flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i
                        ? "border-primary-900 dark:border-white"
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
                <span className="text-xs font-semibold tracking-widest px-3 py-1 rounded-full border border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-300">
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
                <span className="text-sm text-primary-400 ml-1">
                    {product.rating} ({product.reviews} reviews)
                </span>
                </div>
            </div>

            {/* Title + Description */}
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold ">
                {product.name}
                </h1>
                <p className="text-sm leading-relaxed text-description">
                {product.description}
                </p>
            </div>

            {/* Price Box */}
            <div className="bg-section-alternative rounded-2xl px-6 py-5 flex flex-col gap-5">
                <div className="flex items-end justify-between">
                <div className="flex flex-col gap-0.5">
                    <p className="text-xs text-primary-400 dark:text-primary-400">Starting from</p>
                    <h2 className="text-3xl font-bold ">
                    ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </h2>
                </div>
                {product.freeShipping && (
                    <span className="text-sm font-medium text-secondary-500">Free Shipping</span>
                )}
                </div>

                <div className="flex flex-col gap-3">
                <button className="w-full flex items-center justify-center gap-2 bg-primary-900 dark:bg-white text-white dark:text-primary-900 py-4 rounded-xl font-semibold text-sm hover:bg-primary-700 dark:hover:bg-primary-100 transition-colors hover:cursor-pointer">
                    <ShoppingBag size={18} />
                    Add to Cart
                </button>
                <button className="w-full flex items-center justify-center gap-2 border-2 border-primary-200 dark:border-primary-700  py-4 rounded-xl font-semibold text-sm hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors hover:cursor-pointer">
                    <Heart size={18} />
                    Add to Wishlist
                </button>
                </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-4 pt-2">
                {product.specs.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <Icon size={24} className="text-secondary-400 " />
                    <div>
                    <p className="text-sm font-bold ">{label}</p>
                    <p className="text-xs ">{sub}</p>
                    </div>
                </div>
                ))}
            </div>

            </div>
        </div>

        <div className="bg-section-alternative py-8 px-8">
            <div className="w-full max-w-6xl mx-auto py-14">
            <div className="flex flex-col gap-3 text-center">
                <h2 className="text-3xl font-semibold">Technical Specifications</h2>
                <h3 className="text-sm text-description">Precision tuned hardware components designed to deliver unparalled performance for demanding creative workflows.</h3>
            </div>

            <div className="flex flex-row flex-wrap my-10 gap-6">
                {specifications.map((specification) => (
                    <div
                        key={specification.title}
                        className="flex flex-col gap-5 p-6 rounded-2xl bg-section border border-primary-100 dark:border-primary-800 w-[calc(33.333%-1rem)]"
                    >
                        <div className="w-10 h-10 rounded-xl bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center">
                            <Ticket size={20} className="text-secondary-400" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base font-bold">{specification.title}</h3>
                            <p className="text-sm leading-relaxed text-description">{specification.description} </p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>

        {/* Customer Reviews */}
        <div className="w-full bg-section">
            <div className="w-full max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">

                {/* Left — Rating Summary */}
                <div className="flex flex-col gap-5">
                    <h2 className="text-3xl font-bold ">Customer Reviews</h2>

                    <div className="flex items-center gap-3">
                        <span className="text-5xl font-bold text-primary-900 dark:text-white">{product.rating}</span>
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
                            <p className="text-xs text-primary-400 dark:text-primary-400">Based on {product.reviews} reviews</p>
                        </div>
                    </div>

                    <button className="border-2 border-primary-200 dark:border-primary-700 dark:text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors hover:cursor-pointer">
                        Write a Review
                    </button>
                </div>

                {/* Right — Review List */}
                <div className="flex flex-col">
                    {reviews.map((review, i) => (
                        <div
                            key={review.name}
                            className={`flex flex-col gap-3 py-10 ${i !== reviews.length - 1 ? "border-b border-primary-100 dark:border-primary-800" : ""}`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col gap-0.5">
                                    <h4 className="text-base font-bold ">{review.name}</h4>
                                    <p className="text-xs text-primary-400 dark:text-primary-400">{review.date}</p>
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
                            <p className="text-sm leading-relaxed text-description">
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