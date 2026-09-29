import { useEffect, useState } from "react";
import { X, ShoppingBag, Trash2, Loader2, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

const CartSidebar = () => {
  const {
    items = [],
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    isLoading,
    subtotal = 0,
    totalItems = 0,
  } = useCart();

  const navigate = useNavigate();
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // Lock body scroll when the drawer is open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCartOpen, setIsCartOpen]);

  // Reset confirm state whenever the drawer closes
  useEffect(() => {
    if (!isCartOpen) setConfirmingClear(false);
  }, [isCartOpen]);

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      await clearCart();
      setConfirmingClear(false);
    } finally {
      setIsClearing(false);
    }
  };

  const hasUnavailable = items.some((i) => !i.isAvailable);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden={!isCartOpen}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-section z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-secondary-400/10 shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-primary-500" size={20} />
            <h2 id="cart-title" className="text-lg font-bold tracking-wide">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="w-9 h-9 rounded-full bg-section-alternative flex items-center justify-center text-description hover:text-foreground transition-colors hover:cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isLoading && items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Loader2 className="text-primary-500 animate-spin" size={32} />
              <p className="text-description text-xs font-semibold tracking-widest uppercase">
                Loading Cart
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-section-alternative flex items-center justify-center">
                <ShoppingBag className="text-description" size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">Your cart is empty</h3>
                <p className="text-sm text-description">
                  Add items you love and find them here anytime.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/shop");
                }}
                className="mt-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-colors hover:cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* ── Toolbar: item count + clear all ── */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-description uppercase tracking-widest">
                  {totalItems} {totalItems === 1 ? "Item" : "Items"}
                </span>

                {!confirmingClear ? (
                  <button
                    type="button"
                    onClick={() => setConfirmingClear(true)}
                    className="text-xs font-semibold text-description hover:text-red-500 transition-colors hover:cursor-pointer"
                  >
                    Clear all
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setConfirmingClear(false)}
                      disabled={isClearing}
                      className="text-xs font-semibold text-description hover:text-foreground transition-colors disabled:opacity-50 hover:cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleClearCart}
                      disabled={isClearing}
                      className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors disabled:opacity-50 flex items-center gap-1.5 hover:cursor-pointer"
                    >
                      {isClearing && (
                        <Loader2 size={12} className="animate-spin" />
                      )}
                      {isClearing ? "Clearing…" : "Confirm clear"}
                    </button>
                  </div>
                )}
              </div>

              {/* ── Item list ── */}
              {items.map((item) => {
                const product = item.product;
                const variant = item.variant;
                const hasSale =
                  item.onSale && item.originalPrice > item.unitPrice;

                const variantLabel = variant
                  ? [variant.color, variant.variant].filter(Boolean).join(" · ")
                  : null;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-section-alternative p-4 rounded-2xl border border-secondary-400/10"
                  >
                    <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-white">
                      <img
                        src={product.images?.[0] ?? "/placeholder.webp"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold uppercase tracking-wider text-center px-1">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex flex-col gap-0.5">
                        <h4 className="font-semibold text-sm truncate">
                          {product.name}
                        </h4>
                        {variantLabel && (
                          <p className="text-xs text-description truncate">
                            {variantLabel}
                          </p>
                        )}

                        <div className="flex items-baseline gap-2 mt-1">
                          {hasSale ? (
                            <>
                              <span className="text-sm font-bold text-red-500">
                                Rs. {item.unitPrice.toLocaleString("en-IN")}
                              </span>
                              <span className="text-xs text-description line-through">
                                Rs. {item.originalPrice.toLocaleString("en-IN")}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-bold">
                              Rs. {item.unitPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        {item.appliedOffer && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 mt-0.5">
                            {item.appliedOffer.title}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-section border border-secondary-400/15 rounded-xl overflow-hidden">
                          <button
                            type="button"
                            disabled={!item.isAvailable || isLoading}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center text-description hover:text-foreground hover:bg-section-alternative transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-semibold px-2 min-w-[1.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={
                              !item.isAvailable ||
                              isLoading ||
                              item.quantity >= item.availableStock
                            }
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center text-description hover:text-foreground hover:bg-section-alternative transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${product.name} from cart`}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-description hover:text-red-500 hover:bg-red-500/10 transition-colors hover:cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {items.length > 0 && (
          <div className="p-6 border-t border-secondary-400/10 bg-section-alternative shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-description">
                Subtotal
              </span>
              <span className="text-xl font-bold">
                Rs. {subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="text-[11px] text-description mb-4 leading-relaxed">
              Shipping and taxes calculated at checkout.
            </p>

            <button
              type="button"
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
              }}
              disabled={isLoading || hasUnavailable}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-semibold text-sm uppercase tracking-wider transition-colors disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer"
            >
              {hasUnavailable
                ? "Remove Unavailable Items"
                : "Proceed to Checkout"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;