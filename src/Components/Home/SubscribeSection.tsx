import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { BellRing, MailCheck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { subscribeToNewsletter } from "../../apis/modules/newsletter";
import { subscribeSchema, type SubscribeInput } from "../utils/schema";

const assurances = [
  { icon: MailCheck, text: "One email a week, max" },
  { icon: ShieldCheck, text: "No spam, ever" },
  { icon: BellRing, text: "Early access to drops" },
];

export default function SubscribeSection() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SubscribeInput>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: "" },
  });

  const subscribeMutation = useMutation({
    mutationFn: (data: SubscribeInput) => subscribeToNewsletter(data),
    onSuccess: (response) => {
      toast.success(response.message ?? "Subscribed successfully");
      reset({ email: "" });
    },
    onError: (err: any) => {
      if (err?.response?.status === 409) {
        setError("root", {
          message: "This email is already subscribed.",
        });
        return;
      }
      const message =
        err?.response?.data?.message ??
        "Something went wrong. Please try again.";
      setError("root", { message });
    },
  });

  const onSubmit = (data: SubscribeInput) => {
    subscribeMutation.mutate(data);
  };

  return (
    <section className="w-full bg-section py-30 px-6 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
      >
        <input
          type="email"
          {...register("email")}
          placeholder="email@example.com"
          aria-label="Email address"
          className="flex-1 w-full px-5 py-3 rounded-full border-2 border-primary-300 dark:border-primary-500 bg-transparent text-sm font-medium outline-none focus:ring-2 focus:ring-secondary-400 dark:focus:ring-primary-400 transition"
        />
        <button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-secondary-400 hover:bg-secondary-500 dark:bg-primary-500 dark:hover:bg-primary-600 text-white text-sm font-semibold transition-colors whitespace-nowrap hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {subscribeMutation.isPending ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      <div className="relative z-10 w-full max-w-md my-4 text-center min-h-[1.25rem]">
        {errors.email && (
          <p className="text-xs text-red-500 font-semibold">
            {errors.email.message}
          </p>
        )}
        {errors.root && (
          <p className="text-xs text-description font-medium">
            {errors.root.message}
          </p>
        )}
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 border-t border-secondary-400/10 w-full max-w-md">
        {assurances.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-primary-400" />
            <span className="text-xs text-description">{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}