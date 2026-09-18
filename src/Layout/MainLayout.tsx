import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import { BackgroundEffects } from "../Components/ui/BackgroundEffects";
import Footer from "../Components/Footer/Footer";
import ScrollToTopButton from "../Components/ScrollToTopButton";
import { getCompanyInfo } from "../apis/modules/company-info";
import { LoadingSpinner } from "../Components/ui/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react"; 

export default function MainLayout() {
    const {
        isLoading: isCompanyInfoLoading,
        isError: isCompanyInfoError, 
        refetch,                     
    } = useQuery({
        queryKey: ["companyInfo"],
        queryFn: () => getCompanyInfo(),
        staleTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 3,
    });

    if (isCompanyInfoLoading) {
        return <LoadingSpinner />;
    }

    if (isCompanyInfoError) {
        return (
            <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-section-alternative px-6">
                <BackgroundEffects />
                
                <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md mx-auto">
                    {/* Error Icon */}
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>

                    {/* Error Message */}
                    <h1 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
                        Oops! Something went wrong.
                    </h1>
                    <p className="text-sm text-description leading-relaxed mb-8">
                        We couldn't load the application data. This might be due to a network issue or our servers are temporarily down. Please try again.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => refetch()}
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

    // Main Layout
    return (
        <div className="relative w-full min-h-screen">
            <BackgroundEffects />
            
            <div className="relative z-10">
                <Header />
                <main className="min-h-screen">
                    <Outlet />
                </main>
                <Footer />
                <ScrollToTopButton />
            </div>
        </div>
    );
}