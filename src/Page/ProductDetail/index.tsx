import { useEffect, useMemo, useState } from "react";
import { CheckIcon, Heart, ShoppingBag, Star, Tag } from "lucide-react";
import { reviews } from "../../configs/constants";
import ProductDescriptionTab from "../../Components/Product/Tab/ProductDescriptionTab";
import ProductFeaturesTab from "../../Components/Product/Tab/ProductFeaturesTab";
import ProductSpecificationTab from "../../Components/Product/Tab/ProductSpecificationTab";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../../apis/modules/products";
import ProductDetailSkeleton from "../../Components/Product/LoadingSkeleton";
import ProductNotFoundPage from "../../Components/Product/ProductNotFound";
import ServerError from "../../Components/ui/ServerError";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: productResponse,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
    refetch: refetchProduct,
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug!),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!slug,
  });

  const isProductNotFound = (productError as any)?.response?.status === 404;
  const product = productResponse?.data.data;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedButton, setSelectedButton] = useState<
    "description" | "specifications" | "features"
  >("description");

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedVariantType, setSelectedVariantType] = useState<string | null>(null);

  // ─── Derived lists ────────────────────────────────────────
  const colors = useMemo(() => {
    if (!product) return [];
    const seen = new Set<string>();
    return product.variants
      .filter((v) => v.color && v.isActive)
      .map((v) => v.color as string)
      .filter((c) => (seen.has(c) ? false : (seen.add(c), true)));
  }, [product]);

  const variantTypes = useMemo(() => {
    if (!product) return [];
    const seen = new Set<string>();
    return product.variants
      .filter((v) => v.variant && v.isActive)
      .map((v) => v.variant as string)
      .filter((v) => (seen.has(v) ? false : (seen.add(v), true)));
  }, [product]);

  // Auto-select the first option when data loads
  useEffect(() => {
    if (colors.length && !selectedColor) setSelectedColor(colors[0]);
    if (variantTypes.length && !selectedVariantType)
      setSelectedVariantType(variantTypes[0]);
  }, [colors, variantTypes, selectedColor, selectedVariantType]);

  // The variant matching the current selection
  const selectedVariant = useMemo(() => {
    if (!product) return null;
    return (
      product.variants.find(
        (v) =>
          v.isActive &&
          (colors.length === 0 || v.color === selectedColor) &&
          (variantTypes.length === 0 || v.variant === selectedVariantType),
      ) ?? null
    );
  }, [product, colors.length, variantTypes.length, selectedColor, selectedVariantType]);

  // Effective price + stock for the current selection
  const displayedPrice = selectedVariant?.priceOverride ?? product?.price ?? 0;
  const isSelectedInStock =
    (selectedVariant?.stockOverride ?? product?.stock ?? 0) > 0;

  // On-sale derivation — a sale is only real when the flag is on and the
  // sale price is a positive number below the base price.
  const basePrice = product?.price ?? 0;
  const salePrice = product?.salePrice ?? 0;
  const displayedHasSale = Boolean(
    product?.onSale &&
      displayedPrice > 0 &&
      salePrice > 0 &&
      salePrice < basePrice &&
      (selectedVariant?.priceOverride ?? basePrice) > salePrice
  );
  const displayedOriginalPrice = selectedVariant?.priceOverride ?? basePrice;
  const displayedDiscountPercent = displayedHasSale
    ? Math.round(
        ((displayedOriginalPrice - salePrice) / displayedOriginalPrice) * 100
      )
    : 0;

  if (isProductLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isProductError) {
    if (isProductNotFound) {
      return <ProductNotFoundPage />;
    }
    return (
      <ServerError
        description="We couldn't load this product. This might be a temporary network issue. Please try again."
        onRetry={() => refetchProduct()}
      />
    );
  }

  return (
    <div className="w-full bg-section">
      <div className="w-full max-w-6xl mx-auto py-36 grid grid-cols-1 lg:grid-cols-2 gap-10 px-6">
        {/* Left — Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-secondary-400/5">
            <img
              src={product?.images[selectedImage]}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-row gap-3 overflow-x-auto pb-1">
            {product?.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all hover:cursor-pointer  ${
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
            {product?.badge && (
              <span className="text-xs font-semibold tracking-widest px-3 py-1 rounded-full border border-primary-400 text-primary-500 bg-primary-500/5">
                {product.badge}
              </span>
            )}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(product?.rating ?? 0)
                      ? "fill-secondary-500 text-secondary-500"
                      : "fill-secondary-300 text-secondary-300"
                  }
                />
              ))}
              <span className="text-sm text-description font-medium ml-1">
                {product?.rating} ({product?.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Title + Description */}
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold">{product?.name}</h1>
            <p className="text-sm leading-relaxed font-semibold text-description">
              {product?.description}
            </p>
          </div>

          {/* Color Selector */}
          {colors.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-description">
                  Color
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {colors.map((hex) => {
                  const isSelected = selectedColor === hex;
                  return (
                    <button
                      key={hex}
                      onClick={() => setSelectedColor(hex)}
                      aria-label={`Select color ${hex}`}
                      className={`relative w-9 h-9 rounded-full border-2 transition-all hover:cursor-pointer ${
                        isSelected
                          ? "border-primary-500 scale-110"
                          : "border-secondary-400/30 hover:border-primary-400"
                      }`}
                      style={{ backgroundColor: hex }}
                    >
                      {isSelected && (
                        <CheckIcon
                          size={16}
                          strokeWidth={3}
                          className="absolute inset-0 m-auto text-white mix-blend-difference"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Variant Type Selector */}
          {variantTypes.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-description">
                Variant
              </span>
              <div className="flex flex-wrap gap-2">
                {variantTypes.map((vt) => {
                  const isSelected = selectedVariantType === vt;
                  return (
                    <button
                      key={vt}
                      onClick={() => setSelectedVariantType(vt)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-colors hover:cursor-pointer ${
                        isSelected
                          ? "border-primary-500 bg-primary-500/10 text-primary-500"
                          : "border-secondary-400/20 text-description hover:border-primary-400"
                      }`}
                    >
                      {vt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Box */}
          <div className="bg-section-alternative rounded-2xl px-6 py-5 flex flex-col gap-5 border border-secondary-400/5">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-description font-semibold">
                    {product?.hasPriceRange ? "Starting from" : "Price"}
                  </p>
                  {displayedHasSale && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full tracking-wide uppercase shadow-sm">
                      -{displayedDiscountPercent}%
                    </span>
                  )}
                </div>
                {displayedHasSale ? (
                  <>
                    <span className="text-sm sm:text-base font-semibold text-description line-through">
                      Rs. {displayedOriginalPrice.toLocaleString("en-IN")}
                    </span>
                    <h2 className="text-3xl font-bold text-red-500 leading-tight">
                      Rs. {displayedPrice.toLocaleString("en-IN")}
                    </h2>
                  </>
                ) : (
                  <h2 className="text-3xl font-bold leading-tight">
                    Rs. {displayedPrice.toLocaleString("en-IN")}
                  </h2>
                )}
              </div>
              {product?.freeShipping && (
                <span className="text-sm font-bold text-secondary-500 uppercase tracking-wider">
                  Free Shipping
                </span>
              )}
            </div>

            {displayedHasSale && product?.appliedOffer && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                <Tag size={16} className="text-red-500 shrink-0" />
                <p className="text-xs sm:text-sm font-bold text-red-500">
                  {product.appliedOffer.title}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                disabled={!isSelectedInStock}
                onClick={() => {
                  const cartItem = selectedVariant
                    ? { variantId: selectedVariant.id, productId: product?.id }
                    : { productId: product?.id };
                  console.log("Add to cart:", cartItem);
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-semibold text-sm transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-500"
              >
                <ShoppingBag size={18} />
                {isSelectedInStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <button className="w-full flex items-center justify-center gap-2 border-2 border-primary-400/30 py-4 rounded-xl font-semibold text-sm hover:bg-section transition-colors hover:cursor-pointer text-description">
                <Heart size={18} />
                Add to Wishlist
              </button>
            </div>
          </div>

          {/* Product Badge Summary */}
          <div className="flex gap-3 flex-wrap">
            {product?.trustBadges.map((badge, index) => (
              <div
                key={index}
                className="text-description text-sm font-semibold shadow-sm px-4 py-3 rounded-2xl border border-secondary-400/5 bg-section-alternative flex items-center gap-2 hover:border-primary-400/30 transition-colors"
              >
                <CheckIcon size={16} className="text-secondary-400 shrink-0" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-y border-secondary-400/20 py-28 px-6">
        <div className="w-full max-w-6xl mx-auto">
          <div className="w-full flex items-center border-b border-secondary-400/20">
            {(
              [
                { key: "description", label: "Description" },
                { key: "specifications", label: "Specifications" },
                { key: "features", label: "Features" },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedButton(key)}
                className={`-mb-px py-4 px-5 text-sm font-semibold border border-neutral-500 transition-colors hover:cursor-pointer ${
                  selectedButton === key
                    ? "border-primary-500 text-white bg-primary-500"
                    : " text-description hover:text-black dark:hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {selectedButton === "description" && product?.description && (
            <ProductDescriptionTab description={product.description} />
          )}
          {selectedButton === "specifications" && product?.specifications && (
            <ProductSpecificationTab specifications={product.specifications} />
          )}
          {selectedButton === "features" && product?.features && (
            <ProductFeaturesTab features={product.features} />
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="w-full bg-section border-t border-secondary-400/5">
        <div className="w-full max-w-6xl mx-auto py-28 px-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          {/* Left — Rating Summary */}
          <div className="flex flex-col gap-5">
            <h2 className="heading-section">Customer Reviews</h2>

            <div className="flex items-center gap-3">
              <span className="text-5xl font-bold">{product?.rating}</span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(product?.rating ?? 0)
                          ? "fill-secondary-500 text-secondary-500"
                          : "fill-secondary-300 text-secondary-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-xs text-description font-semibold">
                  Based on {product?.reviewCount} reviews
                </p>
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
                className={`flex flex-col gap-3 py-10 ${
                  i !== reviews.length - 1
                    ? "border-b border-primary-400/30"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-base font-bold">{review.name}</h4>
                    <p className="text-xs text-description font-semibold">
                      {review.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? "fill-secondary-500 text-secondary-500"
                            : "fill-secondary-300 text-secondary-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-description font-semibold">
                  "{review.text}"
                </p>
              </div>
            ))}

            <div className="w-full flex justify-center mt-6">
              <button className="bg-primary-500 py-4 px-10 rounded-full hover:bg-primary-500/90 hover:cursor-pointer text-white font-semibold transition-colors">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}