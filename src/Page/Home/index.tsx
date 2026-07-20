import HomeBannerSection from "../../Banner/HomeBanner";
import CategorySection from "../../Components/Home/CategorySection";
import NewArrivals from "../../Components/Home/NewArrivals";
import SubscribeSection from "../../Components/Home/SubscribeSection";

export default function HomePage(){
    return(
        <>
        <HomeBannerSection/>
        <div className="bg-section-alternative">
            <CategorySection/>
            <NewArrivals/>
        </div>
        <SubscribeSection/>
        </>
    )
}