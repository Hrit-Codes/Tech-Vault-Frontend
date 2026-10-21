import { useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Banknote,
  Check,
  CircleDashed,
  Clock,
  CreditCard,
  Copy,
  Package,
  Truck,
  User,
} from "lucide-react";
import { toast } from "sonner";
import type { IOrder, IOrderStatus } from "../../apis/modules/orders";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_STYLES,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_STYLES,
  formatAmount,
  formatDateTime,
  getOrderItemCount,
  getOrderItemsSubtotal,
} from "../../Components/utils/order";
import { useOrderById } from "../../hooks/useOrders";

// ─── Status Timeline ───────────────────────────────────────

const TIMELINE_STEPS: { status: IOrderStatus; label: string }[] = [
  { status: "PENDING", label: "Placed" },
  { status: "PROCESSING", label: "Processing" },
  { status: "SHIPPED", label: "Shipped" },
  { status: "DELIVERED", label: "Delivered" },
];

const timelineIndex = (status: IOrderStatus) =>
  TIMELINE_STEPS.findIndex((s) => s.status === status);

function StatusTimeline({ order }: { order: IOrder }) {
  const isInterrupted = order.status === "CANCELLED" || order.status === "REFUNDED";

  if (isInterrupted) {
    return (
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border ${
          order.status === "CANCELLED"
            ? "border-red-500/20 bg-red-500/5 text-red-500"
            : "border-purple-500/20 bg-purple-500/5 text-purple-500"
        }`}
      >
        <AlertTriangle size={18} className="shrink-0" />
        <div className="flex flex-col">
          <span className="text-sm font-bold uppercase tracking-wider">
            Order {ORDER_STATUS_LABELS[order.status].toLowerCase()}
          </span>
          <span className="text-xs opacity-80">
            {order.status === "CANCELLED"
              ? "This order was cancelled and will not be delivered."
              : "This order has been refunded."}
          </span>
        </div>
      </div>
    );
  }

  const current = timelineIndex(order.status);

  return (
    <div className="w-full flex items-start justify-between gap-1">
      {TIMELINE_STEPS.map((step, i) => {
        const isDone = i < current;
        const isCurrent = i === current;
        const isLast = i === TIMELINE_STEPS.length - 1;

        return (
          <div
            key={step.status}
            className={`flex items-start ${isLast ? "" : "flex-1"}`}
          >
            <div className="flex flex-col items-center gap-2 min-w-[64px]">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isDone
                    ? "bg-primary-500 border-primary-500 text-white"
                    : isCurrent
                      ? "border-primary-500 text-primary-500 bg-primary-500/10"
                      : "border-secondary-400/20 text-description"
                }`}
              >
                {isDone ? (
                  <Check size={16} strokeWidth={3} />
                ) : isCurrent ? (
                  <Clock size={15} />
                ) : (
                  <CircleDashed size={15} />
                )}
              </div>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider text-center ${
                  isDone || isCurrent ? "text-foreground" : "text-description"
                }`}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`h-0.5 flex-1 mt-[17px] mx-2 rounded-full ${
                  i < current ? "bg-primary-500" : "bg-secondary-400/20"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Skeleton ──────────────────────────────────────────────

const DetailSkeleton = () => (
  <div className="w-full flex flex-col gap-6 animate-pulse">
    <div className="h-8 bg-secondary-400/20 rounded w-56" />
    <div className="h-40 bg-secondary-400/20 rounded-2xl" />
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
      <div className="flex flex-col gap-6">
        <div className="h-64 bg-secondary-400/20 rounded-2xl" />
        <div className="h-44 bg-secondary-400/20 rounded-2xl" />
      </div>
      <div className="h-72 bg-secondary-400/20 rounded-2xl" />
    </div>
  </div>
);

// ─── Page ──────────────────────────────────────────────────

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useOrderById(orderId);

  const copyOrderId = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.id);
    toast.success("Order ID copied");
  };

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="w-full bg-section">
        <div className="w-full max-w-6xl mx-auto py-30 flex flex-col gap-10 px-6">
          <DetailSkeleton />
        </div>
      </div>
    );
  }

  // ── Error ──
  if (isError || !order) {
    return (
      <div className="w-full bg-section">
        <div className="w-full max-w-6xl mx-auto py-30 flex flex-col gap-10 px-6">
          <div className="w-full flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-section-alternative flex items-center justify-center">
              <AlertTriangle size={28} className="text-red-400" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">
                Couldn&apos;t load this order
              </h3>
              <p className="text-sm text-description">
                The order may not exist or something went wrong.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => refetch()}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-2xl font-medium text-sm transition-colors hover:cursor-pointer"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="border border-secondary-400/10 px-6 py-3 rounded-2xl font-medium text-sm transition-colors hover:border-primary-400/40 hover:cursor-pointer"
              >
                Back to Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const items = order.items ?? [];
  const itemCount = getOrderItemCount(order);
  const itemsSubtotal = getOrderItemsSubtotal(order);

  return (
    <div className="w-full bg-section">
      <div className="w-full max-w-6xl mx-auto py-30 flex flex-col gap-8 px-6">
        {/* ── Header ── */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 text-sm font-semibold text-description hover:text-foreground transition-colors w-fit hover:cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-1">
              <h2 className="heading-page">Order Details</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-description">Order</span>
                <code className="text-xs font-bold bg-section-alternative border border-secondary-400/10 px-2 py-1 rounded-lg break-all">
                  {order.id}
                </code>
                <button
                  type="button"
                  onClick={copyOrderId}
                  aria-label="Copy order ID"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-description hover:text-primary-500 hover:bg-primary-500/10 transition-colors hover:cursor-pointer"
                >
                  <Copy size={13} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${ORDER_STATUS_STYLES[order.status]}`}
              >
                {order.status}
              </span>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${PAYMENT_STATUS_STYLES[order.paymentStatus]}`}
              >
                {order.paymentStatus}
              </span>
            </div>
          </div>

          <p className="text-sm text-description">
            Placed on {formatDateTime(order.createdAt)}
            {order.updatedAt !== order.createdAt &&
              ` · Last updated ${formatDateTime(order.updatedAt)}`}
          </p>
        </div>

        {/* ── Timeline card ── */}
        <section className="bg-section-alternative rounded-2xl border border-secondary-400/10 p-6">
          <StatusTimeline order={order} />
        </section>

        {/* ── Content grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Main column */}
          <div className="flex flex-col gap-6">
            {/* Items */}
            <section className="bg-section-alternative rounded-2xl border border-secondary-400/10 p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package size={18} className="text-primary-500" />
                  <h3 className="text-base font-bold tracking-wide">
                    Items
                  </h3>
                </div>
                <span className="text-xs font-semibold text-description uppercase tracking-widest">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="flex flex-col divide-y divide-secondary-400/10">
                {items.length === 0 && (
                  <p className="text-sm text-description py-2">
                    No item details available for this order.
                  </p>
                )}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="w-16 h-16 rounded-xl bg-white border border-secondary-400/5 overflow-hidden shrink-0 flex items-center justify-center">
                      {item.productImage ? (
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package size={22} className="text-secondary-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {item.productName}
                      </p>
                      {item.variantName && (
                        <p className="text-xs text-description truncate mt-0.5">
                          {item.variantName}
                        </p>
                      )}
                      <p className="text-xs text-description mt-1">
                        {formatAmount(item.price)} × {item.quantity}
                      </p>
                    </div>

                    <span className="text-sm font-bold shrink-0">
                      {formatAmount(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping Address */}
            <section className="bg-section-alternative rounded-2xl border border-secondary-400/10 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Truck size={18} className="text-primary-500" />
                <h3 className="text-base font-bold tracking-wide">
                  Shipping Address
                </h3>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center shrink-0">
                  <User size={16} className="text-primary-500" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold">
                    {order.shippingAddress.fullName}
                  </span>
                  <span className="text-sm text-description">
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                  </span>
                  <span className="text-sm text-description">
                    {order.shippingAddress.phoneNumber}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Aside column */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-6">
            {/* Summary */}
            <section className="bg-section-alternative rounded-2xl border border-secondary-400/10 p-6 flex flex-col gap-4">
              <h3 className="text-base font-bold tracking-wide">
                Order Summary
              </h3>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-description">Subtotal</span>
                  <span className="text-sm font-semibold">
                    {formatAmount(itemsSubtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-description">Shipping</span>
                  <span className="text-sm font-semibold text-green-500">
                    Free
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-secondary-400/10">
                <span className="text-xs font-bold uppercase tracking-widest text-description">
                  Total
                </span>
                <span className="text-xl font-bold">
                  {formatAmount(order.totalAmount)}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {order.paymentMethod === "COD" ? (
                  <Banknote size={15} className="text-description shrink-0" />
                ) : (
                  <CreditCard size={15} className="text-description shrink-0" />
                )}
                <span className="text-xs text-description">
                  {PAYMENT_METHOD_LABELS[order.paymentMethod]}
                </span>
              </div>
            </section>

            {/* Payment info */}
            <section className="bg-section-alternative rounded-2xl border border-secondary-400/10 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <CreditCard size={18} className="text-primary-500" />
                <h3 className="text-base font-bold tracking-wide">Payment</h3>
              </div>

              {order.payment ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-description">Provider</span>
                    <span className="text-sm font-semibold">
                      {PAYMENT_METHOD_LABELS[order.payment.provider]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-description">Status</span>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${PAYMENT_STATUS_STYLES[order.payment.status]}`}
                    >
                      {order.payment.status}
                    </span>
                  </div>
                  {order.payment.transactionId && (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-description">
                        Transaction ID
                      </span>
                      <code className="text-xs font-bold bg-section border border-secondary-400/10 px-2 py-1 rounded-lg break-all">
                        {order.payment.transactionId}
                      </code>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-description">Date</span>
                    <span className="text-sm font-semibold">
                      {formatDateTime(order.payment.createdAt)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">
                    {order.paymentMethod === "COD"
                      ? "Pay on delivery"
                      : "Payment not initiated"}
                  </p>
                  <p className="text-xs text-description leading-relaxed">
                    {order.paymentMethod === "COD"
                      ? "You will pay in cash when your order is delivered."
                      : "Complete the Khalti payment to confirm your order."}
                  </p>
                </div>
              )}
            </section>

            {/* Help */}
            <section className="bg-section-alternative rounded-2xl border border-secondary-400/10 p-6 flex flex-col gap-2">
              <p className="text-sm font-semibold">Need help with this order?</p>
              <p className="text-xs text-description leading-relaxed">
                Contact support with your order ID for any questions about
                delivery or payment.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
