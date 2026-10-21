import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronRight, Package } from "lucide-react";
import type { IOrder } from "../../apis/modules/orders";
import Pagination from "../../Components/Search/Pagination";
import {
  ORDER_STATUS_STYLES,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_STYLES,
  formatAmount,
  formatDate,
  getOrderItemCount,
} from "../../Components/utils/order";
import { useMyOrders } from "../../hooks/useOrders";

const ORDERS_PER_PAGE = 10;

// ─── Skeleton ──────────────────────────────────────────────

const OrderCardSkeleton = () => (
  <div className="animate-pulse bg-section-alternative rounded-2xl border border-secondary-400/5 p-6 flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className="h-4 bg-secondary-400/20 rounded w-40" />
      <div className="h-6 bg-secondary-400/20 rounded w-24" />
    </div>
    <div className="flex gap-4">
      <div className="w-16 h-16 bg-secondary-400/20 rounded-xl shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 bg-secondary-400/20 rounded w-3/4" />
        <div className="h-3 bg-secondary-400/20 rounded w-1/2" />
      </div>
    </div>
    <div className="h-px bg-secondary-400/20" />
    <div className="flex items-center justify-between">
      <div className="h-4 bg-secondary-400/20 rounded w-28" />
      <div className="h-5 bg-secondary-400/20 rounded w-20" />
    </div>
  </div>
);

// ─── Order Card ────────────────────────────────────────────

function OrderCard({ order }: { order: IOrder }) {
  const navigate = useNavigate();
  const items = order.items ?? [];
  const itemCount = getOrderItemCount(order);

  return (
    <div className="bg-section-alternative rounded-2xl border border-secondary-400/5 p-6 flex flex-col gap-4 hover:border-primary-400/30 transition-colors">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] text-description uppercase tracking-widest font-bold">
            Order Placed
          </span>
          <span className="text-sm font-semibold">
            {formatDate(order.createdAt)}
          </span>
        </div>
        <span
          className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${ORDER_STATUS_STYLES[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      {/* Items preview */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {items.slice(0, 4).map((item) => (
          <div key={item.id} className="flex gap-3 items-center shrink-0">
            <div className="w-14 h-14 rounded-lg bg-white overflow-hidden shrink-0 flex items-center justify-center">
              {item.productImage ? (
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package size={20} className="text-secondary-400" />
              )}
            </div>
            <div className="flex flex-col min-w-0 pr-4">
              <span className="text-xs font-semibold truncate max-w-[160px]">
                {item.productName}
              </span>
              <span className="text-[11px] text-description">
                {item.variantName ? `${item.variantName} · ` : ""}Qty{" "}
                {item.quantity}
              </span>
            </div>
          </div>
        ))}
        {items.length > 4 && (
          <span className="text-[11px] text-description self-center shrink-0">
            +{items.length - 4} more
          </span>
        )}
      </div>

      <div className="border-t border-secondary-400/10 pt-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs text-description">
            {itemCount} {itemCount === 1 ? "item" : "items"} ·{" "}
            {PAYMENT_METHOD_LABELS[order.paymentMethod]}
          </span>
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${PAYMENT_STATUS_STYLES[order.paymentStatus]}`}
          >
            {order.paymentStatus}
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <span className="text-base font-bold">
            {formatAmount(order.totalAmount)}
          </span>
          <button
            type="button"
            onClick={() => navigate(`/orders/${order.id}`)}
            aria-label={`View order ${order.id}`}
            className="flex items-center gap-1 text-xs font-bold text-secondary-500 hover:text-secondary-600 transition-colors hover:cursor-pointer"
          >
            Details
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────

export default function OrdersPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const {
    data: ordersResponse,
    isLoading,
    isError,
    refetch,
  } = useMyOrders(page, ORDERS_PER_PAGE);

  const orders = ordersResponse?.data ?? [];
  const pagination = ordersResponse?.pagination;

  return (
    <div className="w-full bg-section">
      <div className="w-full max-w-6xl mx-auto py-30 flex flex-col gap-10 px-6">
        {/* Header */}
        <div className="w-full flex flex-col gap-2">
          <h2 className="heading-page">My Orders</h2>
          <h3 className="text-sm text-description">
            Track and manage your orders
          </h3>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex flex-col gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <OrderCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          /* Error */
          <div className="w-full flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-section-alternative flex items-center justify-center">
              <AlertTriangle size={28} className="text-red-400" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">
                Couldn&apos;t load your orders
              </h3>
              <p className="text-sm text-description">
                Something went wrong. Please try again.
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="mt-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-2xl font-medium text-sm transition-colors hover:cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          /* Empty */
          <div className="w-full flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-section-alternative flex items-center justify-center">
              <Package size={28} className="text-secondary-400" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">No orders yet</h3>
              <p className="text-sm text-description">
                When you place an order it will show up here.
              </p>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="mt-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-2xl font-medium text-sm transition-colors hover:cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Orders list */
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
            totalItems={pagination.total}
            itemsPerPage={ORDERS_PER_PAGE}
            itemLabel="orders"
          />
        )}
      </div>
    </div>
  );
}
