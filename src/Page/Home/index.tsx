import HomeBannerSection from "../../Banner/HomeBanner";
import BrandsSection from "../../Components/Home/BrandsSection";
import CategorySection from "../../Components/Home/CategorySection";
import NewArrivals from "../../Components/Home/NewArrivals";
import OfferSection from "../../Components/Home/OfferSection";
import { PromotionalBanners } from "../../Components/Home/PromotionalBanners";
import SubscribeSection from "../../Components/Home/SubscribeSection";
import TrustSection from "../../Components/Home/TrustSection";

export default function HomePage(){
    return(
        <>
        <HomeBannerSection/>
        <TrustSection/>
        <div className="bg-section-alternative py-16">
            <CategorySection/>
            <NewArrivals/>
            <OfferSection/>
            <BrandsSection/>
            <PromotionalBanners/>
        </div>
        <SubscribeSection/>
        </>
    )
}