import * as Icons from "lucide-react";
import { AboutUsHero } from "../../Components/AboutUs/AboutUsHero";
import FaqAccordion from "./FaqAccordion";
import { useQuery } from "@tanstack/react-query";
import { getCompanyInfo } from "../../apis/modules/company-info";
import { getAboutUsPage } from "../../apis/modules/about-us";
import AboutUsPageSkeleton from "../../Components/AboutUs/LoadingSkeleton";
import { BackgroundEffects } from "../../Components/ui/BackgroundEffects";

const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  CheckCircle: Icons.CheckCircle,
  Shield: Icons.Shield,
  Truck: Icons.Truck,
  Headphones: Icons.Headphones,
  Award: Icons.Award,
  Star: Icons.Star,
};

function PromiseIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Icons.CheckCircle;
  return <Icon className="text-primary-400 shrink-0 mt-0.5" strokeWidth={3} />;
}

export default function AboutUsPage() {
  const { data: companyInfoResponse, isLoading: isCompanyInfoLoading, isError:isCompanyInfoError, refetch:refetchCompanyInfo } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: () => getCompanyInfo(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  const { data: aboutUsResponse, isLoading: isAboutUsLoading, isError:isAboutUsError, refetch:refetchAboutUs } = useQuery({
    queryKey: ["aboutUs"],
    queryFn: () => getAboutUsPage(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  const companyInfo = companyInfoResponse?.data.info ?? null;
  const aboutUs = aboutUsResponse?.data.data ?? null;

  const hasError = isCompanyInfoError || isAboutUsError;

  const handleRetry = () => {
    if (isCompanyInfoError) refetchCompanyInfo();
    if (isAboutUsError) refetchAboutUs();
  };

  if (hasError) {
    return (
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-section-alternative px-6">
        <BackgroundEffects />

        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md mx-auto">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <Icons.AlertTriangle className="w-10 h-10 text-red-500" />
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
            Oops! Something went wrong.
          </h1>
          <p className="text-sm text-description leading-relaxed mb-8">
            We couldn't load the About Us content. This might be due to a network
            issue or our servers are temporarily down. Please try again.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRetry}
              className="w-full sm:w-auto px-8 py-3 bg-primary-400 text-white text-sm font-semibold rounded-xl hover:bg-primary-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-8 py-3 bg-white text-neutral-700 text-sm font-semibold rounded-xl border border-secondary-400/20 hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isAboutUsLoading) {
    return (
      <div className="w-full mx-auto flex flex-col">
        <AboutUsHero />
        <AboutUsPageSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto flex flex-col">
      <AboutUsHero />

      <div className="w-full mx-auto bg-section">
        {/* ── 1. OUR STORY ── */}
        <section className="w-full py-24 px-6">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-secondary-400">
                  {aboutUs?.story?.eyebrow || "Since 2024"}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {aboutUs?.story?.heading || "Trusted Tech, Made Accessible."}
                </h1>
              </div>

              <div className="flex flex-col gap-4">
                <p
                  className="text-sm leading-relaxed font-semibold text-description"
                  dangerouslySetInnerHTML={{
                    __html: aboutUs?.story?.paragraph ?? "",
                  }}
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-10 h-px bg-primary-400 dark:bg-primary-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-secondary-400">
                  {aboutUs?.story?.tagline || "Built On Trust, Driven By Detail"}
                </span>
              </div>
            </div>

            <div className="relative w-full aspect-[4/3]">
              <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary-400 rounded-tr-lg z-10" />
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-primary-400 rounded-bl-lg z-10" />
              <div className="w-full h-full rounded-2xl overflow-hidden bg-primary-100">
                {aboutUs?.story?.image ? (
                  <img
                    src={aboutUs.story.image}
                    alt={aboutUs.story.heading || "About TechVault"}
                    className="w-full h-full object-cover grayscale"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary-300 text-sm">
                    Office / Workspace Image
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── 2. OUR PROMISE ── */}
          <div className="w-full max-w-6xl mt-40 mx-auto flex flex-col items-center gap-16">
            <h2 className="heading-section w-fit border-b-4 border-secondary-400 pb-1">
              Our Promise
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
              {aboutUs?.promises.map((promise) => (
                <div
                  key={promise.id}
                  className="bg-section-alternative border border-secondary-400/5 hover:border-primary-400/30 px-5 py-5 flex flex-col gap-3 rounded-2xl shadow-sm"
                >
                  <h4 className="flex gap-2 items-start min-h-[3.5rem] font-semibold text-base">
                    <PromiseIcon name={promise.icon} />
                    {promise.title}
                  </h4>
                  <p className="text-sm text-description font-semibold leading-relaxed">
                    {promise.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. FAQ ── */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-section">
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-secondary-400">
                Quick Answers
              </span>
              <h2 className="heading-section">Frequently Asked Questions</h2>
            </div>

            <div className="w-full px-2 sm:px-4">
              <div className="space-y-3 sm:space-y-4">
                {aboutUs?.faqs.map((faq) => (
                  <FaqAccordion
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. VISIT OUR OFFICE ── */}
        <section className="w-full py-30 pb-40 px-6 bg-section">
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-4">
            <h2 className="heading-section">Visit Our Main Office</h2>

            {isCompanyInfoLoading ? (
              <div className="h-4 w-80 bg-primary-400/10 rounded animate-pulse" />
            ) : (
              <p className="text-sm text-secondary-400 font-medium">
                {companyInfo?.officeAddress ??
                  "123 Precision Way, Silicon Valley, CA 94025"}
              </p>
            )}

            <div className="w-full my-6 border border-primary-100 dark:border-primary-800 rounded-2xl overflow-hidden h-[500px]">
              <iframe
                src={
                  companyInfo?.mapEmbedUrl ||
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34205.42761585327!2d-74.02231133084236!3d40.73207638735103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2snp!4v1782582084682!5m2!1sen!2snp"
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}