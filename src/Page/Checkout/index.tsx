import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Banknote,
  Loader2,
  Lock,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
  WalletIcon,
  type LucideIcon,
} from "lucide-react";
import { useCart } from "../../Context/CartContext";
import type { IOrderPaymentMethod } from "../../apis/modules/orders";
import { getApiErrorMessage } from "../../apis/client";
import {
  checkoutShippingSchema,
  type CheckoutShippingInput,
} from "../../Components/utils/schema";
import { PAYMENT_METHOD_LABELS } from "../../Components/utils/order";
import { useCreateOrder } from "../../hooks/useOrders";
import { useInitiateKhalti } from "../../hooks/usePayments";

const PAYMENT_OPTIONS: {
  value: IOrderPaymentMethod;
  caption: string;
  Icon: LucideIcon;
}[] = [
  {
    value: "COD",
    caption: "Pay with cash when your order arrives",
    Icon: Banknote,
  },
  {
    value: "KHALTI",
    caption: "Pay securely via Khalti wallet",
    Icon: WalletIcon,
  },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, totalItems, refreshCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<IOrderPaymentMethod>("COD");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutShippingInput>({
    resolver: zodResolver(checkoutShippingSchema),
  });

  const createOrderMutation = useCreateOrder();
  const initiateKhaltiMutation = useInitiateKhalti();

  const isPlacingOrder =
    createOrderMutation.isPending || initiateKhaltiMutation.isPending;

  const onSubmit = async (shippingAddress: CheckoutShippingInput) => {
    try {
      const createdOrder = await createOrderMutation.mutateAsync({
        shippingAddress,
        paymentMethod,
      });

      await refreshCart();

      if (paymentMethod === "KHALTI") {
        try {
          const khaltiData = await initiateKhaltiMutation.mutateAsync(
            createdOrder.id,
          );
          window.location.assign(khaltiData.paymentUrl);
        } catch (error) {
          toast.error(
            getApiErrorMessage(error, "Couldn't initiate Khalti payment"),
          );
          navigate(`/orders/${createdOrder.id}`);
        }
        return;
      }

      toast.success("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Couldn't place order. Please try again."),
      );
    }
  };

  // ─── Empty cart guard ──────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="w-full bg-section">
        <div className="w-full max-w-6xl mx-auto py-30 flex flex-col gap-10 px-6">
          {/* Header */}
          <div className="w-full flex flex-col gap-2">
            <h2 className="heading-page">Checkout</h2>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-section-alternative flex items-center justify-center">
              <ShoppingBag size={28} className="text-secondary-400" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Your cart is empty</h3>
              <p className="text-sm text-description">
                Add items to your cart before checking out.
              </p>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="mt-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-2xl font-medium text-sm transition-colors hover:cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-section">
      <div className="w-full max-w-6xl mx-auto py-30 flex flex-col gap-10 px-6">
        {/* Header */}
        <div className="w-full flex flex-col gap-2">
          <h2 className="heading-page">Checkout</h2>
          <h3 className="text-sm text-description">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </h3>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start"
        >
          {/* ── Left column: shipping + payment ─────────────── */}
          <div className="flex flex-col gap-8">
            {/* Shipping Address */}
            <section className="bg-section-alternative rounded-2xl border border-secondary-400/10 p-6 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Truck size={18} className="text-primary-500" />
                <h3 className="text-base font-bold tracking-wide">
                  Shipping Address
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-sm font-bold">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    {...register("fullName")}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phoneNumber" className="text-sm font-bold">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="98XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-500">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="text-sm font-bold">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register("city")}
                    placeholder="Kathmandu"
                    className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                  />
                  {errors.city && (
                    <p className="text-xs text-red-500">{errors.city.message}</p>
                  )}
                </div>

                {/* Street */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="street" className="text-sm font-bold">
                    Street
                  </label>
                  <input
                    id="street"
                    type="text"
                    {...register("street")}
                    placeholder="Ward 5, Near Clock Tower"
                    className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                  />
                  {errors.street && (
                    <p className="text-xs text-red-500">{errors.street.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-section-alternative rounded-2xl border border-secondary-400/10 p-6 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Lock size={18} className="text-primary-500" />
                <h3 className="text-base font-bold tracking-wide">
                  Payment Method
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PAYMENT_OPTIONS.map((option) => {
                  const isActive = paymentMethod === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPaymentMethod(option.value)}
                      className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-colors hover:cursor-pointer ${
                        isActive
                          ? "border-primary-500 bg-primary-500/5 ring-2 ring-primary-500/20"
                          : "border-secondary-400/10 hover:border-primary-400/40"
                      }`}
                    >
                      <option.Icon
                        size={20}
                        className={
                          isActive
                            ? "text-primary-500 shrink-0"
                            : "text-description shrink-0"
                        }
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold">
                          {PAYMENT_METHOD_LABELS[option.value]}
                        </span>
                        <span className="text-xs text-description">
                          {option.caption}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-description leading-relaxed flex items-center gap-1.5">
                <ShieldCheck size={13} className="shrink-0" />
                Your payment information is processed securely.
              </p>
            </section>
          </div>

          {/* ── Right column: order summary (sticky) ────────── */}
          <aside className="lg:sticky lg:top-24 bg-section-alternative rounded-2xl border border-secondary-400/10 p-6 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Package size={18} className="text-primary-500" />
              <h3 className="text-base font-bold tracking-wide">
                Order Summary
              </h3>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-1">
              {items.map((item) => {
                const variantLabel = item.variant
                  ? [item.variant.color, item.variant.variant]
                      .filter(Boolean)
                      .join(" · ")
                  : null;

                return (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-white">
                      <img
                        src={item.product.images?.[0] ?? "/placeholder.webp"}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">
                        {item.product.name}
                      </p>
                      {variantLabel && (
                        <p className="text-[11px] text-description truncate">
                          {variantLabel}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-bold shrink-0">
                      Rs. {item.lineTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-secondary-400/10 pt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-description">Subtotal</span>
                <span className="text-sm font-semibold">
                  Rs. {subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-description">Shipping</span>
                <span className="text-sm font-semibold text-green-500">
                  Free
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-secondary-400/10">
                <span className="text-xs font-bold uppercase tracking-widest text-description">
                  Total
                </span>
                <span className="text-xl font-bold">
                  Rs. {subtotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {errors.root && (
              <p className="text-xs text-red-500 text-center font-semibold">
                {errors.root.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPlacingOrder}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-semibold text-sm uppercase tracking-wider transition-colors disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer flex items-center justify-center gap-2"
            >
              {isPlacingOrder && <Loader2 size={16} className="animate-spin" />}
              {isPlacingOrder
                ? "Placing Order…"
                : paymentMethod === "KHALTI"
                  ? "Place Order & Pay with Khalti"
                  : "Place Order"}
            </button>

            <p className="text-[11px] text-description text-center leading-relaxed">
              By placing your order you agree to our terms & conditions.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}
