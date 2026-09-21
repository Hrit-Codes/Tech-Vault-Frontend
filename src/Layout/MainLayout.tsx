import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import { BackgroundEffects } from "../Components/ui/BackgroundEffects";
import Footer from "../Components/Footer/Footer";
import ScrollToTopButton from "../Components/ScrollToTopButton";
import { getCompanyInfo } from "../apis/modules/company-info";
import { LoadingSpinner } from "../Components/ui/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import ServerError from "../Components/ui/ServerError";
import OfferPopup from "../Components/Home/OfferPopup";

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
        return <ServerError onRetry={()=>refetch()}/>
    }

    // Main Layout
    return (
        <div className="relative w-full min-h-screen">
            <BackgroundEffects />
            
            <div className="relative z-10">
                <OfferPopup/>
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