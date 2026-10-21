import type {
  IOrder,
  IOrderPaymentMethod,
  IOrderPaymentStatus,
  IOrderStatus,
} from "../../apis/modules/orders";

// ─── Formatters ────────────────────────────────────────────

export const formatAmount = (amount: number) =>
  `Rs. ${amount.toLocaleString("en-IN")}`;

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export const formatDateTime = (value?: string | null) =>
  value
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
        .format(new Date(value))
        .toUpperCase()
        .replace(" AT", " | ")
    : "—";

// ─── Labels ────────────────────────────────────────────────

export const PAYMENT_METHOD_LABELS: Record<IOrderPaymentMethod, string> = {
  COD: "Cash on Delivery",
  KHALTI: "Khalti Digital Wallet",
};

export const ORDER_STATUS_LABELS: Record<IOrderStatus, string> = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

export const PAYMENT_STATUS_LABELS: Record<IOrderPaymentStatus, string> = {
  UNPAID: "Unpaid",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

// ─── Badge Styles ──────────────────────────────────────────

export const ORDER_STATUS_STYLES: Record<IOrderStatus, string> = {
  PENDING: "bg-amber-500/15 text-amber-500",
  PROCESSING: "bg-secondary-500/15 text-secondary-500",
  SHIPPED: "bg-blue-500/15 text-blue-500",
  DELIVERED: "bg-green-500/15 text-green-500",
  CANCELLED: "bg-red-500/15 text-red-500",
  REFUNDED: "bg-purple-500/15 text-purple-500",
};

export const PAYMENT_STATUS_STYLES: Record<IOrderPaymentStatus, string> = {
  UNPAID: "bg-amber-500/15 text-amber-500",
  PAID: "bg-green-500/15 text-green-500",
  FAILED: "bg-red-500/15 text-red-500",
  REFUNDED: "bg-purple-500/15 text-purple-500",
};

// ─── Derived Values ────────────────────────────────────────

export const getOrderItemCount = (order: Pick<IOrder, "items">) =>
  (order.items ?? []).reduce((sum, item) => sum + item.quantity, 0);

export const getOrderItemsSubtotal = (order: Pick<IOrder, "items">) =>
  (order.items ?? []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
