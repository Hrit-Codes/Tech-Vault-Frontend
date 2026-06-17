import HomeBannerSection from "../Banner/HomeBanner";
import CategorySection from "./CategorySection";
import NewArrivals from "./NewArrivals";
import SubscribeSection from "./SubscribeSection";

export default function HomePage(){
    return(
        <>
        <HomeBannerSection/>
        <div className="bg-section-alternative py-10">
            <CategorySection/>
            <NewArrivals/>
        </div>
        <SubscribeSection/>
        </>
    )
}