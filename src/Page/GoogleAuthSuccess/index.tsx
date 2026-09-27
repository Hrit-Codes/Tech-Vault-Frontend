import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getCurrentUser } from "../../apis/modules/auth";
import { BackgroundEffects } from "../../Components/ui/BackgroundEffects";
import { LoadingSpinner } from "../../Components/ui/LoadingSpinner";

export default function GoogleAuthSuccessPage() {
  const navigate = useNavigate();
  const hasHandled = useRef(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const user = data?.data?.user ?? null;

  useEffect(() => {
    if (!user || hasHandled.current) return;
    hasHandled.current = true;

    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Welcome back");
    navigate("/", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    if (!isError || hasHandled.current) return;
    hasHandled.current = true;

    localStorage.removeItem("user");
    toast.error("Google sign-in failed. Please try again.");
    navigate("/login", { replace: true });
  }, [isError, navigate]);

  if (isLoading || isError || user) return <LoadingSpinner />;

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-16">
      <BackgroundEffects />

      <div className="relative z-10 w-full max-w-md bg-section rounded-3xl border border-secondary-400/5 shadow-xl p-10 flex flex-col items-center gap-2 text-center">
        <h2 className="heading-page">Signing you in</h2>
        <h3 className="text-sm text-description font-semibold">
          One moment, we're finishing up with Google.
        </h3>
      </div>
    </div>
  );
}
