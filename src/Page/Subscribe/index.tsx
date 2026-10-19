import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertTriangle,
  CheckCircle2,
  MailPlus,
  Info,
} from "lucide-react";
import { BackgroundEffects } from "../../Components/ui/BackgroundEffects";
import { subscribeToNewsletter } from "../../apis/modules/newsletter";

type Status = "confirm" | "success" | "already-subscribed" | "error";

export default function ResubscribePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = (searchParams.get("email") ?? "").trim().toLowerCase();

  const [status, setStatus] = useState<Status>("confirm");

  const mutation = useMutation({
    mutationFn: () => subscribeToNewsletter({ email }),
    onSuccess: (response) => {
      toast.success(response.message ?? "Welcome back");
      setStatus("success");
    },
    onError: (err: any) => {
      if (err?.response?.status === 409) {
        setStatus("already-subscribed");
        return;
      }
      const message =
        err?.response?.data?.message ??
        "Something went wrong. Please try again.";
      toast.error(message);
      setStatus("error");
    },
  });

  // ─── Missing email → invalid link ───────────────────────────────
  if (!email) {
    return (
      <PageShell>
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="heading-page text-center">Invalid link</h2>
        <p className="text-sm text-description font-semibold text-center leading-relaxed">
          This resubscribe link is missing an email address. Please use the
          link from your confirmation email, or subscribe directly from the
          home page.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>
      </PageShell>
    );
  }

  // ─── Success ────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <PageShell>
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="heading-page text-center">You're back on the list</h2>
        <p className="text-sm text-description font-semibold text-center leading-relaxed">
          <strong className="text-foreground">{email}</strong> is subscribed to
          the TechVault newsletter again. You'll get new arrivals, exclusive
          deals, and restock alerts — one or two emails a month, no spam.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-2">
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="w-full sm:w-auto px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors hover:cursor-pointer"
          >
            Start Shopping
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 border border-secondary-400/20 text-description hover:bg-section-alternative text-sm font-semibold rounded-xl transition-colors text-center hover:cursor-pointer"
          >
            Back to Home
          </Link>
        </div>
      </PageShell>
    );
  }

  // ─── Already subscribed ─────────────────────────────────────────
  if (status === "already-subscribed") {
    return (
      <PageShell>
        <div className="w-20 h-20 rounded-full bg-primary-500/10 flex items-center justify-center mb-2">
          <Info className="w-10 h-10 text-primary-500" />
        </div>
        <h2 className="heading-page text-center">You're already subscribed</h2>
        <p className="text-sm text-description font-semibold text-center leading-relaxed">
          <strong className="text-foreground">{email}</strong> is already on the
          TechVault newsletter list. Nothing to do — you'll keep receiving our
          updates.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors hover:cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </PageShell>
    );
  }

  // ─── Error ──────────────────────────────────────────────────────
  if (status === "error" || mutation.isError) {
    return (
      <PageShell>
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="heading-page text-center">Something went wrong</h2>
        <p className="text-sm text-description font-semibold text-center leading-relaxed">
          We couldn't resubscribe you right now. This might be a temporary
          network issue. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
          <button
            type="button"
            onClick={() => {
              setStatus("confirm");
              mutation.reset();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors hover:cursor-pointer"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 border border-secondary-400/20 text-description hover:bg-section-alternative text-sm font-semibold rounded-xl transition-colors text-center hover:cursor-pointer"
          >
            Back to Home
          </Link>
        </div>
      </PageShell>
    );
  }

  // ─── Confirm (default) ──────────────────────────────────────────
  return (
    <PageShell>
      <div className="w-20 h-20 rounded-full bg-primary-500/10 flex items-center justify-center mb-2">
        <MailPlus className="w-10 h-10 text-primary-500" />
      </div>
      <h2 className="heading-page text-center">Resubscribe to our newsletter?</h2>
      <p className="text-sm text-description font-semibold text-center leading-relaxed">
        We'll start sending{" "}
        <strong className="text-foreground">{email}</strong> product updates,
        exclusive deals, and restock alerts again. One or two emails a month,
        and you can leave anytime.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-2">
        <button
          type="button"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          className="w-full sm:w-auto px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          {mutation.isPending ? "Resubscribing…" : "Yes, resubscribe me"}
        </button>
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 border border-secondary-400/20 text-description hover:bg-section-alternative text-sm font-semibold rounded-xl transition-colors text-center hover:cursor-pointer"
        >
          Cancel
        </Link>
      </div>
    </PageShell>
  );
}

// ─── Shared shell ──────────────────────────────────────────────
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-16">
      <BackgroundEffects />
      <div className="relative z-10 w-full max-w-md bg-section rounded-3xl border border-secondary-400/5 shadow-xl p-10 flex flex-col items-center gap-4">
        {children}
      </div>
    </div>
  );
}