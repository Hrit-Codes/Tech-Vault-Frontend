import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertTriangle, Check, Dot, Home, XCircle } from "lucide-react";
import { LoadingSpinner } from "../../Components/ui/LoadingSpinner";
import { PAYMENT_METHOD_LABELS, formatAmount, formatDateTime } from "../../Components/utils/order";
import { useOrderById } from "../../hooks/useOrders";
import { useVerifyKhalti } from "../../hooks/usePayments";

type ResultStatus = "loading" | "success" | "failed" | "cancelled";

const RESULT_UI: Record<
  Exclude<ResultStatus, "loading">,
  {
    title: string;
    caption: string;
    Icon: typeof Check;
    iconClass: string;
    glowClass: string;
  }
> = {
  success: {
    title: "Payment Successful",
    caption: "Your order has been confirmed and is now being processed.",
    Icon: Check,
    iconClass: "bg-green-500/15 text-green-500",
    glowClass: "bg-green-500/20",
  },
  failed: {
    title: "Payment Failed",
    caption: "We couldn't confirm your payment. Please try again.",
    Icon: XCircle,
    iconClass: "bg-red-500/15 text-red-500",
    glowClass: "bg-red-500/20",
  },
  cancelled: {
    title: "Payment Cancelled",
    caption: "Your payment was cancelled. No amount has been charged.",
    Icon: AlertTriangle,
    iconClass: "bg-amber-500/15 text-amber-500",
    glowClass: "bg-amber-500/20",
  },
};

export default function KhaltiCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pidx = searchParams.get("pidx");
  const statusFromUrl = (searchParams.get("status") ?? "").toLowerCase();
  const isCancelled = statusFromUrl.includes("cancel");

  const [result, setResult] = useState<ResultStatus>(() =>
    pidx ? "loading" : isCancelled ? "cancelled" : "failed",
  );
  const [orderId, setOrderId] = useState<string | null>(null);
  const hasVerified = useRef(false);

  const { mutateAsync: verifyPayment } = useVerifyKhalti();

  useEffect(() => {
    if (!pidx || hasVerified.current) return;
    hasVerified.current = true;

    verifyPayment(pidx)
      .then((data) => {
        setOrderId(data.orderId);
        setResult("success");
      })
      .catch(() => {
        setResult(isCancelled ? "cancelled" : "failed");
      });
  }, [pidx, isCancelled, verifyPayment]);

  const { data: order, isLoading: isLoadingOrder } = useOrderById(
    result === "success" ? (orderId ?? undefined) : undefined,
  );

  if (result === "loading") {
    return <LoadingSpinner />;
  }

  const ui = RESULT_UI[result];
  const Icon = ui.Icon;
  const isSuccess = result === "success";
  const statusLabel = isSuccess
    ? "Paid"
    : result === "cancelled"
      ? "Cancelled"
      : "Failed";
  const statusColor = isSuccess
    ? "text-green-500"
    : result === "cancelled"
      ? "text-amber-500"
      : "text-red-500";

  const paymentMethodLabel = order
    ? PAYMENT_METHOD_LABELS[order.paymentMethod]
    : PAYMENT_METHOD_LABELS.KHALTI;

  const goHome = () => navigate("/");

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-16 bg-section">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-primary-400/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* --- IMAGE CONTAINER START --- */}
        <div className="flex justify-center mb-8 select-none">
          <div className="relative group">
            <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center relative">
              <div
                className={`w-full h-full flex justify-center items-center rounded-full ${ui.iconClass}`}
              >
                <Icon size={110} strokeWidth={2.5} />
              </div>

              <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-primary-400/40" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-primary-400/40" />

              <div
                className={`absolute inset-0 ${ui.glowClass} blur-[60px] rounded-full -z-10 animate-pulse`}
              />
            </div>
          </div>
        </div>
        {/* --- IMAGE CONTAINER END --- */}

        <h2 className="heading-page mb-2">{ui.title}</h2>
        <p className="text-description mb-8">{ui.caption}</p>

        {isSuccess && (
          <div className="w-full max-w-xl mx-auto rounded-2xl bg-section-alternative border border-secondary-400/10 p-4 my-4 text-left">
            <div className="w-full flex items-center justify-between p-4 gap-4">
              <div className="flex gap-3 items-center">
                <div className="bg-primary-400 text-black font-bold rounded-xl text-sm px-3 py-2 flex items-center">
                  Khalti
                </div>
                <div className="text-start">
                  <h4 className="text-description text-sm font-normal">
                    Payment Method
                  </h4>
                  <p>{paymentMethodLabel}</p>
                </div>
              </div>
              <div className="flex flex-col text-end">
                <h4 className="text-sm text-description font-normal">
                  Amount Paid
                </h4>
                <span className="font-semibold">
                  {isLoadingOrder || !order
                    ? "..."
                    : formatAmount(order.totalAmount)}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 px-4 pb-2">
              <div className="w-full flex justify-between gap-4">
                <h4 className="text-sm text-description font-normal">Order ID</h4>
                <span className="text-sm break-all">
                  {orderId ?? "—"}
                </span>
              </div>
              <div className="w-full flex justify-between gap-4">
                <h4 className="text-sm text-description font-normal">
                  Date &amp; Time
                </h4>
                <span className="text-sm">
                  {formatDateTime(order?.createdAt)}
                </span>
              </div>
              <div className="w-full flex justify-between gap-4">
                <h4 className="text-sm text-description font-normal">Status</h4>
                <span
                  className={`flex items-center gap-1 uppercase font-semibold text-sm ${statusColor}`}
                >
                  <Dot />
                  {statusLabel}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button
            onClick={goHome}
            className="group w-full sm:w-auto px-10 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-300 hover:to-primary-400 text-black font-light tracking-widest uppercase text-sm rounded-md transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3 min-w-[200px] hover:cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
