import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, MailX } from "lucide-react";
import { BackgroundEffects } from "../../Components/ui/BackgroundEffects";
import { unsubscribeByToken } from "../../apis/modules/newsletter";

type Status = "confirm" | "success" | "error";

export default function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") ?? "";

  const [status, setStatus] = useState<Status>("confirm");
  const [email, setEmail] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => unsubscribeByToken(token),
    onSuccess: (response) => {
      toast.success(response.message ?? "Unsubscribed successfully");
      setEmail(response.data.data.email);
      setStatus("success");
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ?? "Something went wrong. Please try again.";
      toast.error(message);
      setStatus("error");
    },
  });

  // ─── Missing token: someone hit /unsubscribe without a link ─────
  if (!token) {
    return (
      <PageShell>
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="heading-page text-center">Invalid link</h2>
        <p className="text-sm text-description font-semibold text-center leading-relaxed">
          This unsubscribe link is missing its token. Please use the link from
          a recent email, or manage your subscription from your profile.
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
        <h2 className="heading-page text-center">You're unsubscribed</h2>
        <p className="text-sm text-description font-semibold text-center leading-relaxed">
          We've removed{" "}
          {email ? (
            <strong className="text-foreground">{email}</strong>
          ) : (
            "your email"
          )}{" "}
          from the TechVault newsletter. You won't receive any more product
          updates or offers from us.
        </p>
        <p className="text-xs text-description text-center">
          A confirmation email is on its way. Changed your mind? You can
          resubscribe anytime.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-6 py-3 border border-secondary-400/20 text-description hover:bg-section-alternative text-sm font-semibold rounded-xl transition-colors hover:cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </PageShell>
    );
  }

  // ─── Error (bad/expired token, network failure) ─────────────────
  if (status === "error" || mutation.isError) {
    return (
      <PageShell>
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="heading-page text-center">Something went wrong</h2>
        <p className="text-sm text-description font-semibold text-center leading-relaxed">
          This unsubscribe link may be invalid, or our servers are temporarily
          down. Please try again, or use the link from a recent email.
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
        <MailX className="w-10 h-10 text-primary-500" />
      </div>
      <h2 className="heading-page text-center">Unsubscribe from our newsletter?</h2>
      <p className="text-sm text-description font-semibold text-center leading-relaxed">
        You'll stop receiving product updates, exclusive deals, and restock
        alerts from TechVault. You can resubscribe anytime.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-2">
        <button
          type="button"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          className="w-full sm:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          {mutation.isPending ? "Unsubscribing…" : "Yes, unsubscribe me"}
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